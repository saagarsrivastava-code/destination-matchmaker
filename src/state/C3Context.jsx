import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { VIBES_MAX } from '../data/c3.js'

const C3Context = createContext(null)

export function C3Provider({ children }) {
  // Basics — months, pax, total trip budget range (₹, per person)
  const [basics, setBasics] = useState({
    months: ['Apr'],
    party: 'Partner',
    budget: [50000, 150000],
  })
  const setBasic = useCallback((key, value) => setBasics((b) => ({ ...b, [key]: value })), [])

  const toggleMonth = useCallback((m) => {
    setBasics((b) => ({
      ...b,
      months: b.months.includes(m) ? b.months.filter((x) => x !== m) : [...b.months, m],
    }))
  }, [])

  // Preferences — collected via pill questions (no swipe)
  const [prefs, setPrefs] = useState({
    pace: 50,                       // 0 = more free time … 100 = more activities
    vibes: ['food', 'hidden'],      // up to VIBES_MAX trait keys
    food: 'All cuisines',
    stays: ['4✭ Hotels'],           // multi-select
    offbeat: 'Mix of both',
    transport: 'Private transfer',
  })
  const setPref = useCallback((key, value) => setPrefs((p) => ({ ...p, [key]: value })), [])

  const toggleVibe = useCallback((key) => {
    setPrefs((p) => {
      if (p.vibes.includes(key)) return { ...p, vibes: p.vibes.filter((v) => v !== key) }
      if (p.vibes.length >= VIBES_MAX) return p
      return { ...p, vibes: [...p.vibes, key] }
    })
  }, [])

  const toggleStay = useCallback((key) => {
    setPrefs((p) => ({
      ...p,
      stays: p.stays.includes(key) ? p.stays.filter((s) => s !== key) : [...p.stays, key],
    }))
  }, [])

  // Shortlisted itineraries — array of { dest, id }, newest last.
  const [shortlist, setShortlist] = useState([])

  const isShortlisted = useCallback(
    (dest, id) => shortlist.some((s) => s.dest === dest && s.id === id),
    [shortlist],
  )

  const addShortlist = useCallback((dest, id) => {
    setShortlist((prev) => (prev.some((s) => s.dest === dest && s.id === id) ? prev : [...prev, { dest, id }]))
  }, [])

  const removeShortlist = useCallback((dest, id) => {
    setShortlist((prev) => prev.filter((s) => !(s.dest === dest && s.id === id)))
  }, [])

  const value = useMemo(
    () => ({
      basics, setBasic, toggleMonth,
      prefs, setPref, toggleVibe, toggleStay,
      shortlist, isShortlisted, addShortlist, removeShortlist,
    }),
    [basics, setBasic, toggleMonth, prefs, setPref, toggleVibe, toggleStay, shortlist, isShortlisted, addShortlist, removeShortlist],
  )

  return <C3Context.Provider value={value}>{children}</C3Context.Provider>
}

export function useC3() {
  const ctx = useContext(C3Context)
  if (!ctx) throw new Error('useC3 must be used within C3Provider')
  return ctx
}
