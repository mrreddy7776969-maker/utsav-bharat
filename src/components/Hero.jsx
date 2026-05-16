import React, { useEffect, useRef } from 'react'

const FLOATING_ITEMS = ['🪔','🌸','🎉','🪄','🌺','✨','🎊','🌼','🪷','🎆']

const Hero = ({ navigate }) => {
  const particleRef = useRef(null)

  useEffect(() => {
    const container = particleRef.current
    if (!container) return
    const items = []
    for (let i = 0; i < 14; i++) {
      const el = document.createElement('div')
      el.textContent = FLOATING_ITEMS[i % FLOATING_ITEMS.length]
      el.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 14}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.4 + 0.15};
        animation: float ${Math.random() * 5 + 5}s ease-in-out ${Math.random() * 4}s infinite;
        pointer-events: none;
        user-select: none;
      `
      container.appendChild(el)
      items.push(el)
    }
    return () => items.forEach(el => el.remove())
  }, [])

  const stats = [
    { value: '28', label: 'States', icon: '🗺️', color: 'from-orange-500 to-amber-500' },
    { value: '1000+', label: 'Festivals', icon: '🎊', color: 'from-rose-500 to-pink-500' },
    { value: '365', label: 'Days of Joy', icon: '📅', color: 'from-purple-500 to-violet-500' },
    { value: '50M+', label: 'Celebrants', icon: '🧡', color: 'from-emerald-500 to-teal-500' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Background mandala */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] opacity-[0.07] animate-spin-slow">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[...Array(12)].map((_, i) => (
              <g key={i} transform={`rotate(${i * 30} 200 200)`}>
                <ellipse cx="200" cy="80" rx="18" ry="60" fill="#FF6B35"/>
                <ellipse cx="200" cy="80" rx="8" ry="40" fill="#FF006E"/>
                <circle cx="200" cy="50" r="10" fill="#FFB347"/>
              </g>
            ))}
            <circle cx="200" cy="200" r="30" fill="#FF6B35" opacity="0.5"/>
          </svg>
        </div>

        {/* Left gradient blob */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
          style={{background: 'radial-gradient(circle, #FF6B35, transparent 70%)'}}></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{backgroundImage: 'radial-gradient(#FF6B35 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

        {/* Floating particles */}
        <div ref={particleRef} className="absolute inset-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg border border-orange-100 dark:border-orange-900/30 mb-8"
              style={{animation: 'reveal-up 0.6s ease-out both'}}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Explore 1000+ Indian Festivals</span>
            </div>

            {/* Headline */}
            <h1 className="mb-6" style={{fontFamily: "'Playfair Display', serif", animation: 'reveal-up 0.7s 0.1s ease-out both', opacity: 0}}>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] text-gray-900 dark:text-white">
                Discover the
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mt-2">
                <span className="shimmer-text">Soul of India</span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-lg"
              style={{animation: 'reveal-up 0.7s 0.2s ease-out both', opacity: 0}}>
              From Diwali's golden glow to Holi's vibrant burst — journey through <strong className="text-orange-600">28 states</strong>, explore ancient traditions, and plan your perfect festival trip.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12"
              style={{animation: 'reveal-up 0.7s 0.3s ease-out both', opacity: 0}}>
              <button
                onClick={() => navigate('home')}
                className="group relative px-8 py-4 font-bold text-white rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-300/50 text-base overflow-hidden"
                style={{background: 'linear-gradient(135deg, #FF6B35 0%, #FF006E 100%)'}}>
                <span className="relative z-10 flex items-center gap-2">
                  🎪 Explore Festivals
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>

              <button
                onClick={() => navigate('planner')}
                className="px-8 py-4 font-bold rounded-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-orange-200 dark:border-orange-800 hover:border-orange-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-base">
                🗺️ Plan a Trip
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              style={{animation: 'reveal-up 0.7s 0.4s ease-out both', opacity: 0}}>
              {stats.map((stat, i) => (
                <div key={i} className="relative p-4 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-orange-100/60 dark:border-orange-900/30 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5">
                    {stat.icon} {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual showcase */}
          <div className="hidden lg:block relative" style={{animation: 'slide-in-right 0.8s 0.2s ease-out both', opacity: 0}}>
            {/* Main card */}
            <div className="relative">
              {/* Big image */}
              <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(255,107,53,0.25)] border-2 border-white/60">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=80"
                  alt="Diwali Festival"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-white/80 text-xs font-medium uppercase tracking-wider mb-1">Featured Festival</div>
                      <div className="text-white text-2xl font-black" style={{fontFamily: "'Playfair Display', serif"}}>
                        Diwali 2025
                      </div>
                      <div className="text-orange-200 text-sm">October 20 · Pan India</div>
                    </div>
                    <button
                      onClick={() => navigate('home')}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white/90 rounded-xl text-orange-600 text-sm font-bold hover:bg-white transition-all hover:scale-105">
                      View ✨
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating card: Top left */}
              <div className="absolute -top-6 -left-8 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-orange-100 dark:border-orange-900/30 animate-float w-44">
                <div className="text-2xl mb-1">🎨</div>
                <div className="font-bold text-sm text-gray-900 dark:text-white">Holi Colors</div>
                <div className="text-xs text-gray-500">Mar 14, 2025</div>
                <div className="mt-2 flex gap-1">
                  {['bg-rose-400','bg-blue-400','bg-emerald-400','bg-purple-400'].map((c,i) => (
                    <div key={i} className={`w-4 h-4 rounded-full ${c}`}></div>
                  ))}
                </div>
              </div>

              {/* Floating card: Bottom right */}
              <div className="absolute -bottom-6 -right-8 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-orange-100 dark:border-orange-900/30 animate-float-reverse w-52">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🥁</div>
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-white">Durga Puja</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="text-amber-500">★★★★★</span> 4.9
                    </div>
                    <div className="text-xs text-emerald-600 font-medium mt-0.5">West Bengal</div>
                  </div>
                </div>
              </div>

              {/* Live indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500 rounded-full text-white text-xs font-bold shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                Live Updates
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60 animate-bounce">
          <span className="text-xs font-medium text-gray-500 tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero