import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./roles.css";

import axios from "axios";
import { Dropdown, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../../components/navbar/NavBar";
// import AuthorizationError from "./AuthorizationError";

const ListRoles = () => {
  const [roles, setRoles] = useState([]);
  //   const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    axios
      .get("http://localhost:6008/api/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setRoles(res.data);
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

  const LoadDelete = (id) => {
    // navigate("/api/measurement/" + id);
    navigate("/DeleteStoreVendor/" + id); // Change the route later
  };

  return (
    <div>
      <NavBar />

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

        <h5 className="roles-list-header"> All Roles</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-md">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r, i) => (
                <tr key={i}>
                  <td>{r.roleName}</td>
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
                            LoadVendor(r.cardId);
                          }}
                        >
                          Details
                        </Link>
                        <Link
                          to="/UpdateCard"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            loadEdit(r.cardId);
                          }}
                        >
                          Edit Role
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

export default ListRoles;

// onClick={()=>loadEdit(r.cardId)}
