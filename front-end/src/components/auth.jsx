import React, { createContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
        sessionStorage.setItem("accessToken", token); // Storing accessToken in local storage after login.
        // sessionStorage.setItem("email", credentials.email); // Storing email in local storage after login.
        sessionStorage.setItem("role", response.data.roleName); // Storing user role in local storage after login.
        sessionStorage.setItem("userId", response.data.userId); // Storing user ID in local storage after login.
        sessionStorage.setItem("branchCode", response.data.branchCode); // Storing branchCode in local storage after login.
        onSuccess();
      }

      toast.success("Login Successfull!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    } catch (err) {
      toast.error("Invalid Username/Password", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("accessToken");

    toast.success("You have successfully logged out!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });

    // Confirm removal
    console.log(
      "Token removed. Current token:",
      sessionStorage.getItem("accessToken")
    );
  };

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
        {children}
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
};
