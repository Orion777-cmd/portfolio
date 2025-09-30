import { motion } from "framer-motion";
import { useDarkMode } from "../context/darkmode.context";
import Header from "./header.component";
import Profile from "./profile.component";
import About from "./about.component";
import Languages from "./languages.component";
import Projects from "./projects.component";
import ExperienceSection from "./experience/ExperienceSection";
import BlogSection from "./blog/BlogSection";

const PortfolioHome = () => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 300,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const { darkMode } = useDarkMode();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className={`${darkMode ? "dark:bg-gray-900 dark:text-white" : ""}`}
    >
      <Header />
      <div className=" flex lg:flex-row flex-col items-center justify-center  font-mono">
        <Profile />
        <About />
      </div>

      <Languages />
      <Projects />
      <ExperienceSection />
      <BlogSection />
    </motion.div>
  );
};

export default PortfolioHome;
