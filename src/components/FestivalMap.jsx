import React, { useState } from 'react'

const STATE_DATA = [
  { id: 'rajasthan', name: 'Rajasthan', festivals: ['Pushkar Camel Fair', 'Teej', 'Gangaur'], color: '#FF6B35', emoji: '🐪' },
  { id: 'gujarat', name: 'Gujarat', festivals: ['Navratri', 'Uttarayan', 'Rann Utsav'], color: '#7B2D8B', emoji: '💃' },
  { id: 'punjab', name: 'Punjab', festivals: ['Baisakhi', 'Lohri', 'Hola Mohalla'], color: '#0077B6', emoji: '🌾' },
  { id: 'himachal', name: 'Himachal Pradesh', festivals: ['Kullu Dussehra', 'Lahula', 'Phagli'], color: '#00B4D8', emoji: '🏔️' },
  { id: 'uttarakhand', name: 'Uttarakhand', festivals: ['Kumbh Mela', 'Nanda Devi Jaagar', 'Phool Dei'], color: '#06D6A0', emoji: '🗻' },
  { id: 'haryana', name: 'Haryana', festivals: ['Surajkund Mela', 'Mewat Festival', 'Bhratri'], color: '#FFD700', emoji: '🌾' },
  { id: 'delhi', name: 'Delhi', festivals: ['Diwali', 'Holi', 'Independence Day'], color: '#DC2626', emoji: '🏛️' },
  { id: 'up', name: 'Uttar Pradesh', festivals: ['Holi', 'Kumbh Mela', 'Diwali'], color: '#C9184A', emoji: '🎨' },
  { id: 'mp', name: 'Madhya Pradesh', festivals: ['Khajuraho Dance', 'Tansen Music', 'Lokrang'], color: '#6A0572', emoji: '🎵' },
  { id: 'maharashtra', name: 'Maharashtra', festivals: ['Ganesh Chaturthi', 'Gudi Padwa', 'Lavani'], color: '#FF006E', emoji: '🐘' },
  { id: 'goa', name: 'Goa', festivals: ['Carnival', 'Shigmo', 'Christmas'], color: '#F72585', emoji: '🎭' },
  { id: 'odisha', name: 'Odisha', festivals: ['Rath Yatra', 'Durga Puja', 'Raja Festival'], color: '#FFAA00', emoji: '⛪' },
  { id: 'jharkhand', name: 'Jharkhand', festivals: ['Sarhul', 'Karam', 'Chapla'], color: '#8B4513', emoji: '🌳' },
  { id: 'westbengal', name: 'West Bengal', festivals: ['Durga Puja', 'Dol Jatra', 'Poush Mela'], color: '#FFB347', emoji: '🥁' },
  { id: 'assam', name: 'Assam', festivals: ['Bihu', 'Ambubachi Mela', 'Rongali Bihu'], color: '#0096C7', emoji: '🌿' },
  { id: 'bihar', name: 'Bihar', festivals: ['Chhath Puja', 'Bihar Diwas', 'Rajgir Mahotsav'], color: '#FF5722', emoji: '🌾' },
  { id: 'chhattisgarh', name: 'Chhattisgarh', festivals: ['Bastar Dussehra', 'Magar Ghotul', 'Khordha'], color: '#FF8C00', emoji: '🎭' },
  { id: 'andhrapradesh', name: 'Andhra Pradesh', festivals: ['Ugadi', 'Krishna Devadasu', 'Vijayadasami'], color: '#9C27B0', emoji: '🌺' },
  { id: 'telangana', name: 'Telangana', festivals: ['Bonalu', 'Bathukamma', 'Deccan Festival'], color: '#E91E63', emoji: '🌸' },
  { id: 'karnataka', name: 'Karnataka', festivals: ['Mysore Dasara', 'Bangalore Karaga', 'Hampi Festival'], color: '#673AB7', emoji: '🦅' },
  { id: 'kerala', name: 'Kerala', festivals: ['Onam', 'Thrissur Pooram', 'Vishu'], color: '#2D9B5D', emoji: '🐘' },
  { id: 'tamilnadu', name: 'Tamil Nadu', festivals: ['Pongal', 'Jallikattu', 'Karthigai Deepam'], color: '#E85D04', emoji: '🐂' },
]

