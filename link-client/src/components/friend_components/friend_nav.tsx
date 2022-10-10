import Sidebar from "../sidebar";
import Friends from "./friends";

const FriendNav = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen m-0
                 flex
               bg-zinc-900 text-white shadow-lg
                 z-10
                 2xl:w-[25%] w-[30%]
                 "
    >
      <Sidebar section="friends"></Sidebar>
      <Friends />
    </div>
  );
};

export default FriendNav;
