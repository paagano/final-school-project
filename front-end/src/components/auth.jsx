// import React, {
//   useState,
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check for the access token in sessionStorage during initialization
//     const accessToken = sessionStorage.getItem("accessToken");

//     if (accessToken) {
//       // Set the user as authenticated
//       setUser({ isAuthenticated: true });
//     }
//   }, []);

//   const login = (accessToken) => {
//     // Save the access token to sessionStorage
//     sessionStorage.setItem("accessToken", accessToken);
//     // Set the user as authenticated
//     setUser({ isAuthenticated: true });
//   };

//   //   const logout = () => {
//   //     // Remove the token from sessionStorage
//   //     sessionStorage.removeItem("accessToken");
//   //     setUser(null);
//   //     navigate("/login", { replace: true });
//   //   };

//   const logout = async () => {
//     try {
//       // Clear server-side session
//       await axios.delete("http://localhost:4000/api/auth/logout");

//       // Clear client-side session
//       sessionStorage.removeItem("accessToken");
//       sessionStorage.removeItem("refreshToken");
//       setUser(null);
//       navigate("/login", { replace: true });
//     } catch (error) {
//       console.error(
//         "Error during logout:",
//         error.response.data.error || error.message
//       );
//       // Handle error scenario, e.g., display an error message to the user
//     }
//   };
//   const contextValue = useMemo(
//     () => ({
//       user,
//       login,
//       logout,
//     }),
//     [user]
//   );

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>

//     // <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

//**************************

import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  // const baseURL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    // Check for the access token on each render
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
      //   // Set the user as authenticated:
      setUser({ isAuthenticated: true });
    } else if (location.pathname === "/changePassword") {
      setUser({ isAuthenticated: false });
    } else if (location.pathname.startsWith("/resetPassword/")) {
      // Exclude the '/resetPassword/:token' route from redirection
      setUser({ isAuthenticated: false });
    }
    //   if (accessToken || location.pathname === '/changePassword') {
    //     // Set the user as authenticated
    //     setUser({ isAuthenticated: true });
    // }
    else {
      // If no access token is found, redirect to the login page
      navigate("/login", { replace: true });
    }
  }, [navigate, currentLocation]);

  const refreshToken = async () => {};

  const login = (accessToken) => {
    // Save the access token to sessionStorage
    sessionStorage.setItem("accessToken", accessToken);
    // Set the user as authenticated
    setUser({ isAuthenticated: true });
  };

  const logout = () => {
    // Remove the token from sessionStorage
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login", { replace: true });
  };

  //function to redirect user after idle time of inactivity
  const setupIdleTimeout = () => {
    let timeoutId;

    const resetIdleTimeout = () => {
      // Clear the existing timeout
      clearTimeout(timeoutId);

      // Set a new timeout for 2 minutes (adjust as needed)
      timeoutId = setTimeout(() => {
        // Log the user out after 10 minutes of inactivity
        logout();

        // Redirect to the login page
        navigate("/login", { replace: true });
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    };

    // Set up event listeners to reset the idle timeout on user activity
    const resetEvents = ["mousemove", "keydown", "mousedown", "touchstart"];
    resetEvents.forEach((event) => {
      window.addEventListener(event, resetIdleTimeout);
    });

    // Initialize the idle timeout
    resetIdleTimeout();

    // Cleanup event listeners when the component unmounts
    return () => {
      resetEvents.forEach((event) => {
        window.removeEventListener(event, resetIdleTimeout);
      });
      clearTimeout(timeoutId);
    };
  };

  // Set up the idle timeout when the component mounts
  useEffect(() => {
    const cleanupIdleTimeout = setupIdleTimeout();

    return () => {
      // Clean up the idle timeout setup when the component unmounts
      cleanupIdleTimeout();
    };
  }, [navigate]);

  // Set up an Axios interceptor for handling 401 errors
  // useEffect(() => {
  //   const interceptor = axios.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       if (error.response && error.response.status === 401) {
  //         // Token expired, try refreshing the token
  //         const newAccessToken = await refreshToken();

  //         if (newAccessToken) {
  //           // Retry the original request with the new access token
  //           error.config.headers.Authorization = Bearer ${newAccessToken};
  //           return axios.request(error.config);
  //         } else {
  //           // Token refresh failed, log the user out
  //           logout();
  //         }
  //       }

  //       // Propagate other errors
  //       return Promise.reject(error);
  //     }
  //   );
  //   return () => {
  //     // Remove the interceptor when the component unmounts
  //     axios.interceptors.response.eject(interceptor);
  //   };
  // }, [logout, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, login }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
