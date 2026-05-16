import React, { useEffect } from 'react'

const FestivalModal = ({ festival, onClose, navigate }) => {
  useEffect(() => {
    if (festival) {
      document.body.classList.add('modal-open')
      const onKey = (e) => { if (e.key === 'Escape') onClose() }
      window.addEventListener('keydown', onKey)
      return () => { document.body.classList.remove('modal-open'); window.removeEventListener('keydown', onKey) }
    }
  }, [festival, onClose])

  if (!festival) return null

  const highlights = festival.highlights || []

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"/>

      {/* Modal */}
      <div
        className="relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-950 sm:rounded-3xl rounded-t-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] border border-orange-100/30 dark:border-orange-900/20"
        onClick={e => e.stopPropagation()}
        style={{animation: 'reveal-up 0.4s ease-out'}}
      >
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden sm:rounded-t-3xl rounded-t-3xl">
          <img
            src={festival.image}
            alt={festival.name}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          {/* Festival title overlay */}
          <div className="absolute bottom-6 left-6 right-16">
            <div className="flex flex-wrap gap-2 mb-3">
              {festival.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight" style={{fontFamily: "'Playfair Display', serif"}}>
              {festival.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-white/80 text-sm">
              <span className="flex items-center gap-1">📍 {festival.state}</span>
              <span>·</span>
              <span className="flex items-center gap-1">📅 {festival.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">⏱ {festival.duration}</span>
              <span>·</span>
              <span className="flex items-center gap-1">⭐ {festival.rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { icon: '🗺️', label: 'Region', value: festival.region },
              { icon: '🌤️', label: 'Season', value: festival.season },
              { icon: '🙏', label: 'Religion', value: festival.religion },
              { icon: '👥', label: 'Visitors', value: festival.visitors },
            ].map(s => (
              <div key={s.label} className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-0.5">{s.label}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            {/* Left column */}
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3" style={{fontFamily: "'Playfair Display', serif"}}>About</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5">{festival.description}</p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-100 dark:border-orange-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Significance</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 pl-4">{festival.significance}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-100 dark:border-rose-900/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0"></span>
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Rituals & Traditions</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 pl-4">{festival.rituals}</p>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3" style={{fontFamily: "'Playfair Display', serif"}}>Experience</h3>

              {/* Food & Attire */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/20 text-center">
                  <div className="text-3xl mb-2">🍽️</div>
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Festival Food</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{festival.food}</div>
                </div>
                <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/20 text-center">
                  <div className="text-3xl mb-2">👗</div>
                  <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Traditional Attire</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{festival.attire}</div>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/20 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📍</span>
                  <span className="font-bold text-sm text-gray-800 dark:text-gray-200">Best Places to Experience</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{festival.location}</p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div>
                  <div className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-2">✨ Highlights</div>
                  <div className="space-y-2">
                    {highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-orange-400 text-lg">›</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking section */}
          <div className="border-t border-orange-100 dark:border-orange-900/20 pt-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-4">Plan Your Visit</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={festival.bookingUrl || 'https://tourism.gov.in'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 py-4 px-5 rounded-2xl font-bold text-white text-sm shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}
              >
                🎟️ Festival Pass
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
              <a
                href="https://tourism.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 px-5 rounded-2xl font-bold text-sm bg-white dark:bg-gray-900 border-2 border-orange-200 dark:border-orange-800 text-gray-800 dark:text-gray-200 hover:border-orange-400 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                🏨 Tourism Package
              </a>
              <button
                onClick={() => { onClose(); navigate('planner') }}
                className="flex items-center justify-center gap-2 py-4 px-5 rounded-2xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                🗺️ Plan Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FestivalModal