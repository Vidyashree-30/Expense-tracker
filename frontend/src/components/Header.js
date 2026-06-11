import { Bell, Search } from "lucide-react";
import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard 👋</h1>
        <p>Welcome back, Vidya. Here's your financial overview.</p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search expenses..." />
        </div>

        <div className="header-actions">
          <button className="notification-btn">
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          <div className="profile-chip">
            <div className="profile-avatar">V</div>
            <div className="profile-info">
              <h4>Vidya</h4>
              <p>Premium</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
