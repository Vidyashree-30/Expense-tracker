import "../styles/StatCard.css";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div className="stat-icon">
          {icon}
        </div>

        {trend && (
          <div className="trend-badge">
            {trend}
          </div>
        )}

      </div>

      <h4>{title}</h4>

      <h2>{value}</h2>

      <p>{subtitle}</p>

    </div>
  );
}

export default StatCard;
