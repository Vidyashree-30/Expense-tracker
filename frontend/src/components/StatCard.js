import "../styles/StatCard.css";

function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

export default StatCard;
