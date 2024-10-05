import { Link } from "react-router-dom";
import "./homePage.css";
import NavBar from "../../components/navbar/NavBar";

function HomePage() {
  // Check if the user is logged in by checking the access token in session storage
  const accessToken = sessionStorage.getItem("accessToken"); // token is stored in sessionStorage
  const userRole = sessionStorage.getItem("role"); // role is stored in sessionStorage

  // Determine the link and text based on the access token and role
  let getStartedLink;

  if (accessToken) {
    console.log("Access token exists. Checking user role...");

    switch (userRole) {
      case "admin":
        console.log("User role is admin.");
        getStartedLink = "/csms/admin-dashboard";
        break;

      case "ho-card-center":
        console.log("User role is ho-card-center.");
        getStartedLink = "/csms/HO-dashboard";
        break;

      case "branch-admin":
        console.log("User role is branch-admin.");
        getStartedLink = "/csms/branch-admin-dashboard";
        break;

      default:
        console.log("User role is standard user.");
        getStartedLink = "/csms/user-dashboard";
        break;
    }
  } else {
    console.log("No access token. Redirecting to login page.");
    getStartedLink = "/csms/login"; // If no access token, go to login page
  }

  // Dynamically assigning the Get Started button a text:
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
