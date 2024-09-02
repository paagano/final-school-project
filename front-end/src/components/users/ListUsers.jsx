import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./users.css";
import axios from "axios";
import { Dropdown, Navbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
// import AuthorizationError from "./AuthorizationError";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  //   const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    axios
      .get("http://localhost:6008/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setUsers(res.data);
      })

      .catch((err) => {
        // if (err.response.status === 403) {
        //   setUnauthorized(true);
        // }
      });
  }, []);

  const navigate = useNavigate();

  const loadUserDetails = (userId) => {
    navigate(`/csms/users/${userId}`);
  };

  const loadEditUser = (userId) => {
    navigate(`/csms/update-user/${userId}`);
  };

  const loadDeleteUser = (userId) => {
    navigate(`/csms/delete-user/${userId}`);
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
                <th>User ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role Name</th>
                <th>Branch Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((r, i) => (
                <tr key={i}>
                  <td>{r.userId}</td>
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
                          to={`/csms/users/${r.userId}`}
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            loadUserDetails(r.userId);
                          }}
                        >
                          Details
                        </Link>
                        <Link
                          to={`/csms/update-user/${r.userId}`}
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            loadEditUser(r.userId);
                          }}
                        >
                          Edit User
                        </Link>

                        <Link
                          to={`/csms/delete-user/${r.userId}`}
                          className="dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            loadDeleteUser(r.userId);
                          }}
                        >
                          Delete User
                        </Link>

                        {/* <Link
                          to={`/csms/delete-user/${r.userId}`}
                          className="dropdown-item"
                        >
                          Delete User
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

export default ListUsers;

// onClick={()=>loadEdit(r.userId)}
