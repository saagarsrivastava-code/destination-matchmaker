import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Screen, Footer } from '../../components/Chrome.jsx'
import { Button, Stepper } from '../../components/ui.jsx'
import Icon from '../../components/Icon.jsx'
import { useC3 } from '../../state/C3Context.jsx'
import { VIBE_OPTIONS, VIBES_MAX } from '../../data/c3.js'

export default function C3Vibe() {
  const navigate = useNavigate()
  const { prefs, setPref, toggleVibe } = useC3()
  const { pace, vibes } = prefs

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <button className="appbar__back" style={{ marginLeft: -8 }} onClick={() => navigate('/c3/basics')} aria-label="Back"><Icon name="back" /></button>
          <span className="t-p-small muted">2 of 3</span>
          <span style={{ width: 30 }} />
        </div>
        <div style={{ marginTop: 12 }}><Stepper current={2} total={3} /></div>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {/* Pace */}
          <h2 className="q-title q-title--sm" style={{ marginTop: 4 }}>How much free time do you want on your trip?</h2>
          <div className="row" style={{ justifyContent: 'space-between', marginTop: 14, alignItems: 'flex-start', gap: 16 }}>
            <div className="pace-end">
              <span className={`pace-icn${pace <= 35 ? ' is-on' : ''}`}><Icon name="sun" size={19} /></span>
              <div className="t-lb-sm" style={{ marginTop: 6 }}><b>I want more free time</b></div>
            </div>
            <div className="pace-end" style={{ textAlign: 'right', alignItems: 'flex-end' }}>
              <span className={`pace-icn${pace >= 65 ? ' is-on' : ''}`}><Icon name="bolt" size={19} /></span>
              <div className="t-lb-sm" style={{ marginTop: 6 }}><b>I want more activities</b></div>
            </div>
          </div>
          <div className="slider-wrap" style={{ marginTop: 18 }}>
            <div className="slider-track">
              <div className="slider-fill" style={{ width: `${pace}%` }} />
              <div className="slider-knob" style={{ left: `${pace}%` }} />
              <input
                className="slider-input" type="range" min="0" max="100" step="5"
                value={pace} onChange={(e) => setPref('pace', Number(e.target.value))}
                aria-label="Travel pace"
              />
            </div>
          </div>

          {/* Vibe pills */}
          <h2 className="q-title q-title--sm" style={{ marginTop: 30 }}>What's this trip about?</h2>
          <div className="chips" style={{ marginTop: 12 }}>
            {VIBE_OPTIONS.map((o) => {
              const on = vibes.includes(o.key)
              const disabled = !on && vibes.length >= VIBES_MAX
              return (
                <button
                  key={o.key}
                  className={`chip${on ? ' is-sel' : ''}${disabled ? ' is-disabled' : ''}`}
                  onClick={() => toggleVibe(o.key)}
                >
                  {o.label}{on ? ' ✓' : ''}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      <Footer>
        <Button full variant="dark" disabled={vibes.length === 0} onClick={() => navigate('/c3/prefs')}>
          Next — a few preferences
        </Button>
      </Footer>
    </Screen>
  )
}
