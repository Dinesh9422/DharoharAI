import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const festivals = [
  { name: 'Pongal', state: 'Tamil Nadu', month: 'January', emoji: '🌾', color: '#FFD700', desc: 'Harvest festival celebrating the Sun God and nature\'s bounty', duration: '4 days', type: 'Harvest' },
  { name: 'Republic Day', state: 'All India', month: 'January', emoji: '🇮🇳', color: '#FF9933', desc: 'Celebrates the constitution of India coming into effect', duration: '1 day', type: 'National' },
  { name: 'Holi', state: 'All India', month: 'March', emoji: '🎨', color: '#FF69B4', desc: 'Festival of colors celebrating the victory of good over evil', duration: '2 days', type: 'Cultural' },
  { name: 'Ugadi', state: 'Karnataka/Andhra', month: 'March', emoji: '🌸', color: '#90EE90', desc: 'Telugu and Kannada New Year celebration', duration: '1 day', type: 'New Year' },
  { name: 'Ram Navami', state: 'All India', month: 'April', emoji: '🏹', color: '#FFA500', desc: 'Birth anniversary of Lord Rama', duration: '1 day', type: 'Religious' },
  { name: 'Eid ul-Fitr', state: 'All India', month: 'April', emoji: '🌙', color: '#00CED1', desc: 'End of Ramadan — festival of breaking the fast', duration: '3 days', type: 'Religious' },
  { name: 'Buddha Purnima', state: 'All India', month: 'May', emoji: '☸️', color: '#FFD700', desc: 'Birth anniversary of Gautama Buddha', duration: '1 day', type: 'Religious' },
  { name: 'Rath Yatra', state: 'Odisha', month: 'June', emoji: '🎡', color: '#FF6347', desc: 'Grand chariot festival of Lord Jagannath in Puri', duration: '9 days', type: 'Cultural' },
  { name: 'Independence Day', state: 'All India', month: 'August', emoji: '🇮🇳', color: '#FF9933', desc: 'Celebrates India\'s independence from British rule in 1947', duration: '1 day', type: 'National' },
  { name: 'Onam', state: 'Kerala', month: 'August', emoji: '🌺', color: '#32CD32', desc: 'Harvest festival of Kerala celebrating King Mahabali\'s return', duration: '10 days', type: 'Harvest' },
  { name: 'Ganesh Chaturthi', state: 'Maharashtra', month: 'September', emoji: '🐘', color: '#FFA500', desc: 'Birthday of Lord Ganesha — remover of obstacles', duration: '10 days', type: 'Religious' },
  { name: 'Navratri', state: 'All India', month: 'October', emoji: '💃', color: '#FF69B4', desc: 'Nine nights of worship dedicated to Goddess Durga', duration: '9 days', type: 'Religious' },
  { name: 'Dussehra', state: 'All India', month: 'October', emoji: '🏹', color: '#FF4500', desc: 'Victory of Lord Rama over Ravana — good over evil', duration: '1 day', type: 'Cultural' },
  { name: 'Diwali', state: 'All India', month: 'October', emoji: '🪔', color: '#FFD700', desc: 'Festival of Lights — victory of light over darkness', duration: '5 days', type: 'Cultural' },
  { name: 'Chhath Puja', state: 'Bihar/UP', month: 'November', emoji: '☀️', color: '#FFA500', desc: 'Worship of Sun God and Chhathi Maiya', duration: '4 days', type: 'Religious' },
  { name: 'Christmas', state: 'All India', month: 'December', emoji: '🎄', color: '#32CD32', desc: 'Celebration of the birth of Jesus Christ', duration: '1 day', type: 'Religious' },
]

const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const types = ['All', 'Religious', 'Cultural', 'Harvest', 'National', 'New Year']

export default function FestivalCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered = festivals.filter(f => {
    const matchMonth = selectedMonth === 'All' || f.month === selectedMonth
    const matchType = selectedType === 'All' || f.type === selectedType
    return matchMonth && matchType
  })

  return (
    <div className="min-h-screen bg-black text-white"
      style={{ background: 'radial-gradient(ellipse at top, #1a0000, #0A0A0A)' }}>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)' }}>🏛️</div>
          <span className="text-xl font-bold" style={{
            fontFamily: 'Playfair Display, serif',
            background: 'linear-gradient(to right, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>DharoharAI</span>
        </a>
        <h1 className="text-lg font-semibold tracking-wider" style={{ color: '#FFD700' }}>📅 Festival Calendar</h1>
        <a href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">← Back</a>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-widest uppercase mb-3 block" style={{ color: '#FFD700' }}>Celebrate India</span>
          <h1 className="text-5xl font-black mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Festival <span style={{ background: 'linear-gradient(135deg, #FFD700, #8B0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Calendar</span>
          </h1>
          <p className="text-gray-400">Discover India's vibrant festivals throughout the year</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Month Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {months.map(m => (
              <button key={m} onClick={() => setSelectedMonth(m)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                style={selectedMonth === m
                  ? { background: 'linear-gradient(135deg, #8B0000, #FFD700)', color: '#000' }
                  : { background: 'rgba(255,255,255,0.05)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' }
                }>
                {m}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {types.map(t => (
              <button key={t} onClick={() => setSelectedType(t)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
                style={selectedType === t
                  ? { background: 'rgba(255,215,0,0.2)', color: '#FFD700', border: '1px solid #FFD700' }
                  : { background: 'rgba(255,255,255,0.03)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' }
                }>
                {t}
              </button>
            ))}
          </div>
        </motion.div>

        <p className="text-gray-500 text-sm text-center mb-8">{filtered.length} festivals found</p>

        {/* Festival Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelected(f)}
              className="p-5 rounded-2xl cursor-pointer group relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at center, ${f.color}15, transparent)` }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{f.emoji}</span>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ background: `${f.color}20`, color: f.color, border: `1px solid ${f.color}40` }}>
                    {f.type}
                  </span>
                </div>
                <h3 className="font-bold mb-1 group-hover:text-yellow-400 transition-colors"
                  style={{ fontFamily: 'Playfair Display, serif' }}>{f.name}</h3>
                <p className="text-xs mb-2" style={{ color: f.color }}>📅 {f.month} • {f.duration}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{f.state}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(to right, ${f.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 40 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md p-8 rounded-3xl"
              style={{ background: '#0F0F0F', border: `1px solid ${selected.color}40` }}
            >
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl mb-4"
                >{selected.emoji}</motion.div>
                <h2 className="text-3xl font-black mb-1" style={{ fontFamily: 'Playfair Display, serif', color: selected.color }}>{selected.name}</h2>
                <p className="text-gray-400 text-sm">{selected.state}</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <span>📅</span><div><p className="text-xs text-gray-400">Month</p><p className="text-sm font-semibold">{selected.month}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <span>⏱️</span><div><p className="text-xs text-gray-400">Duration</p><p className="text-sm font-semibold">{selected.duration}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <span>🏷️</span><div><p className="text-xs text-gray-400">Type</p><p className="text-sm font-semibold">{selected.type}</p></div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{selected.desc}</p>
              <button onClick={() => setSelected(null)}
                className="w-full py-3 rounded-xl font-semibold text-black"
                style={{ background: `linear-gradient(135deg, ${selected.color}, #FFA500)` }}>
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}