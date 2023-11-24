import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "./projectcard.component";
import CustomPrevArrowComponent from "./customprevarrow.component";
import CustomNextArrowComponent from "./customnextarrow.component";


const Projects = () => {

    const sliderRef = React.useRef<Slider>(null);
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
        // swipeToSlide: true,
       
        prevArrow: <CustomPrevArrowComponent className="" style={{}} onClick={() => handleClick("prev")}/>,
        nextArrow: <CustomNextArrowComponent className="" style={{}} onClick={() => handleClick("next")}/>,
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
        <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Projects</h1>
            <Slider ref={sliderRef} {...settings} >
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </Slider>
        </div>
    )
}

export default Projects;