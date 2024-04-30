import { FaArrowLeft } from "react-icons/fa";
type CustomPrevArrowProps = {
  classname: string;

  onClick: () => void;
};

const CustomPrevArrow = (props: CustomPrevArrowProps) => {
  const { classname, onClick } = props;
  return (
    <div className={classname} onClick={onClick}>
      <FaArrowLeft size={30} />
    </div>
  );
};

export default CustomPrevArrow;
