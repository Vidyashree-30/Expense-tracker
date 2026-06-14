import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";
import "../styles/StatCard.css";

function Budget() {
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  const monthlyBudget = 30000;
  const total = expenses.reduce((s,e) => s + Number(e.amount), 0);
  const remaining = monthlyBudget - total;
  const usedPct = Math.min(100, Math.round((total / monthlyBudget) * 100));

  const categories = [
    { name: "Food", limit: 8000, color: "#7c3aed" },
    { name: "Travel", limit: 5000, color: "#ec4899" },
    { name: "Shopping", limit: 6000, color: "#3b82f6" },
    { name: "Bills", limit: 4000, color: "#10b981" },
    { name: "Health", limit: 3000, color: "#f59e0b" },
    { name: "Entertainment", limit: 2000, color: "#ef4444" },
    { name: "Other", limit: 2000, color: "#8b5cf6" },
  ];

  const catSpend = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div style={{padding:"8px 0 24px"}}>
          <h2 style={{color:"#fff",fontSize:"22px",fontWeight:700,margin:0}}>💰 Budget Overview</h2>
          <p style={{color:"#64748b",marginTop:"6px"}}>Track your monthly spending limits</p>
        </div>

        <div className="cards-grid" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
          <div className="stat-card">
            <h4>Monthly Budget</h4>
            <h2>₹{monthlyBudget.toLocaleString()}</h2>
            <p>Fixed for this month</p>
          </div>
          <div className="stat-card">
            <h4>Amount Spent</h4>
            <h2>₹{total.toLocaleString()}</h2>
            <p>{usedPct}% of budget used</p>
          </div>
          <div className="stat-card">
            <h4>Remaining</h4>
            <h2>₹{remaining.toLocaleString()}</h2>
            <p>{100 - usedPct}% still available</p>
          </div>
        </div>

        <div style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.15)",borderRadius:"20px",padding:"24px",marginBottom:"24px"}}>
          <h3 style={{color:"#fff",marginTop:0,marginBottom:"20px",fontSize:"18px"}}>Overall Budget Usage</h3>
          <div style={{background:"rgba(255,255,255,0.06)",borderRadius:"999px",height:"12px",overflow:"hidden",marginBottom:"10px"}}>
            <div style={{height:"100%",width:`${usedPct}%`,background:`linear-gradient(90deg,#7c3aed,#ec4899)`,borderRadius:"999px",transition:"width 0.5s ease"}}/>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{color:"#94a3b8",fontSize:"13px"}}>₹{total.toLocaleString()} spent</span>
            <span style={{color:"#94a3b8",fontSize:"13px"}}>{usedPct}%</span>
            <span style={{color:"#94a3b8",fontSize:"13px"}}>₹{monthlyBudget.toLocaleString()} total</span>
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"16px"}}>
          {categories.map(cat => {
            const spent = catSpend[cat.name] || 0;
            const pct = Math.min(100, Math.round((spent / cat.limit) * 100));
            return (
              <div key={cat.name} style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.12)",borderRadius:"16px",padding:"18px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"12px"}}>
                  <span style={{color:"#fff",fontWeight:600,fontSize:"15px"}}>{cat.name}</span>
                  <span style={{color:"#94a3b8",fontSize:"13px"}}>₹{spent.toLocaleString()} / ₹{cat.limit.toLocaleString()}</span>
                </div>
                <div style={{background:"rgba(255,255,255,0.06)",borderRadius:"999px",height:"8px",overflow:"hidden",marginBottom:"8px"}}>
                  <div style={{height:"100%",width:`${pct}%`,background:pct>90?"linear-gradient(90deg,#ef4444,#dc2626)":pct>70?`linear-gradient(90deg,#f59e0b,#d97706)`:`linear-gradient(90deg,${cat.color},#ec4899)`,borderRadius:"999px",transition:"width 0.5s ease"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{color:pct>90?"#ef4444":pct>70?"#f59e0b":"#10b981",fontSize:"12px",fontWeight:600}}>{pct}% used</span>
                  <span style={{color:"#64748b",fontSize:"12px"}}>₹{(cat.limit-spent).toLocaleString()} left</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Budget;
