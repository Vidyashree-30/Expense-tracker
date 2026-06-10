import { useState } from "react";
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
            subtitle="Overall Spending"
            icon={<Wallet size={22} />}
            trend="+12%"
          />

          <StatCard
            title="Monthly Budget"
            value="₹30,000"
            subtitle="Current Budget"
            icon={<IndianRupee size={22} />}
            trend="Active"
          />

          <StatCard
            title="Remaining Budget"
            value="₹15,000"
            subtitle="Available"
            icon={<TrendingUp size={22} />}
            trend="50%"
          />

          <StatCard
            title="Today's Spending"
            value="₹450"
            subtitle="Today"
            icon={<CalendarDays size={22} />}
            trend="+₹50"
          />
        </div>

        <div className="analytics-grid">
          <ExpenseChart />

          <BunnyAssistant />
        </div>

        <ExpenseTable expenses={expenses} />

        <AddExpenseButton
          onClick={() => setShowModal(true)}
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
