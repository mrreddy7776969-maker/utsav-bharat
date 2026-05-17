import { useState } from "react";
import { calendarData } from "../data/festivals";

const months = Object.keys(calendarData);

const typeColors = {
  religious: { bg: "rgba(255,107,53,0.12)", text: "#E85D04", border: "rgba(255,107,53,0.3)", dot: "#FF6B35" },
  harvest:   { bg: "rgba(45,106,79,0.12)",  text: "#2D6A4F", border: "rgba(45,106,79,0.3)",  dot: "#2D6A4F" },
  cultural:  { bg: "rgba(123,45,139,0.12)", text: "#7B2D8B", border: "rgba(123,45,139,0.3)", dot: "#7B2D8B" },
  tribal:    { bg: "rgba(0,119,182,0.12)",  text: "#0077B6", border: "rgba(0,119,182,0.3)",  dot: "#0077B6" },
  national:  { bg: "rgba(19,135,67,0.12)",  text: "#138743", border: "rgba(19,135,67,0.3)",  dot: "#138743" },
};

const typeEmojis = {
  religious: "🕉️",
  harvest: "🌾",
  cultural: "🎭",
  tribal: "🪶",
  national: "🇮🇳",
};

export default function CalendarPage({ navigate }) {
  const [activeMonth, setActiveMonth] = useState("October");
  const [activeType, setActiveType] = useState("all");
  const [view, setView] = useState("grid"); // grid | list

  const allFestivals = Object.entries(calendarData).flatMap(([month, fests]) =>
    fests.map((f) => ({ ...f, month }))
  );

  const totalCount = allFestivals.length;

  const filtered =
    activeType === "all"
      ? calendarData[activeMonth] || []
      : (calendarData[activeMonth] || []).filter((f) => f.type === activeType);

  const monthFestivalCount = (m) => (calendarData[m] || []).length;

  const upcomingAll = allFestivals
    .filter((f) => activeType === "all" || f.type === activeType)
    .slice(0, 6);

  return (
    <div className="min-h-screen pt-20 pb-20 bg-[#FFF8F0] dark:bg-gray-950">
      {/* Header */}
      <div
        className="relative py-20 px-4 text-white overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0a05, #2d0e08, #0d1a2e)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          {["📅","🎉","🪔","🌸","🎨","🌾","💃","🐘"].map((e, i) => (
            <span
              key={i}
              className="absolute text-4xl opacity-10 animate-float-up"
              style={{ left: `${i * 13 + 2}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.5}s` }}
            >
              {e}
            </span>
          ))}
          <svg width="600" height="600" className="absolute -right-40 -top-40 opacity-5 animate-mandala" viewBox="0 0 600 600">
            <circle cx="300" cy="300" r="280" fill="none" stroke="#FF6B35" strokeWidth="2" strokeDasharray="20 8" />
            <circle cx="300" cy="300" r="200" fill="none" stroke="#FF006E" strokeWidth="1.5" strokeDasharray="12 6" />
            {[...Array(12)].map((_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return <circle key={i} cx={300 + 260 * Math.cos(a)} cy={300 + 260 * Math.sin(a)} r="8" fill="#FFB347" opacity="0.6" />;
            })}
          </svg>
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold animate-bounce-in"
            style={{ background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)", color: "#FFB347" }}>
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            📅 Festival Calendar 2025
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-black mb-4">
            <span style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35, #FF006E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              India's Festival Year
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Every month, every state, every tradition — your complete guide to <strong className="text-orange-400">{totalCount}+ celebrations</strong> across 2025.
          </p>
          {/* Type Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {[{ id: "all", label: "All Types", emoji: "✨" }, ...Object.entries(typeEmojis).map(([id, emoji]) => ({ id, label: id.charAt(0).toUpperCase() + id.slice(1), emoji }))].map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 ${
                  activeType === type.id ? "text-white shadow-lg" : "text-gray-400"
                }`}
                style={activeType === type.id
                  ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" }
                  : { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                <span>{type.emoji}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Month Selector */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Browse by Month</h2>
            <div className="flex gap-2">
              <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-500 border"}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-500 border"}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
            {months.map((month) => {
              const count = monthFestivalCount(month);
              const isActive = activeMonth === month;
              return (
                <button
                  key={month}
                  onClick={() => setActiveMonth(month)}
                  className={`relative p-3 rounded-2xl text-center transition-all duration-300 hover:scale-105 group`}
                  style={isActive
                    ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)", color: "white", boxShadow: "0 8px 24px rgba(255,107,53,0.35)" }
                    : { background: "white", border: "1px solid rgba(0,0,0,0.08)", color: "#374151" }
                  }
                >
                  <div className={`text-xs font-bold mb-1 ${isActive ? "text-white" : "text-gray-700"}`}>
                    {month.slice(0, 3)}
                  </div>
                  <div
                    className={`text-lg font-black leading-none ${isActive ? "text-white" : ""}`}
                    style={!isActive ? { color: "#FF6B35" } : {}}
                  >
                    {count}
                  </div>
                  <div className={`text-[10px] ${isActive ? "text-white/70" : "text-gray-400"}`}>
                    {count === 1 ? "fest" : "fests"}
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                      style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Month Detail */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h2 className="font-display text-3xl font-black text-gray-900 dark:text-white">{activeMonth} 2025</h2>
              <p className="text-gray-500 text-sm mt-1">{filtered.length} festival{filtered.length !== 1 ? "s" : ""} this month</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 rounded-3xl" style={{ background: "rgba(255,107,53,0.04)", border: "1px dashed rgba(255,107,53,0.2)" }}>
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 font-medium">No {activeType === "all" ? "" : activeType} festivals in {activeMonth}</p>
              <button onClick={() => setActiveType("all")} className="mt-3 text-sm text-orange-500 font-medium hover:underline">
                Show all types
              </button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((fest, i) => {
                const colors = typeColors[fest.type] || typeColors.religious;
                return (
                  <div
                    key={i}
                    className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-2 cursor-pointer border"
                    style={{ borderColor: "rgba(0,0,0,0.06)", animationDelay: `${i * 0.07}s` }}
                    onClick={() => navigate("home")}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300 inline-block">{fest.emoji}</span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                      >
                        {typeEmojis[fest.type]} {fest.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">{fest.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {fest.date}
                      </span>
                      <span>·</span>
                      <span>{fest.days} day{fest.days > 1 ? "s" : ""}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#FF6B35" }}>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      {fest.state}
                    </div>
                    {/* Progress bar for duration */}
                    <div className="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, (fest.days / 11) * 100)}%`, background: `linear-gradient(90deg, ${colors.dot}, #FF006E)` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((fest, i) => {
                const colors = typeColors[fest.type] || typeColors.religious;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-x-1 cursor-pointer"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}
                  >
                    <div className="text-3xl flex-shrink-0">{fest.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-sm">{fest.name}</h3>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: colors.bg, color: colors.text }}>
                          {fest.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{fest.state} · {fest.date} · {fest.days} day{fest.days > 1 ? "s" : ""}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Year Overview Timeline */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Year at a Glance</h2>
          <div className="bg-white rounded-3xl p-6 shadow-sm border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div className="space-y-3">
              {months.map((month) => {
                const count = monthFestivalCount(month);
                const maxCount = Math.max(...months.map(monthFestivalCount));
                const pct = (count / maxCount) * 100;
                const isActive = month === activeMonth;
                return (
                  <div key={month} className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveMonth(month)}>
                    <div className="w-10 text-xs font-semibold text-gray-500 text-right flex-shrink-0 group-hover:text-orange-500 transition-colors">
                      {month.slice(0, 3)}
                    </div>
                    <div className="flex-1 h-6 bg-gray-50 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center pl-3 transition-all duration-700"
                        style={{
                          width: `${Math.max(pct, 8)}%`,
                          background: isActive
                            ? "linear-gradient(90deg, #FF6B35, #FF006E)"
                            : "linear-gradient(90deg, rgba(255,107,53,0.4), rgba(255,0,110,0.3))",
                        }}
                      >
                        <span className="text-white text-[10px] font-bold">{count}</span>
                      </div>
                    </div>
                    <div className="w-6 text-xs text-gray-400 text-right">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold text-gray-900 mb-4 text-sm">Festival Types Legend</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(typeColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: colors.dot }} />
                <span>{typeEmojis[type]}</span>
                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
