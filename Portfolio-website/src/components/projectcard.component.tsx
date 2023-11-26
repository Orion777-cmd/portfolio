

const ProjectCard = ({name, image, technologies, description, repoLink}: {name: string, image: React.ReactElement, technologies: string[], description: string, repoLink:string}) => {
    return (
        <div className="font-mono  max-w-md w-200 h-200 mx-auto gap-2 bg-white rounded-xl shadow-md border-black border-2">
            
            <div className="flex items-center justify-around h-50 p-4">
                
                <div className="w-20 h-20 bg-blue-300 rounded-full flex justify-center items-center">
                    {image}
                </div>
               
                <h3 className="text-lg font-mono">{name}</h3>
            </div>

         
            <div className="p-4 border-t-2 border-black border-b-2">
               
                <p className="text-gray-600">{technologies.join(', ')}</p>
            </div>

           
            <div className="p-4 border-b-2 border-black">
                
                <p className="text-gray-800">{description}</p>
            </div>

           
            <div className="flex items-center justify-end p-4">
                
                <a href={repoLink} className="text-blue-500" target="_blank">GitHub Repository</a>
            </div>
        </div>
    )
}

export default ProjectCard;