import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./orders.css";
import NavBar from "../../components/navbar/NavBar";

const HOReleaseStockToBranch = () => {
  const initialFormValues = {
    branchCode: "",
    cardId: "",
    quantity: 0,
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const releaseStockToBranch = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };
    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/stock/ho-courier-stock", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Stock released to courier successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while saving transfer...", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });

    setNewFormValues(initialFormValues);
  };

  return (
    <>
      {/* <NavBar /> */}

      <div className="create-branch">
        <h3>Release Stock To Branch</h3>

        <form onSubmit={releaseStockToBranch} className="create-branch-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="branchCode">
              Receiving Branch Code
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="branchCode"
              name="branchCode"
              value={newFormValues.branchCode}
              min="0"
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
              value={newFormValues.cardId}
              min="0"
              placeholder="e.g. 2"
              required
            />

            <label className="em_label" htmlFor="quantity">
              Quantity
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="quantity"
              name="quantity"
              value={newFormValues.quantity}
              min="0"
              placeholder="e.g. 10"
              required
            />

            <button type="submit" className="btn btn-success">
              Release
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
};

export default HOReleaseStockToBranch;
