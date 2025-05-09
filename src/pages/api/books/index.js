import { books } from '../../../../data';
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Harus false saat pakai formidable
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(books);
  }

  if (req.method === 'POST') {
    const form = new IncomingForm({ uploadDir: './public/uploads', keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Gagal memproses data' });
      }

      const { title, author, genre, description } = fields; // ✅ ambil deskripsi juga

      let image = null;
      if (files.image && files.image[0] && files.image[0].filepath) {
        image = path.basename(files.image[0].filepath);
      }

      const newBook = {
        id: Date.now(),
        title,
        author,
        genre,
        description, // ✅ masukkan ke objek
        image,
      };

      books.push(newBook);

      const filePath = path.join(process.cwd(), 'data.js');
      const updatedData = `let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };`;
      try {
        fs.writeFileSync(filePath, updatedData, 'utf8');
        return res.status(201).json(newBook);
      } catch (writeErr) {
        console.error("Gagal menyimpan data:", writeErr);
        return res.status(500).json({ message: 'Gagal menyimpan data buku' });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
