import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle raw form data
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Directory to save uploaded files
    form.keepExtensions = true; // Keep file extensions

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: "Failed to upload image." });
      }

      const file = files.image[0];
      const filePath = `/uploads/${file.newFilename}`;

      // Send back the path to the saved file
      res.status(200).json({ filePath });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
