import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Booklist.module.css";
import { getBooks, deleteBook } from "../../../lib/api/books";

const GENRES = ["All", "Fiction", "Non-Fiction", "Biography", "Fantasy", "Science"];

export default function Booklist() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError("Gagal mengambil data buku.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm("Yakin ingin menghapus buku ini?");
    if (!confirmed) return;

    try {
      await deleteBook(id);
      await fetchBooks();
    } catch (err) {
      alert("Gagal menghapus buku.");
    }
  };

  const openModal = (desc) => {
    setModalContent(desc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
  };

  const filteredBooks = books.filter((book) => {
    const matchesGenre = selectedGenre === "All" || book.category === selectedGenre;
    const matchesSearch = (book.title + book.author)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (loading) return <p className={styles.loading}>Memuat data buku...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daftar Buku</h1>

      <div className={styles.actionsWrapper}>
        <Link href="/books/add" legacyBehavior>
          <a className={styles.addButton}>+ Tambah Buku</a>
        </Link>
      </div>

      <div className={styles.controlsWrapper} style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={styles.sortSelect}
        >
          {GENRES.map((genre) => (
            <option key={genre} value={genre}>
              {genre === "All" ? "Semua Genre" : genre}
            </option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <p className={styles.empty}>Tidak ada buku yang cocok.</p>
      ) : (
        <ul className={styles.bookList}>
          {filteredBooks.map((book) => {
            const shortDesc = book.description?.slice(0, 100);
            const isLongDesc = book.description && book.description.length > 100;

            return (
              <li key={book.id} className={styles.bookItem}>
                <div className={styles.bookInfo}>
                  <div><strong>Judul:</strong> {book.title}</div>
                  <div><strong>Penulis:</strong> {book.author}</div>
                  <div><strong>Genre:</strong> {book.category || "-"}</div>
                  <div>
                    <strong>Deskripsi:</strong>{" "}
                    {isLongDesc ? (
                      <>
                        {shortDesc}...{" "}
                        <button
                          className={styles.readMoreButton}
                          onClick={() => openModal(book.description)}
                          type="button"
                        >
                          Lihat Selengkapnya
                        </button>
                      </>
                    ) : (
                      book.description || "-"
                    )}
                  </div>
                </div>
                <div className={styles.actions}>
                  <Link href={`/books/${book.id}/edit`} legacyBehavior>
                    <a className={styles.editButton}>Edit</a>
                  </Link>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className={styles.deleteButton}
                    type="button"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {modalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalCloseButton}
              onClick={closeModal}
              aria-label="Tutup modal"
            >
              &times;
            </button>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}
