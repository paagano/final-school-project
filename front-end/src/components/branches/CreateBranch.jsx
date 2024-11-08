import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./branches.css";
import NavBar from "../../components/navbar/NavBar";

const CreateBranch = () => {
  const initialFormValues = {
    branchName: "",
    region: "",
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const saveBranch = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };

    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/branches/create-branch", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        toast.success("Branch Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while creating a new branch...", {
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

      <div className="create-branch">
        <h3>Create New Branch</h3>

        <form onSubmit={saveBranch} className="create-branch-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="branchName">
              Branch Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="branchName"
              name="branchName"
              autoComplete="off"
              placeholder="e.g Nyali"
              required
            />

            <label className="em_label" htmlFor="region">
              Region
            </label>
            <select onChange={handleChange} id="region" name="region" required>
              <option value="">Select Region</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Central">Central</option>
              <option value="Coast">Coast</option>
              <option value="Western">Western</option>
              <option value="Rift Valley">Rift Valley</option>
              <option value="Eastern">Eastern</option>
            </select>

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

export default CreateBranch;
