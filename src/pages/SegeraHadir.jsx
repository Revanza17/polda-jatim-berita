import Navbar from '../components/Navbar'

export default function SegeraHadir({ title, desc }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
        <span className="rounded-full bg-gold-100 px-4 py-1.5 text-xs font-semibold text-gold-600">
          Dalam pengembangan
        </span>
        <h1 className="mt-4 text-2xl font-bold text-navy-950">{title}</h1>
        <p className="mt-2 max-w-md text-sm text-slate-500">{desc}</p>
      </div>
    </div>
  )
}
