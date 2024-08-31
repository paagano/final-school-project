import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
import "./listUsers.css";

export const UpdateUser = () => {
  const {userId} = useParams();
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    branchCode: "",
    roleName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    axios
      .get(`http://localhost:6008/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        setNewUserData({
          firstName: res.newUserData.firstName,
          lastName: res.newUserData.lastName,
          email: res.newUserData.email,
          password: res.newUserData.password,
          branchCode: res.newUserData.branchCode,
          roleName: res.newUserData.roleName,
        });
      })

      .catch((err) => {
        // if (err.response.status === 403) {
        //   setUnauthorized(true);
        // }
      });
  }, [userId]);

  const saveUpdateUser = (e) => {
    e.preventDefault();

    const requestData = { ...newUserData };

    const token = sessionStorage.getItem("accessToken");

    axios
      .patch(`http://localhost:6008/api/users/${userId}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        toast.success("User Successfully Updated!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while updating user record...", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });

    console.log(requestData);
  };

  return (
    <>
      <NavBar />

      <div className="addUser">
        <h3>Update User</h3>

        <form onSubmit={saveUpdateUser} className="addUserForm">
          <div className="inputGroup">
            <label className="em_label" htmlFor="firstName">
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="firstName"
              name="firstName"
              value={newUserData.firstName}
              autoComplete="off"
            />

            <label className="em_label" htmlFor="lastName">
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="lastName"
              name="lastName"
              value={newUserData.lastName}
              autoComplete="off"
            />

            <label className="em_label" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={newUserData.email}
              autoComplete="off"
            />

            <label className="em_label" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={newUserData.password}
              autoComplete="off"
            />

            <label className="em_label" htmlFor="branchCode">
              Branch Code
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="branchCode"
              name="branchCode"
              value={newUserData.branchCode}
              autoComplete="off"
            />

            <label className="em_label" htmlFor="roleName">
              Role
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="roleName"
              name="roleName"
              value={newUserData.roleName}
              autoComplete="off"
            />

            <button type="submit" class="btn btn-success">
              Update
            </button>

            <ToastContainer />
          </div>
        </form>

        {/* <div className="login">
        <p>Already have an account?</p>
        <Link to="/csms/login" type="submit" class="btn btn-primary">
          Login
        </Link>
      </div> */}
      </div>
    </>
  );
};
