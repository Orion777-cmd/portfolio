import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useDarkMode} from "../context/darkmode.context";
const Header = () => {
    const {darkMode, setDarkMode} = useDarkMode();
    return (
        <div className="mx-auto pt-10 w-4/5 header flex flex-col lg:flex-row justify-between items-center ">
          <h1 className='text-4xl bold'>Abiy B. Bihonegn</h1>
          <div className=' w-2/5  flex items-center justify-around'>
            <a href="" className='text-bold text-4xl '>Resume</a>
            {darkMode ?  <CiLight className="text-2xl" onClick={() => setDarkMode(!darkMode)} /> : <MdDarkMode className="text-2xl" onClick={() => setDarkMode(!darkMode)} />}
          </div>
        </div>
    )
}

export default Header;