import { BookOpen, Smile, BarChart3, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import { stats } from '../data/berita'

const features = [
  {
    icon: BookOpen,
    iconBg: 'bg-navy-700/10 text-navy-700',
    accent: 'bg-gold-500',
    title: 'Manajemen Berita',
    desc: 'Mengelola data berita kepolisian dari berbagai media secara terpusat dan terstruktur.',
  },
  {
    icon: Smile,
    iconBg: 'bg-positif-bg text-positif-text',
    accent: 'bg-positif-text',
    title: 'Analisis Sentimen',
    desc: 'Menganalisis sentimen berita menjadi kategori positif, netral, dan negatif secara otomatis.',
  },
  {
    icon: BarChart3,
    iconBg: 'bg-sky-100 text-sky-600',
    accent: 'bg-sky-500',
    title: 'Statistik Pemberitaan',
    desc: 'Menampilkan grafik, tren, dan statistik pemberitaan berdasarkan waktu, media, dan kategori.',
  },
  {
    icon: MapPin,
    iconBg: 'bg-violet-100 text-violet-600',
    accent: 'bg-violet-500',
    title: 'Sebaran Wilayah',
    desc: 'Memetakan sebaran berita berdasarkan wilayah hukum Polres/Polresta/Polsek di Jawa Timur.',
  },
]

const statItems = [
  { value: stats.totalBerita, label: 'Total Berita' },
  { value: stats.sumberMedia, label: 'Sumber Media' },
  { value: stats.wilayahTerpantau, label: 'Wilayah Terpantau' },
]

export default function Beranda() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden bg-navy-950">
        <img
          src="Gedung Polda Jatim.jpeg"
          alt=""
          className="absolute inset-y-0 right-0 w-full object-cover opacity-75 md:w-3/5"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 py-14">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Pemantauan Opini Publik Seputar Kepolisian di Jawa Timur
            </h1>
            <p className="mt-4 text-white/70">
              Sistem ini merekam, mengelompokkan, dan menilai sentimen pemberitaan media
              terkait institusi Polri di wilayah hukum Polda Jatim, sebagai bahan evaluasi
              Humas dan pengambilan kebijakan.
            </p>
            <p className="mt-6 text-sm font-medium text-gold-500">
              Melindungi, Mengayomi, Melayani
            </p>
          </div>

          <dl className="mt-12 flex flex-wrap gap-8 sm:gap-14">
            {statItems.map((item) => (
              <div key={item.label}>
                <dt className="sr-only">{item.label}</dt>
                <dd className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 text-xl font-bold text-white sm:h-20 sm:w-20 sm:text-2xl">
                  {item.value}
                </dd>
                <p className="mt-2 text-sm text-white/70">{item.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-xl font-bold text-navy-950">Fitur Utama Sistem</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${f.iconBg}`}>
                <f.icon size={22} />
              </div>
              <h3 className="mt-4 font-semibold text-navy-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
              <span className={`mt-4 block h-0.5 w-8 rounded-full ${f.accent}`} />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
