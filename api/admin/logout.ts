export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return res.status(200).json({ success: true, message: '로그아웃되었습니다.' });
}
