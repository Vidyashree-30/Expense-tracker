import { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [theme, setTheme] = useState("emerald");

  const themes = {
    emerald: "#10b981",
    ocean: "#3b82f6",
    purple: "#8b5cf6",
    midnight: "#111827",
  };

  return (
    <div
      className="register-container"
      style={{
        background: `linear-gradient(135deg, ${themes[theme]}, #0f172a)`,
      }}
    >
      <div className="register-card">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="form-control mb-3"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control mb-4"
        />

        <h4>Choose Your Theme</h4>

        <div className="theme-grid">

          <div
            className={`theme-card ${theme === "emerald" ? "active" : ""}`}
            onClick={() => setTheme("emerald")}
          >
            🟢 Emerald
          </div>

          <div
            className={`theme-card ${theme === "ocean" ? "active" : ""}`}
            onClick={() => setTheme("ocean")}
          >
            🔵 Ocean
          </div>

          <div
            className={`theme-card ${theme === "purple" ? "active" : ""}`}
            onClick={() => setTheme("purple")}
          >
            🟣 Purple
          </div>

          <div
            className={`theme-card ${theme === "midnight" ? "active" : ""}`}
            onClick={() => setTheme("midnight")}
          >
            ⚫ Midnight
          </div>

        </div>

        <h4 className="mt-4">Choose Profile</h4>

        <select className="form-control mb-3">
          <option>👨 Professional</option>
          <option>🎓 Student</option>
          <option>💼 Business</option>
          <option>🏠 Personal</option>
        </select>

        <h4>Choose Currency</h4>

        <select className="form-control mb-4">
          <option>₹ INR</option>
          <option>$ USD</option>
          <option>€ EUR</option>
          <option>£ GBP</option>
        </select>

        <button className="btn btn-success w-100">
          Create Account
        </button>

        <p className="signin-link">
          Already have an account?
          <Link to="/"> Sign In</Link>
        </p>

      </div>
    </div>
  );
}
export default Register;



