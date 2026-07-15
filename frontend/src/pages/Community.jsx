import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const posts = [
  { id: 1, user: 'Priya S', avatar: '👩', location: 'Taj Mahal, Agra', time: '2 hours ago', content: 'Finally visited the Taj Mahal! The marble work is absolutely breathtaking at sunrise. Words cannot describe this beauty 🕌✨', likes: 124, comments: 18, emoji: '🕌', verified: true },
  { id: 2, user: 'Rahul M', avatar: '👨', location: 'Hampi, Karnataka', time: '5 hours ago', content: 'The ruins of Hampi transport you back to the Vijayanagara Empire. Every stone tells a story. A must-visit for every Indian! 🏛️', likes: 89, comments: 12, emoji: '🏛️', verified: false },
  { id: 3, user: 'Meena K', avatar: '👩', location: 'Brihadeeswarar, Thanjavur', time: 'Yesterday', content: 'Attended the Karthigai Deepam festival at Brihadeeswarar Temple. The lamp-lit gopuram against the night sky was magical! 🛕🪔', likes: 203, comments: 31, emoji: '🛕', verified: true },
  { id: 4, user: 'Arjun P', avatar: '👦', location: 'Ajanta Caves, Maharashtra', time: '2 days ago', content: 'The 2000-year-old paintings at Ajanta are perfectly preserved. Ancient Indian artists were truly masters of their craft 🪨🎨', likes: 156, comments: 24, emoji: '🪨', verified: false },
  { id: 5, user: 'Kavya R', avatar: '👧', location: 'Konark, Odisha', time: '3 days ago', content: 'Konark Sun Temple at dawn — the chariot wheels casting long shadows on the ground. Pure architectural genius! ☀️', likes: 178, comments: 27, emoji: '☀️', verified: true },
]

const leaderboard = [
  { rank: 1, user: 'Meena K', avatar: '👩', points: 2840, badge: '👑' },
  { rank: 2, user: 'Priya S', avatar: '👩', points: 2210, badge: '🥈' },
  { rank: 3, user: 'Kavya R', avatar: '👧', points: 1980, badge: '🥉' },
  { rank: 4, user: 'Rahul M', avatar: '👨', points: 1650, badge: '🏅' },
  { rank: 5, user: 'Arjun P', avatar: '👦', points: 1420, badge: '🏅' },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState('feed')
  const [liked, setLiked] = useState({})
  const [newPost, setNewPost] = useState('')
  const [showPostBox, setShowPostBox] = useState(false)

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }))
  }

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
        <h1 className="text-lg font-semibold tracking-wider" style={{ color: '#FFD700' }}>👥 Community</h1>
        <a href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">← Back</a>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="text-xs tracking-widest uppercase mb-3 block" style={{ color: '#FFD700' }}>Heritage Explorers</span>
          <h1 className="text-5xl font-black mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our <span style={{ background: 'linear-gradient(135deg, #FFD700, #8B0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Community</span>
          </h1>
          <p className="text-gray-400">Share your heritage experiences with fellow explorers</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 justify-center">
          {[
            { id: 'feed', label: '📸 Feed' },
            { id: 'leaderboard', label: '🏆 Leaderboard' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={activeTab === tab.id
                ? { background: 'linear-gradient(135deg, #8B0000, #FFD700)', color: '#000' }
                : { background: 'rgba(255,255,255,0.05)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' }
              }>
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

          {/* Feed */}
          {activeTab === 'feed' && (
            <div className="max-w-2xl mx-auto">

              {/* Post Box */}
              <motion.div className="p-4 rounded-2xl mb-6 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.15)' }}
                onClick={() => setShowPostBox(!showPostBox)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)' }}>👤</div>
                  <span className="text-gray-400 text-sm">Share your heritage experience...</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="ml-auto px-4 py-2 rounded-xl text-xs font-semibold text-black"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    Post ✨
                  </motion.button>
                </div>
                <AnimatePresence>
                  {showPostBox && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3"
                      onClick={e => e.stopPropagation()}
                    >
                      <textarea
                        value={newPost}
                        onChange={e => setNewPost(e.target.value)}
                        placeholder="Write about your heritage experience..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none resize-none"
                        style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,215,0,0.2)' }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Posts */}
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl mb-4"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                      style={{ background: 'rgba(255,215,0,0.15)' }}>{post.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{post.user}</span>
                        {post.verified && <span className="text-xs" style={{ color: '#FFD700' }}>✓</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">📍 {post.location}</span>
                        <span className="text-gray-600 text-xs">•</span>
                        <span className="text-xs text-gray-500">{post.time}</span>
                      </div>
                    </div>
                    <span className="text-2xl">{post.emoji}</span>
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{post.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-6 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-2 text-sm transition-colors"
                      style={{ color: liked[post.id] ? '#FF4444' : '#aaa' }}
                    >
                      {liked[post.id] ? '❤️' : '🤍'} {post.likes + (liked[post.id] ? 1 : 0)}
                    </motion.button>
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                      💬 {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors ml-auto">
                      🔗 Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Leaderboard */}
          {activeTab === 'leaderboard' && (
            <div className="max-w-2xl mx-auto">
              <div className="p-6 rounded-2xl mb-6 text-center"
                style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.2)' }}>
                <div className="text-4xl mb-2">🏆</div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#FFD700' }}>Heritage Champions</h3>
                <p className="text-gray-400 text-sm">Top explorers this month</p>
              </div>

              {leaderboard.map((user, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl mb-3"
                  style={{
                    background: i === 0 ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${i === 0 ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.05)'}`
                  }}
                >
                  <span className="text-2xl w-8 text-center">{user.badge}</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(255,215,0,0.15)' }}>{user.avatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{user.user}</p>
                    <p className="text-xs text-gray-400">Rank #{user.rank}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: '#FFD700' }}>{user.points.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">points</p>
                  </div>
                </motion.div>
              ))}

              {/* Your Rank */}
              <div className="p-4 rounded-2xl mt-6 text-center"
                style={{ background: 'rgba(139,0,0,0.2)', border: '1px solid rgba(139,0,0,0.4)' }}>
                <p className="text-sm text-gray-400">Your Current Rank</p>
                <p className="text-2xl font-black mt-1" style={{ color: '#FFD700' }}>#42</p>
                <p className="text-xs text-gray-500 mt-1">Keep exploring to climb higher! 🚀</p>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  )
}