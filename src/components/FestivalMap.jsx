import React, { useState } from 'react'

const STATE_DATA = [
  { id: 'rajasthan', name: 'Rajasthan', festivals: ['Pushkar Camel Fair', 'Teej', 'Gangaur'], cx: 155, cy: 190, r: 52, color: '#FF6B35', emoji: '🐪' },
  { id: 'maharashtra', name: 'Maharashtra', festivals: ['Ganesh Chaturthi', 'Gudi Padwa', 'Lavani'], cx: 175, cy: 295, r: 44, color: '#FF006E', emoji: '🐘' },
  { id: 'westbengal', name: 'West Bengal', festivals: ['Durga Puja', 'Dol Jatra', 'Poush Mela'], cx: 315, cy: 235, r: 34, color: '#FFB347', emoji: '🥁' },
  { id: 'gujarat', name: 'Gujarat', festivals: ['Navratri', 'Uttarayan', 'Rann Utsav'], cx: 135, cy: 248, r: 38, color: '#7B2D8B', emoji: '💃' },
  { id: 'punjab', name: 'Punjab', festivals: ['Baisakhi', 'Lohri', 'Hola Mohalla'], cx: 170, cy: 130, r: 28, color: '#0077B6', emoji: '🌾' },
  { id: 'kerala', name: 'Kerala', festivals: ['Onam', 'Thrissur Pooram', 'Vishu'], cx: 198, cy: 430, r: 26, color: '#2D9B5D', emoji: '🐘' },
  { id: 'tamilnadu', name: 'Tamil Nadu', festivals: ['Pongal', 'Jallikattu', 'Karthigai Deepam'], cx: 230, cy: 415, r: 32, color: '#E85D04', emoji: '🐂' },
  { id: 'up', name: 'Uttar Pradesh', festivals: ['Holi', 'Kumbh Mela', 'Diwali'], cx: 228, cy: 195, r: 42, color: '#C9184A', emoji: '🎨' },
  { id: 'assam', name: 'Assam', festivals: ['Bihu', 'Ambubachi Mela', 'Rongali Bihu'], cx: 355, cy: 190, r: 28, color: '#0096C7', emoji: '🌿' },
  { id: 'goa', name: 'Goa', festivals: ['Carnival', 'Shigmo', 'Christmas'], cx: 154, cy: 330, r: 18, color: '#F72585', emoji: '🎭' },
  { id: 'odisha', name: 'Odisha', festivals: ['Rath Yatra', 'Durga Puja', 'Raja Festival'], cx: 285, cy: 285, r: 30, color: '#FFAA00', emoji: '⛪' },
  { id: 'mp', name: 'Madhya Pradesh', festivals: ['Khajuraho Dance', 'Tansen Music', 'Lokrang'], cx: 218, cy: 248, r: 36, color: '#6A0572', emoji: '🎵' },
]

