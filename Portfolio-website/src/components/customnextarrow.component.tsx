type CustomNextArrowProps = {
    className: string  | undefined;
    style: React.CSSProperties | null;
    onClick: () => void;
};

const CustomNextArrow = (props: CustomNextArrowProps) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
};

export default CustomNextArrow;