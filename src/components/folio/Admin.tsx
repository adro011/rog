import {
  BookOpen,
  Calendar,
  Flag,
  Plus,
  Search,
  Shield,
  Trophy,
  Trash2,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/field";
import { completeness, positionLabel, recordsFor, studentOf } from "@/lib/folio-score";
import { SECTIONS, useFolio } from "@/lib/folio-store";
import type { AdminSection, ClassYear, TaskSection } from "@/lib/folio-types";
import { cn } from "@/lib/utils";
import { SiteHeader } from "./Shell";

const ICONS = {
  academics: BookOpen,
  activities: Trophy,
  discipline: Shield,
  events: Flag,
  scheduler: Calendar,
};

function uid() {
  return crypto.randomUUID();
}

export function Admin() {
  const [section, setSection] = useState<AdminSection>("academics");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const state = useFolio();
  const student = studentOf(state);
  const pct = Math.round(completeness(state) * 100);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return state.students;
    return state.students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.yearLabel.toLowerCase().includes(q),
    );
  }, [query, state.students]);

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <SiteHeader active="studio" />
      <div className="mx-auto flex max-w-6xl flex-col lg:flex-row">
        <aside className="sticky top-16 z-10 border-b border-line bg-bg lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="px-4 py-4 lg:px-5">
            <p className="text-xs uppercase tracking-wide text-muted">Admin</p>
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute top-3.5 left-3 size-4 text-subtle" />
              <Input
                className="pl-9"
                placeholder="Search name or ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search students"
              />
            </div>
            <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto">
              {hits.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => state.selectStudent(s.id)}
                    className={cn(
                      "flex h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm",
                      s.id === student?.id ? "bg-surface text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    <span className="truncate">{s.name}</span>
                    <span className="font-mono text-xs text-subtle">{s.id}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-2 flex h-11 w-full items-center gap-2 rounded-xl px-3 text-sm text-muted hover:text-ink"
              onClick={() => setShowNew((v) => !v)}
            >
              <Plus className="size-4" />
              New student
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-6">
            {SECTIONS.map((item) => {
              const Icon = ICONS[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={cn(
                    "flex h-11 shrink-0 items-center gap-2 rounded-xl px-3.5 text-sm",
                    section === item.id
                      ? "bg-ink text-accent-fg"
                      : "text-muted hover:bg-surface hover:text-ink",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 pb-24">
          <p className="text-sm text-muted">
            Admin
            {student ? ` / ${student.name}` : ""}
            {` / ${SECTIONS.find((s) => s.id === section)?.label}`}
          </p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-4xl tracking-tight">
                {SECTIONS.find((s) => s.id === section)?.label}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Short forms only. The portfolio chart updates as soon as you save.
              </p>
            </div>
            <Button variant="outline" onClick={() => state.reset()}>
              Restore sample
            </Button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              <span>Record progress</span>
              <span className="tabular-nums">{pct}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
              <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {showNew ? (
            <div className="mt-6">
              <NewStudent onDone={() => setShowNew(false)} />
            </div>
          ) : null}

          {student ? (
            <div className="mt-8">
              {section === "academics" ? <AcademicsForm /> : null}
              {section === "activities" ? <ActivitiesForm /> : null}
              {section === "discipline" ? <DisciplineForm /> : null}
              {section === "events" ? <EventsForm /> : null}
              {section === "scheduler" ? <SchedulerForm /> : null}
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted">Add a student to begin.</p>
          )}
        </main>
      </div>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] sm:p-6">
      {children}
    </div>
  );
}

function NewStudent({ onDone }: { onDone: () => void }) {
  const addStudent = useFolio((s) => s.addStudent);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [yearLabel, setYearLabel] = useState("Grade 9");
  const [school, setSchool] = useState("Riverside Academy");

  return (
    <Card>
      <p className="font-medium">New student</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label>Student ID</Label>
          <Input value={id} onChange={(e) => setId(e.target.value.toUpperCase())} placeholder="RS-2412" />
        </div>
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label>Year / role</Label>
          <Input value={yearLabel} onChange={(e) => setYearLabel(e.target.value)} />
        </div>
        <div>
          <Label>School</Label>
          <Input value={school} onChange={(e) => setSchool(e.target.value)} />
        </div>
      </div>
      <Button
        className="mt-4"
        disabled={!id.trim() || !name.trim()}
        onClick={() => {
          addStudent({ id: id.trim(), name: name.trim(), yearLabel, school });
          onDone();
        }}
      >
        Save student
      </Button>
    </Card>
  );
}

function AcademicsForm() {
  const state = useFolio();
  const rec = recordsFor(state);
  const [year, setYear] = useState<ClassYear>(9);
  const [position, setPosition] = useState("1");
  const [grade, setGrade] = useState("4.0");
  const filled = [true, year, position, grade].filter(Boolean).length;
  const formPct = Math.round((filled / 4) * 100);

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm text-muted">Add or replace one class year. Four fields.</p>
        <MiniBar value={formPct} />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label>Student ID</Label>
            <Input value={rec.id} readOnly />
          </div>
          <div>
            <Label>Class year</Label>
            <Select value={String(year)} onChange={(e) => setYear(Number(e.target.value) as ClassYear)}>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </Select>
          </div>
          <div>
            <Label>Class position</Label>
            <Input type="number" min={1} value={position} onChange={(e) => setPosition(e.target.value)} />
          </div>
          <div>
            <Label>Grade (0–5)</Label>
            <Input type="number" min={0} max={5} step={0.1} value={grade} onChange={(e) => setGrade(e.target.value)} />
          </div>
        </div>
        <Button
          className="mt-4"
          onClick={() =>
            state.upsertAcademic({
              id: uid(),
              studentId: rec.id,
              classYear: year,
              classPosition: Number(position) || 1,
              grade: Number(grade) || 0,
            })
          }
        >
          Save academic row
        </Button>
      </Card>
      {rec.academic
        .slice()
        .sort((a, b) => a.classYear - b.classYear)
        .map((row) => (
          <Card key={row.id}>
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">
                Grade {row.classYear}
                <span className="font-normal text-muted">
                  {" "}
                  · {positionLabel(row.classPosition)} · {row.grade.toFixed(1)}
                </span>
              </p>
              <IconBtn label="Remove" onClick={() => state.removeAcademic(row.id)} />
            </div>
          </Card>
        ))}
    </div>
  );
}

function ActivitiesForm() {
  const state = useFolio();
  const rec = recordsFor(state);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");
  const filled = [eventName, date, result].filter((v) => v.trim()).length;
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm text-muted">Event name, date, result.</p>
        <MiniBar value={Math.round((filled / 3) * 100)} />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <Label>Event name</Label>
            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label>Result</Label>
            <Input value={result} onChange={(e) => setResult(e.target.value)} />
          </div>
        </div>
        <Button
          className="mt-4"
          disabled={!eventName.trim() || !date}
          onClick={() => {
            state.addActivity({ id: uid(), studentId: rec.id, eventName, date, result });
            setEventName("");
            setResult("");
          }}
        >
          Save activity
        </Button>
      </Card>
      {rec.activities.map((row) => (
        <Card key={row.id}>
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium">
              {row.eventName}
              <span className="font-normal text-muted">
                {" "}
                · {row.result} · {row.date}
              </span>
            </p>
            <IconBtn label="Remove" onClick={() => state.removeActivity(row.id)} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function DisciplineForm() {
  const state = useFolio();
  const rec = recordsFor(state);
  return (
    <Card>
      <p className="text-sm text-muted">One number. The portfolio maps it to a conduct score of 5 minus this count.</p>
      <MiniBar value={100} />
      <div className="mt-4 max-w-xs">
        <Label>Infraction count</Label>
        <Input
          type="number"
          min={0}
          value={rec.discipline.infractionCount}
          onChange={(e) => state.setInfractions(rec.id, Math.max(0, Number(e.target.value) || 0))}
        />
      </div>
    </Card>
  );
}

function EventsForm() {
  const state = useFolio();
  const rec = recordsFor(state);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [outcome, setOutcome] = useState("");
  const filled = [eventName, date, outcome].filter((v) => v.trim()).length;
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm text-muted">Event name, date, outcome.</p>
        <MiniBar value={Math.round((filled / 3) * 100)} />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <Label>Event name</Label>
            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <Label>Outcome</Label>
            <Input value={outcome} onChange={(e) => setOutcome(e.target.value)} />
          </div>
        </div>
        <Button
          className="mt-4"
          disabled={!eventName.trim() || !date}
          onClick={() => {
            state.addEvent({ id: uid(), studentId: rec.id, eventName, date, outcome });
            setEventName("");
            setOutcome("");
          }}
        >
          Save event
        </Button>
      </Card>
      {rec.events.map((row) => (
        <Card key={row.id}>
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium">
              {row.eventName}
              <span className="font-normal text-muted">
                {" "}
                · {row.outcome} · {row.date}
              </span>
            </p>
            <IconBtn label="Remove" onClick={() => state.removeEvent(row.id)} />
          </div>
        </Card>
      ))}
    </div>
  );
}

function SchedulerForm() {
  const [showDone, setShowDone] = useState(false);
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">Event name and date only. Tick to archive.</p>
        <button
          type="button"
          className="h-11 text-sm text-muted hover:text-ink"
          onClick={() => setShowDone((v) => !v)}
        >
          {showDone ? "Hide archived" : "Show archived"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskColumn section="academic" title="Academic tasks" showDone={showDone} />
        <TaskColumn section="extra" title="Extra-curricular events" showDone={showDone} />
      </div>
    </div>
  );
}

function TaskColumn({
  section,
  title,
  showDone,
}: {
  section: TaskSection;
  title: string;
  showDone: boolean;
}) {
  const state = useFolio();
  const rec = recordsFor(state);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);
  const items = rec.tasks
    .filter((t) => t.section === section && (showDone || !t.done))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Card>
      <p className="font-display text-2xl">{title}</p>
      <ul className="mt-5 space-y-2">
        {items.length === 0 ? (
          <li className="text-sm text-subtle">Nothing listed.</li>
        ) : (
          items.map((t) => (
            <li key={t.id} className="flex items-center gap-2 rounded-xl bg-bg px-3 py-2">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => state.toggleTask(t.id)}
                className="size-4 accent-accent"
                aria-label={`Done: ${t.eventName}`}
              />
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-sm font-medium", t.done && "text-muted line-through")}>
                  {t.eventName}
                </p>
                <p className="text-xs text-muted">{t.date}</p>
              </div>
              <IconBtn label="Remove" onClick={() => state.removeTask(t.id)} />
            </li>
          ))
        )}
      </ul>
      {open ? (
        <div className="mt-4 space-y-3">
          <div>
            <Label>Event name</Label>
            <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div>
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={!eventName.trim() || !date}
              onClick={() => {
                state.addTask({
                  id: uid(),
                  studentId: rec.id,
                  section,
                  eventName,
                  date,
                  done: false,
                });
                setEventName("");
                setOpen(false);
              }}
            >
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" className="mt-5" onClick={() => setOpen(true)}>
          <Plus className="size-4" />
          Add task
        </Button>
      )}
    </Card>
  );
}

function MiniBar({ value }: { value: number }) {
  return (
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg-elevated">
      <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
    </div>
  );
}

function IconBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-11 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-bg hover:text-ember"
      onClick={onClick}
    >
      <Trash2 className="size-4" />
    </button>
  );
}
