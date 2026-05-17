import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FestivalDetails from "./pages/FestivalDetails";
import TripPlanner from "./pages/TripPlanner";
import QuizPage from "./pages/QuizPage";
import CalendarPage from "./pages/CalendarPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check system preference on mount
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const navigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) setSelectedFestival(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className="min-h-screen transition-colors duration-300"
        style={{ background: darkMode ? "#0a0a0f" : "#FFF8F0" }}
      >
        <Header
          navigate={navigate}
          currentPage={currentPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <main className="page-enter">
          {currentPage === "home" && <Home navigate={navigate} />}
          {currentPage === "festival" && (
            <FestivalDetails festival={selectedFestival} navigate={navigate} />
          )}
          {currentPage === "planner" && <TripPlanner navigate={navigate} />}
          {currentPage === "quiz" && <QuizPage navigate={navigate} />}
          {currentPage === "calendar" && <CalendarPage navigate={navigate} />}
        </main>
        <Footer navigate={navigate} />
      </div>
    </div>
  );
}
