
import './App.css'


import Profile from "./components/profile.component";
import About from "./components/about.component";
import Languages from './components/languages.component';
import Projects from './components/projects.component';

function App() {
  

  return (
    <>
      <div className=" flex ">
        <Profile />

        <About />
      </div>

      <Languages />
      <Projects />
    </>
    
    
  )
}

export default App
