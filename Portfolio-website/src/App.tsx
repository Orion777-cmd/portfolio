
import './App.css'
import {useState, useEffect} from "react";


import Profile from "./components/profile.component";
import About from "./components/about.component";
import Languages from './components/languages.component';
import Projects from './components/projects.component';
import {motion} from "framer-motion";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";


function App() {
  const pageVariants = {
    initial:{
      opacity:0,
      y: 300,
    },
    animate:{
      opacity: 1,
      y:0,
      transition:{
        duration: 1,
      }
    }
  };

  const [darkMode, setDarkMode] = useState(false);

  return (
    
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className={ `${darkMode ? 'dark:bg-gray-900 dark:text-white' : ''}`}
    >
      <div className="mx-auto pt-10 w-4/5 header flex justify-between items-center ">
          <h1 className='text-4xl bold'>Abiy Biru</h1>
          <div className=' w-1/4  flex items-center justify-between'>
            <a href="" className='text-bold text-4xl '>Resume</a>
            {darkMode ?  <CiLight className="text-2xl" onClick={() => setDarkMode(!darkMode)} /> : <MdDarkMode className="text-2xl" onClick={() => setDarkMode(!darkMode)} />}
          </div>
        </div>
      <div 
        className=" flex lg:flex-row flex-col items-center justify-center  font-mono" 
        
      >
        
        <Profile />

        <About />
      </div>

      <Languages />
      <Projects />
    </motion.div>
    
    
  )
}

export default App
