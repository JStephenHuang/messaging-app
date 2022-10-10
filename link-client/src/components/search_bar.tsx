import axios from "axios";

import { BsThreeDots } from "react-icons/bs";
import { ChangeEvent, useState, useEffect } from "react";

import { useAPIs } from "../context/APIContext";

import SearchBarItems from "./search_bar_items";

interface SearchBarProperties {
  placeholder: string;
  data: string;
}

const SearchBar = (props: SearchBarProperties) => {
  const [filteredUsernames, setFilteredUsernames] = useState<Array<string>>([]);
  const [prefix, setPrefix] = useState<string>("");

  // const newFilter = props.data.filter((value) => {
  //   return value.first_name.toLowerCase().includes(searchWord.toLowerCase());
  // });
  const APIContext = useAPIs();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrefix(event.target.value);
  };

  useEffect(() => {
    APIContext.searchUsers(prefix).then((value) => {
      setFilteredUsernames(prefix === "" ? [] : value.data);
    });
  }, [prefix]);

  return (
    <div className=" w-full z-20">
      <input
        className="search-bar"
        type="text"
        placeholder={props.placeholder}
        onChange={handleOnChange}
      />
      {prefix !== "" ? (
        <>
          <div className="h-48 overflow-auto text-zinc-900 w-full z-40">
            {filteredUsernames.map((usernames, key) => {
              return <SearchBarItems key={key} items={usernames} />;
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SearchBar;
