import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Screen, Footer } from '../../components/Chrome.jsx'
import { Button, Stepper } from '../../components/ui.jsx'
import Icon from '../../components/Icon.jsx'
import { useC3 } from '../../state/C3Context.jsx'
import { FOOD_OPTIONS, STAY_OPTIONS, OFFBEAT_OPTIONS, TRANSPORT_OPTIONS } from '../../data/c3.js'

export default function C3Prefs() {
  const navigate = useNavigate()
  const { prefs, setPref, toggleStay } = useC3()
  const { food, stays, offbeat, transport } = prefs

  const ready = !!food && stays.length > 0 && !!offbeat && !!transport

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <button className="appbar__back" style={{ marginLeft: -8 }} onClick={() => navigate('/c3/vibes')} aria-label="Back"><Icon name="back" /></button>
          <span className="t-p-small muted">3 of 3</span>
          <span style={{ width: 30 }} />
        </div>
        <div style={{ marginTop: 12 }}><Stepper current={3} total={3} /></div>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <QSection title="What's your food preference?" first>
            {FOOD_OPTIONS.map((f) => (
              <Pill key={f} on={food === f} onClick={() => setPref('food', f)}>{f}</Pill>
            ))}
          </QSection>

          <QSection title="What kind of stays do you want?">
            {STAY_OPTIONS.map((s) => (
              <Pill key={s} on={stays.includes(s)} onClick={() => toggleStay(s)}>{s}</Pill>
            ))}
          </QSection>

          <QSection title="More offbeat or more popular spots?">
            {OFFBEAT_OPTIONS.map((o) => (
              <Pill key={o} on={offbeat === o} onClick={() => setPref('offbeat', o)}>{o}</Pill>
            ))}
          </QSection>

          <QSection title="How do you prefer to get around?">
            {TRANSPORT_OPTIONS.map((t) => (
              <Pill key={t} on={transport === t} onClick={() => setPref('transport', t)}>{t}</Pill>
            ))}
          </QSection>
        </motion.div>
      </div>

      <Footer>
        <Button full variant="dark" disabled={!ready} onClick={() => navigate('/c3/building')}>
          Find my trips
        </Button>
      </Footer>
    </Screen>
  )
}

function QSection({ title, first, children }) {
  return (
    <div style={{ marginTop: first ? 4 : 28 }}>
      <h2 className="q-title q-title--sm">{title}</h2>
      <div className="chips" style={{ marginTop: 12 }}>{children}</div>
    </div>
  )
}

function Pill({ on, onClick, children }) {
  return (
    <button className={`chip${on ? ' is-sel' : ''}`} onClick={onClick}>
      {children}{on ? ' ✓' : ''}
    </button>
  )
}
