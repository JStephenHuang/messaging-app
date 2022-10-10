import { useEffect, useState } from "react";

import { MdAdd } from "react-icons/md";

import { useParams } from "react-router-dom";
import { useAPIs } from "../../context/APIContext";

import { Link } from "react-router-dom";

import FriendMenu from "./friend_menu";
import SearchBar from "../search_bar";
import ListIcon from "../list_icon";
import ContextMenu from "../context_menu";

const Friends = () => {
  const params = useParams();
  const APIContext = useAPIs();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [friends, setFriends] = useState<
    Array<{ recipients: { user1: string; user2: string }; uuid: string }>
  >([]);

  const frontEndFriends: JSX.Element[] = [];

  useEffect(() => {
    APIContext.getFriends().then((value) => {
      setFriends(value.data);
    });
  }, [friends]);

  const contextMenu = (event: any) => {
    event.preventDefault();
    console.log("sd");
    console.log(event.pageX);
    console.log(event.pageY);
  };

  for (let i = 0; i < friends.length; i++) {
    frontEndFriends.push(
      <Link
        className="w-full"
        key={i}
        to={`/${params.user}/friends/${friends[i].uuid}`}
      >
        <ListIcon
          name={null}
          uuid={friends[i].uuid}
          recipient={friends[i].recipients}
          onContextMenu={contextMenu}
        ></ListIcon>
      </Link>
    );
  }

  return (
    <>
      <FriendMenu
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      ></FriendMenu>

      <div className="w-[80%] right-0 top-0 bg-zinc-800 h-screen">
        <div className="flex items-center px-5 shadow-lg h-[8%] 2xl:h-[5%] bg-zinc-900">
          <SearchBar placeholder="Search users..." data="user" />
        </div>
        <div className="front-list">
          {frontEndFriends}
          <div className="add-icon mt-10">
            <MdAdd onClick={() => setIsOpen(true)} />
          </div>
        </div>

        <div className="profile">
          <div className="h-8 w-8 2xl:h-12 2xl:w-12 bg-amber-400 rounded-full mr-2" />
          <div className="flex flex-col text-[15px]">
            <p>{params.user}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
