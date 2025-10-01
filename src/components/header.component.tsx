import { useState, useEffect, useRef } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FaDownload, FaCog, FaPalette } from "react-icons/fa";
import { useTheme } from "../context/theme.context";
import { useAdmin } from "../context/admin.context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const {
    theme,
    setThemeType,
    setThemeVariant,
    isDark,
    isMatrix,
    isCyberpunk,
  } = useTheme();
  const { isAdmin } = useAdmin();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target as Node)
      ) {
        setShowThemeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b-2 ${
        isMatrix
          ? isDark
            ? "bg-[#09110D]/90 border-[#1AA06D]/50"
            : "bg-[#E8F5E8]/90 border-[#135E3D]/50"
          : isCyberpunk
          ? isDark
            ? "bg-[#1D0225]/90 border-[#C231C9]/50"
            : "bg-[#F0E8FF]/90 border-[#C231C9]/50"
          : isDark
          ? "bg-gray-900/90 border-gray-700"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo/Name */}
          <motion.h1
            className={`text-2xl sm:text-3xl font-bold tracking-wider ${
              isMatrix
                ? isDark
                  ? "text-[#1AA06D]"
                  : "text-[#135E3D]"
                : isCyberpunk
                ? isDark
                  ? "text-[#C231C9]"
                  : "text-[#4C5DD7]"
                : isDark
                ? "text-white"
                : "text-gray-900"
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Abiy B. Bihonegn
          </motion.h1>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {/* Resume Button */}
            <motion.a
              href="/resume/resume.pdf"
              download="Abiy_B_Bihonegn_Resume.pdf"
              className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl border-2 transition-all duration-300 ${
                isDark
                  ? "bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500"
                  : "bg-gray-100/50 border-gray-300 text-gray-900 hover:bg-gray-200/50 hover:border-gray-400"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="text-lg group-hover:animate-bounce" />
              <span className="font-semibold tracking-wide">Resume</span>
            </motion.a>

            {/* Admin Link */}
            {isAdmin && (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin"
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-2xl border-2 transition-all duration-300 ${
                    isDark
                      ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-white hover:from-gray-700 hover:to-gray-600"
                      : "bg-gradient-to-r from-gray-200 to-gray-100 border-gray-400 text-gray-900 hover:from-gray-300 hover:to-gray-200"
                  }`}
                >
                  <FaCog className="text-lg group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-semibold tracking-wide">Admin</span>
                </Link>
              </motion.div>
            )}

            {/* Theme Selector */}
            <div className="relative" ref={themeMenuRef}>
              <motion.button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                  isDark
                    ? "bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500"
                    : "bg-gray-100/50 border-gray-300 text-gray-900 hover:bg-gray-200/50 hover:border-gray-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPalette className="text-xl" />
              </motion.button>

              {/* Theme Menu */}
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className={`absolute right-0 top-full mt-2 w-64 rounded-2xl border-2 p-4 shadow-xl ${
                    isDark
                      ? "bg-gray-900/95 border-gray-700 backdrop-blur-xl"
                      : "bg-white/95 border-gray-300 backdrop-blur-xl"
                  }`}
                >
                  {/* Theme Types */}
                  <div className="space-y-3">
                    <h3
                      className={`text-sm font-bold tracking-wider uppercase ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Theme Style
                    </h3>

                    <div className="grid grid-cols-3 gap-2">
                      {/* Default Theme */}
                      <button
                        onClick={() => setThemeType("default")}
                        className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all duration-300 ${
                          theme.type === "default"
                            ? isDark
                              ? "bg-gray-700 border-gray-500"
                              : "bg-gray-200 border-gray-400"
                            : isDark
                            ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                            : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm sm:text-lg mb-1">🎨</div>
                          <div
                            className={`text-[10px] font-medium ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          >
                            <span className="hidden md:inline">Default</span>
                            <span className="md:hidden">Def</span>
                          </div>
                        </div>
                      </button>

                      {/* Matrix Theme */}
                      <button
                        onClick={() => setThemeType("matrix")}
                        className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all duration-300 ${
                          theme.type === "matrix"
                            ? isDark
                              ? "bg-[#0B3221]/30 border-[#1AA06D]"
                              : "bg-[#E8F5E8] border-[#135E3D]"
                            : isDark
                            ? "bg-gray-800 border-gray-600 hover:bg-[#0B3221]/20"
                            : "bg-gray-100 border-gray-300 hover:bg-[#E8F5E8]"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm sm:text-lg mb-1">🔮</div>
                          <div
                            className={`text-[10px] font-medium ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          >
                            <span className="hidden md:inline">Matrix</span>
                            <span className="md:hidden">Mat</span>
                          </div>
                        </div>
                      </button>

                      {/* Cyberpunk Theme */}
                      <button
                        onClick={() => setThemeType("cyberpunk")}
                        className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all duration-300 ${
                          theme.type === "cyberpunk"
                            ? isDark
                              ? "bg-[#260B68]/30 border-[#C231C9]"
                              : "bg-[#F0E8FF] border-[#C231C9]"
                            : isDark
                            ? "bg-gray-800 border-gray-600 hover:bg-[#260B68]/20"
                            : "bg-gray-100 border-gray-300 hover:bg-[#F0E8FF]"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm sm:text-lg mb-1">🌃</div>
                          <div
                            className={`text-[10px] font-medium ${
                              isDark ? "text-white" : "text-black"
                            }`}
                          >
                            <span className="hidden md:inline">Cyberpunk</span>
                            <span className="md:hidden">CP</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={`my-4 h-px ${
                      isDark ? "bg-gray-700" : "bg-gray-300"
                    }`}
                  ></div>

                  {/* Light/Dark Toggle */}
                  <div className="space-y-3">
                    <h3
                      className={`text-sm font-bold tracking-wider uppercase ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Color Mode
                    </h3>

                    <div className="grid grid-cols-2 gap-1 sm:gap-2">
                      <button
                        onClick={() => setThemeVariant("light")}
                        className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                          theme.variant === "light"
                            ? isDark
                              ? "bg-[#135E3D]/30 border-[#1AA06D]"
                              : "bg-[#E8F5E8] border-[#135E3D]"
                            : isDark
                            ? "bg-gray-800 border-gray-600 hover:bg-[#135E3D]/20"
                            : "bg-gray-100 border-gray-300 hover:bg-[#E8F5E8]"
                        }`}
                      >
                        <CiLight className="text-lg" />
                        <span
                          className={`text-xs font-semibold ${
                            isDark ? "text-white" : "text-black"
                          }`}
                        >
                          Light
                        </span>
                      </button>

                      <button
                        onClick={() => setThemeVariant("dark")}
                        className={`p-2 sm:p-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                          theme.variant === "dark"
                            ? isDark
                              ? "bg-gray-700 border-gray-500"
                              : "bg-gray-800 border-gray-600"
                            : isDark
                            ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                            : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        <MdDarkMode className="text-lg" />
                        <span
                          className={`text-xs font-semibold ${
                            isDark ? "text-white" : "text-black"
                          }`}
                        >
                          Dark
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
