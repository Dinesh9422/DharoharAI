import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Custom emoji marker
const createEmojiIcon = (emoji, isSelected) => L.divIcon({
  className: '',
  html: `<div style="
    font-size: ${isSelected ? '36px' : '28px'};
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.8));
    cursor: pointer;
    transition: all 0.2s;
    transform: ${isSelected ? 'scale(1.3)' : 'scale(1)'};
  ">${emoji}</div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const monuments = [
  {
    id: 1, name: 'Taj Mahal', state: 'Uttar Pradesh', city: 'Agra',
    lat: 27.1751, lng: 78.0421, era: 'Mughal • 1632 AD', type: 'Monument', emoji: '🕌',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg',
    entry: '₹50 (Indians) / ₹1100 (Foreigners)', timing: '6AM - 6:30PM',
    rating: '4.9', visitors: '7-8 million/year',
    history: 'The Taj Mahal was commissioned in 1632 by Mughal Emperor Shah Jahan to house the tomb of his beloved wife Mumtaz Mahal. Constructed over 21 years by 20,000 artisans, it stands as the pinnacle of Mughal architecture. The gleaming white marble changes color throughout the day — pinkish at dawn, white at noon, and golden under moonlight. UNESCO declared it a World Heritage Site in 1983.',
    highlights: ['UNESCO World Heritage Site', 'One of Seven Wonders', 'White Marble Structure', 'Symmetrical Gardens'],
    bestTime: 'October to March',
    nearbyPlaces: ['Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
  },
  {
    id: 2, name: 'Brihadeeswarar Temple', state: 'Tamil Nadu', city: 'Thanjavur',
    lat: 10.7828, lng: 79.1318, era: 'Chola • 1010 AD', type: 'Temple', emoji: '🛕',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Brihadeeswarar_Temple%2C_Thanjavur.jpg/1200px-Brihadeeswarar_Temple%2C_Thanjavur.jpg',
    entry: 'Free', timing: '6AM - 8:30PM',
    rating: '4.8', visitors: '3 million/year',
    history: 'Built by Raja Raja Chola I and completed in 1010 AD, the Brihadeeswarar Temple is a masterpiece of Dravidian architecture. The towering 66-meter vimana was the tallest in the world at the time of its construction. Remarkably, the shadow of the main tower never falls on the ground. The temple complex contains stunning murals, sculptures, and bronzes that showcase the artistic zenith of the Chola period.',
    highlights: ['66m Tall Vimana', 'Shadow Never Falls', 'UNESCO Heritage', 'Chola Bronze Art'],
    bestTime: 'November to February',
    nearbyPlaces: ['Thanjavur Palace', 'Saraswathi Mahal', 'Schwartz Church'],
  },
  {
    id: 3, name: 'Hampi', state: 'Karnataka', city: 'Hampi',
    lat: 15.3350, lng: 76.4600, era: 'Vijayanagara • 1336 AD', type: 'Ruins', emoji: '🏛️',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Virupaksha_temple_at_Hampi.jpg/1200px-Virupaksha_temple_at_Hampi.jpg',
    entry: '₹40 (Indians)', timing: 'Sunrise - Sunset',
    rating: '4.7', visitors: '4 million/year',
    history: 'Hampi was the capital of the Vijayanagara Empire, one of the greatest Hindu kingdoms in Indian history, from 1336 to 1646 AD. At its peak, it was one of the largest cities in the world with a population of over 500,000. The city was devastated by the Deccan Sultanates in 1565. Today, its boulder-strewn landscape and hundreds of temple ruins spread over 41 sq km make it a surreal destination.',
    highlights: ['41 sq km Ruins', 'Virupaksha Temple', 'Stone Chariot', 'Boulder Landscape'],
    bestTime: 'October to February',
    nearbyPlaces: ['Vittala Temple', 'Lotus Mahal', 'Elephant Stables'],
  },
  {
    id: 4, name: 'Qutub Minar', state: 'Delhi', city: 'New Delhi',
    lat: 28.5244, lng: 77.1855, era: 'Delhi Sultanate • 1193 AD', type: 'Monument', emoji: '🗼',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Qtub.jpg/800px-Qtub.jpg',
    entry: '₹40 (Indians)', timing: '7AM - 5PM',
    rating: '4.6', visitors: '3.9 million/year',
    history: 'Qutub Minar, standing at 72.5 meters, is the tallest brick minaret in the world. Construction began in 1193 AD by Qutb ud-Din Aibak and was completed by his successor Iltutmish. The surrounding Qutub complex contains the Iron Pillar of Delhi — a 7-meter pillar dating from the 4th century AD that has remarkably not rusted in over 1600 years.',
    highlights: ['72.5m Tall Minaret', 'Iron Pillar 1600yr old', 'Red Sandstone', 'UNESCO Heritage'],
    bestTime: 'October to March',
    nearbyPlaces: ['Iron Pillar', 'Quwwat-ul-Islam Mosque', 'Iltutmish Tomb'],
  },
  {
    id: 5, name: 'Konark Sun Temple', state: 'Odisha', city: 'Konark',
    lat: 19.8876, lng: 86.0945, era: 'Eastern Ganga • 1250 AD', type: 'Temple', emoji: '☀️',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Konarka_Temple.jpg/1200px-Konarka_Temple.jpg',
    entry: '₹40 (Indians)', timing: '6AM - 8PM',
    rating: '4.7', visitors: '2 million/year',
    history: 'The Konark Sun Temple was built in the 13th century by King Narasimhadeva I. Conceived as a colossal chariot for the Sun God Surya, it features 24 intricately carved wheels and is drawn by 7 horses. European sailors called it the "Black Pagoda" as it appeared dark and was used as a navigational landmark.',
    highlights: ['Giant Stone Chariot', '24 Carved Wheels', 'Black Pagoda', 'UNESCO Heritage'],
    bestTime: 'October to February',
    nearbyPlaces: ['Puri Jagannath Temple', 'Chilika Lake', 'Bhubaneswar Temples'],
  },
  {
    id: 6, name: 'Ajanta Caves', state: 'Maharashtra', city: 'Aurangabad',
    lat: 20.5519, lng: 75.7033, era: 'Satavahana • 2nd BC', type: 'Cave', emoji: '🪨',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ajanta_Cave_26.jpg/1200px-Ajanta_Cave_26.jpg',
    entry: '₹40 (Indians)', timing: '9AM - 5:30PM',
    rating: '4.6', visitors: '1.5 million/year',
    history: 'The Ajanta Caves are 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art. Rediscovered in 1819 by a British officer while tiger hunting, the caves had been abandoned for over a millennium.',
    highlights: ['2000yr old Paintings', '30 Rock-cut Caves', 'Jataka Tales', 'UNESCO Heritage'],
    bestTime: 'November to March',
    nearbyPlaces: ['Ellora Caves', 'Aurangabad Caves', 'Bibi Ka Maqbara'],
  },
  {
    id: 7, name: 'Hawa Mahal', state: 'Rajasthan', city: 'Jaipur',
    lat: 26.9239, lng: 75.8267, era: 'Rajput • 1799 AD', type: 'Palace', emoji: '🏰',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Hawa_Mahal%2C_Jaipur%2C_Rajasthan%2C_India.jpg/800px-Hawa_Mahal%2C_Jaipur%2C_Rajasthan%2C_India.jpg',
    entry: '₹50 (Indians)', timing: '9AM - 5PM',
    rating: '4.5', visitors: '4 million/year',
    history: 'Hawa Mahal, or "Palace of Winds", was built in 1799 by Maharaja Sawai Pratap Singh. The iconic five-story facade features 953 small windows called jharokhas decorated with intricate latticework. Originally designed to allow royal ladies to observe street festivals while remaining unseen, the unique honeycomb design also keeps the interior cool through the Venturi effect.',
    highlights: ['953 Jharokha Windows', 'Pink Sandstone', 'Honeycomb Design', 'Rajput Architecture'],
    bestTime: 'October to March',
    nearbyPlaces: ['City Palace', 'Jantar Mantar', 'Amber Fort'],
  },
  {
    id: 8, name: 'Meenakshi Temple', state: 'Tamil Nadu', city: 'Madurai',
    lat: 9.9195, lng: 78.1193, era: 'Pandya • 7th Century', type: 'Temple', emoji: '🛕',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Meenakshi_Amman_Temple.jpg/1200px-Meenakshi_Amman_Temple.jpg',
    entry: 'Free', timing: '5AM - 12:30PM, 4PM - 10PM',
    rating: '4.8', visitors: '15,000/day',
    history: 'The Meenakshi Amman Temple is an ancient Hindu temple dedicated to Goddess Meenakshi and Lord Sundareswarar. The temple complex covers 45 acres and features 14 gateway towers (gopurams), the tallest being 52 meters. The temple contains 33,000 sculptures and is one of the most visited pilgrimage sites in India.',
    highlights: ['14 Gopurams', '33,000 Sculptures', '45 Acre Complex', 'Living Temple'],
    bestTime: 'October to March',
    nearbyPlaces: ['Thirumalai Nayakkar Palace', 'Gandhi Museum', 'Vandiyur Mariamman'],
  },
  {
    id: 9, name: 'Gateway of India', state: 'Maharashtra', city: 'Mumbai',
    lat: 18.9220, lng: 72.8347, era: 'British • 1924 AD', type: 'Monument', emoji: '🗿',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/1200px-Mumbai_03-2016_30_Gateway_of_India.jpg',
    entry: 'Free', timing: 'Always Open',
    rating: '4.5', visitors: '5 million/year',
    history: 'The Gateway of India was built to commemorate the visit of King George V and Queen Mary to Mumbai in 1911. The 26-meter arch is built in Indo-Saracenic style. The last British troops to leave India after independence in 1947 marched through this very gateway.',
    highlights: ['26m Arch', 'Indo-Saracenic Style', 'Arabian Sea View', 'Historical Exit Point'],
    bestTime: 'November to February',
    nearbyPlaces: ['Taj Mahal Palace Hotel', 'Elephanta Caves', 'Colaba Causeway'],
  },
  {
    id: 10, name: 'Khajuraho Temples', state: 'Madhya Pradesh', city: 'Khajuraho',
    lat: 24.8318, lng: 79.9199, era: 'Chandela • 950 AD', type: 'Temple', emoji: '⛩️',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Kandariya_mahadeva_temple.jpg/1200px-Kandariya_mahadeva_temple.jpg',
    entry: '₹40 (Indians)', timing: 'Sunrise - Sunset',
    rating: '4.6', visitors: '1 million/year',
    history: 'The Khajuraho temples were built by the Chandela dynasty between 950 and 1050 AD. Originally there were 85 temples, of which 25 survive today. The temples were rediscovered by British engineer T.S. Burt in 1838 after being lost for centuries.',
    highlights: ['Nagara Architecture', 'UNESCO Heritage', 'Sound & Light Show', 'Intricate Carvings'],
    bestTime: 'October to March',
    nearbyPlaces: ['Panna National Park', 'Raneh Falls', 'Ajaigarh Fort'],
  },
  {
    id: 11, name: 'Amber Fort', state: 'Rajasthan', city: 'Jaipur',
    lat: 26.9855, lng: 75.8513, era: 'Rajput • 1592 AD', type: 'Fort', emoji: '🏯',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Amber_Fort_Jaipur_Rajasthan.jpg/1200px-Amber_Fort_Jaipur_Rajasthan.jpg',
    entry: '₹100 (Indians)', timing: '8AM - 5:30PM',
    rating: '4.7', visitors: '5,000/day',
    history: 'Amber Fort, built in 1592 by Raja Man Singh I, is a stunning blend of Hindu and Mughal architectural styles. Perched on a hilltop overlooking Maota Lake, the fort complex contains the magnificent Sheesh Mahal (Mirror Palace) whose walls and ceilings are covered with thousands of tiny mirrors.',
    highlights: ['Sheesh Mahal', 'Elephant Rides', 'Maota Lake View', 'UNESCO Heritage'],
    bestTime: 'October to March',
    nearbyPlaces: ['Jaigarh Fort', 'Nahargarh Fort', 'Hawa Mahal'],
  },
  {
    id: 12, name: 'Mysore Palace', state: 'Karnataka', city: 'Mysuru',
    lat: 12.3052, lng: 76.6552, era: 'Wodeyar • 1912 AD', type: 'Palace', emoji: '👑',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Mysore_Palace_illuminated.jpg/1200px-Mysore_Palace_illuminated.jpg',
    entry: '₹70 (Indians)', timing: '10AM - 5:30PM',
    rating: '4.7', visitors: '6 million/year',
    history: 'The Mysore Palace is the official residence of the Wadiyar dynasty. The current palace was built between 1897 and 1912 after the previous one was destroyed by fire. It is illuminated by nearly 100,000 light bulbs every Sunday and on special occasions. It is the most visited monument in India after the Taj Mahal.',
    highlights: ['100,000 Light Bulbs', 'Dasara Celebrations', 'Golden Throne', 'Indo-Saracenic Style'],
    bestTime: 'October (Dasara)',
    nearbyPlaces: ['Chamundi Hills', 'Brindavan Gardens', 'St. Philomenas Church'],
  },
]

const states = ['All States', ...new Set(monuments.map(m => m.state))]
const types = ['All Types', 'Monument', 'Temple', 'Ruins', 'Cave', 'Palace', 'Fort']

function FlyToMarker({ position }) {
  const map = useMap()
  if (position) map.flyTo(position, 13, { duration: 1.5 })
  return null
}

export default function MapExplorer() {
  const [selected, setSelected] = useState(null)
  const [filterState, setFilterState] = useState('All States')
  const [filterType, setFilterType] = useState('All Types')
  const [search, setSearch] = useState('')
  const [flyTo, setFlyTo] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const filtered = monuments.filter(m => {
    const matchState = filterState === 'All States' || m.state === filterState
    const matchType = filterType === 'All Types' || m.type === filterType
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.state.toLowerCase().includes(search.toLowerCase()) ||
      m.city.toLowerCase().includes(search.toLowerCase())
    return matchState && matchType && matchSearch
  })

  const handleSelect = (monument) => {
    setSelected(monument)
    setFlyTo([monument.lat, monument.lng])
    setActiveTab('overview')
  }

  return (
    <div className="min-h-screen bg-black text-white">
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
        <h1 className="text-lg font-semibold tracking-wider" style={{ color: '#FFD700' }}>🗺️ Heritage Map</h1>
        <a href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">← Back</a>
      </nav>

      <div className="pt-16 flex h-screen">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 overflow-y-auto"
          style={{ background: 'rgba(10,10,10,0.98)', borderRight: '1px solid rgba(255,215,0,0.1)' }}>
          <div className="p-4">
            <input type="text" placeholder="🔍 Search monuments, cities..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-xl text-sm text-white outline-none mb-3"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)' }}
            />
            <div className="flex gap-2 mb-4">
              <select value={filterState} onChange={e => setFilterState(e.target.value)}
                className="flex-1 px-2 py-2 rounded-xl text-xs text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)' }}>
                {states.map(s => <option key={s} value={s} style={{ background: '#1a0000' }}>{s}</option>)}
              </select>
              <select value={filterType} onChange={e => setFilterType(e.target.value)}
                className="flex-1 px-2 py-2 rounded-xl text-xs text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)' }}>
                {types.map(t => <option key={t} value={t} style={{ background: '#1a0000' }}>{t}</option>)}
              </select>
            </div>
            <p className="text-gray-500 text-xs mb-3">{filtered.length} places found</p>
            {filtered.map(m => (
              <motion.div key={m.id} whileHover={{ x: 4 }} onClick={() => handleSelect(m)}
                className="flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer transition-all duration-300 group"
                style={{
                  background: selected?.id === m.id ? 'rgba(139,0,0,0.4)' : 'rgba(255,255,255,0.03)',
                  border: selected?.id === m.id ? '1px solid rgba(255,215,0,0.5)' : '1px solid rgba(255,255,255,0.05)'
                }}>
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover"
                    onError={e => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;background:rgba(139,0,0,0.3)">${m.emoji}</div>` }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-yellow-400 transition-colors">{m.name}</p>
                  <p className="text-xs text-gray-400">📍 {m.city}, {m.state}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#FFD700' }}>⭐ {m.rating}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer center={[20.5937, 78.9629]} zoom={5}
            style={{ height: '100%', width: '100%' }} zoomControl={true}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap &copy; CARTO' />
            {flyTo && <FlyToMarker position={flyTo} />}
            {filtered.map(m => (
              <Marker key={m.id} position={[m.lat, m.lng]}
                icon={createEmojiIcon(m.emoji, selected?.id === m.id)}
                eventHandlers={{ click: () => handleSelect(m) }}>
                <Popup>
                  <div style={{ background: '#1a0000', color: 'white', padding: '8px', borderRadius: '8px', minWidth: '180px' }}>
                    <img src={m.image} alt={m.name}
                      style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', marginBottom: '6px' }}
                      onError={e => e.target.style.display = 'none'} />
                    <b style={{ color: '#FFD700', fontSize: '14px' }}>{m.emoji} {m.name}</b>
                    <p style={{ color: '#ccc', fontSize: '11px', margin: '2px 0' }}>📍 {m.city}, {m.state}</p>
                    <p style={{ color: '#FFD700', fontSize: '11px' }}>⭐ {m.rating} • {m.type}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Detail Panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ x: 450, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 450, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="absolute top-0 right-0 bottom-0 w-96 overflow-y-auto z-50"
                style={{ background: 'rgba(8,8,8,0.98)', borderLeft: '1px solid rgba(255,215,0,0.2)' }}>
                <div className="relative h-52">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover"
                    onError={e => { e.target.style.display = 'none' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, transparent 60%)' }} />
                  <button onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}>✕</button>
                  <div className="absolute bottom-3 left-4">
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background: 'rgba(139,0,0,0.8)', color: '#FFD700', border: '1px solid rgba(255,215,0,0.3)' }}>
                      {selected.era}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-black mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#FFD700' }}>
                    {selected.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">📍 {selected.city}, {selected.state}</p>
                  <div className="flex items-center gap-3 mb-4 text-xs">
                    <span style={{ color: '#FFD700' }}>⭐ {selected.rating}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">👥 {selected.visitors}</span>
                    <span className="text-gray-500">•</span>
                    <span style={{ color: '#FFA500' }}>{selected.type}</span>
                  </div>

                  <div className="flex gap-2 mb-4">
                    {['overview', 'history', 'info'].map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                        style={activeTab === tab
                          ? { background: 'linear-gradient(135deg, #8B0000, #FFD700)', color: '#000' }
                          : { background: 'rgba(255,255,255,0.07)', color: '#aaa' }}>
                        {tab === 'overview' ? '📋 Overview' : tab === 'history' ? '📖 History' : 'ℹ️ Info'}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {[
                          { label: '🎫 Entry Fee', value: selected.entry },
                          { label: '🕐 Timing', value: selected.timing },
                          { label: '🌤️ Best Time', value: selected.bestTime },
                          { label: '🏷️ Type', value: selected.type },
                        ].map((item, i) => (
                          <div key={i} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                            <p className="text-xs font-semibold text-white">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <h4 className="text-sm font-bold mb-2" style={{ color: '#FFD700' }}>✨ Highlights</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selected.highlights.map((h, i) => (
                          <span key={i} className="text-xs px-3 py-1 rounded-full"
                            style={{ background: 'rgba(139,0,0,0.3)', color: '#FFA500', border: '1px solid rgba(255,165,0,0.3)' }}>
                            {h}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-sm font-bold mb-2" style={{ color: '#FFD700' }}>📍 Nearby Places</h4>
                      {selected.nearbyPlaces.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                          <span className="text-yellow-400 text-xs">📌</span>
                          <span className="text-gray-300 text-xs">{p}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'history' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <p className="text-gray-300 text-sm leading-relaxed">{selected.history}</p>
                    </motion.div>
                  )}

                  {activeTab === 'info' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="space-y-3">
                        {[
                          { icon: '📍', label: 'Location', value: `${selected.city}, ${selected.state}` },
                          { icon: '🏛️', label: 'Era', value: selected.era },
                          { icon: '🎫', label: 'Entry Fee', value: selected.entry },
                          { icon: '🕐', label: 'Timing', value: selected.timing },
                          { icon: '⭐', label: 'Rating', value: selected.rating + ' / 5.0' },
                          { icon: '👥', label: 'Annual Visitors', value: selected.visitors },
                          { icon: '🌤️', label: 'Best Time to Visit', value: selected.bestTime },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                            <span>{item.icon}</span>
                            <div>
                              <p className="text-xs text-gray-400">{item.label}</p>
                              <p className="text-sm font-semibold text-white">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <motion.a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                    target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full mt-5 py-3 rounded-xl text-sm font-semibold text-black text-center block"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    🗺️ Get Directions (Google Maps)
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}