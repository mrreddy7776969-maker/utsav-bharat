import { useState, useEffect, useRef } from "react";
import { festivals, categories, regions, statsData } from "../data/festivals";

function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.15, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();
  useEffect(() => {
    if (!isVisible) return;
    const numericTarget = parseInt(target.replace(/\D/g, "")) || 0;
    const step = numericTarget / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= numericTarget) { setCount(numericTarget); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  const displayValue = target.includes("+") ? `${count}+` : `${count}${suffix}`;
  return <span ref={ref}>{displayValue}</span>;
}

function HeroParticle({ emoji, style }) {
  return (
    <div className="absolute pointer-events-none select-none text-2xl animate-float-up opacity-60" style={style}>
      {emoji}
    </div>
  );
}

function FestivalCard({ festival, navigate, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className="festival-card cursor-pointer group relative overflow-hidden rounded-3xl shadow-lg card-glow-saffron"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.08}s`,
        background: "white",
      }}
      onClick={() => navigate("festival", festival)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-52 img-zoom overflow-hidden">
        <img
          src={festival.image}
          alt={festival.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,${isHovered ? 0.8 : 0.5}))`,
          }}
        />
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.4)" }}>
            {festival.duration}
          </span>
          {festival.tags?.includes("UNESCO") && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)" }}>
              UNESCO ★
            </span>
          )}
        </div>
        {/* Emoji badge */}
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-xl backdrop-blur-sm shadow-lg" style={{ background: "rgba(255,255,255,0.2)" }}>
          <span className={isHovered ? "animate-bounce-in" : ""}>{festival.emoji}</span>
        </div>
        {/* Bottom info on image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-bold text-white text-xl leading-tight drop-shadow-md">
            {festival.name}
          </h3>
          <p className="text-white/80 text-xs font-medium mt-0.5">{festival.subtitle}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{festival.state}</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(festival.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xs">★</span>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3 leading-relaxed">
          {festival.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {festival.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(255,107,53,0.1)", color: "#FF6B35" }}>
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500">
            📅 {festival.date}
          </span>
          <div
            className={`flex items-center gap-1 text-xs font-semibold transition-all duration-300 ${
              isHovered ? "gap-2" : ""
            }`}
            style={{ color: "#FF6B35" }}
          >
            <span>Explore</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${festival.color}, #FF006E)`,
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

function StatCard({ stat, index }) {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className="text-center p-6 rounded-3xl transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transitionDelay: `${index * 0.1}s`,
        background: "rgba(255,107,53,0.06)",
        border: "1px solid rgba(255,107,53,0.12)",
      }}
    >
      <div className="text-4xl mb-2 hover-wiggle inline-block">{stat.emoji}</div>
      <div className="font-display font-black text-4xl mb-1" style={{
        background: "linear-gradient(135deg, #FF6B35, #FF006E)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {isVisible ? <AnimatedCounter target={stat.value} /> : "0"}
      </div>
      <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
    </div>
  );
}

export default function Home({ navigate }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState("");

  const heroParticles = [
    { emoji: "🪔", style: { top: "15%", left: "8%", animationDuration: "4s", fontSize: "2rem" } },
    { emoji: "🌸", style: { top: "25%", right: "10%", animationDuration: "5s", animationDelay: "0.5s" } },
    { emoji: "🎨", style: { top: "60%", left: "5%", animationDuration: "3.5s", animationDelay: "1s" } },
    { emoji: "🌺", style: { top: "70%", right: "8%", animationDuration: "4.5s", animationDelay: "1.5s" } },
    { emoji: "🐘", style: { top: "40%", left: "2%", animationDuration: "6s", animationDelay: "0.8s", fontSize: "1.5rem" } },
    { emoji: "💃", style: { top: "30%", right: "4%", animationDuration: "5.5s", animationDelay: "2s", fontSize: "1.5rem" } },
    { emoji: "🎺", style: { top: "80%", left: "15%", animationDuration: "4s", animationDelay: "0.3s", fontSize: "1.5rem" } },
    { emoji: "🐪", style: { top: "85%", right: "15%", animationDuration: "5s", animationDelay: "1.2s", fontSize: "1.5rem" } },
  ];

  const filteredFestivals = festivals
    .filter((f) => {
      const matchCat = activeCategory === "all" || f.category === activeCategory;
      const matchRegion = activeRegion === "all" || f.region === activeRegion;
      const matchSearch =
        !searchTerm ||
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.tags?.some((t) => t.includes(searchTerm.toLowerCase()));
      return matchCat && matchRegion && matchSearch;
    })
    .sort((a, b) =>
      sortBy === "popularity"
        ? b.popularity - a.popularity
        : sortBy === "rating"
        ? b.rating - a.rating
        : a.name.localeCompare(b.name)
    );

  const [featuredIndex, setFeaturedIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const topFestivals = festivals.slice(0, 3);
  const featured = topFestivals[featuredIndex];

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4"
        style={{
          background: "linear-gradient(160deg, #FFF8F0 0%, #FFF0E0 40%, #FFE8D0 70%, #FFF3E8 100%)",
        }}
      >
        {/* Background Mandala SVG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg width="900" height="900" viewBox="0 0 900 900" className="opacity-[0.04] animate-mandala">
            <circle cx="450" cy="450" r="400" fill="none" stroke="#FF6B35" strokeWidth="2" strokeDasharray="20 10" />
            <circle cx="450" cy="450" r="320" fill="none" stroke="#FF006E" strokeWidth="1.5" strokeDasharray="15 8" />
            <circle cx="450" cy="450" r="240" fill="none" stroke="#FFB347" strokeWidth="1" strokeDasharray="10 6" />
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const x = 450 + 380 * Math.cos(rad);
              const y = 450 + 380 * Math.sin(rad);
              return <circle key={i} cx={x} cy={y} r="12" fill="#FF6B35" opacity="0.6" />;
            })}
            {[...Array(8)].map((_, i) => {
              const angle = (i * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              const x1 = 450 + 100 * Math.cos(rad);
              const y1 = 450 + 100 * Math.sin(rad);
              const x2 = 450 + 300 * Math.cos(rad);
              const y2 = 450 + 300 * Math.sin(rad);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FF006E" strokeWidth="1.5" opacity="0.5" />;
            })}
          </svg>
        </div>

        {/* Particles */}
        {heroParticles.map((p, i) => (
          <HeroParticle key={i} emoji={p.emoji} style={p.style} />
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-sm font-semibold animate-bounce-in shadow-md"
            style={{
              background: "linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,0,110,0.08))",
              border: "1px solid rgba(255,107,53,0.25)",
              color: "#FF6B35",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>🇮🇳 India's #1 Festival Discovery Platform</span>
          </div>

          {/* Main Heading */}
          <h1
            className="fluid-h1 font-display font-black mb-6 animate-reveal-up leading-tight"
            style={{ animationFillMode: "both" }}
          >
            <span className="block text-gray-900">Celebrate Every</span>
            <span
              className="block animate-gradient-shift"
              style={{
                background: "linear-gradient(135deg, #FF6B35, #FF006E, #FFB347, #FF6B35)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              उत्सव of India
            </span>
          </h1>

          <p
            className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-reveal-up delay-200"
            style={{ animationFillMode: "both" }}
          >
            Explore <strong style={{ color: "#FF6B35" }}>1000+ festivals</strong> across 28 states.
            Plan unforgettable cultural journeys, discover ancient traditions, and taste the world's most vibrant celebrations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-reveal-up delay-300" style={{ animationFillMode: "both" }}>
            <button
              onClick={() => navigate("planner")}
              className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
            >
              <span className="relative z-10">🗺️ Plan Festival Trip</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, #E85D04, #c9005a)" }} />
            </button>
            <button
              onClick={() => navigate("calendar")}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-gray-700 text-lg border-2 transition-all duration-300 hover:scale-105 bg-white/70 backdrop-blur-sm hover:bg-white"
              style={{ borderColor: "rgba(255,107,53,0.3)" }}
            >
              📅 View Festival Calendar
            </button>
          </div>

          {/* Stats Pills */}
          <div className="flex flex-wrap justify-center gap-4 animate-reveal-up delay-400" style={{ animationFillMode: "both" }}>
            {statsData.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/80 shadow-sm backdrop-blur-sm"
                style={{ border: "1px solid rgba(255,107,53,0.15)" }}
              >
                <span>{stat.emoji}</span>
                <span className="font-bold" style={{ color: "#FF6B35" }}>{stat.value}</span>
                <span className="text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400 font-medium">Discover Festivals</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </section>

      {/* ===== FEATURED FESTIVAL SPOTLIGHT ===== */}
      <section className="py-20 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0a05, #0d1a2e)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-2 block">✦ Spotlight ✦</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white">Festival of the Moment</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-96 img-zoom shadow-2xl">
              <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,10,5,0.7), transparent)" }} />
              <div className="absolute bottom-6 left-6">
                <span className="text-5xl">{featured.emoji}</span>
              </div>
              {/* Dot indicators */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {topFestivals.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`rounded-full transition-all duration-300 ${i === featuredIndex ? "w-6 h-2 bg-orange-400" : "w-2 h-2 bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
            {/* Content */}
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {featured.category.toUpperCase()}
                </span>
                <span className="text-gray-400 text-sm">📍 {featured.state}</span>
              </div>
              <h3 className="font-display text-4xl font-black mb-2">{featured.name}</h3>
              <p className="text-orange-300 text-lg mb-4">{featured.subtitle}</p>
              <p className="text-gray-300 leading-relaxed mb-6">{featured.longDescription}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Duration", value: featured.duration },
                  { label: "Best Month", value: featured.month },
                  { label: "Weather", value: featured.weather },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)" }}>
                    <div className="text-orange-400 text-xs font-medium mb-1">{item.label}</div>
                    <div className="text-white text-sm font-bold">{item.value}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("festival", featured)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
              >
                Explore {featured.name} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statsData.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FESTIVAL EXPLORER ===== */}
      <section className="py-20 px-4" style={{ background: "#FFF8F0" }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-2 block">✦ Explore ✦</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Discover India's Festivals
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From ancient Vedic rituals to modern tribal celebrations — every festival tells a story.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-10">
            {/* Search */}
            <div className="relative max-w-lg mx-auto w-full">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search festivals, states, traditions..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border bg-white text-gray-700 outline-none text-sm shadow-sm transition-all duration-200"
                style={{ borderColor: "rgba(255,107,53,0.2)", focus: { borderColor: "#FF6B35" } }}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    activeCategory === cat.id ? "text-white shadow-md" : "text-gray-600 bg-white hover:bg-orange-50"
                  }`}
                  style={
                    activeCategory === cat.id
                      ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" }
                      : { border: "1px solid rgba(0,0,0,0.08)" }
                  }
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === cat.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Region + Sort Row */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex gap-2 flex-wrap justify-center">
                {regions.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setActiveRegion(reg.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                      activeRegion === reg.id
                        ? "text-orange-600 shadow-sm"
                        : "text-gray-500 bg-white hover:bg-orange-50"
                    }`}
                    style={
                      activeRegion === reg.id
                        ? { background: "rgba(255,107,53,0.12)", border: "1.5px solid rgba(255,107,53,0.4)" }
                        : { border: "1px solid rgba(0,0,0,0.08)" }
                    }
                  >
                    <span>{reg.emoji}</span>
                    <span>{reg.label}</span>
                  </button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600 bg-white border outline-none cursor-pointer"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
              >
                <option value="popularity">Sort: Popularity</option>
                <option value="rating">Sort: Rating</option>
                <option value="name">Sort: Name A-Z</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-center mb-6">
            <span className="text-sm text-gray-500">
              Showing <span className="font-bold text-orange-500">{filteredFestivals.length}</span> festivals
              {searchTerm && ` for "${searchTerm}"`}
            </span>
          </div>

          {/* Festival Grid */}
          {filteredFestivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFestivals.map((festival, i) => (
                <FestivalCard
                  key={festival.id}
                  festival={festival}
                  navigate={navigate}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No festivals found</h3>
              <p className="text-gray-500">Try different filters or search terms</p>
              <button
                onClick={() => { setActiveCategory("all"); setActiveRegion("all"); setSearchTerm(""); }}
                className="mt-4 px-6 py-2 rounded-xl text-white font-medium"
                style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== INDIA MAP SECTION ===== */}
      <section className="py-20 px-4 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0d0604, #1a0a05, #0d1a2e)" }}>
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest text-orange-400 uppercase mb-2 block">✦ India's Cultural Map ✦</span>
          <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
            A Festival for Every Corner
          </h2>
          <p className="text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
            From the snow-capped Himalayas to the sun-drenched coasts — India celebrates year-round.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { region: "North India", emoji: "⛰️", festivals: ["Baisakhi", "Diwali", "Holi"], color: "#FF6B35" },
              { region: "South India", emoji: "🌴", festivals: ["Onam", "Pongal", "Thrissur Pooram"], color: "#2D6A4F" },
              { region: "East India", emoji: "🌊", festivals: ["Durga Puja", "Rath Yatra", "Bishu"], color: "#FF006E" },
              { region: "West India", emoji: "🏜️", festivals: ["Navratri", "Ganesh Chaturthi", "Pushkar Fair"], color: "#FFB347" },
              { region: "Northeast", emoji: "🦋", festivals: ["Hornbill", "Bihu", "Wangala"], color: "#7B2D8B" },
            ].map((reg) => (
              <div
                key={reg.region}
                className="p-5 rounded-2xl text-left transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                onClick={() => { setActiveRegion(reg.region.toLowerCase().replace(" india", "").replace("northeast", "northeast")); }}
              >
                <div className="text-3xl mb-3 hover-wiggle inline-block">{reg.emoji}</div>
                <h4 className="font-bold text-white text-sm mb-2">{reg.region}</h4>
                <ul className="space-y-1">
                  {reg.festivals.map((f) => (
                    <li key={f} className="text-xs text-gray-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: reg.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-2 block">✦ Why Utsav Bharat ✦</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900">
              Your Ultimate Festival Companion
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🗓️",
                title: "Smart Festival Calendar",
                desc: "Never miss a celebration. Our intelligent calendar shows festivals by month, state, and type with real-time updates.",
                color: "#FF6B35",
              },
              {
                emoji: "🗺️",
                title: "AI-Powered Trip Planner",
                desc: "Get personalized festival itineraries based on your interests, budget, and travel dates. Tailored just for you.",
                color: "#FF006E",
              },
              {
                emoji: "🎮",
                title: "Cultural Quiz Master",
                desc: "Test your knowledge of India's incredible festival traditions with our interactive, educational quiz system.",
                color: "#7B2D8B",
              },
              {
                emoji: "📸",
                title: "Rich Visual Guides",
                desc: "Stunning photography and detailed cultural context for every festival, from major celebrations to hidden gems.",
                color: "#0077B6",
              },
              {
                emoji: "🏆",
                title: "Expert Travel Tips",
                desc: "Insider knowledge from cultural experts: best viewing spots, local etiquette, dress codes, and food to try.",
                color: "#2D6A4F",
              },
              {
                emoji: "🌐",
                title: "All 28 States Covered",
                desc: "The most comprehensive database of Indian festivals — from grand national celebrations to rare tribal rituals.",
                color: "#FFB347",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-3xl border border-gray-100 hover:border-orange-100 hover:shadow-xl transition-all duration-400 hover:-translate-y-2"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${feature.color}15` }}
                >
                  {feature.emoji}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-16 px-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E, #7B2D8B)" }}>
        <div className="absolute inset-0 pointer-events-none">
          {["🪔","🎨","🌺","💃","🐘","🌾"].map((e, i) => (
            <span
              key={i}
              className="absolute text-white opacity-10 text-5xl animate-float-up"
              style={{
                left: `${i * 17 + 5}%`,
                top: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + i}s`,
              }}
            >
              {e}
            </span>
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
            Ready to Experience India's Magic? 🎉
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Plan your perfect festival journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("planner")}
              className="px-8 py-4 rounded-2xl bg-white font-bold text-orange-600 hover:scale-105 transition-transform duration-300 shadow-xl text-lg"
            >
              🗺️ Start Planning Now
            </button>
            <button
              onClick={() => navigate("quiz")}
              className="px-8 py-4 rounded-2xl font-bold text-white hover:scale-105 transition-transform duration-300 border-2 border-white/30 hover:bg-white/10 text-lg"
            >
              🎮 Take the Quiz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
