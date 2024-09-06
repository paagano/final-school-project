import React from "react";
import "./errorModal.css";

const ErrorModal = ({
  title = "Notification",
  message,
  onClose,
  type = "error",
}) => {
  return (
    <div className="modal-overlay">
      <div
        className={`modal-content ${
          type === "success" ? "modal-success" : "modal-error"
        }`}
      >
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
