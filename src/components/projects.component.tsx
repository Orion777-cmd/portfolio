import React, { useState, useEffect } from "react";
import { useTheme } from "../context/theme.context";
import { supabase } from "../lib/supabase";
import { Project } from "../lib/supabase";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";

const Projects: React.FC = () => {
  const { isDark, isMatrix, isCyberpunk } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
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
  };

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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                isDark
                  ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                  : "bg-white border border-gray-200 hover:border-gray-300"
              } backdrop-blur-sm`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${
                      isDark
                        ? "bg-yellow-500 text-black"
                        : "bg-yellow-400 text-black"
                    }`}
                  >
                    <FaStar className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Project Image */}
              <div
                className={`h-48 ${
                  isDark ? "bg-gray-700" : "bg-gray-100"
                } flex items-center justify-center relative overflow-hidden`}
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
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
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    project.category === "web"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : project.category === "mobile"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : project.category === "ai"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      : project.category === "data"
                      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {project.category.charAt(0).toUpperCase() +
                    project.category.slice(1)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm mb-4 line-clamp-3 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        isDark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-3">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      } group-hover:scale-105`}
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
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                        isDark
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      } group-hover:scale-105`}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
