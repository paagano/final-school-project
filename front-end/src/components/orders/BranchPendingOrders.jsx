import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./orders.css";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const BranchPendingOrders = () => {
  const [branchOrders, setBranchOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [branchCodeFilter, setBranchCodeFilter] = useState("all");

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    axios
      .get("http://localhost:6008/api/orders/get-branch-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setBranchOrders(res.data);
        setFilteredOrders(res.data); // Set initial filtered data to all orders
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Extract unique branch codes for the dropdown
  const uniqueBranchCodes = [
    ...new Set(branchOrders.map((order) => String(order.branchCode))), // Convert branchCode to string
  ];

  const handleBranchCodeFilterChange = (e) => {
    const value = e.target.value;
    setBranchCodeFilter(value);

    if (value === "all") {
      setFilteredOrders(branchOrders); // Show all orders when "all" is selected
    } else {
      const filtered = branchOrders.filter(
        (order) => String(order.branchCode) === value // Ensure both are strings
      );
      setFilteredOrders(filtered);
    }
  };

  const navigate = useNavigate();

  const loadEdit = (id) => {
    navigate("/UpdateBranchOrder/" + id);
  };

  const LoadOrder = (id) => {
    navigate("/BranchOrderDetails/" + id);
  };

  const LoadDelete = (id) => {
    navigate("/DeleteBranchOrder/" + id);
  };

  return (
    <div>
      <h5 className="roles-list-header">All Branch Orders</h5>

      {/* Dropdown to filter by Branch Code */}
      <div className="filter-section mb-3">
        <label htmlFor="branchCodeFilter">Filter by Branch Code: </label>
        <select
          id="branchCodeFilter"
          value={branchCodeFilter}
          onChange={handleBranchCodeFilterChange}
          className="form-control"
        >
          <option value="all">All Branches</option>
          {uniqueBranchCodes.map((branchCode, index) => (
            <option key={index} value={branchCode}>
              {branchCode}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-md">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Branch Code</th>
              <th>General Purpose Card</th>
              <th>Student Card</th>
              <th>Multi Currency Card</th>
              <th>Youth Card</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((r, i) => (
                <tr key={i}>
                  <td>{r.orderId}</td>
                  <td>{r.branchCode}</td>
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
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No pending orders found.
                </td>
              </tr>
            )}
            <ToastContainer />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchPendingOrders;
