// Concept 3 — swipe-first flow. Dummy data only.

const PHOTO = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

// ── Basics screen ────────────────────────────────────────────────
export const C3_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export const C3_PARTY = ['Solo', 'Partner', 'Friends', 'Family (kids)', 'Family (teens)', 'Parents', 'Group (6+)']

// Total trip budget per person, ₹. Two-grabber range slider.
export const BUDGET_MIN = 20000
export const BUDGET_MAX = 300000
export const BUDGET_STEP = 5000

export function budgetTier([lo, hi]) {
  const mid = (lo + hi) / 2
  if (mid < 60000) return 'Budget'
  if (mid < 120000) return 'Mid-range'
  if (mid < 200000) return 'Comfortable'
  return 'Luxury'
}

export const inr = (n) => '₹' + n.toLocaleString('en-IN')

// ── Pill questions (replace the vibe swipe) ─────────────────────
export const VIBE_OPTIONS = [
  { key: 'food', label: 'Food & dining' },
  { key: 'culture', label: 'Culture & history' },
  { key: 'hidden', label: 'Hidden gems' },
  { key: 'nature', label: 'Nature & outdoors' },
  { key: 'nightlife', label: 'Nightlife' },
  { key: 'shopping', label: 'Shopping' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'adventure', label: 'Adventure' },
  { key: 'local', label: 'Local life' },
  { key: 'landmarks', label: 'Popular landmarks' },
]
export const VIBES_MAX = 5
export const VIBE_LABEL = Object.fromEntries(VIBE_OPTIONS.map((o) => [o.key, o.label]))

export const FOOD_OPTIONS = ['Vegetarian', 'Non-vegetarian', 'Vegan', 'All cuisines']
export const STAY_OPTIONS = ['Hotels', 'Resorts', 'Homestays', 'Boutique stays', 'Hostels', 'Villas']
export const OFFBEAT_OPTIONS = ['More offbeat', 'More popular', 'Mix of both']
export const TRANSPORT_OPTIONS = ['Public transport', 'Private transfer']

// ── Swipe deck — vibe, wants, pace ───────────────────────────────
export const SWIPE_CARDS = [
  { key: 'food',      icon: 'food',     title: 'Food & dining',       sub: 'Plan days around where you eat',            bg: 'linear-gradient(150deg, #FFEAE0, #FECBB3)', tint: '#C63800' },
  { key: 'culture',   icon: 'museum',   title: 'Culture & history',   sub: 'Temples, old towns and museums',            bg: 'linear-gradient(150deg, #EFEAF8, #D8CCEE)', tint: '#5E4390' },
  { key: 'hidden',    icon: 'gem',      title: 'Hidden gems',         sub: 'Places locals actually go',                 bg: 'linear-gradient(150deg, #E0EFFF, #B5D5FA)', tint: '#135EB4' },
  { key: 'nature',    icon: 'leaf',     title: 'Nature & outdoors',   sub: 'Beaches, trails and viewpoints',            bg: 'linear-gradient(150deg, #EAF7E6, #C9EBBE)', tint: '#38801F' },
  { key: 'nightlife', icon: 'moon',     title: 'Nightlife',           sub: 'Bars, clubs and night markets',             bg: 'linear-gradient(150deg, #E7E9F4, #C3C9E8)', tint: '#3A4480' },
  { key: 'adventure', icon: 'mountain', title: 'Adventure',           sub: 'Treks, dives and adrenaline',               bg: 'linear-gradient(150deg, #FFF3E0, #FFD9A3)', tint: '#A05C00' },
  { key: 'wellness',  icon: 'lotus',    title: 'Wellness & downtime', sub: 'Spas, slow mornings, recovery days',        bg: 'linear-gradient(150deg, #E6F6F4, #BFE8E2)', tint: '#1E6E63' },
  { key: 'shopping',  icon: 'bag',      title: 'Shopping',            sub: 'Markets and shopping streets',              bg: 'linear-gradient(150deg, #FDEBF1, #F7C6D9)', tint: '#A03A62' },
  { key: 'landmarks', icon: 'pin',      title: 'Popular landmarks',   sub: 'The big sights, done right',                bg: 'linear-gradient(150deg, #F1F6FB, #CFDBE9)', tint: '#4B545E' },
  { key: 'packed',    icon: 'bolt',     title: 'Packed days',         sub: 'Squeeze in as much as possible — skip if you’d rather go slow', bg: 'linear-gradient(150deg, #FFFBE6, #FFE58F)', tint: '#8A6A00' },
]

