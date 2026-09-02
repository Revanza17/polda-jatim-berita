import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Beranda from './pages/Beranda'
import DaftarBerita from './pages/DaftarBerita'
import SegeraHadir from './pages/SegeraHadir'
import InputBerita from './pages/InputBerita'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/beranda" element={<Beranda />} />
      <Route path="/daftar-berita" element={<DaftarBerita />} />
      <Route
        path="/analisis"
        element={
          <SegeraHadir
            title="Analisis Sentimen"
            desc="Halaman grafik tren dan statistik pemberitaan akan tersedia di sini."
          />
        }
      />
      <Route path="/input-berita" element={<InputBerita />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
