import { Link } from "react-router-dom";
import "./homePage.css";
import NavBar from "../../components/navbar/NavBar";

function HomePage() {
  // Check if the user is logged in by checking the access token in session storage
  const accessToken = sessionStorage.getItem("accessToken"); // token is stored in sessionStorage
  const userRole = sessionStorage.getItem("role"); // role is stored as well

  // Determine the link and text based on the access token and role
  const getStartedLink = accessToken
    ? userRole === "admin"
      ? "/csms/admin-dashboard" // Redirect to Admin dashboard if user is Admin
      : "/csms/user-dashboard" // Redirect to User dashboard if regular user
    : "/csms/login"; // If no access token, go to login page

  const getStartedButtonText = accessToken ? "Continue Working" : "Get Started";

  return (
    <>
      <NavBar />

      <header className="App App-header">
        <h1>Welcome to Prepaid Cards Stock Management Portal</h1>
        <p>Manage Your Prepaid Card Stocks Efficiently and Effectively!</p>
      </header>

      <section className="features">
        <div className="feature-card">
          <h2>Place Orders</h2>
          <p>Head Office Order Cards from Printer</p>
          <p>Branch Order Cards from Head Office</p>
        </div>
        <div className="feature-card">
          <h2>Transfer Cards</h2>
          <p>Dispatch cards between Head Office and Branches</p>
          <p>Dispatch cards between Branches</p>
        </div>
        <div className="feature-card">
          <h2>Issue Cards</h2>
          <p>Branch Issue cards to customers</p>
          <p>Automatically update stock</p>
        </div>
        <div className="feature-card">
          <h2>Capture Spoilt Cards</h2>
          <p>Account for spoilt cards</p>
        </div>
      </section>

      <br />
      <hr />
      <br />
      <div className="App">
        <Link to={getStartedLink} className="cta-button remove-underline">
          {getStartedButtonText}
        </Link>
      </div>
    </>
  );
}

export default HomePage;
