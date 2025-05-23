import { useState } from "react";
import PropTypes from 'prop-types';

export default function BookForm({ 
  onSubmit, 
  initialData = {}, 
  submitText = "Simpan" 
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    category: initialData.category || "",
    description: initialData.description || "",
  });
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formPayload.append(key, value);
      });
      if (image) formPayload.append("image", image);

      await onSubmit(formPayload);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = [
    "Fiction", "Non-Fiction", "Biography", "Fantasy", "Science"
  ];

  return (
    <form onSubmit={handleSubmit} className="book-form" encType="multipart/form-data">
      <h2 className="form-title">
        {initialData.id ? "Edit Buku" : "Tambah Buku Baru"}
      </h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Judul:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-control"
          disabled={isSubmitting}
          placeholder="Masukkan judul buku"
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis:</label>
        <input
          id="author"
          name="author"
          type="text"
          value={formData.author}
          onChange={handleChange}
          required
          className="form-control"
          disabled={isSubmitting}
          placeholder="Masukkan nama penulis"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Kategori:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="form-control"
          disabled={isSubmitting}
        >
          <option value="">-- Pilih Kategori --</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Deskripsi:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          rows="4"
          disabled={isSubmitting}
          required
          placeholder="Deskripsikan buku secara singkat"
        ></textarea>
      </div>


      <button 
        type="submit" 
        className="btn-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Memproses..." : submitText}
      </button>

<style jsx>{`
  .book-form {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  background: linear-gradient(to bottom, #ffffff, #ffe4ec);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(255, 182, 193, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #880e4f;
  transition: box-shadow 0.3s ease;
}

.book-form:hover {
  box-shadow: 0 12px 30px rgba(233, 30, 99, 0.4);
}

.form-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #e91e63;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 4px rgba(233, 30, 99, 0.3);
  letter-spacing: 0.04em;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #ad1457;
  user-select: none;
}

.form-control {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1.8px solid #ffc1d2;
  border-radius: 15px;
  background-color: #fff0f6;
  font-size: 1rem;
  color: #6a1b4d;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  outline-offset: 2px;
  outline-color: transparent;
}

.form-control:focus {
  border-color: #e91e63;
  box-shadow: 0 0 12px rgba(233, 30, 99, 0.4);
  outline-color: #e91e63;
}

.file-input {
  padding: 0.4rem 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 15px;
  border: 1.5px solid #e91e63;
  background: linear-gradient(to right, #ffe4ec, #ffc1d2);
  color: #c2185b;
  box-shadow: 0 0 10px #ffc1d2;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.file-input:hover,
.file-input:focus {
  background: linear-gradient(to right, #ffc1d2, #f06292);
  box-shadow: 0 0 15px #f06292;
  border-color: #c2185b;
  color: #fff;
}

.btn-submit {
  width: 100%;
  padding: 0.85rem 0;
  background: linear-gradient(to right, #e91e63, #f06292);
  border: none;
  border-radius: 30px;
  font-weight: 700;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  letter-spacing: 0.03em;
  box-shadow: 0 0 15px #f06292;
  transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  user-select: none;
}

.btn-submit:hover:not(:disabled) {
  background: linear-gradient(to right, #f06292, #e91e63);
  box-shadow: 0 0 22px #e91e63;
  transform: scale(1.05);
}

.btn-submit:disabled {
  background: #ffc1d2;
  cursor: not-allowed;
  box-shadow: none;
}

.error-message {
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #b62222;
  background-color: #ffeaea;
  border-radius: 15px;
  border: 1.5px solid #f1a1a1;
  font-weight: 600;
  text-align: center;
  user-select: none;
}

`}</style>

    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string
  }),
  submitText: PropTypes.string
};
