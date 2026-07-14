import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Screen, Footer } from '../../components/Chrome.jsx'
import { Button, Stepper } from '../../components/ui.jsx'
import Icon from '../../components/Icon.jsx'
import { useC3 } from '../../state/C3Context.jsx'
import { C3_MONTHS, C3_PARTY, BUDGET_MIN, BUDGET_MAX, BUDGET_STEP, budgetTier, inr } from '../../data/c3.js'

export default function C3Basics() {
  const navigate = useNavigate()
  const { basics, setBasic, toggleMonth } = useC3()
  const { months, party, budget } = basics

  const ready = months.length > 0 && !!party

  return (
    <Screen>
      <div className="pad" style={{ paddingTop: 8 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <button className="appbar__back" style={{ marginLeft: -8 }} onClick={() => navigate('/c3')} aria-label="Back"><Icon name="back" /></button>
          <span className="t-p-small muted">1 of 3</span>
          <span style={{ width: 30 }} />
        </div>
        <div style={{ marginTop: 12 }}><Stepper current={1} total={3} /></div>
      </div>

      <div className="screen-body pad" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Section title="When could you travel?" first>
            <div className="chips" style={{ marginTop: 12 }}>
              {C3_MONTHS.map((m) => (
                <button key={m} className={`chip${months.includes(m) ? ' is-sel' : ''}`} onClick={() => toggleMonth(m)}>
                  {m}{months.includes(m) ? ' ✓' : ''}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Who's joining you?">
            <div className="chips" style={{ marginTop: 12 }}>
              {C3_PARTY.map((p) => (
                <button key={p} className={`chip${party === p ? ' is-sel' : ''}`} onClick={() => setBasic('party', p)}>
                  {p}{party === p ? ' ✓' : ''}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Roughly, what's your total budget?">
            <BudgetRange value={budget} onChange={(v) => setBasic('budget', v)} />
          </Section>
        </motion.div>
      </div>

      <Footer>
        <Button full variant="dark" disabled={!ready} onClick={() => navigate('/c3/vibes')}>
          Next — your vibe
        </Button>
      </Footer>
    </Screen>
  )
}

function Section({ title, first, children }) {
  return (
    <div style={{ marginTop: first ? 4 : 28 }}>
      <h2 className="q-title q-title--sm">{title}</h2>
      {children}
    </div>
  )
}

/* Dual-thumb range slider — total trip budget, per person. */
function BudgetRange({ value, onChange }) {
  const [lo, hi] = value
  const pct = (v) => ((v - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100

  const setLo = (v) => onChange([Math.min(v, hi - BUDGET_STEP), hi])
  const setHi = (v) => onChange([lo, Math.max(v, lo + BUDGET_STEP)])

  return (
    <div style={{ marginTop: 18 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="t-hd-sm">{inr(lo)} – {inr(hi)}</span>
        <span className="spend-tier">{budgetTier(value)}</span>
      </div>

      <div className="rslider" style={{ marginTop: 14 }}>
        <div className="rslider__track" />
        <div className="rslider__fill" style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }} />
        <input
          type="range" min={BUDGET_MIN} max={BUDGET_MAX} step={BUDGET_STEP}
          value={lo} onChange={(e) => setLo(Number(e.target.value))}
          aria-label="Minimum total budget"
          style={{ zIndex: lo > (BUDGET_MIN + BUDGET_MAX) / 2 ? 4 : 3 }}
        />
        <input
          type="range" min={BUDGET_MIN} max={BUDGET_MAX} step={BUDGET_STEP}
          value={hi} onChange={(e) => setHi(Number(e.target.value))}
          aria-label="Maximum total budget"
          style={{ zIndex: 3 }}
        />
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginTop: 8 }}>
        <span className="t-lb-sm muted">{inr(BUDGET_MIN)}</span>
        <span className="t-lb-sm muted">{inr(BUDGET_MAX)}+</span>
      </div>
    </div>
  )
}
