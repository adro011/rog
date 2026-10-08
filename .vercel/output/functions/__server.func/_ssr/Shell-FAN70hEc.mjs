import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Sun, l as Moon } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Shell-FAN70hEc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", {
	variants: {
		variant: {
			primary: "bg-ink text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-ink hover:bg-surface border border-transparent hover:border-line",
			outline: "border border-line text-ink hover:bg-surface bg-transparent",
			ember: "bg-ember text-ink hover:opacity-90"
		},
		size: {
			sm: "h-10 px-3.5 text-sm rounded-lg",
			md: "h-12 px-5 text-sm rounded-xl",
			lg: "h-14 px-6 text-base rounded-2xl"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function avg(nums) {
	if (!nums.length) return 0;
	return nums.reduce((a, b) => a + b, 0) / nums.length;
}
function clamp(n) {
	return Math.max(0, Math.min(5, n));
}
function studentOf(state) {
	return state.students.find((s) => s.id === state.selectedStudentId) ?? state.students[0];
}
function recordsFor(state) {
	const id = studentOf(state)?.id ?? "";
	return {
		id,
		academic: state.academic.filter((r) => r.studentId === id),
		activities: state.activities.filter((r) => r.studentId === id),
		discipline: state.discipline.find((r) => r.studentId === id) ?? {
			studentId: id,
			infractionCount: 0
		},
		events: state.events.filter((r) => r.studentId === id),
		tasks: state.tasks.filter((r) => r.studentId === id),
		plan: state.growthPlans[id] ?? null
	};
}
function participationScore(count) {
	if (count <= 0) return 1.2;
	if (count === 1) return 2.6;
	if (count === 2) return 3.6;
	if (count === 3) return 4.3;
	return 4.8;
}
function pillarScores(state) {
	const rec = recordsFor(state);
	return [
		{
			id: "academic",
			label: "Academics",
			value: clamp(avg(rec.academic.map((y) => y.grade)))
		},
		{
			id: "activities",
			label: "Activities",
			value: clamp(participationScore(rec.activities.length))
		},
		{
			id: "discipline",
			label: "Discipline",
			value: clamp(5 - rec.discipline.infractionCount)
		},
		{
			id: "events",
			label: "Events",
			value: clamp(participationScore(rec.events.length))
		}
	];
}
function compositeScore(state) {
	return clamp(avg(pillarScores(state).map((p) => p.value)));
}
function formatScore(n) {
	return n.toFixed(1);
}
function positionLabel(position) {
	return `${position}${position % 10 === 1 && position % 100 !== 11 ? "st" : position % 10 === 2 && position % 100 !== 12 ? "nd" : position % 10 === 3 && position % 100 !== 13 ? "rd" : "th"}`;
}
function completeness(state) {
	const rec = recordsFor(state);
	return avg([
		new Set(rec.academic.map((r) => r.classYear)).size / 3,
		rec.activities.length ? 1 : 0,
		1,
		rec.events.length ? 1 : 0,
		rec.tasks.length ? 1 : 0
	]);
}
function ruleTips(state) {
	const rec = recordsFor(state);
	const academicAvg = avg(rec.academic.map((r) => r.grade));
	const tips = [];
	if (academicAvg >= 4.2 && rec.events.length < 2) tips.push("Grades are strong but stage time is thin — join one debate or extempore this term.");
	if (academicAvg > 0 && academicAvg < 3.8) tips.push("Lift the lowest class-year grade first. Twenty quiet minutes, four days a week, beats a weekend cram.");
	if (rec.activities.length < 2) tips.push("Add one regular game or house sport so the activity record is not a one-off.");
	if (rec.discipline.infractionCount === 0) tips.push("Discipline is clear — use that trust on a team role, not another solo prize.");
	else if (rec.discipline.infractionCount === 1) tips.push("One infraction. Keep the next month uneventful and ask for a duty that shows reliability.");
	else tips.push("Infraction count is the first thing to bring down. Agree one concrete rule with a tutor this week.");
	if (rec.events.some((e) => /first|gold|win/i.test(e.outcome)) && rec.activities.length >= 2) tips.push("Results are already in both hall and field. Mentor a younger speaker or teammate once.");
	if (rec.academic.some((r) => r.classPosition > 5) && academicAvg >= 3.5) tips.push("Position can still move. Ask for the last two marked papers and redo the missed questions only.");
	if (!tips.length) tips.push("The record is balanced. Keep the current rhythm and log the next event the day it happens.");
	return tips.slice(0, 4);
}
function resultBucket(label) {
	const t = label.toLowerCase();
	if (/gold|first|win|champion/.test(t)) return "Won";
	if (/silver|bronze|runner|semi|final/.test(t)) return "Placed";
	return "Took part";
}
function mixBuckets(rows) {
	const counts = {
		Won: 0,
		Placed: 0,
		"Took part": 0
	};
	for (const row of rows) counts[resultBucket(row.label)] += 1;
	return Object.entries(counts).filter(([, n]) => n > 0).map(([name, value]) => ({
		name,
		value
	}));
}
function academicChart(rows) {
	return [...rows].sort((a, b) => a.classYear - b.classYear).map((r) => ({
		year: `G${r.classYear}`,
		grade: r.grade,
		position: r.classPosition
	}));
}
var DEFAULT_FOLIO = {
	selectedStudentId: "RS-2409",
	theme: "light",
	typeSize: "md",
	growthPlans: {},
	students: [{
		id: "RS-2409",
		name: "Maya Sen",
		school: "Riverside Academy",
		yearLabel: "Grade 9 · House Captain"
	}, {
		id: "RS-2411",
		name: "Kabir Das",
		school: "Riverside Academy",
		yearLabel: "Grade 8"
	}],
	academic: [
		{
			id: "a1",
			studentId: "RS-2409",
			classYear: 7,
			classPosition: 4,
			grade: 4.1
		},
		{
			id: "a2",
			studentId: "RS-2409",
			classYear: 8,
			classPosition: 2,
			grade: 4.4
		},
		{
			id: "a3",
			studentId: "RS-2409",
			classYear: 9,
			classPosition: 2,
			grade: 4.6
		},
		{
			id: "a4",
			studentId: "RS-2411",
			classYear: 7,
			classPosition: 11,
			grade: 3.6
		},
		{
			id: "a5",
			studentId: "RS-2411",
			classYear: 8,
			classPosition: 7,
			grade: 4
		}
	],
	activities: [
		{
			id: "g1",
			studentId: "RS-2409",
			eventName: "800m inter-house",
			date: "2025-11-12",
			result: "Gold · 2:28"
		},
		{
			id: "g2",
			studentId: "RS-2409",
			eventName: "City junior basketball",
			date: "2025-12-04",
			result: "Semi-final"
		},
		{
			id: "g3",
			studentId: "RS-2409",
			eventName: "50m freestyle",
			date: "2026-03-08",
			result: "Bronze"
		},
		{
			id: "g4",
			studentId: "RS-2411",
			eventName: "House cricket",
			date: "2026-01-19",
			result: "Participated"
		}
	],
	discipline: [{
		studentId: "RS-2409",
		infractionCount: 0
	}, {
		studentId: "RS-2411",
		infractionCount: 2
	}],
	events: [
		{
			id: "e1",
			studentId: "RS-2409",
			eventName: "City debate finals",
			date: "2026-02-18",
			outcome: "Runners-up"
		},
		{
			id: "e2",
			studentId: "RS-2409",
			eventName: "Founders’ Day extempore",
			date: "2026-01-24",
			outcome: "First"
		},
		{
			id: "e3",
			studentId: "RS-2411",
			eventName: "Class elocution",
			date: "2025-11-09",
			outcome: "Participated"
		}
	],
	tasks: [
		{
			id: "t1",
			studentId: "RS-2409",
			section: "academic",
			eventName: "Term 2 mathematics mock",
			date: "2026-10-08",
			done: false
		},
		{
			id: "t2",
			studentId: "RS-2409",
			section: "academic",
			eventName: "Science practical",
			date: "2026-10-14",
			done: false
		},
		{
			id: "t3",
			studentId: "RS-2409",
			section: "extra",
			eventName: "House debate shortlist",
			date: "2026-10-06",
			done: false
		},
		{
			id: "t4",
			studentId: "RS-2409",
			section: "extra",
			eventName: "Extempore club",
			date: "2026-10-11",
			done: true
		}
	]
};
var SECTIONS = [
	{
		id: "academics",
		label: "Academics"
	},
	{
		id: "activities",
		label: "Activities"
	},
	{
		id: "discipline",
		label: "Discipline"
	},
	{
		id: "events",
		label: "Events"
	},
	{
		id: "scheduler",
		label: "Scheduler"
	}
];
var useFolio = create()(persist((set) => ({
	...DEFAULT_FOLIO,
	selectStudent: (id) => set({ selectedStudentId: id }),
	addStudent: (student) => set((s) => ({
		students: [...s.students, student],
		discipline: [...s.discipline, {
			studentId: student.id,
			infractionCount: 0
		}],
		selectedStudentId: student.id
	})),
	updateStudent: (id, patch) => set((s) => ({ students: s.students.map((st) => st.id === id ? {
		...st,
		...patch
	} : st) })),
	upsertAcademic: (row) => set((s) => {
		const sameYear = s.academic.find((r) => r.studentId === row.studentId && r.classYear === row.classYear);
		if (sameYear) return { academic: s.academic.map((r) => r.id === sameYear.id ? {
			...row,
			id: sameYear.id
		} : r) };
		return { academic: [...s.academic, row] };
	}),
	removeAcademic: (id) => set((s) => ({ academic: s.academic.filter((r) => r.id !== id) })),
	addActivity: (row) => set((s) => ({ activities: [...s.activities, row] })),
	removeActivity: (id) => set((s) => ({ activities: s.activities.filter((r) => r.id !== id) })),
	setInfractions: (studentId, infractionCount) => set((s) => {
		return { discipline: s.discipline.some((d) => d.studentId === studentId) ? s.discipline.map((d) => d.studentId === studentId ? {
			...d,
			infractionCount
		} : d) : [...s.discipline, {
			studentId,
			infractionCount
		}] };
	}),
	addEvent: (row) => set((s) => ({ events: [...s.events, row] })),
	removeEvent: (id) => set((s) => ({ events: s.events.filter((r) => r.id !== id) })),
	addTask: (row) => set((s) => ({ tasks: [...s.tasks, row] })),
	toggleTask: (id) => set((s) => ({ tasks: s.tasks.map((t) => t.id === id ? {
		...t,
		done: !t.done
	} : t) })),
	removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
	setTheme: (theme) => set({ theme }),
	setTypeSize: (typeSize) => set({ typeSize }),
	setGrowthPlan: (studentId, plan) => set((s) => ({ growthPlans: {
		...s.growthPlans,
		[studentId]: plan
	} })),
	reset: () => set({ ...DEFAULT_FOLIO })
}), {
	name: "folio-v2",
	skipHydration: true
}));
function useFolioHydrated() {
	(0, import_react.useEffect)(() => {
		useFolio.persist.rehydrate();
	}, []);
}
function ThemeSync() {
	useFolioHydrated();
	const theme = useFolio((s) => s.theme);
	const typeSize = useFolio((s) => s.typeSize);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		root.dataset.typeSize = typeSize;
	}, [theme, typeSize]);
	return null;
}
function ThemeControls() {
	const theme = useFolio((s) => s.theme);
	const typeSize = useFolio((s) => s.typeSize);
	const setTheme = useFolio((s) => s.setTheme);
	const setTypeSize = useFolio((s) => s.setTypeSize);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink",
				"aria-label": theme === "dark" ? "Use light theme" : "Use dark theme",
				onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
				children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex h-11 items-center rounded-xl px-2.5 text-sm text-muted hover:bg-surface hover:text-ink",
				"aria-label": "Smaller type",
				onClick: () => setTypeSize(typeSize === "lg" ? "md" : "sm"),
				children: "A−"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex h-11 items-center rounded-xl px-2.5 text-sm text-muted hover:bg-surface hover:text-ink",
				"aria-label": "Larger type",
				onClick: () => setTypeSize(typeSize === "sm" ? "md" : "lg"),
				children: "A+"
			})
		]
	});
}
function SiteHeader({ active }) {
	const student = useFolio(studentOf);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSync, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex min-w-0 items-baseline gap-3 text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xl tracking-tight",
					children: "Folio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden truncate text-sm text-muted sm:inline",
					children: student?.name
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: cn("flex h-11 items-center rounded-xl px-3.5 text-sm", active === "folio" ? "bg-surface text-ink shadow-[0_0_0_1px_var(--color-line)]" : "text-muted hover:text-ink"),
						children: "Portfolio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: cn("flex h-11 items-center rounded-xl px-3.5 text-sm", active === "studio" ? "bg-surface text-ink shadow-[0_0_0_1px_var(--color-line)]" : "text-muted hover:text-ink"),
						children: "Admin"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeControls, {})]
			})]
		})
	})] });
}
//#endregion
export { cn as a, formatScore as c, positionLabel as d, recordsFor as f, useFolio as h, academicChart as i, mixBuckets as l, studentOf as m, SECTIONS as n, completeness as o, ruleTips as p, SiteHeader as r, compositeScore as s, Button as t, pillarScores as u };
