import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Brain, Flame, BarChart3, CheckCircle2 } from 'lucide-react'

const features = [
  { icon: <Zap size={22} color="#eab308" />,    title: 'Real-time Detection',  desc: 'YOLOv8 detects food items in milliseconds with precise bounding boxes.',         color: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.2)'  },
  { icon: <Brain size={22} color="#3b82f6" />,   title: 'Smart Classification', desc: 'EfficientNet-B3 classifies 101+ food categories with 88.5% accuracy.',            color: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
  { icon: <Flame size={22} color="#f97316" />,   title: 'Accurate Calories',    desc: 'Real calorie data powered by USDA FoodData Central — 300,000+ foods.',            color: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)' },
  { icon: <BarChart3 size={22} color="#a855f7"/>, title: 'Nutrition Dashboard', desc: 'Complete macro breakdown with daily goal tracking for protein, carbs and fat.',   color: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)' },
]

const stats = [
  { value: '256+',  label: 'Food Classes',    sub: 'Detected by YOLO'       },
  { value: '88.5%', label: 'Accuracy',        sub: 'EfficientNet-B3'        },
  { value: '300K+', label: 'Nutrition Items', sub: 'USDA FoodData Central'  },
  { value: '<1s',   label: 'Detection Speed', sub: 'Real-time inference'    },
]

const steps = [
  { n: '01', emoji: '📸', title: 'Upload Photo',  desc: 'Take or upload any food photo. Supports JPG, PNG, WebP.' },
  { n: '02', emoji: '🤖', title: 'AI Processing', desc: 'YOLOv8 detects items. EfficientNet classifies each one.' },
  { n: '03', emoji: '📊', title: 'Get Results',   desc: 'Instant calories, macros and nutrition breakdown.'        },
]

const checks = [
  '256+ food categories supported',
  'Under 1 second detection speed',
  'Protein, carbs & fat breakdown',
  'Daily nutrition goal tracking',
  'Works with any food photo',
  'Free to use',
]

export default function Home() {
  return (
    <div style={{ background: '#050a0e', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(34,197,94,0.12), transparent)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.1), transparent)', borderRadius: '50%', filter: 'blur(40px)' }} />

        {['🍕','🍣','🍔','🌮','🥗','🍜','🍰','🥩'].map((f, i) => (
          <div key={i} style={{ position: 'absolute', fontSize: i%2===0 ? '2.5rem' : '2rem', top: `${15+(i*10)%70}%`, left: i<4 ? `${2+i*3}%` : undefined, right: i>=4 ? `${2+(i-4)*3}%` : undefined, opacity: 0.15, animation: `float ${5+i*0.8}s ease-in-out infinite`, animationDelay: `${i*0.5}s`, pointerEvents: 'none' }}>
            {f}
          </div>
        ))}

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 860, margin: '0 auto', padding: '120px 24px 80px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 99, padding: '8px 18px', marginBottom: 32 }}>
            <span className="pulse-dot" style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontSize: 13, color: '#86efac', fontWeight: 500 }}>AI-Powered Food Detection & Calorie Estimation</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.03em' }}>
            Snap your food.<br />
            <span className="gradient-text">Know your calories.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#9ca3af', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
            Upload any food photo and our AI instantly identifies every item, calculates calories and delivers a complete nutrition breakdown.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <Link to="/analyze" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#22c55e', color: '#000', fontWeight: 700, padding: '14px 32px', borderRadius: 12, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 0 32px rgba(34,197,94,0.35)', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='#4ade80'}
              onMouseLeave={e => e.currentTarget.style.background='#22c55e'}>
              Try For Free <ArrowRight size={18} />
            </Link>
            <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', color: '#e5e7eb', fontWeight: 600, padding: '14px 28px', borderRadius: 12, fontSize: '1rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s' }}>
              Learn More
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 32px', justifyContent: 'center' }}>
            {checks.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#9ca3af' }}>
                <CheckCircle2 size={14} color="#22c55e" /> {c}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} viewport={{ once: true }} style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div className="gradient-text" style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ color: '#f9fafb', fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#6b7280', fontSize: 13 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 99, padding: '5px 16px', fontSize: 12, color: '#4ade80', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Features</div>
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, marginBottom: 16 }}>Everything you need to<br /><span className="gradient-text">track your nutrition</span></h2>
            <p style={{ color: '#9ca3af', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>Powered by deep learning models trained on 132,000+ food images</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i*0.1 }} viewport={{ once: true }} whileHover={{ y: -4, borderColor: f.border }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '32px', transition: 'all 0.3s' }}>
                <div style={{ width: 48, height: 48, background: f.color, border: `1px solid ${f.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f9fafb', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '0.95rem' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '100px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 99, padding: '5px 16px', fontSize: 12, color: '#4ade80', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>How It Works</div>
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900 }}>Three simple <span className="gradient-text">steps</span></h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }}>
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.15 }} viewport={{ once: true }} style={{ textAlign: 'center', padding: '0 16px' }}>
                <div style={{ width: 80, height: 80, margin: '0 auto 24px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{s.emoji}</div>
                <div style={{ fontSize: 12, color: '#4ade80', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 10 }}>{s.n}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f9fafb', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: '0.9rem' }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{ maxWidth: 760, margin: '0 auto', background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 28, padding: '72px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: '3rem', marginBottom: 24 }}>🍱</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, marginBottom: 16 }}>Ready to track your <span className="gradient-text">nutrition?</span></h2>
          <p style={{ color: '#9ca3af', marginBottom: 36, maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.7 }}>Upload your food photo and get instant AI-powered nutrition analysis</p>
          <Link to="/analyze" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#22c55e', color: '#000', fontWeight: 700, padding: '16px 36px', borderRadius: 12, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 0 40px rgba(34,197,94,0.35)', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='#4ade80'}
            onMouseLeave={e => e.currentTarget.style.background='#22c55e'}>
            Start Analyzing Now <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: '#22c55e', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🍛</div>
            <span style={{ fontWeight: 700, fontSize: '1rem' }} className="gradient-text">FoodAI</span>
          </div>
          <p style={{ color: '#4b5563', fontSize: 13 }}>Powered by <span style={{ color: '#22c55e' }}>YOLOv8</span> + <span style={{ color: '#22c55e' }}>EfficientNet-B3</span></p>
          <p style={{ color: '#4b5563', fontSize: 13 }}>MScIT AI/ML Project © 2026</p>
        </div>
      </footer>
    </div>
  )
}