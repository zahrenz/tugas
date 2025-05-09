// pages/books/add.js
import { useRouter } from "next/router";
import BookForm from "../../components/BookForm";

export default function AddBook() {
  const router = useRouter();

  const addBook = async (formData) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Gagal menambah buku: " + error.message);
        return;
      }

      await res.json(); // We don’t need the newBook here unless you’re doing something with it

      router.push("/books");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menambah buku.");
    }
  };

  return (
    <>
      <div className="container">
        <BookForm onSubmit={addBook} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }

        form {
          max-width: 600px;
          width: 100%;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
        }

        input[type="text"],
        input[type="file"] {
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 16px;
        }

        input[type="text"]:focus,
        input[type="file"]:focus {
          border-color: #007bff;
          outline: none;
        }

        button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }

        button:hover {
          background-color: #0056b3;
        }

        .image-preview {
          margin-top: 20px;
        }

        .image-preview p {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .image-preview img {
          border-radius: 4px;
          margin-bottom: 20px; /* Menambahkan jarak bawah agar tidak terlalu dekat dengan tombol */
        }
      `}</style>
    </>
  );
}