import React from "react";

type CustomPrevArrowProps = {
    className: string;
    style: React.CSSProperties;
    onClick: () => void;
};

const CustomPrevArrow = (props: CustomPrevArrowProps) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
};



export default CustomPrevArrow;