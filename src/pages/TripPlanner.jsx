import { useState } from "react";
import { festivals, indianStates } from "../data/festivals";

const interests = [
  { id: "religious", label: "Religious", emoji: "🕉️" },
  { id: "cultural", label: "Cultural Dance", emoji: "💃" },
  { id: "food", label: "Festival Food", emoji: "🍽️" },
  { id: "photography", label: "Photography", emoji: "📸" },
  { id: "adventure", label: "Adventure", emoji: "🏕️" },
  { id: "family", label: "Family-Friendly", emoji: "👨‍👩‍👧" },
  { id: "tribal", label: "Tribal Heritage", emoji: "🪶" },
  { id: "music", label: "Music & Arts", emoji: "🎵" },
];

const budgets = [
  { id: "budget", label: "Budget", desc: "₹5k–15k", emoji: "💰" },
  { id: "mid", label: "Mid-Range", desc: "₹15k–40k", emoji: "💳" },
  { id: "luxury", label: "Luxury", desc: "₹40k+", emoji: "👑" },
];

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const itineraryTemplates = {
  diwali: {
    title: "✨ Magical Diwali Odyssey",
    subtitle: "5 days across the Festival of Lights",
    festivals: ["Diwali"],
    days: [
      { day: 1, title: "Arrival in Varanasi", activities: ["Check into heritage hotel on the Ghats", "Evening Ganga Aarti — witness 1000+ lamps", "Walk through illuminated lanes of the old city", "Try local street food: Kachori Sabzi & Makkhan Malai"] },
      { day: 2, title: "Dhanteras & Shopping", activities: ["Morning boat ride on Ganges at sunrise", "Dhanteras market — buy silver diyas & jewelry", "Visit Kashi Vishwanath Temple", "Evening: Watch the Ghats come alive with diyas"] },
      { day: 3, title: "Diwali — The Grand Night", activities: ["Lakshmi Puja ceremony at a local family's home", "Witness the lighting of 1 million diyas on the Ghats", "Fireworks spectacle over the Ganges", "Midnight Diwali feast with traditional sweets"] },
      { day: 4, title: "Govardhan Puja & Annakut", activities: ["Morning: Govardhan Puja at local temples", "Annakut feast (108 dishes offered to deity)", "Visit Ramnagar Fort Ramlila ground", "Evening: Bhai Dooj family gathering"] },
      { day: 5, title: "Departure", activities: ["Sunrise boat ride — floating flower offerings", "Souvenir shopping: Banarasi silk & pottery", "Farewell lunch at a rooftop restaurant"] },
    ],
    tips: ["Book ghats-view hotel 3 months early", "Carry earplugs for fireworks nights", "Respect local customs during Puja", "Best photography: Dasaswamedh Ghat at 6 PM"],
    estimatedCost: "₹18,000–₹45,000 per person",
    bestMonth: "October",
  },
  holi: {
    title: "🎨 Holi Color Trail",
    subtitle: "4 days in Braj — the land of Krishna",
    festivals: ["Holi"],
    days: [
      { day: 1, title: "Arrive in Mathura", activities: ["Check into hotel in Mathura/Vrindavan", "Evening visit to Banke Bihari Temple", "Night: Holika Dahan bonfire ceremony", "Singing of bhajans around the fire"] },
      { day: 2, title: "Barsana Lathmar Holi", activities: ["Early morning drive to Barsana village (45 km)", "Witness women beating men with sticks (Lathmar Holi)", "Clouds of gulal at Radha Rani Temple", "Afternoon: Mathura's street Holi with locals"] },
      { day: 3, title: "Vrindavan Flower Holi", activities: ["Banke Bihari Temple's flower Holi (Phool Wali Holi)", "Play Holi with locals in the lanes of Vrindavan", "Drink authentic Thandai with bhang", "Evening: Holi music and dance at ashrams"] },
      { day: 4, title: "Departure", activities: ["Late morning checkout after festivities", "Visit ISKCON Vrindavan temple", "Shopping for gulal, Brij handicrafts", "Depart with colorful memories"] },
    ],
    tips: ["Wear old white clothes you can throw away", "Use organic gulal — protect skin & eyes", "Keep valuables safe in waterproof bags", "Book ahead: Mathura fills completely during Holi"],
    estimatedCost: "₹8,000–₹22,000 per person",
    bestMonth: "March",
  },
  navratri: {
    title: "💃 Navratri Dance Fiesta",
    subtitle: "9 magical nights of Garba in Gujarat",
    festivals: ["Navratri"],
    days: [
      { day: 1, title: "Arrive in Ahmedabad", activities: ["Check into hotel near CG Road or Navrangpura", "Buy chaniya choli (traditional attire) at Law Garden market", "Opening night Garba at Community ground", "Learn basic Garba steps from a local teacher"] },
      { day: 2, title: "Garba Nights Continue", activities: ["Day: Explore Old Ahmedabad's heritage stepwells", "Evening: Garba at multiple venues", "Visit the crafts market for traditional jewelry"] },
      { day: 3, title: "Vadodara Royal Navratri", activities: ["Day trip to Vadodara (2 hrs)", "Evening: Vadodara's UNESCO-recognized Garba ground", "Dandiya Raas with live folk orchestra"] },
      { day: 4, title: "Cultural Immersion", activities: ["Morning: Ashtami puja at Amba Mata temple", "Afternoon: Traditional Navratri food thali", "Night: Grand finale Garba with celebrity musicians"] },
    ],
    tips: ["Get traditional attire from Law Garden, Ahmedabad", "Carry comfortable footwear — you'll dance for hours", "Book tickets for premium Garba grounds in advance", "Stay near the Garba venue to avoid late-night transport"],
    estimatedCost: "₹12,000–₹35,000 per person",
    bestMonth: "October",
  },
  default: {
    title: "🇮🇳 India Festival Discovery Tour",
    subtitle: "Your personalized cultural journey",
    festivals: ["Multiple"],
    days: [
      { day: 1, title: "Arrival & Orientation", activities: ["Check into centrally-located heritage hotel", "Evening orientation walk through the old city", "Welcome dinner featuring regional thali", "Evening light-and-sound show at a heritage site"] },
      { day: 2, title: "Main Festival Day", activities: ["Early morning temple/venue visit before crowds", "Participate in the main festival ritual/celebration", "Photography walk through decorated streets", "Interaction with local artisans and craftspeople"] },
      { day: 3, title: "Deep Cultural Immersion", activities: ["Cooking class: Learn festival-specific recipes", "Afternoon: Museum / heritage walk", "Evening: Folk music and dance performance", "Dinner with a local family"] },
      { day: 4, title: "Festival Highlights", activities: ["Best-of experiences at peak festival time", "Shopping for authentic souvenirs", "Visit local market for regional specialties", "Sunset at the most scenic local viewpoint"] },
      { day: 5, title: "Departure", activities: ["Morning farewell ritual at a local temple", "Final street food breakfast", "Souvenir shopping at the crafts market", "Depart with lifelong memories"] },
    ],
    tips: ["Research local customs and dress codes", "Try to engage with local families", "Book accommodations 2–3 months in advance", "Carry cash — many festival vendors don't accept cards"],
    estimatedCost: "₹12,000–₹35,000 per person",
    bestMonth: "October-November",
  },
};

