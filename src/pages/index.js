import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container">
        <h1 className="title">KELAS INDUSTRI SIJA</h1>
        <div className="buttonColumn">
          <Link href="/books" legacyBehavior>
            <a className="addButton">📚 Daftar Buku</a>
          </Link>
          <Link href="/siswas" legacyBehavior>
            <a className="addButton">🧑‍🎓 Daftar Siswa</a>
          </Link>
        </div>
      </div> 

      <style jsx>{`
        .container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: center; /* vertikal center */
  align-items: center;     /* horizontal center */
  min-height: 100vh;       /* supaya container tinggi penuh layar */
  text-align: center;      /* supaya teks di dalam center */

        .title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #e91e63;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 4px rgba(233, 30, 99, 0.3);
        }

      .buttonColumn {
  display: flex;
  flex-direction: row; /* ini supaya tombol sejajar horizontal */
  justify-content: center; /* supaya tombolnya di tengah secara horizontal */
  gap: 1.25rem; /* jarak antar tombol */
}

        .addButton {
          background: linear-gradient(to right, #ffe4ec, #ffc1d2);
          color: #c2185b;
          padding: 0.75rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          box-shadow: 0 0 12px #ffc1d2, 0 0 20px #ffe4ec;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: inline-block;
          min-width: 200px;
          text-align: center;
        }

        .addButton:hover {
          transform: scale(1.05);
          box-shadow: 0 0 18px #ffc1d2, 0 0 28px #f06292;
        }
      `}</style>
    </>
  );
}
