import "../styles/AddExpenseModal.css";

function AddExpenseModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.8)",
        zIndex: 999999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "white",
          color: "black",
          padding: "30px",
          borderRadius: "10px"
        }}
      >
        <h2>TEST MODAL</h2>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AddExpenseModal;
