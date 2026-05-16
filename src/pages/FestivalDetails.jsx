import React, { useState } from 'react'
import festivalsData from '../data/festivals.json'

export default function FestivalDetails({ festival, navigate }) {
  const [bookmarked, setBookmarked] = useState(false)

  if (!festival) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-orange-50 dark:bg-gray-950">
        <div className="text-6xl">🎪</div>
        <h2 className="text-2xl font-bold text-gray-700 dark:text-white">No festival selected</h2>
        <button onClick={() => navigate('home')} className="btn-primary">← Back to Festivals</button>
      </div>
    )
  }

  const related = festivalsData.filter(f => f.id !== festival.id && (f.season === festival.season || f.region === festival.region)).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#FFF8F0] dark:bg-gray-950 page-enter">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate('home')}
          className="absolute top-24 left-6 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-xl hover:bg-black/70 transition-all font-medium text-sm"
        >
          ← Back
        </button>

        {/* Bookmark */}
        <button
          onClick={() => setBookmarked(b => !b)}
          className="absolute top-24 right-6 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-black/70 transition-all"
          title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          {bookmarked ? '❤️' : '🤍'}
        </button>

        <div className="absolute bottom-8 left-6 right-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {festival.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {festival.name}
          </h1>
          <p className="text-white/80 text-lg">{festival.subtitle}</p>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-white/70 text-sm">
            <span>📍 {festival.state}</span>
            <span>📅 {festival.date}</span>
            <span>⏱ {festival.duration}</span>
            <span>⭐ {festival.rating} · {festival.visitors} visitors/year</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Quick stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: '🗺️', label: 'Region', value: festival.region },
                { icon: '🌤️', label: 'Season', value: festival.season },
                { icon: '🙏', label: 'Religion', value: festival.religion },
                { icon: '👥', label: 'Visitors', value: festival.visitors },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900/20 shadow-sm text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-0.5">{s.label}</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</div>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-orange-100 dark:border-orange-900/20 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>About</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mb-6">{festival.description}</p>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">History & Origin</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{festival.history}</p>
            </div>

            {/* Significance & Rituals */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 rounded-2xl p-6 border border-orange-100 dark:border-orange-900/20">
                <div className="text-2xl mb-3">🌟</div>
                <h3 className="font-black text-gray-900 dark:text-white mb-2">Significance</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{festival.significance}</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/20">
                <div className="text-2xl mb-3">🪄</div>
                <h3 className="font-black text-gray-900 dark:text-white mb-2">Rituals & Traditions</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{festival.rituals}</p>
              </div>
            </div>

            {/* Highlights */}
            {festival.highlights?.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-orange-100 dark:border-orange-900/20 shadow-sm">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>✨ Highlights</h2>
                <div className="space-y-3">
                  {festival.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/20">
                      <span className="text-orange-500 text-xl mt-0.5 flex-shrink-0">›</span>
                      <span className="text-gray-700 dark:text-gray-300">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun fact */}
            {festival.funFact && (
              <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }}>
                <div className="text-3xl mb-3">🤩</div>
                <h3 className="font-black text-lg mb-2">Did You Know?</h3>
                <p className="text-white/90 leading-relaxed">{festival.funFact}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Food & Attire */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
              <h3 className="font-black text-gray-900 dark:text-white mb-4 text-lg">Culture & Cuisine</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/20">
                  <div className="flex items-center gap-2 mb-1"><span className="text-xl">🍽️</span><span className="font-bold text-sm text-gray-800 dark:text-gray-200">Festival Food</span></div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm pl-8">{festival.food}</p>
                </div>
                <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/20">
                  <div className="flex items-center gap-2 mb-1"><span className="text-xl">👗</span><span className="font-bold text-sm text-gray-800 dark:text-gray-200">Traditional Attire</span></div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm pl-8">{festival.attire}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/20">
                  <div className="flex items-center gap-2 mb-1"><span className="text-xl">📍</span><span className="font-bold text-sm text-gray-800 dark:text-gray-200">Best Locations</span></div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm pl-8">{festival.location}</p>
                </div>
              </div>
            </div>

            {/* Booking */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
              <h3 className="font-black text-gray-900 dark:text-white mb-4 text-lg">Plan Your Visit</h3>
              <div className="space-y-3">
                <a href={festival.bookingUrl || 'https://www.incredibleindia.org'} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                  style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }}>
                  🎟️ Book Festival Pass
                </a>
                <a href="https://www.incredibleindia.org" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  🏨 Tourism Package
                </a>
                <button onClick={() => navigate('planner')}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  🗺️ Plan Trip
                </button>
              </div>
            </div>

            {/* Related festivals */}
            {related.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
                <h3 className="font-black text-gray-900 dark:text-white mb-4 text-lg">Similar Festivals</h3>
                <div className="space-y-3">
                  {related.map(f => (
                    <button key={f.id} onClick={() => navigate('festival', f)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors text-left">
                      <img src={f.image} alt={f.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&q=60' }} />
                      <div>
                        <div className="font-bold text-sm text-gray-900 dark:text-white">{f.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{f.state} · {f.month}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}