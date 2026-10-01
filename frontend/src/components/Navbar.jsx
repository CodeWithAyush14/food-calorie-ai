import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { path: '/',        label: 'Home'    },
    { path: '/analyze', label: 'Analyze' },
    { path: '/about',   label: 'About'   },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(5,10,14,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 0 16px rgba(34,197,94,0.3)' }}>
            🍛
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', background: 'linear-gradient(135deg, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            FoodAI
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {links.map(link => {
            const active = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path} style={{
                textDecoration: 'none', padding: '8px 18px', borderRadius: 10,
                fontSize: '0.9rem', fontWeight: active ? 600 : 500,
                color: active ? '#4ade80' : '#9ca3af',
                background: active ? 'rgba(34,197,94,0.1)' : 'transparent',
                border: active ? '1px solid rgba(34,197,94,0.2)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}>
                {link.label}
              </Link>
            )
          })}
          <Link to="/analyze" style={{
            textDecoration: 'none', marginLeft: 8, padding: '9px 22px', borderRadius: 10,
            fontSize: '0.9rem', fontWeight: 700, color: '#000',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            boxShadow: '0 0 20px rgba(34,197,94,0.25)', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            Try Now
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </motion.nav>
  )
}