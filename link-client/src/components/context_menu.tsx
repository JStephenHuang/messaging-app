import { useParams } from "react-router-dom";
import { useAPIs } from "../context/APIContext";

interface ContextMenuProperties {
  targetUuid: string;
  position: { x: number; y: number };
  openContextMenu: boolean;
}

const ContextMenu = (props: ContextMenuProperties) => {
  const params = useParams();
  const APIContext = useAPIs();

  const copyUuid = async () => {
    await navigator.clipboard.writeText(props.targetUuid);
    alert("Uuid Copied");
  };

  const leaveRoom = () => {
    APIContext.leaveRoom(props.targetUuid);
    alert("You Left the Room");
  };

  const deleteRoom = () => {
    APIContext.leaveRoom(props.targetUuid);
    alert("You Deleted the Room");
  };

  return (
    <div
      className="absolute flex flex-col
      bg-zinc-900 shadow-xl
      z-[35] text-[16px] w-[6rem] rounded-lg items-center"
      style={{ top: props.position.y, left: props.position.x }}
    >
      <button className="p-3 text-amber-400" onClick={copyUuid}>
        uuid
      </button>
      <hr className="w-[85%] border-zinc-600" />
      <button className="p-3 text-red-400" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
};

export default ContextMenu;
