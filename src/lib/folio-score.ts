import type {
  AcademicRecord,
  FolioState,
  PillarScore,
  Student,
} from "./folio-types";

function avg(nums: number[]) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function clamp(n: number) {
  return Math.max(0, Math.min(5, n));
}

export function studentOf(state: FolioState): Student | undefined {
  return (
    state.students.find((s) => s.id === state.selectedStudentId) ?? state.students[0]
  );
}

export function recordsFor(state: FolioState) {
  const id = studentOf(state)?.id ?? "";
  return {
    id,
    academic: state.academic.filter((r) => r.studentId === id),
    activities: state.activities.filter((r) => r.studentId === id),
    discipline: state.discipline.find((r) => r.studentId === id) ?? {
      studentId: id,
      infractionCount: 0,
    },
    events: state.events.filter((r) => r.studentId === id),
    tasks: state.tasks.filter((r) => r.studentId === id),
    plan: state.growthPlans[id] ?? null,
  };
}

export function participationScore(count: number) {
  if (count <= 0) return 1.2;
  if (count === 1) return 2.6;
  if (count === 2) return 3.6;
  if (count === 3) return 4.3;
  return 4.8;
}

export function pillarScores(state: FolioState): PillarScore[] {
  const rec = recordsFor(state);
  return [
    {
      id: "academic",
      label: "Academics",
      value: clamp(avg(rec.academic.map((y) => y.grade))),
    },
    {
      id: "activities",
      label: "Activities",
      value: clamp(participationScore(rec.activities.length)),
    },
    {
      id: "discipline",
      label: "Discipline",
      value: clamp(5 - rec.discipline.infractionCount),
    },
    {
      id: "events",
      label: "Events",
      value: clamp(participationScore(rec.events.length)),
    },
  ];
}

export function compositeScore(state: FolioState) {
  return clamp(avg(pillarScores(state).map((p) => p.value)));
}

export function formatScore(n: number) {
  return n.toFixed(1);
}

export function positionLabel(position: number) {
  const suffix =
    position % 10 === 1 && position % 100 !== 11
      ? "st"
      : position % 10 === 2 && position % 100 !== 12
        ? "nd"
        : position % 10 === 3 && position % 100 !== 13
          ? "rd"
          : "th";
  return `${position}${suffix}`;
}

export function completeness(state: FolioState) {
  const rec = recordsFor(state);
  const years = new Set(rec.academic.map((r) => r.classYear));
  const parts = [
    years.size / 3,
    rec.activities.length ? 1 : 0,
    1,
    rec.events.length ? 1 : 0,
    rec.tasks.length ? 1 : 0,
  ];
  return avg(parts);
}

export function ruleTips(state: FolioState): string[] {
  const rec = recordsFor(state);
  const academicAvg = avg(rec.academic.map((r: AcademicRecord) => r.grade));
  const tips: string[] = [];

  if (academicAvg >= 4.2 && rec.events.length < 2) {
    tips.push("Grades are strong but stage time is thin — join one debate or extempore this term.");
  }
  if (academicAvg > 0 && academicAvg < 3.8) {
    tips.push("Lift the lowest class-year grade first. Twenty quiet minutes, four days a week, beats a weekend cram.");
  }
  if (rec.activities.length < 2) {
    tips.push("Add one regular game or house sport so the activity record is not a one-off.");
  }
  if (rec.discipline.infractionCount === 0) {
    tips.push("Discipline is clear — use that trust on a team role, not another solo prize.");
  } else if (rec.discipline.infractionCount === 1) {
    tips.push("One infraction. Keep the next month uneventful and ask for a duty that shows reliability.");
  } else {
    tips.push("Infraction count is the first thing to bring down. Agree one concrete rule with a tutor this week.");
  }
  if (rec.events.some((e) => /first|gold|win/i.test(e.outcome)) && rec.activities.length >= 2) {
    tips.push("Results are already in both hall and field. Mentor a younger speaker or teammate once.");
  }
  if (rec.academic.some((r) => r.classPosition > 5) && academicAvg >= 3.5) {
    tips.push("Position can still move. Ask for the last two marked papers and redo the missed questions only.");
  }
  if (!tips.length) {
    tips.push("The record is balanced. Keep the current rhythm and log the next event the day it happens.");
  }
  return tips.slice(0, 4);
}

export function resultBucket(label: string) {
  const t = label.toLowerCase();
  if (/gold|first|win|champion/.test(t)) return "Won";
  if (/silver|bronze|runner|semi|final/.test(t)) return "Placed";
  return "Took part";
}

export function mixBuckets(rows: { label: string }[]) {
  const counts: Record<string, number> = { Won: 0, Placed: 0, "Took part": 0 };
  for (const row of rows) counts[resultBucket(row.label)] += 1;
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([name, value]) => ({ name, value }));
}

export function academicChart(rows: AcademicRecord[]) {
  return [...rows]
    .sort((a, b) => a.classYear - b.classYear)
    .map((r) => ({ year: `G${r.classYear}`, grade: r.grade, position: r.classPosition }));
}
