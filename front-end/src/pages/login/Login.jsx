import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";

const Login = () => {
  const credentials = {
    email: "",
    password: "",
  };

  const [userCredentials, setUserCredentials] = useState(credentials);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const loginUser = (e) => {
    e.preventDefault();

    const requestData = { ...userCredentials };

    // const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/users/login", requestData, {
        //   headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
      })

      .then((res) => {
        toast.success("Login Successfull!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        // Checking if logged in user is "admin", then redirecting them to AdminDashboard, else to standard user Dashboard:
        const { roleName } = res.data; // Assuming response has roleName
        roleName === "admin"
          ? navigate("/csms/admin-dashboard")
          : navigate("/csms/create-user"); // To change later to standard user Dashboard:
      })
      .catch((err) => {
        toast.error("Invalid Username/Password", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });

    setUserCredentials(credentials);
    console.log(requestData);
  };

  return (
    <>
      <NavBar />

      <div className="addUser">
        <h3>Login</h3>

        <form onSubmit={loginUser} className="addUserForm">
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="mtu-mzuri@csms.com"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="******"
            />
            <button type="submit" class="btn btn-success">
              Login
            </button>

            <ToastContainer />
          </div>
        </form>

        <div className="login">
          {/* <p>Don't have account yet?</p> */}
          <p>Forgot Password?</p>
          <Link to="/csms/create-user" type="submit" class="btn btn-primary">
            Reset Me
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
