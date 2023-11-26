import { useDarkMode } from "../context/darkmode.context";
const Hobbies = () => {
    const { darkMode } = useDarkMode();
    return(
        <div className={`flex flex-wrap justify-center items-center m-2 p-2 h-30 ${darkMode ? 'border-t-2 border-white' : 'border-t-2 border-black'}`}>
            <p>
                Exploring the harmonies of music, the cinematic world, and the written narratives in novels enriches my leisure. Meanwhile,
                having fun with sketching and diving into the lively play of <span className="text-lg">&#127955;</span> table tennis adds an extra layer of enjoyment to my daily life.
            </p>
        </div>
    )
};

export default Hobbies;