import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../books/Booklist.module.css";
import { getSiswas, deleteSiswa } from "../../../lib/api/siswas";

const SORT_OPTIONS = [
  { value: "newest", label: "Waktu Ditambahkan (Terbaru)" },
  { value: "oldest", label: "Waktu Ditambahkan (Terlama)" },
  { value: "alphabet_asc", label: "Nama (A-Z)" },
  { value: "alphabet_desc", label: "Nama (Z-A)" },
];

export default function SiswaList() {
  const [siswas, setSiswas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchSiswas = async () => {
    try {
      setLoading(true);
      const data = await getSiswas();
      setSiswas(data);
      setError("");
    } catch (err) {
      setError("Gagal mengambil data siswa.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiswas();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus siswa ini?")) return;

    try {
      await deleteSiswa(id);
      fetchSiswas();
    } catch (err) {
      alert("Gagal menghapus siswa.");
    }
  };

  const filterSiswas = siswas.filter((siswa) =>
    (siswa.name + siswa.email).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi sortir terpisah
  const sortSiswas = (list, sortKey) => {
    return [...list].sort((a, b) => {
      switch (sortKey) {
        case "alphabet_asc":
          return a.name.localeCompare(b.name);
        case "alphabet_desc":
          return b.name.localeCompare(a.name);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };

  const sortedSiswas = sortSiswas(filterSiswas, sortBy);

  if (loading) return <p className={styles.loading}>Memuat data siswa...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Daftar Siswa</h1>

      <div className={styles.actionsWrapper}>
        <Link href="/siswas/add" legacyBehavior>
          <a className={styles.addButton}>+ Tambah Siswa</a>
        </Link>
      </div>

      <div className={styles.controlsWrapper} style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          style={{ flex: "1 1 300px", minWidth: "200px" }}
          disabled={loading}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.searchInput}
          style={{ width: "220px" }}
          disabled={loading}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {sortedSiswas.length === 0 ? (
        <p className={styles.empty}>Tidak ada siswa yang cocok.</p>
      ) : (
        <ul className={styles.bookList}>
          {sortedSiswas.map((siswa) => (
            <li key={siswa.id} className={styles.bookItem}>
              <div className={styles.bookInfo}>
                <div><strong>Nama:</strong> {siswa.name}</div>
                <div><strong>Email:</strong> {siswa.email}</div>
                <div><strong>Umur:</strong> {siswa.age}</div>
              </div>
              <div className={styles.actions}>
                <Link href={`/siswas/${siswa.id}/edit`} legacyBehavior>
                  <a className={styles.editButton}>Edit</a>
                </Link>
                <button
                  onClick={() => handleDelete(siswa.id)}
                  className={styles.deleteButton}
                  type="button"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
