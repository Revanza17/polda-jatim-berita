import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Email dan password wajib diisi.')
      return
    }
    setError('')
    // TODO: sambungkan ke endpoint autentikasi backend.
    navigate('/beranda')
  }

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-navy-950">
      <img
        src="Gedung Polda Jatim.jpeg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/95 to-navy-900/60" />
      <div className="hidden items-center gap-4 text-white lg:absolute lg:top-6 lg:left-6 lg:z-20 lg:flex">
        <img
          src="/logo-jatim.svg"
          alt="Lambang Kepolisian Daerah Jawa Timur"
          className="h-16 w-16 sm:h-20 sm:w-20"
      />
      <div className="leading-snug">
        <p className="text-lg font-bold sm:text-2xl">
          Analisis Berita Kepolisian
        </p>
      <p className="text-sm font-semibold text-gold-500 sm:text-lg">
          Kepolisian Daerah Jawa Timur &mdash; Bidang TIK
        </p>
      </div>
    </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-navy-950">Masuk Akun Anda</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-950">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="nama@poldajatim.go.id"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-950">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-11 text-sm text-navy-950 placeholder:text-slate-400 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-navy-950"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-navy-950">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-gold-500 focus:ring-gold-500"
              />
              Ingat saya
            </label>

            {error && (
              <p role="alert" className="text-sm font-medium text-negatif-text">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-600"
            >
              Masuk
            </button>

            <p className="text-center text-sm text-slate-600">
              Belum punya akun?{' '}
              <Link to="/daftar" className="font-medium text-navy-700 hover:underline">
                Daftar
              </Link>
            </p>
          </form>
        </div>
        </div>
      </div>
  )
}
