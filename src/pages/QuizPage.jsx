import React, { useState, useEffect } from 'react'

const QUESTIONS = [
  {
    q: 'Which festival is celebrated as the "Festival of Colors" in India?',
    options: ['Diwali', 'Holi', 'Navratri', 'Pongal'],
    answer: 1,
    fact: 'Holi celebrates the arrival of spring and the victory of good over evil. The tradition of playing with colors originated in Mathura-Vrindavan.',
    state: 'Uttar Pradesh',
  },
  {
    q: 'Durga Puja is the biggest festival of which Indian state?',
    options: ['Maharashtra', 'Tamil Nadu', 'West Bengal', 'Rajasthan'],
    answer: 2,
    fact: 'Kolkata\'s Durga Puja is a UNESCO Intangible Cultural Heritage. The city spends over ₹32,000 crore during the festival season!',
    state: 'West Bengal',
  },
  {
    q: 'What is the traditional dance performed during Navratri in Gujarat?',
    options: ['Bharatanatyam', 'Kathak', 'Garba', 'Bihu'],
    answer: 2,
    fact: 'Garba is performed around a central oil-lit lamp called the "Garbha Deep," symbolizing the womb of the universe.',
    state: 'Gujarat',
  },
  {
    q: 'Which harvest festival is celebrated in Tamil Nadu to thank the Sun god?',
    options: ['Onam', 'Baisakhi', 'Bihu', 'Pongal'],
    answer: 3,
    fact: 'Pongal spans 4 days — Bhogi, Thai Pongal, Maattu Pongal, and Kaanum Pongal. The word "Pongal" means "to boil over."',
    state: 'Tamil Nadu',
  },
  {
    q: 'The Pushkar Camel Fair is held in which state?',
    options: ['Gujarat', 'Rajasthan', 'Punjab', 'Haryana'],
    answer: 1,
    fact: 'The Pushkar Camel Fair is one of the world\'s largest camel fairs, attracting over 200,000 visitors from around the globe.',
    state: 'Rajasthan',
  },
  {
    q: 'Onam is a harvest festival celebrated primarily in which Indian state?',
    options: ['Andhra Pradesh', 'Karnataka', 'Kerala', 'Goa'],
    answer: 2,
    fact: 'The Onam Sadya (feast) consists of 26+ traditional dishes served on a banana leaf, making it one of India\'s grandest meals.',
    state: 'Kerala',
  },
  {
    q: 'What does "Diwali" literally mean?',
    options: ['Festival of Fire', 'Row of Lamps', 'Victory of Light', 'Night of Stars'],
    answer: 1,
    fact: 'Diwali (Deepavali) means "Row of Lamps" in Sanskrit. The festival lasts 5 days and is celebrated by Hindus, Jains, Sikhs, and some Buddhists.',
    state: 'Pan India',
  },
  {
    q: 'The Bihu dance is the traditional dance of which northeastern state?',
    options: ['Manipur', 'Meghalaya', 'Assam', 'Nagaland'],
    answer: 2,
    fact: 'Assam has three Bihus — Rongali (spring), Kongali (autumn), and Bhogali (winter). Bihu was performed by farmers in the fields originally.',
    state: 'Assam',
  },
  {
    q: 'Which festival marks the birth of Lord Ganesha?',
    options: ['Ganesh Chaturthi', 'Krishna Janmashtami', 'Navratri', 'Ram Navami'],
    answer: 0,
    fact: 'Ganesh Chaturthi was popularized as a public festival by Lokmanya Bal Gangadhar Tilak in 1893 to unite Indians during independence movement.',
    state: 'Maharashtra',
  },
  {
    q: 'Baisakhi is a major harvest festival for which community?',
    options: ['Hindus', 'Muslims', 'Sikhs', 'Christians'],
    answer: 2,
    fact: 'Baisakhi also marks the founding of the Khalsa Panth by Guru Gobind Singh in 1699 — one of the most significant events in Sikh history.',
    state: 'Punjab',
  },
  {
    q: 'The famous Rath Yatra (chariot festival) originates from which city?',
    options: ['Mathura', 'Varanasi', 'Puri', 'Ayodhya'],
    answer: 2,
    fact: 'Puri\'s Rath Yatra is the world\'s oldest and biggest chariot festival. The massive chariots are over 45 feet tall and require thousands of devotees to pull.',
    state: 'Odisha',
  },
  {
    q: 'What is the special dish prepared during Ganesh Chaturthi?',
    options: ['Ladoo', 'Modak', 'Barfi', 'Halwa'],
    answer: 1,
    fact: 'Modak is considered Lord Ganesha\'s favorite food. The steamed rice dumpling filled with coconut and jaggery is offered as bhog (sacred food).',
    state: 'Maharashtra',
  },
  {
    q: 'The Goa Carnival was introduced by which colonial rulers?',
    options: ['British', 'French', 'Portuguese', 'Dutch'],
    answer: 2,
    fact: 'The Goa Carnival dates back to the 18th century when Portuguese rulers brought this pre-Lent tradition to India. It\'s now a major 4-day street festival.',
    state: 'Goa',
  },
  {
    q: 'Which flower is traditionally used for the Pookalam (flower carpet) during Onam?',
    options: ['Marigold', 'Lotus', 'Thumba', 'Rose'],
    answer: 0,
    fact: 'The Pookalam (Athapookalam) is laid out during all 10 days of Onam. Intricate designs are made using 8-10 different types of flowers.',
    state: 'Kerala',
  },
  {
    q: 'The "Kumbh Mela" is held at how many locations in India?',
    options: ['Two', 'Three', 'Four', 'Six'],
    answer: 2,
    fact: 'Kumbh Mela rotates between four cities: Prayagraj, Haridwar, Nashik, and Ujjain. The Prayagraj Kumbh is the world\'s largest religious gathering.',
    state: 'Uttar Pradesh',
  },
]

