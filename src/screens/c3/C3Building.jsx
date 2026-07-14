import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Screen } from '../../components/Chrome.jsx'
import Icon from '../../components/Icon.jsx'
import { useC3 } from '../../state/C3Context.jsx'
import { VIBE_LABEL, inr } from '../../data/c3.js'

export default function C3Building() {
  const navigate = useNavigate()
  const { basics, prefs } = useC3()
  const [step, setStep] = useState(0)

  const lines = [
    prefs.vibes.length
      ? `Matching ${prefs.vibes.slice(0, 2).map((k) => VIBE_LABEL[k].toLowerCase()).join(', ')}…`
      : 'Reading your preferences…',
    `Fitting plans to your ${inr(basics.budget[0])}–${inr(basics.budget[1])} budget…`,
    `Checking ${basics.months.join(', ')} weather across destinations…`,
    'Building itineraries you can book…',
  ]

  useEffect(() => {
    const tick = setInterval(() => setStep((s) => Math.min(s + 1, lines.length - 1)), 850)
    const go = setTimeout(() => navigate('/c3/discover'), 3600)
    return () => { clearInterval(tick); clearTimeout(go) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen>
      <div className="screen-body pad" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="loader-orb">
          <motion.div
            className="loader-orb__ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
          <span className="loader-orb__core"><Icon name="sparkle" size={30} /></span>
        </div>

        <div className="t-hd-med" style={{ marginTop: 26 }}>Crafting your itineraries</div>
        <div style={{ height: 46, marginTop: 8 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={step}
              className="t-p-med muted"
              style={{ maxWidth: 290 }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {lines[step]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Screen>
  )
}
