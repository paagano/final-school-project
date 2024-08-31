import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./tills.css";
import NavBar from "../../components/navbar/NavBar";

const CreateTill = () => {
  const initialFormValues = {
    branchCode: "",
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const saveTill = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };

    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/tills/create-till", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        toast.success("Till Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while creating a new Till...", {
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

      <div className="create-till">
        <h3>Create New Till</h3>

        <form onSubmit={saveTill} className="create-till-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="branchCode">
              Branch Code
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="branchCode"
              name="branchCode"
              autoComplete="off"
              placeholder="Branch Code"
            />

            <button type="submit" class="btn btn-success">
              Create Till
            </button>

            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTill;
