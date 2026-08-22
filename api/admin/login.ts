import type { IncomingMessage, ServerResponse } from 'http';
import { verifyAdminCredentials, createSessionToken } from '../../server/auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { username, password } = body || {};

    const result = await verifyAdminCredentials(username, password);

    if (!result.success || !result.user) {
      return res.status(401).json({
        success: false,
        message: result.message || '인증에 실패했습니다.'
      });
    }

    const token = createSessionToken(result.user);

    return res.status(200).json({
      success: true,
      token,
      user: result.user,
      message: '관리자 인증이 완료되었습니다.'
    });
  } catch (error) {
    console.error('Vercel API login error:', error);
    return res.status(500).json({
      success: false,
      message: '서버 인증 처리 중 오류가 발생했습니다.'
    });
  }
}
