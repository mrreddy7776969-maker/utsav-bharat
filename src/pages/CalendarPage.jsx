import React, { useState } from 'react'
import festivalsData from '../data/festivals.json'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getDaysUntil(dateStr) {
  try {
    const target = new Date(dateStr + ', 2025')
    const now = new Date()
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24))
    return diff
  } catch { return null }
}

export default function CalendarPage({ navigate }) {
  const [activeMonth, setActiveMonth] = useState(null)

  const byMonth = MONTHS.map((m, i) => ({
    name: m,
    num: i + 1,
    festivals: festivalsData.filter(f => f.month === m),
  }))

  const upcoming = [...festivalsData]
    .map(f => ({ ...f, daysLeft: getDaysUntil(f.date) }))
    .filter(f => f.daysLeft !== null && f.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5)

  const filtered = activeMonth ? byMonth.find(m => m.name === activeMonth)?.festivals || [] : festivalsData

  return (
    <div className="min-h-screen bg-[#FFF8F0] dark:bg-gray-950 pt-24 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-5">
            📅 Festival Calendar 2025
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Year of <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Celebrations</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Every month is a festival in India.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar grid */}
          <div className="lg:col-span-2">
            {/* Month pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveMonth(null)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!activeMonth ? 'text-white shadow-md' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-orange-100 dark:border-orange-900/20 hover:border-orange-300'}`}
                style={!activeMonth ? { background: 'linear-gradient(135deg, #FF6B35, #FF006E)' } : {}}
              >
                All Months
              </button>
              {MONTHS.map(m => {
                const count = festivalsData.filter(f => f.month === m).length
                if (!count) return null
                return (
                  <button key={m}
                    onClick={() => setActiveMonth(activeMonth === m ? null : m)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${activeMonth === m ? 'text-white shadow-md' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-orange-100 dark:border-orange-900/20 hover:border-orange-300'}`}
                    style={activeMonth === m ? { background: 'linear-gradient(135deg, #FF6B35, #FF006E)' } : {}}>
                    {m.slice(0, 3)}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeMonth === m ? 'bg-white/20 text-white' : 'bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400'}`}>{count}</span>
                  </button>
                )
              })}
            </div>

            {/* Festival list */}
            <div className="space-y-4">
              {filtered.map(f => {
                const days = getDaysUntil(f.date)
                return (
                  <div key={f.id}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-orange-100 dark:border-orange-900/20 shadow-sm flex hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
                    onClick={() => navigate('festival', f)}>
                    <div className="w-3 flex-shrink-0" style={{ background: f.color || '#FF6B35' }} />
                    <img src={f.image} alt={f.name} className="w-24 h-24 object-cover flex-shrink-0"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=60' }} />
                    <div className="p-4 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{f.name}</h3>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{f.subtitle}</div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <div className="text-sm font-bold text-orange-600 dark:text-orange-400">{f.date}</div>
                          <div className="text-xs text-gray-400">{f.duration}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs text-gray-500 dark:text-gray-400">📍 {f.state}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">🙏 {f.religion}</span>
                        {f.trending && <span className="text-xs bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full font-bold">🔥 Trending</span>}
                        {days !== null && days >= 0 && days <= 90 && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${days <= 7 ? 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400' : days <= 30 ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'}`}>
                            {days === 0 ? '🎉 Today!' : `${days}d away`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar: Countdown */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
              <h3 className="font-black text-gray-900 dark:text-white mb-5 text-lg">⏰ Coming Soon</h3>
              <div className="space-y-4">
                {upcoming.map(f => (
                  <div key={f.id} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('festival', f)}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-center flex-shrink-0 leading-tight"
                      style={{ background: f.color || 'linear-gradient(135deg, #FF6B35, #FF006E)' }}>
                      <div>
                        <div className="text-lg leading-none">{f.daysLeft}</div>
                        <div className="text-[8px] uppercase tracking-wide opacity-80">days</div>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900 dark:text-white leading-tight">{f.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{f.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Month breakdown */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
              <h3 className="font-black text-gray-900 dark:text-white mb-5 text-lg">📊 Festivals by Month</h3>
              <div className="space-y-2">
                {byMonth.filter(m => m.festivals.length > 0).map(m => (
                  <button key={m.name} onClick={() => setActiveMonth(activeMonth === m.name ? null : m.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${activeMonth === m.name ? 'bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800' : 'hover:bg-orange-50 dark:hover:bg-orange-950/20'}`}>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{m.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-rose-400" style={{ width: `${m.festivals.length * 16}px`, maxWidth: '80px' }} />
                      <span className="text-xs font-bold text-orange-600 dark:text-orange-400">{m.festivals.length}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}