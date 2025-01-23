import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { book } = req.query;
  
  if (!book) {
    return res.status(400).json({ error: 'Book name is required' });
  }

  const filePath = path.join(process.cwd(), 'data', `${book}.json`);
  
  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(jsonData);
  } catch (error) {
    res.status(404).json({ error: 'Book not found' });
  }
}