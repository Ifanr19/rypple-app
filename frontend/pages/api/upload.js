import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import db from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/uploads'),
    keepExtensions: true,
    multiples: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Form parsing error' });
    }

    const title = fields.title?.[0] || '';
    const description = fields.description?.[0] || '';
    const category = fields.category?.[0] || '';
    const gameTitle = fields.game_title?.[0] || '';
    const creator = fields.creator?.[0] || 'Anonymous';

    let filename = '';
    if (files.video && files.video[0]) {
      const videoFile = files.video[0];
      const originalExt = path.extname(videoFile.originalFilename);
      const customName = `${creator}-${Date.now()}${originalExt}`;
      const oldPath = videoFile.filepath;
      const newPath = path.join(process.cwd(), 'public/uploads', customName);

      try {
        fs.renameSync(oldPath, newPath);
        filename = customName;
      } catch (renameErr) {
        return res.status(500).json({ message: 'Failed to save video file' });
      }
    } else {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const sql = `
      INSERT INTO videos (title, description, category, game_title, creator, filename, uploaded_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(sql, [title, description, category, gameTitle, creator, filename], (err) => {
      if (err) return res.status(500).json({ message: 'Database insert error' });
      res.status(200).json({ message: 'Video uploaded successfully' });
    });
  });
}
