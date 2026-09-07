import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Beranda from './pages/Beranda'
import DaftarBerita from './pages/DaftarBerita'
import InputBerita from './pages/InputBerita'
import AnalisisSentimen from './pages/AnalisisSentimen'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/beranda" element={<Beranda />} />
      <Route path="/daftar-berita" element={<DaftarBerita />} />
      <Route path="/analisis" element={<AnalisisSentimen />} />
      <Route path="/input-berita" element={<InputBerita />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}