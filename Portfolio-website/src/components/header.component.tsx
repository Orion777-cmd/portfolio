import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useDarkMode} from "../context/darkmode.context";
const Header = () => {
    const {darkMode, setDarkMode} = useDarkMode();
    return (
        <div className="mx-auto pt-10 w-4/5 header flex justify-between items-center ">
          <h1 className='text-4xl bold'>Abiy Biru</h1>
          <div className=' w-1/4  flex items-center justify-between'>
            <a href="" className='text-bold text-4xl '>Resume</a>
            {darkMode ?  <CiLight className="text-2xl" onClick={() => setDarkMode(!darkMode)} /> : <MdDarkMode className="text-2xl" onClick={() => setDarkMode(!darkMode)} />}
          </div>
        </div>
    )
}

export default Header;