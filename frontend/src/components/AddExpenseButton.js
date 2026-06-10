import "../styles/AddExpenseButton.css";

function AddExpenseButton({ onClick }) {
  return (
    <div className="add-expense-container">
      <button
        className="add-expense-btn"
        onClick={onClick}
      >
        + Add Expense
      </button>
    </div>
  );
}

export default AddExpenseButton;
