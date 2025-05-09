import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Booklist.module.css";

export default function Booklist() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [descriptionModal, setDescriptionModal] = useState({ show: false, content: "" });

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Gagal memuat data buku:", err);
      alert("Gagal memuat data buku.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const confirmDelete = (bookId) => {
    setBookToDelete(bookId);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!bookToDelete) return;

    const res = await fetch(`/api/books/${bookToDelete}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (res.ok) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookToDelete));
    } else {
      alert(`Gagal menghapus buku: ${result.message}`);
    }

    setShowModal(false);
    setBookToDelete(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book List</h1>

      <Link href="/books/add" className={styles.addLink}>
        + Add New Book
      </Link>

      {books.length === 0 ? (
        <p>No book has been added yet.</p>
      ) : (
        <div className={styles.cardGrid}>
          {books.map((b) => (
            <div key={b.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {b.image ? (
                  <img
                    src={`/uploads/${b.image}`}
                    alt={b.title}
                    className={styles.coverImage}
                  />
                ) : (
                  <span>(No picture)</span>
                )}
              </div>
              <div className={styles.info}>
                <p><span className={styles.label}>Title:</span> {b.title || "-"}</p>
                <p><span className={styles.label}>Author:</span> {b.author || "-"}</p>
                <p><span className={styles.label}>Genre:</span> {b.genre || "-"}</p>
                <p>
                  <span className={styles.label}>Description:</span>{" "}
                  <span
                    className={styles.descriptionText}
                    onClick={() => {
                      if (b.description) {
                        setDescriptionModal({ show: true, content: b.description });
                      }
                    }}
                  >
                    {b.description?.length > 60
                      ? b.description.slice(0, 60) + "..."
                      : b.description || "-"}
                  </span>
                </p>
              </div>
              <div className={styles.actions}>
                <Link href={`/books/edit/${b.id}`}>Edit</Link>
                <button onClick={() => confirmDelete(b.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Are you sure you want to delete this book?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleDeleteConfirmed} className={styles.deleteBtn}>Yes, Delete</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Deskripsi */}
      {descriptionModal.show && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Description</h3>
            <p style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
              {descriptionModal.content}
            </p>
            <div className={styles.modalButtons}>
            <button
  className={styles.closeBtn}
  onClick={() => setDescriptionModal({ show: false, content: "" })}
>
Close
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
