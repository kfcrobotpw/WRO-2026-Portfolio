import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  verifyAdminCredentials,
  createSessionToken,
  verifySessionToken,
  ensureAdminInitialized,
  DEFAULT_ADMIN_ID
} from './server/auth';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Initialize Admin account in database on boot
  ensureAdminInitialized().then((admin) => {
    console.log(`[Auth System] Admin account initialized for ID: ${admin.username}`);
  }).catch((err) => {
    console.error('[Auth System] Error initializing admin account:', err);
  });

  // --- API Routes (MUST be defined before Vite middleware) ---

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Admin Login Endpoint
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await verifyAdminCredentials(username, password);

      if (!result.success || !result.user) {
        return res.status(401).json({
          success: false,
          message: result.message || '인증에 실패했습니다.'
        });
      }

      const token = createSessionToken(result.user);

      return res.json({
        success: true,
        token,
        user: result.user,
        message: '관리자 인증이 완료되었습니다.'
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: '서버 인증 처리 중 오류가 발생했습니다.'
      });
    }
  });

  // Admin Session Verification Endpoint
  app.get('/api/admin/session', (req, res) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : (req.headers['x-admin-token'] as string) || '';

    if (!token) {
      return res.json({ authenticated: false });
    }

    const verification = verifySessionToken(token);
    if (!verification.valid || !verification.user) {
      return res.json({ authenticated: false });
    }

    return res.json({
      authenticated: true,
      user: verification.user
    });
  });

  // Admin Logout Endpoint
  app.post('/api/admin/logout', (req, res) => {
    return res.json({ success: true, message: '로그아웃되었습니다.' });
  });

  // Public Auth Status Info Endpoint
  app.get('/api/admin/info', (req, res) => {
    return res.json({
      authMethod: 'server-pbkdf2-salted'
    });
  });

  // --- Vite Middleware / Static Serving ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Cybernetic Robot Portfolio running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
