import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createUser.css";
import NavBar from "../../components/navbar/NavBar";

const BulkUploadUsers = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [fileName, setFileName] = useState(""); // State to store the file name

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type !== "text/csv" &&
      file.name.split(".").pop() !== "csv"
    ) {
      toast.error("Please upload a valid .csv file.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setCsvFile(null); // Reset the file if not valid
      setFileName(""); // Reset file name
    } else {
      setCsvFile(file); // Set the file if valid
      setFileName(file.name); // Set the file name
    }
  };

  const uploadCsv = (e) => {
    e.preventDefault();

    if (!csvFile) {
      toast.error("Please select a valid CSV file to upload.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/users/bulk-upload-users", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Users uploaded successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred during bulk upload.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });

    setCsvFile(null); // Reset the file after upload
    setFileName(""); // Reset file name
  };

  return (
    <>
      {/* <NavBar /> */}

      <div className="addUser">
        <h3>Bulk Create Users</h3>
        <form onSubmit={uploadCsv} className="bulkUploadForm">
          <div className="inputGroup">
            <h6>Allowed File Types: CSV only.</h6>
            <input
              type="file"
              id="csvFile"
              name="csvFile"
              onChange={handleFileChange}
              accept=".csv"
              required
            />
            {/* Display the selected file name */}
            {/* {fileName && <p>Selected File: {fileName}</p>} */}

            <a
              href="data:text/csv;base64,Zmlyc3ROYW1lLGxhc3ROYW1lLGVtYWlsLHBhc3N3b3JkLHJvbGVOYW1lLGJyYW5jaENvZGUKV2FuLFdhbix3YW5AZ21haWwuY29tLDEyMzQ1NixhZG1pbiwxClVuLFVuLHVuQGdtYWlsLmNvbSwxMjM0NTYsdGVsbGVyLDgKR2luLEdpbixnaW5AZ21haWwuY29tLDEyMzQ1Nix0ZWxsZXIsMg=="
              download="sample-bulk-create-users.csv"
            >
              Download Sample Template
            </a>

            <button type="submit" className="btn btn-bulk-upload">
              Upload File
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default BulkUploadUsers;
