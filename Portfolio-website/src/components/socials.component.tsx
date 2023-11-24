import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";
import { SiCodewars } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";

const Socials = () => {
    return (
        <div className="socials flex justify-start gap-5 items-center m-5 p-5 h-30 border-t-2 border-b-2 border-black">
          <a href="" className='hover:scale-110'><FaLinkedin size={30}/></a>
          <a href="" className='hover:scale-110'><FaXTwitter size={30}/></a>
          <a href="" className='hover:scale-110'><FaGithub size={30}/></a>
          <a href="" className='hover:scale-110'><SiLeetcode size={30}/></a>
          <a href="" className='hover:scale-110'><SiCodeforces size={30}/></a>
          <a href="" className='hover:scale-110'><SiCodewars size={30}/></a>
          <a href="" className='hover:scale-110'><MdAlternateEmail size={30}/></a>

        </div>
    )
}

export default Socials;