import {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "./projectcard.component";
import CustomPrevArrowComponent from "./customprevarrow.component";
import CustomNextArrowComponent from "./customnextarrow.component";
import { FaCrown } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa6";
import { SiNasa } from "react-icons/si";
import { PiAirplaneLandingFill } from "react-icons/pi";
import { useDarkMode } from "../context/darkmode.context";

const Projects = () => {
    const {darkMode} = useDarkMode();

    const sliderRef = useRef<Slider>(null);
    const handleClick = (direction:string) => {
        if(direction === "next"){
            sliderRef.current!.slickNext();
        }else if (direction === "prev"){
            sliderRef.current!.slickPrev();
        }
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        
        slidesToScroll:1,
        swipeToSlide: true,
       
        prevArrow: <CustomPrevArrowComponent classname={`absolute top-1/2 left-0 transform -translate-y-1/2 ${darkMode? 'text-white': 'text-black'} z-10 `} onClick={() => handleClick("prev")}/>,
        nextArrow: <CustomNextArrowComponent classname={`absolute top-1/2 right-0 transform -translate-y-1/2 ${darkMode? 'text-white': 'text-black'} text-black z-10`} onClick={() => handleClick("next")}/>,
        // initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]

    }
    return (
        <div className={`flex flex-col p-8 font-mono ${darkMode ? 'dark:bg-gray-900 dark:text-white' : ''}`}>
            <h1 className="font-bold text-2xl mb-6">Projects</h1>
            <Slider ref={sliderRef} {...settings} >
                <ProjectCard name="Ngus_Clothing" image={<FaCrown size={30} />} technologies={["react", "firebase", "scss","js" ]} description="Ngus_clothing is an e-commerce website for hats and clothing. The platform caters to both men and women, offering a seamless shopping experience." repoLink="https://github.com/Orion777-cmd/react_projects/tree/main/CRWN_Clothing"/>
                <ProjectCard name="github_tailwind" image={<FaGithubAlt size={30} />} technologies={["react", "tailwind" ]} description="A clone of a single page on github done with tailwindcss and react." repoLink="https://github.com/Orion777-cmd/react_projects/tree/main/github_tailwind"/>
                <ProjectCard name="Nasa_project" image={<SiNasa size={30} />} technologies={["react", "nodejs", "expressjs" ]} description="a web app built on a dataset provided by nasa that identifies list of habitable plantets and schedule expeditions with full CRUD operations" repoLink="https://github.com/Orion777-cmd/KOI/tree/main/NASA-project"/>
                <ProjectCard name="x_tour" image={<PiAirplaneLandingFill size={30} />} technologies={["flutter", "nodejs", "nestjs", "dart", "typescript","mongodb" ]} description="a social mobile apllication that is like instagram." repoLink="https://github.com/mikii17/xTour"/>
              
            </Slider>
        </div>
    )
}

export default Projects;