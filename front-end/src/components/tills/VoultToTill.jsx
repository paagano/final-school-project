import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./tills.css";
import NavBar from "../../components/navbar/NavBar";

const VoultToTill = () => {
  const initialFormValues = {
    tillNumber: "",
    branchCode: "",
    cardId: "",
    quantity: "",
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const commitVoultToTill = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };

    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/voult/voult-to-till", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        toast.success("Voult-To-Till Operation Successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while posting from voult...", {
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

      <div className="create-till">
        <h3>Receive Cards From Voult</h3>

        <form onSubmit={commitVoultToTill} className="create-till-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="tillNumber">
              Till Number
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="tillNumber"
              name="tillNumber"
              autoComplete="off"
              placeholder="Till Number"
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
              placeholder="Branch Code"
              required
            />

            <label className="em_label" htmlFor="cardId">
              Card ID
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="cardId"
              name="cardId"
              autoComplete="off"
              placeholder="Card ID"
              required
            />

            <label className="em_label" htmlFor="quantity">
              Quantity
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="quantity"
              name="quantity"
              autoComplete="off"
              placeholder="Quantity"
              required
            />

            <button type="submit" class="btn btn-success">
              Commit Transaction
            </button>

            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
};

export default VoultToTill;
