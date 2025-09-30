import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaGolang } from "react-icons/fa6";
import { FaRust } from "react-icons/fa";
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
        <h1 className="font-bold text-2xl">Tech Stacks I work with.</h1>
        <div className="flex flex-wrap justify-start gap-5 items-center">
          <a
            href="https://www.typescriptlang.org/docs/"
            className="hover:scale-110"
          >
            <SiTypescript size={40} />
          </a>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            className="hover:scale-110"
          >
            <SiJavascript size={40} />
          </a>
          <a href="https://www.python.org/doc/" className="hover:scale-110">
            <SiPython size={40} />
          </a>
          <a
            href="https://docs.oracle.com/en/java/"
            className="hover:scale-110"
          >
            <FaJava size={40} />
          </a>
          <a href="https://golang.org/doc/" className="hover:scale-110">
            <FaGolang size={40} />
          </a>
          <a href="https://www.rust-lang.org/learn" className="hover:scale-110">
            <FaRust size={40} />
          </a>
          <a href="https://dart.dev/guides" className="hover:scale-110">
            <SiDart size={40} />
          </a>
          {/* <a href="" className="hover:scale-110"><SiNeovim size={40}/></a> */}
          <a href="https://flutter.dev/docs" className="hover:scale-110">
            <SiFlutter size={40} />
          </a>
          <a
            href="https://reactjs.org/docs/getting-started.html"
            className="hover:scale-110"
          >
            <FaReact size={40} />
          </a>
          <a href="https://nextjs.org/docs" className="hover:scale-110">
            <SiNextdotjs size={40} />
          </a>
          <a
            href="https://expressjs.com/en/4x/api.html"
            className="hover:scale-110"
          >
            <SiExpress size={40} />
          </a>
          <a href="https://docs.nestjs.com/" className="hover:scale-110">
            <SiNestjs size={40} />
          </a>
          <a href="https://tailwindcss.com/docs" className="hover:scale-110">
            <SiTailwindcss size={40} />
          </a>
          <a href="https://docs.mongodb.com/" className="hover:scale-110">
            <DiMongodb size={40} />
          </a>
          <a
            href="https://www.postgresql.org/docs/"
            className="hover:scale-110"
          >
            <BiLogoPostgresql size={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Languages;
