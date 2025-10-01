import { motion } from "framer-motion";
import { useTheme } from "../context/theme.context";
import Header from "./header.component";
import Profile from "./profile.component";
import About from "./about.component";
import Languages from "./languages.component";
import Projects from "./projects.component";
import ExperienceSection from "./experience/ExperienceSection";
import BlogSection from "./blog/BlogSection";

const PortfolioHome = () => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 300,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const { isDark, isMatrix, isCyberpunk } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isMatrix
          ? "matrix-bg"
          : isCyberpunk
          ? "cyberpunk-bg"
          : isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-white"
      }`}
    >
      {/* Theme-specific Background Effects */}
      {isMatrix && (
        <div className="matrix-rain">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="matrix-char"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {String.fromCharCode(0x30a0 + Math.random() * 96)}
            </div>
          ))}
        </div>
      )}

      {isCyberpunk && <div className="cyberpunk-grid"></div>}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Futuristic Grid Pattern */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.08)_1px,transparent_1px)]"
          }`}
          style={{ backgroundSize: "60px 60px" }}
        />

        {/* Secondary Grid for Depth */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
          }`}
          style={{ backgroundSize: "20px 20px" }}
        />

        {/* Animated Grid Lines */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(45deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
              : "bg-[linear-gradient(45deg,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(0,0,0,0.02)_1px,transparent_1px)]"
          }`}
          style={{
            backgroundSize: "100px 100px",
            animation: "gridMove 20s linear infinite",
          }}
        />

        {/* Pulsing Grid Overlay */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]"
          }`}
          style={{
            backgroundSize: "120px 120px",
            animation: "gridPulse 4s ease-in-out infinite",
          }}
        />

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20 blur-3xl animate-pulse">
          <div
            className={`w-full h-full rounded-full ${
              isDark ? "bg-white" : "bg-gray-800"
            }`}
          />
        </div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse delay-1000">
          <div
            className={`w-full h-full rounded-full ${
              isDark ? "bg-gray-400" : "bg-gray-600"
            }`}
          />
        </div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full opacity-15 blur-3xl animate-pulse delay-2000">
          <div
            className={`w-full h-full rounded-full ${
              isDark ? "bg-gray-300" : "bg-gray-700"
            }`}
          />
        </div>
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="relative z-10"
      >
        <Header />

        {/* Hero Section with Glassmorphism */}
        <div className="relative">
          <div
            className={`backdrop-blur-xl border-b-2 ${
              isMatrix
                ? isDark
                  ? "bg-[#09110D]/80 border-[#1AA06D]/50"
                  : "bg-[#E8F5E8]/80 border-[#135E3D]/50"
                : isCyberpunk
                ? isDark
                  ? "bg-[#1D0225]/80 border-[#C231C9]/50"
                  : "bg-[#F0E8FF]/80 border-[#C231C9]/50"
                : isDark
                ? "bg-gray-900/80 border-gray-700"
                : "bg-white/80 border-gray-200"
            }`}
          >
            <div className="flex lg:flex-row flex-col items-center justify-center min-h-[80vh] font-mono px-4 sm:px-6 lg:px-8">
              <Profile />
              <About />
            </div>
          </div>
        </div>

        {/* Content Sections with Enhanced Spacing */}
        <div className="space-y-16">
          <Languages />
          <Projects />
          <ExperienceSection />
          <BlogSection />
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioHome;
