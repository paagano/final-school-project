import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orders.css";

import axios from "axios";
import { Dropdown, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../components/navbar/NavBar";
// import AuthorizationError from "./AuthorizationError";

const BranchOrders = () => {
  const [branchOrders, setBranchOrders] = useState([]);
  //   const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const branchCode = sessionStorage.getItem("branchCode");

    axios
      .get(
        `http://localhost:6008/api/orders/get-my-branch-orders/${branchCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setBranchOrders(res.data);
        console.log(branchOrders);
      })

      .catch((err) => {
        // if (err.response.status === 403) {
        //   setUnauthorized(true);
        // }
      });
  }, []);

  const navigate = useNavigate();

  const loadEdit = (id) => {
    navigate("/UpdateBranchOrder/" + id); // Change the route later
  };

  const LoadOrder = (id) => {
    // navigate("/api/measurement/" + id);
    navigate("/BranchOrderDetails/" + id); // Change the route later
  };

  const LoadDelete = (id) => {
    // navigate("/api/measurement/" + id);
    navigate("/DeleteBranchOrder/" + id); // Change the route later
  };

  return (
    <div>
      {/* <NavBar /> */}

      {/* {unauthorized ? (
        <AuthorizationError />
      ) : (
        
      )} */}

      <>
        {/* {loading && (
          <ScaleLoader
            color="#36D7B7"
            loading={loading}
            css={spinnerOverride}
            size={150}
          />
        )} */}

        <h5 className="roles-list-header"> My Branch Orders</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-md">
            <thead>
              <tr>
                <th>Order ID</th>
                {/* <th>Branch Code</th> */}
                <th>General Purpose Card</th>
                <th>Student Card</th>
                <th>Multi Currency Card</th>
                <th>Youth Card</th>
                <th>Total</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {branchOrders.map((r, i) => (
                <tr key={i}>
                  <td>{r.orderId}</td>
                  {/* <td>{r.branchCode}</td> */}
                  <td>{r.generalPurposeCard}</td>
                  <td>{r.studentCard}</td>
                  <td>{r.mutiCurrencyCard}</td>
                  <td>{r.youthCard}</td>
                  <td>{r.total}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="default"
                        id="dropdown-basic"
                        size="md"
                      >
                        Perform Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Link
                          to="/action-1"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            LoadOrder(r.orderId);
                          }}
                        >
                          View Order Details
                        </Link>

                        <Link
                          to="/action-1"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            LoadOrder(r.orderId);
                          }}
                        >
                          Edit Order
                        </Link>

                        <Link
                          to="/action-1"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            LoadOrder(r.orderId);
                          }}
                        >
                          Delete Order
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
              <ToastContainer />
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default BranchOrders;

// onClick={()=>loadEdit(r.cardId)}
