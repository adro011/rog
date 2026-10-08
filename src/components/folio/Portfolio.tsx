import { Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { generateGrowthPlan } from "@/lib/ai";
import {
  compositeScore,
  formatScore,
  pillarScores,
  positionLabel,
  recordsFor,
  ruleTips,
  studentOf,
} from "@/lib/folio-score";
import { useFolio } from "@/lib/folio-store";
import { Button } from "@/components/ui/button";
import { EfficiencyChart } from "./EfficiencyChart";
import { SiteHeader } from "./Shell";

export function Portfolio() {
  const state = useFolio();
  const student = studentOf(state);
  const rec = recordsFor(state);
  const pillars = pillarScores(state);
  const composite = compositeScore(state);
  const tips = ruleTips(state);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPlan() {
    if (!student) return;
    setBusy(true);
    setError(null);
    const result = await generateGrowthPlan({
      data: {
        student: { id: student.id, name: student.name, yearLabel: student.yearLabel },
        academic: rec.academic.map(({ classYear, classPosition, grade }) => ({
          classYear,
          classPosition,
          grade,
        })),
        activities: rec.activities.map(({ eventName, result }) => ({ eventName, result })),
        infractionCount: rec.discipline.infractionCount,
        events: rec.events.map(({ eventName, outcome }) => ({ eventName, outcome })),
        pillars: pillars.map((p) => ({ label: p.label, value: Number(p.value.toFixed(2)) })),
      },
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    state.setGrowthPlan(student.id, result.plan);
  }

  if (!student) {
    return (
      <div className="min-h-dvh bg-bg text-ink">
        <SiteHeader active="folio" />
        <p className="px-5 py-16 text-muted">No student selected. Open Admin to add one.</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <SiteHeader active="folio" />
      <main className="mx-auto max-w-6xl px-5 pb-24">
        <section className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
          <div>
            <p className="text-sm tracking-wide text-muted">
              {student.school} · {student.id}
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.95] tracking-[-0.03em]">
              {student.name}
            </h1>
            <p className="mt-3 text-base text-paper">{student.yearLabel}</p>
            {state.students.length > 1 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {state.students.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => state.selectStudent(s.id)}
                    className={`h-11 rounded-xl px-3.5 text-sm ${
                      s.id === student.id
                        ? "bg-ink text-accent-fg"
                        : "bg-surface text-muted shadow-[0_0_0_1px_var(--color-line)] hover:text-ink"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]">
            <p className="text-sm text-muted">Combined efficiency</p>
            <p className="mt-2 font-display text-5xl leading-none">{formatScore(composite)}</p>
            <p className="mt-1 text-sm text-subtle">out of 5.0 · four equal pillars</p>
            <ul className="mt-5 space-y-3">
              {pillars.map((p) => (
                <li key={p.id}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-paper">{p.label}</span>
                    <span className="tabular-nums text-ink">{formatScore(p.value)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${(p.value / 5) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <EfficiencyChart state={state} />

        <section className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Segment title="Academics" kicker="Class ranks and grades">
            {rec.academic.length === 0 ? (
              <p className="text-sm text-muted">No academic rows yet.</p>
            ) : (
              <ul className="space-y-4">
                {rec.academic
                  .slice()
                  .sort((a, b) => a.classYear - b.classYear)
                  .map((y) => (
                    <li key={y.id} className="border-t border-line pt-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-medium">Grade {y.classYear}</p>
                        <p className="text-sm tabular-nums text-muted">
                          {positionLabel(y.classPosition)} · {formatScore(y.grade)} / 5
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </Segment>

          <Segment title="Games / activities" kicker="Participation and results">
            {rec.activities.length === 0 ? (
              <p className="text-sm text-muted">No activities recorded yet.</p>
            ) : (
              <ul className="space-y-4">
                {rec.activities.map((g) => (
                  <li key={g.id} className="border-t border-line pt-4">
                    <p className="font-medium">{g.eventName}</p>
                    <p className="mt-1 text-sm text-muted">
                      {g.result} · {g.date}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Segment>

          <Segment title="Discipline" kicker="Infraction count">
            <p className="font-display text-5xl tabular-nums leading-none">
              {rec.discipline.infractionCount}
            </p>
            <p className="mt-3 text-sm text-muted">
              {rec.discipline.infractionCount === 0
                ? "Clear record. Conduct score is 5.0."
                : `Conduct maps to ${formatScore(Math.max(0, 5 - rec.discipline.infractionCount))} / 5.`}
            </p>
          </Segment>

          <Segment title="College events" kicker="Participation and outcomes">
            {rec.events.length === 0 ? (
              <p className="text-sm text-muted">No college events recorded yet.</p>
            ) : (
              <ul className="space-y-4">
                {rec.events.map((s) => (
                  <li key={s.id} className="border-t border-line pt-4">
                    <p className="font-medium">{s.eventName}</p>
                    <p className="mt-1 text-sm text-muted">
                      {s.outcome} · {s.date}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Segment>
        </section>

        <section className="mt-16 rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)] sm:p-8">
          <p className="text-sm font-medium text-accent">Suggestions</p>
          <h2 className="mt-2 font-display text-3xl">From the current numbers</h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-paper">
            {tips.map((t) => (
              <li key={t} className="border-t border-line pt-3">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={onPlan} disabled={busy}>
              <Sparkles className="size-4" />
              {busy ? "Writing…" : rec.plan ? "Refresh AI plan" : "Ask the mentor"}
            </Button>
            {error ? <p className="text-sm text-ember">{error}</p> : null}
          </div>
          {rec.plan ? (
            <div className="mt-8">
              <p className="text-base leading-relaxed text-paper">{rec.plan.summary}</p>
              {rec.plan.weekPlan.length ? (
                <ol className="mt-5 space-y-2 text-sm leading-relaxed text-paper">
                  {rec.plan.weekPlan.map((step, i) => (
                    <li key={step}>
                      <span className="text-muted">{i + 1}. </span>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}

function Segment({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]">
      <p className="text-sm font-medium text-accent">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </article>
  );
}
