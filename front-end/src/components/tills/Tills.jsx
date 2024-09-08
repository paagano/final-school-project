import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./tills.css";

import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import NavBar from "../navbar/NavBar";
// import AuthorizationError from "./AuthorizationError";

const Tills = () => {
  const [tills, setTills] = useState([]);
  //   const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken")

    axios
      .get("http://localhost:6008/api/tills", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTills(res.data);
      })

      .catch((err) => {
        // if (err.response.status === 403) {
        //   setUnauthorized(true);
        // }
      });
  }, []);

  const navigate = useNavigate();

  const loadEdit = (id) => {
    navigate("/UpdateStoreVendor/" + id); // Change the route later
  };

  const LoadVendor = (id) => {
    // navigate("/api/measurement/" + id);
    navigate("/StoreVendorDetails/" + id); // Change the route later
  };

  // const LoadDelete = (id) => {
  //   // navigate("/api/measurement/" + id);
  //   navigate("/DeleteStoreVendor/" + id); // Change the route later
  // };

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

        <h5 className="tills-list-header"> Tills List</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-md">
            <thead>
              <tr>
                <th>Till Number</th>
                <th>Branch Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tills.map((r, i) => (
                <tr key={i}>
                  <td>{r.tillNumber}</td>
                  <td>{r.branchCode}</td>
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
                            LoadVendor(r.branchCode);
                          }}
                        >
                          Details
                        </Link>
                        <Link
                          to="/UpdateCard"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            loadEdit(r.branchCode);
                          }}
                        >
                          Edit Card
                        </Link>
                        {/* <Link to="/delete" className="dropdown-item" onClick={(e) => { e.preventDefault(); LoadDelete(r.vendor_id)}}>
                                    Delete
                                    </Link> */}
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

export default Tills;

// onClick={()=>loadEdit(r.branchCode)}
