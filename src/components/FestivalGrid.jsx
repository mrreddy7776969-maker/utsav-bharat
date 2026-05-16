import React, { useState } from 'react'
import FestivalCard from './FestivalCard'
import SearchBar from './SearchBar'

const FestivalGrid = ({ festivals, setSelectedFestival }) => {
  const [search, setSearch] = useState('')
  const [filterSeason, setFilterSeason] = useState('')
  const [filterMonth, setFilterMonth] = useState('')
  const [filterReligion, setFilterReligion] = useState('')
  const [showAll, setShowAll] = useState(false)

  const handleFilter = (type, val) => {
    if (type === 'season') setFilterSeason(val)
    if (type === 'month') setFilterMonth(val)
    if (type === 'religion') setFilterReligion(val)
  }

  const filtered = festivals.filter(f => {
    const q = search.toLowerCase()
    const matchSearch = !search ||
      f.name.toLowerCase().includes(q) ||
      f.state.toLowerCase().includes(q) ||
      f.region.toLowerCase().includes(q) ||
      f.tags.some(t => t.toLowerCase().includes(q)) ||
      f.description.toLowerCase().includes(q)
    const matchSeason = !filterSeason || f.season === filterSeason
    const matchMonth = !filterMonth || f.month === filterMonth
    const matchReligion = !filterReligion || f.religion === filterReligion
    return matchSearch && matchSeason && matchMonth && matchReligion
  })

  const visible = showAll ? filtered : filtered.slice(0, 8)
  const trending = festivals.filter(f => f.trending)

  return (
    <section className="py-20 bg-gradient-to-b from-orange-50/50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-5">
            🎪 Festival Directory
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
            Find Your <span className="gradient-text">Perfect Festival</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Filter by season, month, or religion to discover India's incredible diversity of celebrations
          </p>
        </div>

        {/* Trending strip */}
        <div className="mb-12 overflow-x-auto scrollbar-hide pb-2">
          <div className="flex gap-3 min-w-max px-1">
            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 self-center mr-2 flex-shrink-0">🔥 Trending:</span>
            {trending.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFestival(f)}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900/30 rounded-2xl shadow-sm hover:border-orange-400 hover:shadow-md transition-all hover:-translate-y-0.5 flex-shrink-0"
              >
                <img src={f.image} alt={f.name} className="w-7 h-7 rounded-lg object-cover"/>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{f.name}</span>
                <span className="text-xs text-orange-500 font-medium">{f.state}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-10">
          <SearchBar
            onSearch={setSearch}
            onFilter={handleFilter}
            activeFilter={filterSeason}
            activeMonth={filterMonth}
            activeReligion={filterReligion}
          />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Showing <span className="text-orange-600 font-bold">{visible.length}</span> of <span className="font-bold">{filtered.length}</span> festivals
          </p>
          {(search || filterSeason || filterMonth || filterReligion) && (
            <button
              onClick={() => { setSearch(''); setFilterSeason(''); setFilterMonth(''); setFilterReligion('') }}
              className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1 hover:underline"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No festivals found</h3>
            <p className="text-gray-500">Try different search terms or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visible.map((festival, i) => (
              <div key={festival.id} style={{animationDelay: `${i * 60}ms`}} className="animate-reveal-up">
                <FestivalCard festival={festival} onClick={() => setSelectedFestival(festival)} />
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filtered.length > 8 && (
          <div className="text-center mt-14">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-10 py-4 font-bold rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 text-base"
              style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}
            >
              {showAll ? '⬆ Show Less' : `Show All ${filtered.length} Festivals 🎪`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default FestivalGrid