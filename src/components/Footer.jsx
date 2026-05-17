import { useState } from "react";

const footerLinks = {
  Explore: [
    { label: "All Festivals", page: "home" },
    { label: "Festival Calendar", page: "calendar" },
    { label: "By State", page: "home" },
    { label: "By Religion", page: "home" },
    { label: "Trending Now", page: "home" },
  ],
  "Plan & Go": [
    { label: "Trip Planner", page: "planner" },
    { label: "Festival Quiz", page: "quiz" },
    { label: "Best Time to Visit", page: "calendar" },
    { label: "Travel Tips", page: "home" },
  ],
  Discover: [
    { label: "North India", page: "home" },
    { label: "South India", page: "home" },
    { label: "East India", page: "home" },
    { label: "Northeast", page: "home" },
    { label: "West India", page: "home" },
  ],
};

const socialLinks = [
  { icon: "📸", label: "Instagram", color: "#E1306C" },
  { icon: "🐦", label: "Twitter", color: "#1DA1F2" },
  { icon: "▶️", label: "YouTube", color: "#FF0000" },
  { icon: "📌", label: "Pinterest", color: "#E60023" },
];

export default function Footer({ navigate }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const handleSubscribe = () => {
    if (email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #1a0a05 0%, #0d0604 100%)" }}>
      {/* Decorative top border */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #FF6B35, #FF006E, #FFB347, #7B2D8B, #0077B6, #FF6B35)" }} />

      {/* Floating decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-5 animate-float-up">🪔</div>
        <div className="absolute top-20 right-20 text-5xl opacity-5 animate-float-up" style={{ animationDelay: "1s" }}>🌸</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-5 animate-float-up" style={{ animationDelay: "2s" }}>🎨</div>
        <div className="absolute bottom-10 right-1/3 text-5xl opacity-5 animate-float-up" style={{ animationDelay: "0.5s" }}>🌺</div>
        {/* Mandala background */}
        <div className="absolute -right-32 -top-32 w-96 h-96 opacity-5" style={{
          background: "radial-gradient(circle, rgba(255,107,53,0.5) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div className="absolute -left-32 -bottom-32 w-96 h-96 opacity-5" style={{
          background: "radial-gradient(circle, rgba(255,0,110,0.5) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Newsletter */}
        <div className="mb-16 p-8 rounded-3xl border border-orange-900/30" style={{ background: "rgba(255,107,53,0.08)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Never Miss a Festival 🎉
              </h3>
              <p className="text-gray-400 text-sm">Get monthly festival guides, travel tips & cultural stories delivered to your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm outline-none focus:border-orange-400 transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              />
              <button
                onClick={handleSubscribe}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap text-sm"
                style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}
              >
                {subscribed ? "✓ Subscribed!" : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, #FF6B35, #FF006E)" }}>
                🪔
              </div>
              <span className="font-display font-bold text-white text-lg">Utsav Bharat</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              India's most comprehensive festival discovery platform. Explore 1000+ celebrations across 28 states.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
                  style={{
                    background: hoveredSocial === social.label ? social.color : "rgba(255,255,255,0.08)",
                  }}
                  title={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.page)}
                      className="text-gray-500 hover:text-orange-400 text-sm transition-colors duration-200 text-left hover:translate-x-1 transform inline-block"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ticker Tape */}
        <div className="mb-8 py-3 border-y border-orange-900/20 overflow-hidden">
          <div className="ticker-content text-orange-800 text-sm font-medium">
            {["🪔 Diwali — Festival of Lights", "🎨 Holi — Festival of Colors", "💃 Navratri — Nine Nights of Dance", "🌺 Durga Puja — Bengal's Grandeur", "🌾 Onam — Kerala's Harvest", "🐪 Pushkar Fair — Desert Magic", "🦅 Hornbill — Tribal Heritage", "🎭 Thrissur Pooram — Elephant Spectacle", "🐘 Ganesh Chaturthi — Maharashtra's Pride", "🌙 Eid — Community & Joy"].map((item, i) => (
              <span key={i} className="mx-8">{item}</span>
            ))}
            {["🪔 Diwali — Festival of Lights", "🎨 Holi — Festival of Colors", "💃 Navratri — Nine Nights of Dance", "🌺 Durga Puja — Bengal's Grandeur", "🌾 Onam — Kerala's Harvest", "🐪 Pushkar Fair — Desert Magic", "🦅 Hornbill — Tribal Heritage", "🎭 Thrissur Pooram — Elephant Spectacle", "🐘 Ganesh Chaturthi — Maharashtra's Pride", "🌙 Eid — Community & Joy"].map((item, i) => (
              <span key={`dup-${i}`} className="mx-8">{item}</span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>for India's incredible cultural heritage</span>
          </div>
          <div className="flex items-center gap-4">
            <span>© 2025 Utsav Bharat. All rights reserved.</span>
            <span>🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
