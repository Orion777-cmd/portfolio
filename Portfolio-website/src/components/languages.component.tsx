
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
// import { FaRust } from "react-icons/fa";
// import { SiNeovim } from "react-icons/si";
import { SiDart } from "react-icons/si";
import { SiFlutter } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { SiExpress } from "react-icons/si";
import { SiNestjs } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";

const Languages = () => {
    return (
        <div className="max-w-full font-mono">
            <div className="m-10 h-40 flex flex-col justify-around items-start">
                <h1 className="font-bold text-2xl">Tech Stacks I am familiar with.</h1>
                <div className="flex flex-wrap justify-start gap-5 items-center">
                    <a href="" className="hover:scale-110"><SiPython size={30}/></a>                    
                    <a href="" className="hover:scale-110"><SiJavascript size={30}/></a>
                    <a href="" className="hover:scale-110"><SiTypescript size={30}/></a>
                    <a href="" className="hover:scale-110"><FaJava size={30}/></a>
                    <a href="" className="hover:scale-110"><FaGolang size={30}/></a>
                    {/* <a href="" className="hover:scale-110"><FaRust size={30}/></a> */}
                    <a href="" className="hover:scale-110"><SiDart size={30}/></a>
                    {/* <a href="" className="hover:scale-110"><SiNeovim size={30}/></a> */}
                    <a href="" className="hover:scale-110"><SiFlutter size={30}/></a>
                    <a href="" className="hover:scale-110"><FaReact size={30}/></a>
                    <a href="" className="hover:scale-110"><SiNextdotjs size={30}/></a>
                    <a href="" className="hover:scale-110"><SiExpress size={30}/></a>
                    <a href="" className="hover:scale-110"><SiNestjs size={30}/></a>
                    <a href="" className="hover:scale-110"><SiTailwindcss size={30}/></a>
                    <a href="" className="hover:scale-110"><DiMongodb size={30}/></a>
                    <a href="" className="hover:scale-110"><BiLogoPostgresql size={30}/></a>



                </div>
            </div>
        </div>
    )
}

export default Languages;