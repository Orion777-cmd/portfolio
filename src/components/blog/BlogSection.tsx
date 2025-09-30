import React, { useState, useEffect, useCallback } from "react";
import { useDarkMode } from "../../context/darkmode.context";
import { supabase } from "../../lib/supabase";
import { Blog } from "../../lib/supabase";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaTag,
  FaArrowRight,
} from "react-icons/fa";

const BlogSection: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey || supabaseUrl === "your-supabase-url") {
        // Use mock data if Supabase is not configured
        setBlogs(getMockBlogs());
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getMockBlogs = (): Blog[] => {
    return [
      {
        id: "1",
        title: "Getting Started with React and TypeScript",
        slug: "getting-started-react-typescript",
        content:
          "# Getting Started with React and TypeScript\n\nReact with TypeScript provides excellent developer experience...",
        excerpt:
          "Learn how to set up a React project with TypeScript for better development experience and type safety.",
        author: "Abiy Bihonegn",
        status: "published",
        tags: ["React", "TypeScript", "JavaScript", "Web Development"],
        featured_image: "",
        read_time: 8,
        views: 1250,
        order_index: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Building Scalable APIs with Node.js",
        slug: "building-scalable-apis-nodejs",
        content:
          "# Building Scalable APIs with Node.js\n\nCreating robust and scalable APIs is crucial for modern applications...",
        excerpt:
          "Discover best practices for building scalable and maintainable APIs using Node.js and Express.",
        author: "Abiy Bihonegn",
        status: "published",
        tags: ["Node.js", "API", "Backend", "Express"],
        featured_image: "",
        read_time: 12,
        views: 890,
        order_index: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        title: "Modern CSS Techniques for Better UI",
        slug: "modern-css-techniques-better-ui",
        content:
          "# Modern CSS Techniques for Better UI\n\nCSS has evolved significantly with new features and techniques...",
        excerpt:
          "Explore modern CSS techniques including Grid, Flexbox, and custom properties for creating beautiful user interfaces.",
        author: "Abiy Bihonegn",
        status: "published",
        tags: ["CSS", "UI/UX", "Frontend", "Design"],
        featured_image: "",
        read_time: 6,
        views: 654,
        order_index: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-center">
          <div
            className={`w-16 h-16 border-4 border-transparent border-t-current rounded-full animate-spin mx-auto mb-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          ></div>
          <p className="text-lg font-medium">Loading blog posts...</p>
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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            Latest Blog Posts
          </h2>
          <div
            className={`w-24 h-1 mx-auto mb-6 ${
              darkMode ? "bg-white" : "bg-black"
            }`}
          ></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from my journey in technology and
            software development.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.id}
              variants={itemVariants}
              className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                darkMode
                  ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
                  : "bg-white border border-gray-200 hover:border-gray-300"
              } backdrop-blur-sm`}
            >
              {/* Featured Image */}
              <div
                className={`h-48 ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                } flex items-center justify-center relative overflow-hidden`}
              >
                {blog.featured_image ? (
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-xs mb-3">
                  <div
                    className={`flex items-center space-x-1 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <FaCalendarAlt className="w-3 h-3" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <FaClock className="w-3 h-3" />
                    <span>{blog.read_time} min read</span>
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <FaEye className="w-3 h-3" />
                    <span>{blog.views}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p
                  className={`text-sm mb-4 line-clamp-3 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {blog.excerpt}
                </p>

                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <FaTag className="w-2 h-2" />
                        <span>{tag}</span>
                      </span>
                    ))}
                    {blog.tags.length > 3 && (
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          darkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        +{blog.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    By {blog.author}
                  </span>
                  <div
                    className={`flex items-center space-x-2 text-sm font-medium transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span>Read More</span>
                    <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Empty State */}
        {blogs.length === 0 && (
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Blog Posts Yet</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Blog posts will appear here once they're published.
            </p>
          </motion.div>
        )}

        {/* CTA */}
        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span>View All Posts</span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
