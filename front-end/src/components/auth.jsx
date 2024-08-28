import React, { createContext, useState } from "react";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (credentials, onSuccess) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:6008/api/users/login",
        credentials
      );

      const token = response.data.accessToken;
      if (typeof token === "string") {
        setIsAuthenticated(true);
        sessionStorage.setItem("accessToken", token);
        onSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("accessToken");
    console.log(
      "Token removed. Current token:",
      sessionStorage.getItem("accessToken")
    ); // Confirm removal
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
