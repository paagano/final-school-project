import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cards.css";
import NavBar from "../../components/navbar/NavBar";

const CaptureSpoiltCard = () => {
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

  const saveSpoiltCard = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };

    const token = sessionStorage.getItem("accessToken");

    axios
      .post(
        "http://localhost:6008/api/tills/teller-capture-spoilt-card",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        toast.success("Spoilt Card Captured Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while saving spoilt card...", {
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

      <div className="create-card-type">
        <h3>Capture Spoilt Card</h3>

        <form onSubmit={saveSpoiltCard} className="create-card-form">
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
              placeholder="e.g. 2"
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

            <label className="em_label" htmlFor="cardId">
              Card ID
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="cardId"
              name="cardId"
              autoComplete="off"
              placeholder="e.g. 1"
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
              placeholder="e.g. 2"
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

export default CaptureSpoiltCard;
