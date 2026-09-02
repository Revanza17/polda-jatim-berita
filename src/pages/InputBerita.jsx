import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud } from 'lucide-react'
import Navbar from '../components/Navbar'
import { mediaList, wilayahList } from '../data/berita'
import { addBerita } from '../data/beritaStore'

const emptyForm = {
  judul: '',
  kategori: 'Netral',
  media: mediaList[0],
  wilayah: wilayahList[0],
  tanggal: '',
  ringkasan: '',
  gambar: '',
}

export default function InputBerita() {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.judul || !form.tanggal || !form.ringkasan) {
      setError('Judul, tanggal, dan ringkasan wajib diisi.')
      setSuccess(false)
      return
    }
    setError('')

    addBerita({
      ...form,
      gambar:
        form.gambar ||
        'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&q=80',
    })

    setSuccess(true)
    setForm(emptyForm)

    // Arahkan ke Daftar Berita sebentar setelah tersimpan supaya user lihat hasilnya.
    setTimeout(() => navigate('/daftar-berita'), 900)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-bold text-navy-950">Input Berita</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tambahkan data berita baru ke dalam sistem secara manual.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"
          noValidate
        >
          <div>
            <label htmlFor="judul" className="mb-1.5 block text-sm font-medium text-navy-950">
              Judul Berita
            </label>
            <input
              id="judul"
              type="text"
              value={form.judul}
              onChange={(e) => update('judul', e.target.value)}
              placeholder="Contoh: Polda Jatim Ungkap Kasus..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="kategori" className="mb-1.5 block text-sm font-medium text-navy-950">
                Kategori Sentimen
              </label>
              <select
                id="kategori"
                value={form.kategori}
                onChange={(e) => update('kategori', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-navy-950 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              >
                <option value="Positif">Positif</option>
                <option value="Netral">Netral</option>
                <option value="Negatif">Negatif</option>
              </select>
            </div>

            <div>
              <label htmlFor="tanggal" className="mb-1.5 block text-sm font-medium text-navy-950">
                Tanggal &amp; Jam Terbit
              </label>
              <input
                id="tanggal"
                type="datetime-local"
                value={form.tanggal}
                onChange={(e) => update('tanggal', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-navy-950 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              />
            </div>

            <div>
              <label htmlFor="media" className="mb-1.5 block text-sm font-medium text-navy-950">
                Sumber Media
              </label>
              <select
                id="media"
                value={form.media}
                onChange={(e) => update('media', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-navy-950 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              >
                {mediaList.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="wilayah" className="mb-1.5 block text-sm font-medium text-navy-950">
                Wilayah
              </label>
              <select
                id="wilayah"
                value={form.wilayah}
                onChange={(e) => update('wilayah', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-navy-950 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              >
                {wilayahList.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="ringkasan" className="mb-1.5 block text-sm font-medium text-navy-950">
              Ringkasan Berita
            </label>
            <textarea
              id="ringkasan"
              rows={4}
              value={form.ringkasan}
              onChange={(e) => update('ringkasan', e.target.value)}
              placeholder="Tulis ringkasan singkat isi berita..."
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
            />
          </div>

          <div>
            <label htmlFor="gambar" className="mb-1.5 block text-sm font-medium text-navy-950">
              URL Gambar <span className="font-normal text-slate-400">(opsional)</span>
            </label>
            <div className="relative">
              <UploadCloud
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                id="gambar"
                type="url"
                value={form.gambar}
                onChange={(e) => update('gambar', e.target.value)}
                placeholder="https://... atau /nama-file.jpg"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-9 pr-3 text-sm text-navy-950 placeholder:text-slate-400 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              Kosongkan kalau belum ada gambar &mdash; sistem akan pakai gambar bawaan.
            </p>
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-negatif-text">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm font-medium text-positif-text">
              Berita berhasil disimpan. Mengarahkan ke Daftar Berita&hellip;
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setForm(emptyForm)}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-navy-950 hover:bg-slate-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-600"
            >
              Simpan Berita
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
