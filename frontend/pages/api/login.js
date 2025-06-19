import db from '../../lib/db';
import bcrypt from 'bcrypt';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;
  console.log('[LOGIN] Email:', email);
  console.log('[LOGIN] Password:', password);

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('[LOGIN] DB Error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      console.warn('[LOGIN] Email not found.');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    console.log('[LOGIN] Comparing password:', password, '→', isMatch);

    if (!isMatch) {
      console.warn('[LOGIN] Password mismatch.');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('[LOGIN] Success:', user.email);
    res.status(200).json({ name: user.name, email: user.email, avatar: user.avatar });
  });
}
