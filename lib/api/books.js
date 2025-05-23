const API_URL = 'http://localhost:3333'; // Ganti sesuai backend Adonis kamu

// GET: Ambil semua buku
export async function getBooks() {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return await res.json();
}

// POST: Tambah buku baru (pakai FormData untuk file)
export async function addBook(bookData) {
  const formData = new FormData();
  for (const key in bookData) {
    formData.append(key, bookData[key]);
  }

  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    body: formData, // jangan pakai headers JSON
  });

  if (!res.ok) throw new Error('Failed to add book');
  return await res.json();
}

// PUT: Update buku (pakai FormData juga)
export async function updateBook(id, bookData) {
  const formData = new FormData();
  for (const key in bookData) {
    formData.append(key, bookData[key]);
  }

  const res = await fetch(`${API_URL}/books/${id}`, {
    method: 'POST', // karena Adonis tidak dukung PUT+multipart
    headers: {
      'X-HTTP-Method-Override': 'PUT', // override ke PUT
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to update book');
  return await res.json();
}

// DELETE: Hapus buku
export async function deleteBook(id) {
const res = await fetch(`http://localhost:3333/books/${id}`, {    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete book');
  return await res.json();
}
