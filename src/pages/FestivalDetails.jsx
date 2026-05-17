import { useState } from "react";
import { festivals } from "../data/festivals";

export default function FestivalDetails({ festival, navigate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [savedFestivals, setSavedFestivals] = useState([]);
  const [shareTooltip, setShareTooltip] = useState(false);

  if (!festival) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No festival selected</h2>
          <button
            onClick={() => navigate("home")}
            className="px-6 py-3 rounded-xl text-white font-medium"
            style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
          >
            Browse Festivals
          </button>
        </div>
      </div>
    );
  }

  const isSaved = savedFestivals.includes(festival.id);
  const toggleSave = () => {
    setSavedFestivals((prev) =>
      prev.includes(festival.id) ? prev.filter((id) => id !== festival.id) : [...prev, festival.id]
    );
  };

  const handleShare = () => {
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  const relatedFestivals = festivals
    .filter((f) => f.id !== festival.id && (f.region === festival.region || f.category === festival.category))
    .slice(0, 3);

  const tabs = [
    { id: "overview", label: "Overview", emoji: "📖" },
    { id: "traditions", label: "Traditions", emoji: "🎭" },
    { id: "food", label: "Food", emoji: "🍽️" },
    { id: "travel", label: "Travel Guide", emoji: "✈️" },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={festival.heroImage || festival.image}
          alt={festival.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)" }}
        />

        {/* Back button */}
        <button
          onClick={() => navigate("home")}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:scale-105"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Festivals
        </button>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            {shareTooltip && (
              <div className="absolute top-full mt-2 right-0 px-3 py-1.5 rounded-lg text-xs text-white font-medium whitespace-nowrap animate-slide-up-fade" style={{ background: "#1a1a2e" }}>
                ✓ Link copied!
              </div>
            )}
          </div>
          <button
            onClick={toggleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: isSaved ? "rgba(255,107,53,0.8)" : "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {isSaved ? "❤️ Saved" : "🤍 Save"}
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: "rgba(255,107,53,0.8)" }}
              >
                {festival.category?.toUpperCase()}
              </span>
              <span className="text-white/70 text-sm">📍 {festival.state}</span>
              <span className="text-white/70 text-sm">⏱ {festival.duration}</span>
              {festival.tags?.includes("UNESCO") && (
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35)", color: "white" }}>
                  UNESCO Heritage ★
                </span>
              )}
            </div>
            <div className="flex items-end gap-4">
              <div>
                <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-tight">
                  <span className="mr-3">{festival.emoji}</span>
                  {festival.name}
                </h1>
                <p className="text-orange-300 text-xl mt-1">{festival.subtitle}</p>
              </div>
              <div className="ml-auto hidden md:flex items-center gap-1">
                {[...Array(festival.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Tabs */}
      <div
        className="sticky top-16 z-30 border-b"
        style={{ background: "rgba(255,248,240,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(255,107,53,0.15)" }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-none py-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700 hover:bg-orange-50"
                }`}
                style={
                  activeTab === tab.id
                    ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" }
                    : {}
                }
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-reveal-up">
            <div
              className="p-6 rounded-3xl"
              style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.12)" }}
            >
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">About the Festival</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{festival.longDescription}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Date", value: festival.date, emoji: "📅" },
                { label: "Duration", value: festival.duration, emoji: "⏱" },
                { label: "State", value: festival.state, emoji: "📍" },
                { label: "Weather", value: festival.weather, emoji: "🌤" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl text-center"
                  style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
                >
                  <div className="text-2xl mb-2 hover-wiggle inline-block">{item.emoji}</div>
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="font-bold text-gray-800 text-sm">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Must Experience */}
            <div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                ✨ Must-Experience Moments
              </h3>
              <div className="space-y-3">
                {festival.mustExperience?.map((exp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                    style={{ borderColor: "rgba(255,107,53,0.15)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed pt-1">{exp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Places */}
            <div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
                📍 Best Places to Celebrate
              </h3>
              <div className="flex flex-wrap gap-3">
                {festival.bestPlaces?.map((place) => (
                  <div
                    key={place}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
                    style={{ background: "rgba(255,107,53,0.1)", color: "#E85D04", border: "1px solid rgba(255,107,53,0.2)" }}
                  >
                    <span>🏙️</span>
                    <span>{place}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">🏷️ Tags</h3>
              <div className="flex flex-wrap gap-2">
                {festival.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "rgba(123,45,139,0.1)", color: "#7B2D8B", border: "1px solid rgba(123,45,139,0.2)" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TRADITIONS */}
        {activeTab === "traditions" && (
          <div className="space-y-6 animate-reveal-up">
            <h2 className="font-display text-2xl font-bold text-gray-900">Cultural Traditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {festival.traditions?.map((tradition, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-200"
                  style={{ borderColor: "rgba(0,0,0,0.08)" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${festival.color}20, ${festival.color}40)` }}
                  >
                    {["🙏", "🎵", "💃", "🍽️", "🎨", "🔥", "🌸", "⛵", "🏺", "🪔"][i % 10]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{tradition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FOOD */}
        {activeTab === "food" && (
          <div className="space-y-6 animate-reveal-up">
            <h2 className="font-display text-2xl font-bold text-gray-900">Festival Food & Delicacies</h2>
            <p className="text-gray-500">Taste the flavors that define this celebration.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {festival.food?.map((item, i) => (
                <div
                  key={i}
                  className="group relative p-5 rounded-2xl text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white"
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {["🍮", "🍛", "🥮", "🍜", "🍱", "🥗", "🍚", "🍢", "🧆", "🍩", "🥤", "🍯"][i % 12]}
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{item}</p>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                    style={{ background: `${festival.color}08` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRAVEL */}
        {activeTab === "travel" && (
          <div className="space-y-6 animate-reveal-up">
            <h2 className="font-display text-2xl font-bold text-gray-900">Travel Guide</h2>
            <div className="grid gap-4">
              <div className="p-6 rounded-3xl" style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.12)" }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">💡</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Pro Tip</h3>
                    <p className="text-gray-600">{festival.travelTip}</p>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🌤</span> Weather During Festival
                  </h3>
                  <p className="text-gray-600 text-sm">{festival.weather}</p>
                  <div className="mt-3 p-3 rounded-xl text-sm" style={{ background: "rgba(0,119,182,0.08)", color: "#0077B6" }}>
                    Pack accordingly for {festival.month} weather in {festival.state}.
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid rgba(0,0,0,0.08)" }}>
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📍</span> Top Destinations
                  </h3>
                  <ul className="space-y-2">
                    {festival.bestPlaces?.map((place) => (
                      <li key={place} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)", color: "white" }}>→</span>
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan Trip CTA */}
            <div
              className="p-8 rounded-3xl text-center text-white"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
            >
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="font-display text-2xl font-bold mb-2">
                Ready to Experience {festival.name}?
              </h3>
              <p className="text-white/80 mb-6">
                Let us craft the perfect {festival.duration} festival itinerary for you.
              </p>
              <button
                onClick={() => navigate("planner")}
                className="px-8 py-3 rounded-xl bg-white font-bold transition-all duration-300 hover:scale-105"
                style={{ color: "#FF6B35" }}
              >
                Plan My Trip →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Related Festivals */}
      {relatedFestivals.length > 0 && (
        <div className="py-16 px-4" style={{ background: "#FFF8F0" }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">
              Related Festivals You'll Love
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedFestivals.map((f) => (
                <button
                  key={f.id}
                  onClick={() => navigate("festival", f)}
                  className="text-left group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 hover:-translate-y-2 bg-white"
                >
                  <div className="h-36 img-zoom overflow-hidden">
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{f.emoji}</span>
                      <span className="font-bold text-gray-900 text-sm">{f.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{f.state} · {f.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
