import { motion } from 'framer-motion'

export default function FoodCard({ detection, index }) {
  const { classified_as, confidence, nutrition, method } = detection

  const confColor  = confidence > 0.7 ? '#22c55e' : confidence > 0.4 ? '#eab308' : '#f97316'
  const confBg     = confidence > 0.7 ? 'rgba(34,197,94,0.1)' : confidence > 0.4 ? 'rgba(234,179,8,0.1)' : 'rgba(249,115,22,0.1)'
  const confBorder = confidence > 0.7 ? 'rgba(34,197,94,0.25)' : confidence > 0.4 ? 'rgba(234,179,8,0.25)' : 'rgba(249,115,22,0.25)'

  const macros = [
    { label: 'Protein', value: nutrition.protein_g, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  max: 50  },
    { label: 'Carbs',   value: nutrition.carbs_g,   color: '#eab308', bg: 'rgba(234,179,8,0.1)',   max: 250 },
    { label: 'Fat',     value: nutrition.fat_g,     color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   max: 65  },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '24px', transition: 'all 0.3s' }}
      whileHover={{ borderColor: 'rgba(34,197,94,0.2)', y: -2 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ flex: 1, paddingRight: 16 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f9fafb', marginBottom: 8, textTransform: 'capitalize' }}>
            {classified_as.replace(/_/g, ' ')}
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ background: confBg, border: `1px solid ${confBorder}`, borderRadius: 99, padding: '3px 10px', fontSize: 12, fontWeight: 600, color: confColor }}>
              {(confidence * 100).toFixed(1)}% confidence
            </span>
            <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 99, padding: '3px 10px', fontSize: 11, color: '#6b7280' }}>
              {method === 'YOLO + EfficientNet' ? 'YOLO + AI' : 'AI Classifier'}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#4ade80', lineHeight: 1 }}>{nutrition.calories}</div>
          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>kcal</div>
          <div style={{ fontSize: 11, color: '#4b5563', marginTop: 4 }}>{nutrition.portion_estimate}</div>
        </div>
      </div>

      {/* Calorie bar */}
      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 99, height: 5, marginBottom: 16 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((nutrition.calories / 600) * 100, 100)}%` }}
          transition={{ duration: 1 }}
          style={{ height: 5, borderRadius: 99, background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
        />
      </div>

      {/* Macros */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {macros.map((m, i) => (
          <div key={i} style={{ background: m.bg, borderRadius: 12, padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: m.color, marginBottom: 2 }}>{m.value}g</div>
            <div style={{ fontSize: 11, color: '#6b7280' }}>{m.label}</div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 3, marginTop: 6 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((m.value / m.max) * 100, 100)}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                style={{ height: 3, borderRadius: 99, background: m.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Per 100g */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#6b7280' }}>Per 100g</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'Cal', value: nutrition.per_100g?.calories || nutrition.calories },
            { label: 'P',   value: `${nutrition.per_100g?.protein || nutrition.protein_g}g` },
            { label: 'C',   value: `${nutrition.per_100g?.carbs   || nutrition.carbs_g}g`   },
            { label: 'F',   value: `${nutrition.per_100g?.fat     || nutrition.fat_g}g`     },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e5e7eb' }}>{item.value}</div>
              <div style={{ fontSize: 10, color: '#4b5563' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}