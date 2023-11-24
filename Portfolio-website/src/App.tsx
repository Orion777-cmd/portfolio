
import './App.css'


import Profile from "./components/profile.component";
import About from "./components/about.component";
import Languages from './components/languages.component';

function App() {
  

  return (
    <>
      <div className=" flex ">
        <Profile />

        <About />
      </div>

      <Languages />
    </>
    
    
  )
}

export default App
