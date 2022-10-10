import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface RoomOptionsProperties {
  setCreateOption: (boolean: boolean) => void;
  setJoinOption: (boolean: boolean) => void;
  closeModal: () => void;
}

const RoomOptions = (props: RoomOptionsProperties) => {
  return (
    <div className="modal">
      <button className="close-modal" onClick={props.closeModal}>
        <IoClose size={25} />
      </button>
      <div className="flex mb-5">
        Create or Join a <p className="text-amber-400 ml-[6px]">Room</p>
      </div>
      <div className="flex flex-col items-center text-white text-[16px] w-full">
        <button
          className="room-options-button"
          onClick={() => props.setCreateOption(true)}
        >
          Create Room
        </button>
        <button
          className="room-options-button"
          onClick={() => props.setJoinOption(true)}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomOptions;
