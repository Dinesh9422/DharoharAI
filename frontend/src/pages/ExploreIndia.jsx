import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const createDestIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="background:${color};width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);font-size:14px">📍</span></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

const userIcon = L.divIcon({
  className: '',
  html: `<div style="background:#4285F4;width:20px;height:20px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 4px rgba(66,133,244,0.3)"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
})

const STATES = [
  { key: 'andhra_pradesh', name: 'Andhra Pradesh', lat: 15.9129, lng: 79.7400 },
  { key: 'arunachal_pradesh', name: 'Arunachal Pradesh', lat: 28.2180, lng: 94.7278 },
  { key: 'assam', name: 'Assam', lat: 26.2006, lng: 92.9376 },
  { key: 'bihar', name: 'Bihar', lat: 25.0961, lng: 85.3131 },
  { key: 'chhattisgarh', name: 'Chhattisgarh', lat: 21.2787, lng: 81.8661 },
  { key: 'goa', name: 'Goa', lat: 15.2993, lng: 74.1240 },
  { key: 'gujarat', name: 'Gujarat', lat: 22.2587, lng: 71.1924 },
  { key: 'haryana', name: 'Haryana', lat: 29.0588, lng: 76.0856 },
  { key: 'himachal_pradesh', name: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  { key: 'jharkhand', name: 'Jharkhand', lat: 23.6102, lng: 85.2799 },
  { key: 'karnataka', name: 'Karnataka', lat: 15.3173, lng: 75.7139 },
  { key: 'kerala', name: 'Kerala', lat: 10.8505, lng: 76.2711 },
  { key: 'madhya_pradesh', name: 'Madhya Pradesh', lat: 22.9734, lng: 78.6569 },
  { key: 'maharashtra', name: 'Maharashtra', lat: 19.7515, lng: 75.7139 },
  { key: 'manipur', name: 'Manipur', lat: 24.6637, lng: 93.9063 },
  { key: 'meghalaya', name: 'Meghalaya', lat: 25.4670, lng: 91.3662 },
  { key: 'mizoram', name: 'Mizoram', lat: 23.1645, lng: 92.9376 },
  { key: 'nagaland', name: 'Nagaland', lat: 26.1584, lng: 94.5624 },
  { key: 'odisha', name: 'Odisha', lat: 20.9517, lng: 85.0985 },
  { key: 'punjab', name: 'Punjab', lat: 31.1471, lng: 75.3412 },
  { key: 'rajasthan', name: 'Rajasthan', lat: 27.0238, lng: 74.2179 },
  { key: 'sikkim', name: 'Sikkim', lat: 27.5330, lng: 88.5122 },
  { key: 'tamil_nadu', name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569 },
  { key: 'telangana', name: 'Telangana', lat: 18.1124, lng: 79.0193 },
  { key: 'tripura', name: 'Tripura', lat: 23.9408, lng: 91.9882 },
  { key: 'uttarakhand', name: 'Uttarakhand', lat: 30.0668, lng: 79.0193 },
  { key: 'uttar_pradesh', name: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { key: 'west_bengal', name: 'West Bengal', lat: 22.9868, lng: 87.8550 },
  { key: 'andaman_nicobar', name: 'Andaman & Nicobar', lat: 11.7401, lng: 92.6586 },
  { key: 'chandigarh', name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { key: 'dadra_nagar_haveli', name: 'Dadra & Nagar Haveli', lat: 20.1809, lng: 73.0169 },
  { key: 'jammu_kashmir', name: 'Jammu & Kashmir', lat: 33.7782, lng: 76.5762 },
  { key: 'ladakh', name: 'Ladakh', lat: 34.1526, lng: 77.5771 },
  { key: 'lakshadweep', name: 'Lakshadweep', lat: 10.5667, lng: 72.6417 },
  { key: 'puducherry', name: 'Puducherry', lat: 11.9416, lng: 79.8083 },
  { key: 'delhi', name: 'Delhi', lat: 28.6139, lng: 77.2090 },
]

const SECTIONS = [
  { id: 'Heritage', icon: '🏛️', label: 'Heritage', color: '#FFD700' },
  { id: 'Food', icon: '🍛', label: 'Food', color: '#FF6347' },
  { id: 'Hotels', icon: '🏨', label: 'Hotels', color: '#4169E1' },
  { id: 'Tourist Spots', icon: '🎡', label: 'Tourist Spots', color: '#32CD32' },
  { id: 'Shopping', icon: '🛍️', label: 'Shopping', color: '#FF69B4' },
  { id: 'Nature', icon: '🌿', label: 'Nature', color: '#228B22' },
  { id: 'Religious Places', icon: '🕌', label: 'Religious', color: '#FFA500' },
  { id: 'Arts & Culture', icon: '🎭', label: 'Arts', color: '#9370DB' },
  { id: 'Adventure', icon: '🎢', label: 'Adventure', color: '#FF4500' },
  { id: 'Wellness', icon: '💆', label: 'Wellness', color: '#20B2AA' },
  { id: 'Transport', icon: '🚌', label: 'Transport', color: '#708090' },
  { id: 'Local Experiences', icon: '🎪', label: 'Experiences', color: '#DAA520' },
]

function FlyTo({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) map.flyTo(position, 12, { duration: 1.5 })
  }, [position, map])
  return null
}

export default function ExploreIndia() {
  const [selectedState, setSelectedState] = useState(null)
  const [selectedSection, setSelectedSection] = useState(null)
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [routeCoords, setRouteCoords] = useState(null)
  const [routeInfo, setRouteInfo] = useState(null)
  const [showMap, setShowMap] = useState(false)
  const [loadingRoute, setLoadingRoute] = useState(false)
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629])
  const [search, setSearch] = useState('')

  const filteredStates = STATES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const sectionColor = SECTIONS.find(s => s.id === selectedSection)?.color || '#FFD700'

  const loadPlaces = async (stateKey, section) => {
    setLoading(true)
    setPlaces([])
    setSelectedPlace(null)
    setShowMap(false)
    try {
      const res = await fetch(`/src/data/state_data/${stateKey}.json`)
      const json = await res.json()
      const sectionData = json.data[section] || []
      setPlaces(sectionData)
    } catch (err) {
      console.error('Error loading places:', err)
      setPlaces([])
    }
    setLoading(false)
  }

  const handleStateSelect = (state) => {
    setSelectedState(state)
    setSelectedSection(null)
    setPlaces([])
    setSelectedPlace(null)
    setShowMap(false)
    setMapCenter([state.lat, state.lng])
  }

  const handleSectionSelect = (section) => {
    setSelectedSection(section)
    if (selectedState) {
      loadPlaces(selectedState.key, section)
    }
  }

  const geocodePlace = async (placeName, stateName) => {
    try {
      const query = encodeURIComponent(`${placeName}, ${stateName}, India`)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=in`,
        { headers: { 'Accept-Language': 'en' } }
      )
      const data = await res.json()
      if (data && data[0]) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
      }
    } catch (e) {
      console.error('Geocoding failed:', e)
    }
    return null
  }

  const getRoute = async (place) => {
    setLoadingRoute(true)
    setRouteCoords(null)
    setRouteInfo(null)
    setShowMap(true)

    // Get REAL coordinates for this place using Nominatim
    const realCoords = await geocodePlace(place.name, selectedState?.name)
    const finalPlace = realCoords
      ? { ...place, lat: realCoords.lat, lng: realCoords.lng }
      : place

    setSelectedPlace(finalPlace)
    setMapCenter([finalPlace.lat, finalPlace.lng])

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const uLoc = [pos.coords.latitude, pos.coords.longitude]
        setUserLocation(uLoc)
        try {
          const res = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${uLoc[1]},${uLoc[0]};${finalPlace.lng},${finalPlace.lat}?overview=full&geometries=geojson`
          )
          const data = await res.json()
          if (data.routes?.[0]) {
            const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]])
            setRouteCoords(coords)
            setRouteInfo({
              km: (data.routes[0].distance / 1000).toFixed(1),
              min: Math.round(data.routes[0].duration / 60)
            })
          }
        } catch (e) { console.error(e) }
        setLoadingRoute(false)
      },
      () => {
        setLoadingRoute(false)
        alert('Please enable location access!')
      }
    )
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
        <h1 className="text-lg font-semibold tracking-wider" style={{ color: '#FFD700' }}>🇮🇳 Explore India</h1>
        <a href="/" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">← Back</a>
      </nav>

      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="text-xs tracking-widest uppercase mb-3 block" style={{ color: '#FFD700' }}>All 36 States & UTs</span>
          <h1 className="text-5xl font-black mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            Explore <span style={{ background: 'linear-gradient(135deg, #FFD700, #8B0000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>India</span>
          </h1>
          <p className="text-gray-400">Select any state → Choose what you need → Get live route navigation</p>
        </motion.div>

        {/* Step 1 — State */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold tracking-widest uppercase" style={{ color: '#FFD700' }}>
              Step 1 — Select State or UT
            </h2>
            <span className="text-xs text-gray-500">{STATES.length} states & UTs</span>
          </div>

          {/* Search */}
          <input type="text" placeholder="🔍 Search state..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl text-sm text-white outline-none mb-4"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)', maxWidth: '300px' }}
          />

          <div className="flex flex-wrap gap-2">
            {filteredStates.map(state => (
              <motion.button key={state.key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleStateSelect(state)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={selectedState?.key === state.key
                  ? { background: 'linear-gradient(135deg, #8B0000, #FFD700)', color: '#000' }
                  : { background: 'rgba(255,255,255,0.05)', color: '#ccc', border: '1px solid rgba(255,215,0,0.2)' }
                }>
                {state.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Step 2 — Section */}
        <AnimatePresence>
          {selectedState && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#FFD700' }}>
                Step 2 — What are you looking for in {selectedState.name}?
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {SECTIONS.map(section => (
                  <motion.button key={section.id} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleSectionSelect(section.id)}
                    className="p-3 rounded-2xl text-center transition-all duration-300"
                    style={selectedSection === section.id
                      ? { background: `${section.color}30`, border: `2px solid ${section.color}` }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }
                    }>
                    <div className="text-2xl mb-1">{section.icon}</div>
                    <div className="text-xs font-semibold"
                      style={{ color: selectedSection === section.id ? section.color : '#aaa' }}>
                      {section.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Places */}
        <AnimatePresence>
          {selectedSection && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {loading ? (
                <div className="text-center py-16">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="text-4xl mb-4 inline-block">⚙️</motion.div>
                  <p className="text-gray-400">Loading places in {selectedState?.name}...</p>
                </div>
              ) : places.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold" style={{ color: '#FFD700' }}>
                      {SECTIONS.find(s => s.id === selectedSection)?.icon} {selectedSection} in {selectedState?.name}
                    </h2>
                    <span className="text-xs text-gray-400">{places.length} places found</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                    {places.map((place, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="p-5 rounded-2xl group relative overflow-hidden"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: `1px solid ${selectedPlace?.name === place.name ? sectionColor : 'rgba(255,255,255,0.08)'}`
                        }}>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                          style={{ background: `radial-gradient(circle at center, ${sectionColor}10, transparent)` }} />
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-sm group-hover:text-yellow-400 transition-colors leading-tight"
                              style={{ fontFamily: 'Playfair Display, serif' }}>{place.name}</h3>
                            <span className="text-xs font-bold ml-2 flex-shrink-0" style={{ color: '#FFD700' }}>⭐ {place.rating}</span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed mb-4">{place.desc}</p>
                          <div className="flex gap-2">
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              onClick={() => getRoute(place)}
                              className="flex-1 py-2 rounded-xl text-xs font-semibold text-black"
                              style={{ background: `linear-gradient(135deg, ${sectionColor}, #FFA500)` }}>
                              🗺️ Get Route
                            </motion.button>
                            <motion.a whileHover={{ scale: 1.05 }}
                              href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                              target="_blank" rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center justify-center"
                              style={{ background: 'rgba(66,133,244,0.2)', border: '1px solid rgba(66,133,244,0.4)' }}>
                              G Maps
                            </motion.a>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                          style={{ background: `linear-gradient(to right, ${sectionColor}, transparent)` }} />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-4xl mb-4">📭</p>
                  <p className="text-gray-400">No places found. Try another section!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Route Map */}
        <AnimatePresence>
          {showMap && selectedPlace && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-3xl overflow-hidden"
              style={{ border: '1px solid rgba(255,215,0,0.3)' }}>

              <div className="p-4 flex items-center justify-between"
                style={{ background: 'rgba(10,10,10,0.95)', borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
                <div>
                  <h3 className="font-bold" style={{ color: '#FFD700' }}>🗺️ Route to {selectedPlace.name}</h3>
                  {routeInfo && (
                    <p className="text-sm text-gray-400 mt-1">
                      📍 {routeInfo.km} km away • ⏱️ ~{routeInfo.min} mins by car
                    </p>
                  )}
                  {loadingRoute && <p className="text-sm text-yellow-400 mt-1 animate-pulse">📡 Calculating route...</p>}
                </div>
                <div className="flex gap-2">
                  <motion.a whileHover={{ scale: 1.05 }}
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.lat},${selectedPlace.lng}&travelmode=driving`}
                    target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-black"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    Open Google Maps
                  </motion.a>
                  <button onClick={() => setShowMap(false)}
                    className="px-3 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                    style={{ background: 'rgba(255,255,255,0.1)' }}>✕</button>
                </div>
              </div>

              <div style={{ height: '450px' }}>
                <MapContainer center={mapCenter} zoom={10} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; OpenStreetMap &copy; CARTO' />
                  <FlyTo position={mapCenter} />

                  {userLocation && (
                    <Marker position={userLocation} icon={userIcon}>
                      <Popup>
                        <div style={{ background: '#1a1a2e', color: 'white', padding: '8px', borderRadius: '8px' }}>
                          <b style={{ color: '#4285F4' }}>📍 Your Location</b>
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  <Marker position={[selectedPlace.lat, selectedPlace.lng]} icon={createDestIcon(sectionColor)}>
                    <Popup>
                      <div style={{ background: '#1a0000', color: 'white', padding: '8px', borderRadius: '8px', minWidth: '160px' }}>
                        <b style={{ color: '#FFD700' }}>{selectedPlace.name}</b>
                        <p style={{ color: '#ccc', fontSize: '11px', marginTop: '4px' }}>{selectedPlace.desc}</p>
                        <p style={{ color: '#FFD700', fontSize: '11px', marginTop: '4px' }}>⭐ {selectedPlace.rating}</p>
                      </div>
                    </Popup>
                  </Marker>

                  {routeCoords && routeCoords.length > 0 && (
                    <Polyline positions={routeCoords} color="#FFD700" weight={4} opacity={0.8} />
                  )}
                </MapContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}