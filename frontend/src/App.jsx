import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MapExplorer from './pages/MapExplorer'
import Chatbot from './pages/Chatbot'
import Quiz from './pages/Quiz'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FestivalCalendar from './pages/FestivalCalendar'
import Community from './pages/Community'
import ExploreIndia from './pages/ExploreIndia'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapExplorer />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/festivals" element={<FestivalCalendar />} />
        <Route path="/community" element={<Community />} />
        <Route path="/explore" element={<ExploreIndia />} />
      </Routes>
    </Router>
  )
}

export default App