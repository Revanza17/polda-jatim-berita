import { useMemo, useState } from 'react'
import { Search, ChevronLeft, ChevronRight, MapPin, Calendar, Globe } from 'lucide-react'
import Navbar from '../components/Navbar'
import KategoriBadge from '../components/KategoriBadge'
import { beritaList, mediaList, wilayahList } from '../data/berita'

const PAGE_SIZE = 4

const kategoriOptions = ['Semua', 'Positif', 'Netral', 'Negatif']
const sortOptions = [
  { value: 'terbaru', label: 'Terbaru' },
  { value: 'terlama', label: 'Terlama' },
]

export default function DaftarBerita() {
  const [query, setQuery] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [media, setMedia] = useState('Semua Media')
  const [wilayah, setWilayah] = useState('Semua Wilayah')
  const [dariTanggal, setDariTanggal] = useState('')
  const [sampaiTanggal, setSampaiTanggal] = useState('')
  const [urutan, setUrutan] = useState('terbaru')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let items = beritaList.filter((b) => {
      if (query && !b.judul.toLowerCase().includes(query.toLowerCase())) return false
      if (kategori !== 'Semua' && b.kategori !== kategori) return false
      if (media !== 'Semua Media' && b.media !== media) return false
      if (wilayah !== 'Semua Wilayah' && b.wilayah !== wilayah) return false
      if (dariTanggal && b.tanggal < dariTanggal) return false
      if (sampaiTanggal && b.tanggal > `${sampaiTanggal}T23:59:59`) return false
      return true
    })

    items = items.sort((a, b) =>
      urutan === 'terbaru'
        ? new Date(b.tanggal) - new Date(a.tanggal)
        : new Date(a.tanggal) - new Date(b.tanggal)
    )
    return items
  }, [query, kategori, media, wilayah, dariTanggal, sampaiTanggal, urutan])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function updateFilter(setter) {
    return (value) => {
      setter(value)
      setPage(1)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-6xl gap-8 px-6 py-10 lg:flex">
        <aside className="mb-8 w-full shrink-0 lg:mb-0 lg:w-64">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-navy-950">Filter Berita</h2>

            <div className="relative mt-4">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => updateFilter(setQuery)(e.target.value)}
                placeholder="Cari berita..."
                className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              />
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold text-navy-950">Kategori</legend>
              <div className="mt-2 flex flex-col gap-1.5">
                {kategoriOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="radio"
                      name="kategori"
                      checked={kategori === opt}
                      onChange={() => updateFilter(setKategori)(opt)}
                      className="h-3.5 w-3.5 border-slate-300 text-navy-700 focus:ring-navy-700/30"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-navy-950">Tanggal</h3>
              <div className="mt-2 flex flex-col gap-2">
                <label className="flex flex-col gap-1 text-xs text-slate-500">
                  Dari tanggal
                  <input
                    type="date"
                    value={dariTanggal}
                    onChange={(e) => updateFilter(setDariTanggal)(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs text-slate-500">
                  Sampai tanggal
                  <input
                    type="date"
                    value={sampaiTanggal}
                    onChange={(e) => updateFilter(setSampaiTanggal)(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                  />
                </label>
              </div>
            </div>

            <label className="mt-6 block">
              <h3 className="text-sm font-semibold text-navy-950">Media</h3>
              <select
                value={media}
                onChange={(e) => updateFilter(setMedia)(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              >
                <option>Semua Media</option>
                {mediaList.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>

            <label className="mt-6 block">
              <h3 className="text-sm font-semibold text-navy-950">Wilayah</h3>
              <select
                value={wilayah}
                onChange={(e) => updateFilter(setWilayah)(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              >
                <option>Semua Wilayah</option>
                {wilayahList.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </label>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-navy-950">Daftar Berita</h1>
              <p className="mt-1 text-sm text-slate-500">Total {filtered.length} Berita</p>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              Urutkan:
              <select
                value={urutan}
                onChange={(e) => setUrutan(e.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-5">
            {pageItems.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
                Tidak ada berita yang cocok dengan filter ini. Coba ubah kata kunci atau filter.
              </p>
            )}

            {pageItems.map((b) => (
              <article
                key={b.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row"
              >
                <img
                  src={b.gambar}
                  alt=""
                  className="h-40 w-full shrink-0 rounded-xl object-cover sm:h-auto sm:w-40"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-navy-950">{b.judul}</h2>
                    <KategoriBadge kategori={b.kategori} />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Globe size={13} /> {b.media}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {new Date(b.tanggal).toLocaleString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      WIB
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {b.wilayah}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{b.ringkasan}</p>

                  <button className="mt-3 self-end rounded-lg border border-slate-300 px-4 py-1.5 text-sm font-medium text-navy-950 hover:bg-slate-50">
                    Baca Detail
                  </button>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label="Navigasi halaman"
              className="mt-8 flex items-center justify-center gap-1.5"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Halaman sebelumnya"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-500 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium ${
                    p === currentPage
                      ? 'bg-navy-900 text-white'
                      : 'border border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Halaman berikutnya"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-500 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          )}
        </main>
      </div>
    </div>
  )
}
