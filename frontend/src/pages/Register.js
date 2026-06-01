import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import "../styles/Register.css";

function Register() {
  return (
    <div className="register-container">

      <div className="register-card">

        <div className="logo-box">
          <FaWallet className="wallet-icon" />
        </div>

        <h1 className="app-title">
          Expense Tracker
        </h1>

        <h2 className="register-title">
          Create Account
        </h2>

        <input
          type="text"
          className="form-control"
          placeholder="Full Name"
        />

        <input
          type="email"
          className="form-control"
          placeholder="Email Address"
        />

        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />

        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
        />

        <div className="terms-box">
          <input type="checkbox" />
          <span>I accept Terms & Conditions</span>
        </div>

        <button className="register-btn">
          Create Account
        </button>

        <p className="signin-link">
          Already have an account?
          <Link to="/"> Log In</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
