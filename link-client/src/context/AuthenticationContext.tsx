import axios from "axios";
import io from "socket.io-client";

import React, { useContext } from "react";
import { APIContextValue } from "./APIContext";

class AuthContextValue extends APIContextValue {
  constructor(public readonly IP: string = `http://0.0.0.0:5050`) {
    super(IP);
  }

  register = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password,
    };

    const res = await this.axios.post(`${this.IP}/auth/register`, body);
  };
  login = async (username: string, password: string) => {
    const body = {
      username: username,
      password: password,
    };

    const res = await this.axios.post(`${this.IP}/auth/login`, body);
  };
  logout = async () => {
    await this.axios.post(`${this.IP}/auth/logout`);
  };

  isAuthenticated = async () => {
    return await this.axios.get(`${this.IP}/auth`);
  };
}

const defaultValue = new AuthContextValue();
const AuthContext = React.createContext<AuthContextValue>(defaultValue);
const useAuth = () => useContext(AuthContext);
const AuthProvider = (props: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={defaultValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
