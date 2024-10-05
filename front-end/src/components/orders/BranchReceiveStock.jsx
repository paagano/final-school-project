import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./orders.css";
import NavBar from "../../components/navbar/NavBar";

const BranchReceiveStock = () => {
  const initialFormValues = {
    transitId: "",
    receivingBranchCode: "",
    cardId: "",
    quantity: 0,
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const receiveStock = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };
    const token = sessionStorage.getItem("accessToken");

    axios
      .post(
        "http://localhost:6008/api/stock/branch-receive-stock",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success("Stock Received Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while receiving stock...", {
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
        <h3>Receive Stock</h3>

        <form onSubmit={receiveStock} className="create-branch-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="transitId">
              Transit ID
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="transitId"
              name="transitId"
              value={newFormValues.transitId}
              autoComplete="off"
              placeholder="e.g. 1"
              required
            />

            <label className="em_label" htmlFor="receivingBranchCode">
              Receiving Branch Code
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="receivingBranchCode"
              name="receivingBranchCode"
              value={newFormValues.receivingBranchCode}
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
              Receive
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
};

export default BranchReceiveStock;
