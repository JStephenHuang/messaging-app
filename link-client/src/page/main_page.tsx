import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="text">
      <div className="bg-zinc-800 h-screen text-white flex flex-col items-center justify-center text-[24px]">
        <ul className="flex w-1/5 justify-around underline text-red-400">
          <li className="">
            <Link to={"/login"}>Login</Link>
          </li>
          <li className="">
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
