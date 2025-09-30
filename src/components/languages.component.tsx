import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { FaRust } from "react-icons/fa";
import { SiDart } from "react-icons/si";
import { SiFlutter } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiNestjs } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { useDarkMode } from "../context/darkmode.context";
import { motion } from "framer-motion";
import { FaCode, FaCog } from "react-icons/fa";

const Languages = () => {
  const { darkMode } = useDarkMode();

  const techStack = [
    {
      name: "TypeScript",
      icon: SiTypescript,
      color: "text-blue-500",
      url: "https://www.typescriptlang.org/docs/",
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
      color: "text-yellow-500",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "Python",
      icon: SiPython,
      color: "text-green-500",
      url: "https://www.python.org/doc/",
    },
    {
      name: "Java",
      icon: FaJava,
      color: "text-red-500",
      url: "https://docs.oracle.com/en/java/",
    },
    {
      name: "Go",
      icon: FaGolang,
      color: "text-cyan-500",
      url: "https://golang.org/doc/",
    },
    {
      name: "Rust",
      icon: FaRust,
      color: "text-orange-500",
      url: "https://www.rust-lang.org/learn",
    },
    {
      name: "Dart",
      icon: SiDart,
      color: "text-blue-400",
      url: "https://dart.dev/guides",
    },
    {
      name: "Flutter",
      icon: SiFlutter,
      color: "text-blue-300",
      url: "https://flutter.dev/docs",
    },
    {
      name: "React",
      icon: FaReact,
      color: "text-blue-400",
      url: "https://reactjs.org/docs/getting-started.html",
    },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "text-gray-700",
      url: "https://nextjs.org/docs",
    },
    {
      name: "Express",
      icon: SiExpress,
      color: "text-gray-600",
      url: "https://expressjs.com/en/4x/api.html",
    },
    {
      name: "NestJS",
      icon: SiNestjs,
      color: "text-red-600",
      url: "https://docs.nestjs.com/",
    },
    {
      name: "Tailwind",
      icon: SiTailwindcss,
      color: "text-cyan-400",
      url: "https://tailwindcss.com/docs",
    },
    {
      name: "MongoDB",
      icon: DiMongodb,
      color: "text-green-600",
      url: "https://docs.mongodb.com/",
    },
    {
      name: "PostgreSQL",
      icon: BiLogoPostgresql,
      color: "text-blue-600",
      url: "https://www.postgresql.org/docs/",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <FaCode
              className={`text-4xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-wider ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Tech Stack
            </h2>
            <FaCog
              className={`text-4xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } animate-spin`}
            />
          </div>
          <p
            className={`text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Technologies I work with to build amazing experiences
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6`}
        >
          {techStack.map((tech) => (
            <motion.a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{
                scale: 1.1,
                y: -10,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`group relative backdrop-blur-xl rounded-2xl border-2 p-6 transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-gray-600"
                  : "bg-white/50 border-gray-200 hover:bg-gray-50/50 hover:border-gray-300"
              }`}
            >
              {/* Icon */}
              <div className="flex flex-col items-center space-y-3">
                <tech.icon
                  size={48}
                  className={`${tech.color} group-hover:scale-110 transition-transform duration-300`}
                />

                {/* Tooltip */}
                <span
                  className={`text-sm font-semibold tracking-wide ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  } group-hover:text-opacity-80`}
                >
                  {tech.name}
                </span>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                  tech.color.includes("blue")
                    ? "bg-blue-500"
                    : tech.color.includes("yellow")
                    ? "bg-yellow-500"
                    : tech.color.includes("green")
                    ? "bg-green-500"
                    : tech.color.includes("red")
                    ? "bg-red-500"
                    : tech.color.includes("cyan")
                    ? "bg-cyan-500"
                    : tech.color.includes("orange")
                    ? "bg-orange-500"
                    : "bg-gray-500"
                }`}
              />

              {/* Floating Animation */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`mt-12 h-1 w-32 mx-auto rounded-full ${
            darkMode
              ? "bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600"
              : "bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400"
          }`}
        />
      </div>
    </section>
  );
};

export default Languages;
