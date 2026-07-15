import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Screen } from '../../components/Chrome.jsx'
import { Button } from '../../components/ui.jsx'
import Icon from '../../components/Icon.jsx'

// Fanned vibe cards teasing the questions ahead.
const FAN = [
  { icon: 'leaf', title: 'Nature',        bg: 'linear-gradient(150deg, #EAF7E6, #C9EBBE)', tint: '#38801F', rot: -9, x: -58, delay: 0.15 },
  { icon: 'food', title: 'Food & dining', bg: 'linear-gradient(150deg, #FFEAE0, #FECBB3)', tint: '#C63800', rot: 7,  x: 58,  delay: 0.25 },
  { icon: 'gem',  title: 'Hidden gems',   bg: 'linear-gradient(150deg, #E0EFFF, #B5D5FA)', tint: '#135EB4', rot: -1, x: 0,   delay: 0.35 },
]

export default function C3Landing() {
  const navigate = useNavigate()

  return (
    <Screen>
      <div className="screen-body pad" style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' }}>
        <div style={{ paddingTop: 14 }} className="wordmark">
          <span className="wordmark__dot"><Icon name="compass" size={17} /></span>
          <span className="wordmark__name">scapia<span> trips</span></span>
        </div>

        <motion.div
          initial="hide" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
          style={{ marginTop: 'auto', paddingTop: 36, textAlign: 'center' }}
        >
          <motion.h1
            variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            style={{ font: '700 29px/1.28 var(--font-body)', letterSpacing: '-0.01em' }}
          >
            Want to go for a trip<br />but stuck on <span style={{ color: 'var(--brand-primary)' }}>where?</span>
          </motion.h1>
          <motion.p
            variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            className="t-p-med muted"
            style={{ marginTop: 12, maxWidth: 300, marginLeft: 'auto', marginRight: 'auto' }}
          >
            Answer a few quick questions — we'll turn them into final plans you can book.
          </motion.p>
        </motion.div>

        <div className="spacer" style={{ minHeight: 16 }} />

        {/* fanned vibe-card teaser */}
        <div className="fan">
          {FAN.map(({ icon, title, bg, tint, rot, x, delay }) => (
            <motion.div
              key={title}
              className="fan__card"
              style={{ background: bg, color: tint }}
              initial={{ opacity: 0, y: 26, rotate: 0, x: 0 }}
              animate={{ opacity: 1, y: 0, rotate: rot, x }}
              transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon name={icon} size={30} stroke={1.6} />
              <span>{title}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ height: 28 }} />
        <Button full onClick={() => navigate('/c3/q/1')}>Find my trip</Button>
      </div>
    </Screen>
  )
}
