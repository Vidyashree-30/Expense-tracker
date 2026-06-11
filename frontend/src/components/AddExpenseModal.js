import { useState, useEffect } from "react";
import "../styles/AddExpenseModal.css";

function AddExpenseModal({
  onClose,
  onAddExpense,
  editingExpense,
  onUpdateExpense,
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title || "");
      setCategory(editingExpense.category || "Food");
      setAmount(editingExpense.amount || "");
      setDate(editingExpense.date || "");
      setNotes(editingExpense.notes || "");
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      title,
      category,
      amount: Number(amount),
      date,
      notes,
    };

    if (editingExpense) {
      onUpdateExpense(expenseData);
    } else {
      onAddExpense(expenseData);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="expense-modal">
        <h2>
          {editingExpense
            ? "✏️ Edit Expense"
            : "💜 Add New Expense"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label>Expense Title</label>

          <input
            type="text"
            placeholder="Lunch at Cafe"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Health</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>

          <label>Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Notes</label>

          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              {editingExpense
                ? "Update Expense"
                : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
