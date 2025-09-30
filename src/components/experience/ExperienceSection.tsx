import React, { useState, useEffect, useCallback } from "react";
import { useDarkMode } from "../../context/darkmode.context";
import { supabase } from "../../lib/supabase";
import { Experience } from "../../lib/supabase";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCode,
  FaTrophy,
} from "react-icons/fa";

const ExperienceSection: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async () => {
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey || supabaseUrl === "your-supabase-url") {
        // Use mock data if Supabase is not configured
        setExperiences(getMockExperiences());
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setExperiences(data || []);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      setError("Failed to load experiences");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMockExperiences = (): Experience[] => {
    return [
      {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        start_date: "2022-01-15",
        current: true,
        description:
          "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing best practices for code quality and performance.",
        technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
        achievements: [
          "Led team of 5 developers on critical project delivery",
          "Improved application performance by 40% through optimization",
          "Implemented CI/CD pipeline reducing deployment time by 60%",
        ],
        order_index: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Full Stack Developer",
        company: "Digital Solutions Ltd.",
        location: "New York, NY",
        start_date: "2020-06-01",
        end_date: "2021-12-31",
        current: false,
        description:
          "Developed and maintained web applications for e-commerce clients. Collaborated with design teams to create responsive and user-friendly interfaces.",
        technologies: ["JavaScript", "React", "Python", "Django", "MySQL"],
        achievements: [
          "Delivered 15+ client projects on time and within budget",
          "Reduced bug reports by 30% through improved testing practices",
          "Contributed to open-source projects with 500+ GitHub stars",
        ],
        order_index: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  };

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else {
      return `${months} month${months > 1 ? "s" : ""}`;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 border-4 border-transparent border-t-current rounded-full animate-spin mx-auto mb-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          ></div>
          <p className="text-lg font-medium">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center font-sans ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 rounded-full mx-auto mb-4 ${
              darkMode ? "bg-red-900/20" : "bg-red-100"
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
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Grid Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          darkMode
            ? "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)]"
        }`}
        style={{ backgroundSize: "80px 80px" }}
      />
      <div className="max-w-6xl mx-auto">
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
              darkMode ? "bg-gray-800" : "bg-gray-100"
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
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Professional Experience
          </h2>
          <div
            className={`w-24 h-1 mx-auto mb-6 ${
              darkMode ? "bg-white" : "bg-black"
            }`}
          ></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My journey through the tech industry, building innovative solutions
            and leading impactful projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div
            className={`absolute left-8 top-0 bottom-0 w-0.5 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((experience) => (
              <motion.div
                key={experience.id}
                variants={itemVariants}
                className="relative flex items-start space-x-8"
              >
                {/* Timeline Dot */}
                <div
                  className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                    experience.current
                      ? darkMode
                        ? "border-green-500 bg-green-500"
                        : "border-green-600 bg-green-600"
                      : darkMode
                      ? "border-gray-700 bg-gray-800"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {experience.current ? (
                    <div
                      className={`w-3 h-3 rounded-full ${
                        darkMode ? "bg-gray-900" : "bg-white"
                      } animate-pulse`}
                    ></div>
                  ) : (
                    <div
                      className={`w-3 h-3 rounded-full ${
                        darkMode ? "bg-gray-600" : "bg-gray-400"
                      }`}
                    ></div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                      : "bg-white border border-gray-200 hover:border-gray-300"
                  } backdrop-blur-sm shadow-lg`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {experience.title}
                      </h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`text-lg font-semibold ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {experience.company}
                        </span>
                        {experience.current && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              darkMode
                                ? "bg-green-500 text-black"
                                : "bg-green-600 text-white"
                            }`}
                          >
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {calculateDuration(
                        experience.start_date,
                        experience.end_date
                      )}
                    </div>
                  </div>

                  {/* Location and Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 text-sm">
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {experience.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span
                          className={
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }
                        >
                          {formatDate(experience.start_date)} -{" "}
                          {experience.current
                            ? "Present"
                            : formatDate(experience.end_date || "")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-sm mb-4 leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {experience.description}
                  </p>

                  {/* Technologies */}
                  {experience.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FaCode className="w-4 h-4" />
                        <h4
                          className={`text-sm font-semibold ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Technologies
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              darkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {experience.achievements.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <FaTrophy className="w-4 h-4" />
                        <h4
                          className={`text-sm font-semibold ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          Key Achievements
                        </h4>
                      </div>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, index) => (
                          <li
                            key={index}
                            className={`text-sm flex items-start space-x-2 ${
                              darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-2 ${
                                darkMode ? "bg-gray-500" : "bg-gray-400"
                              }`}
                            ></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {experiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-6 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Experience Yet</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Professional experience will appear here once added to the
              portfolio.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
