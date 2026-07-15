import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getMe, getBookmarks, getLeaderboard } from '../api'

const historyData = [
  { name: 'Konark Sun Temple', time: '2 hours ago', emoji: '☀️' },
  { name: 'Ajanta Caves', time: 'Yesterday', emoji: '🪨' },
  { name: 'Qutub Minar', time: '2 days ago', emoji: '🗼' },
  { name: 'Hawa Mahal', time: '3 days ago', emoji: '🏰' },
]

const badgesData = [
  { emoji: '🌱', title: 'Heritage Seeker', desc: 'Completed first quiz', earned: true },
  { emoji: '🗺️', title: 'Explorer', desc: 'Visited 5 monuments', earned: true },
  { emoji: '📚', title: 'Scholar', desc: 'Score 7+ in quiz', earned: true },
  { emoji: '👑', title: 'Dharohar Legend', desc: 'Score 10/10 in quiz', earned: false },
  { emoji: '📍', title: 'Traveller', desc: 'Visit 10 monuments', earned: false },
  { emoji: '🏆', title: 'Champion', desc: 'Top 10 leaderboard', earned: false },
]

const stats = [
  { label: 'Monuments Visited', value: '12', icon: '🏛️' },
  { label: 'Quiz Score', value: '8/10', icon: '🎯' },
  { label: 'Badges Earned', value: '3', icon: '🏅' },
  { label: 'Days Streak', value: '5', icon: '🔥' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))

    const fetchData = async () => {
      try {
        const [userRes, bookmarkRes, leaderRes] = await Promise.all([
          getMe(),
          getBookmarks(),
          getLeaderboard()
        ])
        setUser(userRes.data)
        setBookmarks(bookmarkRes.data)
        setLeaderboard(leaderRes.data)
      } catch (err) {
        console.log('Not logged in')
      }
    }
    fetchData()
  }, [])

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
        <h1 className="text-lg font-semibold tracking-wider" style={{ color: '#FFD700' }}>👤 Dashboard</h1>
        <a href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">← Back</a>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 mb-10 p-6 rounded-3xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.15)' }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)' }}>👤</div>
          <div className="flex-1">
            <h2 className="text-2xl font-black mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              {user?.name || 'Explorer'}
            </h2>
            <p className="text-gray-400 text-sm">{user?.email || ''}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700' }}>
                📚 Heritage Scholar
              </span>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(139,0,0,0.3)', color: '#FFA500' }}>
                🔥 {user?.streak || 0} Day Streak
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-black"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
          >
            Edit Profile
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl text-center"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: '#FFD700' }}>
                {stat.label === 'Days Streak' ? (user?.streak || stat.value) : stat.value}
              </div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'bookmarks', label: '🔖 Bookmarks' },
            { id: 'badges', label: '🏅 Badges' },
            { id: 'history', label: '🕐 History' },
            { id: 'leaderboard', label: '🏆 Leaderboard' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300"
              style={activeTab === tab.id
                ? { background: 'linear-gradient(135deg, #8B0000, #FFD700)', color: '#000' }
                : { background: 'rgba(255,255,255,0.05)', color: '#aaa', border: '1px solid rgba(255,255,255,0.1)' }
              }>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >

          {/* Overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}>
                <h3 className="font-bold mb-4 text-yellow-400">🔖 Recent Bookmarks</h3>
                {bookmarks.length > 0 ? bookmarks.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <p className="text-sm font-semibold">{b.monument_name}</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-sm">No bookmarks yet — explore monuments!</p>
                )}
              </div>
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}>
                <h3 className="font-bold mb-4 text-yellow-400">🕐 Recent Activity</h3>
                {historyData.slice(0, 4).map((h, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{h.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold">{h.name}</p>
                      <p className="text-xs text-gray-400">{h.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookmarks */}
          {activeTab === 'bookmarks' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bookmarks.length > 0 ? bookmarks.map((b, i) => (
                <motion.div key={i} whileHover={{ y: -5 }}
                  className="p-5 rounded-2xl cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.1)' }}>
                  <div className="text-4xl mb-3">🏛️</div>
                  <h3 className="font-bold group-hover:text-yellow-400 transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}>{b.monument_name}</h3>
                </motion.div>
              )) : (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  <p className="text-4xl mb-4">🔖</p>
                  <p>No bookmarks yet — explore monuments and save your favorites!</p>
                  <a href="/map" className="mt-4 inline-block px-6 py-2 rounded-full text-sm font-semibold text-black"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    Explore Map →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Badges */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {badgesData.map((b, i) => (
                <motion.div key={i} whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: b.earned ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${b.earned ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.05)'}`,
                    opacity: b.earned ? 1 : 0.5
                  }}>
                  <div className="text-4xl mb-3">{b.emoji}</div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: b.earned ? '#FFD700' : '#aaa' }}>{b.title}</h3>
                  <p className="text-gray-400 text-xs">{b.desc}</p>
                  {b.earned && <span className="text-xs mt-2 block" style={{ color: '#00C800' }}>✅ Earned</span>}
                </motion.div>
              ))}
            </div>
          )}

          {/* History */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {historyData.map((h, i) => (
                <motion.div key={i} whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-3xl">{h.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{h.name}</p>
                    <p className="text-gray-400 text-xs">{h.time}</p>
                  </div>
                  <span className="text-xs" style={{ color: '#FFD700' }}>View →</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Leaderboard */}
          {activeTab === 'leaderboard' && (
            <div className="max-w-2xl mx-auto">
              {leaderboard.length > 0 ? leaderboard.map((u, i) => (
                <motion.div key={i} whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl mb-3"
                  style={{
                    background: i === 0 ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${i === 0 ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.05)'}`
                  }}>
                  <span className="text-2xl">{i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🏅'}</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(255,215,0,0.15)' }}>👤</div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{u.name}</p>
                    <p className="text-xs text-gray-400">Rank #{i + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: '#FFD700' }}>{u.points?.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">points</p>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-4xl mb-4">🏆</p>
                  <p>No leaderboard data yet — take the quiz to earn points!</p>
                  <a href="/quiz" className="mt-4 inline-block px-6 py-2 rounded-full text-sm font-semibold text-black"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    Take Quiz →
                  </a>
                </div>
              )}
            </div>
          )}

        </motion.div>
      </div>
    </div>
  )
}