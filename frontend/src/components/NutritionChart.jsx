import { motion } from 'framer-motion'

export default function NutritionChart({ detections }) {
  if (!detections || detections.length === 0) return null

  const totals = detections.reduce((acc, det) => ({
    calories: acc.calories + det.nutrition.calories,
    protein : acc.protein  + det.nutrition.protein_g,
    carbs   : acc.carbs    + det.nutrition.carbs_g,
    fat     : acc.fat      + det.nutrition.fat_g,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  const totalMacros = totals.protein + totals.carbs + totals.fat

  const macros = [
    { label: 'Protein', value: totals.protein, daily: 50,  color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  pct: Math.round((totals.protein / totalMacros) * 100) },
    { label: 'Carbs',   value: totals.carbs,   daily: 250, color: '#eab308', bg: 'rgba(234,179,8,0.1)',   pct: Math.round((totals.carbs   / totalMacros) * 100) },
    { label: 'Fat',     value: totals.fat,      daily: 65,  color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   pct: Math.round((totals.fat     / totalMacros) * 100) },
  ]

  const dailyPct = Math.min(Math.round((totals.calories / 2000) * 100), 100)

  // Donut chart
  const radius = 54, stroke = 14, cx = 80, cy = 80
  const circumference = 2 * Math.PI * radius
  let cumulativePct = 0
  const segments = macros.map(m => {
    const dash   = (m.pct / 100) * circumference
    const offset = circumference - (cumulativePct / 100) * circumference
    cumulativePct += m.pct
    return { ...m, dash, offset }
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '24px' }}
    >
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f9fafb', marginBottom: 20 }}>Nutrition Summary</h3>

      {/* Donut + Macros */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
        <div style={{ flexShrink: 0 }}>
          <svg width={160} height={160} viewBox="0 0 160 160">
            <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
            {segments.map((seg, i) => (
              <motion.circle
                key={i}
                cx={cx} cy={cy} r={radius}
                fill="none" stroke={seg.color} strokeWidth={stroke}
                strokeDasharray={`${seg.dash} ${circumference}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="butt"
                transform={`rotate(-90 ${cx} ${cy})`}
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray: `${seg.dash} ${circumference}` }}
                transition={{ duration: 1, delay: i * 0.2 }}
              />
            ))}
            <text x={cx} y={cy - 8}  textAnchor="middle" fill="#f9fafb" fontSize={18} fontWeight={800}>{totals.calories}</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="#6b7280" fontSize={11}>kcal</text>
            <text x={cx} y={cy + 26} textAnchor="middle" fill="#4b5563" fontSize={10}>total</text>
          </svg>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {macros.map((m, i) => (
            <div key={i} style={{ background: m.bg, borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color }} />
                  <span style={{ fontSize: 12, color: '#9ca3af' }}>{m.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: m.color }}>{m.value.toFixed(1)}g</span>
                  <span style={{ fontSize: 10, color: '#4b5563' }}>{m.pct}%</span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 3 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((m.value / m.daily) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                  style={{ height: 3, borderRadius: 99, background: m.color }}
                />
              </div>
              <div style={{ fontSize: 10, color: '#4b5563', marginTop: 4 }}>{m.value.toFixed(1)}g of {m.daily}g daily goal</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Goal */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>Daily Calorie Goal</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#4ade80' }}>{totals.calories} / 2000 kcal</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 99, height: 7 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dailyPct}%` }}
            transition={{ duration: 1.2 }}
            style={{ height: 7, borderRadius: 99, background: dailyPct > 90 ? 'linear-gradient(90deg, #ef4444, #f97316)' : 'linear-gradient(90deg, #22c55e, #4ade80)' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: '#4b5563' }}>{dailyPct}% of daily intake</span>
          <span style={{ fontSize: 11, color: '#4b5563' }}>{2000 - totals.calories} kcal remaining</span>
        </div>
      </div>

      {/* Meal Score */}
      <div style={{ marginTop: 14, background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#4ade80' }}>Meal Balance Score</div>
          <div style={{ fontSize: 11, color: '#4b5563', marginTop: 2 }}>Based on macro distribution</div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 900, color: '#4ade80' }}>
          {Math.min(100, Math.round(50 + (totals.protein / (totalMacros || 1)) * 100))}
        </div>
      </div>
    </motion.div>
  )
}