// Accurate SVG paths for India map (simplified state boundaries)
const INDIA_MAP_PATH = "M 445,185 L 450,195 L 448,210 L 440,225 L 435,235 L 430,250 L 425,270 L 418,280 L 408,285 L 395,290 L 380,288 L 365,285 L 350,290 L 340,300 L 335,315 L 330,325 L 322,332 L 310,338 L 298,342 L 285,345 L 272,348 L 258,350 L 245,352 L 232,355 L 220,358 L 208,360 L 195,362 L 180,363 L 165,362 L 150,358 L 138,352 L 128,345 L 120,338 L 115,330 L 112,320 L 108,308 L 105,295 L 102,282 L 100,268 L 98,255 L 96,242 L 95,228 L 94,215 L 95,202 L 98,190 L 102,178 L 108,168 L 115,158 L 122,150 L 130,142 L 138,135 L 145,128 L 150,120 L 155,112 L 162,105 L 170,98 L 178,92 L 186,86 L 194,80 L 202,75 L 210,70 L 218,65 L 228,60 L 238,55 L 248,52 L 258,48 L 268,45 L 280,42 L 292,40 L 305,38 L 318,38 L 332,40 L 345,45 L 358,52 L 370,60 L 382,70 L 392,82 L 400,95 L 408,110 L 415,125 L 422,140 L 428,155 L 435,170 L 440,180 Z"

