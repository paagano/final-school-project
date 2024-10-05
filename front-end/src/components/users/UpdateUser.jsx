import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
import "./users.css";

export const UpdateUser = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // password: "",
    branchCode: "",
    roleName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
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
        // Assuming the user data is under res.data:
        const currentUserData = res.data;
        setUserData({
          firstName: currentUserData.firstName,
          lastName: currentUserData.lastName,
          email: currentUserData.email,
          // password: currentUserData.password,
          branchCode: currentUserData.branchCode,
          roleName: currentUserData.roleName,
        });
      })
      .catch((err) => {
        console.error("Error fetching current user data:", err);
        // Handle error (e.g., display an error message, redirect, etc.)
      });
  }, [userId]);

  const saveUpdateUser = (e) => {
    e.preventDefault();

    const requestData = { ...userData };

    const token = sessionStorage.getItem("accessToken");

    axios
      .patch(
        `http://localhost:6008/api/users/update-user/${userId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

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
              value={userData.firstName}
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
              value={userData.lastName}
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
              value={userData.email}
              autoComplete="off"
            />

            {/* <label className="em_label" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={userData.password}
              autoComplete="off"
            /> */}

            <label className="em_label" htmlFor="branchCode">
              Branch Code
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="branchCode"
              name="branchCode"
              value={userData.branchCode}
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
              value={userData.roleName}
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
