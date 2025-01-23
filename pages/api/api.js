import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { book } = req.query;
  
  if (!book) {
    return res.status(400).json({ error: 'Book name is required' });
  }

  console.log('Requested book:', book);
  
  const filePath = path.join(process.cwd(), 'data', `${book}.json`);
  
  console.log('File path:', filePath);
  console.log('File exists:', fs.existsSync(filePath));

  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error:', error);
    res.status(404).json({ error: 'Book not found', details: error.message });
  }
}