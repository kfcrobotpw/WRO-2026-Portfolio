/**
 * Client-Side Cryptographic Fallback for Admin Authentication
 * Ensures seamless, instant login even when running in client-only preview or static hosting
 */

const ADMIN_ID = 'jww9882';
// SHA-256 hash of 'jangww9882!' with salt 'kfc_robot_fma_2026'
const KNOWN_SALT = 'kfc_robot_fma_2026';
const EXPECTED_HASH = 'c0205be9cba6c28f307374b595b1126786a349bc984d79fa5eb8fcff92ffaa22';

async function sha256(str: string): Promise<string> {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyClientAdminCredentials(
  username: string,
  passwordAttempt: string
): Promise<{ success: boolean; user?: { username: string; role: string }; message?: string }> {
  const cleanId = username.trim();
  if (!cleanId || !passwordAttempt) {
    return { success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' };
  }

  if (cleanId !== ADMIN_ID) {
    return { success: false, message: '등록되지 않은 관리자 아이디입니다.' };
  }

  // Exact password check + hash validation
  const calculatedHash = await sha256(`${passwordAttempt}:${KNOWN_SALT}`);
  if (passwordAttempt === 'jangww9882!' || calculatedHash === EXPECTED_HASH) {
    return {
      success: true,
      user: {
        username: ADMIN_ID,
        role: 'admin',
      },
    };
  }

  return { success: false, message: '비밀번호가 일치하지 않습니다.' };
}

export function generateClientSessionToken(username: string): string {
  const payload = {
    u: username,
    r: 'admin',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
  };
  return btoa(JSON.stringify(payload)) + '.client_verified_session';
}
