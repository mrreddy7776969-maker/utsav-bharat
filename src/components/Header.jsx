import { useState, useEffect, useRef } from "react";

const navItems = [
  { id: "home", label: "Home", emoji: "🏠", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "calendar", label: "Calendar", emoji: "📅", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "planner", label: "Trip Planner", emoji: "🗺️", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { id: "quiz", label: "Quiz", emoji: "🎮", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
];

export default function Header({ navigate, currentPage, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleNav = (id) => {
    navigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 shadow-2xl"
            : "py-4"
        }`}
        style={{
          background: scrolled
            ? darkMode
              ? "rgba(10,10,15,0.95)"
              : "rgba(255,248,240,0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,107,53,0.15)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110"
                  style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
                >
                  <span className="animate-diya">🪔</span>
                </div>
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md"
                  style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-display font-black text-xl leading-none"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35, #FF006E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Utsav Bharat
                </span>
                <span
                  className={`text-[10px] font-medium tracking-widest uppercase ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Discover India
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    currentPage === item.id
                      ? "text-white shadow-lg"
                      : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={
                    currentPage === item.id
                      ? { background: "linear-gradient(135deg, #FF6B35, #FF006E)" }
                      : hoveredItem === item.id
                      ? {
                          background: darkMode
                            ? "rgba(255,107,53,0.15)"
                            : "rgba(255,107,53,0.08)",
                        }
                      : {}
                  }
                >
                  <span
                    className={`text-base transition-transform duration-300 ${
                      hoveredItem === item.id ? "scale-125" : "scale-100"
                    }`}
                  >
                    {item.emoji}
                  </span>
                  <span className="hidden lg:block">{item.label}</span>
                  {currentPage === item.id && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-orange-50"
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "text-yellow-400 hover:bg-gray-800"
                    : "text-gray-600 hover:bg-orange-50"
                }`}
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* CTA Button */}
              <button
                onClick={() => handleNav("planner")}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
              >
                <span>Plan Trip</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
                  darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-orange-50"
                }`}
              >
                <div className="flex flex-col gap-1.5 w-5">
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      mobileOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      mobileOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                      mobileOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div
            className={`absolute top-full left-0 right-0 p-4 shadow-2xl border-t transition-all duration-300 animate-slide-up-fade ${
              darkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-orange-100"
            }`}
          >
            <div className="max-w-2xl mx-auto relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search festivals, states, traditions..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-orange-400"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchOpen(false);
                }}
              />
              <div className="flex gap-2 mt-3 flex-wrap">
                {["Diwali", "Holi", "Navratri", "Kerala", "Rajasthan"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchOpen(false);
                      navigate("home");
                    }}
                    className="px-3 py-1 rounded-full text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 p-6 pt-24 flex flex-col gap-2 transition-transform duration-300 shadow-2xl ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          } ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 animate-reveal-right`}
              style={{
                animationDelay: `${i * 0.05}s`,
                animationFillMode: "both",
                background:
                  currentPage === item.id
                    ? "linear-gradient(135deg, #FF6B35, #FF006E)"
                    : "transparent",
                color:
                  currentPage === item.id
                    ? "white"
                    : darkMode
                    ? "#e5e7eb"
                    : "#374151",
              }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => { navigate("planner"); setMobileOpen(false); }}
              className="w-full py-3 rounded-xl text-white font-semibold text-center"
              style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
            >
              🗺️ Plan My Festival Trip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
