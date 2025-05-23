// pages/api/upload.js
import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false, // kita disable body parser agar formidable bisa parse multipart/form-data
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error parsing form data" });
    }

    // files.file adalah file yang diupload
    const file = files.file;

    try {
      // Baca file buffer
      const fileData = fs.createReadStream(file.filepath);

      // Kita buat FormData untuk diteruskan ke backend Adonis.js
      const formData = new FormData();
      formData.append("file", fileData, file.originalFilename);

      // Kirim ke backend
      const response = await fetch("http://localhost:3333/api/upload", {
        method: "POST",
        body: formData,
        // Jangan set header 'Content-Type', biar FormData yang handle
      });

      if (!response.ok) {
        const errorRes = await response.json();
        return res.status(response.status).json({ message: errorRes.message || "Upload failed" });
      }

      const result = await response.json();

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Upload error" });
    }
  });
}
