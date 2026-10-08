import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { asiaShare, brentSeries, hormuzSeries } from "@/lib/briefing-data";

const tooltipStyle = {
  background: "var(--color-bg-elevated)",
  border: "1px solid var(--color-line)",
  borderRadius: 8,
  color: "var(--color-ink)",
  fontSize: 12,
};

export function BrentChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={brentSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="brentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-ember)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-ember)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--color-line)" vertical={false} />
        <XAxis
          dataKey="m"
          tick={{ fill: "var(--color-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v) => [`$${Number(v)}`, "Brent"]}
        />
        <Area
          type="monotone"
          dataKey="p"
          stroke="var(--color-ember)"
          strokeWidth={2}
          fill="url(#brentFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function HormuzChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={hormuzSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-line)" vertical={false} />
        <XAxis
          dataKey="m"
          tick={{ fill: "var(--color-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "var(--color-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v) => [`${Number(v)} mb/d`, "Hormuz"]}
        />
        <Bar dataKey="v" radius={[6, 6, 0, 0]}>
          {hormuzSeries.map((d) => (
            <Cell
              key={d.m}
              fill={d.m === "Crisis" ? "var(--color-ember)" : "var(--color-paper)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AsiaChart() {
  const palette = [
    "var(--color-paper)",
    "var(--color-ink)",
    "var(--color-muted)",
    "var(--color-ember)",
    "var(--color-accent)",
    "var(--color-subtle)",
  ];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={asiaShare}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
      >
        <CartesianGrid stroke="var(--color-line)" horizontal={false} />
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: "var(--color-muted)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          width={88}
        />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v)}%`, "Share"]} />
        <Bar dataKey="v" radius={[0, 6, 6, 0]}>
          {asiaShare.map((d, i) => (
            <Cell key={d.name} fill={palette[i % palette.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
