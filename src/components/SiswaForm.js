import { useState } from "react";
import PropTypes from "prop-types";

export default function SiswaForm({ onSubmit, initialData = {}, submitText = "Simpan" }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    age: initialData.age || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({ ...formData, age: Number(formData.age) });
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="siswa-form">
      <h2 className="form-title">{initialData.id ? "Edit Siswa" : "Tambah Siswa Baru"}</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Nama:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-control"
          disabled={isSubmitting}
          placeholder="Masukkan nama siswa"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-control"
          disabled={isSubmitting}
          placeholder="Masukkan email siswa"
        />
      </div>

      <div className="form-group">
        <label htmlFor="age">Umur:</label>
        <input
          id="age"
          name="age"
          type="number"
          min="0"
          value={formData.age}
          onChange={handleChange}
          required
          className="form-control"
          disabled={isSubmitting}
          placeholder="Masukkan umur siswa"
        />
      </div>

      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? "Memproses..." : submitText}
      </button>

      <style jsx>{`
        .siswa-form {
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

        .siswa-form:hover {
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

SiswaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  submitText: PropTypes.string,
};
