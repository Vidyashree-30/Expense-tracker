import "../styles/BunnyAssistant.css";

function BunnyAssistant() {
  return (
    <div className="dashboard-panel bunny-card">

      <h3>🐰 Bunny Assistant</h3>

      <div className="bunny-face">
        (\_/)
      </div>

      <div className="bunny-face">
        (•ᴗ•)
      </div>

      <div className="bunny-face">
        / > 💰
      </div>

      <p className="bunny-message">
        Hello Vid 👋
      </p>

      <p>
        Remaining Budget
      </p>

      <h2>
        ₹17,550
      </h2>

      <p>
        Today's Spending ₹450
      </p>

      <button className="bunny-btn">
        Ask Bunny
      </button>

    </div>
  );
}

export default BunnyAssistant;
