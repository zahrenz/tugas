import { books } from '../../../../data';
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;
  const bookId = id.toString();
  const bookIndex = books.findIndex((book) => book.id.toString() === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(books[bookIndex]);
  }

  if (req.method === 'PUT') {
    const form = new IncomingForm({
      uploadDir: './public/uploads',
      keepExtensions: true,
      multiples: false,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ message: 'Error parsing form data' });
      }

      const { title, author, genre, description } = fields; // ✅ Tambahkan description

      const image = files.image
        ? path.basename(files.image[0]?.filepath || files.image.filepath)
        : books[bookIndex].image || null;

      // ✅ Update juga description
      books[bookIndex] = {
        ...books[bookIndex],
        title,
        author,
        genre,
        description,
        image,
      };

      const filePath = path.join(process.cwd(), 'data.js');
      const updatedData = `let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };`;

      try {
        fs.writeFileSync(filePath, updatedData, 'utf8');
        return res.status(200).json(books[bookIndex]);
      } catch (error) {
        console.error("Error writing to file:", error);
        res.status(500).json({ message: 'Error updating book' });
      }
    });
  } else if (req.method === 'DELETE') {
    books.splice(bookIndex, 1);

    const filePath = path.join(process.cwd(), 'data.js');
    const updatedData = `let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };`;

    try {
      fs.writeFileSync(filePath, updatedData, 'utf8');
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.error("Error writing to file:", error);
      res.status(500).json({ message: 'Error deleting book' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
