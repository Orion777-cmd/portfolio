import { FaArrowRight } from 'react-icons/fa'
type CustomNextArrowProps = {
    className: string  | undefined;
   
    onClick: () => void;
};

const CustomNextArrow = (props: CustomNextArrowProps) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
          
            onClick={onClick}
        >
            <FaArrowRight/>
        </div>
    );
};

export default CustomNextArrow;