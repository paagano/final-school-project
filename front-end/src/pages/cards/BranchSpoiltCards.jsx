import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cards.css";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../components/navbar/NavBar";
// import AuthorizationError from "./AuthorizationError";

const BranchSpoiltCards = () => {
  const [spoiltCards, setSpoiltCards] = useState([]);
  //   const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const branchCode = sessionStorage.getItem("branchCode");

    axios
      .get(
        `http://localhost:6008/api/tills/branch-spoilt-cards/${branchCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("branchCode:", branchCode);
        console.log("API response:", res.data); // Logging the response data
        setSpoiltCards(res.data);
      })

      .catch((err) => {
        if (err.response && err.response.status === 403) {
          console.error("Error fetching spoilt cards data.", err);
          // Handle error (e.g., display an error message, redirect, etc.)
        }
      });
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {/* <NavBar /> */}

      {/* {unauthorized ? (
        <AuthorizationError />
      ) : (
        
      )} */}

      <>
        <h5 className="card-types-header"> Branch Spoilt Cards</h5>

        <div className="table-responsive">
          <table className="table table-bordered table-md">
            <thead>
              <tr>
                <th>Card ID</th>
                <th>Card Type</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {spoiltCards.length > 0 ? (
                spoiltCards.map((r, i) => (
                  <tr key={i}>
                    <td>{r.cardId}</td>
                    <td>{r.cardType}</td>
                    <td>{r.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No spoilt cards found</td>
                </tr>
              )}
              <ToastContainer />
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default BranchSpoiltCards;
