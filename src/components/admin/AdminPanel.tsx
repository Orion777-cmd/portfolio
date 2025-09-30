import React, { useState, useEffect } from "react";
import { useAdmin } from "../../context/admin.context";
import { useDarkMode } from "../../context/darkmode.context";
import AdminLogin from "./AdminLogin";
import AdminHeader from "./AdminHeader";
import ProjectManagement from "./ProjectManagement";
import ExperienceManagement from "./ExperienceManagement";
import BlogManagement from "./BlogManagement";
import { supabase } from "../../lib/supabase";

interface DashboardStats {
  totalViews: number;
  activeProjects: number;
  publishedBlogs: number;
  totalExperiences: number;
}

const AdminPanel: React.FC = () => {
  const { isAdmin, isLoading } = useAdmin();
  const { darkMode } = useDarkMode();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeManagement, setActiveManagement] = useState<string | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalViews: 0,
    activeProjects: 0,
    publishedBlogs: 0,
    totalExperiences: 0,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats();
    }
  }, [isAdmin]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch projects count
      const { count: projectsCount } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });

      // Fetch published blogs count
      const { count: blogsCount } = await supabase
        .from("blogs")
        .select("*", { count: "exact", head: true })
        .eq("status", "published");

      // Fetch experiences count
      const { count: experiencesCount } = await supabase
        .from("experiences")
        .select("*", { count: "exact", head: true });

      // For now, simulate total views (you can implement analytics later)
      const totalViews = 12500 + Math.floor(Math.random() * 1000);

      setDashboardStats({
        totalViews,
        activeProjects: projectsCount || 0,
        publishedBlogs: blogsCount || 0,
        totalExperiences: experiencesCount || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const handleCardClick = (cardId: string) => {
    if (["projects", "experience", "blogs"].includes(cardId)) {
      setActiveManagement(cardId);
    } else {
      // Handle other cards (testimonials, analytics, settings)
      alert(`${cardId} management coming soon!`);
    }
  };

  const handleCloseManagement = () => {
    setActiveManagement(null);
    fetchDashboardStats(); // Refresh stats after changes
  };

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen font-sans ${
          darkMode ? "bg-black" : "bg-white"
        }`}
      >
        <div className="relative">
          <div
            className={`w-16 h-16 border-2 border-transparent ${
              darkMode ? "border-t-white" : "border-t-black"
            } rounded-full animate-spin`}
          ></div>
          <div
            className={`absolute inset-0 w-16 h-16 border-2 border-transparent ${
              darkMode ? "border-t-gray-400" : "border-t-gray-600"
            } rounded-full animate-spin`}
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin />;
  }

  // Show management component if one is active
  if (activeManagement) {
    switch (activeManagement) {
      case "projects":
        return <ProjectManagement onClose={handleCloseManagement} />;
      case "experience":
        return <ExperienceManagement onClose={handleCloseManagement} />;
      case "blogs":
        return <BlogManagement onClose={handleCloseManagement} />;
      default:
        return null;
    }
  }

  const adminCards = [
    {
      id: "projects",
      title: "Projects",
      description: "Manage portfolio projects",
      icon: "◢",
      stats: `${dashboardStats.activeProjects} Active`,
      accent: darkMode ? "border-white/20" : "border-black/20",
    },
    {
      id: "experience",
      title: "Experience",
      description: "Update professional history",
      icon: "◤",
      stats: `${dashboardStats.totalExperiences} Positions`,
      accent: darkMode ? "border-white/20" : "border-black/20",
    },
    {
      id: "blogs",
      title: "Blog Posts",
      description: "Create and edit content",
      icon: "◥",
      stats: `${dashboardStats.publishedBlogs} Published`,
      accent: darkMode ? "border-white/20" : "border-black/20",
    },
    {
      id: "testimonials",
      title: "Testimonials",
      description: "Manage client reviews",
      icon: "◣",
      stats: "Coming Soon",
      accent: darkMode ? "border-white/20" : "border-black/20",
    },
    {
      id: "analytics",
      title: "Analytics",
      description: "View site metrics",
      icon: "◧",
      stats: `${(dashboardStats.totalViews / 1000).toFixed(1)}K Views`,
      accent: darkMode ? "border-white/20" : "border-black/20",
    },
    {
      id: "settings",
      title: "Settings",
      description: "System configuration",
      icon: "◨",
      stats: "System",
      accent: darkMode ? "border-white/20" : "border-black/20",
    },
  ];

  return (
    <div
      className={`min-h-screen font-sans ${darkMode ? "bg-black" : "bg-white"}`}
    >
      <AdminHeader />

      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="adminGrid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke={darkMode ? "#ffffff" : "#000000"}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adminGrid)" />
        </svg>
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-0 w-full h-px ${
            darkMode
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-black to-transparent"
          } opacity-20 animate-pulse`}
        ></div>
        <div
          className={`absolute top-3/4 left-0 w-full h-px ${
            darkMode
              ? "bg-gradient-to-r from-transparent via-white to-transparent"
              : "bg-gradient-to-r from-transparent via-black to-transparent"
          } opacity-20 animate-pulse`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute left-1/4 top-0 w-px h-full ${
            darkMode
              ? "bg-gradient-to-b from-transparent via-white to-transparent"
              : "bg-gradient-to-b from-transparent via-black to-transparent"
          } opacity-20 animate-pulse`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8 border-2 ${
                darkMode
                  ? "bg-black border-white/30"
                  : "bg-white border-black/30"
              }`}
            >
              <svg
                className={`w-12 h-12 ${
                  darkMode ? "text-white" : "text-black"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1
              className={`text-5xl font-bold mb-6 tracking-wider ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              DASHBOARD
            </h1>
            <div
              className={`w-24 h-px mx-auto mb-6 ${
                darkMode ? "bg-white/50" : "bg-black/50"
              }`}
            ></div>
            <p
              className={`text-lg tracking-widest uppercase ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Portfolio Management System
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              {
                label: "Total Views",
                value: `${(dashboardStats.totalViews / 1000).toFixed(1)}K`,
                change: "+12%",
              },
              {
                label: "Active Projects",
                value: dashboardStats.activeProjects.toString(),
                change: "+2",
              },
              {
                label: "Published Blogs",
                value: dashboardStats.publishedBlogs.toString(),
                change: "+3",
              },
              {
                label: "Experiences",
                value: dashboardStats.totalExperiences.toString(),
                change: "+1",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`backdrop-blur-2xl rounded-3xl p-8 border-2 ${
                  darkMode
                    ? "bg-black/80 border-white/20"
                    : "bg-white/80 border-black/20"
                }`}
              >
                <div
                  className={`text-3xl font-bold mb-2 tracking-wider ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm tracking-widest uppercase mb-2 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
                <div
                  className={`text-xs tracking-widest uppercase ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  {stat.change}
                </div>
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
                onClick={() => handleCardClick(card.id)}
                className={`group relative backdrop-blur-2xl rounded-3xl p-10 border-2 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                  darkMode
                    ? `bg-black/80 border-white/20 ${
                        hoveredCard === card.id
                          ? "shadow-2xl shadow-white/20"
                          : "shadow-lg shadow-white/10"
                      }`
                    : `bg-white/80 border-black/20 ${
                        hoveredCard === card.id
                          ? "shadow-2xl shadow-black/20"
                          : "shadow-lg shadow-black/10"
                      }`
                }`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl ${
                    darkMode
                      ? "bg-gradient-to-r from-white/5 via-gray-500/5 to-white/5"
                      : "bg-gradient-to-r from-black/5 via-gray-500/5 to-black/5"
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-8 border-2 ${
                      darkMode
                        ? "bg-black border-white/30"
                        : "bg-white border-black/30"
                    }`}
                  >
                    <span
                      className={`text-3xl ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {card.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-2xl font-bold mb-4 tracking-wider ${
                      darkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mb-6 tracking-wide ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {card.description}
                  </p>

                  {/* Stats */}
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-2xl text-xs font-bold tracking-widest uppercase border ${
                      darkMode
                        ? "bg-white/10 text-white border-white/30"
                        : "bg-black/10 text-black border-black/30"
                    }`}
                  >
                    {card.stats}
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-8 right-8 transform transition-transform duration-300 group-hover:translate-x-2">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        darkMode ? "border-white/30" : "border-black/30"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 ${
                          darkMode ? "text-white" : "text-black"
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
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div
            className={`mt-16 backdrop-blur-2xl rounded-3xl p-10 border-2 ${
              darkMode
                ? "bg-black/80 border-white/20"
                : "bg-white/80 border-black/20"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-8 tracking-wider ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Add New Project",
                  icon: "+",
                  action: () => setActiveManagement("projects"),
                },
                {
                  label: "Write Blog Post",
                  icon: "◢",
                  action: () => setActiveManagement("blogs"),
                },
                {
                  label: "Add Experience",
                  icon: "◧",
                  action: () => setActiveManagement("experience"),
                },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`flex items-center space-x-4 p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-black/50 border-white/20 hover:bg-white/10"
                      : "bg-white/50 border-black/20 hover:bg-black/10"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center ${
                      darkMode ? "border-white/30" : "border-black/30"
                    }`}
                  >
                    <span
                      className={`text-lg ${
                        darkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {action.icon}
                    </span>
                  </div>
                  <span
                    className={`font-bold tracking-wider uppercase ${
                      darkMode ? "text-white" : "text-black"
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
