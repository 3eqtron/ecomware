import { createContext } from "react";
import { useState } from "react";
import React from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const CU = localStorage.getItem("CurrentUser");
  const [user, setUser] = useState({
    userState: CU === null ? "Loged out" : "loged in",
    CurrentUser: JSON.parse(localStorage.getItem("CurrentUser")),
  });

  const login = () => {
    if (user.userState !== "loged in") {
      setUser({
        userState: "loged in",
        CurrentUser: JSON.parse(localStorage.getItem("CurrentUser")),
      });
    }
  };
  const logout = () => {
    if (user.userState !== "loged out") {
      localStorage.removeItem("CurrentUser");
      setUser({ userState: "loged out", CurrentUser: null });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
