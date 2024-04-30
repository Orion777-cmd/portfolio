import "./App.css";
import Header from "./components/header.component";

import { useDarkMode } from "./context/darkmode.context";

import Profile from "./components/profile.component";
import About from "./components/about.component";
import Languages from "./components/languages.component";
import Projects from "./components/projects.component";
import { motion } from "framer-motion";

function App() {
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
    </motion.div>
  );
}

export default App;
