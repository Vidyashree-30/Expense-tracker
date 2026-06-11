import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import "../styles/ExpenseChart.css";

function ExpenseChart() {
  const data = [
    { month: "Jan", expense: 4000 },
    { month: "Feb", expense: 2500 },
    { month: "Mar", expense: 6000 },
    { month: "Apr", expense: 3500 },
    { month: "May", expense: 5000 },
    { month: "Jun", expense: 4500 }
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Monthly Expenses</h3>

        <div className="chart-tabs">
          <button className="chart-tab">
            Daily
          </button>

          <button className="chart-tab">
            Weekly
          </button>

          <button className="chart-tab active">
            Monthly
          </button>
        </div>
      </div>

      <div className="chart-body">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip />

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
