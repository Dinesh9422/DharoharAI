import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL_QUESTIONS = [
  { id: 1, q: "Which dynasty built the Brihadeeswarar Temple?", options: ["Pallava", "Chola", "Pandya", "Chera"], ans: 1, fact: "The Brihadeeswarar Temple was built by Raja Raja Chola I in 1010 AD!", category: "Temples" },
  { id: 2, q: "Taj Mahal was built by which Mughal Emperor?", options: ["Akbar", "Humayun", "Shah Jahan", "Aurangzeb"], ans: 2, fact: "Shah Jahan built the Taj Mahal in memory of his wife Mumtaz Mahal!", category: "Monuments" },
  { id: 3, q: "Hampi was the capital of which empire?", options: ["Maurya", "Gupta", "Vijayanagara", "Maratha"], ans: 2, fact: "Hampi was the capital of the mighty Vijayanagara Empire (1336-1646 AD)!", category: "History" },
  { id: 4, q: "Which UNESCO site is known as the 'Black Pagoda'?", options: ["Ajanta Caves", "Konark Sun Temple", "Khajuraho", "Sanchi Stupa"], ans: 1, fact: "Konark Sun Temple is called the Black Pagoda by European sailors!", category: "Monuments" },
  { id: 5, q: "Ajanta Caves are located in which state?", options: ["Rajasthan", "Gujarat", "Maharashtra", "Madhya Pradesh"], ans: 2, fact: "Ajanta Caves are in Aurangabad district of Maharashtra!", category: "Caves" },
  { id: 6, q: "Which is the oldest living city in India?", options: ["Delhi", "Patna", "Varanasi", "Ayodhya"], ans: 2, fact: "Varanasi (Kashi) is one of the world's oldest continuously inhabited cities!", category: "History" },
  { id: 7, q: "Kathakali is a classical dance form from which state?", options: ["Tamil Nadu", "Odisha", "Kerala", "Andhra Pradesh"], ans: 2, fact: "Kathakali is a classical dance-drama from Kerala known for elaborate costumes!", category: "Culture" },
  { id: 8, q: "The Gateway of India was built to commemorate the visit of?", options: ["Queen Victoria", "King George V", "Lord Mountbatten", "Prince Charles"], ans: 1, fact: "Gateway of India was built for the visit of King George V and Queen Mary in 1911!", category: "Monuments" },
  { id: 9, q: "Which festival is known as the 'Festival of Lights'?", options: ["Holi", "Diwali", "Navratri", "Pongal"], ans: 1, fact: "Diwali, the Festival of Lights, symbolizes the victory of light over darkness!", category: "Festivals" },
  { id: 10, q: "Meenakshi Temple is located in which city?", options: ["Chennai", "Trichy", "Madurai", "Coimbatore"], ans: 2, fact: "The magnificent Meenakshi Amman Temple is in Madurai, Tamil Nadu!", category: "Temples" },
  { id: 11, q: "Which Indian monument has 953 windows?", options: ["Mysore Palace", "Hawa Mahal", "Red Fort", "Amber Fort"], ans: 1, fact: "Hawa Mahal (Palace of Winds) in Jaipur has 953 jharokha windows!", category: "Monuments" },
  { id: 12, q: "The Sundarbans mangrove forest is shared between India and which country?", options: ["Myanmar", "Bangladesh", "Nepal", "Bhutan"], ans: 1, fact: "The Sundarbans is the world's largest mangrove forest, shared between India and Bangladesh!", category: "Nature" },
  { id: 13, q: "Which Indian classical dance originates from Tamil Nadu?", options: ["Kuchipudi", "Bharatanatyam", "Odissi", "Manipuri"], ans: 1, fact: "Bharatanatyam is one of the oldest classical dance forms, originating from Tamil Nadu!", category: "Culture" },
  { id: 14, q: "The Dilwara Temples are located in which state?", options: ["Gujarat", "Rajasthan", "Madhya Pradesh", "Himachal Pradesh"], ans: 1, fact: "The Dilwara Temples in Mount Abu, Rajasthan are famous for intricate marble carvings!", category: "Temples" },
  { id: 15, q: "Which Mughal emperor built the Red Fort in Delhi?", options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"], ans: 2, fact: "Shah Jahan built the Red Fort (Lal Qila) in 1648 AD as his new capital!", category: "Monuments" },
  { id: 16, q: "Pongal is the harvest festival of which state?", options: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"], ans: 2, fact: "Pongal is the most important harvest festival of Tamil Nadu, celebrated in January!", category: "Festivals" },
  { id: 17, q: "The Ellora Caves contain temples of how many religions?", options: ["1", "2", "3", "4"], ans: 2, fact: "Ellora Caves contain Hindu, Buddhist, and Jain temples — representing 3 religions!", category: "Caves" },
  { id: 18, q: "Which is the largest state by area in India?", options: ["Maharashtra", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh"], ans: 1, fact: "Rajasthan is the largest state in India by area, covering 342,239 sq km!", category: "Geography" },
  { id: 19, q: "The famous Ratha Yatra festival is held at which temple?", options: ["Meenakshi Temple", "Jagannath Temple Puri", "Tirupati Temple", "Somnath Temple"], ans: 1, fact: "The Rath Yatra is held at Jagannath Temple in Puri, Odisha every year!", category: "Festivals" },
  { id: 20, q: "Bihu is the traditional festival of which state?", options: ["West Bengal", "Assam", "Manipur", "Meghalaya"], ans: 1, fact: "Bihu is the most important festival of Assam, celebrating the Assamese New Year!", category: "Festivals" },
  { id: 21, q: "The Charminar is located in which city?", options: ["Bangalore", "Chennai", "Hyderabad", "Mysuru"], ans: 2, fact: "Charminar was built in 1591 by Muhammad Quli Qutb Shah in Hyderabad!", category: "Monuments" },
  { id: 22, q: "Which is the only floating national park in the world located in India?", options: ["Kaziranga", "Keibul Lamjao", "Manas", "Bandipur"], ans: 1, fact: "Keibul Lamjao in Manipur is the only floating national park in the world!", category: "Nature" },
  { id: 23, q: "The classical dance form Odissi originates from?", options: ["Odisha", "Tamil Nadu", "Kerala", "Andhra Pradesh"], ans: 0, fact: "Odissi is one of the oldest surviving dance forms, originating from Odisha!", category: "Culture" },
  { id: 24, q: "Which river is considered the holiest in Hinduism?", options: ["Yamuna", "Godavari", "Ganga", "Saraswati"], ans: 2, fact: "The Ganga (Ganges) is considered the holiest river in Hinduism and is worshipped as a goddess!", category: "Culture" },
  { id: 25, q: "The Sanchi Stupa was built under whose patronage?", options: ["Ashoka", "Chandragupta", "Harsha", "Akbar"], ans: 0, fact: "The Great Stupa at Sanchi was originally commissioned by Emperor Ashoka in the 3rd century BC!", category: "History" },
  { id: 26, q: "Which Indian state is known as the 'Land of Five Rivers'?", options: ["Haryana", "Punjab", "Himachal Pradesh", "Uttarakhand"], ans: 1, fact: "Punjab means 'Land of Five Rivers' — Jhelum, Chenab, Ravi, Beas, and Sutlej!", category: "Geography" },
  { id: 27, q: "The Nalanda University was located in which present-day state?", options: ["Uttar Pradesh", "Madhya Pradesh", "Bihar", "Jharkhand"], ans: 2, fact: "Nalanda was the world's first residential university, located in Bihar!", category: "History" },
  { id: 28, q: "Which Indian martial art form originates from Kerala?", options: ["Silambam", "Kalaripayattu", "Thang-Ta", "Gatka"], ans: 1, fact: "Kalaripayattu from Kerala is one of the oldest martial arts in the world!", category: "Culture" },
  { id: 29, q: "The famous Kumbh Mela is held at how many locations in India?", options: ["2", "3", "4", "6"], ans: 2, fact: "Kumbh Mela rotates among 4 cities: Prayagraj, Haridwar, Ujjain, and Nashik!", category: "Festivals" },
  { id: 30, q: "Which state is known as 'God's Own Country'?", options: ["Goa", "Kerala", "Tamil Nadu", "Karnataka"], ans: 1, fact: "Kerala is known as 'God's Own Country' for its natural beauty and backwaters!", category: "Geography" },
  { id: 31, q: "The Ajanta Caves were rediscovered in which year?", options: ["1783", "1819", "1857", "1901"], ans: 1, fact: "British officer John Smith rediscovered the Ajanta Caves in 1819 while tiger hunting!", category: "History" },
  { id: 32, q: "Which city is known as the 'Pink City' of India?", options: ["Jodhpur", "Udaipur", "Jaipur", "Jaisalmer"], ans: 2, fact: "Jaipur is called the Pink City because it was painted pink in 1876 to welcome Prince Albert!", category: "Cities" },
  { id: 33, q: "The ancient port city of Lothal was part of which civilization?", options: ["Vedic", "Indus Valley", "Mauryan", "Dravidian"], ans: 1, fact: "Lothal was a major city of the ancient Indus Valley Civilization (2400 BCE)!", category: "History" },
  { id: 34, q: "Which is the longest river in India?", options: ["Yamuna", "Godavari", "Ganga", "Indus"], ans: 2, fact: "The Ganga is the longest river in India, stretching 2,525 km!", category: "Geography" },
  { id: 35, q: "The Virupaksha Temple at Hampi is dedicated to which deity?", options: ["Vishnu", "Shiva", "Brahma", "Ganesha"], ans: 1, fact: "Virupaksha Temple is dedicated to Lord Shiva and is one of the oldest functioning temples!", category: "Temples" },
  { id: 36, q: "Which Indian city is known as the 'Silicon Valley of India'?", options: ["Mumbai", "Hyderabad", "Bengaluru", "Pune"], ans: 2, fact: "Bengaluru is called the Silicon Valley of India for its booming IT industry!", category: "Cities" },
  { id: 37, q: "The Pushkar Camel Fair is held in which state?", options: ["Gujarat", "Rajasthan", "Haryana", "Punjab"], ans: 1, fact: "The famous Pushkar Camel Fair is held annually in Pushkar, Rajasthan!", category: "Festivals" },
  { id: 38, q: "Which is the oldest mountain range in India?", options: ["Himalayas", "Aravalli", "Vindhyas", "Western Ghats"], ans: 1, fact: "The Aravalli Range is one of the oldest mountain ranges in the world, about 350 million years old!", category: "Geography" },
  { id: 39, q: "The famous Basilica of Bom Jesus is located in?", options: ["Mumbai", "Goa", "Kerala", "Tamil Nadu"], ans: 1, fact: "The Basilica of Bom Jesus in Goa is a UNESCO World Heritage Site containing the remains of St. Francis Xavier!", category: "Monuments" },
  { id: 40, q: "Which state has the most UNESCO World Heritage Sites in India?", options: ["Delhi", "Rajasthan", "Maharashtra", "Tamil Nadu"], ans: 1, fact: "Rajasthan has the most UNESCO World Heritage Sites among Indian states!", category: "Heritage" },
  { id: 41, q: "The traditional art form Warli painting originates from?", options: ["Rajasthan", "Maharashtra", "Gujarat", "Madhya Pradesh"], ans: 1, fact: "Warli painting is a tribal art from the Warli tribe of Maharashtra, using geometric patterns!", category: "Art" },
  { id: 42, q: "Which Indian emperor is known as 'Ashoka the Great'?", options: ["Chandragupta", "Bindusara", "Ashoka", "Dasharatha"], ans: 2, fact: "Ashoka the Great ruled the Maurya Empire and spread Buddhism across Asia after the Kalinga War!", category: "History" },
  { id: 43, q: "The famous Char Dham pilgrimage includes which four sites?", options: ["Badrinath, Kedarnath, Gangotri, Yamunotri", "Puri, Dwarka, Rameswaram, Badrinath", "Varanasi, Mathura, Ayodhya, Dwarka", "Tirupati, Shirdi, Vrindavan, Amritsar"], ans: 0, fact: "Char Dham includes Badrinath, Kedarnath, Gangotri, and Yamunotri in Uttarakhand!", category: "Pilgrimage" },
  { id: 44, q: "The Chola kingdom was primarily located in which region?", options: ["Northern India", "Eastern India", "Southern India", "Western India"], ans: 2, fact: "The Chola dynasty ruled primarily in southern India (present-day Tamil Nadu) from 9th to 13th century!", category: "History" },
  { id: 45, q: "Which is the national fruit of India?", options: ["Banana", "Mango", "Jackfruit", "Coconut"], ans: 1, fact: "Mango is the national fruit of India — it has been cultivated in India for over 5,000 years!", category: "Culture" },
  { id: 46, q: "The famous Amritsar Golden Temple belongs to which religion?", options: ["Hinduism", "Jainism", "Sikhism", "Buddhism"], ans: 2, fact: "The Golden Temple (Harmandir Sahib) is the holiest shrine in Sikhism!", category: "Temples" },
  { id: 47, q: "Which Indian state is famous for the Dandiya dance?", options: ["Maharashtra", "Rajasthan", "Gujarat", "Punjab"], ans: 2, fact: "Dandiya Raas is a traditional folk dance from Gujarat, performed during Navratri!", category: "Culture" },
  { id: 48, q: "The ancient city of Pataliputra is present-day?", options: ["Varanasi", "Patna", "Allahabad", "Lucknow"], ans: 1, fact: "Pataliputra (present-day Patna) was the capital of the mighty Mauryan Empire!", category: "History" },
  { id: 49, q: "Which Indian classical music style is associated with South India?", options: ["Hindustani", "Carnatic", "Dhrupad", "Thumri"], ans: 1, fact: "Carnatic music is the classical music tradition of South India, dating back over 2,000 years!", category: "Culture" },
  { id: 50, q: "The famous Rani ki Vav stepwell is located in which state?", options: ["Rajasthan", "Gujarat", "Maharashtra", "Madhya Pradesh"], ans: 1, fact: "Rani ki Vav (Queen's Stepwell) in Patan, Gujarat is a UNESCO World Heritage Site!", category: "Heritage" },
]

const BADGES = [
  { min: 0, max: 3, title: 'Heritage Seeker', emoji: '🌱', color: '#4CAF50' },
  { min: 4, max: 6, title: 'Culture Explorer', emoji: '🗺️', color: '#FFA500' },
  { min: 7, max: 8, title: 'Heritage Scholar', emoji: '📚', color: '#FFD700' },
  { min: 9, max: 10, title: 'Dharohar Legend', emoji: '👑', color: '#8B0000' },
]

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function shuffleOptions(question) {
  const optionsWithIndex = question.options.map((opt, idx) => ({ opt, idx }))
  const shuffled = shuffleArray(optionsWithIndex)
  const newCorrectIndex = shuffled.findIndex(item => item.idx === question.ans)
  return {
    ...question,
    options: shuffled.map(item => item.opt),
    ans: newCorrectIndex,
    originalOptions: question.options,
  }
}

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showFact, setShowFact] = useState(false)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])

  const startNewQuiz = () => {
    const shuffledAll = shuffleArray(ALL_QUESTIONS)
    const selected10 = shuffledAll.slice(0, 10)
    const withShuffledOptions = selected10.map(q => shuffleOptions(q))
    setQuestions(withShuffledOptions)
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setShowFact(false)
    setFinished(false)
    setAnswers([])
  }

  useEffect(() => {
    startNewQuiz()
  }, [])

  const question = questions[current]
  const badge = BADGES.find(b => score >= b.min && score <= b.max)

  const handleAnswer = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    setShowFact(true)
    const correct = idx === question.ans
    if (correct) setScore(s => s + 1)
    setAnswers(prev => [...prev, { correct, selected: idx, correct_ans: question.ans }])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
      setSelected(null)
      setShowFact(false)
    }
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading questions...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white"
      style={{ background: 'radial-gradient(ellipse at top, #1a0000, #0A0A0A)' }}>

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
        <h1 className="text-lg font-semibold tracking-wider" style={{ color: '#FFD700' }}>🎯 Heritage Quiz</h1>
        <a href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">← Back</a>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-3xl mx-auto">
        {!finished ? (
          <>
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question {current + 1} of {questions.length}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,215,0,0.1)', color: '#FFD700' }}>
                    {question.category}
                  </span>
                  <span style={{ color: '#FFD700' }}>Score: {score} 🏆</span>
                </div>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <motion.div className="h-2 rounded-full"
                  style={{ background: 'linear-gradient(to right, #8B0000, #FFD700)' }}
                  animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4 }}
              >
                <div className="p-8 rounded-3xl mb-6"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,215,0,0.15)' }}>
                  <div className="text-4xl mb-4 text-center">🏛️</div>
                  <h2 className="text-xl md:text-2xl font-bold text-center leading-relaxed"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    {question.q}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {question.options.map((opt, idx) => {
                    let bg = 'rgba(255,255,255,0.03)'
                    let border = 'rgba(255,255,255,0.1)'
                    let textColor = 'white'
                    if (selected !== null) {
                      if (idx === question.ans) { bg = 'rgba(0,200,0,0.15)'; border = '#00C800'; textColor = '#00FF00' }
                      else if (idx === selected && selected !== question.ans) { bg = 'rgba(200,0,0,0.15)'; border = '#C80000'; textColor = '#FF4444' }
                    }
                    return (
                      <motion.button key={idx}
                        whileHover={selected === null ? { scale: 1.02, borderColor: '#FFD700' } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswer(idx)}
                        className="p-4 rounded-2xl text-left font-medium transition-all duration-300"
                        style={{ background: bg, border: `1px solid ${border}`, color: textColor, cursor: selected !== null ? 'default' : 'pointer' }}>
                        <span className="text-gray-400 mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </motion.button>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {showFact && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl mb-6 text-sm"
                      style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.3)' }}>
                      <span style={{ color: '#FFD700' }}>💡 Did you know? </span>
                      <span className="text-gray-300">{question.fact}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {selected !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={handleNext}
                      className="px-10 py-3 rounded-full font-semibold text-black"
                      style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                      {current + 1 >= questions.length ? 'See Results 🏆' : 'Next Question →'}
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: 2 }} className="text-8xl mb-6">
              {badge?.emoji}
            </motion.div>
            <h2 className="text-4xl font-black mb-2" style={{ fontFamily: 'Playfair Display, serif', color: badge?.color }}>
              {badge?.title}
            </h2>
            <p className="text-gray-400 mb-8">You scored {score} out of {questions.length}</p>

            <div className="w-36 h-36 rounded-full flex items-center justify-center mx-auto mb-8 border-4"
              style={{ borderColor: badge?.color, background: `${badge?.color}15` }}>
              <div>
                <div className="text-4xl font-black" style={{ color: badge?.color }}>{score}</div>
                <div className="text-gray-400 text-sm">/ {questions.length}</div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 justify-center mb-8 max-w-xs mx-auto">
              {answers.map((a, i) => (
                <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: a.correct ? 'rgba(0,200,0,0.2)' : 'rgba(200,0,0,0.2)', border: `1px solid ${a.correct ? '#00C800' : '#C80000'}`, color: a.correct ? '#00FF00' : '#FF4444' }}>
                  {i + 1}
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm mb-6">Questions shuffle होगा next time! 🔀</p>

            <div className="flex gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={startNewQuiz}
                className="px-8 py-3 rounded-full font-semibold text-black"
                style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                New Quiz 🔄
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 rounded-full font-semibold border transition-colors"
                style={{ borderColor: '#FFD700', color: '#FFD700' }}>
                Home 🏠
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}