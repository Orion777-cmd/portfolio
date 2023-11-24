import React from "react";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { FaRust } from "react-icons/fa";
import { SiNeovim } from "react-icons/si";
import { SiDart } from "react-icons/si";

const Languages = () => {
    return (
        <div className="w-full">
            <div className="m-10 h-40 flex flex-col justify-around items-start">
                <h1 className="font-bold text-2xl">Programming Languages I work with</h1>
                <div className="flex justify-start gap-5 items-center">
                    <a href="" className="hover:scale-110"><SiPython size={30}/></a>                    
                    <a href="" className="hover:scale-110"><SiJavascript size={30}/></a>
                    <a href="" className="hover:scale-110"><SiTypescript size={30}/></a>
                    <a href="" className="hover:scale-110"><FaJava size={30}/></a>
                    <a href="" className="hover:scale-110"><FaGolang size={30}/></a>
                    <a href="" className="hover:scale-110"><FaRust size={30}/></a>
                    <a href="" className="hover:scale-110"><SiDart size={30}/></a>
                    <a href="" className="hover:scale-110"><SiNeovim size={30}/></a>

                </div>
            </div>
        </div>
    )
}

export default Languages;