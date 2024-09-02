import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cards.css";
import NavBar from "../../components/navbar/NavBar";

const CreateCardType = () => {
  const initialFormValues = {
    cardType: "",
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const saveCardType = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };

    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/cards/create-card-type", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        toast.success("Card Type Successfully Created!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while creating a new card type...", {
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

      <div className="create-card-type">
        <h3>Create Card Type</h3>

        <form onSubmit={saveCardType} className="create-card-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="cardType">
              Card Type
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="cardType"
              name="cardType"
              autoComplete="off"
              placeholder="e.g. Test Card"
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

export default CreateCardType;
