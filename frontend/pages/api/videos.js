import db from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM videos');
      res.status(200).json(rows);
    } catch (err) {
      console.error('❌ Error GET /api/videos:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  else if (req.method === 'POST') {
    const { filename, url } = req.body;
    try {
      await db.query(
        'INSERT INTO videos (filename, url) VALUES (?, ?)',
        [filename, url]
      );
      res.status(201).json({ message: 'Video uploaded!' });
    } catch (err) {
      console.error('❌ Error POST /api/videos:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
