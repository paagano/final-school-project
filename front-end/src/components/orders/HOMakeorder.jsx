import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./orders.css";
import NavBar from "../../components/navbar/NavBar";

const HOMakeOrder = () => {
  const initialFormValues = {
    generalPurposeCard: 0,
    studentCard: 0,
    multiCurrencyCard: 0,
    youthCard: 0,
    total: 0,
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValues = {
      ...newFormValues,
      [name]: value,
    };

    // Automatically calculate the total
    const total =
      parseInt(updatedValues.generalPurposeCard) +
      parseInt(updatedValues.studentCard) +
      parseInt(updatedValues.multiCurrencyCard) +
      parseInt(updatedValues.youthCard);

    setNewFormValues({ ...updatedValues, total });
  };

  const saveOrder = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };
    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/orders/ho-make-order", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("Order Saved Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while saving order...", {
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
        <h3>Request Stock From Printer</h3>

        <form onSubmit={saveOrder} className="create-branch-form">
          <div className="inputGroup">
            <label className="em_label" htmlFor="generalPurposeCard">
              General Purpose Card Quantity
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="generalPurposeCard"
              name="generalPurposeCard"
              value={newFormValues.generalPurposeCard}
              min="0"
              required
            />

            <label className="em_label" htmlFor="studentCard">
              Student Card Quantity
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="studentCard"
              name="studentCard"
              value={newFormValues.studentCard}
              min="0"
              required
            />

            <label className="em_label" htmlFor="multiCurrencyCard">
              Multi-Currency Card Quantity
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="multiCurrencyCard"
              name="multiCurrencyCard"
              value={newFormValues.multiCurrencyCard}
              min="0"
              required
            />

            <label className="em_label" htmlFor="youthCard">
              Youth Card Quantity
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="youthCard"
              name="youthCard"
              value={newFormValues.youthCard}
              min="0"
              required
            />

            <label className="em_label" htmlFor="total">
              Total Orders
            </label>
            <input
              type="number"
              id="total"
              name="total"
              value={newFormValues.total}
              readOnly
            />

            <button type="submit" className="btn btn-success">
              Save Order
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </>
  );
};

export default HOMakeOrder;
