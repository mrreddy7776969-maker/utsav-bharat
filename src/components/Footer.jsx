import React from 'react'

const Footer = ({ navigate }) => {
  const links = {
    'Explore': [
      { label: 'All Festivals', page: 'home' },
      { label: 'Festival Calendar', page: 'calendar' },
      { label: 'Trip Planner', page: 'planner' },
      { label: 'Quiz & Games', page: 'quiz' },
    ],
    'Regions': [
      { label: 'North India', page: 'home' },
      { label: 'South India', page: 'home' },
      { label: 'East India', page: 'home' },
      { label: 'West India', page: 'home' },
    ],
    'Help': [
      { label: 'About Us', page: 'home' },
      { label: 'Contact', page: 'home' },
      { label: 'Privacy Policy', page: 'home' },
      { label: 'Terms of Use', page: 'home' },
    ],
  }

  const socials = [
    { icon: '📸', label: 'Instagram', href: '#' },
    { icon: '🐦', label: 'Twitter', href: '#' },
    { icon: '📘', label: 'Facebook', href: '#' },
    { icon: '▶️', label: 'YouTube', href: '#' },
  ]

  return (
    <footer className="bg-gray-950 dark:bg-black text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => navigate('home')} className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}>
                🪔
              </div>
              <div>
                <span className="block text-xl font-black" style={{fontFamily: "'Playfair Display', serif"}}>
                  <span className="text-orange-400">Utsav</span>
                  <span className="text-rose-400"> Bharat</span>
                </span>
                <span className="block text-xs font-medium text-gray-500 tracking-widest uppercase">Festival Discovery</span>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your gateway to India's incredible tapestry of festivals, traditions, and cultural celebrations across 28 states and 1000+ festivals.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-orange-600 flex items-center justify-center text-lg transition-all hover:scale-110 hover:-translate-y-0.5">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-sm font-black uppercase tracking-widest text-orange-400 mb-5">{section}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.label}>
                    <button
                      onClick={() => navigate(item.page)}
                      className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all text-orange-400">›</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="rounded-3xl p-8 mb-12" style={{background: 'linear-gradient(135deg, rgba(255,107,53,0.15), rgba(255,0,110,0.15))', border: '1px solid rgba(255,107,53,0.2)'}}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black mb-1" style={{fontFamily: "'Playfair Display', serif"}}>
                Never miss a festival 🎊
              </h3>
              <p className="text-gray-400 text-sm">Get updates about upcoming festivals and cultural events.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 sm:w-64 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-orange-500 placeholder-gray-500"
              />
              <button className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800 text-sm text-gray-500">
          <p>© 2025 Utsav Bharat. Made with 🧡 for India's cultural heritage.</p>
          <div className="flex items-center gap-2">
            <span>🇮🇳</span>
            <span>Celebrating the diversity of Incredible India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer