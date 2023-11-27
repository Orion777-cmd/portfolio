import { useDarkMode } from '../context/darkmode.context';
const About = () => {
    const { darkMode } = useDarkMode();
    const coffeeEmoji = '\u2615';
    return (
        <div className={`${darkMode ? 'bg-slate-600 border-white shadow-slate-400' : 'bg-black border-black shadow-black'} lg:w-1/2 m-5 p-4 min-w-lg  shadow-2xl  flex flex-col gap-4 justify-center items-center`}>
            <h1 className={`text-2xl text-white font-bold text-center`}>About me</h1>
            <p className={`text-left text-white mx-auto py-5`}>
                
                A regular guy navigating the vast realm of life while concurrently pursuing a BSc in Software Engineering at Addis Ababa Institute of Technology. 
                In the world of code, my philosophy centers on the ethical use of technology to empower and connect people. Hardwork, collaboration, and a commitment to lifelong learning guide my professional journey.
                My skills encompass languages like Java, Python, and JavaScript, with a specialization in full-stack development, blending front-end finesse with back-end robustness.
                Known for problem-solving and an analytical mindset, I thrive in collaborative, innovative environments.
                Outside the digital realm, I find joy in exploring the harmonies of music, delving into cinematic wonders, and immersing myself in the captivating narratives of novels.
                Sketching serves not only as a creative outlet but a means to visualize complex problems, and the lively play of <span className="text-lg">&#127955;</span> table tennis adds an extra layer of enjoyment to my daily life.
                Come alongside on this distinctive path where the finesse of code converges with the richness of life's encounters, making the journey a bit more navigable.
                
            </p>
            <p className={`text-lg text-white`}>{darkMode ? 'Why do programmers prefer dark mode?' : `Turning caffine ${coffeeEmoji} into code since 2021`} { darkMode && <span className={`opacity-0 hover:opacity-100`}> Because light attracts bugs!&#128514;</span>}</p>
        </div>
    )
}

export default About;