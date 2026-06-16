import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Dashboard.css";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";

function Goals() {
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem("goals") || "[]"));
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");

  // Editing state: which goal index is being edited, and its draft values
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editTarget, setEditTarget] = useState("");
  const [editSaved, setEditSaved] = useState("");

  // Quick "add to savings" state: which goal index has the inline add box open
  const [addingIndex, setAddingIndex] = useState(null);
  const [addAmount, setAddAmount] = useState("");

  const persist = (updated) => {
    setGoals(updated);
    localStorage.setItem("goals", JSON.stringify(updated));
  };

  const addGoal = () => {
    if (!name || !target) return;
    const updated = [...goals, { name, target: Number(target), saved: Number(saved) || 0 }];
    persist(updated);
    setName(""); setTarget(""); setSaved(""); setShowForm(false);
  };

  const deleteGoal = (i) => {
    const updated = goals.filter((_, idx) => idx !== i);
    persist(updated);
  };

  const startEdit = (i) => {
    setEditingIndex(i);
    setEditName(goals[i].name);
    setEditTarget(String(goals[i].target));
    setEditSaved(String(goals[i].saved));
    setAddingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditName(""); setEditTarget(""); setEditSaved("");
  };

  const saveEdit = (i) => {
    if (!editName || !editTarget) return;
    const updated = goals.map((g, idx) =>
      idx === i
        ? { name: editName, target: Number(editTarget), saved: Number(editSaved) || 0 }
        : g
    );
    persist(updated);
    cancelEdit();
  };

  const startAdd = (i) => {
    setAddingIndex(i);
    setAddAmount("");
    setEditingIndex(null);
  };

  const cancelAdd = () => {
    setAddingIndex(null);
    setAddAmount("");
  };

  const confirmAdd = (i) => {
    const amount = Number(addAmount);
    if (!amount || amount <= 0) return;
    const updated = goals.map((g, idx) =>
      idx === i ? { ...g, saved: g.saved + amount } : g
    );
    persist(updated);
    cancelAdd();
  };

  const inputStyle = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "10px", padding: "10px 14px", color: "#fff", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" };

  const iconBtnStyle = (bg, color) => ({ background: bg, border: "none", borderRadius: "8px", width: "30px", height: "30px", cursor: "pointer", color, display: "flex", alignItems: "center", justifyContent: "center" });

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0 24px" }}>
          <div>
            <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: 0 }}>🎯 Goals</h2>
            <p style={{ color: "#64748b", marginTop: "6px" }}>Track your savings goals</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "linear-gradient(135deg,#7c3aed,#ec4899)", border: "none", borderRadius: "12px", color: "white", padding: "12px 20px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
            <Plus size={16} /> New Goal
          </button>
        </div>

        {showForm && (
          <div style={{ background: "linear-gradient(180deg,#111c32,#0d1526)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "20px", padding: "24px", marginBottom: "24px" }}>
            <h3 style={{ color: "#fff", marginTop: 0, marginBottom: "20px" }}>Add New Goal</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "16px" }}>
              <div><label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>Goal Name</label><input style={inputStyle} placeholder="e.g. New Laptop" value={name} onChange={e => setName(e.target.value)} /></div>
              <div><label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>Target Amount (₹)</label><input style={inputStyle} type="number" placeholder="50000" value={target} onChange={e => setTarget(e.target.value)} /></div>
              <div><label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>Already Saved (₹)</label><input style={inputStyle} type="number" placeholder="0" value={saved} onChange={e => setSaved(e.target.value)} /></div>
            </div>
            <button onClick={addGoal} style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)", border: "none", borderRadius: "10px", color: "white", padding: "11px 24px", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>Save Goal</button>
          </div>
        )}

        {goals.length === 0 ? (
          <div style={{ background: "linear-gradient(180deg,#111c32,#0d1526)", border: "1px solid rgba(124,58,237,0.1)", borderRadius: "20px", padding: "60px", textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
            <p style={{ color: "#64748b", fontSize: "16px" }}>No goals yet. Create your first savings goal!</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "18px" }}>
            {goals.map((g, i) => {
              const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
              const isEditing = editingIndex === i;
              const isAdding = addingIndex === i;

              return (
                <div key={i} style={{ background: "linear-gradient(180deg,#111c32,#0d1526)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: "20px", padding: "22px", position: "relative" }}>

                  {!isEditing && (
                    <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", gap: "8px" }}>
                      <button onClick={() => startEdit(i)} style={iconBtnStyle("rgba(124,58,237,0.12)", "#a78bfa")} title="Edit goal">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteGoal(i)} style={iconBtnStyle("rgba(220,38,38,0.1)", "#ef4444")} title="Delete goal">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  {isEditing ? (
                    <div style={{ marginBottom: "4px" }}>
                      <label style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "5px" }}>Goal Name</label>
                      <input style={{ ...inputStyle, marginBottom: "12px" }} value={editName} onChange={e => setEditName(e.target.value)} />

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                        <div>
                          <label style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "5px" }}>Target (₹)</label>
                          <input style={inputStyle} type="number" value={editTarget} onChange={e => setEditTarget(e.target.value)} />
                        </div>
                        <div>
                          <label style={{ color: "#94a3b8", fontSize: "12px", display: "block", marginBottom: "5px" }}>Saved (₹)</label>
                          <input style={inputStyle} type="number" value={editSaved} onChange={e => setEditSaved(e.target.value)} />
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={() => saveEdit(i)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "linear-gradient(135deg,#7c3aed,#ec4899)", border: "none", borderRadius: "10px", color: "white", padding: "10px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                          <Check size={14} /> Save
                        </button>
                        <button onClick={cancelEdit} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#cbd5e1", padding: "10px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                          <X size={14} /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 style={{ color: "#fff", marginTop: 0, marginBottom: "16px", fontSize: "17px", paddingRight: "70px" }}>{g.name}</h3>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <span style={{ color: "#94a3b8", fontSize: "13px" }}>Saved: <span style={{ color: "#a78bfa", fontWeight: 600 }}>₹{g.saved.toLocaleString()}</span></span>
                        <span style={{ color: "#94a3b8", fontSize: "13px" }}>Target: <span style={{ color: "#fff", fontWeight: 600 }}>₹{g.target.toLocaleString()}</span></span>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "999px", height: "10px", overflow: "hidden", marginBottom: "10px" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: pct >= 100 ? "linear-gradient(90deg,#10b981,#34d399)" : "linear-gradient(90deg,#7c3aed,#ec4899)", borderRadius: "999px", transition: "width 0.5s ease" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: isAdding ? "14px" : 0 }}>
                        <span style={{ color: pct >= 100 ? "#10b981" : "#a78bfa", fontSize: "13px", fontWeight: 600 }}>{pct}% {pct >= 100 ? "🎉 Achieved!" : "complete"}</span>
                        <span style={{ color: "#64748b", fontSize: "13px" }}>₹{(g.target - g.saved).toLocaleString()} to go</span>
                      </div>

                      {isAdding ? (
                        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                          <input
                            style={inputStyle}
                            type="number"
                            placeholder="Amount to add"
                            value={addAmount}
                            onChange={e => setAddAmount(e.target.value)}
                            autoFocus
                          />
                          <button onClick={() => confirmAdd(i)} style={iconBtnStyle("linear-gradient(135deg,#7c3aed,#ec4899)", "white")} title="Confirm">
                            <Check size={16} />
                          </button>
                          <button onClick={cancelAdd} style={iconBtnStyle("rgba(255,255,255,0.06)", "#cbd5e1")} title="Cancel">
                            <X size={16} />
                          </button>
                        </div>
                      ) : pct < 100 ? (
                        <button
                          onClick={() => startAdd(i)}
                          style={{ marginTop: "12px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "10px", color: "#c4b5fd", padding: "9px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
                        >
                          <Plus size={14} /> Add to savings
                        </button>
                      ) : null}
                    </>
                  )}
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
