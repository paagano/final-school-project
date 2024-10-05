import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./roles.css";
import NavBar from "../../components/navbar/NavBar";

const CreateRole = () => {
  const initialFormValues = {
    roleName: "",
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const saveRole = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };

    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/roles/create-role", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        toast.success("New Role Successfully Created!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while creating a new role...", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });

    setNewFormValues(initialFormValues);
    console.log(requestData);
  };

  return (
    <>
      {/* <NavBar /> */}

      <div className="create-role-header">
        <h3>Create Role</h3>

        <form onSubmit={saveRole} className="create-role-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="roleName">
              Role Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="roleName"
              name="roleName"
              autoComplete="off"
              placeholder="e.g. Admin"
              required
            />

            <button type="submit" class="btn btn-success">
              Save
            </button>

            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRole;
