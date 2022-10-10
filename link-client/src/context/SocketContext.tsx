import React, { useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

// Class

class socketContextValue {
  constructor(
    public socket: Socket = io("http://0.0.0.:5050", {
      withCredentials: true,
    })
  ) {}
}

// Context

const defaultValue = new socketContextValue();
const socketContext = React.createContext<socketContextValue>(defaultValue);
const useSocket = () => useContext(socketContext);
const SocketProvider = (props: { children: React.ReactNode }) => {
  return (
    <socketContext.Provider value={defaultValue}>
      {props.children}
    </socketContext.Provider>
  );
};

export { SocketProvider, useSocket };
