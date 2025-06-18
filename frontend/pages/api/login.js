import db from '../../lib/db';
import bcrypt from 'bcryptjs';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login failed' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email not found' });
      }

      const user = results[0];
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // Return user info (excluding password)
      res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