const FestivalMap = ({ festivals, setSelectedFestival }) => {
  const [hoveredState, setHoveredState] = useState(null)
  const [activeState, setActiveState] = useState(null)

  const handleStateClick = (state) => {
    setActiveState(state)
    const match = festivals.find(f =>
      state.festivals.some(sf => f.name.toLowerCase().includes(sf.split(' ')[0].toLowerCase())) ||
      f.state.toLowerCase().includes(state.name.toLowerCase().split(' ')[0])
    )
    if (match) setSelectedFestival(match)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-orange-50/60 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-5">
            🗺️ Interactive Map
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4" style={{fontFamily: "'Playfair Display', serif"}}>
            Festivals <span className="gradient-text">By State</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Click on any state to explore its vibrant festivals and cultural traditions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* SVG Map */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 border-blue-100 dark:border-blue-900/30 shadow-2xl p-4">
              <svg viewBox="0 0 460 550" className="w-full max-h-[520px]" xmlns="http://www.w3.org/2000/svg">
                {/* Background ocean */}
                <defs>
                  <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#BAE6FD"/>
                    <stop offset="100%" stopColor="#7DD3FC"/>
                  </radialGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                  </filter>
                  {STATE_DATA.map(s => (
                    <radialGradient key={s.id} id={`grad-${s.id}`} cx="50%" cy="35%" r="65%">
                      <stop offset="0%" stopColor={s.color} stopOpacity="0.9"/>
                      <stop offset="100%" stopColor={s.color} stopOpacity="0.6"/>
                    </radialGradient>
                  ))}
                </defs>

                <rect width="460" height="550" fill="url(#oceanGrad)" rx="16"/>

                {/* India outline - simplified polygon */}
                <polygon
                  points="130,80 170,65 210,68 250,72 290,80 330,95 360,115 380,145 390,175 385,205 375,235 365,260 350,285 335,310 315,335 295,355 275,380 255,405 240,430 225,455 215,475 205,490 195,480 185,460 175,440 165,415 150,390 140,365 125,340 115,315 108,290 102,265 98,240 96,215 98,190 102,165 108,140 116,115 122,95"
                  fill="#FEF3C7"
                  stroke="#FCD34D"
                  strokeWidth="2"
                />

                {/* Decorative dots */}
                {[...Array(20)].map((_, i) => (
                  <circle key={i} cx={Math.random() * 460} cy={Math.random() * 550} r="1.5" fill="#60A5FA" opacity="0.4"/>
                ))}

                {/* State circles */}
                {STATE_DATA.map(state => {
                  const isHovered = hoveredState?.id === state.id
                  const isActive = activeState?.id === state.id
                  return (
                    <g key={state.id} style={{cursor: 'pointer'}} onClick={() => handleStateClick(state)} onMouseEnter={() => setHoveredState(state)} onMouseLeave={() => setHoveredState(null)}>
                      {/* Pulse ring */}
                      {isActive && (
                        <circle cx={state.cx} cy={state.cy} r={state.r + 14} fill="none" stroke={state.color} strokeWidth="2" opacity="0.5" style={{animation: 'pulse-ring 1.5s ease-out infinite'}}/>
                      )}
                      {/* Outer glow */}
                      <circle
                        cx={state.cx}
                        cy={state.cy}
                        r={state.r + (isHovered || isActive ? 8 : 2)}
                        fill={state.color}
                        opacity={isHovered || isActive ? 0.2 : 0.08}
                        style={{transition: 'all 0.3s ease'}}
                      />
                      {/* Main circle */}
                      <circle
                        cx={state.cx}
                        cy={state.cy}
                        r={isHovered || isActive ? state.r + 4 : state.r}
                        fill={`url(#grad-${state.id})`}
                        stroke="white"
                        strokeWidth={isActive ? 3 : 1.5}
                        filter={isHovered ? 'url(#glow)' : ''}
                        style={{transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)'}}
                      />
                      {/* Emoji */}
                      <text x={state.cx} y={state.cy - 4} textAnchor="middle" fontSize={isHovered ? 18 : 14} style={{transition: 'all 0.3s', userSelect: 'none'}}>
                        {state.emoji}
                      </text>
                      {/* Label */}
                      <text x={state.cx} y={state.cy + 14} textAnchor="middle" fontSize="7.5" fontWeight="700" fill="white" style={{userSelect: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
                        {state.name.split(' ')[0]}
                      </text>
                    </g>
                  )
                })}

                {/* Hovered tooltip */}
                {hoveredState && (
                  <g>
                    <rect
                      x={Math.min(hoveredState.cx - 70, 310)}
                      y={hoveredState.cy - hoveredState.r - 60}
                      width="140"
                      height="44"
                      rx="10"
                      fill="white"
                      opacity="0.97"
                      filter="url(#glow)"
                    />
                    <text x={Math.min(hoveredState.cx - 70, 310) + 70} y={hoveredState.cy - hoveredState.r - 42} textAnchor="middle" fontSize="10" fontWeight="800" fill="#1A0A00">
                      {hoveredState.name}
                    </text>
                    <text x={Math.min(hoveredState.cx - 70, 310) + 70} y={hoveredState.cy - hoveredState.r - 28} textAnchor="middle" fontSize="8" fill="#FF6B35">
                      {hoveredState.festivals[0]}
                    </text>
                  </g>
                )}

                {/* Compass */}
                <g transform="translate(410, 50)">
                  <circle cx="0" cy="0" r="18" fill="white" opacity="0.9" stroke="#FCD34D" strokeWidth="1.5"/>
                  <text x="0" y="-6" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FF6B35">N</text>
                  <text x="0" y="12" textAnchor="middle" fontSize="6" fill="#666">S</text>
                  <text x="-10" y="4" textAnchor="middle" fontSize="6" fill="#666">W</text>
                  <text x="10" y="4" textAnchor="middle" fontSize="6" fill="#666">E</text>
                  <polygon points="0,-4 -2,0 0,4 2,0" fill="#FF6B35"/>
                </g>
              </svg>

              {/* Map label */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 shadow-md">
                🇮🇳 India — {STATE_DATA.length} States
              </div>
            </div>
          </div>

          {/* State info panel */}
          <div className="space-y-4">
            {activeState ? (
              <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 shadow-xl overflow-hidden"
                style={{borderColor: activeState.color + '60'}}>
                <div className="p-6 text-white" style={{background: `linear-gradient(135deg, ${activeState.color}, ${activeState.color}99)`}}>
                  <div className="text-4xl mb-2">{activeState.emoji}</div>
                  <h3 className="text-2xl font-black" style={{fontFamily: "'Playfair Display', serif"}}>{activeState.name}</h3>
                  <p className="text-white/80 text-sm mt-1">{activeState.festivals.length} major festivals</p>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-sm uppercase tracking-wider">Famous Festivals</h4>
                  <div className="space-y-2">
                    {activeState.festivals.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors">
                        <span className="text-xl">🎪</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      const match = festivals.find(fv =>
                        fv.state.toLowerCase().includes(activeState.name.toLowerCase().split(' ')[0]) ||
                        activeState.name.toLowerCase().includes(fv.state.toLowerCase().split(' ')[0])
                      )
                      if (match) setSelectedFestival(match)
                    }}
                    className="mt-4 w-full py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{background: `linear-gradient(135deg, ${activeState.color}, ${activeState.color}99)`}}
                  >
                    View Festivals →
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6" style={{fontFamily: "'Playfair Display', serif"}}>
                  Click a state to explore
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {STATE_DATA.map(state => (
                    <button
                      key={state.id}
                      onClick={() => handleStateClick(state)}
                      className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-gray-900 border border-orange-100 dark:border-orange-900/20 hover:border-orange-400 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 text-left"
                    >
                      <span className="text-xl flex-shrink-0">{state.emoji}</span>
                      <div>
                        <div className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">{state.name}</div>
                        <div className="text-xs text-gray-400">{state.festivals.length} festivals</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FestivalMap