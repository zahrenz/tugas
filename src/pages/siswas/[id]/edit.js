import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SiswaForm from "../../../components/SiswaForm";

export default function EditSiswa() {
  const router = useRouter();
  const { id } = router.query;

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3333/siswas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Siswa tidak ditemukan");
        return res.json();
      })
      .then((data) => setInitialData(data))
      .catch((err) => alert(err.message));
  }, [id]);

  const updateSiswa = async (data) => {
    try {
      const res = await fetch(`http://localhost:3333/siswas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Gagal memperbarui siswa: " + error.message);
        return;
      }

      await res.json();
      router.push("/siswas");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat memperbarui siswa.");
    }
  };

  if (!initialData) {
    return (
      <div className="loading-container">
        <p>Memuat data siswa...</p>
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
      <SiswaForm onSubmit={updateSiswa} initialData={initialData} />
      <style jsx>{`

      `}</style>
    </div>
  );
}
