import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./users.css";
import axios from "axios";
import { Dropdown, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
// import AuthorizationError from "./AuthorizationError";

const GetUserDetails = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState([]);
  //   const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    axios
      .get(`http://localhost:6008/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUserDetails(res.data);
      })

      .catch((err) => {
        console.error("Error fetching user data:", err);
        // Handle error (e.g., display an error message, redirect, etc.)
      });
  }, [userId]);

  const navigate = useNavigate();

  // const loadEdit = (userId) => {
  //   navigate("/csms/update-user/" + userId);
  // };

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

        <h5 className="users-list-header"> All Users List</h5>
        <div className="table-responsive">
          <table className="table table-bordered table-md">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role Name</th>
                <th>Branch Code</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.map((r, i) => (
                <tr key={i}>
                  <td>{r.firstName}</td>
                  <td>{r.lastName}</td>
                  <td>{r.email}</td>
                  <td>{r.roleName}</td>
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
                            LoadVendor(r.userId);
                          }}
                        >
                          Details
                        </Link>
                        {/* <Link
                          to="/csms/update-user/:userId"
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            loadEdit(r.userId);
                          }}
                        >
                          Edit User
                        </Link> */}

                        <Link
                          to={`/csms/update-user/${r.userId}`}
                          className="dropdown-item"
                        >
                          Edit User
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

export default GetUserDetails;

// onClick={()=>loadEdit(r.userId)}
