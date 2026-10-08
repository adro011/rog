import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Plus, d as Calendar, f as BookOpen, o as Shield, r as Trash2, s as Search, t as Trophy, u as Flag } from "../_libs/lucide-react.mjs";
import { a as cn, d as positionLabel, f as recordsFor, h as useFolio, m as studentOf, n as SECTIONS, o as completeness, r as SiteHeader, t as Button } from "./Shell-FAN70hEc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-CJx8abv0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-sm font-medium text-paper", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full min-w-0 rounded-xl border border-line bg-surface px-3.5 text-sm text-ink outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", className),
		...props
	});
}
function Select({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn("h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm text-ink outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", className),
		...props
	});
}
var ICONS = {
	academics: BookOpen,
	activities: Trophy,
	discipline: Shield,
	events: Flag,
	scheduler: Calendar
};
function uid() {
	return crypto.randomUUID();
}
function Admin() {
	const [section, setSection] = (0, import_react.useState)("academics");
	const [query, setQuery] = (0, import_react.useState)("");
	const [showNew, setShowNew] = (0, import_react.useState)(false);
	const state = useFolio();
	const student = studentOf(state);
	const pct = Math.round(completeness(state) * 100);
	const hits = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return state.students;
		return state.students.filter((s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.yearLabel.toLowerCase().includes(q));
	}, [query, state.students]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { active: "studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-16 z-10 border-b border-line bg-bg lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-4 lg:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted",
							children: "Admin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-3.5 left-3 size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "pl-9",
								placeholder: "Search name or ID",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								"aria-label": "Search students"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 max-h-40 space-y-1 overflow-y-auto",
							children: hits.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => state.selectStudent(s.id),
								className: cn("flex h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm", s.id === student?.id ? "bg-surface text-ink" : "text-muted hover:text-ink"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-subtle",
									children: s.id
								})]
							}) }, s.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "mt-2 flex h-11 w-full items-center gap-2 rounded-xl px-3 text-sm text-muted hover:text-ink",
							onClick: () => setShowNew((v) => !v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New student"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-6",
					children: SECTIONS.map((item) => {
						const Icon = ICONS[item.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSection(item.id),
							className: cn("flex h-11 shrink-0 items-center gap-2 rounded-xl px-3.5 text-sm", section === item.id ? "bg-ink text-accent-fg" : "text-muted hover:bg-surface hover:text-ink"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
						}, item.id);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-w-0 flex-1 px-5 py-8 pb-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Admin",
							student ? ` / ${student.name}` : "",
							` / ${SECTIONS.find((s) => s.id === section)?.label}`
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl tracking-tight",
							children: SECTIONS.find((s) => s.id === section)?.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xl text-sm leading-relaxed text-muted",
							children: "Short forms only. The portfolio chart updates as soon as you save."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => state.reset(),
							children: "Restore sample"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Record progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [pct, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-accent",
								style: { width: `${pct}%` }
							})
						})]
					}),
					showNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewStudent, { onDone: () => setShowNew(false) })
					}) : null,
					student ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							section === "academics" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AcademicsForm, {}) : null,
							section === "activities" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivitiesForm, {}) : null,
							section === "discipline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisciplineForm, {}) : null,
							section === "events" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventsForm, {}) : null,
							section === "scheduler" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SchedulerForm, {}) : null
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-sm text-muted",
						children: "Add a student to begin."
					})
				]
			})]
		})]
	});
}
function Card({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)] sm:p-6",
		children
	});
}
function NewStudent({ onDone }) {
	const addStudent = useFolio((s) => s.addStudent);
	const [id, setId] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [yearLabel, setYearLabel] = (0, import_react.useState)("Grade 9");
	const [school, setSchool] = (0, import_react.useState)("Riverside Academy");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: "New student"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Student ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: id,
					onChange: (e) => setId(e.target.value.toUpperCase()),
					placeholder: "RS-2412"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Year / role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: yearLabel,
					onChange: (e) => setYearLabel(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "School" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: school,
					onChange: (e) => setSchool(e.target.value)
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			disabled: !id.trim() || !name.trim(),
			onClick: () => {
				addStudent({
					id: id.trim(),
					name: name.trim(),
					yearLabel,
					school
				});
				onDone();
			},
			children: "Save student"
		})
	] });
}
function AcademicsForm() {
	const state = useFolio();
	const rec = recordsFor(state);
	const [year, setYear] = (0, import_react.useState)(9);
	const [position, setPosition] = (0, import_react.useState)("1");
	const [grade, setGrade] = (0, import_react.useState)("4.0");
	const filled = [
		true,
		year,
		position,
		grade
	].filter(Boolean).length;
	const formPct = Math.round(filled / 4 * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Add or replace one class year. Four fields."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBar, { value: formPct }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Student ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: rec.id,
						readOnly: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Class year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: String(year),
						onChange: (e) => setYear(Number(e.target.value)),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "7",
								children: "7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "8",
								children: "8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "9",
								children: "9"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Class position" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						value: position,
						onChange: (e) => setPosition(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Grade (0–5)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						max: 5,
						step: .1,
						value: grade,
						onChange: (e) => setGrade(e.target.value)
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				onClick: () => state.upsertAcademic({
					id: uid(),
					studentId: rec.id,
					classYear: year,
					classPosition: Number(position) || 1,
					grade: Number(grade) || 0
				}),
				children: "Save academic row"
			})
		] }), rec.academic.slice().sort((a, b) => a.classYear - b.classYear).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium",
				children: [
					"Grade ",
					row.classYear,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-normal text-muted",
						children: [
							" ",
							"· ",
							positionLabel(row.classPosition),
							" · ",
							row.grade.toFixed(1)
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
				label: "Remove",
				onClick: () => state.removeAcademic(row.id)
			})]
		}) }, row.id))]
	});
}
function ActivitiesForm() {
	const state = useFolio();
	const rec = recordsFor(state);
	const [eventName, setEventName] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)("");
	const filled = [
		eventName,
		date,
		result
	].filter((v) => v.trim()).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Event name, date, result."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBar, { value: Math.round(filled / 3 * 100) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Event name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: eventName,
							onChange: (e) => setEventName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Result" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: result,
							onChange: (e) => setResult(e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				disabled: !eventName.trim() || !date,
				onClick: () => {
					state.addActivity({
						id: uid(),
						studentId: rec.id,
						eventName,
						date,
						result
					});
					setEventName("");
					setResult("");
				},
				children: "Save activity"
			})
		] }), rec.activities.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium",
				children: [row.eventName, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-normal text-muted",
					children: [
						" ",
						"· ",
						row.result,
						" · ",
						row.date
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
				label: "Remove",
				onClick: () => state.removeActivity(row.id)
			})]
		}) }, row.id))]
	});
}
function DisciplineForm() {
	const state = useFolio();
	const rec = recordsFor(state);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "One number. The portfolio maps it to a conduct score of 5 minus this count."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBar, { value: 100 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 max-w-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Infraction count" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "number",
				min: 0,
				value: rec.discipline.infractionCount,
				onChange: (e) => state.setInfractions(rec.id, Math.max(0, Number(e.target.value) || 0))
			})]
		})
	] });
}
function EventsForm() {
	const state = useFolio();
	const rec = recordsFor(state);
	const [eventName, setEventName] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [outcome, setOutcome] = (0, import_react.useState)("");
	const filled = [
		eventName,
		date,
		outcome
	].filter((v) => v.trim()).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Event name, date, outcome."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniBar, { value: Math.round(filled / 3 * 100) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Event name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: eventName,
							onChange: (e) => setEventName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Outcome" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: outcome,
							onChange: (e) => setOutcome(e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				disabled: !eventName.trim() || !date,
				onClick: () => {
					state.addEvent({
						id: uid(),
						studentId: rec.id,
						eventName,
						date,
						outcome
					});
					setEventName("");
					setOutcome("");
				},
				children: "Save event"
			})
		] }), rec.events.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium",
				children: [row.eventName, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-normal text-muted",
					children: [
						" ",
						"· ",
						row.outcome,
						" · ",
						row.date
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
				label: "Remove",
				onClick: () => state.removeEvent(row.id)
			})]
		}) }, row.id))]
	});
}
function SchedulerForm() {
	const [showDone, setShowDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Event name and date only. Tick to archive."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "h-11 text-sm text-muted hover:text-ink",
			onClick: () => setShowDone((v) => !v),
			children: showDone ? "Hide archived" : "Show archived"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskColumn, {
			section: "academic",
			title: "Academic tasks",
			showDone
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskColumn, {
			section: "extra",
			title: "Extra-curricular events",
			showDone
		})]
	})] });
}
function TaskColumn({ section, title, showDone }) {
	const state = useFolio();
	const rec = recordsFor(state);
	const [eventName, setEventName] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const items = rec.tasks.filter((t) => t.section === section && (showDone || !t.done)).sort((a, b) => a.date.localeCompare(b.date));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 space-y-2",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-sm text-subtle",
				children: "Nothing listed."
			}) : items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center gap-2 rounded-xl bg-bg px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: t.done,
						onChange: () => state.toggleTask(t.id),
						className: "size-4 accent-accent",
						"aria-label": `Done: ${t.eventName}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("truncate text-sm font-medium", t.done && "text-muted line-through"),
							children: t.eventName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: t.date
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconBtn, {
						label: "Remove",
						onClick: () => state.removeTask(t.id)
					})
				]
			}, t.id))
		}),
		open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Event name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: eventName,
					onChange: (e) => setEventName(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: date,
					onChange: (e) => setDate(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						disabled: !eventName.trim() || !date,
						onClick: () => {
							state.addTask({
								id: uid(),
								studentId: rec.id,
								section,
								eventName,
								date,
								done: false
							});
							setEventName("");
							setOpen(false);
						},
						children: "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setOpen(false),
						children: "Cancel"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			className: "mt-5",
			onClick: () => setOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add task"]
		})
	] });
}
function MiniBar({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 h-1.5 overflow-hidden rounded-full bg-bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-accent",
			style: { width: `${value}%` }
		})
	});
}
function IconBtn({ label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		className: "flex size-11 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-bg hover:text-ember",
		onClick,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
	});
}
function AdminPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Admin, {});
}
//#endregion
export { AdminPage as component };
