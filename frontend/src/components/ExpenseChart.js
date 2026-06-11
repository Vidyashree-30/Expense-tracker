import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "../styles/ExpenseChart.css";

function ExpenseChart() {
  const [activeTab, setActiveTab] = useState("Monthly");

  const chartData = {
    Daily: [
      { label: "Mon", expense: 450 },
      { label: "Tue", expense: 300 },
      { label: "Wed", expense: 600 },
      { label: "Thu", expense: 200 },
      { label: "Fri", expense: 800 },
      { label: "Sat", expense: 950 },
      { label: "Sun", expense: 400 },
    ],
    Weekly: [
      { label: "Week 1", expense: 3200 },
      { label: "Week 2", expense: 4100 },
      { label: "Week 3", expense: 2800 },
      { label: "Week 4", expense: 3900 },
    ],
    Monthly: [
      { label: "Jan", expense: 4000 },
      { label: "Feb", expense: 2500 },
      { label: "Mar", expense: 6000 },
      { label: "Apr", expense: 3500 },
      { label: "May", expense: 5000 },
      { label: "Jun", expense: 4500 },
    ],
  };

  const data = chartData[activeTab];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>
          {activeTab === "Daily"
            ? "Daily Expenses"
            : activeTab === "Weekly"
            ? "Weekly Expenses"
            : "Monthly Expenses"}
        </h3>
        <div className="chart-tabs">
          {["Daily", "Weekly", "Monthly"].map((tab) => (
            <button
              key={tab}
              className={`chart-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-body">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Bar
              dataKey="expense"
              radius={[10, 10, 0, 0]}
              fill="#7c3aed"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseChart;
