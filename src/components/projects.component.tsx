import React, { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "../context/theme.context";
import { supabase } from "../lib/supabase";
import { Project } from "../lib/supabase";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { trackProjectClick, trackSectionView } from "../lib/analytics";

const Projects: React.FC = () => {
  const { isDark, isMatrix, isCyberpunk } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchProjects = useCallback(async () => {
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey || supabaseUrl === "your-supabase-url") {
        // Use mock data if Supabase is not configured
        setProjects(getMockProjects());
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    // Track section view
    trackSectionView("Projects");
  }, [fetchProjects]);

  // Simple horizontal scroll - no automatic repositioning

  const getMockProjects = (): Project[] => {
    return [
      {
        id: "1",
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
        technologies: [
          "React",
          "Node.js",
          "PostgreSQL",
          "Stripe",
          "Tailwind CSS",
        ],
        github_url: "https://github.com/example/ecommerce",
        live_url: "https://ecommerce-demo.com",
        image_url: "",
        featured: true,
        category: "web",
        order_index: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Mobile Task Manager",
        description:
          "A cross-platform mobile app for task management with real-time synchronization, offline support, and team collaboration features.",
        technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
        github_url: "https://github.com/example/taskmanager",
        live_url: "",
        image_url: "",
        featured: true,
        category: "mobile",
        order_index: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        title: "AI-Powered Analytics Dashboard",
        description:
          "A machine learning dashboard that provides insights and predictions for business metrics using advanced data visualization and AI algorithms.",
        technologies: ["Python", "TensorFlow", "Django", "D3.js", "Docker"],
        github_url: "https://github.com/example/ai-dashboard",
        live_url: "https://ai-analytics.com",
        image_url: "",
        featured: false,
        category: "ai",
        order_index: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center font-sans ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 border-4 border-transparent border-t-current rounded-full animate-spin mx-auto mb-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          ></div>
          <p className="text-lg font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center font-sans ${
          isDark ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 rounded-full mx-auto mb-4 ${
              isDark ? "bg-red-900/20" : "bg-red-100"
            } flex items-center justify-center`}
          >
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Grid Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)]"
        }`}
        style={{ backgroundSize: "80px 80px" }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-4 tracking-tight ${
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
                : "text-black"
            }`}
          >
            Featured Projects
          </h2>
          <div
            className={`w-24 h-1 mx-auto mb-6 ${
              isDark ? "bg-white" : "bg-black"
            }`}
          ></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my latest work and side projects that showcase my passion
            for technology and innovation.
          </p>
        </motion.div>

        {/* Projects Horizontal Scroll Container */}
        <div className="relative mb-16">
          {/* Scroll Hint - Left */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r ${
              isMatrix
                ? "from-black to-transparent"
                : isCyberpunk
                ? "from-[#1D0225] to-transparent"
                : isDark
                ? "from-gray-900 to-transparent"
                : "from-white to-transparent"
            }`}
          ></div>

          {/* Scroll Hint - Right */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l ${
              isMatrix
                ? "from-black to-transparent"
                : isCyberpunk
                ? "from-[#1D0225] to-transparent"
                : isDark
                ? "from-gray-900 to-transparent"
                : "from-white to-transparent"
            }`}
          ></div>

          {/* Futuristic Scrollbar Indicator */}
          {projects.length > 2 && (
            <div
              className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-sm text-xs font-mono z-20 ${
                isMatrix
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : isCyberpunk
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                  : isDark
                  ? "bg-white/10 text-white border border-white/30"
                  : "bg-black/10 text-black border border-black/30"
              }`}
            >
              <span className="animate-pulse">← Scroll to explore →</span>
            </div>
          )}

          <motion.div
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-8 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Render projects */}
            {projects.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                variants={itemVariants}
                className={`group relative flex-shrink-0 w-[350px] sm:w-[420px] snap-center transition-all duration-700 ${
                  isMatrix
                    ? "hover:scale-[1.02]"
                    : isCyberpunk
                    ? "hover:scale-[1.02]"
                    : "hover:scale-105"
                }`}
              >
                {/* Main Card Container */}
                <div
                  className={`relative overflow-hidden rounded-2xl h-full ${
                    isMatrix
                      ? "bg-gradient-to-b from-gray-900 via-black to-gray-900 border-2 border-green-500/40 hover:border-green-400/80 shadow-[0_10px_50px_-12px_rgba(34,197,94,0.25)] hover:shadow-[0_20px_60px_-15px_rgba(34,197,94,0.4)]"
                      : isCyberpunk
                      ? "bg-gradient-to-b from-purple-950/50 via-black to-pink-950/50 border-2 border-purple-500/40 hover:border-purple-400/80 shadow-[0_10px_50px_-12px_rgba(168,85,247,0.25)] hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.4)]"
                      : isDark
                      ? "bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 hover:border-gray-600 shadow-2xl"
                      : "bg-white border border-gray-200 hover:border-gray-300 shadow-xl"
                  } backdrop-blur-sm`}
                >
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                      <div
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                          isMatrix
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : isCyberpunk
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                            : isDark
                            ? "bg-yellow-500 text-black"
                            : "bg-yellow-400 text-black"
                        }`}
                      >
                        <FaStar className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  {/* Animated Corner Brackets */}
                  {(isMatrix || isCyberpunk) && (
                    <>
                      {/* Top Left */}
                      <div
                        className={`absolute top-0 left-0 w-16 h-16 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${
                          isMatrix
                            ? "border-l-2 border-t-2 border-green-400"
                            : "border-l-2 border-t-2 border-purple-400"
                        }`}
                      ></div>
                      {/* Top Right */}
                      <div
                        className={`absolute top-0 right-0 w-16 h-16 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${
                          isMatrix
                            ? "border-r-2 border-t-2 border-green-400"
                            : "border-r-2 border-t-2 border-purple-400"
                        }`}
                      ></div>
                      {/* Bottom Left */}
                      <div
                        className={`absolute bottom-0 left-0 w-16 h-16 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${
                          isMatrix
                            ? "border-l-2 border-b-2 border-green-400"
                            : "border-l-2 border-b-2 border-purple-400"
                        }`}
                      ></div>
                      {/* Bottom Right */}
                      <div
                        className={`absolute bottom-0 right-0 w-16 h-16 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ${
                          isMatrix
                            ? "border-r-2 border-b-2 border-green-400"
                            : "border-r-2 border-b-2 border-purple-400"
                        }`}
                      ></div>
                    </>
                  )}

                  {/* Project Image */}
                  <div
                    className={`h-56 relative overflow-hidden ${
                      isMatrix
                        ? "bg-gradient-to-br from-green-900/20 to-black"
                        : isCyberpunk
                        ? "bg-gradient-to-br from-purple-900/20 to-pink-900/20"
                        : isDark
                        ? "bg-gray-700"
                        : "bg-gray-100"
                    }`}
                  >
                    {project.image_url ? (
                      <>
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Futuristic Overlay */}
                        <div
                          className={`absolute inset-0 transition-all duration-500 ${
                            isMatrix
                              ? "bg-gradient-to-t from-green-500/20 via-transparent to-transparent group-hover:from-green-500/30"
                              : isCyberpunk
                              ? "bg-gradient-to-t from-purple-500/20 via-transparent to-transparent group-hover:from-purple-500/30"
                              : "bg-black/0 group-hover:bg-black/20"
                          }`}
                        ></div>
                      </>
                    ) : (
                      <div
                        className={`w-full h-full flex items-center justify-center ${
                          isMatrix
                            ? "text-green-400"
                            : isCyberpunk
                            ? "text-purple-400"
                            : "text-gray-500"
                        }`}
                      >
                        <div className="text-6xl opacity-50">
                          <svg
                            className="w-16 h-16"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Scan Line Effect */}
                    {(isMatrix || isCyberpunk) && (
                      <div
                        className={`absolute top-0 left-0 w-full h-1 ${
                          isMatrix ? "bg-green-500" : "bg-purple-500"
                        } opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse`}
                      ></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    {/* Category */}
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 backdrop-blur-sm border ${
                        project.category === "web"
                          ? isMatrix
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                            : isCyberpunk
                            ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
                            : isDark
                            ? "bg-blue-900/30 text-blue-300 border-blue-500/50"
                            : "bg-blue-500 text-white border-blue-600"
                          : project.category === "mobile"
                          ? isMatrix
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : isCyberpunk
                            ? "bg-green-500/20 text-green-400 border-green-500/50"
                            : isDark
                            ? "bg-green-900/30 text-green-300 border-green-500/50"
                            : "bg-green-500 text-white border-green-600"
                          : project.category === "ai"
                          ? isMatrix
                            ? "bg-purple-500/20 text-purple-400 border-purple-500/50"
                            : isCyberpunk
                            ? "bg-pink-500/20 text-pink-400 border-pink-500/50"
                            : isDark
                            ? "bg-purple-900/30 text-purple-300 border-purple-500/50"
                            : "bg-purple-500 text-white border-purple-600"
                          : project.category === "data"
                          ? isMatrix
                            ? "bg-orange-500/20 text-orange-400 border-orange-500/50"
                            : isCyberpunk
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                            : isDark
                            ? "bg-orange-900/30 text-orange-300 border-orange-500/50"
                            : "bg-orange-500 text-white border-orange-600"
                          : isMatrix
                          ? "bg-gray-500/20 text-gray-400 border-gray-500/50"
                          : isCyberpunk
                          ? "bg-gray-500/20 text-gray-400 border-gray-500/50"
                          : isDark
                          ? "bg-gray-700 text-gray-300 border-gray-500/50"
                          : "bg-gray-500 text-white border-gray-600"
                      }`}
                    >
                      {project.category.charAt(0).toUpperCase() +
                        project.category.slice(1)}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                        isMatrix
                          ? "text-green-400 group-hover:text-green-300"
                          : isCyberpunk
                          ? "text-purple-400 group-hover:text-purple-300"
                          : "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Description - Expands on Hover */}
                    <div className="relative overflow-hidden mb-4">
                      <p
                        className={`text-sm leading-relaxed transition-all duration-500 ${
                          isMatrix
                            ? "text-green-300/80 group-hover:text-green-200"
                            : isCyberpunk
                            ? "text-purple-300/80 group-hover:text-purple-200"
                            : isDark
                            ? "text-gray-300 group-hover:text-gray-200"
                            : "text-gray-600 group-hover:text-gray-700"
                        } line-clamp-3 group-hover:line-clamp-none`}
                      >
                        {project.description}
                      </p>

                      {/* Gradient fade for long text */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-8 group-hover:opacity-0 transition-opacity duration-500 ${
                          isMatrix
                            ? "bg-gradient-to-t from-gray-900 to-transparent"
                            : isCyberpunk
                            ? "bg-gradient-to-t from-black to-transparent"
                            : isDark
                            ? "bg-gradient-to-t from-gray-800 to-transparent"
                            : "bg-gradient-to-t from-white to-transparent"
                        }`}
                      ></div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                            isMatrix
                              ? "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"
                              : isCyberpunk
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20"
                              : isDark
                              ? "bg-gray-700 text-gray-300 border-gray-600"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm border ${
                            isMatrix
                              ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
                              : isCyberpunk
                              ? "bg-gray-500/10 text-gray-400 border-gray-500/30"
                              : isDark
                              ? "bg-gray-700 text-gray-300 border-gray-600"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}
                        >
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackProjectClick(project.title, "github")
                          }
                          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm border ${
                            isMatrix
                              ? "bg-green-500/10 text-green-400 border-green-500/40 hover:bg-green-500/20 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                              : isCyberpunk
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/40 hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                              : isDark
                              ? "bg-gray-700/50 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
                          }`}
                        >
                          <FaGithub className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() =>
                            trackProjectClick(project.title, "live")
                          }
                          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm border ${
                            isMatrix
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/50 hover:bg-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                              : isCyberpunk
                              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                              : isDark
                              ? "bg-blue-600 hover:bg-blue-500 text-white border-blue-500"
                              : "bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
                          }`}
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-6 ${
                isDark ? "bg-gray-800" : "bg-gray-100"
              } flex items-center justify-center`}
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Projects will appear here once they're added to the portfolio.
            </p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            <FaGithub className="w-5 h-5" />
            <span>View More on GitHub</span>
            <FaExternalLinkAlt className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
