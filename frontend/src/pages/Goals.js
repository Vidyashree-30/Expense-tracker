import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";
import { Plus, Trash2 } from "lucide-react";

function Goals() {
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem("goals") || "[]"));
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  const addGoal = () => {
    if (!name || !target) return;
    const updated = [...goals, { name, target: Number(target), saved: Number(saved)||0 }];
    setGoals(updated);
    localStorage.setItem("goals", JSON.stringify(updated));
    setName(""); setTarget(""); setSaved(""); setShowForm(false);
  };

  const deleteGoal = (i) => {
    const updated = goals.filter((_,idx) => idx !== i);
    setGoals(updated);
    localStorage.setItem("goals", JSON.stringify(updated));
  };

  const inputStyle = { background:"rgba(255,255,255,0.06)", border:"1px solid rgba(124,58,237,0.2)", borderRadius:"10px", padding:"10px 14px", color:"#fff", fontSize:"14px", outline:"none", width:"100%" };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0 24px"}}>
          <div>
            <h2 style={{color:"#fff",fontSize:"22px",fontWeight:700,margin:0}}>🎯 Goals</h2>
            <p style={{color:"#64748b",marginTop:"6px"}}>Track your savings goals</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{display:"flex",alignItems:"center",gap:"6px",background:"linear-gradient(135deg,#7c3aed,#ec4899)",border:"none",borderRadius:"12px",color:"white",padding:"12px 20px",cursor:"pointer",fontSize:"14px",fontWeight:600}}>
            <Plus size={16}/> New Goal
          </button>
        </div>

        {showForm && (
          <div style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.2)",borderRadius:"20px",padding:"24px",marginBottom:"24px"}}>
            <h3 style={{color:"#fff",marginTop:0,marginBottom:"20px"}}>Add New Goal</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"14px",marginBottom:"16px"}}>
              <div><label style={{color:"#94a3b8",fontSize:"13px",display:"block",marginBottom:"6px"}}>Goal Name</label><input style={inputStyle} placeholder="e.g. New Laptop" value={name} onChange={e=>setName(e.target.value)}/></div>
              <div><label style={{color:"#94a3b8",fontSize:"13px",display:"block",marginBottom:"6px"}}>Target Amount (₹)</label><input style={inputStyle} type="number" placeholder="50000" value={target} onChange={e=>setTarget(e.target.value)}/></div>
              <div><label style={{color:"#94a3b8",fontSize:"13px",display:"block",marginBottom:"6px"}}>Already Saved (₹)</label><input style={inputStyle} type="number" placeholder="0" value={saved} onChange={e=>setSaved(e.target.value)}/></div>
            </div>
            <button onClick={addGoal} style={{background:"linear-gradient(135deg,#7c3aed,#ec4899)",border:"none",borderRadius:"10px",color:"white",padding:"11px 24px",cursor:"pointer",fontSize:"14px",fontWeight:600}}>Save Goal</button>
          </div>
        )}

        {goals.length === 0 ? (
          <div style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.1)",borderRadius:"20px",padding:"60px",textAlign:"center"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>🎯</div>
            <p style={{color:"#64748b",fontSize:"16px"}}>No goals yet. Create your first savings goal!</p>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"18px"}}>
            {goals.map((g,i) => {
              const pct = Math.min(100, Math.round((g.saved/g.target)*100));
              return (
                <div key={i} style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.15)",borderRadius:"20px",padding:"22px",position:"relative"}}>
                  <button onClick={() => deleteGoal(i)} style={{position:"absolute",top:"16px",right:"16px",background:"rgba(220,38,38,0.1)",border:"none",borderRadius:"8px",width:"30px",height:"30px",cursor:"pointer",color:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center"}}><Trash2 size={14}/></button>
                  <h3 style={{color:"#fff",marginTop:0,marginBottom:"16px",fontSize:"17px"}}>{g.name}</h3>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
                    <span style={{color:"#94a3b8",fontSize:"13px"}}>Saved: <span style={{color:"#a78bfa",fontWeight:600}}>₹{g.saved.toLocaleString()}</span></span>
                    <span style={{color:"#94a3b8",fontSize:"13px"}}>Target: <span style={{color:"#fff",fontWeight:600}}>₹{g.target.toLocaleString()}</span></span>
                  </div>
                  <div style={{background:"rgba(255,255,255,0.06)",borderRadius:"999px",height:"10px",overflow:"hidden",marginBottom:"10px"}}>
                    <div style={{height:"100%",width:`${pct}%`,background:pct>=100?"linear-gradient(90deg,#10b981,#34d399)":"linear-gradient(90deg,#7c3aed,#ec4899)",borderRadius:"999px",transition:"width 0.5s ease"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{color:pct>=100?"#10b981":"#a78bfa",fontSize:"13px",fontWeight:600}}>{pct}% {pct>=100?"🎉 Achieved!":"complete"}</span>
                    <span style={{color:"#64748b",fontSize:"13px"}}>₹{(g.target-g.saved).toLocaleString()} to go</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default Goals;
