import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

import RoomOptions from "../components/room_components/room_options";
import RoomJoinPage from "../components/room_components/room_join_page";
import RoomCreatePage from "../components/room_components/room_create_page";
import { join } from "path";

interface RoomMenuProperties {
  isOpen: boolean;
  closeModal: () => void;
}

const RoomMenu = (props: RoomMenuProperties) => {
  const [createOption, setCreateOption] = useState<boolean>(false);
  const [joinOption, setJoinOption] = useState<boolean>(false);

  if (true) {
    return (
      <>
        <div
          onClick={props.closeModal}
          className="fixed z-30 h-screen w-screen bg-black opacity-60"
        ></div>
        {createOption ? (
          <RoomCreatePage
            setCreateOption={setCreateOption}
            closeModal={props.closeModal}
          />
        ) : null}
        {joinOption ? (
          <RoomJoinPage
            setJoinOption={setJoinOption}
            closeModal={props.closeModal}
          />
        ) : null}
        {createOption || joinOption ? null : (
          <RoomOptions
            setCreateOption={setCreateOption}
            setJoinOption={setJoinOption}
            closeModal={props.closeModal}
          />
        )}
      </>
    );
  }
  return null;
};

export default RoomMenu;
