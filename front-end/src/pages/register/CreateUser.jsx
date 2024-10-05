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
    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/users/register", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("User Successfully Created!", {
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
  };

  return (
    <>
      {/* <NavBar /> */}

      <div className="addUser">
        <h3>Create User</h3>

        <form onSubmit={saveUser} className="addUserForm">
          <div className="inputGroup">
            {/* Input fields */}
            <label className="em_label" htmlFor="firstName">
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="off"
              placeholder="e.g. Mtu"
              required
            />

            <label className="em_label" htmlFor="lastName">
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="off"
              placeholder="e.g. Mzuri"
              required
            />

            <label className="em_label" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="e.g. mtu-mzuri@cms.com"
              required
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
              required
            />

            <label className="em_label" htmlFor="branchCode">
              Branch Code
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="branchCode"
              name="branchCode"
              autoComplete="off"
              placeholder="e.g. 1"
              required
            />

            <label className="em_label" htmlFor="roleName">
              Role
            </label>
            <select
              onChange={handleChange}
              id="roleName"
              name="roleName"
              required
            >
              <option value="">Select Role</option>
              <option value="teller">Teller</option>
              <option value="branch-front-office">Branch Front Office</option>
              <option value="ho-card-center">HQ Card Center</option>
              <option value="branch-admin">Branch Admin</option>
              <option value="admin">System Administrator</option>
            </select>

            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default CreateUser;
