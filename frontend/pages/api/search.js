import db from '../../lib/db';

export default async function handler(req, res) {
<<<<<<< Updated upstream
  const { query, category, creator } = req.query;

  const [rows] = await db.query(`
    SELECT * FROM streams 
    WHERE 
      title LIKE ? AND 
      (? = '' OR category = ?) AND 
      (? = '' OR creator = ?)
  `, [`%${query}%`, category, category, creator, creator]);

  res.status(200).json(rows);
=======
  const { query } = req.query;

  try {
    console.log('🔍 Search query received:', query); // DEBUG LOG

    const [rows] = await db.query(
      'SELECT * FROM videos WHERE filename LIKE ?',
      [`%${query}%`]
    );

    console.log('✅ Query result:', rows); // DEBUG LOG
    res.status(200).json(rows);
  } catch (error) {
    console.error('❌ SQL Error:', error); // <== PENTING UNTUK DILIHAT
    res.status(500).json({ message: 'Internal Server Error' });
  }
>>>>>>> Stashed changes
}
