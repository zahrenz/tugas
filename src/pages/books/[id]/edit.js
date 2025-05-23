import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BookForm from "../../../components/BookForm";

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;

  const [initialData, setInitialData] = useState(null);

  // Ambil data buku dari backend untuk diisi ke form
  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3333/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Buku tidak ditemukan");
        return res.json();
      })
      .then((data) => setInitialData(data))
      .catch((err) => alert(err.message));
  }, [id]);

  const updateBook = async (formData) => {
    try {
      const res = await fetch(`http://localhost:3333/books/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Gagal memperbarui buku: " + error.message);
        return;
      }

      await res.json();

      router.push("/books");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat memperbarui buku.");
    }
  };

  if (!initialData) {
    return (
      <div className="loading-container">
        <p>Memuat data buku...</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60vh;
            font-size: 1.2rem;
            color: #ff3c00;
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container">

      <BookForm onSubmit={updateBook} initialData={initialData} />

    </div>
  );
}
