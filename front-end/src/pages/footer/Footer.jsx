import React from "react";
import "./footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-style">
        <p className="text-tyle">
          &copy; {currentYear} Agano Technologies Inc. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Footer;
