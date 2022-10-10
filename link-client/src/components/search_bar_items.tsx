import { useState } from "react";

import { BsThreeDots } from "react-icons/bs";

import ContextMenu from "./context_menu";

interface SearchBarItemsProperties {
  items: string;
}

const SearchBarItems = (props: SearchBarItemsProperties) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex">
      <div
        onContextMenu={(event: React.MouseEvent) => {
          event.preventDefault();
          console.log(event);
        }}
        className="search-bar-item"
      >
        {props.items}
        <BsThreeDots className="text-zinc-400" size={20} />
      </div>
    </div>
  );
};

export default SearchBarItems;
