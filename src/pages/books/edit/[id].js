import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    image: ''
  });
  const [newImage, setNewImage] = useState(null);

  const genres = ["Fiction", "Non-fiction", "Science", "Fantasy", "Anime", "Mystery", "Thriller"];

  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    formData.append('description', book.description);
    if (newImage) {
      formData.append('image', newImage);
    }

    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      body: formData,
    });

    router.push('/books');
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h2>Edit Book</h2>

          <div className="form-group">
            <label>Judul:</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Judul Buku"
            />
          </div>

          <div className="form-group">
            <label>Penulis:</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Nama Penulis"
            />
          </div>

          <div className="form-group">
            <label>Genre:</label>
            <select
              name="genre"
              value={book.genre}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Deskripsi:</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Tulis deskripsi buku di sini..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Cover:</label>
            <input type="file" name="image" onChange={handleFileChange} />
            {book.image && (
              <div className="image-preview">
                <p>Gambar Saat Ini:</p>
                <img src={`/uploads/${book.image}`} alt="Book cover" width="100" />
              </div>
            )}
          </div>

          <button type="submit">Update Book</button>
        </form>
      </div>

      <style jsx>{`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0fff6;
    padding: 20px;
  }

  form {
    max-width: 600px;
    width: 100%;
    padding: 28px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 213, 99, 0.1);
    font-family: 'Segoe UI', sans-serif;
  }

  h2 {
    text-align: center;
    color: #00b14f;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 24px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #008f42;
    font-size: 16px;
  }

  input[type="text"],
  input[type="file"],
  select,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid #bdf7d7;
    border-radius: 8px;
    background-color: #fff;
    font-size: 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input[type="text"]:focus,
  input[type="file"]:focus,
  select:focus,
  textarea:focus {
    border-color: #00d563;
    box-shadow: 0 0 0 3px rgba(0, 213, 99, 0.15);
    outline: none;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  button {
    width: 100%;
    padding: 14px;
    background-color: #00d563;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.25s ease;
  }

  button:hover {
    background-color: #00b14f;
  }

  button:active {
    background-color: #008f42;
  }

  .image-preview {
    margin-top: 12px;
  }

  .image-preview p {
    font-size: 14px;
    color: #008f42;
    margin-bottom: 8px;
  }

  .image-preview img {
    border-radius: 6px;
    width: 120px;
    height: auto;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
`}</style>
    </>
  );
}
