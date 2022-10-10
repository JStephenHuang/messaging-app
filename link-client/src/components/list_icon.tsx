import { MouseEvent } from "react";
import { useParams } from "react-router-dom";

interface ListIconProperties {
  name: string | null;
  uuid: string;
  recipient: { user1: string; user2: string } | null;
  onContextMenu: (event: MouseEvent<HTMLDivElement>) => void;
}

const ListIcon = (props: ListIconProperties) => {
  const params = useParams();

  let name = "";

  if (props.recipient) {
    const user1 = props.recipient.user1;
    const user2 = props.recipient.user2;
    if (params.user === user1) {
      name = user2;
    } else {
      name = user1;
    }
  }
  if (props.name) {
    name = props.name;
  }

  return (
    <div
      id={props.uuid}
      onContextMenu={props.onContextMenu}
      className={
        params.uuid === props.uuid
          ? "list-icon bg-zinc-600"
          : "list-icon 2xl:text-[20px] hover:bg-zinc-700"
      }
    >
      <div className="flex items-center">
        <div className="h-8 w-8 2xl:h-12 2xl:w-12 bg-amber-400 rounded-full mr-3"></div>
        {name}
      </div>
    </div>
  );
};

export default ListIcon;
