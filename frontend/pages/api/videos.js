import db from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.query('SELECT * FROM videos ORDER BY id DESC', (err, results) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'Failed to fetch videos' });
      }
      res.status(200).json(results);
    });
  } else if (req.method === 'POST') {
    const { filename, url } = req.body;

    if (!filename || !url) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    db.query(
      'INSERT INTO videos (filename, url) VALUES (?, ?)',
      [filename, url],
      (err, result) => {
        if (err) {
          console.error('DB error:', err);
          return res.status(500).json({ message: 'Failed to upload video' });
        }
        res.status(201).json({ message: 'Video uploaded successfully' });
      }
    );
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
