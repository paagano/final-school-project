import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/auth.jsx";
import "./logout.css";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/csms/admin-dashboard");
  };

  return (
    <div className=" addUser logout-container">
      <h3>Are you sure you want to log out?</h3>
      <button onClick={handleLogout} className="btn btn-danger">
        Yes, Log me out
      </button>
      <button onClick={handleCancel} className="btn btn-secondary">
        Cancel
      </button>
    </div>
  );
};

export default Logout;
