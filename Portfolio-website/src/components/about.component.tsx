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
        I’m a Software Engineer with a strong focus on building innovative,
        scalable, and user-centered software solutions. Proficient in
        TypeScript, Python, Go, and Flutter, I specialize in full-stack
        development—bringing together intuitive front-end experiences and
        reliable back-end architectures. With a solid foundation in
        problem-solving and software design, I thrive in dynamic environments
        where collaboration and innovation drive impact. My experience ranges
        from designing seamless user interfaces to architecting systems that
        solve complex technical challenges. Beyond work, I’m eager to contribute
        to open-source projects, continuously refine my skills, and explore
        emerging technologies to stay ahead of the curve.
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
