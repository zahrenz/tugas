// pages/books/add.js
import { useRouter } from "next/router";
import BookForm from "../../components/BookForm";

export default function AddBook() {
  const router = useRouter();

  const addBook = async (formData) => {
    try {
const res = await fetch("http://localhost:3333/books", {  // pakai URL backend
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

      
    </>
  );
}