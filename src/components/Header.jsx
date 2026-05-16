import React, { useState, useEffect } from 'react'

const Header = ({ navigate, currentPage, darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Home', page: 'home', icon: '🏠' },
    { label: 'Calendar', page: 'calendar', icon: '📅' },
    { label: 'Trip Planner', page: 'planner', icon: '🗺️' },
    { label: 'Quiz', page: 'quiz', icon: '🎮' },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate('home', { search: searchTerm })
      setSearchTerm('')
      setSearchOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(255,107,53,0.12)] border-b border-orange-100/50 dark:border-orange-900/30'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl shadow-lg group-hover:shadow-orange-300/60 transition-all duration-300 group-hover:scale-110 flex items-center justify-center text-2xl">
                🪔
              </div>
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-black" style={{fontFamily: "'Playfair Display', serif"}}>
                <span className="text-orange-600">Utsav</span>
                <span className="text-rose-600"> Bharat</span>
              </span>
              <span className="block text-[10px] font-medium tracking-widest text-amber-600/80 uppercase">
                Festival Discovery
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                  currentPage === item.page
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/50'
                    : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 hover:bg-orange-50/70 dark:hover:bg-orange-950/30'
                }`}
              >
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"></span>
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    autoFocus
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search festivals..."
                    className="w-56 pl-4 pr-10 py-2.5 text-sm bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                    onBlur={() => { if (!searchTerm) setSearchOpen(false) }}
                  />
                  <button type="submit" className="absolute right-3 text-orange-400 hover:text-orange-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                  </svg>
                </button>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 transition-all"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Login Button */}
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 hover:shadow-orange-300/50 hover:-translate-y-0.5"
              style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Login
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-orange-50 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-orange-100 dark:border-orange-900/30 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search festivals..."
                className="flex-1 px-4 py-2.5 text-sm bg-orange-50 dark:bg-gray-900 border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button type="submit" className="p-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
              </button>
            </form>

            {navItems.map(item => (
              <button
                key={item.page}
                onClick={() => { navigate(item.page); setIsMenuOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                  currentPage === item.page
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}

            <button className="w-full mt-2 py-3 px-4 rounded-xl text-white font-semibold"
              style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}>
              Login / Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header