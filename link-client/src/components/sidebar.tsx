import { Link, useNavigate, useParams } from "react-router-dom";
import { BiConversation } from "react-icons/bi";
import { IoIosContacts } from "react-icons/io";
import { BiCog } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect } from "react";
import { useAuth } from "../context/AuthenticationContext";

import SideBarIcon from "./sidebar_icon";

interface SidebarProperties {
  section: string;
}

const Sidebar = (props: SidebarProperties) => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const params = useParams();

  const logout = () => {
    authContext.logout();
    navigate("/login");
  };

  useEffect(() => {
    authContext.isAuthenticated().then((res) => {
      if (!res.data) {
        navigate("/login");
      }
    });
  }, []);

  const size = "text-[20px] 2xl:text-[28px]";

  return (
    <div
      className="top-0 left-0 h-[90%] xl:h-screen w-[30%] xl:w-[25%] m-0
                 flex flex-col text-white z-10 items-center
                 border-r-2 border-zinc-800
                 
                 "
    >
      <h1
        className="text-[15px] 2xl:text-[18px] mb-5 flex items-center justify-center mt-5
                      "
      >
        <Link to={"/"}>
          asian<span className="text-amber-300">convo</span>
        </Link>
      </h1>
      <SideBarIcon
        icon={<IoIosContacts className={`${size}`} />}
        text="Friends"
        section="friends"
        selectedSection={props.section}
      />

      <SideBarIcon
        icon={<BiConversation className={`${size}`} />}
        text="Rooms"
        section="rooms"
        selectedSection={props.section}
      />
      <div className="mt-auto"></div>

      <SideBarIcon
        icon={<BiCog className={`${size}`} />}
        text="Settings"
        section="settings"
        selectedSection={props.section}
      />

      <div className={"sidebar-icon-logout group"} onClick={logout}>
        {<HiOutlineLogout className={`${size}`} />}
        <span className="sidebar-tooltip group-hover:scale-100">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
