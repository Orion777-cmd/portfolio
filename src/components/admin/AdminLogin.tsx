import React, { useState } from "react";
import { useAdmin } from "../../context/admin.context";
import { useDarkMode } from "../../context/darkmode.context";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState("");
  const { login } = useAdmin();
  const { darkMode } = useDarkMode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const success = await login(email, password);
    if (!success) {
      setError("Invalid credentials");
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center font-sans relative overflow-hidden ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
              : "bg-gradient-to-br from-gray-50 via-white to-gray-100"
          }`}
        ></div>
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={darkMode ? "#374151" : "#e5e7eb"}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/4 left-0 w-full h-px ${
            darkMode
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-black to-transparent"
          } opacity-30 animate-pulse`}
        ></div>
        <div
          className={`absolute top-3/4 left-0 w-full h-px ${
            darkMode
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-black to-transparent"
          } opacity-30 animate-pulse`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute left-1/4 top-0 w-px h-full ${
            darkMode
              ? "bg-gradient-to-b from-transparent via-white to-transparent"
              : "bg-gradient-to-b from-transparent via-black to-transparent"
          } opacity-30 animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Login Card */}
      <div
        className={`relative z-10 w-full max-w-md mx-4 backdrop-blur-2xl rounded-3xl border-2 transition-all duration-500 ${
          darkMode
            ? "bg-black/80 border-white/20 shadow-2xl shadow-white/10"
            : "bg-white/80 border-black/20 shadow-2xl shadow-black/10"
        }`}
      >
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-3xl ${
            darkMode
              ? "bg-gradient-to-r from-white/5 via-gray-500/5 to-white/5"
              : "bg-gradient-to-r from-black/5 via-gray-500/5 to-black/5"
          } blur-xl`}
        ></div>

        <div className="relative p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 border-2 ${
                darkMode
                  ? "bg-black border-white/30"
                  : "bg-white border-black/30"
              }`}
            >
              <svg
                className={`w-10 h-10 ${
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2
              className={`text-4xl font-bold mb-3 tracking-wider ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              ADMIN
            </h2>
            <div
              className={`w-16 h-px mx-auto mb-4 ${
                darkMode ? "bg-white/50" : "bg-black/50"
              }`}
            ></div>
            <p
              className={`text-sm tracking-widest uppercase ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Secure Access Portal
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div className="space-y-3">
              <label
                className={`block text-sm font-medium tracking-wider uppercase ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused("email")}
                  onBlur={() => setIsFocused("")}
                  className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none font-mono ${
                    isFocused === "email"
                      ? darkMode
                        ? "border-white bg-white/5 text-white"
                        : "border-black bg-black/5 text-black"
                      : darkMode
                      ? "border-gray-600 bg-black/50 text-white placeholder-gray-500"
                      : "border-gray-300 bg-white/50 text-black placeholder-gray-500"
                  }`}
                  placeholder="admin@example.com"
                />
                <div
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isFocused === "email"
                        ? darkMode
                          ? "bg-white"
                          : "bg-black"
                        : "bg-gray-400"
                    } transition-colors duration-300`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label
                className={`block text-sm font-medium tracking-wider uppercase ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused("password")}
                  onBlur={() => setIsFocused("")}
                  className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none font-mono ${
                    isFocused === "password"
                      ? darkMode
                        ? "border-white bg-white/5 text-white"
                        : "border-black bg-black/5 text-black"
                      : darkMode
                      ? "border-gray-600 bg-black/50 text-white placeholder-gray-500"
                      : "border-gray-300 bg-white/50 text-black placeholder-gray-500"
                  }`}
                  placeholder="••••••••"
                />
                <div
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isFocused === "password"
                        ? darkMode
                          ? "bg-white"
                          : "bg-black"
                        : "bg-gray-400"
                    } transition-colors duration-300`}
                  ></div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                className={`flex items-center space-x-3 p-4 rounded-2xl border-2 ${
                  darkMode
                    ? "bg-red-900/20 border-red-500/50 text-red-400"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    darkMode ? "bg-red-400" : "bg-red-600"
                  }`}
                ></div>
                <span className="text-sm font-medium tracking-wider uppercase">
                  {error}
                </span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg tracking-widest uppercase transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed border-2 ${
                isLoading
                  ? darkMode
                    ? "bg-gray-800 border-gray-600 text-gray-400"
                    : "bg-gray-200 border-gray-400 text-gray-600"
                  : darkMode
                  ? "bg-white text-black border-white hover:bg-black hover:text-white hover:border-gray-400"
                  : "bg-black text-white border-black hover:bg-white hover:text-black hover:border-gray-400"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div
                    className={`w-5 h-5 border-2 border-transparent border-t-current rounded-full animate-spin`}
                  ></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Access System"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 text-center">
            <div
              className={`w-24 h-px mx-auto mb-4 ${
                darkMode ? "bg-white/30" : "bg-black/30"
              }`}
            ></div>
            <p
              className={`text-xs tracking-widest uppercase ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
