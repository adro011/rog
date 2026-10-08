import type { ReactElement } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { FolioState } from "@/lib/folio-types";
import { academicChart, formatScore, mixBuckets, pillarScores, recordsFor } from "@/lib/folio-score";

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-line)",
  borderRadius: 12,
  color: "var(--color-ink)",
  fontSize: 12,
};

const PIE = ["var(--color-accent)", "var(--color-paper)", "var(--color-ember)"];

export function EfficiencyChart({ state }: { state: FolioState }) {
  const rec = recordsFor(state);
  const pillars = pillarScores(state).map((p) => ({
    pillar: p.label,
    score: Number(p.value.toFixed(2)),
  }));
  const years = academicChart(rec.academic);
  const activityMix = mixBuckets(rec.activities.map((a) => ({ label: a.result })));
  const eventMix = mixBuckets(rec.events.map((e) => ({ label: e.outcome })));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ChartCard title="Four-pillar efficiency" hint="Each axis is scored out of 5 from live records.">
        <RadarChart data={pillars} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="var(--color-line)" />
          <PolarAngleAxis dataKey="pillar" tick={{ fill: "var(--color-muted)", fontSize: 12 }} />
          <Radar
            dataKey="score"
            stroke="var(--color-accent)"
            fill="var(--color-accent)"
            fillOpacity={0.18}
            strokeWidth={2}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(v) => [formatScore(Number(v)), "Score"]} />
        </RadarChart>
      </ChartCard>

      <ChartCard
        title="Academics by year"
        hint="Grade out of 5. Hover for class position."
        empty={!years.length}
      >
        <BarChart data={years} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="year" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 5]} tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v, _n, item) => {
              const pos = (item?.payload as { position?: number })?.position;
              return [`${formatScore(Number(v))} · ${pos ?? "—"}`, "Grade"];
            }}
          />
          <Bar dataKey="grade" fill="var(--color-accent)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartCard>

      <MixCard title="Activities mix" hint="Won, placed, or took part." data={activityMix} />
      <MixCard title="College events mix" hint="Outcomes grouped the same way." data={eventMix} />
    </div>
  );
}

function ChartCard({
  title,
  hint,
  empty,
  children,
}: {
  title: string;
  hint: string;
  empty?: boolean;
  children: ReactElement;
}) {
  return (
    <div className="rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]">
      <p className="text-sm font-medium text-paper">{title}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
      <div className="mt-2 h-64">
        {empty ? (
          <p className="flex h-full items-center text-sm text-subtle">Nothing to chart yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

function MixCard({
  title,
  hint,
  data,
}: {
  title: string;
  hint: string;
  data: { name: string; value: number }[];
}) {
  const chart = (
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80} paddingAngle={2}>
        {data.map((_, i) => (
          <Cell key={data[i].name} fill={PIE[i % PIE.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={tooltipStyle} />
    </PieChart>
  );
  return (
    <ChartCard title={title} hint={hint} empty={!data.length}>
      {chart}
    </ChartCard>
  );
}


