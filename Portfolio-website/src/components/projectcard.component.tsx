import React from "react";

const ProjectCard = () => {
    return (
        <div className="max-w-md w-200 h-200 mx-auto gap-2 bg-white rounded-xl shadow-lg border-black border-2">
            
            <div className="flex items-center justify-around h-50 p-4">
                
                <img className="w-12 h-12 rounded-full mr-4" src="../assets/the_guitar.jpg" alt="Project Image" />
               
                <h3 className="text-lg font-semibold">Project Name</h3>
            </div>

         
            <div className="p-4 border-t-2 border-black border-b-2">
               
                <p className="text-gray-600">Technologies: HTML, CSS, JavaScript</p>
            </div>

           
            <div className="p-4 border-b-2 border-black">
                
                <p className="text-gray-800">Project Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>

           
            <div className="flex items-center justify-end p-4">
                
                <a href="#" className="text-blue-500" target="_blank">GitHub Repository</a>
            </div>
        </div>
    )
}

export default ProjectCard;