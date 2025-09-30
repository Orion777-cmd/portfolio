import React from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../../context/admin.context";
import { useDarkMode } from "../../context/darkmode.context";

const AdminHeader: React.FC = () => {
  const { logout } = useAdmin();
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <div
      className={`relative z-20 backdrop-blur-2xl border-b-2 ${
        darkMode ? "bg-black/80 border-white/20" : "bg-white/80 border-black/20"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo/Brand */}
          <Link
            to="/"
            className={`text-2xl font-bold hover:opacity-80 transition-all duration-300 transform hover:scale-105 tracking-wider ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center ${
                  darkMode
                    ? "bg-black border-white/30"
                    : "bg-white border-black/30"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span>ABIY B. BIHONEGN</span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {/* Portfolio Link */}
            <Link
              to="/"
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 border-2 ${
                darkMode
                  ? "bg-black/50 border-white/20 text-white hover:bg-white/10"
                  : "bg-white/50 border-black/20 text-black hover:bg-black/10"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                />
              </svg>
              <span className="font-bold tracking-wider uppercase">
                Portfolio
              </span>
            </Link>

            {/* Status Indicator */}
            <div className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  darkMode ? "bg-white" : "bg-black"
                } animate-pulse`}
              ></div>
              <span
                className={`text-sm font-bold tracking-widest uppercase ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                Admin Active
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 border-2 ${
                darkMode
                  ? "bg-black border-white/20 text-white hover:bg-white/10"
                  : "bg-white border-black/20 text-black hover:bg-black/10"
              }`}
            >
              {darkMode ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className={`flex items-center space-x-3 px-6 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 border-2 ${
                darkMode
                  ? "bg-black/50 border-white/20 text-white hover:bg-white/10"
                  : "bg-white/50 border-black/20 text-black hover:bg-black/10"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="font-bold tracking-wider uppercase">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
