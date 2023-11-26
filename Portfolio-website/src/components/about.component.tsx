import { useDarkMode } from '../context/darkmode.context';
const About = () => {
    const { darkMode } = useDarkMode();
    return (
        <div className={`${darkMode ? 'bg-slate-600 border-white shadow-slate-400' : 'bg-black border-black shadow-black'} w-1/2 m-5 p-4 min-w-md  shadow-2xl  flex flex-col gap-4 justify-center items-center`}>
            <h1 className={`text-2xl text-white font-bold text-center`}>About me</h1>
            <p className={`text-left text-white mx-auto`}>Fueled by an unyielding curiosity about how technology shapes our lives, my journey naturally evolved into the vibrant world of software development. Here, I thrive as a full-stack and mobile app developer, driven by a genuine passion for continual learning. I genuinely enjoy seizing every opportunity to openly share insights. If something I create resonates with you, let's connect and chat about it on my social platforms. Your thoughts and feedback are always welcomed and valued.</p>
        </div>
    )
}

export default About;