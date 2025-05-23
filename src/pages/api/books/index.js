import { books } from '../../../../data';
import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser to use formidable
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Kirim semua data buku
    return res.status(200).json(books);
  }

  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, (err, fields) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ message: 'Gagal memproses data' });
      }

      const { title, author, category, description } = fields;

      // Validasi sederhana bisa ditambahkan di sini jika perlu

      const newBook = {
        id: Date.now(), // ID unik menggunakan timestamp
        title: title || '',
        author: author || '',
        category: category || '',
        description: description || '',
      };

      books.push(newBook);

      const filePath = path.join(process.cwd(), 'data.js');
      const updatedData = `let books = ${JSON.stringify(books, null, 2)};\nmodule.exports = { books };`;

      try {
        fs.writeFileSync(filePath, updatedData, 'utf8');
        return res.status(201).json(newBook);
      } catch (writeErr) {
        console.error('Gagal menyimpan data:', writeErr);
        return res.status(500).json({ message: 'Gagal menyimpan data buku' });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
