import { useState, useEffect, useRef } from "react";
import { quizQuestions } from "../data/festivals";

const TOTAL = quizQuestions.length;
const TIME_PER_Q = 20;

function ConfettiPiece({ style }) {
  return <div className="absolute w-2 h-3 rounded-sm pointer-events-none" style={style} />;
}

export default function QuizPage({ navigate }) {
  const [phase, setPhase] = useState("start"); // start | quiz | result
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [showExplain, setShowExplain] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const timerRef = useRef(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [hoveredOption, setHoveredOption] = useState(null);

  // Timer
  useEffect(() => {
    if (phase !== "quiz" || selected !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(-1); // timeout
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, current, selected]);

  const spawnConfetti = () => {
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 40}%`,
      background: ["#FF6B35", "#FF006E", "#FFD700", "#7B2D8B", "#0077B6", "#2D6A4F"][i % 6],
      animationDuration: `${0.8 + Math.random() * 1.2}s`,
      animationDelay: `${Math.random() * 0.5}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
      animation: `confetti-fall ${0.8 + Math.random() * 1.5}s ease-in forwards`,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleAnswer = (optIdx) => {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    setSelected(optIdx);
    setShowExplain(true);
    const q = quizQuestions[current];
    const isCorrect = optIdx === q.correct;
    const newAnswers = [...answers, { question: q.id, selected: optIdx, correct: isCorrect, time: TIME_PER_Q - timeLeft }];
    setAnswers(newAnswers);
    if (isCorrect) {
      spawnConfetti();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak((s) => Math.max(s, newStreak));
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (current + 1 >= TOTAL) {
      setPhase("result");
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setShowExplain(false);
    setTimeLeft(TIME_PER_Q);
    setHoveredOption(null);
  };

  const restart = () => {
    setPhase("start");
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setTimeLeft(TIME_PER_Q);
    setShowExplain(false);
    setStreak(0);
    setMaxStreak(0);
    setHoveredOption(null);
  };

  const score = answers.filter((a) => a.correct).length;
  const pct = Math.round((score / TOTAL) * 100);

  const getGrade = () => {
    if (pct >= 90) return { label: "Festival Guru!", emoji: "🏆", color: "#FFD700", msg: "You're an Indian culture master! Extraordinary knowledge." };
    if (pct >= 70) return { label: "Culture Champion", emoji: "🥇", color: "#FF6B35", msg: "Impressive! You know India's festivals very well." };
    if (pct >= 50) return { label: "Festival Explorer", emoji: "🌟", color: "#FF006E", msg: "Good effort! Keep exploring India's rich traditions." };
    return { label: "Budding Learner", emoji: "📚", color: "#7B2D8B", msg: "Every expert was once a beginner. Keep learning!" };
  };

  const q = quizQuestions[current];
  const timerPct = (timeLeft / TIME_PER_Q) * 100;
  const timerColor = timeLeft > 10 ? "#22c55e" : timeLeft > 5 ? "#f59e0b" : "#ef4444";

  // ===== START SCREEN =====
  if (phase === "start") {
    return (
      <div className="min-h-screen pt-20 pb-20 flex flex-col" style={{ background: "linear-gradient(160deg, #FFF8F0 0%, #FFF0E0 50%, #FFE8D0 100%)" }}>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-xl w-full text-center">
            {/* Floating emojis */}
            <div className="relative h-32 mb-2 pointer-events-none">
              {["🪔","🎨","🌺","🐘","💃","🌾","🐪","🦅","🌙"].map((e, i) => (
                <span
                  key={i}
                  className="absolute text-3xl animate-float-up opacity-70"
                  style={{
                    left: `${8 + i * 10}%`,
                    top: `${10 + (i % 3) * 28}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${3 + i * 0.4}s`,
                  }}
                >
                  {e}
                </span>
              ))}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce-in"
              style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.25)", color: "#FF6B35" }}>
              🎮 Cultural Knowledge Quiz
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
              How Well Do You
              <span className="block" style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Know India?
              </span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Test your knowledge of India's incredible festival traditions —
              from ancient Vedic rituals to modern tribal celebrations.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { label: "Questions", value: TOTAL, emoji: "❓" },
                { label: "Seconds/Q", value: TIME_PER_Q, emoji: "⏱" },
                { label: "Difficulty", value: "Mixed", emoji: "⚡" },
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white shadow-sm border text-center" style={{ borderColor: "rgba(255,107,53,0.15)" }}>
                  <div className="text-2xl mb-1">{s.emoji}</div>
                  <div className="font-black text-xl text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-400 font-medium">{s.label}</div>
                </div>
              ))}
            </div>

            {/* START BUTTON */}
            <button
              onClick={() => setPhase("quiz")}
              className="group relative w-full py-5 rounded-2xl text-white font-black text-xl overflow-hidden transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-2xl">🚀</span>
                Start the Quiz!
                <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "linear-gradient(135deg, #E85D04, #c9005a)" }} />
            </button>

            <p className="text-xs text-gray-400 mt-4">
              Each question has {TIME_PER_Q} seconds. No skipping. Let's see what you know! 🇮🇳
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ===== RESULT SCREEN =====
  if (phase === "result") {
    const grade = getGrade();
    return (
      <div className="min-h-screen pt-20 pb-20 px-4" style={{ background: "linear-gradient(160deg, #FFF8F0 0%, #FFF0E0 50%, #FFE8D0 100%)" }}>
        <div className="max-w-2xl mx-auto">
          {/* Grade Card */}
          <div className="text-center mb-8 animate-bounce-in">
            <div className="text-8xl mb-4">{grade.emoji}</div>
            <h1 className="font-display text-4xl font-black text-gray-900 mb-2">{grade.label}</h1>
            <p className="text-gray-500 text-lg">{grade.msg}</p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 339.3} 339.3`}
                  className="transition-all duration-1500"
                  style={{ filter: `drop-shadow(0 0 8px ${grade.color})` }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#FF006E" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-black text-4xl text-gray-900">{pct}%</span>
                <span className="text-gray-500 text-sm font-medium">{score}/{TOTAL} correct</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Correct", value: score, emoji: "✅", color: "#22c55e" },
              { label: "Wrong", value: TOTAL - score, emoji: "❌", color: "#ef4444" },
              { label: "Best Streak", value: maxStreak, emoji: "🔥", color: "#FF6B35" },
            ].map((s, i) => (
              <div key={i} className="text-center p-5 rounded-2xl bg-white shadow-sm border" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="font-black text-2xl" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-gray-400 font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Answer Review */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border mb-8" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">📋 Question Review</h3>
            <div className="space-y-3">
              {quizQuestions.map((q, i) => {
                const ans = answers[i];
                if (!ans) return null;
                return (
                  <div key={q.id} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: ans.correct ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)" }}>
                    <span className="text-lg flex-shrink-0">{ans.correct ? "✅" : "❌"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{q.question}</p>
                      {!ans.correct && (
                        <p className="text-xs text-green-600 mt-1">
                          ✓ Correct: {q.options[q.correct]}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0 font-medium">{q.difficulty}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restart}
              className="flex-1 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
            >
              🔄 Play Again
            </button>
            <button
              onClick={() => navigate("home")}
              className="flex-1 py-4 rounded-2xl font-bold text-gray-700 text-lg border-2 bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              style={{ borderColor: "rgba(255,107,53,0.3)" }}
            >
              🏠 Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== QUIZ SCREEN =====
  return (
    <div className="min-h-screen pt-20 pb-20 px-4 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #FFF8F0 0%, #FFF0E0 50%, #FFE8D0 100%)" }}>
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((c) => (
          <ConfettiPiece key={c.id} style={c} />
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-700 text-sm">Question {current + 1} of {TOTAL}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{
                background: q.difficulty === "Easy" ? "rgba(34,197,94,0.15)" : q.difficulty === "Medium" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                color: q.difficulty === "Easy" ? "#16a34a" : q.difficulty === "Medium" ? "#d97706" : "#dc2626",
              }}>
                {q.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {streak >= 2 && (
                <span className="text-xs font-bold text-orange-500 animate-bounce-in">
                  🔥 {streak} streak!
                </span>
              )}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm"
                style={{ background: `${timerColor}20`, color: timerColor, border: `1.5px solid ${timerColor}40` }}
              >
                ⏱ {timeLeft}s
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${((current) / TOTAL) * 100}%`, background: "linear-gradient(90deg, #FF6B35, #FF006E)" }}
            />
          </div>
          {/* Timer bar */}
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 linear"
              style={{ width: `${timerPct}%`, background: timerColor }}
            />
          </div>
          {/* Score dots */}
          <div className="flex gap-1.5 mt-2">
            {quizQuestions.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full transition-all duration-500"
                style={{
                  background: i < answers.length
                    ? answers[i].correct ? "#22c55e" : "#ef4444"
                    : i === current ? "#FF6B35" : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div
          key={current}
          className="bg-white rounded-3xl p-8 shadow-xl mb-6 animate-reveal-up"
          style={{ border: "1px solid rgba(255,107,53,0.1)", boxShadow: "0 20px 60px rgba(255,107,53,0.1)" }}
        >
          <div className="text-center mb-6">
            <span className="text-5xl mb-4 inline-block animate-bounce-in">{q.emoji}</span>
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {q.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correct;
              const isWrong = isSelected && !isCorrect;
              const showGreen = selected !== null && isCorrect;
              const showRed = selected !== null && isWrong;
              const isHovered = hoveredOption === i && selected === null;

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  onMouseEnter={() => setHoveredOption(i)}
                  onMouseLeave={() => setHoveredOption(null)}
                  disabled={selected !== null}
                  className="relative w-full text-left p-4 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center gap-3 group"
                  style={{
                    background: showGreen
                      ? "rgba(34,197,94,0.12)"
                      : showRed
                      ? "rgba(239,68,68,0.12)"
                      : isHovered
                      ? "rgba(255,107,53,0.08)"
                      : "rgba(0,0,0,0.03)",
                    border: showGreen
                      ? "2px solid #22c55e"
                      : showRed
                      ? "2px solid #ef4444"
                      : isHovered
                      ? "2px solid rgba(255,107,53,0.4)"
                      : "2px solid rgba(0,0,0,0.08)",
                    transform: isHovered && selected === null ? "scale(1.02)" : "scale(1)",
                    color: showGreen ? "#16a34a" : showRed ? "#dc2626" : "#374151",
                    cursor: selected !== null ? "default" : "pointer",
                  }}
                >
                  {/* Letter badge */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-300"
                    style={{
                      background: showGreen
                        ? "#22c55e"
                        : showRed
                        ? "#ef4444"
                        : isHovered
                        ? "linear-gradient(135deg, #FF6B35, #FF006E)"
                        : "rgba(0,0,0,0.08)",
                      color: showGreen || showRed || isHovered ? "white" : "#6b7280",
                    }}
                  >
                    {showGreen ? "✓" : showRed ? "✗" : ["A", "B", "C", "D"][i]}
                  </div>
                  <span className="flex-1 leading-tight">{opt}</span>
                  {showGreen && <span className="text-lg animate-bounce-in">✅</span>}
                  {showRed && <span className="text-lg animate-bounce-in">❌</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplain && (
          <div
            className="rounded-2xl p-5 mb-6 animate-slide-up-fade"
            style={{
              background: answers[current]?.correct ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
              border: `1.5px solid ${answers[current]?.correct ? "#22c55e40" : "#ef444440"}`,
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{answers[current]?.correct ? "🎉" : "💡"}</span>
              <div>
                <p className="font-bold text-gray-900 mb-1">
                  {answers[current]?.correct
                    ? streak > 1 ? `${streak} in a row! 🔥` : "Correct!"
                    : "Not quite!"}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{q.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next Button */}
        {selected !== null && (
          <button
            onClick={nextQuestion}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl animate-slide-up-fade"
            style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
          >
            {current + 1 >= TOTAL ? "🏁 See Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}
