import { useDarkMode } from "../context/darkmode.context";
const About = () => {
  const { darkMode } = useDarkMode();
  const coffeeEmoji = "\u2615";
  return (
    <div
      className={`${
        darkMode
          ? "bg-slate-600 border-white shadow-slate-400"
          : "bg-black border-black shadow-black"
      } lg:w-1/2 m-5 p-4 min-w-lg  shadow-2xl  flex flex-col gap-4 justify-center items-center`}
    >
      <h1 className={`text-2xl text-white font-bold text-center`}>About me</h1>
      <p
        className={`text-left text-white text-lg font-normal text mx-auto py-5`}
      >
        As a fourth-year Software Engineering student at Addis Ababa Institute
        of Technology, I am deeply committed to leverage my technical skills and
        knowledge to develop innovative software solutions that drive business
        growth and enhance user experience. Proficient in typescript, python ,
        golang, flutter, I specialize in full-stack development, seamlessly
        blending front-end finesse with robust back-end solutions. My expertise
        lies in crafting efficient and scalable software architectures that
        address complex technical challenges. With a strong foundation in
        problem-solving and an analytical mindset, I thrive in dynamic and
        innovative environments where collaborative efforts drive progress.
        Outside the realm of academia, my passion for technology extends to
        exploring the intricacies of software development methodologies,
        refining my coding skills, and staying abreast of emerging trends in the
        field. My experience encompasses a wide range of projects, from
        designing intuitive user interfaces to architecting scalable backend
        systems. Beyond my academic pursuits, I am deeply engaged in the vibrant
        community of software engineers, actively contributing to open-source
        projects and participating in industry events to broaden my knowledge
        and network with like-minded professionals.
      </p>
      <p className={`text-lg text-white`}>
        {darkMode
          ? "Why do programmers prefer dark mode?"
          : `Turning caffine ${coffeeEmoji} into code since 2021`}{" "}
        {darkMode && (
          <span className={`opacity-0 hover:opacity-100`}>
            {" "}
            Because light attracts bugs!&#128514;
          </span>
        )}
      </p>
    </div>
  );
};

export default About;
