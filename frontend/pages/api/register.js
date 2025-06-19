import { IncomingForm } from 'formidable';
import path from 'path';
import fs from 'fs';
import db from '../../lib/db';
import bcrypt from 'bcrypt';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm({
    uploadDir: path.join(process.cwd(), 'public/avatars'),
    keepExtensions: true,
    multiples: false
  });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: 'Form parsing error' });

    const name = fields.name[0];
    const email = fields.email[0];
    const rawPassword = fields.password[0];

    let avatarFilename = 'default.png';
    if (files.avatar && files.avatar[0]) {
      const avatarFile = files.avatar[0];
      const originalExt = path.extname(avatarFile.originalFilename);
      const customName = `${name}-${Date.now()}${originalExt}`;
      const oldPath = avatarFile.filepath;
      const newPath = path.join(process.cwd(), 'public/avatars', customName);

      try {
        fs.renameSync(oldPath, newPath);
        avatarFilename = customName;
      } catch (renameErr) {
        return res.status(500).json({ message: 'Failed to save avatar file' });
      }
    }

    try {
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      const sql = 'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)';
      db.query(sql, [name, email, hashedPassword, avatarFilename], (err) => {
        if (err) return res.status(500).json({ message: 'Database insert error' });
        res.status(200).json({ message: 'User registered successfully' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Password encryption failed' });
    }
  });
}
