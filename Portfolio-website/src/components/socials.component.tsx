import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";
import { SiCodewars } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";

const Socials = () => {
    return (
        <div className="socials flex justify-start gap-5 items-center p-5 h-30 border-top-black">
          <a href=""><FaLinkedin size={30}/></a>
          <a href=""><FaXTwitter size={30}/></a>
          <a href=""><FaGithub size={30}/></a>
          <a href=""><SiLeetcode size={30}/></a>
          <a href=""><SiCodeforces size={30}/></a>
          <a href=""><SiCodewars size={30}/></a>
          <a href=""><MdAlternateEmail size={30}/></a>

        </div>
    )
}

export default Socials;