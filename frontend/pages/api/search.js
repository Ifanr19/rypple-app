import db from '../../lib/db';

export default async function handler(req, res) {
  const { query, category, creator } = req.query;

  const [rows] = await db.query(`
    SELECT * FROM streams 
    WHERE 
      title LIKE ? AND 
      (? = '' OR category = ?) AND 
      (? = '' OR creator = ?)
  `, [`%${query}%`, category, category, creator, creator]);

  res.status(200).json(rows);
}
