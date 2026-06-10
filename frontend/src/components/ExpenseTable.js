import { Pencil, Trash2 } from "lucide-react";
import "../styles/ExpenseTable.css";

function ExpenseTable({ expenses }) {
  return (
    <div className="expense-table">
      <div className="table-header">
        <h3>Recent Expenses</h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>
                <span className="category-badge">
                  {expense.category}
                </span>
              </td>

              <td className="amount-cell">
                ₹{expense.amount}
              </td>

              <td>{expense.date}</td>

              <td>
                <div className="action-buttons">
                  <button className="edit-btn">
                    <Pencil size={16} />
                  </button>

                  <button className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
