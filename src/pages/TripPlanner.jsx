import React, { useState } from 'react'
import festivalsData from '../data/festivals.json'

const budgetRanges = [
  { id: 'budget', label: '₹5,000 – ₹15,000', icon: '🎒', desc: 'Backpacker' },
  { id: 'mid', label: '₹15,000 – ₹50,000', icon: '✈️', desc: 'Mid-range' },
  { id: 'luxury', label: '₹50,000+', icon: '👑', desc: 'Luxury' },
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const STATES = ['Pan India', 'Rajasthan', 'Maharashtra', 'West Bengal', 'Gujarat', 'Punjab', 'Kerala', 'Tamil Nadu', 'Uttar Pradesh', 'Goa', 'Assam', 'Odisha', 'Karnataka', 'Hyderabad']

export default function TripPlanner({ navigate }) {
  const [step, setStep] = useState(1)
  const [state, setState] = useState('')
  const [month, setMonth] = useState('')
  const [budget, setBudget] = useState('')
  const [results, setResults] = useState([])

  const generate = () => {
    let filtered = festivalsData.filter(f => {
      const matchState = !state || f.state === state || f.state === 'Pan India' || (f.region && state === f.region)
      const matchMonth = !month || f.month === month
      return matchState && matchMonth
    })
    if (!filtered.length) filtered = festivalsData.slice(0, 3)
    setResults(filtered.slice(0, 4))
    setStep(4)
  }

  const reset = () => { setStep(1); setState(''); setMonth(''); setBudget(''); setResults([]) }

  const tipsByBudget = {
    budget: ['Book state transport buses for travel', 'Stay in dharamshalas or hostels near the venue', 'Eat at local dhabas and street food stalls', 'Join free community events and langars'],
    mid: ['Book trains/flights 2–3 months in advance', 'Mid-range hotels in the city centre', 'Hire a local guide for cultural immersion', 'Book tourism department festival packages'],
    luxury: ['Private heritage hotel or tent resort', 'Hire a personal guide and AC vehicle', 'Pre-book VIP festival passes', 'Curated culinary and cultural experiences'],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-24 page-enter">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-5">
            🗺️ Festival Trip Planner
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Plan Your <span style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Festival Journey</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Answer 3 quick questions and get a personalised festival itinerary.</p>
        </div>

        {/* Progress */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s ? 'text-white shadow-lg' : 'bg-white dark:bg-gray-900 text-gray-400 border border-gray-200 dark:border-gray-700'
                }`} style={step >= s ? { background: 'linear-gradient(135deg, #FF6B35, #FF006E)' } : {}}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 max-w-16 h-1 rounded-full transition-all ${step > s ? 'bg-orange-400' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Step 1: State */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-orange-100 dark:border-orange-900/20">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>📍 Where do you want to go?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Choose a state or region</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {STATES.map(s => (
                <button key={s} onClick={() => setState(s)}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                    state === s ? 'text-white shadow-md scale-105' : 'bg-orange-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20'
                  }`}
                  style={state === s ? { background: 'linear-gradient(135deg, #FF6B35, #FF006E)' } : {}}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => { setState(''); setStep(2) }} className="text-sm text-gray-400 hover:text-gray-600 underline">Skip (show all states)</button>
              <button onClick={() => setStep(2)}
                className="px-8 py-3 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Month */}
        {step === 2 && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-orange-100 dark:border-orange-900/20">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>📅 When do you plan to visit?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Pick your travel month</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
              {MONTHS.map(m => (
                <button key={m} onClick={() => setMonth(m)}
                  className={`py-3 rounded-xl font-semibold text-sm transition-all ${
                    month === m ? 'text-white shadow-md scale-105' : 'bg-orange-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-950/30 border border-orange-100 dark:border-orange-900/20'
                  }`}
                  style={month === m ? { background: 'linear-gradient(135deg, #FF6B35, #FF006E)' } : {}}>
                  {m.slice(0, 3)}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-6 py-3 rounded-2xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all">← Back</button>
              <button onClick={() => setStep(3)} className="px-8 py-3 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 3: Budget */}
        {step === 3 && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-orange-100 dark:border-orange-900/20">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>💰 What is your budget?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Per person, including travel and accommodation</p>
            <div className="space-y-3 mb-8">
              {budgetRanges.map(b => (
                <button key={b.id} onClick={() => setBudget(b.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 font-semibold transition-all ${
                    budget === b.id ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30 shadow-md' : 'border-orange-100 dark:border-orange-900/20 bg-white dark:bg-gray-900 hover:border-orange-300'
                  }`}>
                  <span className="text-3xl">{b.icon}</span>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 dark:text-white">{b.label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{b.desc}</div>
                  </div>
                  {budget === b.id && <span className="ml-auto text-orange-500 text-xl">✓</span>}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="px-6 py-3 rounded-2xl font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all">← Back</button>
              <button onClick={generate} className="px-8 py-3 rounded-2xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }}>
                🎪 Find Festivals!
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 4 && (
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-orange-100 dark:border-orange-900/20 mb-6">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xl font-black text-gray-900 dark:text-white" style={{ fontFamily: "'Playfair Display', serif" }}>✨ Your Personalised Festival Plan</h2>
                <button onClick={reset} className="text-sm text-orange-600 hover:underline font-semibold">Start over</button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                {state && <span className="bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/20">📍 {state}</span>}
                {month && <span className="bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/20">📅 {month}</span>}
                {budget && <span className="bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900/20">💰 {budgetRanges.find(b => b.id === budget)?.label}</span>}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {results.map((f, i) => (
                <div key={f.id} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-orange-100 dark:border-orange-900/20 shadow-sm flex gap-0 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <img src={f.image} alt={f.name} className="w-32 h-full object-cover flex-shrink-0"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=60' }} />
                  <div className="p-5 flex-1">
                    <div className="text-xs font-bold text-orange-500 mb-1">Day {i + 1} Highlight</div>
                    <h3 className="font-black text-gray-900 dark:text-white text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{f.name}</h3>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">📍 {f.state} · 📅 {f.date} · ⏱ {f.duration}</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{f.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => navigate('festival', f)}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:shadow-md"
                        style={{ background: 'linear-gradient(135deg, #FF6B35, #FF006E)' }}>
                        View Details →
                      </button>
                      <a href={f.bookingUrl || 'https://www.incredibleindia.org'} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all">
                        Book →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {budget && tipsByBudget[budget] && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-orange-100 dark:border-orange-900/20 shadow-sm">
                <h3 className="font-black text-gray-900 dark:text-white mb-4">💡 {budgetRanges.find(b => b.id === budget)?.desc} Travel Tips</h3>
                <div className="space-y-2">
                  {tipsByBudget[budget].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-orange-400 mt-0.5">•</span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}