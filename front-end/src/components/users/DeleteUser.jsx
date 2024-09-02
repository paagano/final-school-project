import React from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Dropdown, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
import "./users.css";

const DeleteUser = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

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
        // Confirm the right user is selected:
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        // Handle error (e.g., display an error message, redirect, etc.)
      });
  }, [userId]);

  const token = sessionStorage.getItem("accessToken");

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:6008/api/users/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        toast.success("User Successfully Deleted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error(
          "An error occurred while deleting user record...User NOT Deleted",
          {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          }
        );
      });

    navigate("/csms/admin-dashboard");
  };

  const handleCancel = () => {
    navigate("/csms/admin-dashboard");
  };

  return (
    <>
      <NavBar />

      <div className="delete-user">
        <h3>Delete User</h3>

        <div className=" addUser">
          <h3>Are you sure you want to Delete User?</h3>
          <button onClick={handleDeleteUser} className="btn btn-danger">
            Yes, Delete User
          </button>
          <button onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;
