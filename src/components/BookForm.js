import { useState } from "react";

export default function BookForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("description", description);
    if (image) formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2 className="form-title">Tambah Buku</h2>

      <div className="form-group">
        <label>Judul:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Penulis:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Genre:</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
          className="form-control"
        >
          <option value="">Pilih Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Science">Science</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Anime">Anime</option>
          <option value="Mystery">Mystery</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      <div className="form-group">
        <label>Deskripsi:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Tulis deskripsi buku..."
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>Cover:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn-submit">
        Simpan
      </button>

      <style jsx>{`
        .book-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px;
          background-color: #f0fff6;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 213, 99, 0.15);
          font-family: 'Segoe UI', sans-serif;
        }

        .form-title {
          font-size: 28px;
          font-weight: bold;
          color: #00b14f;
          text-align: center;
          margin-bottom: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-size: 16px;
          font-weight: 600;
          color: #008f42;
        }

        .form-control {
          padding: 12px 14px;
          font-size: 16px;
          border: 1.5px solid #bdf7d7;
          border-radius: 8px;
          outline: none;
          background-color: #ffffff;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-control:focus {
          border-color: #00d563;
          box-shadow: 0 0 0 3px rgba(0, 213, 99, 0.15);
        }

        .btn-submit {
          padding: 14px;
          font-size: 16px;
          font-weight: bold;
          background-color: #00d563;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.25s ease;
        }

        .btn-submit:hover {
          background-color: #00b14f;
        }

        .btn-submit:active {
          background-color: #008f42;
        }
      `}</style>
    </form>
  );
}
