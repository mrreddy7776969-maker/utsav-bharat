import React, { useState } from 'react'
import Hero from '../components/Hero'
import FestivalGrid from '../components/FestivalGrid'
import FestivalMap from '../components/FestivalMap'
import FestivalModal from '../components/FestivalModal'
import festivalsData from '../data/festivals.json'

const AIRecommend = ({ navigate }) => {
  const [interests, setInterests] = useState([])
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const options = ['Music & Dance', 'Food & Cuisine', 'Spiritual', 'Adventure', 'History', 'Nature', 'Art & Crafts']

  const toggle = (opt) =>
    setInterests(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt])

  const recommend = () => {
    if (!interests.length) return
    setLoading(true)
    setTimeout(() => {
      const scored = festivalsData.map(f => {
        let score = 0
        if (interests.includes('Music & Dance') && (f.tags.some(t => ['Garba', 'Dance', 'Music'].includes(t)) || f.rituals?.toLowerCase().includes('danc'))) score += 3
        if (interests.includes('Spiritual') && ['Hindu', 'Sikh', 'Islamic', 'Christian'].includes(f.religion)) score += 2
        if (interests.includes('Food & Cuisine')) score += 1
        if (interests.includes('History') && f.history?.length > 100) score += 2
        if (interests.includes('Art & Crafts') && f.tags.some(t => ['Art', 'Pandal', 'Heritage'].includes(t))) score += 3
        if (interests.includes('Adventure') && f.tags.some(t => ['Camel', 'Boats'].includes(t))) score += 3
        if (interests.includes('Nature') && ['Kerala', 'Goa'].includes(f.state)) score += 2
        return { ...f, score }
      }).sort((a, b) => b.score - a.score).slice(0, 3)
      setResult(scored)
      setLoading(false)
    }, 1200)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-violet-950 via-purple-950 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-800/60 text-violet-200 text-sm font-semibold mb-6">
          ✨ AI-Powered Recommendations
        </div>
        <h2 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Find Your <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Perfect Festival</span>
        </h2>
        <p className="text-violet-300 mb-10">Tell us your interests and we'll match you with the ideal festival.</p>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                interests.includes(opt)
                  ? 'text-white scale-105 shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/20'
              }`}
              style={interests.includes(opt) ? { background: 'linear-gradient(135deg, #FF6B35, #FF006E)' } : {}}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={recommend}
          disabled={!interests.length || loading}
          className="px-10 py-4 rounded-2xl font-bold text-white text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1 shadow-xl mb-10"
          style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }}
        >
          {loading ? '🔮 Finding matches...' : '✨ Get Recommendations'}
        </button>

        {result && (
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {result.map((f, i) => (
              <div key={f.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all">
                <img src={f.image} alt={f.name} className="w-full h-32 object-cover opacity-80" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=60' }} />
                <div className="p-4">
                  <div className="text-xs text-violet-300 font-bold mb-1">#{i + 1} Match</div>
                  <div className="text-white font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>{f.name}</div>
                  <div className="text-violet-300 text-xs mt-1">📍 {f.state} · {f.month}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const FeatureStrip = ({ navigate }) => {
  const features = [
    { icon: '🗺️', title: 'Interactive Map', desc: 'Click any state to explore its festivals', page: 'home' },
    { icon: '📅', title: 'Festival Calendar', desc: 'Track upcoming celebrations by month', page: 'calendar' },
    { icon: '🧳', title: 'Trip Planner', desc: 'Plan the perfect festival travel itinerary', page: 'planner' },
    { icon: '🧠', title: 'Cultural Quiz', desc: 'Test your knowledge of Indian festivals', page: 'quiz' },
  ]
  return (
    <section className="py-16 bg-white dark:bg-gray-900 border-y border-orange-100 dark:border-orange-900/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(f => (
            <button key={f.title} onClick={() => navigate(f.page)}
              className="p-6 rounded-2xl bg-orange-50 dark:bg-gray-800 hover:bg-orange-100 dark:hover:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20 text-left group transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{f.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home({ navigate }) {
  const [selectedFestival, setSelectedFestival] = useState(null)

  const handleViewFull = (festival) => {
    setSelectedFestival(null)
    navigate('festival', festival)
  }

  return (
    <div className="page-enter">
      <Hero navigate={navigate} />
      <FeatureStrip navigate={navigate} />
      <FestivalGrid festivals={festivalsData} setSelectedFestival={setSelectedFestival} />
      <FestivalMap festivals={festivalsData} setSelectedFestival={setSelectedFestival} />
      <AIRecommend navigate={navigate} />

      {selectedFestival && (
        <FestivalModal
          festival={selectedFestival}
          onClose={() => setSelectedFestival(null)}
          navigate={navigate}
        />
      )}
    </div>
  )
}