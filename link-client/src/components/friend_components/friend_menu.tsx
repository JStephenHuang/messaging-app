import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

import { useAPIs } from "../../context/APIContext";
import { useParams } from "react-router";

interface FriendMenuProperties {
  isOpen: boolean;
  closeModal: () => void;
}

const FriendMenu = (props: FriendMenuProperties) => {
  const APIContext = useAPIs();
  const params = useParams();
  const [error, setError] = useState<string>("");
  const friendNameRefInput = useRef<HTMLInputElement>(null);

  const addFriend = () => {
    if (friendNameRefInput.current && params.user) {
      const friendName = friendNameRefInput.current.value;
      if (friendName === params.user) {
        setError("self-friend-error");
        return;
      }
      APIContext.addFriends(friendName, params.user)
        .then(() => {
          console.log("Friend added succesfully");
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 409") {
            setError("already-friend-error");
          } else if (err.message === "Request failed with status code 404") {
            setError("friend-notfound-error");
          }
        });
    }
  };

  if (props.isOpen) {
    return (
      <>
        <div
          onClick={props.closeModal}
          className="fixed z-30 h-screen w-screen bg-black opacity-60"
        ></div>
        <div className="modal">
          <button className="close-modal" onClick={props.closeModal}>
            <IoClose size={25} />
          </button>
          <div className="flex">
            Add a <p className="text-amber-300 ml-[6px]">friend</p>
          </div>
          {error === "already-friend-error" ? (
            <h1 className="text-red-500 text-[12px] my-2">
              User already friend
            </h1>
          ) : null}
          {error === "self-friend-error" ? (
            <h1 className="text-red-500 text-[12px] my-2">
              That's you dumbass
            </h1>
          ) : null}
          {error === "friend-notfound-error" ? (
            <h1 className="text-red-500 text-[12px] my-2">
              User doesn't exist
            </h1>
          ) : null}
          <div className="flex flex-col text-[16px] w-full items-center">
            <input
              className="input-modal"
              type="text"
              placeholder="Friend's name"
              ref={friendNameRefInput}
            />
            <button
              type="submit"
              onClick={addFriend}
              className="button-options"
            >
              Add
            </button>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default FriendMenu;