const STATE_PATHS = {
  rajasthan: "M 165,85 L 195,75 L 225,72 L 255,75 L 280,80 L 295,90 L 305,105 L 310,125 L 308,145 L 300,165 L 290,185 L 275,200 L 260,210 L 245,220 L 230,225 L 215,230 L 200,235 L 185,240 L 170,238 L 160,225 L 155,210 L 150,195 L 148,180 L 150,165 L 152,150 L 155,135 L 158,120 L 160,105 Z",
  gujarat: "M 130,215 L 145,205 L 160,200 L 175,205 L 185,218 L 190,235 L 188,252 L 180,268 L 168,278 L 155,280 L 145,275 L 135,265 L 128,250 L 125,235 L 128,225 Z",
  punjab: "M 200,115 L 215,108 L 230,105 L 245,110 L 255,120 L 260,132 L 255,145 L 245,155 L 232,160 L 218,162 L 205,158 L 195,148 L 192,135 Z",
  himachal: "M 218,95 L 230,88 L 242,85 L 252,90 L 258,100 L 255,112 L 245,120 L 232,125 L 220,122 L 215,112 Z",
  uttarakhand: "M 242,95 L 255,90 L 268,88 L 280,95 L 285,108 L 280,120 L 268,128 L 252,130 L 242,125 L 238,112 Z",
  haryana: "M 225,128 L 242,122 L 258,120 L 272,125 L 280,135 L 278,148 L 268,158 L 255,162 L 240,160 L 228,152 L 222,140 Z",
  delhi: "M 228,135 L 238,130 L 248,132 L 252,142 L 248,150 L 238,152 L 230,148 L 226,142 Z",
  up: "M 268,130 L 285,125 L 305,122 L 325,125 L 340,135 L 348,150 L 350,168 L 345,185 L 335,198 L 320,210 L 305,220 L 288,225 L 272,222 L 260,212 L 252,198 L 255,180 L 260,165 L 265,150 L 268,140 Z",
  mp: "M 255,195 L 275,188 L 298,185 L 320,188 L 338,198 L 348,212 L 352,230 L 348,248 L 338,262 L 325,272 L 308,280 L 290,285 L 272,282 L 258,272 L 250,258 L 245,242 L 248,225 L 252,210 Z",
  maharashtra: "M 225,268 L 245,258 L 268,252 L 290,255 L 308,265 L 318,280 L 322,298 L 318,315 L 308,328 L 295,338 L 280,342 L 265,340 L 252,332 L 242,318 L 235,302 L 228,288 L 225,275 Z",
  goa: "M 198,312 L 208,308 L 218,310 L 222,320 L 218,328 L 208,332 L 198,328 L 195,318 Z",
  odisha: "M 330,248 L 348,240 L 365,238 L 378,248 L 385,262 L 382,278 L 372,292 L 358,302 L 342,308 L 328,305 L 320,292 L 322,275 L 328,260 Z",
  jharkhand: "M 318,205 L 335,198 L 352,198 L 365,208 L 370,222 L 365,238 L 350,248 L 335,252 L 320,248 L 312,238 L 310,222 L 312,210 Z",
  westbengal: "M 352,195 L 368,188 L 385,188 L 398,198 L 402,212 L 398,228 L 385,240 L 370,248 L 355,250 L 342,245 L 335,232 L 340,218 L 348,205 Z",
  assam: "M 385,148 L 405,142 L 420,148 L 428,160 L 425,175 L 415,185 L 400,190 L 385,188 L 378,175 L 382,162 Z",
  bihar: "M 338,165 L 355,158 L 372,160 L 385,172 L 388,188 L 382,202 L 368,212 L 352,218 L 338,215 L 330,202 L 328,185 L 332,172 Z",
  chhattisgarh: "M 295,225 L 315,218 L 335,218 L 352,228 L 358,245 L 352,262 L 338,275 L 320,282 L 302,282 L 288,275 L 280,260 L 282,245 L 288,232 Z",
  andhrapradesh: "M 248,318 L 268,310 L 290,308 L 312,315 L 328,328 L 335,345 L 330,362 L 318,378 L 302,388 L 285,392 L 268,385 L 255,370 L 248,350 L 252,332 Z",
  telangana: "M 268,278 L 288,272 L 310,275 L 328,288 L 335,305 L 330,325 L 315,338 L 295,342 L 278,338 L 265,325 L 262,305 L 268,288 Z",
  karnataka: "M 195,295 L 218,282 L 242,278 L 265,282 L 285,295 L 295,312 L 292,332 L 280,348 L 262,358 L 242,360 L 222,352 L 208,338 L 198,320 L 195,305 Z",
  kerala: "M 238,385 L 252,375 L 268,372 L 282,382 L 288,398 L 282,412 L 268,418 L 252,415 L 242,405 L 238,392 Z",
  tamilnadu: "M 225,360 L 242,348 L 262,342 L 282,345 L 298,358 L 305,378 L 298,398 L 282,412 L 262,418 L 242,412 L 228,398 L 220,378 L 222,362 Z",
}

// State centroid positions for markers
const STATE_CENTERS = {
  rajasthan: { cx: 220, cy: 160 },
  gujarat: { cx: 162, cy: 245 },
  punjab: { cx: 228, cy: 132 },
  himachal: { cx: 238, cy: 105 },
  uttarakhand: { cx: 262, cy: 108 },
  haryana: { cx: 248, cy: 142 },
  delhi: { cx: 238, cy: 142 },
  up: { cx: 308, cy: 178 },
  mp: { cx: 302, cy: 235 },
  maharashtra: { cx: 268, cy: 308 },
  goa: { cx: 208, cy: 318 },
  odisha: { cx: 352, cy: 275 },
  jharkhand: { cx: 342, cy: 220 },
  westbengal: { cx: 375, cy: 218 },
  assam: { cx: 405, cy: 165 },
  bihar: { cx: 358, cy: 185 },
  chhattisgarh: { cx: 318, cy: 252 },
  andhrapradesh: { cx: 288, cy: 355 },
  telangana: { cx: 298, cy: 305 },
  karnataka: { cx: 242, cy: 318 },
  kerala: { cx: 265, cy: 398 },
  tamilnadu: { cx: 262, cy: 382 },
}

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
