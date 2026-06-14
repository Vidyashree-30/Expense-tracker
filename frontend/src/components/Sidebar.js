import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Receipt,
  Wallet,
  BarChart3,
  Target,
  Settings,
  LogOut,
  Rabbit,
} from "lucide-react";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

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
          <a onClick={() => navigate("/dashboard")} className={location.pathname === "/dashboard" ? "active" : ""}><Home size={20} /><span>Dashboard</span></a>
          <a onClick={() => navigate("/expenses")} className={location.pathname === "/expenses" ? "active" : ""}><Receipt size={20} /><span>Expenses</span></a>
          <a onClick={() => navigate("/budget")} className={location.pathname === "/budget" ? "active" : ""}><Wallet size={20} /><span>Budget</span></a>
          <a onClick={() => navigate("/analytics")} className={location.pathname === "/analytics" ? "active" : ""}><BarChart3 size={20} /><span>Analytics</span></a>
          <a onClick={() => navigate("/goals")} className={location.pathname === "/goals" ? "active" : ""}><Target size={20} /><span>Goals</span></a>
          <a onClick={() => navigate("/settings")} className={location.pathname === "/settings" ? "active" : ""}><Settings size={20} /><span>Settings</span></a>
        </nav>
      </div>
      <div className="sidebar-bottom">
        <a onClick={() => navigate("/")} className="logout-btn"><LogOut size={20} /><span>Logout</span></a>
      </div>
    </aside>
  );
}

export default Sidebar;
