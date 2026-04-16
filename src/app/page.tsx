import { getSheetData } from "@/lib/googleSheets";
import MetricCard from "@/components/MetricCard";
import MRRChart from "@/components/MRRChart";
import ChurnBarChart from "@/components/ChurnBarChart";

export default async function Dashboard() {
  const data = await getSheetData();

  return (
    <div className="dashboard">
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-left">
          <h1 className="page-title">Overview</h1>
          <span className="page-subtitle">All metrics · Last updated just now</span>
        </div>
        <div className="topbar-right">
          <div className="topbar-date">
            {new Date().toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <button className="btn-refresh">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Refresh
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="metrics-grid">
        {data.map((row, i) => (
          <MetricCard
            key={i}
            metric={row.Metric}
            value={row.Value}
            previous={row.Previous}
            unit={row.Unit}
            trend={row.Trend}
          />
        ))}
      </section>

      {/* Charts Row */}
      <section className="charts-grid">
        <MRRChart />
        <ChurnBarChart />
      </section>

      {/* Data Table */}
      <section className="table-section">
        <div className="table-header">
          <h3 className="table-title">Raw Metrics</h3>
          <span className="table-source">Source: Google Sheets</span>
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Current</th>
                <th>Previous</th>
                <th>Unit</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                const trendNum = parseFloat(row.Trend.replace("%", ""));
                const isChurn = row.Metric.toLowerCase().includes("churn");
                const isGood = isChurn ? trendNum <= 0 : trendNum >= 0;
                return (
                  <tr key={i}>
                    <td className="td-metric">{row.Metric}</td>
                    <td className="td-value">
                      {row.Unit === "$" ? "$" : ""}{row.Value}{row.Unit === "%" ? "%" : ""}
                    </td>
                    <td className="td-prev">
                      {row.Unit === "$" ? "$" : ""}{row.Previous}{row.Unit === "%" ? "%" : ""}
                    </td>
                    <td className="td-unit">{row.Unit}</td>
                    <td className={`td-trend ${isGood ? "trend--up" : "trend--down"}`}>
                      {trendNum >= 0 ? "+" : ""}{row.Trend}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
