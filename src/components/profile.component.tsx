import Social from "./socials.component";
import { useTheme } from "../context/theme.context";
import { motion } from "framer-motion";
import { FaCode, FaRocket, FaStar } from "react-icons/fa";

const Profile = () => {
  const { isDark, isMatrix, isCyberpunk } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`backdrop-blur-xl rounded-3xl border-2 p-8 max-w-2xl mx-auto relative overflow-hidden ${
        isMatrix
          ? isDark
            ? "bg-[#09110D]/80 border-[#1AA06D]/50 shadow-2xl shadow-[#0B3221]/50"
            : "bg-[#E8F5E8]/80 border-[#135E3D]/50 shadow-2xl shadow-[#135E3D]/30"
          : isCyberpunk
          ? isDark
            ? "bg-[#1D0225]/80 border-[#C231C9]/50 shadow-2xl shadow-[#260B68]/50"
            : "bg-[#F0E8FF]/80 border-[#C231C9]/50 shadow-2xl shadow-[#C231C9]/30"
          : isDark
          ? "bg-gray-900/80 border-gray-700 shadow-2xl shadow-gray-900/50"
          : "bg-white/80 border-gray-200 shadow-2xl shadow-gray-300/50"
      }`}
    >
      {/* Profile Image with Glow Effect */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative"
        >
          <div
            className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
              isDark
                ? "bg-gradient-to-r from-gray-400 to-white"
                : "bg-gradient-to-r from-gray-600 to-gray-800"
            }`}
          />
          <img
            src="./profile.jpeg"
            alt="Abiy Bihonegn"
            className="relative w-48 h-48 rounded-full object-cover object-center border-4 border-gray-300 dark:border-gray-600"
          />
          {/* Floating Icons */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute -top-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center ${
              isDark
                ? "bg-gray-800 border-2 border-gray-600"
                : "bg-gray-100 border-2 border-gray-300"
            }`}
          >
            <FaCode
              className={`text-lg ${isDark ? "text-white" : "text-gray-700"}`}
            />
          </motion.div>
        </motion.div>

        {/* Profile Details */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
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
                : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Hi <span className="animate-bounce">👋</span>, I am Abiy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <div
              className={`flex items-center justify-center lg:justify-start gap-3 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaRocket className="text-lg" />
              <h2 className="text-xl sm:text-2xl font-semibold">
                Software Engineer
              </h2>
            </div>

            <div
              className={`flex items-center justify-center lg:justify-start gap-3 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <FaStar className="text-lg text-yellow-500" />
              <h3 className="text-lg sm:text-xl font-medium">
                Top Rated Freelancer on Upwork
              </h3>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Social />
      </motion.div>

      {/* Grid Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
        }`}
        style={{ backgroundSize: "40px 40px" }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
        <div
          className={`w-full h-full rounded-full ${
            isDark ? "bg-white" : "bg-gray-800"
          } animate-pulse`}
        />
      </div>
      <div className="absolute bottom-4 left-4 w-16 h-16 opacity-10">
        <div
          className={`w-full h-full rounded-full ${
            isDark ? "bg-gray-400" : "bg-gray-600"
          } animate-pulse delay-1000`}
        />
      </div>
    </motion.div>
  );
};

export default Profile;
