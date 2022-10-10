import { MouseEvent, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";

import { useAPIs } from "../../context/APIContext";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketContext";

import { Link, useNavigate } from "react-router-dom";

import ListIcon from "../list_icon";
import RoomMenu from "./room_menu";
import SearchBar from "../search_bar";
import ContextMenu from "../context_menu";
import { stringify } from "querystring";

type RoomType = {
  name: string;
  uuid: string;
};

const Rooms = () => {
  const APIContext = useAPIs();
  const params = useParams();
  const SocketContext = useSocket();

  const lastListIconeRef = useRef<HTMLInputElement>(null);

  const [ownership, setOwnership] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openContextMenu, setOpenContextMenu] = useState<boolean>(false);
  const [targetUuid, setTargetUuid] = useState<string>("");
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [rooms, setRooms] = useState<
    Array<{ owner: string; name: string; uuid: string }>
  >([]);

  const frontEndRooms: JSX.Element[] = [];

  const getRooms = () => {
    APIContext.getRooms().then((value) => {
      setRooms(value.data);
    });
  };

  useEffect(() => {
    getRooms();
    if (params.user) {
      const event = `create/room/${params.user}`;
      SocketContext.socket.on(event, getRooms);

      return () => {
        SocketContext.socket.off(event, getRooms);
      };
    }
  }, []);

  useEffect(() => {
    const handleClick = () => setOpenContextMenu(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  });

  const contextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOpenContextMenu(true);
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setTargetUuid(event.currentTarget.id);
  };

  for (let i = 0; i < rooms.length; i++) {
    frontEndRooms.push(
      <>
        <Link
          className="w-full"
          key={i}
          to={`/${params.user}/rooms/${rooms[i].uuid}`}
        >
          <ListIcon
            name={rooms[i].name}
            uuid={rooms[i].uuid}
            recipient={null}
            onContextMenu={contextMenu}
          />
        </Link>
      </>
    );
  }

  return (
    <>
      <RoomMenu isOpen={openMenu} closeModal={() => setOpenMenu(false)} />
      <div className="w-[80%] right-0 top-0 bg-zinc-800 h-screen">
        <div className="flex items-center px-5 shadow-lg h-[8%] 2xl:h-[5%] bg-zinc-900">
          <SearchBar placeholder="Search rooms..." data="user" />
        </div>
        <div className="front-list">
          {frontEndRooms}
          <div className="add-icon">
            <MdAdd onClick={() => setOpenMenu(true)} />
          </div>
        </div>
        <div className="profile">
          <div className="h-8 w-8 2xl:h-12 2xl:w-12 bg-amber-400 rounded-full mr-2" />
          <div className="flex flex-col text-[15px]">
            <p>{params.user}</p>
          </div>
        </div>
      </div>
      {openContextMenu && (
        <ContextMenu
          targetUuid={targetUuid}
          position={menuPosition}
          openContextMenu={openContextMenu}
        />
      )}
    </>
  );
};

export default Rooms;