const EMOJIS = ['🎉','🎊','🎪','🎭','🏆','⭐','🌟','💫','✨','🎆']

const QuizPage = ({ navigate }) => {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState([])
  const [showFact, setShowFact] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [timerActive, setTimerActive] = useState(true)

  const q = QUESTIONS[current]
  const progress = ((current) / QUESTIONS.length) * 100

  useEffect(() => {
    setTimeLeft(15)
    setTimerActive(true)
    setShowFact(false)
    setSelected(null)
  }, [current])

  useEffect(() => {
    if (!timerActive || selected !== null || finished) return
    if (timeLeft <= 0) {
      handleSelect(-1)
      return
    }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000)
    return () => clearInterval(id)
  }, [timeLeft, timerActive, selected, finished])

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
    setTimerActive(false)
    setShowFact(true)
    const isCorrect = idx === q.answer
    if (isCorrect) setScore(s => s + 1)
    setAnswers(a => [...a, { question: q.q, correct: isCorrect, selected: idx, answer: q.answer }])
  }

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true)
    } else {
      setCurrent(c => c + 1)
    }
  }

  const handleRestart = () => {
    setCurrent(0); setSelected(null); setScore(0); setFinished(false); setAnswers([]); setShowFact(false)
  }

  const pct = Math.round((score / QUESTIONS.length) * 100)

  if (finished) {
    const grade = pct >= 80 ? { label: 'Festival Expert! 🏆', color: 'from-amber-500 to-orange-500', msg: 'Outstanding! You know Indian festivals inside out!' }
      : pct >= 60 ? { label: 'Culture Enthusiast! ⭐', color: 'from-orange-500 to-rose-500', msg: 'Great job! You have solid knowledge of Indian festivals.' }
      : pct >= 40 ? { label: 'Culture Learner! 📚', color: 'from-violet-500 to-purple-500', msg: 'Good start! Explore more festivals to increase your score.' }
      : { label: 'Keep Exploring! 🌱', color: 'from-teal-500 to-cyan-500', msg: 'India\'s festival culture is vast — keep exploring!' }

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 dark:from-gray-950 dark:to-gray-900 pt-24 pb-20 flex items-center">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-orange-100 dark:border-orange-900/20">
            <div className={`bg-gradient-to-r ${grade.color} p-10 text-center text-white`}>
              <div className="text-7xl mb-4">{EMOJIS[Math.floor(pct / 10)]}</div>
              <h2 className="text-3xl font-black mb-2" style={{fontFamily: "'Playfair Display', serif"}}>{grade.label}</h2>
              <p className="text-white/80 text-lg mb-6">{grade.msg}</p>
              <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
                <div className="text-center">
                  <div className="text-4xl font-black">{score}</div>
                  <div className="text-sm text-white/80">Correct</div>
                </div>
                <div className="text-white/40 text-2xl">/</div>
                <div className="text-center">
                  <div className="text-4xl font-black">{QUESTIONS.length}</div>
                  <div className="text-sm text-white/80">Total</div>
                </div>
                <div className="text-white/40 text-2xl">·</div>
                <div className="text-center">
                  <div className="text-4xl font-black">{pct}%</div>
                  <div className="text-sm text-white/80">Score</div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Answer review */}
              <h3 className="font-black text-gray-900 dark:text-white mb-4 text-lg" style={{fontFamily: "'Playfair Display', serif"}}>Answer Review</h3>
              <div className="space-y-2 mb-8 max-h-64 overflow-y-auto pr-1">
                {answers.map((a, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${a.correct ? 'bg-emerald-50 dark:bg-emerald-950/20' : 'bg-red-50 dark:bg-red-950/20'}`}>
                    <span className="flex-shrink-0 text-lg">{a.correct ? '✅' : '❌'}</span>
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-snug">{QUESTIONS[i].q.slice(0, 60)}...</div>
                      {!a.correct && a.selected !== -1 && (
                        <div className="text-xs text-red-500 mt-0.5">Your answer: {QUESTIONS[i].options[a.selected]}</div>
                      )}
                      {!a.correct && (
                        <div className="text-xs text-emerald-600 mt-0.5">Correct: {QUESTIONS[i].options[QUESTIONS[i].answer]}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={handleRestart} className="flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
                  style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}>
                  🔄 Try Again
                </button>
                <button onClick={() => navigate('home')} className="flex-1 py-4 rounded-2xl font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                  🎪 Explore Festivals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 dark:from-gray-950 dark:to-gray-900 pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-semibold mb-5">
            🎮 Cultural Quiz
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
            Festival <span className="gradient-text">Challenge</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Test your knowledge of India's incredible festivals!</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500"
              style={{width: `${progress}%`, background: 'linear-gradient(90deg, #FF6B35, #FF006E)'}}/>
          </div>
          <div className="text-sm font-bold text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {current + 1} / {QUESTIONS.length}
          </div>
          <div className="flex items-center gap-1 text-sm font-bold text-emerald-600">
            ✓ {score}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-orange-100 dark:border-orange-900/20 overflow-hidden">
          {/* Timer bar */}
          <div className="h-1.5 bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full transition-all duration-1000 linear"
              style={{
                width: `${(timeLeft / 15) * 100}%`,
                background: timeLeft > 8 ? '#22c55e' : timeLeft > 4 ? '#f59e0b' : '#ef4444'
              }}
            />
          </div>

          <div className="p-7 sm:p-9">
            {/* Timer + state badge */}
            <div className="flex items-center justify-between mb-6">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm ${
                timeLeft > 8 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                : timeLeft > 4 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                : 'bg-red-100 text-red-600 dark:bg-red-950/30 dark:text-red-400'
              }`}>
                ⏱ {timeLeft}s
              </div>
              <div className="px-3 py-1.5 bg-orange-50 dark:bg-orange-950/30 rounded-xl text-xs font-bold text-orange-600 dark:text-orange-400">
                📍 {q.state}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-8 leading-snug" style={{fontFamily: "'Playfair Display', serif"}}>
              {q.q}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {q.options.map((opt, i) => {
                let cls = 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-orange-300 hover:-translate-y-0.5'
                if (selected !== null) {
                  if (i === q.answer) cls = 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-400'
                  else if (i === selected && selected !== q.answer) cls = 'bg-red-50 dark:bg-red-950/30 text-red-600 border-2 border-red-400'
                  else cls = 'bg-gray-50 dark:bg-gray-800 text-gray-400 border-2 border-transparent opacity-60'
                } else if (selected === null) {
                  cls += ' cursor-pointer'
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={selected !== null}
                    className={`p-4 rounded-2xl font-semibold text-sm text-left transition-all duration-200 ${cls}`}
                  >
                    <span className="mr-2 font-black text-orange-500">{['A','B','C','D'][i]}.</span>
                    {opt}
                    {selected !== null && i === q.answer && <span className="ml-2">✅</span>}
                    {selected !== null && i === selected && selected !== q.answer && <span className="ml-2">❌</span>}
                  </button>
                )
              })}
            </div>

            {/* Fact box */}
            {showFact && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/30 mb-6">
                <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 mb-2">
                  💡 Did you know?
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">{q.fact}</p>
              </div>
            )}

            {/* Next button */}
            {selected !== null && (
              <button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{background: 'linear-gradient(135deg, #FF6B35, #FF006E)'}}
              >
                {current + 1 >= QUESTIONS.length ? '🏆 See Results' : 'Next Question →'}
              </button>
            )}
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>Score: <strong className="text-orange-600">{score}</strong> / {current + (selected !== null ? 1 : 0)}</span>
          <button onClick={() => navigate('home')} className="text-orange-500 hover:underline font-medium">Exit Quiz</button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage