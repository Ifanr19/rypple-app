import db from '../../lib/db';

export default function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Missing query parameter' });
  }

  const sql = 'SELECT * FROM videos WHERE filename LIKE ?';
  const values = [`%${query}%`];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('❌ SQL Error:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(200).json(results);
  });
}
