import React from "react";
import { FaArrowLeft } from 'react-icons/fa'
type CustomPrevArrowProps = {
    className: string;
    
    onClick: () => void;
};

const CustomPrevArrow = (props: CustomPrevArrowProps) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
           
            onClick={onClick}
        >
            <FaArrowLeft size={30}/>
        </div>
    );
};



export default CustomPrevArrow;