import db from '../../lib/db';
import bcrypt from 'bcryptjs';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Registration failed' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
