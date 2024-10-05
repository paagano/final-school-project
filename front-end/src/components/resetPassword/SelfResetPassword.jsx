import React, { useState } from "react";
import axios from "axios";

export default function SelfResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // Send a request to the API to reset the password
      const response = await axios.post("/api/reset-password", {
        email,
        newPassword,
      });

      if (response.data.success) {
        setMessage("Password has been reset successfully!");
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    // I will separate the css from the html later!!
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
}
