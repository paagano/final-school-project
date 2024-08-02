import React from "react";
import { Link, useRouteError } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";

function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <NavBar />

      <h1>Ooops! Sorry, Page Not Found.</h1>

      <div>
        To Go Back Home, click{" "}
        <Link to="/csms/home">
          <bold>HERE</bold>
        </Link>
      </div>
    </>
  );
}

export default NotFoundPage;
