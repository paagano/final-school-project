import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import "./notFoundPage.css";

function NotFoundPage() {
  return (
    <>
      <NavBar />
      <div className="not-found-page">
        {" "}
        <h1>Oops! Page Not Found.</h1>
        <div>
          To Go Back Home, click{" "}
          <Link to="/">
            <bold>HERE</bold>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
