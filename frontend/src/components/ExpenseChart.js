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

      <h3>Monthly Expenses</h3>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="expense"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default ExpenseChart;
