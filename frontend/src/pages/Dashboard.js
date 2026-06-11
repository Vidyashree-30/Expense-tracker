import { useState, useEffect } from "react";
import {
  Wallet,
  IndianRupee,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ExpenseChart from "../components/ExpenseChart";
import BunnyAssistant from "../components/BunnyAssistant";
import ExpenseTable from "../components/ExpenseTable";
import AddExpenseButton from "../components/AddExpenseButton";
import AddExpenseModal from "../components/AddExpenseModal";

import "../styles/Dashboard.css";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const defaultExpenses = [
    { category: "Food", amount: 500, date: "2026-06-05" },
    { category: "Travel", amount: 1200, date: "2026-06-04" },
    { category: "Shopping", amount: 800, date: "2026-06-03" },
  ];

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : defaultExpenses;
  });

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (index) => {
    setExpenses((prev) => prev.filter((_, i) => i !== index));
  };

  const editExpense = (index) => {
    setEditingExpense(expenses[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((expense, i) =>
        i === editingIndex ? updatedExpense : expense
      )
    );
    setEditingExpense(null);
    setEditingIndex(null);
  };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const monthlyBudget = 30000;

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const remainingBudget = monthlyBudget - totalExpenses;

  const today = new Date().toISOString().split("T")[0];

  const todaySpending = expenses
    .filter((expense) => expense.date === today)
    .reduce((total, expense) => total + Number(expense.amount), 0);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="cards-grid">
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses}`}
            subtitle="Overall Spending"
            icon={<Wallet size={22} />}
            trend="Live"
          />
          <StatCard
            title="Monthly Budget"
            value={`₹${monthlyBudget}`}
            subtitle="Current Budget"
            icon={<IndianRupee size={22} />}
            trend="Fixed"
          />
          <StatCard
            title="Remaining Budget"
            value={`₹${remainingBudget}`}
            subtitle="Available"
            icon={<TrendingUp size={22} />}
            trend="Live"
          />
          <StatCard
            title="Today's Spending"
            value={`₹${todaySpending}`}
            subtitle="Today"
            icon={<CalendarDays size={22} />}
            trend="Live"
          />
        </div>

        <div className="analytics-grid">
          <ExpenseChart />
          <BunnyAssistant />
        </div>

        <ExpenseTable
          expenses={expenses}
          onDelete={deleteExpense}
          onEdit={editExpense}
        />

        <AddExpenseButton onClick={() => setShowModal(true)} />

        {showModal && (
          <AddExpenseModal
            onClose={() => {
              setShowModal(false);
              setEditingExpense(null);
              setEditingIndex(null);
            }}
            onAddExpense={addExpense}
            editingExpense={editingExpense}
            onUpdateExpense={updateExpense}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
