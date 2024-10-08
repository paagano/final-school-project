import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/auth.jsx";
import { ToastContainer, toast } from "react-toastify";
import "./logout.css";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
    toast.warning(
      "LOGOUT ACTION CANCELLED. Click on CONTINUE WORKING to go back to your dashboard",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 12000,
      }
    );
  };

  return (
    <>
      <div className=" addUser logout-container">
        <h3>Are you sure you want to log out?</h3>
        <button onClick={handleLogout} className="btn btn-danger">
          Yes, Log me out
        </button>
        <button onClick={handleCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Logout;
