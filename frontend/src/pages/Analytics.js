import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";

const COLORS = ["#7c3aed","#ec4899","#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6"];

function Analytics() {
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

  const catData = expenses.reduce((acc, e) => {
    const found = acc.find(x => x.name === e.category);
    if (found) found.value += Number(e.amount);
    else acc.push({ name: e.category, value: Number(e.amount) });
    return acc;
  }, []);

  const monthData = expenses.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleString("default",{month:"short"});
    const found = acc.find(x => x.month === month);
    if (found) found.amount += Number(e.amount);
    else acc.push({ month, amount: Number(e.amount) });
    return acc;
  }, []);

  const total = expenses.reduce((s,e) => s + Number(e.amount), 0);
  const avg = expenses.length ? Math.round(total / expenses.length) : 0;
  const highest = expenses.length ? Math.max(...expenses.map(e=>Number(e.amount))) : 0;

  const tooltipStyle = { backgroundColor:"#1e293b", border:"1px solid rgba(124,58,237,0.3)", borderRadius:"10px", color:"#fff" };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div style={{padding:"8px 0 24px"}}>
          <h2 style={{color:"#fff",fontSize:"22px",fontWeight:700,margin:0}}>📊 Analytics</h2>
          <p style={{color:"#64748b",marginTop:"6px"}}>Insights into your spending patterns</p>
        </div>

        <div className="cards-grid" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
          <div className="stat-card"><h4>Total Spent</h4><h2>₹{total.toLocaleString()}</h2><p>All time</p></div>
          <div className="stat-card"><h4>Avg per Expense</h4><h2>₹{avg.toLocaleString()}</h2><p>Per transaction</p></div>
          <div className="stat-card"><h4>Highest Expense</h4><h2>₹{highest.toLocaleString()}</h2><p>Single transaction</p></div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:"20px",marginBottom:"24px"}}>
          <div style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.15)",borderRadius:"20px",padding:"24px"}}>
            <h3 style={{color:"#fff",marginTop:0,marginBottom:"20px",fontSize:"18px",background:"linear-gradient(135deg,#fff,#c4b5fd)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Spending by Month</h3>
            {monthData.length === 0 ? <p style={{color:"#64748b",textAlign:"center",padding:"40px"}}>No data yet</p> : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthData}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12}/>
                  <YAxis stroke="#64748b" fontSize={12}/>
                  <Tooltip contentStyle={tooltipStyle}/>
                  <Bar dataKey="amount" fill="url(#grad)" radius={[8,8,0,0]}/>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c3aed"/>
                      <stop offset="100%" stopColor="#ec4899"/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.15)",borderRadius:"20px",padding:"24px"}}>
            <h3 style={{color:"#fff",marginTop:0,marginBottom:"20px",fontSize:"18px",background:"linear-gradient(135deg,#fff,#c4b5fd)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>By Category</h3>
            {catData.length === 0 ? <p style={{color:"#64748b",textAlign:"center",padding:"40px"}}>No data yet</p> : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={catData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={50}>
                    {catData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${v.toLocaleString()}`}/>
                  <Legend iconType="circle" wrapperStyle={{color:"#94a3b8",fontSize:"12px"}}/>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div style={{background:"linear-gradient(180deg,#111c32,#0d1526)",border:"1px solid rgba(124,58,237,0.15)",borderRadius:"20px",padding:"24px"}}>
          <h3 style={{color:"#fff",marginTop:0,marginBottom:"16px",fontSize:"18px"}}>Top Categories</h3>
          {catData.sort((a,b)=>b.value-a.value).map((cat,i) => (
            <div key={cat.name} style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"14px"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"8px",background:COLORS[i%COLORS.length],display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"12px",fontWeight:700,flexShrink:0}}>{i+1}</div>
              <span style={{color:"#e2e8f0",fontSize:"14px",flex:1,fontWeight:500}}>{cat.name}</span>
              <div style={{flex:2,background:"rgba(255,255,255,0.06)",borderRadius:"999px",height:"8px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.round((cat.value/total)*100)}%`,background:COLORS[i%COLORS.length],borderRadius:"999px"}}/>
              </div>
              <span style={{color:"#94a3b8",fontSize:"13px",minWidth:"80px",textAlign:"right"}}>₹{cat.value.toLocaleString()}</span>
              <span style={{color:"#64748b",fontSize:"12px",minWidth:"36px",textAlign:"right"}}>{Math.round((cat.value/total)*100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Analytics;
