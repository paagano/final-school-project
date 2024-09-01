import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavBar({ userName = "Philip Agano [Admin]" }) {
  return (
    <>
      <div>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <bold>CSMS |</bold> <small>Cards Stock Management System</small>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/csms/login">
                Login
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/csms/create-user">
                Register
              </Nav.Link>
              <Nav.Link as={Link} to="/csms/log-out">
                Logout
              </Nav.Link> */}
            </Nav>
            <Nav>
              <Navbar.Text>
                {userName ? `Logged in as: ${userName}` : ""}
              </Navbar.Text>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
