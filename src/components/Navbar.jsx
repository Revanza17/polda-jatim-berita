import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/beranda', label: 'Beranda' },
  { to: '/daftar-berita', label: 'Daftar Berita' },
  { to: '/analisis', label: 'Analisis' },
  { to: '/input-berita', label: 'Input Berita' },
]

function useClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Navbar() {
  const now = useClock()
  const formatted = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })

  return (
    <header className="sticky top-0 z-40">
      <div className="hidden items-center justify-between bg-navy-950 px-6 py-1.5 text-xs text-white/60 sm:flex">
        <span>{formatted}, {time}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          Sistem Analisis Berita
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 bg-navy-900 px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src="/logo-jatim.svg"
            alt="Lambang Kepolisian Daerah Jawa Timur"
            className="h-14 w-14 sm:h-16 sm:w-16"
          />
          <div className="leading-tight">
            <p className="text-lg font-bold text-white sm:text-x1">
              Analisis Berita Kepolisian
            </p>
            <p className="text-xs font-medium text-gold-500 sm:text-sm">
              Kepolisian Daerah Jawa Timur &mdash; Bidang TIK
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-500 text-navy-950'
                    : 'text-white/85 ring-1 ring-inset ring-white/15 hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <MobileMenu />
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Buka menu navigasi"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg ring-1 ring-inset ring-white/20"
      >
        <span className="h-0.5 w-5 bg-white" />
        <span className="h-0.5 w-5 bg-white" />
        <span className="h-0.5 w-5 bg-white" />
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-1 bg-navy-900 p-3 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2.5 text-sm font-medium ${
                  isActive ? 'bg-gold-500 text-navy-950' : 'text-white/85 hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
