import { useState } from 'react'
import Navbar from '../components/Navbar'
import {
  BarChart2,
  GitCompare,
  Map as MapIcon,
  TrendingUp,
  AlertTriangle,
  Download,
  Filter,
  Smile,
  Meh,
  Frown,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const sidebarSections = [
  {
    label: 'Analisis',
    items: [
      { icon: BarChart2, label: 'Analisis Sentimen', to: '/analisis', active: true },
      { icon: GitCompare, label: 'Perbandingan Media', to: '/analisis' },
      { icon: MapIcon, label: 'Perbandingan Wilayah', to: '/analisis' },
      { icon: TrendingUp, label: 'Tren Topik', to: '/analisis' },
      { icon: AlertTriangle, label: 'Alert & Risiko', to: '/analisis' },
    ],
  },
]

const trendData = [
  { tanggal: '16 Mei', Positif: 40, Netral: 40, Negatif: 20 },
  { tanggal: '17 Mei', Positif: 45, Netral: 35, Negatif: 22 },
  { tanggal: '18 Mei', Positif: 50, Netral: 32, Negatif: 24 },
  { tanggal: '19 Mei', Positif: 48, Netral: 34, Negatif: 30 },
  { tanggal: '20 Mei', Positif: 55, Netral: 30, Negatif: 34 },
  { tanggal: '21 Mei', Positif: 60, Netral: 28, Negatif: 38 },
  { tanggal: '22 Mei', Positif: 65, Netral: 26, Negatif: 40 },
]

const kategoriSentimen = [
  { label: 'Narkoba', total: 62, positif: 40, netral: 30, negatif: 30 },
  { label: 'Kriminal', total: 48, positif: 30, netral: 35, negatif: 35 },
  { label: 'Operasi', total: 40, positif: 60, netral: 25, negatif: 15 },
  { label: 'Pelayanan Publik', total: 20, positif: 75, netral: 20, negatif: 5 },
]

const mediaTerbanyak = [
  { media: 'Surya.co.id', jumlah: 45 },
  { media: 'Radar Madura', jumlah: 32 },
  { media: 'Jatim Times', jumlah: 25 },
  { media: 'Memorandum', jumlah: 18 },
]

const wilayahSentimen = [
  { wilayah: 'Surabaya', persen: 62, kategori: 'positif' },
  { wilayah: 'Malang', persen: 71, kategori: 'positif' },
  { wilayah: 'Sidoarjo', persen: 45, kategori: 'netral' },
  { wilayah: 'Gresik', persen: 38, kategori: 'netral' },
  { wilayah: 'Kediri', persen: 22, kategori: 'negatif' },
  { wilayah: 'Jember', persen: 55, kategori: 'positif' },
  { wilayah: 'Banyuwangi', persen: 48, kategori: 'netral' },
  { wilayah: 'Madiun', persen: 65, kategori: 'positif' },
]

const topikTags = [
  'narkoba',
  'polisi',
  'jawa timur',
  'kasus',
  'operasi',
  'pengungkapan',
  'amankan',
  'tersangka',
  'barang bukti',
  'penindakan',
]

const wilayahDot = {
  positif: 'bg-positif-text',
  netral: 'bg-gold-500',
  negatif: 'bg-negatif-text',
}

export default function AnalisisSentimen() {
  const [periode, setPeriode] = useState('7 Hari Terakhir')
  const [wilayah, setWilayah] = useState('Semua Wilayah')
  const [media, setMedia] = useState('Semua Media')
  const [kategori, setKategori] = useState('Semua Kategori')

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto flex max-w-[1440px]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-navy-950">Analisis Sentimen</h1>
              <p className="mt-1 text-sm text-slate-400">Analisis &gt; Analisis Sentimen</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-navy-950 hover:bg-slate-50">
              <Download size={16} /> Unduh Laporan
            </button>
          </div>

          {/* Filter bar */}
          <div className="mt-5 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <FilterSelect label="Periode" value={periode} onChange={setPeriode} options={['7 Hari Terakhir', '30 Hari Terakhir', '3 Bulan Terakhir']} />
            <FilterSelect label="Wilayah" value={wilayah} onChange={setWilayah} options={['Semua Wilayah', 'Surabaya', 'Malang', 'Sidoarjo', 'Gresik']} />
            <FilterSelect label="Media" value={media} onChange={setMedia} options={['Semua Media', 'Surya.co.id', 'Radar Madura', 'Jatim Times']} />
            <FilterSelect label="Kategori Berita" value={kategori} onChange={setKategori} options={['Semua Kategori', 'Narkoba', 'Kriminal', 'Operasi', 'Pelayanan Publik']} />
            <button className="ml-auto flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
              <Filter size={15} /> Terapkan Filter
            </button>
          </div>

          {/* Insight banner */}
          <div className="mt-5 flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
              <TrendingUp size={14} />
            </span>
            <div className="text-sm text-navy-950">
              <p className="font-semibold">Insight</p>
              <p className="mt-1 text-slate-600">
                Sentimen negatif naik 8% dibanding minggu lalu, didorong oleh pemberitaan isu
                narkoba di wilayah Surabaya. Sentimen positif tetap stabil, terutama dari liputan
                operasi kepolisian.
              </p>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <StatCard
              label="POSITIF"
              icon={Smile}
              color="text-positif-text"
              bg="bg-positif-bg"
              value="45%"
              total="110 Berita"
              trend="+2% vs minggu lalu"
              trendUp
            />
            <StatCard
              label="NETRAL"
              icon={Meh}
              color="text-gold-600"
              bg="bg-gold-100"
              value="30%"
              total="74 Berita"
              trend="-6% vs minggu lalu"
              trendUp={false}
            />
            <StatCard
              label="NEGATIF"
              icon={Frown}
              color="text-negatif-text"
              bg="bg-negatif-bg"
              value="25%"
              total="81 Berita"
              trend="+8% vs minggu lalu"
              trendUp
              badTrend
            />
          </div>

          {/* Trend chart + category bars */}
          <div className="mt-5 grid gap-5 lg:grid-cols-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-navy-950">Perubahan Sentimen</h2>
                <button className="text-sm font-medium text-navy-700 hover:underline">
                  Bandingkan Periode
                </button>
              </div>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ left: -20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="tanggal" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Positif" stroke="#1a8a4a" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Netral" stroke="#f5b915" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Negatif" stroke="#c0392b" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-3 rounded-lg bg-negatif-bg px-3 py-2 text-xs font-medium text-negatif-text">
                &#9888; Tren sentimen negatif mendekati ambang batas dalam 3 hari terakhir.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
              <h2 className="font-semibold text-navy-950">Sentimen per Kategori Berita</h2>
              <div className="mt-4 flex flex-col gap-4">
                {kategoriSentimen.map((k) => (
                  <div key={k.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-navy-950">{k.label}</span>
                      <span className="text-slate-400">{k.total} berita</span>
                    </div>
                    <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="bg-positif-text" style={{ width: `${k.positif}%` }} />
                      <div className="bg-gold-500" style={{ width: `${k.netral}%` }} />
                      <div className="bg-negatif-text" style={{ width: `${k.negatif}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media table + region breakdown */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-navy-950">Media Terbanyak</h2>
                <button className="text-sm font-medium text-navy-700 hover:underline">
                  Lihat Perbandingan Media &rsaquo;
                </button>
              </div>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400">
                    <th className="pb-2 font-medium">Media</th>
                    <th className="pb-2 text-right font-medium">Jumlah Berita</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaTerbanyak.map((m) => (
                    <tr key={m.media} className="border-t border-slate-100">
                      <td className="py-2.5 text-navy-950">{m.media}</td>
                      <td className="py-2.5 text-right text-slate-500">{m.jumlah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-navy-950">Sebaran Sentimen per Wilayah</h2>
                <button className="text-sm font-medium text-navy-700 hover:underline">
                  Lihat Perbandingan Wilayah &rsaquo;
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {wilayahSentimen.map((w) => (
                  <div
                    key={w.wilayah}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-2.5 text-center"
                  >
                    <span
                      className={`mx-auto flex h-2.5 w-2.5 rounded-full ${wilayahDot[w.kategori]}`}
                    />
                    <p className="mt-1.5 text-xs font-medium text-navy-950">{w.wilayah}</p>
                    <p className="text-xs text-slate-400">{w.persen}% positif</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-positif-text" /> Positif (60% - 100%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-gold-500" /> Netral (30% - 59%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-negatif-text" /> Negatif (0% - 29%)
                </span>
              </div>
            </div>
          </div>

          {/* Topic tags */}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold text-navy-950">Kata &amp; Topik yang Sering Muncul</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {topikTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <aside className="sticky top-[57px] hidden h-[calc(100vh-57px)] w-60 shrink-0 overflow-y-auto border-r border-navy-800 bg-navy-950 py-5 lg:block">
      {sidebarSections.map((section) => (
        <div key={section.label} className="mb-5 px-4">
          <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">
            {section.label}
          </p>
          <div className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <button
                key={item.label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-gold-500 text-navy-950'
                    : 'text-white/75 hover:bg-white/10'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  )
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-navy-950 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}

function StatCard({ label, icon: Icon, color, bg, value, total, trend, trendUp, badTrend }) {
  const TrendIcon = trendUp ? ChevronUp : ChevronDown
  const trendColor = badTrend ? 'text-negatif-text' : trendUp ? 'text-positif-text' : 'text-negatif-text'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <span className={`text-xs font-semibold tracking-wide ${color}`}>{label}</span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${bg} ${color}`}>
          <Icon size={16} />
        </span>
      </div>
      <p className="mt-2 text-3xl font-bold text-navy-950">{value}</p>
      <div className="mt-1.5 flex items-center justify-between text-xs">
        <span className="text-slate-400">{total}</span>
        <span className={`flex items-center gap-0.5 font-medium ${trendColor}`}>
          <TrendIcon size={12} /> {trend}
        </span>
      </div>
    </div>
  )
}
