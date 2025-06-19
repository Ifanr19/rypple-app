import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import db from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM videos ORDER BY uploaded_at DESC';
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.status(200).json(results);
    });
  } else if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/uploads');
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json({ message: 'File upload error' });

      const title = fields.title[0];
      const description = fields.description[0];
      const creator = fields.creator[0];
      const file = files.video[0];

      const newPath = path.join('uploads', path.basename(file.filepath));

      const sql = 'INSERT INTO videos (title, description, filename, creator) VALUES (?, ?, ?, ?)';
      db.query(sql, [title, description, newPath, creator], (err) => {
        if (err) return res.status(500).json({ message: 'Database insert error' });
        res.status(200).json({ message: 'Video uploaded successfully' });
      });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}