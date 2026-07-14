import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Screen, AppBar } from '../../components/Chrome.jsx'
import { Button } from '../../components/ui.jsx'
import Icon from '../../components/Icon.jsx'
import { useC3 } from '../../state/C3Context.jsx'
import { getItinerary, inr } from '../../data/c3.js'

export default function C3Shortlist() {
  const navigate = useNavigate()
  const { shortlist, removeShortlist } = useC3()

  const items = shortlist
    .map((s) => ({ ...s, it: getItinerary(s.dest, s.id) }))
    .filter((x) => x.it)

  return (
    <Screen>
      <AppBar
        title="Your shortlist"
        subtitle={items.length ? `${items.length} trip${items.length === 1 ? '' : 's'} saved` : 'Nothing saved yet'}
        onBack={() => navigate('/c3/discover')}
      />

      <div className="screen-body pad" style={{ paddingTop: 8, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' }}>
        {items.length === 0 ? (
          <div className="empty" style={{ minHeight: 340 }}>
            <span className="paywall__icn" style={{ width: 56, height: 56 }}><Icon name="bookmark" size={26} /></span>
            <div className="t-hd-sm">No trips shortlisted</div>
            <p className="t-p-small muted" style={{ maxWidth: 250 }}>
              Swipe right on the trips you like — they’ll collect here.
            </p>
            <Button variant="dark" onClick={() => navigate('/c3/discover')}>Keep swiping</Button>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {items.map(({ dest, id, it }) => (
                <motion.div
                  key={dest + id}
                  layout
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="sl-card">
                    <button
                      className="sl-card__main"
                      onClick={() => navigate(`/c3/trip/${dest}/${id}`)}
                      aria-label={`Open ${it.title}`}
                    >
                      <div className="sl-card__thumb" style={{ background: it.grad }}>
                        <img src={it.photo} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                      </div>
                      <div className="sl-card__body">
                        <div className="t-lb-sm muted">{it.destName}</div>
                        <div className="sl-card__title">{it.title}</div>
                        <div className="sl-card__tags">
                          {it.tags.map((t) => <span key={t}>{t}</span>)}
                        </div>
                        <div className="sl-card__price">Starting {inr(it.price)} /pax</div>
                      </div>
                      <Icon name="arrowRight" size={17} style={{ color: 'var(--content-secondary)', flexShrink: 0 }} />
                    </button>
                    <button
                      className="sl-card__remove"
                      onClick={() => removeShortlist(dest, id)}
                      aria-label={`Remove ${it.title}`}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              className="t-p-small muted center"
              style={{ display: 'block', margin: '20px auto 0', textDecoration: 'underline' }}
              onClick={() => navigate('/c3/discover')}
            >
              Back to swiping
            </button>
          </>
        )}
      </div>
    </Screen>
  )
}
