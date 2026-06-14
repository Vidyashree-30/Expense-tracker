import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

function Settings() {
  const [budget, setBudget] = useState(30000);
  const [name, setName] = useState("Vidya");
  const [saved, setSavedMsg] = useState(false);

  const handleSave = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("monthlyBudget", budget);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleClearData = () => {
    if (window.confirm("Clear all expense data? This cannot be undone.")) {
      localStorage.removeItem("expenses");
      localStorage.removeItem("goals");
      alert("All data cleared.");
    }
  };

  const inputStyle = { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:"12px", padding:"12px 16px", color:"#fff", fontSize:"14px", outline:"none", width:"100%", boxSizing:"border-box" };
  const cardStyle = { background:"linear-gradient(180deg,#111c32,#0d1526)", border:"1px solid rgba(124,58,237,0.15)", borderRadius:"20px", padding:"26px", marginBottom:"20px" };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div style={{padding:"8px 0 24px"}}>
          <h2 style={{color:"#fff",fontSize:"22px",fontWeight:700,margin:0}}>⚙️ Settings</h2>
          <p style={{color:"#64748b",marginTop:"6px"}}>Manage your preferences</p>
        </div>

        <div style={cardStyle}>
          <h3 style={{color:"#fff",marginTop:0,marginBottom:"20px",fontSize:"18px"}}>Profile</h3>
          <div style={{marginBottom:"16px"}}>
            <label style={{color:"#94a3b8",fontSize:"13px",display:"block",marginBottom:"8px"}}>Display Name</label>
            <input style={inputStyle} value={name} onChange={e=>setName(e.target.value)}/>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{color:"#fff",marginTop:0,marginBottom:"20px",fontSize:"18px"}}>Budget Settings</h3>
          <div style={{marginBottom:"16px"}}>
            <label style={{color:"#94a3b8",fontSize:"13px",display:"block",marginBottom:"8px"}}>Monthly Budget (₹)</label>
            <input style={inputStyle} type="number" value={budget} onChange={e=>setBudget(Number(e.target.value))}/>
          </div>
          <button onClick={handleSave} style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",border:"none",borderRadius:"12px",color:"white",padding:"12px 28px",cursor:"pointer",fontSize:"14px",fontWeight:600}}>
            {saved ? "✓ Saved!" : "Save Settings"}
          </button>
        </div>

        <div style={cardStyle}>
          <h3 style={{color:"#fff",marginTop:0,marginBottom:"8px",fontSize:"18px"}}>Danger Zone</h3>
          <p style={{color:"#64748b",marginBottom:"16px",fontSize:"14px"}}>This will permanently delete all your expense and goal data.</p>
          <button onClick={handleClearData} style={{background:"linear-gradient(135deg,#dc2626,#ef4444)",border:"none",borderRadius:"12px",color:"white",padding:"12px 24px",cursor:"pointer",fontSize:"14px",fontWeight:600,boxShadow:"0 4px 16px rgba(220,38,38,0.3)"}}>
            🗑️ Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
export default Settings;
