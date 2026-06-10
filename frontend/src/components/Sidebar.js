import {
  Home,
  Receipt,
  Wallet,
  BarChart3,
  Target,
  Settings,
  LogOut,
  Rabbit
} from "lucide-react";

import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-top">

        <div className="logo-section">
          <div className="logo-icon">
            <Rabbit size={26} />
          </div>

          <div>
            <h2>BunnyBudget</h2>
            <p>AI Finance Manager</p>
          </div>
        </div>

        <nav className="sidebar-menu">

          <a href="/dashboard" className="active">
            <Home size={20} />
            <span>Dashboard</span>
          </a>

          <a href="#">
            <Receipt size={20} />
            <span>Expenses</span>
          </a>

          <a href="#">
            <Wallet size={20} />
            <span>Budget</span>
          </a>

          <a href="#">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </a>

          <a href="#">
            <Target size={20} />
            <span>Goals</span>
          </a>

          <a href="#">
            <Settings size={20} />
            <span>Settings</span>
          </a>

        </nav>

      </div>

      <div className="sidebar-bottom">

        <div className="user-card">

          <div className="avatar">
            V
          </div>

          <div>
            <h4>Vidya</h4>
            <p>Welcome back</p>
          </div>

        </div>

        <a href="/" className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </a>

      </div>

    </aside>
  );
}

export default Sidebar;