export const CARD_LABEL = Object.fromEntries(SWIPE_CARDS.map((c) => [c.key, c.title]))

// Emoji pill label per trait — shown on the itinerary photo cards.
export const TRAIT_PILL = {
  food: '🍜 Food',
  culture: '🛕 Culture',
  hidden: '💎 Hidden gems',
  nature: '🌳 Nature',
  nightlife: '🌙 Nightlife',
  adventure: '🏄 Adventure',
  wellness: '🧘 Wellness',
  shopping: '🛍️ Shopping',
  landmarks: '📍 Landmarks',
  packed: '⚡ Packed',
}

export function traitPills(it) {
  return it.traits.slice(0, 3).map((t) => TRAIT_PILL[t] || t)
}

// Accommodation tier per itinerary — varies with budget and vibe.
// Backpacker adventures get hostels; wellness/luxury trips get 5✭.
export function stayLabel(it) {
  if (it.stay) return it.stay
  const p = it.price
  if (it.traits.includes('adventure') && p < 60000) return 'Hostels'
  if (it.traits.includes('wellness')) return '5✭ Hotels'
  if (p >= 120000) return '5✭ Hotels'
  if (p < 40000) return '3✭ Hotels'
  return '4✭ Hotels'
}

// Rough per-category cost split for the breakdown strip. Flights are estimated
// per destination (independent of package price); the rest scale off it.
const FLIGHT_EST = { bali: 42000, africa: 95000, thailand: 30000, vietnam: 28000 }
export function costTiles(it, destKey) {
  const round1k = (n) => Math.round(n / 1000) * 1000
  const stay = stayLabel(it)
  return [
    { emoji: '✈️', label: 'Flights', value: FLIGHT_EST[destKey] || 40000 },
    { emoji: stay === 'Hostels' ? '🛏️' : '🏨', label: stay, value: round1k(it.price * (stay === 'Hostels' ? 0.32 : 0.5)) },
    { emoji: '🪂', label: 'Activities', value: round1k(it.price * 0.28) },
    { emoji: '🥬', label: 'Food', value: round1k(it.price * 0.1), approx: true },
  ]
}

// ── Itineraries, grouped by destination ─────────────────────────
const st = (time, name, category, transitAfter = null) => ({ time, name, category, transitAfter })
const tr = (mode, mins) => ({ mode, mins })

