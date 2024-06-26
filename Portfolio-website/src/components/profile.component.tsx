import Social from "./socials.component";

import { useDarkMode } from "../context/darkmode.context";

const Profile = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`container min-w-md lg:w-1/2 m-5 p-2 ${
        darkMode ? "border-white shadow-slate-500" : "border-black"
      } shadow-lg flex flex-col`}
    >
      <div className="flex xl:flex-row flex-col gap-2 justify-around items-center">
        <img
          src="./profile.jpeg"
          alt=""
          className="w-[200px] h-[200px] rounded-full object-cover object-center"
        />
        <div className="details flex flex-col items-center justify-center ">
          <h1 className="text-4xl text-center">Hi &#128075;, I am Abiy</h1>
          <h2 className="text-2xl text-center">
            A Full-stack and Mobile app developer.
          </h2>
        </div>
      </div>
      {/* <Hobbies /> */}
      <Social />
    </div>
  );
};

export default Profile;
