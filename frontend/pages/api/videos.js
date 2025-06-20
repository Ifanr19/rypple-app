import db from '../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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
    const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json({ message: 'File upload error' });

      const title = fields.title?.[0] || '';
      const description = fields.description?.[0] || '';
      const category = fields.category?.[0] || '';
      const gameTitle = fields.game_title?.[0] || '';
      const creator = fields.creator?.[0] || 'Anonymous';
      const file = files.video?.[0];

      if (!file) {
        return res.status(400).json({ message: 'No video file uploaded' });
      }

      const originalExt = path.extname(file.originalFilename || '');
      const filename = `${creator}-${Date.now()}${originalExt}`;
      const newPath = path.join(process.cwd(), 'public/uploads', filename);

      try {
        fs.renameSync(file.filepath, newPath);
      } catch (e) {
        return res.status(500).json({ message: 'Failed to save video file' });
      }

      const sql = `
        INSERT INTO videos (title, description, category, game_title, creator, filename, uploaded_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
      `;
      const values = [title, description, category, gameTitle, creator, filename];

      db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ message: 'Database insert error' });
        res.status(200).json({ message: 'Video uploaded successfully' });
      });
    });

  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