export const DESTINATIONS = [
  {
    key: 'bali',
    name: 'Bali',
    grad: 'linear-gradient(160deg, #2E5D3E, #14361f)',
    itineraries: [
      {
        id: 'b1', destName: 'Bali', title: 'Bali adventure tales', tag: 'Adventure based',
        tags: ['Adventure based', 'less crowded'], traits: ['adventure', 'nature', 'packed'],
        photo: PHOTO('1573790387438-4da905039392'), grad: 'linear-gradient(160deg, #2E5D3E, #14361f)',
        price: 40300, nights: '5N · Ubud + Kintamani',
        days: [
          { label: 'Day 1 — Ubud', date: 'Mon 13 Apr', stops: [
            st('06:00', 'Mount Batur sunrise trek', 'nature', tr('car', 45)),
            st('11:30', 'Tegalalang rice terrace swing', 'nature', tr('car', 20)),
            st('19:00', 'Ubud night warung crawl', 'food'),
          ]},
          { label: 'Day 2 — Nusa Penida', date: 'Tue 14 Apr', stops: [
            st('08:00', 'Kelingking cliff hike', 'nature', tr('car', 25)),
            st('13:00', 'Crystal Bay snorkelling', 'nature', tr('car', 30)),
            st('18:30', 'Beach BBQ at Jungut Batu', 'food'),
          ]},
          { label: 'Day 3 — Ubud', date: 'Wed 15 Apr', stops: [
            st('09:30', 'Ayung river white-water rafting', 'nature', tr('car', 18)),
            st('15:00', 'Campuhan ridge walk', 'nature'),
          ]},
        ],
      },
      {
        id: 'b2', destName: 'Bali', title: 'Flavours of Bali', tag: 'Food based',
        tags: ['Food based', 'local gems'], traits: ['food', 'hidden', 'culture'],
        photo: PHOTO('1567337710282-00832b415979'), grad: 'linear-gradient(160deg, #8A3B1E, #3d1a0d)',
        price: 38900, nights: '5N · Ubud + Seminyak',
        days: [
          { label: 'Day 1 — Ubud', date: 'Mon 13 Apr', stops: [
            st('09:30', 'Ubud traditional market walk', 'food', tr('walk', 10)),
            st('12:30', 'Balinese cooking class, Laplapan', 'food', tr('car', 15)),
            st('19:00', 'Babi guling at Ibu Oka', 'food'),
          ]},
          { label: 'Day 2 — Seminyak', date: 'Tue 14 Apr', stops: [
            st('10:00', 'Pasar Badung spice tour', 'food', tr('car', 20)),
            st('13:30', 'Warung hopping, Jalan Kayu Aya', 'food', tr('walk', 8)),
            st('18:00', 'Sunset seafood at Jimbaran Bay', 'food'),
          ]},
        ],
      },
      {
        id: 'b3', destName: 'Bali', title: 'Slow mornings in Bali', tag: 'Chill trip',
        tags: ['Chill trip', 'wellness'], traits: ['wellness', 'nature'],
        photo: PHOTO('1604999565976-8913ad2ddb7c'), grad: 'linear-gradient(160deg, #1E6E63, #0c3029)',
        price: 45200, nights: '5N · Ubud + Uluwatu',
        days: [
          { label: 'Day 1 — Ubud', date: 'Mon 13 Apr', stops: [
            st('10:00', 'Morning yoga at The Yoga Barn', 'nature', tr('walk', 12)),
            st('14:00', 'Balinese spa & flower bath', 'stay', tr('walk', 6)),
            st('18:00', 'Slow dinner overlooking rice fields', 'food'),
          ]},
          { label: 'Day 2 — Uluwatu', date: 'Tue 14 Apr', stops: [
            st('11:00', 'Padang Padang beach morning', 'nature', tr('car', 15)),
            st('17:30', 'Uluwatu temple sunset (no rush)', 'culture'),
          ]},
        ],
      },
      {
        id: 'b4', destName: 'Bali', title: 'Bali temple trail', tag: 'Culture first',
        tags: ['Culture first', 'heritage'], traits: ['culture', 'landmarks'],
        photo: PHOTO('1537996194471-e657df975ab4'), grad: 'linear-gradient(160deg, #5E4390, #2a1d47)',
        price: 36500, nights: '4N · Ubud + Kintamani',
        days: [
          { label: 'Day 1 — Ubud', date: 'Mon 13 Apr', stops: [
            st('09:00', 'Tirta Empul water temple', 'culture', tr('car', 25)),
            st('13:00', 'Gunung Kawi rock shrines', 'culture', tr('car', 20)),
            st('18:30', 'Kecak fire dance, Ubud palace', 'culture'),
          ]},
          { label: 'Day 2 — Kintamani', date: 'Tue 14 Apr', stops: [
            st('09:30', 'Besakih mother temple', 'culture', tr('car', 40)),
            st('14:30', 'Penglipuran heritage village', 'culture'),
          ]},
        ],
      },
      {
        id: 'b5', destName: 'Bali', title: 'Bali after dark', tag: 'Nightlife & beach',
        tags: ['Nightlife', 'beach clubs'], traits: ['nightlife', 'shopping'],
        photo: PHOTO('1518548419970-58e3b4079ab2'), grad: 'linear-gradient(160deg, #3A4480, #171a3a)',
        price: 42800, nights: '5N · Seminyak + Canggu',
        days: [
          { label: 'Day 1 — Seminyak', date: 'Mon 13 Apr', stops: [
            st('11:00', 'Seminyak boutique street shopping', 'transport', tr('walk', 10)),
            st('17:00', 'Sunset at Potato Head beach club', 'food', tr('car', 10)),
            st('22:00', 'La Favela + Motel Mexicola', 'food'),
          ]},
          { label: 'Day 2 — Canggu', date: 'Tue 14 Apr', stops: [
            st('12:00', 'Love Anchor market, Canggu', 'transport', tr('walk', 6)),
            st('20:00', 'Old Man’s beach bar night', 'food'),
          ]},
        ],
      },
    ],
  },
  {
    key: 'africa',
    name: 'Africa',
    grad: 'linear-gradient(160deg, #8A5A1E, #3d270d)',
    itineraries: [
      {
        id: 'a1', destName: 'Africa', title: 'The great Mara safari', tag: 'Safari classic',
        tags: ['Safari classic', 'Big Five'], traits: ['nature', 'landmarks', 'adventure'],
        photo: PHOTO('1516426122078-c23e76319801'), grad: 'linear-gradient(160deg, #8A5A1E, #3d270d)',
        price: 148000, nights: '6N · Masai Mara + Nairobi',
        days: [
          { label: 'Day 1 — Masai Mara', date: 'Mon 13 Apr', stops: [
            st('06:00', 'Sunrise game drive (Big Five)', 'nature', tr('car', 30)),
            st('13:00', 'Bush lunch at camp', 'food', tr('car', 20)),
            st('16:30', 'Evening drive — river crossing point', 'nature'),
          ]},
          { label: 'Day 2 — Masai Mara', date: 'Tue 14 Apr', stops: [
            st('05:30', 'Hot-air balloon over the Mara', 'nature', tr('car', 25)),
            st('15:00', 'Maasai village visit', 'culture'),
          ]},
        ],
      },
      {
        id: 'a2', destName: 'Africa', title: 'Cape adrenaline rush', tag: 'Adventure based',
        tags: ['Adventure based', 'adrenaline'], traits: ['adventure', 'packed'],
        photo: PHOTO('1580060839134-75a5edca2e99'), grad: 'linear-gradient(160deg, #1E5A8A, #0d2a3d)',
        price: 156000, nights: '6N · Cape Town + Garden Route',
        days: [
          { label: 'Day 1 — Cape Town', date: 'Mon 13 Apr', stops: [
            st('08:00', 'Table Mountain via India Venster', 'nature', tr('car', 20)),
            st('14:00', 'Shark-cage diving briefing, Gansbaai', 'nature', tr('car', 35)),
            st('19:30', 'Waterfront dinner', 'food'),
          ]},
          { label: 'Day 2 — Garden Route', date: 'Tue 14 Apr', stops: [
            st('09:00', 'Bloukrans bridge bungee (216 m)', 'nature', tr('car', 40)),
            st('15:00', 'Tsitsikamma canopy zipline', 'nature'),
          ]},
        ],
      },
      {
        id: 'a3', destName: 'Africa', title: 'Zanzibar slow days', tag: 'Chill coastal',
        tags: ['Chill coastal', 'island time'], traits: ['wellness', 'nature'],
        photo: PHOTO('1509233725247-49e657c54213'), grad: 'linear-gradient(160deg, #1E7E8A, #0c353d)',
        price: 132000, nights: '6N · Zanzibar',
        days: [
          { label: 'Day 1 — Zanzibar', date: 'Mon 13 Apr', stops: [
            st('10:30', 'Nungwi beach morning', 'nature', tr('walk', 8)),
            st('15:00', 'Seaside spa session', 'stay', tr('walk', 5)),
            st('18:30', 'Rooftop dinner, Stone Town', 'food'),
          ]},
          { label: 'Day 2 — Zanzibar', date: 'Tue 14 Apr', stops: [
            st('11:00', 'Mnemba lagoon sandbank picnic', 'nature'),
          ]},
        ],
      },
      {
        id: 'a4', destName: 'Africa', title: 'Cape food & wine', tag: 'Food & wine',
        tags: ['Food & wine', 'tastings'], traits: ['food', 'hidden'],
        photo: PHOTO('1510812431401-41d2bd2722f3'), grad: 'linear-gradient(160deg, #7A2B4E, #351122)',
        price: 139000, nights: '6N · Cape Town + Stellenbosch',
        days: [
          { label: 'Day 1 — Cape Town', date: 'Mon 13 Apr', stops: [
            st('10:00', 'Neighbourgoods market, Woodstock', 'food', tr('car', 15)),
            st('13:30', 'Cape Malay cooking, Bo-Kaap', 'food', tr('car', 12)),
            st('19:00', 'Chef’s table at The Test Kitchen', 'food'),
          ]},
          { label: 'Day 2 — Stellenbosch', date: 'Tue 14 Apr', stops: [
            st('11:00', 'Winelands tram — 3 estates', 'food', tr('car', 20)),
            st('18:00', 'Vineyard sunset dinner', 'food'),
          ]},
        ],
      },
    ],
  },
  {
    key: 'thailand',
    name: 'Thailand',
    grad: 'linear-gradient(160deg, #8A3B1E, #3d1a0d)',
    itineraries: [
      {
        id: 't1', destName: 'Thailand', title: 'Thailand street eats', tag: 'Food based',
        tags: ['Food based', 'night markets'], traits: ['food', 'nightlife', 'hidden'],
        photo: PHOTO('1504674900247-0877df9cc836'), grad: 'linear-gradient(160deg, #8A3B1E, #3d1a0d)',
        price: 52000, nights: '5N · Bangkok + Phuket',
        days: [
          { label: 'Day 1 — Bangkok', date: 'Mon 13 Apr', stops: [
            st('10:00', 'Khlong Toei wet market walk', 'food', tr('metro', 15)),
            st('13:00', 'Michelin street food, Chinatown', 'food', tr('walk', 10)),
            st('20:00', 'Rooftop bars, Sukhumvit', 'food'),
          ]},
          { label: 'Day 2 — Phuket', date: 'Tue 14 Apr', stops: [
            st('12:00', 'Old Town café crawl', 'food', tr('walk', 8)),
            st('19:30', 'Bangla Road night market', 'food'),
          ]},
        ],
      },
      {
        id: 't2', destName: 'Thailand', title: 'Andaman island hop', tag: 'Island hopping',
        tags: ['Island hopping', 'beaches'], traits: ['nature', 'adventure'],
        photo: PHOTO('1552465011-b4e21bf6e79a'), grad: 'linear-gradient(160deg, #1E7E8A, #0c353d)',
        price: 58000, nights: '5N · Phuket + Krabi',
        days: [
          { label: 'Day 1 — Phuket', date: 'Mon 13 Apr', stops: [
            st('08:30', 'Phi Phi + Maya Bay speedboat', 'nature', tr('car', 20)),
            st('16:00', 'Kata Noi sunset swim', 'nature'),
          ]},
          { label: 'Day 2 — Krabi', date: 'Tue 14 Apr', stops: [
            st('09:00', 'Railay beach + lagoon hike', 'nature', tr('walk', 15)),
            st('14:30', '4-island longtail tour', 'nature'),
          ]},
        ],
      },
      {
        id: 't3', destName: 'Thailand', title: 'Samui slow escape', tag: 'Chill trip',
        tags: ['Chill trip', 'spa'], traits: ['wellness'],
        photo: PHOTO('1537956965359-7573183d1f57'), grad: 'linear-gradient(160deg, #1E6E63, #0c3029)',
        price: 49000, nights: '5N · Koh Samui',
        days: [
          { label: 'Day 1 — Koh Samui', date: 'Mon 13 Apr', stops: [
            st('10:30', 'Beachfront thai massage', 'stay', tr('walk', 5)),
            st('16:00', 'Silver Beach lazy afternoon', 'nature'),
          ]},
          { label: 'Day 2 — Koh Samui', date: 'Tue 14 Apr', stops: [
            st('11:00', 'Pool villa brunch, no plans', 'food'),
          ]},
        ],
      },
    ],
  },
  {
    key: 'vietnam',
    name: 'Vietnam',
    grad: 'linear-gradient(160deg, #2E5D3E, #14361f)',
    itineraries: [
      {
        id: 'v1', destName: 'Vietnam', title: 'Old town Vietnam', tag: 'Culture & food',
        tags: ['Culture & food', 'lantern nights'], traits: ['culture', 'food', 'hidden'],
        photo: PHOTO('1528127269322-539801943592'), grad: 'linear-gradient(160deg, #8A6A1E, #3d2e0d)',
        price: 47000, nights: '5N · Hanoi + Hoi An',
        days: [
          { label: 'Day 1 — Hanoi', date: 'Mon 13 Apr', stops: [
            st('09:00', 'Old Quarter walking tour', 'culture', tr('walk', 10)),
            st('13:00', 'Bun cha at Huong Lien', 'food', tr('walk', 12)),
            st('19:00', 'Train street egg coffee', 'food'),
          ]},
          { label: 'Day 2 — Hoi An', date: 'Tue 14 Apr', stops: [
            st('10:00', 'Ancient town + lantern quarter', 'culture', tr('walk', 8)),
            st('18:30', 'Riverside night market dinner', 'food'),
          ]},
        ],
      },
      {
        id: 'v2', destName: 'Vietnam', title: 'Northern Vietnam loop', tag: 'Adventure north',
        tags: ['Adventure north', 'mountains'], traits: ['adventure', 'nature', 'packed'],
        photo: PHOTO('1470240731273-7821a6eeb6bd'), grad: 'linear-gradient(160deg, #2E5D3E, #14361f)',
        price: 51000, nights: '5N · Ha Giang + Ha Long',
        days: [
          { label: 'Day 1 — Ha Giang', date: 'Mon 13 Apr', stops: [
            st('08:00', 'Ha Giang loop by motorbike', 'nature', tr('car', 30)),
            st('16:00', 'Ma Pi Leng pass viewpoint', 'nature'),
          ]},
          { label: 'Day 2 — Ha Long', date: 'Tue 14 Apr', stops: [
            st('09:30', 'Kayaking through Luon cave', 'nature', tr('walk', 10)),
            st('14:00', 'Ti Top island summit climb', 'nature'),
          ]},
        ],
      },
    ],
  },
]

// Flat list of every itinerary, each tagged with its destination key.
export const ALL_ITINERARIES = DESTINATIONS.flatMap((d) =>
  d.itineraries.map((it) => ({ ...it, dest: d.key })),
)

export function getDestination(key) {
  return DESTINATIONS.find((d) => d.key === key)
}

export function getItinerary(destKey, id) {
  return getDestination(destKey)?.itineraries.find((it) => it.id === id)
}

// How well an itinerary matches the cards the user swiped right on.
export function matchScore(itinerary, likes) {
  return itinerary.traits.filter((t) => likes.includes(t)).length
}

export function sortByMatch(itineraries, likes) {
  return [...itineraries].sort((a, b) => matchScore(b, likes) - matchScore(a, likes))
}
