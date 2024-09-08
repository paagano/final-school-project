import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { AuthContext } from "../../components/auth";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:6008/api/users/login",
      credentials
    );

    await login(credentials, () => {
      // Checking if logged in user is "admin", then redirecting them to AdminDashboard, else to standard user Dashboard:
      const { roleName } = res.data; // Assuming response has roleName
      roleName === "admin"
        ? navigate("/csms/admin-dashboard")
        : navigate("/csms/user-dashboard");
    });
  };

  return (
    <>
      <NavBar />

      <div className="addUser">
        <h3>Login</h3>

        <form onSubmit={handleSubmit} className="addUserForm">
          <div className="inputGroup">
            <label className="em_label" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="e.g. mtu-mzuri@csms.com"
            />
            <label className="em_label" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="e.g. ******"
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
          <Link to="/csms/reset-password" type="submit" class="btn btn-primary">
            Reset
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
