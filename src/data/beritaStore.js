import { beritaList as dummyBeritaList } from './berita'

const STORAGE_KEY = 'inputBeritaCustom'

// Ambil berita tambahan yang disimpan lewat form Input Berita.
function getCustomBerita() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Gabungkan data dummy + berita yang ditambahkan lewat form, terbaru duluan.
export function getAllBerita() {
  const custom = getCustomBerita()
  return [...custom, ...dummyBeritaList]
}

// Simpan berita baru dari form Input Berita.
export function addBerita(entry) {
  const custom = getCustomBerita()
  const newEntry = {
    ...entry,
    id: `custom-${Date.now()}`,
  }
  const updated = [newEntry, ...custom]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return newEntry
}
