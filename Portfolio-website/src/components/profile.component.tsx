import { useEffect, useState } from "react";
import Social from "./socials.component";
import Hobbies from "./hobbies.component";
import abiy_gogh from "../assets/abiy_gogh.jpg";
import van_biru from "../assets/van_biru.jpg";
import the_guitar from "../assets/the_guitar.jpg";
import flower_pot from "../assets/flower_pot.jpg";


let profilePhotos: string[] = [abiy_gogh, van_biru, the_guitar, flower_pot];

// let randomPhoto: string = '';
const Profile = () => {
  let [currentPhoto, setCurrentPhoto] = useState('');
  useEffect(() => {
    setCurrentPhoto(profilePhotos[Math.floor(Math.random() * profilePhotos.length)]);
  }, [])
    
    return(
        <div className="container min-w-md w-1/2 m-5 p-2 border-black shadow-lg flex flex-col ">
        <div className="flex xl:flex-row flex-col gap-2 justify-around items-center">
          <img src={currentPhoto} alt="" className="w-[200px] h-[200px] rounded-full object-cover object-center" />
          <div className="details flex flex-col items-center justify-center ">
            <h1 className="text-4xl text-center">Hi &#128075;, I am Abiy</h1>
            
            <h2 className="text-2xl text-center">A Full-stack and Mobile app developer.</h2>
          </div>
        </div>
        <Hobbies />
        <Social />

      </div>
    )
}

export default Profile;