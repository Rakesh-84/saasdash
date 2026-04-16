"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import "./ChurnBarChart.css";

const churnData = [
  { month: "Oct", churn: 8.2, customers: 38 },
  { month: "Nov", churn: 7.5, customers: 42 },
  { month: "Dec", churn: 9.1, customers: 40 },
  { month: "Jan", churn: 6.8, customers: 45 },
  { month: "Feb", churn: 10, customers: 40 },
  { month: "Mar", churn: 5.0, customers: 60 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { customers: number } }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p style={{ color: "#f87171" }}>
          Churn: <strong>{payload[0]?.value}%</strong>
        </p>
        <p style={{ color: "#9ca3af" }}>
          Customers: <strong>{payload[0]?.payload?.customers}</strong>
        </p>
      </div>
    );
  }
  return null;
};

export default function ChurnBarChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Churn Rate</h3>
          <p className="chart-subtitle">Monthly churn % — Last 6 months</p>
        </div>
        <span className="chart-badge chart-badge--red">% rate</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={churnData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="churn" radius={[4, 4, 0, 0]}>
            {churnData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.churn <= 6
                    ? "#34d399"
                    : entry.churn >= 9
                      ? "#f87171"
                      : "#fbbf24"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
