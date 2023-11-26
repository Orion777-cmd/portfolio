import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { SiCodeforces } from "react-icons/si";
import { SiCodewars } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";
import { useDarkMode } from "../context/darkmode.context";

const Socials = () => {
  const { darkMode } = useDarkMode();
  const borderClass = darkMode ? "border-white" : "border-black";

  return (
    <div className={`socials flex flex-wrap justify-center gap-5 items-center m-5 p-5 h-30 border-t-2 ${borderClass}`}>
      <a href="https://www.linkedin.com/in/abiy-biru-aa2ba3227/" className='hover:scale-110'><FaLinkedin size={30}/></a>
      <a href="https://twitter.com/biru_abiy" className='hover:scale-110'><FaXTwitter size={30}/></a>
      <a href="https://github.com/Orion777-cmd" className='hover:scale-110'><FaGithub size={30}/></a>
      <a href="https://leetcode.com/orion777_cmd/" className='hover:scale-110'><SiLeetcode size={30}/></a>
      <a href="https://codeforces.com/profile/Abiy" className='hover:scale-110'><SiCodeforces size={30}/></a>
      <a href="https://www.codewars.com/users/orion777" className='hover:scale-110'><SiCodewars size={30}/></a>
      <a href="mailto:abiy.biru78@gmail.com" className='hover:scale-110'><MdAlternateEmail size={30}/></a>
    </div>
  );
};

export default Socials;