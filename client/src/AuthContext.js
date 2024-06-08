import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getJwtToken } from "./utils/getCookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = getJwtToken();

  useEffect(() => {
    console.log(token);
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    Cookies.set("token", token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    // Also call the API to log out on the server side
    await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
