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
          </tr>
        </thead>

        <tbody>

          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.category}</td>
              <td>₹{expense.amount}</td>
              <td>{expense.date}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ExpenseTable;
