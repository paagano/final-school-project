import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./users.css";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../navbar/NavBar";
import ReactPaginate from "react-paginate";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [error, setError] = useState("");

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
        if (err.response.status === 401) {
          toast.success(
            "Unauthorized: Kindly sign-in first to be able to perform this action",
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            }
          );
        } else {
          toast.success("Error fetching user list...", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
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

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredUsers = users.filter(
      (user) =>
        user.userId.toString().includes(value) ||
        user.firstName.toLowerCase().includes(value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredUsers.length === 0) {
      setError("No matching results found.");
    } else {
      setError("");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.userId.toString().includes(searchTerm) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * usersPerPage;
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const downloadCSV = () => {
    const headers = [
      "User ID",
      "First Name",
      "Last Name",
      "Email",
      "Role",
      "Branch Code",
    ];
    const rows = users.map((user) => [
      user.userId,
      user.firstName,
      user.lastName,
      user.email,
      user.roleName,
      user.branchCode,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ["User ID", "First Name", "Last Name", "Email", "Role", "Branch Code"],
      ],
      body: users.map((user) => [
        user.userId,
        user.firstName,
        user.lastName,
        user.email,
        user.roleName,
        user.branchCode,
      ]),
    });
    doc.save("users_list.pdf");
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      users.map((user) => ({
        "User ID": user.userId,
        "First Name": user.firstName,
        "Last Name": user.lastName,
        Email: user.email,
        Role: user.roleName,
        "Branch Code": user.branchCode,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    XLSX.writeFile(wb, "users_list.xlsx");
  };

  const downloadWord = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Users List",
              heading: "TITLE",
              spacing: { after: 400 },
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph("User ID")],
                    }),
                    new TableCell({
                      children: [new Paragraph("First Name")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Last Name")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Email")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Role")],
                    }),
                    new TableCell({
                      children: [new Paragraph("Branch Code")],
                    }),
                  ],
                }),
                ...users.map(
                  (user) =>
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [new Paragraph(user.userId.toString())],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.firstName)],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.lastName)],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.email)],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.roleName)],
                        }),
                        new TableCell({
                          children: [new Paragraph(user.branchCode)],
                        }),
                      ],
                    })
                ),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "UsersList.docx");
    });
  };

  return (
    <div>
      <NavBar />

      <h5 className="users-list-header">All Users List</h5>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search User by: User ID, Name, or Email..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      {error && <div className="error-message-style">{error}</div>}

      <div className="download-buttons">
        <button onClick={downloadCSV} className="btn btn-primary">
          Download CSV
        </button>
        <button onClick={downloadPDF} className="btn btn-secondary">
          Download PDF
        </button>
        <button onClick={downloadExcel} className="btn btn-success">
          Download Excel
        </button>
        <button onClick={downloadWord} className="btn btn-primary">
          Download Word
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-md">
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Branch Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((r, i) => (
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
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />

      <ToastContainer />
    </div>
  );
};

export default ListUsers;
