import React, { useState } from 'react'

const SUGGESTIONS = ['Diwali', 'Holi', 'Navratri', 'Durga Puja', 'Onam', 'Pongal', 'Ganesh Chaturthi', 'Baisakhi', 'Bihu', 'Pushkar', 'Eid', 'Christmas']

const SearchBar = ({ onSearch, onFilter, activeFilter, activeMonth, activeReligion }) => {
  const [term, setTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const seasons = ['All', 'Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter']
  const months = ['All', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const religions = ['All', 'Hindu', 'Islamic', 'Sikh', 'Christian', 'Multi-faith']

  const filtered = SUGGESTIONS.filter(s => term && s.toLowerCase().includes(term.toLowerCase()))

  const handleSearch = (val) => {
    setTerm(val)
    onSearch(val)
    setShowSuggestions(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Search Input */}
      <div className="relative mb-8">
        <div className="relative">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-orange-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
            </svg>
          </div>
          <input
            type="text"
            value={term}
            onChange={e => { setTerm(e.target.value); onSearch(e.target.value); setShowSuggestions(true) }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="Search festivals, states, traditions..."
            className="w-full pl-14 pr-14 py-5 text-base rounded-2xl border-2 border-orange-100 focus:border-orange-400 focus:outline-none bg-white/90 dark:bg-gray-900/90 dark:border-orange-900/40 dark:text-white shadow-lg focus:shadow-xl transition-all placeholder-gray-400"
          />
          {term && (
            <button onClick={() => handleSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900/30 rounded-2xl shadow-2xl z-40 overflow-hidden">
            {filtered.map(s => (
              <button
                key={s}
                onMouseDown={() => handleSearch(s)}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-left transition-colors"
              >
                <span className="text-orange-400">🎪</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Season filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">Season</span>
          {seasons.map(s => (
            <button
              key={s}
              onClick={() => onFilter('season', s === 'All' ? '' : s)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                (s === 'All' && !activeFilter) || activeFilter === s
                  ? 'text-white shadow-md'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-orange-100 dark:border-orange-900/30 hover:border-orange-300'
              }`}
              style={(s === 'All' && !activeFilter) || activeFilter === s
                ? {background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}
                : {}}
            >
              {s === 'Spring' ? '🌸' : s === 'Summer' ? '☀️' : s === 'Monsoon' ? '🌧️' : s === 'Autumn' ? '🍂' : s === 'Winter' ? '❄️' : '🎪'} {s}
            </button>
          ))}
        </div>

        {/* Month filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">Month</span>
          {months.map(m => (
            <button
              key={m}
              onClick={() => onFilter('month', m === 'All' ? '' : m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                (m === 'All' && !activeMonth) || activeMonth === m
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-orange-100 dark:border-orange-900/30 hover:border-amber-300 hover:text-amber-600'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Religion filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">Religion</span>
          {religions.map(r => (
            <button
              key={r}
              onClick={() => onFilter('religion', r === 'All' ? '' : r)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                (r === 'All' && !activeReligion) || activeReligion === r
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-orange-100 dark:border-orange-900/30 hover:border-violet-300 hover:text-violet-600'
              }`}
            >
              {r === 'Hindu' ? '🕉️' : r === 'Islamic' ? '☪️' : r === 'Sikh' ? '☬' : r === 'Christian' ? '✝️' : r === 'Multi-faith' ? '🌈' : '🙏'} {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchBar