import { useState } from 'react'
import { loginUser, registerUser } from '../api'
import { motion, AnimatePresence } from 'framer-motion'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
  if (!form.email || !form.password) return
  if (mode === 'register' && !form.name) return
  
  setLoading(true)
  try {
    let response
    if (mode === 'login') {
      response = await loginUser({ email: form.email, password: form.password })
    } else {
      response = await registerUser({ name: form.name, email: form.email, password: form.password })
    }
    
    // Save token
    localStorage.setItem('token', response.data.access_token)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    
    setSuccess(true)
    await new Promise(r => setTimeout(r, 1000))
    window.location.href = '/dashboard'
  } catch (err) {
    alert(err.response?.data?.detail || 'Something went wrong!')
  }
  setLoading(false)
}

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse at center, #1a0000 0%, #0A0A0A 70%)' }}>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
            background: i % 2 === 0 ? '#FFD700' : '#8B0000',
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-5xl mb-3"
          >🏛️</motion.div>
          <h1 className="text-3xl font-black" style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(to right, #FFD700, #FFA500)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            DharoharAI
          </h1>
          <p className="text-gray-400 text-sm mt-1">Your Heritage Journey Awaits</p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.2)', backdropFilter: 'blur(20px)' }}>

          {/* Tab Toggle */}
          <div className="flex rounded-2xl p-1 mb-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {['login', 'register'].map(tab => (
              <button key={tab} onClick={() => setMode(tab)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-300"
                style={mode === tab ? { background: 'linear-gradient(135deg, #8B0000, #FFD700)', color: '#000' } : { color: '#gray' }}>
                {tab === 'login' ? '🔑 Sign In' : '✨ Register'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Name field for register */}
              {mode === 'register' && (
                <div className="mb-4">
                  <label className="text-xs text-gray-400 tracking-widest uppercase mb-2 block">Full Name</label>
                  <input type="text" placeholder="Your name"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,215,0,0.2)' }}
                  />
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="text-xs text-gray-400 tracking-widest uppercase mb-2 block">Email</label>
                <input type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,215,0,0.2)' }}
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="text-xs text-gray-400 tracking-widest uppercase mb-2 block">Password</label>
                <input type="password" placeholder="••••••••"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,215,0,0.2)' }}
                />
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,215,0,0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading || success}
                className="w-full py-3 rounded-xl font-semibold text-black text-sm tracking-wider uppercase"
                style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
              >
                {success ? '✅ Success!' : loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⚙️</motion.span>
                    Processing...
                  </span>
                ) : mode === 'login' ? '🔑 Sign In' : '✨ Create Account'}
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <span className="text-gray-500 text-xs">or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            {[{ icon: '🌐', label: 'Google' }, { icon: '📘', label: 'Facebook' }].map(s => (
              <motion.button key={s.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {s.icon} {s.label}
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          <a href="/" className="hover:text-yellow-400 transition-colors">← Back to DharoharAI</a>
        </p>
      </motion.div>
    </div>
  )
}