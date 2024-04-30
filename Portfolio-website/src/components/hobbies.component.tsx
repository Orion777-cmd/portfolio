import { useDarkMode } from "../context/darkmode.context";
const Hobbies = () => {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`flex flex-wrap justify-center items-center m-2 p-2 h-30 ${
        darkMode ? "border-t-2 border-white" : "border-t-2 border-black"
      }`}
    >
      <p>
        Fueled by an unyielding curiosity about how technology shapes our lives,
        my journey has naturally led me to the world of software development. As
        a full-stack and mobile app developer, I thrive on continual learning
        and seizing opportunities to openly share insights. If something I
        create resonates with you, let's connect and discuss it on my social
        platforms. Your thoughts and feedback are always welcomed and valued.
      </p>
    </div>
  );
};

export default Hobbies;
