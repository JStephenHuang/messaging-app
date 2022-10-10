import React, { useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Class

class idContextValue {
  constructor(public id: string = "----") {}

  saveId = (username: string) => {
    this.id = username;
  };
}

// Context

const defaultValue = new idContextValue();
const idContext = React.createContext<idContextValue>(defaultValue);
const useId = () => useContext(idContext);
const IdProvider = (props: { children: React.ReactNode }) => {
  return (
    <idContext.Provider value={defaultValue}>
      {props.children}
    </idContext.Provider>
  );
};

export { IdProvider, useId };
