import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import About from './pages/About'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#050a0e' }}>
      <Navbar />
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/about"   element={<About />}   />
      </Routes>
    </div>
  )
}