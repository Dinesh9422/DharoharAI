import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const suggestions = [
  "Tell me about Taj Mahal",
  "What is Dravidian architecture?",
  "Famous temples in Tamil Nadu",
  "History of Mughal Empire",
  "Best heritage sites to visit in India",
]

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste! 🙏 I am **DharoharAI Guide** — your personal AI companion for exploring India's rich heritage and culture. Ask me anything about monuments, traditions, history, art forms, or festivals!"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userText }])
    setLoading(true)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are DharoharAI Guide, an expert AI assistant specializing in India's heritage, culture, monuments, traditions, festivals, art forms, history, and cuisine. 
          
          You provide engaging, informative, and accurate information about:
          - Historical monuments and their significance
          - Indian traditions and cultural practices  
          - State-wise heritage and art forms
          - Festivals and their stories
          - Famous personalities in Indian history
          - Travel tips for heritage sites
          
          Keep responses concise, engaging, and use relevant emojis. Always relate answers to India's rich cultural context.`,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userText }
          ]
        })
      })

      const data = await response.json()
      const reply = data.content?.[0]?.text || 'Sorry, I could not process that. Please try again.'

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Connection error. Please try again.' }])
    }

    setLoading(false)
  }

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#FFD700">$1</strong>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

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
        <h1 className="text-lg font-semibold tracking-wider" style={{ color: '#FFD700' }}>🤖 AI Heritage Guide</h1>
        <a href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">← Back</a>
      </nav>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto pt-20 pb-36 px-4 max-w-4xl mx-auto w-full">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-3xl font-black mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#FFD700' }}>
            Ask DharoharAI
          </h2>
          <p className="text-gray-400 text-sm">Your AI guide to 5000 years of Indian heritage</p>
        </motion.div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-2 justify-center mb-8"
          >
            {suggestions.map((s, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(s)}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300 hover:text-black"
                style={{ border: '1px solid rgba(255,215,0,0.3)', color: '#FFD700', background: 'rgba(139,0,0,0.1)' }}
              >
                {s}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)' }}>🏛️</div>
                )}
                <div
                  className="max-w-2xl px-5 py-3 rounded-2xl text-sm leading-relaxed"
                  style={msg.role === 'user' ? {
                    background: 'linear-gradient(135deg, #8B0000, #5a0000)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    borderRadius: '20px 20px 4px 20px'
                  } : {
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,215,0,0.1)',
                    borderRadius: '20px 20px 20px 4px'
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />
                {msg.role === 'user' && (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: 'rgba(255,215,0,0.2)' }}>👤</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 justify-start"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ background: 'linear-gradient(135deg, #8B0000, #FFD700)' }}>🏛️</div>
              <div className="px-5 py-4 rounded-2xl flex gap-2 items-center"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.1)' }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-2 h-2 rounded-full"
                    style={{ background: '#FFD700' }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4"
        style={{ background: 'linear-gradient(to top, #000, transparent)' }}>
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about any monument, tradition, or culture..."
            className="flex-1 px-6 py-4 rounded-2xl text-white text-sm outline-none"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,215,0,0.2)' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="px-6 py-4 rounded-2xl font-semibold text-black disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
          >
            Send 🚀
          </motion.button>
        </div>
      </div>
    </div>
  )
}