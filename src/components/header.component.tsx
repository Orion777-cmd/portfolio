import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { FaDownload, FaCog } from "react-icons/fa";
import { useDarkMode } from "../context/darkmode.context";
import { useAdmin } from "../context/admin.context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const { isAdmin } = useAdmin();

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b-2 ${
        darkMode
          ? "bg-gray-900/90 border-gray-700"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo/Name */}
          <motion.h1
            className={`text-2xl sm:text-3xl font-bold tracking-wider ${
              darkMode ? "text-white" : "text-gray-900"
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
                darkMode
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
                    darkMode
                      ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-white hover:from-gray-700 hover:to-gray-600"
                      : "bg-gradient-to-r from-gray-200 to-gray-100 border-gray-400 text-gray-900 hover:from-gray-300 hover:to-gray-200"
                  }`}
                >
                  <FaCog className="text-lg group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-semibold tracking-wide">Admin</span>
                </Link>
              </motion.div>
            )}

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:border-gray-500"
                  : "bg-gray-100/50 border-gray-300 text-gray-900 hover:bg-gray-200/50 hover:border-gray-400"
              }`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <CiLight className="text-2xl" />
              ) : (
                <MdDarkMode className="text-2xl" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
