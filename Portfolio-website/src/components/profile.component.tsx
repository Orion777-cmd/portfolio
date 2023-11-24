import React from "react";
import Social from "./socials.component";
import profile from "../assets/the_guitar.jpg";

const Profile = () => {
    return(
        <div className="container w-1/2 m-5 p-2 border-black shadow-lg flex flex-col ">
        <div className="flex justify-around items-center">
          <img src={profile} alt="" className="w-40 rounded-full" />
          <div className="details flex flex-col items-center justify-center ">
            <h1 className="text-2xl text-left">Hi, I am Abiy</h1>
            
            <h2 className="text-base text-left">Full-stack developer and Mobile app developer!</h2>
          </div>
        </div>
        <Social />
      
      </div>
    )
}

export default Profile;