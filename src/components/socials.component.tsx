import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";
import { SiCodewars } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";
import { SiUpwork } from "react-icons/si";
import { useTheme } from "../context/theme.context";
import { motion } from "framer-motion";

const Socials = () => {
  const { isDark, isMatrix, isCyberpunk } = useTheme();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/abiy-biru-aa2ba3227/",
      color: "text-blue-600",
    },
    {
      name: "Upwork",
      icon: SiUpwork,
      url: "https://www.upwork.com/freelancers/~01f99d578087773c1f",
      color: "text-green-600",
    },
    {
      name: "GitHub",
      icon: FaGithub,
      url: "https://github.com/Orion777-cmd",
      color: "text-gray-800",
    },
    {
      name: "LeetCode",
      icon: SiLeetcode,
      url: "https://leetcode.com/orion777_cmd/",
      color: "text-yellow-600",
    },
    {
      name: "Codeforces",
      icon: SiCodeforces,
      url: "https://codeforces.com/profile/Abiy",
      color: "text-red-600",
    },
    {
      name: "Codewars",
      icon: SiCodewars,
      url: "https://www.codewars.com/users/orion777",
      color: "text-red-700",
    },
    {
      name: "Email",
      icon: MdAlternateEmail,
      url: "mailto:abiy.biru78@gmail.com",
      color: "text-gray-600",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center gap-6 items-center pt-6 border-t-2 ${
        isDark ? "border-gray-600" : "border-gray-300"
      }`}
    >
      {socialLinks.map((social) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{
            scale: 1.2,
            y: -5,
            transition: { type: "spring", stiffness: 400, damping: 10 },
          }}
          whileTap={{ scale: 0.9 }}
          className={`group relative p-3 rounded-xl transition-all duration-300 ${
            isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-100/50"
          }`}
          title={social.name}
        >
          <social.icon
            size={32}
            className={`transition-colors duration-300 ${
              isMatrix
                ? isDark
                  ? "text-[#1AA06D] group-hover:text-[#135E3D]"
                  : "text-[#135E3D] group-hover:text-[#0B3221]"
                : isCyberpunk
                ? isDark
                  ? "text-[#C231C9] group-hover:text-[#4C5DD7]"
                  : "text-[#4C5DD7] group-hover:text-[#260B68]"
                : isDark
                ? "text-white group-hover:text-gray-300"
                : "text-gray-700 group-hover:text-gray-900"
            }`}
          />

          {/* Hover Tooltip */}
          <div
            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isDark ? "bg-gray-800 text-white" : "bg-gray-900 text-white"
            }`}
          >
            {social.name}
          </div>

          {/* Subtle Glow Effect */}
          <div
            className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
              isDark ? "bg-white" : "bg-gray-400"
            }`}
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Socials;
