import { KeyboardEvent, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

import { useAPIs } from "../../context/APIContext";
import { useParams, useNavigate } from "react-router-dom";

interface RoomCreatePageProperties {
  setCreateOption: (boolean: boolean) => void;
  closeModal: () => void;
}

const RoomCreatePage = (props: RoomCreatePageProperties) => {
  const APIContext = useAPIs();
  const navigate = useNavigate();
  const params = useParams();
  const roomNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (roomNameInputRef.current) {
      roomNameInputRef.current.focus();
    }
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (roomNameInputRef.current) {
      if (event.key === "Enter" && roomNameInputRef.current.value !== "") {
        createRoom();
        roomNameInputRef.current.value = "";
      }
    }
  };

  const createRoom = () => {
    if (roomNameInputRef.current && params.user) {
      const roomName = roomNameInputRef.current.value;
      const roomOwner = params.user;
      APIContext.createRoom(roomName, roomOwner)
        .then((value) => {
          console.log("Successfully created a room");
          navigate(`/${params.user}/rooms/${value.data.roomUuid}`);
        })
        .catch((err) => console.log(err.message));
    }

    props.closeModal();
  };

  return (
    <div className="modal">
      <button
        className="back-modal"
        onClick={() => props.setCreateOption(false)}
      >
        <IoArrowBackOutline size={25} />
      </button>
      <button className="close-modal" onClick={props.closeModal}>
        <IoClose size={25} />
      </button>
      <div className="flex">
        <p className="text-amber-400 mr-[6px]">Create</p> a Room
      </div>

      <div className="text-[16px]">
        <input
          className="input-modal"
          type="text"
          placeholder="Room's name"
          onKeyDown={handleKeyDown}
          ref={roomNameInputRef}
        />
        <button type="submit" className="button-options" onClick={createRoom}>
          Create
        </button>
      </div>
    </div>
  );
};

export default RoomCreatePage;
