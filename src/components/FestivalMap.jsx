import React, { useState } from 'react';

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
];

const STATE_PATHS = {
  // More accurate paths (refined coordinates)
  rajasthan: "M 180 120 Q 220 80 280 85 Q 320 110 310 160 Q 280 200 230 225 Q 190 210 165 160 Z",
  gujarat: "M 140 190 Q 130 220 145 255 Q 170 270 195 255 Q 200 220 175 195 Z",
  punjab: "M 210 95 Q 235 85 265 95 Q 270 125 245 145 Q 215 140 200 115 Z",
  himachal: "M 225 75 Q 245 65 265 80 Q 255 110 230 115 Z",
  uttarakhand: "M 255 85 Q 280 75 300 95 Q 295 125 265 130 Z",
  haryana: "M 225 130 Q 255 120 275 135 Q 270 155 240 160 Z",
  delhi: "M 235 140 Q 245 135 255 145 Q 250 155 235 155 Z",
  up: "M 260 125 Q 310 115 355 145 Q 360 190 320 220 Q 280 225 255 190 Z",
  mp: "M 255 190 Q 290 175 340 195 Q 355 245 320 275 Q 270 280 245 240 Z",
  maharashtra: "M 220 255 Q 255 245 300 255 Q 325 290 310 335 Q 265 350 225 310 Z",
  goa: "M 205 315 Q 215 305 225 320 Q 220 330 205 325 Z",
  odisha: "M 335 220 Q 370 205 395 225 Q 390 265 355 280 Q 330 265 325 240 Z",
  jharkhand: "M 310 195 Q 345 185 370 205 Q 365 235 340 245 Q 315 235 310 210 Z",
  westbengal: "M 355 185 Q 385 170 410 195 Q 405 230 375 245 Q 355 230 350 200 Z",
  assam: "M 390 145 Q 420 135 435 160 Q 425 185 395 190 Z",
  bihar: "M 325 160 Q 355 150 380 165 Q 385 195 355 210 Q 330 200 320 175 Z",
  chhattisgarh: "M 290 215 Q 325 205 355 225 Q 355 260 325 270 Q 295 260 285 235 Z",
  andhrapradesh: "M 255 305 Q 290 295 335 315 Q 345 355 310 380 Q 270 375 245 340 Z",
  telangana: "M 265 265 Q 295 255 330 270 Q 335 305 310 325 Q 280 325 265 295 Z",
  karnataka: "M 200 290 Q 235 275 275 285 Q 295 315 285 350 Q 245 365 210 340 Z",
  kerala: "M 235 375 Q 255 365 280 375 Q 285 400 260 410 Q 240 400 235 385 Z",
  tamilnadu: "M 225 355 Q 255 340 290 350 Q 305 380 290 405 Q 255 415 225 390 Z",
  // Add more states as needed (J&K, etc.)
};

const STATE_CENTERS = {
  rajasthan: { cx: 225, cy: 155 },
  gujarat: { cx: 165, cy: 225 },
  punjab: { cx: 235, cy: 115 },
  himachal: { cx: 245, cy: 95 },
  uttarakhand: { cx: 275, cy: 105 },
  haryana: { cx: 250, cy: 140 },
  delhi: { cx: 242, cy: 145 },
  up: { cx: 305, cy: 170 },
  mp: { cx: 295, cy: 230 },
  maharashtra: { cx: 265, cy: 295 },
  goa: { cx: 212, cy: 318 },
  odisha: { cx: 360, cy: 245 },
  jharkhand: { cx: 345, cy: 215 },
  westbengal: { cx: 380, cy: 205 },
  assam: { cx: 410, cy: 160 },
  bihar: { cx: 355, cy: 180 },
  chhattisgarh: { cx: 315, cy: 245 },
  andhrapradesh: { cx: 290, cy: 345 },
  telangana: { cx: 295, cy: 290 },
  karnataka: { cx: 245, cy: 315 },
  kerala: { cx: 255, cy: 395 },
  tamilnadu: { cx: 260, cy: 380 },
};

const FestivalMap = ({ festivals, setSelectedFestival }) => {
  const [hoveredState, setHoveredState] = useState(null);
  const [activeState, setActiveState] = useState(null);

  const handleStateClick = (state) => {
    setActiveState(state);
    
    const match = festivals.find(f => 
      state.festivals.some(sf => 
        f.name.toLowerCase().includes(sf.toLowerCase().split(' ')[0])
      ) || 
      f.state?.toLowerCase().includes(state.name.toLowerCase().split(' ')[0])
    );
    
    if (match) setSelectedFestival(match);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-orange-50/60 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-5">
            🗺️ Interactive Map
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Festivals <span className="gradient-text">By State</span>
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Click on any state to explore its vibrant festivals and cultural traditions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* SVG Map - Improved */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 border-blue-100 dark:border-blue-900/30 shadow-2xl p-6">
              <svg 
                viewBox="0 0 480 430" 
                className="w-full max-h-[520px]" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="oceanGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#BAE6FD" />
                    <stop offset="100%" stopColor="#7DD3FC" />
                  </radialGradient>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Ocean */}
                <rect width="480" height="430" fill="url(#oceanGrad)" rx="20"/>

                {/* India outline (simplified but cleaner) */}
                <path 
                  d="M 150 80 Q 200 50 320 45 Q 420 90 430 180 Q 410 280 350 370 Q 220 400 140 320 Q 100 220 120 120 Z" 
                  fill="#FEF3C7" 
                  stroke="#FCD34D" 
                  strokeWidth="8" 
                  opacity="0.6"
                />

                {/* Individual States */}
                {STATE_DATA.map(state => {
                  const path = STATE_PATHS[state.id];
                  if (!path) return null;
                  
                  const isHovered = hoveredState?.id === state.id;
                  const isActive = activeState?.id === state.id;

                  return (
                    <g key={state.id}>
                      <path
                        d={path}
                        fill={state.color}
                        stroke={isActive ? "#fff" : "#FCD34D"}
                        strokeWidth={isActive ? 3 : 1.5}
                        opacity={isHovered || isActive ? 0.95 : 0.8}
                        style={{ 
                          cursor: 'pointer', 
                          transition: 'all 0.2s ease',
                          filter: isHovered ? 'url(#glow)' : 'none'
                        }}
                        onClick={() => handleStateClick(state)}
                        onMouseEnter={() => setHoveredState(state)}
                        onMouseLeave={() => setHoveredState(null)}
                      />
                    </g>
                  );
                })}

                {/* Markers
