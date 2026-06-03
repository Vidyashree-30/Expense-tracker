import { Link } from "react-router-dom";
import {
  FaWallet,
  FaGoogle,
  FaEye
} from "react-icons/fa";

import "../styles/Login.css";

function Login() {
  return (
    <div className="login-container">

      <div className="login-card">

        <div className="logo-box">
          <FaWallet className="wallet-icon" />
        </div>

        <h1 className="app-title">
          Expense<br />Tracker
        </h1>

        <p className="app-subtitle">
          Smart • Secure • Personalized
        </p>

        <h2 className="welcome-text">
          Welcome Back 👋
        </h2>

        <p className="welcome-subtitle">
          Track Today. Save Tomorrow.
        </p>

        <form>

          <label>Email Address</label>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
          />

          <label>Password</label>

          <div className="password-box">

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />

            <FaEye className="eye-icon" />

          </div>

          <div className="options-row">

            <div>
              <input type="checkbox" />
              <span> Remember Me</span>
            </div>

            <a href="/">Forgot Password?</a>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Log In
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
          >
            <FaGoogle />
            <span> Continue with Google</span>
          </button>

          <p className="register-link">
            Don't have an account?
            <Link to="/register"> Create Account</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;
