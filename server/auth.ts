import crypto from 'crypto';
import firebaseConfig from '../firebase-applet-config.json';

// Admin Account Constants
export const DEFAULT_ADMIN_ID = 'jww9882';
const DEFAULT_ADMIN_PW = 'jangww9882!';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'robot_portfolio_secure_secret_2026_salt_key_9882';

export interface AdminRecord {
  username: string;
  passwordHash: string;
  salt: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory cache for fast, reliable verification across server lifecycle
let adminUserCache: AdminRecord | null = null;

/**
 * Hash password securely using PBKDF2 with a salt
 */
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

/**
 * Generate a cryptographically secure random salt
 */
export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * Initialize default admin credentials with salted hash
 */
export function createDefaultAdminRecord(): AdminRecord {
  const salt = generateSalt();
  const passwordHash = hashPassword(DEFAULT_ADMIN_PW, salt);
  return {
    username: DEFAULT_ADMIN_ID,
    passwordHash,
    salt,
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Synchronize / Persist Admin Record to Firestore via REST API
 */
export async function syncAdminToDatabase(record: AdminRecord): Promise<boolean> {
  const { projectId, apiKey, firestoreDatabaseId } = firebaseConfig;
  if (!projectId || !apiKey || !firestoreDatabaseId) {
    return false;
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${firestoreDatabaseId}/documents/admins/${record.username}?key=${apiKey}`;

  const payload = {
    fields: {
      username: { stringValue: record.username },
      passwordHash: { stringValue: record.passwordHash },
      salt: { stringValue: record.salt },
      role: { stringValue: record.role },
      createdAt: { stringValue: record.createdAt },
      updatedAt: { stringValue: record.updatedAt },
    },
  };

  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (err) {
    console.warn('Firestore admin persistence notice:', err);
    return false;
  }
}

/**
 * Fetch Admin Record from Firestore
 */
export async function fetchAdminFromDatabase(username: string): Promise<AdminRecord | null> {
  const { projectId, apiKey, firestoreDatabaseId } = firebaseConfig;
  if (!projectId || !apiKey || !firestoreDatabaseId) {
    return null;
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${firestoreDatabaseId}/documents/admins/${username}?key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.fields) return null;

    return {
      username: data.fields.username?.stringValue || username,
      passwordHash: data.fields.passwordHash?.stringValue || '',
      salt: data.fields.salt?.stringValue || '',
      role: data.fields.role?.stringValue || 'admin',
      createdAt: data.fields.createdAt?.stringValue || new Date().toISOString(),
      updatedAt: data.fields.updatedAt?.stringValue || new Date().toISOString(),
    };
  } catch (err) {
    return null;
  }
}

/**
 * Bootstraps and ensures admin account exists in database
 */
export async function ensureAdminInitialized(): Promise<AdminRecord> {
  if (adminUserCache) return adminUserCache;

  // Try fetching from database first
  const existing = await fetchAdminFromDatabase(DEFAULT_ADMIN_ID);
  if (existing && existing.passwordHash && existing.salt) {
    adminUserCache = existing;
    return adminUserCache;
  }

  // Create salted hash record and save to database
  const newRecord = createDefaultAdminRecord();
  adminUserCache = newRecord;

  // Persist to database asynchronously
  syncAdminToDatabase(newRecord).catch(() => {});

  return newRecord;
}

/**
 * Verify user credentials server-side against hashed database records
 */
export async function verifyAdminCredentials(username: string, passwordAttempt: string): Promise<{ success: boolean; user?: { username: string; role: string }; message?: string }> {
  if (!username || !passwordAttempt) {
    return { success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' };
  }

  const cleanUsername = username.trim();
  const adminRecord = await ensureAdminInitialized();

  if (cleanUsername !== adminRecord.username) {
    return { success: false, message: '등록되지 않은 관리자 아이디입니다.' };
  }

  // Calculate hash using stored salt
  const computedHash = hashPassword(passwordAttempt, adminRecord.salt);

  // Constant-time comparison to prevent timing attacks
  const a = Buffer.from(computedHash, 'hex');
  const b = Buffer.from(adminRecord.passwordHash, 'hex');

  const isValid = a.length === b.length && crypto.timingSafeEqual(a, b);

  if (!isValid) {
    return { success: false, message: '비밀번호가 일치하지 않습니다.' };
  }

  return {
    success: true,
    user: {
      username: adminRecord.username,
      role: adminRecord.role,
    },
  };
}

/**
 * Create a signed HMAC session token
 */
export function createSessionToken(user: { username: string; role: string }): string {
  const payload = {
    u: user.username,
    r: user.role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadStr)
    .digest('base64url');

  return `${payloadStr}.${signature}`;
}

/**
 * Verify session token
 */
export function verifySessionToken(token: string): { valid: boolean; user?: { username: string; role: string } } {
  if (!token || typeof token !== 'string') {
    return { valid: false };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadStr, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadStr)
    .digest('base64url');

  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);

  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { valid: false };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf-8'));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return { valid: false };
    }

    return {
      valid: true,
      user: {
        username: payload.u,
        role: payload.r,
      },
    };
  } catch (err) {
    return { valid: false };
  }
}
