"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Static monthly trend data — will be replaced by Sheets data in Day 3
const mrrTrendData = [
  { month: "Oct", MRR: 620, ARR: 550 },
  { month: "Nov", MRR: 740, ARR: 680 },
  { month: "Dec", MRR: 810, ARR: 760 },
  { month: "Jan", MRR: 900, ARR: 840 },
  { month: "Feb", MRR: 1060, ARR: 950 },
  { month: "Mar", MRR: 1240, ARR: 1100 },
];

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map((entry: TooltipPayload) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {entry.name}: <strong>${entry.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MRRChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Revenue Trend</h3>
          <p className="chart-subtitle">MRR & ARR — Last 6 months</p>
        </div>
        <span className="chart-badge">Monthly</span>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={mrrTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
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
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", color: "#9ca3af", paddingTop: "12px" }}
          />
          <Line
            type="monotone"
            dataKey="MRR"
            stroke="#34d399"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#34d399", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="ARR"
            stroke="#60a5fa"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#60a5fa", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
            strokeDasharray="5 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
