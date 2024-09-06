import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createUser.css";
import NavBar from "../../components/navbar/NavBar";

const CreateUser = () => {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    branchCode: "",
    roleName: "",
  };

  const [newFormValues, setNewFormValues] = useState(initialFormValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFormValues({ ...newFormValues, [name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();

    const requestData = { ...newFormValues };
    const token = sessionStorage.getItem("accessToken");

    axios
      .post("http://localhost:6008/api/users/register", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success("User Successfully Created!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error("An error occurred while registering user...", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });

    setNewFormValues(initialFormValues);
  };

  return (
    <>
      <NavBar />

      <div className="addUser">
        <h3>Create User</h3>

        <form onSubmit={saveUser} className="addUserForm">
          <div className="inputGroup">
            {/* Input fields */}
            <label className="em_label" htmlFor="firstName">
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="off"
              placeholder="e.g. Mtu"
              required
            />

            <label className="em_label" htmlFor="lastName">
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="off"
              placeholder="e.g. Mzuri"
              required
            />

            <label className="em_label" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              placeholder="e.g. mtu-mzuri@cms.com"
              required
            />

            <label className="em_label" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              placeholder="e.g. ******"
              required
            />

            <label className="em_label" htmlFor="branchCode">
              Branch Code
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="branchCode"
              name="branchCode"
              autoComplete="off"
              placeholder="e.g. 1"
              required
            />

            <label className="em_label" htmlFor="roleName">
              Role
            </label>
            <input
              onChange={handleChange}
              type="text"
              id="roleName"
              name="roleName"
              autoComplete="off"
              placeholder="e.g. admin"
              required
            />

            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default CreateUser;

// import React, { useState } from "react";
// import axios from "axios";
// import "./createUser.css";
// import NavBar from "../../components/navbar/NavBar";
// import ErrorModal from "../../components/errorModal/ErrorModal";

// const CreateUser = () => {
//   const initialFormValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     branchCode: "",
//     roleName: "",
//   };

//   const [newFormValues, setNewFormValues] = useState(initialFormValues);
//   const [csvFile, setCsvFile] = useState(null);
//   const [modalMessage, setModalMessage] = useState(""); // Generic message for both success and error
//   const [modalType, setModalType] = useState("error"); // State to handle modal type (error or success)

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewFormValues({ ...newFormValues, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (
//       file &&
//       file.type !== "text/csv" &&
//       file.name.split(".").pop() !== "csv"
//     ) {
//       setModalMessage("Please select a valid CSV file."); // Set error message for invalid file type
//       setModalType("error");
//       setCsvFile(null); // Reset file if not valid
//     } else {
//       setCsvFile(file); // Set the file if valid
//     }
//   };

//   const saveUser = (e) => {
//     e.preventDefault();

//     const requestData = { ...newFormValues };
//     const token = sessionStorage.getItem("accessToken");

//     axios
//       .post("http://localhost:6008/api/users/register", requestData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         setModalMessage("User Successfully Created!"); // Set success message
//         setModalType("success");
//       })
//       .catch((err) => {
//         setModalMessage("An error occurred while creating the user."); // Set error message
//         setModalType("error");
//       });

//     setNewFormValues(initialFormValues);
//   };

//   const uploadCsv = (e) => {
//     e.preventDefault();

//     if (!csvFile) {
//       setModalMessage("Please select a valid CSV file to upload."); // Error when no file selected
//       setModalType("error");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", csvFile);

//     const token = sessionStorage.getItem("accessToken");

//     axios
//       .post("http://localhost:6008/api/users/bulk-upload", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         setModalMessage("CSV File Uploaded Successfully!"); // Set success message
//         setModalType("success");
//       })
//       .catch((err) => {
//         setModalMessage("An error occurred during bulk upload."); // Set error message
//         setModalType("error");
//       });

//     setCsvFile(null);
//   };

//   const handleCloseModal = () => {
//     setModalMessage(""); // Close modal by clearing the message
//   };

//   return (
//     <>
//       <NavBar />

//       <div className="addUser">
//         <h3>Create User</h3>

//         <form onSubmit={saveUser} className="addUserForm">
//           <div className="inputGroup">
//             <label className="em_label" htmlFor="firstName">
//               First Name
//             </label>
//             <input
//               onChange={handleChange}
//               type="text"
//               id="firstName"
//               name="firstName"
//               autoComplete="off"
//               placeholder="e.g. Mtu"
//               required
//             />

//             <label className="em_label" htmlFor="lastName">
//               Last Name
//             </label>
//             <input
//               onChange={handleChange}
//               type="text"
//               id="lastName"
//               name="lastName"
//               autoComplete="off"
//               placeholder="e.g. Mzuri"
//               required
//             />

//             <label className="em_label" htmlFor="email">
//               Email
//             </label>
//             <input
//               onChange={handleChange}
//               type="email"
//               id="email"
//               name="email"
//               autoComplete="off"
//               placeholder="e.g. mtu-mzuri@cms.com"
//               required
//             />

//             <label className="em_label" htmlFor="password">
//               Password
//             </label>
//             <input
//               onChange={handleChange}
//               type="password"
//               id="password"
//               name="password"
//               autoComplete="off"
//               placeholder="e.g. ******"
//               required
//             />

//             <label className="em_label" htmlFor="branchCode">
//               Branch Code
//             </label>
//             <input
//               onChange={handleChange}
//               type="text"
//               id="branchCode"
//               name="branchCode"
//               autoComplete="off"
//               placeholder="e.g. 1"
//               required
//             />

//             <label className="em_label" htmlFor="roleName">
//               Role
//             </label>
//             <input
//               onChange={handleChange}
//               type="text"
//               id="roleName"
//               name="roleName"
//               autoComplete="off"
//               placeholder="e.g. admin"
//               required
//             />

//             <button type="submit" className="btn btn-success">
//               Save
//             </button>
//           </div>
//         </form>

//         {/* Bulk upload form */}
//         <form onSubmit={uploadCsv} className="bulkUploadForm">
//           <div className="inputGroup">
//             <label htmlFor="csvFile" className="csv_label">
//               Upload CSV
//             </label>
//             <input
//               type="file"
//               id="csvFile"
//               name="csvFile"
//               onChange={handleFileChange}
//               accept=".csv"
//             />
//             <button type="submit" className="btn btn-bulk-upload">
//               Bulk Upload
//             </button>
//           </div>
//         </form>

//         {/* Show Error or Success Modal */}
//         {modalMessage && (
//           <ErrorModal
//             title={modalType === "success" ? "Success" : "Error"} // Title changes based on modal type
//             message={modalMessage} // Dynamic message
//             onClose={handleCloseModal} // Close function
//             type={modalType} // Modal type: success or error
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default CreateUser;
