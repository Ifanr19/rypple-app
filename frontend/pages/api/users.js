import db from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const sql = 'SELECT name, avatar FROM users ORDER BY id DESC';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
