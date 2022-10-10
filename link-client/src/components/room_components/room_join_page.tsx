import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

import { useAPIs } from "../../context/APIContext";
import { useParams, useNavigate } from "react-router-dom";

interface RoomJoinPageProperties {
  setJoinOption: (boolean: boolean) => void;
  closeModal: () => void;
}

const RoomJoinPage = (props: RoomJoinPageProperties) => {
  const APIContext = useAPIs();
  const navigate = useNavigate();
  const params = useParams();
  const [error, setError] = useState<string>("");
  const roomIdInputRef = useRef<HTMLInputElement>(null);

  const joinRoom = () => {
    if (roomIdInputRef.current) {
      const uuid: string = roomIdInputRef.current.value;
      APIContext.joinRoom(uuid)
        .then(() => {
          console.log("Successfully joined room");
          navigate(`/${params.user}/rooms/${uuid}`);
        })
        .catch((err) => {
          if ((err.message = "Request failed with status code 404")) {
            setError("room-not-found");
          }
        });
    }
    props.closeModal();
  };

  return (
    <div className="modal">
      <button className="back-modal" onClick={() => props.setJoinOption(false)}>
        <IoArrowBackOutline size={25} />
      </button>
      <button className="close-modal" onClick={props.closeModal}>
        <IoClose size={25} />
      </button>
      <div className="flex">
        <p className="text-amber-400 mr-[6px]">Join</p> a Room
      </div>
      {error === "room-not-found" ? (
        <h1 className="text-red-500 text-[12px] my-2">Room not found</h1>
      ) : null}
      <div className="text-[16px]">
        <input
          className="input-modal"
          type="text"
          placeholder="Room's id"
          ref={roomIdInputRef}
        />
        <button type="submit" className="button-options" onClick={joinRoom}>
          Join
        </button>
      </div>
    </div>
  );
};

export default RoomJoinPage;
