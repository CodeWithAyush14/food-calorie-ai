import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Cpu, Server, Layout } from 'lucide-react'

const metrics = [
  { label: 'YOLO mAP50',       value: '69.9%', color: '#22c55e' },
  { label: 'EfficientNet Acc', value: '88.5%', color: '#3b82f6' },
  { label: 'Food Classes',     value: '256+',  color: '#f97316' },
  { label: 'Training Images',  value: '132K+', color: '#ec4899' },
  { label: 'Nutrition DB',     value: '300K+', color: '#22c55e' },
  { label: 'Data Source',      value: 'USDA',  color: '#3b82f6' },
]

const pipeline = [
  { n:'01', icon:'📸', title:'Image Input',      desc:'User uploads a food image (JPG/PNG/WebP)'                        },
  { n:'02', icon:'🔍', title:'YOLO Detection',   desc:'YOLOv8 scans image and draws bounding boxes around food items'   },
  { n:'03', icon:'🧠', title:'Classification',   desc:'EfficientNet-B3 classifies each detected food item'              },
  { n:'04', icon:'📊', title:'Nutrition Lookup', desc:'USDA API fetches accurate calories and macro data'               },
  { n:'05', icon:'✅', title:'Results Display',  desc:'Complete nutrition breakdown shown to user'                      },
]

const tech = [
  { icon: <Target size={20} color="#22c55e" />, category: 'Detection Model',      color: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)',   items: [{ name:'YOLOv8s', desc:'Real-time food object detection' }, { name:'UEC Food-256', desc:'31,395 images — 256 food classes' }, { name:'mAP50: 69.9%', desc:'Mean Average Precision on val set' }] },
  { icon: <Cpu size={20} color="#3b82f6" />,    category: 'Classification Model', color: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  items: [{ name:'EfficientNet-B3', desc:'State-of-the-art CNN classifier' }, { name:'Food-101', desc:'75,750 training images — 101 classes' }, { name:'Accuracy: 88.5%', desc:'Top-1 accuracy on test set' }] },
  { icon: <Server size={20} color="#f97316" />, category: 'Backend',              color: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.2)',  items: [{ name:'FastAPI', desc:'High-performance Python API' }, { name:'USDA FoodData Central', desc:'Real nutrition data (300K+ foods)' }, { name:'M2 MPS', desc:'Apple Silicon GPU acceleration' }] },
  { icon: <Layout size={20} color="#a855f7" />, category: 'Frontend',             color: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)',  items: [{ name:'React + Vite', desc:'Fast modern web framework' }, { name:'Framer Motion', desc:'Smooth page animations' }, { name:'TailwindCSS v4', desc:'Utility-first styling' }] },
]

const info = [
  { label:'Student',   value:'Ayush Gupta'            },
  { label:'Course',    value:'MScIT — AI / ML'        },
  { label:'Project',   value:'Hands-on Project'       },
  { label:'Models',    value:'YOLOv8 + EfficientNet'  },
  { label:'Platform',  value:'MacBook M2 Air'         },
  { label:'Framework', value:'PyTorch + FastAPI'       },
]

const datasets = [
  { emoji:'🥘', name:'UEC Food-256', rows:[['Total Images','31,395'],['Classes','256'],['Annotations','Bounding Box'],['Used For','YOLO Detection'],['Split','70/20/10%']] },
  { emoji:'🍽️', name:'Food-101',    rows:[['Total Images','101,000'],['Classes','101'],['Annotations','Class Labels'],['Used For','EfficientNet Classification'],['Split','75,750 / 25,250']] },
]

export default function About() {
  return (
    <div style={{ background: '#050a0e', minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'inline-block', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 99, padding: '5px 16px', fontSize: 12, color: '#4ade80', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>About the Project</div>
          <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
            About <span className="gradient-text">FoodAI</span>
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            MScIT AI/ML Hands-on Project — Advanced food detection and calorie estimation system built with deep learning
          </p>
        </motion.div>

        {/* Project Info */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '40px', marginBottom: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
          <div>
            <h2 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16 }}>Project Overview</h2>
            <p style={{ color: '#9ca3af', lineHeight: 1.8, marginBottom: 16 }}>FoodAI is an advanced deep learning project that uses computer vision to detect food items in images and estimate their calories accurately.</p>
            <p style={{ color: '#9ca3af', lineHeight: 1.8 }}>This project combines YOLOv8 for detection and EfficientNet-B3 for classification — both trained on Kaggle T4 x2 GPU for maximum accuracy.</p>
          </div>
          <div>
            {info.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < info.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>{item.label}</span>
                <span style={{ color: '#f9fafb', fontSize: '0.9rem', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>Model <span className="gradient-text">Metrics</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {metrics.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i*0.05 }} viewport={{ once: true }} whileHover={{ y: -2 }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px 16px', textAlign: 'center', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 900, color: m.color, marginBottom: 8 }}>{m.value}</div>
                <div style={{ color: '#6b7280', fontSize: '0.78rem' }}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pipeline */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>AI <span className="gradient-text">Pipeline</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pipeline.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i*0.08 }} viewport={{ once: true }} whileHover={{ x: 4, borderColor: 'rgba(34,197,94,0.2)' }}
                style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 24px', transition: 'all 0.2s' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#22c55e', opacity: 0.4, minWidth: 36 }}>{p.n}</div>
                <div style={{ fontSize: '1.6rem', minWidth: 36 }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#f9fafb', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{p.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>Tech <span className="gradient-text">Stack</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {tech.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} viewport={{ once: true }}
                style={{ background: t.color, border: `1px solid ${t.border}`, borderRadius: 16, padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, background: 'rgba(0,0,0,0.3)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.icon}</div>
                  <h3 style={{ fontWeight: 700, color: '#f9fafb', fontSize: '1rem' }}>{t.category}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {t.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', marginTop: 6, flexShrink: 0 }} />
                      <div>
                        <span style={{ color: '#f9fafb', fontSize: '0.875rem', fontWeight: 600 }}>{item.name}</span>
                        <span style={{ color: '#6b7280', fontSize: '0.8rem' }}> — {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Datasets */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>Training <span className="gradient-text">Datasets</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {datasets.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i*0.1 }} viewport={{ once: true }}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: '1.5rem' }}>{d.emoji}</span>
                  <h3 style={{ fontWeight: 700, color: '#f9fafb' }}>{d.name}</h3>
                </div>
                {d.rows.map(([l,v], j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: j < d.rows.length-1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{l}</span>
                    <span style={{ color: '#f9fafb', fontSize: '0.875rem', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 24, padding: '56px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>🚀</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 12 }}>Try <span className="gradient-text">FoodAI</span> Now</h2>
          <p style={{ color: '#9ca3af', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.7 }}>Upload your food image and get instant AI-powered nutrition analysis</p>
          <Link to="/analyze" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#22c55e', color: '#000', fontWeight: 700, padding: '14px 32px', borderRadius: 12, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 0 32px rgba(34,197,94,0.3)', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background='#4ade80'}
            onMouseLeave={e => e.currentTarget.style.background='#22c55e'}>
            Analyze Now <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </div>
  )
}