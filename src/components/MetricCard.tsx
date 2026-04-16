interface MetricCardProps {
  metric: string;
  value: string;
  previous: string;
  unit: string;
  trend: string;
}

export default function MetricCard({
  metric,
  value,
  previous,
  unit,
  trend,
}: MetricCardProps) {
  const trendNum = parseFloat(trend.replace("%", ""));
  const isPositive = trendNum >= 0;

  // Churn rate: going UP is bad
  const isChurn = metric.toLowerCase().includes("churn");
  const isGood = isChurn ? !isPositive : isPositive;

  const formatValue = () => {
    const num = parseFloat(value.replace(/,/g, ""));
    if (unit === "$") {
      if (num >= 1000) return `$${(num / 1000).toFixed(1)}k`;
      return `$${num.toLocaleString()}`;
    }
    if (unit === "%") return `${value}%`;
    return value;
  };

  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-name">{metric}</span>
        <span
          className={`metric-trend ${isGood ? "trend--up" : "trend--down"}`}
        >
          <span className="trend-arrow">{isPositive ? "↑" : "↓"}</span>
          {Math.abs(trendNum).toFixed(1)}%
        </span>
      </div>

      <div className="metric-value">{formatValue()}</div>

      <div className="metric-footer">
        <span className="metric-prev-label">prev</span>
        <span className="metric-prev">
          {unit === "$" ? "$" : ""}
          {previous}
          {unit === "%" ? "%" : ""}
        </span>
      </div>

      <div
        className={`metric-bar-track`}
        style={
          {
            "--bar-width": `${Math.min(Math.abs(trendNum) * 3, 100)}%`,
          } as React.CSSProperties
        }
      >
        <div
          className={`metric-bar-fill ${isGood ? "bar--good" : "bar--bad"}`}
        />
      </div>
    </div>
  );
}
