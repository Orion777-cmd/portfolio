import React, { useState } from "react";
import { useAdmin } from "../../context/admin.context";
import { useDarkMode } from "../../context/darkmode.context";
import AdminLogin from "./AdminLogin";
import AdminHeader from "./AdminHeader";

const AdminPanel: React.FC = () => {
  const { isAdmin, isLoading } = useAdmin();
  const { darkMode } = useDarkMode();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen font-sans ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
            : "bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50"
        }`}
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  const adminCards = [
    {
      id: "projects",
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: "🚀",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: darkMode
        ? "from-blue-900/30 to-cyan-900/30"
        : "from-blue-50 to-cyan-50",
      borderColor: darkMode ? "border-blue-500/30" : "border-blue-200",
      hoverGlow: "hover:shadow-blue-500/25",
      stats: "12 Active",
    },
    {
      id: "experience",
      title: "Experience",
      description: "Update professional experience",
      icon: "💼",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: darkMode
        ? "from-green-900/30 to-emerald-900/30"
        : "from-green-50 to-emerald-50",
      borderColor: darkMode ? "border-green-500/30" : "border-green-200",
      hoverGlow: "hover:shadow-green-500/25",
      stats: "5 Positions",
    },
    {
      id: "blogs",
      title: "Blog Posts",
      description: "Create and edit blog posts",
      icon: "📝",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: darkMode
        ? "from-purple-900/30 to-pink-900/30"
        : "from-purple-50 to-pink-50",
      borderColor: darkMode ? "border-purple-500/30" : "border-purple-200",
      hoverGlow: "hover:shadow-purple-500/25",
      stats: "8 Published",
    },
    {
      id: "testimonials",
      title: "Testimonials",
      description: "Manage client testimonials",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: darkMode
        ? "from-yellow-900/30 to-orange-900/30"
        : "from-yellow-50 to-orange-50",
      borderColor: darkMode ? "border-yellow-500/30" : "border-yellow-200",
      hoverGlow: "hover:shadow-yellow-500/25",
      stats: "15 Reviews",
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "View site analytics",
      icon: "📊",
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: darkMode
        ? "from-indigo-900/30 to-blue-900/30"
        : "from-indigo-50 to-blue-50",
      borderColor: darkMode ? "border-indigo-500/30" : "border-indigo-200",
      hoverGlow: "hover:shadow-indigo-500/25",
      stats: "2.5K Views",
    },
    {
      id: "settings",
      title: "Settings",
      description: "Configure site settings",
      icon: "⚙️",
      gradient: "from-gray-500 to-slate-500",
      bgGradient: darkMode
        ? "from-gray-800/30 to-slate-800/30"
        : "from-gray-50 to-slate-50",
      borderColor: darkMode ? "border-gray-500/30" : "border-gray-200",
      hoverGlow: "hover:shadow-gray-500/25",
      stats: "System",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50"
      }`}
    >
      <AdminHeader />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-20 w-32 h-32 rounded-full opacity-20 animate-pulse ${
            darkMode ? "bg-blue-400" : "bg-blue-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-20 animate-pulse ${
            darkMode ? "bg-purple-400" : "bg-purple-300"
          }`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute top-1/2 right-1/4 w-16 h-16 rounded-full opacity-20 animate-pulse ${
            darkMode ? "bg-cyan-400" : "bg-cyan-300"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                darkMode
                  ? "bg-gradient-to-r from-blue-500 to-purple-600"
                  : "bg-gradient-to-r from-blue-600 to-purple-700"
              }`}
            >
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Admin Dashboard
            </h1>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Manage your portfolio with advanced tools
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "Total Views", value: "12.5K", change: "+12%" },
              { label: "Active Projects", value: "8", change: "+2" },
              { label: "Blog Posts", value: "15", change: "+3" },
              { label: "Testimonials", value: "23", change: "+5" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl rounded-2xl p-6 border ${
                  darkMode
                    ? "bg-gray-800/50 border-gray-700/50"
                    : "bg-white/50 border-gray-200/50"
                }`}
              >
                <div
                  className={`text-2xl font-bold mb-1 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
                <div className="text-xs text-green-500 mt-1">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Admin Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adminCards.map((card) => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative backdrop-blur-xl rounded-2xl p-8 border transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  darkMode
                    ? `bg-gradient-to-br ${card.bgGradient} border ${card.borderColor}`
                    : `bg-gradient-to-br ${card.bgGradient} border ${card.borderColor}`
                } ${
                  hoveredCard === card.id
                    ? `shadow-2xl ${card.hoverGlow}`
                    : "shadow-lg"
                }`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-r ${card.gradient}`}
                  >
                    <span className="text-2xl">{card.icon}</span>
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mb-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {card.description}
                  </p>

                  {/* Stats */}
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {card.stats}
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-6 right-6 transform transition-transform duration-300 group-hover:translate-x-1">
                    <svg
                      className={`w-6 h-6 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div
            className={`mt-12 backdrop-blur-xl rounded-2xl p-8 border ${
              darkMode
                ? "bg-gray-800/50 border-gray-700/50"
                : "bg-white/50 border-gray-200/50"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Add New Project", icon: "➕" },
                { label: "Write Blog Post", icon: "✍️" },
                { label: "View Analytics", icon: "📈" },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-gray-700/50 border-gray-600 hover:bg-gray-600/50"
                      : "bg-white/50 border-gray-200 hover:bg-white/70"
                  }`}
                >
                  <span className="text-xl">{action.icon}</span>
                  <span
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
