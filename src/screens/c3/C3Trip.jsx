import { useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Screen } from '../../components/Chrome.jsx'
import { Button, CategoryPill, Sheet } from '../../components/ui.jsx'
import Icon from '../../components/Icon.jsx'
import { useC3 } from '../../state/C3Context.jsx'
import { getDestination, getItinerary, inr, traitPills, costTiles } from '../../data/c3.js'

export default function C3Trip() {
  const navigate = useNavigate()
  const { dest, id } = useParams()
  const { basics, isShortlisted, addShortlist, removeShortlist } = useC3()
  const [bookOpen, setBookOpen] = useState(false)
  const [booked, setBooked] = useState(false)
  const [paying, setPaying] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editText, setEditText] = useState('')
  const [editSent, setEditSent] = useState(false)

  const destination = getDestination(dest)
  const itinerary = getItinerary(dest, id)
  if (!destination || !itinerary) return <Navigate to="/c3/discover" replace />

  const saved = isShortlisted(dest, id)
  const tiles = costTiles(itinerary, dest)
  const total = tiles.reduce((s, t) => s + t.value, 0)

  function confirm() {
    setPaying(true)
    setTimeout(() => { setPaying(false); setBooked(true) }, 1400)
  }

  return (
    <Screen>
      <div className="screen-body" style={{ paddingBottom: 16 }}>
        {/* Hero */}
        <div className="detail-hero detail-hero--tall" style={{ background: itinerary.grad }}>
          <img className="detail-hero__img" src={itinerary.photo} alt="" draggable="false" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <div className="detail-hero__scrim" />
          <button className="detail-hero__back" onClick={() => navigate(-1)} aria-label="Back"><Icon name="back" size={22} /></button>
          <button
            className={`detail-hero__save${saved ? ' is-on' : ''}`}
            onClick={() => (saved ? removeShortlist(dest, id) : addShortlist(dest, id))}
            aria-label={saved ? 'Remove from shortlist' : 'Add to shortlist'}
          >
            <Icon name="bookmark" size={20} />
          </button>
          <div className="detail-hero__tags">
            {traitPills(itinerary).map((t, i) => <span key={i} className="itin-tag">{t}</span>)}
          </div>
          <div className="detail-hero__cap">
            <div className="t-lb-sm" style={{ color: 'rgba(255,255,255,0.82)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{destination.name}</div>
            <h1 className="detail-hero__title">{itinerary.title}</h1>
            <div className="t-p-small" style={{ color: 'rgba(255,255,255,0.9)', marginTop: 2 }}>{itinerary.tag} · {itinerary.nights}</div>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="pad" style={{ marginTop: 18 }}>
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="t-hd-sm">What you’ll pay</h2>
            <span className="t-lb-sm muted">per person</span>
          </div>
          <div className="cost-grid" style={{ marginTop: 12 }}>
            {tiles.map((c) => (
              <div key={c.label} className="cost-cell">
                <span className="cost-cell__emoji">{c.emoji}</span>
                <div>
                  <div className="cost-cell__label">{c.label}</div>
                  <div className="cost-cell__value">{c.approx ? '~' : ''}{inr(c.value)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="cost-total">
            <span>Estimated total</span>
            <b>{inr(total)} <span className="muted" style={{ fontWeight: 400 }}>/pax</span></b>
          </div>
        </div>

        {/* Day-by-day */}
        <div className="pad" style={{ marginTop: 22 }}>
          <h2 className="t-hd-sm" style={{ marginBottom: 4 }}>Day by day</h2>
          {itinerary.days.map((day, di) => (
            <div key={day.label} style={{ marginTop: di ? 24 : 14 }}>
              <div className="day-label">{day.label} · {day.date}</div>
              <div className="col" style={{ marginTop: 10 }}>
                {day.stops.map((stop, si) => (
                  <motion.div
                    key={`${day.label}-${si}`}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min((di * 3 + si) * 0.04, 0.4), duration: 0.25 }}
                  >
                    <div className="stop" style={{ marginTop: si ? 8 : 0 }}>
                      <span className="stop__time">{stop.time || '—'}</span>
                      <div className="stop__body">
                        <div className="stop__name">{stop.name}</div>
                        <div className="row" style={{ gap: 6, marginTop: 5 }}>
                          <CategoryPill category={stop.category} />
                        </div>
                      </div>
                      <button className="stop__edit" aria-label={`Edit ${stop.name}`}><Icon name="pencil" size={16} /></button>
                    </div>
                    {stop.transitAfter && (
                      <div className="transit">
                        <Icon name={stop.transitAfter.mode === 'walk' ? 'walk' : stop.transitAfter.mode === 'metro' ? 'metro' : 'car'} size={15} />
                        {stop.transitAfter.mode} · {stop.transitAfter.mins} min
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <Button full onClick={() => setBookOpen(true)}>Book this trip on scapia</Button>
        <button className="btn btn--ghost btn--md btn--full" style={{ marginTop: 8 }} onClick={() => setEditOpen(true)}>
          <Icon name="pencil" size={16} /> Edit itinerary
        </button>
      </div>

      {/* Booking sheet */}
      <Sheet open={bookOpen} onClose={() => setBookOpen(false)} height="58%">
        {booked ? (
          <div className="empty" style={{ minHeight: 260 }}>
            <motion.span
              className="celebrate__tick" style={{ width: 56, height: 56 }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            >
              <Icon name="check" size={26} />
            </motion.span>
            <div className="t-hd-med">Trip booked 🎉</div>
            <p className="t-p-small muted" style={{ maxWidth: 280 }}>
              Your {destination.name} plan is locked in for {basics.months.join(' / ')}. Tickets and vouchers land on your scapia app.
            </p>
            <Button variant="soft" onClick={() => { setBookOpen(false); navigate('/c3') }}>Back to start</Button>
          </div>
        ) : (
          <>
            <div className="t-hd-med" style={{ paddingTop: 6 }}>Book this trip</div>
            <p className="t-p-small muted" style={{ marginTop: 3 }}>{itinerary.tag} · {itinerary.nights} · {basics.party}</p>

            <div className="card" style={{ marginTop: 16 }}>
              <div className="bookrow"><span>Package ({basics.party.toLowerCase()})</span><b>{inr(itinerary.price)} /pax</b></div>
              <div className="bookrow"><span>Scapia coins on booking</span><b style={{ color: 'var(--success-green-500)' }}>+{Math.round(itinerary.price / 20).toLocaleString('en-IN')}</b></div>
              <div className="bookrow"><span>Pay today to hold</span><b>{inr(999)}</b></div>
            </div>

            <p className="t-lb-sm muted" style={{ marginTop: 12 }}>
              Free cancellation for 48 hours. Zero forex markup with your scapia card.
            </p>

            <div style={{ marginTop: 16 }}>
              <Button full variant="dark" onClick={confirm} disabled={paying}>
                {paying ? 'Processing…' : `Hold for ${inr(999)}`}
              </Button>
            </div>
          </>
        )}
      </Sheet>

      {/* Edit-itinerary sheet */}
      <Sheet open={editOpen} onClose={() => { setEditOpen(false); setEditSent(false); setEditText('') }} height="56%">
        {editSent ? (
          <div className="empty" style={{ minHeight: 240 }}>
            <motion.span
              className="celebrate__tick" style={{ width: 56, height: 56 }}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
            >
              <Icon name="check" size={26} />
            </motion.span>
            <div className="t-hd-med">Changes requested</div>
            <p className="t-p-small muted" style={{ maxWidth: 280 }}>
              Your trip designer will tweak the plan and update it here shortly.
            </p>
            <Button variant="soft" onClick={() => { setEditOpen(false); setEditSent(false); setEditText('') }}>Done</Button>
          </div>
        ) : (
          <>
            <div className="t-hd-med" style={{ paddingTop: 6 }}>Edit your itinerary</div>
            <p className="t-p-small muted" style={{ marginTop: 3 }}>Tell us what to change — swap a stop, add a day, adjust the pace.</p>

            <div className="chips" style={{ marginTop: 14 }}>
              {['Make it more relaxed', 'Add a food day', 'Swap a hotel', 'More adventure'].map((s) => (
                <button key={s} className="chip" onClick={() => setEditText((t) => (t ? `${t}. ${s}` : s))}>{s}</button>
              ))}
            </div>

            <textarea
              className="textbox"
              style={{ marginTop: 12, minHeight: 96 }}
              placeholder="e.g. Replace the sunrise trek with something gentler, and add a spa afternoon on day 2."
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div style={{ marginTop: 16 }}>
              <Button full variant="dark" disabled={!editText.trim()} onClick={() => setEditSent(true)}>
                Request changes
              </Button>
            </div>
          </>
        )}
      </Sheet>
    </Screen>
  )
}
