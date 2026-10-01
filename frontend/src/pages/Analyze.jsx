import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, RotateCcw, Zap, Sparkles } from 'lucide-react'
import useAnalyze from '../hooks/useAnalyze'
import FoodCard from '../components/FoodCard'
import NutritionChart from '../components/NutritionChart'

export default function Analyze() {
  const { image, preview, result, loading, error, handleImage, analyze, reset } = useAnalyze()

  const onDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleImage(file)
  }, [handleImage])

  return (
    <div style={{ background: '#050a0e', minHeight: '100vh', paddingTop: 90, paddingBottom: 80 }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 99, padding: '5px 16px', fontSize: 12, color: '#4ade80', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
            <Sparkles size={12} /> AI Food Analyzer
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, marginBottom: 10, letterSpacing: '-0.02em' }}>
            Food <span className="gradient-text">Analyzer</span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', maxWidth: 420, margin: '0 auto' }}>
            Upload a food photo — AI detects, classifies and calculates nutrition instantly
          </p>
        </motion.div>

        {/* Upload Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>

          <div onDrop={onDrop} onDragOver={(e) => e.preventDefault()}
            onClick={() => !preview && document.getElementById('fileInput').click()}
            style={{ position: 'relative', minHeight: preview ? 'auto' : 280, cursor: preview ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {preview ? (
              <>
                <img src={preview} alt="Food" style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,10,14,0.7) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '4px 12px', fontSize: 11, color: '#9ca3af' }}>Food Image</div>
                  <button onClick={(e) => { e.stopPropagation(); document.getElementById('fileInput').click() }}
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 14px', color: '#e5e7eb', fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
                    Change
                  </button>
                </div>
                {loading && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,10,14,0.88)', backdropFilter: 'blur(6px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                    <div style={{ position: 'relative', width: 64, height: 64 }}>
                      <div style={{ width: 64, height: 64, border: '2px solid rgba(34,197,94,0.15)', borderTop: '2px solid #22c55e', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
                      <div style={{ position: 'absolute', inset: 10, border: '2px solid rgba(34,197,94,0.1)', borderBottom: '2px solid #4ade80', borderRadius: '50%', animation: 'spin 1.5s linear infinite reverse' }} />
                    </div>
                    <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.95rem' }}>Analyzing food...</p>
                    <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>AI is detecting items</p>
                  </div>
                )}
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '52px 32px' }}>
                <motion.div animate={{ y: [0,-10,0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ marginBottom: 20 }}>
                  <div style={{ width: 80, height: 80, margin: '0 auto', background: 'rgba(34,197,94,0.08)', border: '2px dashed rgba(34,197,94,0.3)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={36} color="#22c55e" />
                  </div>
                </motion.div>
                <p style={{ color: '#f9fafb', fontWeight: 700, fontSize: '1.05rem', marginBottom: 6 }}>Drop your food photo here</p>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: 24 }}>or click to browse — JPG, PNG, WebP</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['🍕 Pizza','🍣 Sushi','🍔 Burger','🥗 Salad','🌮 Tacos'].map((f,i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 99, padding: '4px 12px', fontSize: 11, color: '#6b7280' }}>{f}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <AnimatePresence>
            {image && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px', display: 'flex', gap: 10 }}>
                <button onClick={analyze} disabled={loading}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: loading ? 'rgba(34,197,94,0.15)' : 'linear-gradient(135deg, #22c55e, #16a34a)', color: loading ? '#6b7280' : '#000', fontWeight: 700, fontSize: '0.9rem', padding: '12px 20px', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 0 24px rgba(34,197,94,0.25)', transition: 'all 0.2s' }}>
                  <Zap size={17} /> {loading ? 'Analyzing...' : 'Analyze Food'}
                </button>
                <button onClick={reset} disabled={loading}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px', color: '#6b7280', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <RotateCcw size={17} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImage(e.target.files[0])} />

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: error === 'NO_FOOD' ? 'rgba(234,179,8,0.07)' : 'rgba(239,68,68,0.07)', border: `1px solid ${error === 'NO_FOOD' ? 'rgba(234,179,8,0.25)' : 'rgba(239,68,68,0.2)'}`, borderRadius: 14, padding: '18px 20px', marginBottom: 20 }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>{error === 'NO_FOOD' ? '🚫' : '⚠️'}</div>
              <div>
                <p style={{ color: error === 'NO_FOOD' ? '#fcd34d' : '#fca5a5', fontWeight: 700, fontSize: '0.95rem', marginBottom: 5 }}>
                  {error === 'NO_FOOD' ? 'No Food Detected!' : 'Analysis Failed!'}
                </p>
                <p style={{ color: error === 'NO_FOOD' ? '#b45309' : '#991b1b', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {error === 'NO_FOOD' ? 'This image does not appear to contain food. Please upload a clear photo of a food item.' : 'Could not connect to API. Make sure the backend server is running on port 8000.'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {!result && !loading && !error && (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '60px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>🤖</div>
              <p style={{ color: '#f9fafb', fontWeight: 700, fontSize: '1.05rem' }}>AI Results will appear here</p>
              <p style={{ color: '#4b5563', fontSize: '0.875rem', maxWidth: 320, lineHeight: 1.6 }}>Upload a food photo and click Analyze to get instant nutrition breakdown</p>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {[{e:'🔍',t:'Food Detection'},{e:'🔥',t:'Calorie Count'},{e:'📊',t:'Macro Breakdown'},{e:'✅',t:'Daily Goals'}].map((item,i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '9px 14px', fontSize: 12, color: '#6b7280' }}>
                    <span>{item.e}</span>{item.t}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              {/* Total Banner */}
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 18, padding: '28px', marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Total Calories</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: '3.2rem', fontWeight: 900, color: '#4ade80', lineHeight: 1 }}>{result.total_calories}</span>
                      <span style={{ color: '#4b5563', fontWeight: 500 }}>kcal</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Items Detected</p>
                    <span style={{ fontSize: '3.2rem', fontWeight: 900, color: '#f9fafb', lineHeight: 1 }}>{result.total_items}</span>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ color: '#6b7280', fontSize: 12 }}>Daily Goal Progress</span>
                    <span style={{ color: '#4ade80', fontSize: 12, fontWeight: 600 }}>{Math.round((result.total_calories/2000)*100)}% of 2000 kcal</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 7 }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((result.total_calories/2000)*100,100)}%` }} transition={{ duration: 1.2 }}
                      style={{ height: 7, borderRadius: 99, background: 'linear-gradient(90deg, #22c55e, #4ade80)' }} />
                  </div>
                </div>
              </motion.div>

              {/* Food Cards + Nutrition Chart */}
              <div style={{ display: 'grid', gridTemplateColumns: result.detections.length > 0 ? '1fr 1fr' : '1fr', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {result.detections.map((det, i) => (
                    <FoodCard key={i} detection={det} index={i} />
                  ))}
                </div>
                {result.detections.length > 0 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <NutritionChart detections={result.detections} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}