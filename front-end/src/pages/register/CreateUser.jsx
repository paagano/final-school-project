import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createUser.css";
import NavBar from "../../components/navbar/NavBar";

const CreateUser = () => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    branchCode: "",
    roleName: "",
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };

    // const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/users/register", requestData, {
        //   headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
      })

      .then((res) => {
        toast.success("Registration Successfull!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while registering user...", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });

    setNewFormValues(initialFormValues);
    console.log(requestData);
  };

  return (
    <>
      <NavBar />

      <div className="addUser">
        <h3>Create User</h3>

        <form onSubmit={saveUser} className="addUserForm">
          <div className="inputGroup">
            <label htmlFor="firstName">First Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="off"
              placeholder="Mtu"
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={handleChange}
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="off"
              placeholder="Mzuri"
            />

            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="mtu-mzuri@cms.com"
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

            <label htmlFor="branchCode">Branch Code</label>
            <input
              onChange={handleChange}
              type="text"
              id="branchCode"
              name="branchCode"
              autoComplete="off"
              placeholder="1"
            />

            <label htmlFor="roleName">Role</label>
            <input
              onChange={handleChange}
              type="text"
              id="roleName"
              name="roleName"
              autoComplete="off"
              placeholder="admin"
            />

            <button type="submit" class="btn btn-success">
              Create User
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

export default CreateUser;
