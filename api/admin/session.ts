import { verifySessionToken } from '../../server/auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : (req.headers['x-admin-token'] as string) || '';

  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  const verification = verifySessionToken(token);
  if (!verification.valid || !verification.user) {
    return res.status(200).json({ authenticated: false });
  }

  return res.status(200).json({
    authenticated: true,
    user: verification.user
  });
}
