import {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "./projectcard.component";
import CustomPrevArrowComponent from "./customprevarrow.component";
import CustomNextArrowComponent from "./customnextarrow.component";
import { FaCrown } from "react-icons/fa";


const Projects = () => {

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
       
        prevArrow: <CustomPrevArrowComponent classname="absolute top-1/2 left-0 transform -translate-y-1/2 text-black z-10 " onClick={() => handleClick("prev")}/>,
        nextArrow: <CustomNextArrowComponent classname="absolute top-1/2 right-0 transform -translate-y-1/2 text-black z-10" onClick={() => handleClick("next")}/>,
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
        <div className="flex flex-col m-8 font-mono">
            <h1 className="font-bold text-2xl mb-6">Projects</h1>
            <Slider ref={sliderRef} {...settings} >
                <ProjectCard name="Ngus_Clothing" image={<FaCrown size={30}/>} technologies={["react", "firebase", "scss","js" ]} description="Ngus_clothing is an e-commerce website for hats and clothing. The platform caters to both men and women, offering a seamless shopping experience." repoLink="https://github.com/Orion777-cmd/react_projects/tree/main/CRWN_Clothing"/>
                <ProjectCard name="Ngus_Clothing" image={<FaCrown size={30}/>} technologies={["react", "firebase", "scss","js" ]} description="Ngus_clothing is an e-commerce website for hats and clothing. The platform caters to both men and women, offering a seamless shopping experience." repoLink="https://github.com/Orion777-cmd/react_projects/tree/main/CRWN_Clothing"/>
                <ProjectCard name="Ngus_Clothing" image={<FaCrown size={30}/>} technologies={["react", "firebase", "scss","js" ]} description="Ngus_clothing is an e-commerce website for hats and clothing. The platform caters to both men and women, offering a seamless shopping experience." repoLink="https://github.com/Orion777-cmd/react_projects/tree/main/CRWN_Clothing"/>
                <ProjectCard name="Ngus_Clothing" image={<FaCrown size={30}/>} technologies={["react", "firebase", "scss","js" ]} description="Ngus_clothing is an e-commerce website for hats and clothing. The platform caters to both men and women, offering a seamless shopping experience." repoLink="https://github.com/Orion777-cmd/react_projects/tree/main/CRWN_Clothing"/>
              
            </Slider>
        </div>
    )
}

export default Projects;