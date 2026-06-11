import { useState } from "react";
import "../styles/AddExpenseModal.css";

function AddExpenseModal({ onClose, onAddExpense }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddExpense({
      title,
      category,
      amount: Number(amount),
      date,
      notes,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="expense-modal">
        <h2>💜 Add New Expense</h2>

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
            placeholder="500"
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
            placeholder="Coffee + Lunch"
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
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
