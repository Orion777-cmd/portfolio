
import './App.css'
import Profile from "./assets/the_guitar.jpg";

function App() {
  

  return (
    <div className=" flex ">
      <div className="container w-1/2 m-5 p-2 border-black shadow-lg flex ">
      <div className="flex justify-around items-center">
        <img src={Profile} alt="" className="w-40 rounded-full" />
        <div className="details flex flex-col items-center justify-center ">
          <h1 className="text-2xl text-left">Hi, I am Abiy</h1>
          
          <h2 className="text-base text-left">Full-stack developer and Mobile app developer!</h2>
        </div>
      </div>
      
      </div>

      <div className="bg-orange-100 w-1/2 m-5 p-4 border-black shadow-2xl flex flex-col justify-center items-center">
        <h1 className="text-2xl text-center">About me</h1>
        <p className="text-left mx-auto">I am a full-stack developer and mobile app developer. I have a passion for learning and sharing my knowledge with others as publicly as possible. If you found value in something I have created, please feel free to give me a shout out @abiybini on Twitter.</p>
      </div>
    </div>
    
  )
}

export default App
