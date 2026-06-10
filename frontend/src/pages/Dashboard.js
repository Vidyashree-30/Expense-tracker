import { useState } from "react";

import ExpenseChart from "../components/ExpenseChart";
import AddExpenseButton from "../components/AddExpenseButton";
import AddExpenseModal from "../components/AddExpenseModal";
import ExpenseTable from "../components/ExpenseTable";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

import "../styles/Dashboard.css";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  const [expenses, setExpenses] = useState([
    {
      category: "Food",
      amount: 500,
      date: "2026-06-05",
    },
    {
      category: "Travel",
      amount: 1200,
      date: "2026-06-04",
    },
    {
      category: "Shopping",
      amount: 800,
      date: "2026-06-03",
    },
  ]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="cards-grid">
          <StatCard
            title="Total Expenses"
            value="₹15,000"
            subtitle="All time expenses"
          />

          <StatCard
            title="This Month"
            value="₹5,000"
            subtitle="June 2026"
          />

          <StatCard
            title="Remaining Budget"
            value="₹25,000"
            subtitle="Available to spend"
          />
        </div>

        <ExpenseChart />

        <ExpenseTable expenses={expenses} />

        <AddExpenseButton
          onClick={() => {
            alert("Button clicked");
            console.log("Button clicked");
            setShowModal(true);
          }}
        />

        {showModal && (
          <AddExpenseModal
            onClose={() => setShowModal(false)}
            onAddExpense={addExpense}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
