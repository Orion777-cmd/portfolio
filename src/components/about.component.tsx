import { useDarkMode } from "../context/darkmode.context";
import { motion } from "framer-motion";
import { FaCoffee, FaBug, FaCode, FaRocket, FaLightbulb } from "react-icons/fa";

const About = () => {
  const { darkMode } = useDarkMode();
  const coffeeEmoji = "\u2615";

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className={`backdrop-blur-xl rounded-3xl border-2 p-8 max-w-2xl mx-auto relative overflow-hidden ${
        darkMode
          ? "bg-gray-900/80 border-gray-700 shadow-2xl shadow-gray-900/50"
          : "bg-white/80 border-gray-200 shadow-2xl shadow-gray-300/50"
      }`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mb-8"
      >
        <h1
          className={`text-2xl sm:text-3xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          About Me
        </h1>
        <div
          className={`w-24 h-1 mx-auto rounded-full ${
            darkMode
              ? "bg-gradient-to-r from-gray-600 to-gray-400"
              : "bg-gradient-to-r from-gray-400 to-gray-600"
          }`}
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="space-y-6"
      >
        <p
          className={`text-base leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          I'm a{" "}
          <span className="font-semibold text-blue-400">Software Engineer</span>{" "}
          with a strong focus on building innovative, scalable, and
          user-centered software solutions. Proficient in
          <span className="font-semibold text-green-400">
            {" "}
            TypeScript, Python, Go, and Flutter
          </span>
          , I specialize in full-stack development—bringing together intuitive
          front-end experiences and reliable back-end architectures.
        </p>

        <p
          className={`text-base leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          With a solid foundation in problem-solving and software design, I
          thrive in dynamic environments where collaboration and innovation
          drive impact. My experience ranges from designing seamless user
          interfaces to architecting systems that solve complex technical
          challenges.
        </p>

        <p
          className={`text-base leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Beyond work, I'm eager to contribute to open-source projects,
          continuously refine my skills, and explore emerging technologies to
          stay ahead of the curve.
        </p>
      </motion.div>

      {/* Fun Fact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className={`mt-8 p-6 rounded-2xl border-2 ${
          darkMode
            ? "bg-gray-800/50 border-gray-600"
            : "bg-gray-100/50 border-gray-300"
        }`}
      >
        <div className="flex items-center justify-center gap-3">
          {darkMode ? (
            <FaBug className="text-2xl text-red-400" />
          ) : (
            <FaCoffee className="text-2xl text-yellow-600" />
          )}
          <p
            className={`text-lg font-medium text-center ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {darkMode
              ? "Why do programmers prefer dark mode?"
              : `Turning caffeine ${coffeeEmoji} into code since 2022`}
          </p>
        </div>

        {darkMode && (
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="mt-3 text-center"
          >
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Because light attracts bugs! <span className="text-2xl">😄</span>
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Grid Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          darkMode
            ? "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
        }`}
        style={{ backgroundSize: "40px 40px" }}
      />

      {/* Decorative Icons */}
      <div className="absolute top-6 right-6 opacity-20">
        <FaCode
          className={`text-3xl ${darkMode ? "text-white" : "text-gray-800"}`}
        />
      </div>
      <div className="absolute bottom-6 left-6 opacity-20">
        <FaRocket
          className={`text-2xl ${darkMode ? "text-white" : "text-gray-800"}`}
        />
      </div>
      <div className="absolute top-1/2 right-4 opacity-10">
        <FaLightbulb
          className={`text-4xl ${darkMode ? "text-white" : "text-gray-800"}`}
        />
      </div>
    </motion.div>
  );
};

export default About;
