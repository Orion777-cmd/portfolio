import {useDarkMode} from '../context/darkmode.context';


const ProjectCard = ({ name, image, technologies, description, repoLink }: { name: string, image: React.ReactElement, technologies: string[], description: string, repoLink: string }) => {
    const { darkMode } = useDarkMode();
    return (
        <div className={`font-mono max-w-md w-200 h-200 mx-auto gap-2 bg-white rounded-xl shadow-md border-black border-2 ${darkMode ? 'dark:bg-gray-900 dark:text-white' : ''}`}>
            <div className={`flex items-center justify-around h-50 p-4 ${darkMode ? 'dark:border-white' : 'border-black'}`}>
                <div className="w-20 h-20 bg-blue-300 rounded-full flex justify-center items-center">
                    {image}
                </div>
                <h3 className={`text-lg font-mono ${darkMode ? 'dark:text-white' : ''}`}>{name}</h3>
            </div>
            <div className={`p-4 border-t-2 ${darkMode ? 'dark:border-white' : 'border-black'} border-b-2`}>
                <p className={`text-gray-600 ${darkMode ? 'dark:text-white' : ''}`}>{technologies.join(', ')}</p>
            </div>
            <div className={`p-4 border-b-2 ${darkMode ? 'dark:border-white' : 'border-black'}`}>
                <p className={`text-gray-800 ${darkMode ? 'dark:text-white' : ''}`}>{description}</p>
            </div>
            <div className="flex items-center justify-end p-4">
                <a href={repoLink} className={`text-blue-500 `} target="_blank">GitHub Repository</a>
            </div>
        </div>
    )
}

export default ProjectCard;