function ProgressStep({ step, current, label, emoji }) {
  const done = step < current;
  const active = step === current;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
          active ? "scale-110 shadow-lg" : ""
        }`}
        style={{
          background: done ? "linear-gradient(135deg, #22c55e, #16a34a)" : active ? "linear-gradient(135deg, #FF6B35, #FF006E)" : "rgba(0,0,0,0.08)",
          color: done || active ? "white" : "#9ca3af",
        }}
      >
        {done ? "✓" : emoji}
      </div>
      <span className={`text-xs font-medium hidden sm:block ${active ? "text-orange-600" : done ? "text-green-600" : "text-gray-400"}`}>
        {label}
      </span>
    </div>
  );
}

export default function TripPlanner({ navigate }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    month: "",
    duration: "5",
    groupSize: "2",
    state: "",
    budget: "",
    interests: [],
    festivalType: "any",
  });
  const [itinerary, setItinerary] = useState(null);
  const [generating, setGenerating] = useState(false);

  const toggleInterest = (id) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const generateItinerary = () => {
    setGenerating(true);
    setTimeout(() => {
      const month = formData.month.toLowerCase();
      let template = itineraryTemplates.default;
      if (month === "october" || month === "november") template = itineraryTemplates.diwali;
      else if (month === "march" || month === "february") template = itineraryTemplates.holi;
      else if (month === "september" || month === "october") template = itineraryTemplates.navratri;

      const matchedFestivals = festivals
        .filter((f) => f.month === formData.month || Math.random() > 0.5)
        .slice(0, 3);

      setItinerary({
        ...template,
        personalName: formData.name,
        month: formData.month,
        duration: formData.duration,
        groupSize: formData.groupSize,
        state: formData.state,
        budget: budgets.find((b) => b.id === formData.budget)?.label || "Mid-Range",
        matchedFestivals,
      });
      setStep(4);
      setGenerating(false);
    }, 2200);
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.month;
    if (step === 2) return formData.budget;
    if (step === 3) return formData.interests.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ background: "#FFF8F0" }}>
      {/* Hero Banner */}
      <div className="relative py-16 px-4 text-white overflow-hidden" style={{ background: "linear-gradient(135deg, #0d1a2e, #1a0a05, #2d0e08)" }}>
        <div className="absolute inset-0 pointer-events-none">
          {["🗺️","✈️","🎪","🌍","🏕️","🎭"].map((e, i) => (
            <span key={i} className="absolute text-4xl opacity-10 animate-float-up"
              style={{ left: `${i * 17 + 3}%`, top: `${15 + (i % 3) * 30}%`, animationDelay: `${i * 0.6}s` }}>
              {e}
            </span>
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: "rgba(255,107,53,0.2)", border: "1px solid rgba(255,107,53,0.4)", color: "#FFB347" }}>
            🗺️ AI-Powered Festival Trip Planner
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black mb-4">
            <span style={{ background: "linear-gradient(135deg, #FFD700, #FF6B35, #FF006E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Plan Your Dream Festival Trip
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Answer a few questions and get a personalized festival itinerary crafted just for you.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {step < 4 && (
          <>
            {/* Progress Steps */}
            <div className="relative mb-12">
              <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-200" />
              <div
                className="absolute top-5 left-10 h-0.5 transition-all duration-700"
                style={{
                  width: `${((step - 1) / 2) * 80}%`,
                  background: "linear-gradient(90deg, #FF6B35, #FF006E)",
                }}
              />
              <div className="relative flex justify-between">
                <ProgressStep step={1} current={step} label="Basics" emoji="📋" />
                <ProgressStep step={2} current={step} label="Budget" emoji="💰" />
                <ProgressStep step={3} current={step} label="Interests" emoji="❤️" />
              </div>
            </div>
          </>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="animate-reveal-up space-y-6">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">📋</div>
              <h2 className="font-display text-3xl font-black text-gray-900">Tell Us About Your Trip</h2>
              <p className="text-gray-500 mt-2">Just the basics to get started</p>
            </div>

            <div className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border" style={{ borderColor: "rgba(255,107,53,0.1)" }}>
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">👤 Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Priya, Rahul, Sarah..."
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                  style={{ borderColor: "rgba(255,107,53,0.2)" }}
                />
              </div>

              {/* Month */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📅 Travel Month</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {months.map((m) => (
                    <button
                      key={m}
                      onClick={() => setFormData((p) => ({ ...p, month: m }))}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105 ${
                        formData.month === m ? "text-white shadow-md" : "bg-gray-50 text-gray-600 border border-gray-100 hover:bg-orange-50"
                      }`}
                      style={formData.month === m ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" } : {}}
                    >
                      {m.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration & Group */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">⏱ Duration (days)</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData((p) => ({ ...p, duration: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer"
                    style={{ borderColor: "rgba(255,107,53,0.2)" }}
                  >
                    {[3,4,5,7,10,14].map((d) => <option key={d} value={d}>{d} days</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">👥 Group Size</label>
                  <select
                    value={formData.groupSize}
                    onChange={(e) => setFormData((p) => ({ ...p, groupSize: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer"
                    style={{ borderColor: "rgba(255,107,53,0.2)" }}
                  >
                    {["Solo","2","3–5","6–10","10+"].map((g) => <option key={g} value={g}>{g} {g === "Solo" ? "traveler" : "people"}</option>)}
                  </select>
                </div>
              </div>

              {/* State preference */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">📍 Preferred State (optional)</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData((p) => ({ ...p, state: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer"
                  style={{ borderColor: "rgba(255,107,53,0.2)" }}
                >
                  <option value="">Any state — surprise me!</option>
                  {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canProceed()}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                canProceed() ? "text-white hover:scale-105 shadow-xl" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              style={canProceed() ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" } : {}}
            >
              Continue → Budget & Style
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="animate-reveal-up space-y-6">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">💰</div>
              <h2 className="font-display text-3xl font-black text-gray-900">What's Your Budget?</h2>
              <p className="text-gray-500 mt-2">Per person, excluding flights</p>
            </div>

            <div className="space-y-4">
              {budgets.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setFormData((p) => ({ ...p, budget: b.id }))}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.01] text-left`}
                  style={
                    formData.budget === b.id
                      ? { background: "rgba(255,107,53,0.06)", borderColor: "#FF6B35" }
                      : { background: "white", borderColor: "rgba(0,0,0,0.08)" }
                  }
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: formData.budget === b.id ? "linear-gradient(135deg, #FF6B35, #FF006E)" : "rgba(0,0,0,0.05)" }}
                  >
                    {b.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">{b.label}</h3>
                    <p className="text-gray-500 text-sm">{b.desc}</p>
                  </div>
                  {formData.budget === b.id && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}>
                      ✓
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl text-gray-600 font-semibold border bg-white hover:bg-gray-50 transition-all">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceed()}
                className={`flex-2 flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${
                  canProceed() ? "text-white hover:scale-105 shadow-lg" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                style={canProceed() ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" } : {}}
              >
                Continue → Interests
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="animate-reveal-up space-y-6">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">❤️</div>
              <h2 className="font-display text-3xl font-black text-gray-900">What Excites You?</h2>
              <p className="text-gray-500 mt-2">Select all that apply — we'll tailor your journey</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {interests.map((int) => {
                const isSelected = formData.interests.includes(int.id);
                return (
                  <button
                    key={int.id}
                    onClick={() => toggleInterest(int.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105`}
                    style={
                      isSelected
                        ? { background: "rgba(255,107,53,0.08)", borderColor: "#FF6B35" }
                        : { background: "white", borderColor: "rgba(0,0,0,0.08)" }
                    }
                  >
                    <span className={`text-3xl transition-transform duration-300 ${isSelected ? "scale-125" : ""}`}>{int.emoji}</span>
                    <span className={`text-xs font-semibold text-center leading-tight ${isSelected ? "text-orange-600" : "text-gray-600"}`}>
                      {int.label}
                    </span>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce-in" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl text-gray-600 font-semibold border bg-white hover:bg-gray-50 transition-all">
                ← Back
              </button>
              <button
                onClick={generateItinerary}
                disabled={!canProceed() || generating}
                className={`flex-1 flex-2 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  canProceed() ? "text-white hover:scale-105 shadow-xl" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                style={canProceed() ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" } : {}}
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Crafting your perfect trip...
                  </span>
                ) : "✨ Generate My Itinerary!"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — RESULT */}
        {step === 4 && itinerary && (
          <div className="animate-reveal-up space-y-6">
            {/* Header Card */}
            <div className="rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E, #7B2D8B)" }}>
              <div className="absolute inset-0 pointer-events-none">
                {["🎉","🪔","✨","🌟","🎊"].map((e, i) => (
                  <span key={i} className="absolute opacity-20 text-3xl animate-float-up"
                    style={{ left: `${i * 22}%`, top: `${10 + i * 15}%`, animationDelay: `${i * 0.4}s` }}>
                    {e}
                  </span>
                ))}
              </div>
              <div className="relative z-10">
                <div className="text-sm font-medium text-white/70 mb-1">
                  ✨ Personalized for {itinerary.personalName}
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-black mb-1">{itinerary.title}</h2>
                <p className="text-white/80 text-sm mb-4">{itinerary.subtitle}</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: itinerary.month, icon: "📅" },
                    { label: `${itinerary.duration} days`, icon: "⏱" },
                    { label: itinerary.groupSize === "Solo" ? "Solo" : `${itinerary.groupSize} people`, icon: "👥" },
                    { label: itinerary.budget, icon: "💰" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}>
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Day-by-Day */}
            <div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4">📅 Day-by-Day Itinerary</h3>
              <div className="space-y-4">
                {itinerary.days.map((day, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black flex-shrink-0 shadow-lg"
                        style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
                      >
                        {day.day}
                      </div>
                      {i < itinerary.days.length - 1 && (
                        <div className="w-0.5 flex-1 mt-2" style={{ background: "linear-gradient(180deg, #FF6B35, transparent)", minHeight: "24px" }} />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="bg-white rounded-2xl p-4 shadow-sm border" style={{ borderColor: "rgba(255,107,53,0.1)" }}>
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <span>Day {day.day}:</span>
                          <span style={{ color: "#FF6B35" }}>{day.title}</span>
                        </h4>
                        <ul className="space-y-2">
                          {day.activities.map((act, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                              <span
                                className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0 mt-0.5"
                                style={{ background: `rgba(255,107,53,${0.4 + j * 0.1})` }}
                              >
                                {j + 1}
                              </span>
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border" style={{ borderColor: "rgba(255,107,53,0.1)" }}>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-xl">💡</span> Expert Travel Tips
              </h3>
              <ul className="space-y-3">
                {itinerary.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
                    >
                      ✓
                    </div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cost Estimate */}
            <div className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.15)" }}>
              <span className="text-3xl">💸</span>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Estimated Budget</p>
                <p className="font-black text-gray-900 text-lg">{itinerary.estimatedCost}</p>
                <p className="text-xs text-gray-400">Including accommodation, local transport & meals. Excludes flights.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { setStep(1); setFormData({ name:"", month:"", duration:"5", groupSize:"2", state:"", budget:"", interests:[], festivalType:"any" }); setItinerary(null); }}
                className="py-4 rounded-2xl font-bold text-gray-700 border-2 bg-white hover:bg-gray-50 transition-all hover:scale-105"
                style={{ borderColor: "rgba(255,107,53,0.3)" }}
              >
                🔄 Plan Another Trip
              </button>
              <button
                onClick={() => navigate("home")}
                className="py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 shadow-xl"
                style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
              >
                🎉 Explore Festivals
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
