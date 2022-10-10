import { useState } from "react";

import RoomOptions from "./room_options";
import RoomJoinPage from "./room_join_page";
import RoomCreatePage from "./room_create_page";

interface RoomMenuProperties {
  isOpen: boolean;
  closeModal: () => void;
}

const RoomMenu = (props: RoomMenuProperties) => {
  const [createOption, setCreateOption] = useState<boolean>(false);
  const [joinOption, setJoinOption] = useState<boolean>(false);

  const closeModal = () => {
    props.closeModal();
    setCreateOption(false);
    setJoinOption(false);
  };

  if (props.isOpen) {
    return (
      <>
        <div
          onClick={closeModal}
          className="fixed z-30 h-screen w-screen bg-black opacity-60"
        ></div>
        {createOption ? (
          <RoomCreatePage
            setCreateOption={setCreateOption}
            closeModal={closeModal}
          />
        ) : null}
        {joinOption ? (
          <RoomJoinPage setJoinOption={setJoinOption} closeModal={closeModal} />
        ) : null}
        {createOption || joinOption ? null : (
          <RoomOptions
            setCreateOption={setCreateOption}
            setJoinOption={setJoinOption}
            closeModal={closeModal}
          />
        )}
      </>
    );
  }
  return null;
};

export default RoomMenu;
