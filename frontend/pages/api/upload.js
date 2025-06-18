import db from '@/lib/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { filename, url } = req.body;

    if (!filename || !url) {
      return res.status(400).json({ message: 'Filename and URL are required' });
    }

    const query = 'INSERT INTO videos (filename, url) VALUES (?, ?)';
    db.query(query, [filename, url], (err, results) => {
      if (err) {
        console.error('Upload failed:', err.message);
        return res.status(500).json({ message: 'Database error' });
      }

      return res.status(201).json({ message: 'Video uploaded successfully' });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
