const API_URL = 'http://localhost:3333'; // Ganti sesuai alamat backend Adonis kamu

// GET: Ambil semua siswa
export async function getSiswas() {
  const res = await fetch(`${API_URL}/siswas`);
  if (!res.ok) throw new Error('Failed to fetch siswa');
  return await res.json();
}

// GET: Ambil siswa berdasarkan ID
export async function getSiswaById(id) {
  const res = await fetch(`${API_URL}/siswas/${id}`);
  if (!res.ok) throw new Error('Failed to fetch siswa by ID');
  return await res.json();
}

// POST: Tambah siswa baru
export async function addSiswa(data) {
  const res = await fetch(`${API_URL}/siswas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to add siswa');
  return await res.json();
}

// PUT: Update siswa
export async function updateSiswa(id, data) {
  const res = await fetch(`${API_URL}/siswas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to update siswa');
  return await res.json();
}

// DELETE: Hapus siswa
export async function deleteSiswa(id) {
  const res = await fetch(`${API_URL}/siswas/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete siswa');
  return await res.json();
}
