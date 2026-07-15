import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroY = useTransform(scrollY, [0, 500], [0, -150])

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div className="bg-black min-h-screen overflow-hidden">

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid rgba(255,215,0,0.1)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)' }}>
            🏛️
          </div>
          <span className="text-2xl font-bold" style={{
            fontFamily: 'Playfair Display, serif',
            background: 'linear-gradient(to right, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            DharoharAI
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Explore', path: '/map' },
            { label: 'Heritage', path: '/festivals' },
            { label: 'Culture', path: '/community' },
            { label: 'Quiz', path: '/quiz' },
            { label: 'Community', path: '/community' },
          ].map((item) => (
            <a key={item.label} href={item.path}
              className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 text-sm tracking-wider uppercase">
              {item.label}
            </a>
          ))}
        </div>

        <a href="/login">
          <button className="px-5 py-2 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)', color: '#000' }}>
            Sign In
          </button>
        </a>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, #3a0000 0%, #0A0A0A 70%)'
          }} />
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                background: i % 2 === 0 ? '#FFD700' : '#8B0000',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
              transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 3, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4"
          style={{
            transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase mb-8 border"
            style={{ borderColor: 'rgba(255,215,0,0.3)', color: '#FFD700', background: 'rgba(139,0,0,0.2)' }}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Explore India's Living Heritage
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-8xl font-black mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #8B0000 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Dharohar</span>
            <br />
            <span className="text-white text-5xl md:text-7xl">AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Journey through 5000 years of India's glorious heritage —
            monuments, traditions, art, and culture, reimagined with AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a href="/map"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,215,0,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-semibold text-black tracking-wider uppercase text-sm cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
            >
              🗺️ Start Exploring
            </motion.a>
            <motion.a href="/chatbot"
              whileHover={{ scale: 1.05, borderColor: '#FFD700', color: '#FFD700' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-semibold text-gray-300 tracking-wider uppercase text-sm border border-gray-600 transition-all duration-300"
            >
              🤖 Ask AI Guide
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="flex gap-12 justify-center mt-16"
          >
            {[
              { num: '3000+', label: 'Monuments' },
              { num: '28', label: 'States' },
              { num: '100+', label: 'Art Forms' },
              { num: 'AI', label: 'Powered' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#FFD700' }}>{stat.num}</div>
                <div className="text-gray-500 text-xs tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-yellow-400 to-transparent" />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative py-24 px-4" style={{ background: 'linear-gradient(to bottom, #0A0A0A, #1a0000, #0A0A0A)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: '#FFD700' }}>What We Offer</span>
            <h2 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Explore <span style={{ background: 'linear-gradient(135deg, #FFD700, #8B0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Everything</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">From ancient monuments to living traditions — all in one place</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🗺️', title: 'Interactive Map', desc: 'Explore monuments state-wise on a live India map with filters and details', color: '#FFD700', path: '/map' },
              { icon: '🤖', title: 'AI Heritage Guide', desc: 'Chat with our AI trained on 5000 years of Indian history and culture', color: '#FFA500', path: '/chatbot' },
              { icon: '🏛️', title: '3D Monument Viewer', desc: 'Experience heritage sites in immersive 3D and WebAR from your browser', color: '#8B0000', path: '/map' },
              { icon: '🎭', title: 'Art & Culture', desc: 'Discover folk arts, classical dances, music, and traditions from every state', color: '#FFD700', path: '/community' },
              { icon: '🎯', title: 'Heritage Quiz', desc: 'Test your knowledge, earn badges, and climb the leaderboard', color: '#FFA500', path: '/quiz' },
              { icon: '📅', title: 'Festival Calendar', desc: 'Never miss a festival — explore traditions and stories behind every celebration', color: '#8B0000', path: '/festivals' },
              { icon: '🍛', title: 'Food Explorer', desc: 'Journey through India\'s diverse culinary heritage state by state', color: '#FFD700', path: '/community' },
              { icon: '👥', title: 'Community', desc: 'Share your visits, stories, and photos with fellow heritage explorers', color: '#FFA500', path: '/community' },
              { icon: '📍', title: 'Nearby Monuments', desc: 'Find heritage sites near you with timings, entry fees and directions', color: '#8B0000', path: '/map' },
            ].map((feature, i) => (
              <motion.a
                href={feature.path}
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-6 rounded-2xl cursor-pointer group overflow-hidden block"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(circle at center, ${feature.color}15, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300"
                    style={{ fontFamily: 'Playfair Display, serif' }}>{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"
                  style={{ background: `linear-gradient(to right, ${feature.color}, transparent)` }} />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Monuments Section */}
      <section className="relative py-24 px-4" style={{ background: '#0A0A0A' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ color: '#FFD700' }}>Must Visit</span>
            <h2 className="text-4xl md:text-6xl font-black mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Iconic <span style={{ background: 'linear-gradient(135deg, #FFD700, #8B0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Monuments</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Discover India's most breathtaking heritage sites</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Taj Mahal', state: 'Uttar Pradesh', era: 'Mughal Era • 1632 AD', emoji: '🕌', color: '#FFD700', desc: 'A symbol of eternal love, one of the Seven Wonders of the World' },
              { name: 'Brihadeeswarar Temple', state: 'Tamil Nadu', era: 'Chola Era • 1010 AD', emoji: '🛕', color: '#FFA500', desc: 'A UNESCO World Heritage Site and masterpiece of Dravidian architecture' },
              { name: 'Hampi', state: 'Karnataka', era: 'Vijayanagara • 1336 AD', emoji: '🏛️', color: '#8B0000', desc: 'Ancient ruins of the Vijayanagara Empire spread across a surreal landscape' },
              { name: 'Qutub Minar', state: 'Delhi', era: 'Delhi Sultanate • 1193 AD', emoji: '🗼', color: '#FFD700', desc: 'The tallest brick minaret in the world, a marvel of Indo-Islamic architecture' },
              { name: 'Konark Sun Temple', state: 'Odisha', era: 'Eastern Ganga • 1250 AD', emoji: '☀️', color: '#FFA500', desc: 'A 13th-century temple shaped as a giant chariot dedicated to the Sun God' },
              { name: 'Ajanta Caves', state: 'Maharashtra', era: 'Satavahana • 2nd BC', emoji: '🪨', color: '#8B0000', desc: 'Rock-cut Buddhist cave monuments with exquisite paintings and sculptures' },
            ].map((monument, i) => (
              <motion.a
                href="/map"
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group block"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}
              >
                <div className="relative h-48 flex items-center justify-center overflow-hidden"
                  style={{ background: `radial-gradient(circle, ${monument.color}20, #0A0A0A)` }}>
                  <motion.div className="text-8xl" whileHover={{ scale: 1.2, rotate: 5 }} transition={{ duration: 0.3 }}>
                    {monument.emoji}
                  </motion.div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${monument.color}15, transparent)` }} />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(0,0,0,0.7)', color: monument.color, border: `1px solid ${monument.color}40` }}>
                    {monument.era}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold group-hover:text-yellow-400 transition-colors duration-300 mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}>{monument.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs" style={{ color: '#FFD700' }}>📍</span>
                    <span className="text-gray-400 text-xs">{monument.state}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{monument.desc}</p>
                  <span className="text-xs tracking-widest uppercase font-semibold transition-colors duration-300 group-hover:text-yellow-400"
                    style={{ color: monument.color }}>Explore →</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(to right, ${monument.color}, transparent)` }} />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="/map"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,215,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 rounded-full font-semibold tracking-wider uppercase text-sm border transition-all duration-300"
              style={{ borderColor: '#FFD700', color: '#FFD700' }}
            >
              View All Monuments 🏛️
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4" style={{ background: 'linear-gradient(to top, #1a0000, #0A0A0A)', borderTop: '1px solid rgba(255,215,0,0.1)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)' }}>🏛️</div>
                <span className="text-2xl font-bold" style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(to right, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>DharoharAI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Preserving and promoting India's rich cultural heritage through the power of Artificial Intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Explore</h4>
              {[
                { label: 'Monuments', path: '/map' },
                { label: 'Festivals', path: '/festivals' },
                { label: 'Art Forms', path: '/community' },
                { label: 'Food', path: '/community' },
                { label: 'Famous People', path: '/community' },
              ].map(link => (
                <a key={link.label} href={link.path} className="block text-gray-400 hover:text-yellow-400 text-sm mb-2 transition-colors duration-300">{link.label}</a>
              ))}
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Platform</h4>
              {[
                { label: 'AI Guide', path: '/chatbot' },
                { label: 'Quiz', path: '/quiz' },
                { label: 'Community', path: '/community' },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Login', path: '/login' },
              ].map(link => (
                <a key={link.label} href={link.path} className="block text-gray-400 hover:text-yellow-400 text-sm mb-2 transition-colors duration-300">{link.label}</a>
              ))}
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'rgba(255,215,0,0.1)' }}>
            <p className="text-gray-500 text-sm">© 2024 DharoharAI. Built with ❤️ for Bharat.</p>
            <p className="text-gray-600 text-xs">Preserving 5000 years of heritage 🇮🇳</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Home