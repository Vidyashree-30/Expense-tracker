import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddExpenseModal from "../components/AddExpenseModal";
import "../styles/Dashboard.css";
import "../styles/ExpenseTable.css";
import { Pencil, Trash2, Plus } from "lucide-react";

function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const addExpense = (expense) => {
    const updated = [...expenses, expense];
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  const deleteExpense = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  };

  const editExpense = (index) => {
    setEditingExpense(expenses[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const updateExpense = (updated) => {
    const newList = expenses.map((e, i) => i === editingIndex ? updated : e);
    setExpenses(newList);
    localStorage.setItem("expenses", JSON.stringify(newList));
    setEditingExpense(null);
    setEditingIndex(null);
  };

  const total = expenses.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="cards-grid" style={{gridTemplateColumns:"repeat(3,1fr)"}}>
          <div className="stat-card">
            <h4>Total Expenses</h4>
            <h2>₹{total.toLocaleString()}</h2>
            <p>All time</p>
          </div>
          <div className="stat-card">
            <h4>Total Transactions</h4>
            <h2>{expenses.length}</h2>
            <p>Recorded entries</p>
          </div>
          <div className="stat-card">
            <h4>Highest Expense</h4>
            <h2>₹{expenses.length ? Math.max(...expenses.map(e=>Number(e.amount))).toLocaleString() : 0}</h2>
            <p>Single transaction</p>
          </div>
        </div>

        <div className="expense-table">
          <div className="table-header">
            <h3>All Expenses</h3>
            <button onClick={() => { setEditingExpense(null); setShowModal(true); }} style={{display:"flex",alignItems:"center",gap:"6px",background:"linear-gradient(135deg,#7c3aed,#ec4899)",border:"none",borderRadius:"10px",color:"white",padding:"10px 18px",cursor:"pointer",fontSize:"14px",fontWeight:"600"}}>
              <Plus size={16}/> Add Expense
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr><td colSpan="6" style={{textAlign:"center",padding:"40px",color:"#64748b"}}>No expenses yet. Add your first one!</td></tr>
              ) : expenses.map((e, i) => (
                <tr key={i}>
                  <td style={{fontWeight:600}}>{e.title || "—"}</td>
                  <td><span className="category-badge">{e.category}</span></td>
                  <td className="amount-cell">₹{Number(e.amount).toLocaleString()}</td>
                  <td style={{color:"#94a3b8"}}>{e.date}</td>
                  <td style={{color:"#64748b",fontSize:"13px"}}>{e.notes || "—"}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => editExpense(i)}><Pencil size={14}/></button>
                      <button className="delete-btn" onClick={() => deleteExpense(i)}><Trash2 size={14}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <AddExpenseModal
            onClose={() => { setShowModal(false); setEditingExpense(null); setEditingIndex(null); }}
            onAddExpense={addExpense}
            editingExpense={editingExpense}
            onUpdateExpense={updateExpense}
          />
        )}
      </div>
    </div>
  );
}
export default Expenses;
