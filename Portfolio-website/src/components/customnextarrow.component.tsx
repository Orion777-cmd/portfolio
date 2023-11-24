import { FaArrowRight } from 'react-icons/fa'
type CustomNextArrowProps = {
    classname: string  | undefined;
   
    onClick: () => void;
};

const CustomNextArrow = (props: CustomNextArrowProps) => {
    const { classname, onClick } = props;
    return (
        <div
            className={classname}
          
            onClick={onClick}
        >
            <FaArrowRight size={30}/>
        </div>
    );
};

export default CustomNextArrow;