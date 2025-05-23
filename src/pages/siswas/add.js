import { useRouter } from "next/router";
import SiswaForm from "../../components/SiswaForm";

export default function AddSiswa() {
  const router = useRouter();

  const addSiswa = async (data) => {
    const res = await fetch("http://localhost:3333/siswas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Gagal menambah siswa");
    }

    await res.json();
    router.push("/siswas");
  };

  return (
    <div className="container">

      <SiswaForm onSubmit={addSiswa} />
    </div>
  );
}
