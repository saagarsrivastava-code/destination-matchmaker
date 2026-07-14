import { Routes, Route, useLocation } from 'react-router-dom'

import Landing from './screens/Landing.jsx'
import Ideas from './screens/Ideas.jsx'
import Questions from './screens/Questions.jsx'
import Planning from './screens/Planning.jsx'
import ItineraryReady from './screens/ItineraryReady.jsx'
import Trip from './screens/Trip.jsx'

import C3Landing from './screens/c3/C3Landing.jsx'
import C3Basics from './screens/c3/C3Basics.jsx'
import C3Vibe from './screens/c3/C3Vibe.jsx'
import C3Prefs from './screens/c3/C3Prefs.jsx'
import C3Building from './screens/c3/C3Building.jsx'
import C3Discover from './screens/c3/C3Discover.jsx'
import C3Shortlist from './screens/c3/C3Shortlist.jsx'
import C3Trip from './screens/c3/C3Trip.jsx'

export default function App() {
  const location = useLocation()

  return (
    <div className="app">
      {/* No AnimatePresence: each Screen plays its own enter animation on
          mount, and keying Routes by path remounts cleanly on every nav. This
          sidesteps AnimatePresence wedging on the drag-heavy swipe decks, which
          left screens stuck mid-exit (black screen after the cards). */}
      <div className="screen-stack" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/ready" element={<ItineraryReady />} />
          <Route path="/trip" element={<Trip />} />

          {/* Concept 3 — swipe-first flow */}
          <Route path="/c3" element={<C3Landing />} />
          <Route path="/c3/basics" element={<C3Basics />} />
          <Route path="/c3/vibes" element={<C3Vibe />} />
          <Route path="/c3/prefs" element={<C3Prefs />} />
          <Route path="/c3/building" element={<C3Building />} />
          <Route path="/c3/discover" element={<C3Discover />} />
          <Route path="/c3/shortlist" element={<C3Shortlist />} />
          <Route path="/c3/trip/:dest/:id" element={<C3Trip />} />

          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </div>
  )
}
