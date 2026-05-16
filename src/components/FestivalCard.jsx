import React from 'react'

const FestivalCard = ({ festival, onClick }) => {
  const tagColors = ['bg-orange-100 text-orange-700', 'bg-rose-100 text-rose-700', 'bg-violet-100 text-violet-700', 'bg-teal-100 text-teal-700']

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_24px_64px_rgba(255,107,53,0.22)] border border-orange-100/60 dark:border-orange-900/20 shadow-md"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={e => { e.target.src = `https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=70` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"/>

        {/* Trending badge */}
        {festival.trending && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-rose-500 text-white text-xs font-bold rounded-full shadow-lg">
            🔥 Trending
          </div>
        )}

        {/* Date badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl text-xs font-bold text-orange-700 shadow-md">
          📅 {festival.date}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 rounded-lg text-white text-xs font-semibold backdrop-blur-sm">
          ⭐ {festival.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight" style={{fontFamily: "'Playfair Display', serif"}}>
            {festival.name}
          </h3>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0">
            {festival.duration}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span>📍</span>
          <span className="font-medium">{festival.state}</span>
          <span className="mx-1">·</span>
          <span>{festival.region}</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {festival.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {festival.tags.slice(0, 3).map((tag, i) => (
            <span key={tag} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${tagColors[i % tagColors.length]}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            👥 {festival.visitors} visitors/year
          </div>
          <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm font-bold group-hover:gap-2 transition-all">
            Explore
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{boxShadow: 'inset 0 0 0 2px rgba(255,107,53,0.35)'}}></div>
    </div>
  )
}

export default FestivalCard