import { Link } from "react-router-dom";
import "./homePage.css";
import NavBar from "../../components/navbar/NavBar";

function HomePage() {
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
        <Link
          as={Link}
          to="/csms/login"
          className="cta-button remove-underline"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}

export default HomePage;
