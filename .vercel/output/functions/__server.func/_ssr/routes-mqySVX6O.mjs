import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Sparkles } from "../_libs/lucide-react.mjs";
import { c as formatScore, d as positionLabel, f as recordsFor, h as useFolio, i as academicChart, l as mixBuckets, m as studentOf, p as ruleTips, r as SiteHeader, s as compositeScore, t as Button, u as pillarScores } from "./Shell-FAN70hEc.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as XAxis, c as Pie, d as Cell, f as ResponsiveContainer, i as YAxis, l as PolarAngleAxis, n as PieChart, o as Bar, p as Tooltip, r as BarChart, s as Radar, t as RadarChart, u as PolarGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-mqySVX6O.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateGrowthPlan = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("a74c4ca433442868192c1c7f606354741531365e1602cec4214547b646be5119"));
var tooltipStyle = {
	background: "var(--color-surface)",
	border: "1px solid var(--color-line)",
	borderRadius: 12,
	color: "var(--color-ink)",
	fontSize: 12
};
var PIE = [
	"var(--color-accent)",
	"var(--color-paper)",
	"var(--color-ember)"
];
function EfficiencyChart({ state }) {
	const rec = recordsFor(state);
	const pillars = pillarScores(state).map((p) => ({
		pillar: p.label,
		score: Number(p.value.toFixed(2))
	}));
	const years = academicChart(rec.academic);
	const activityMix = mixBuckets(rec.activities.map((a) => ({ label: a.result })));
	const eventMix = mixBuckets(rec.events.map((e) => ({ label: e.outcome })));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
				title: "Four-pillar efficiency",
				hint: "Each axis is scored out of 5 from live records.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
					data: pillars,
					cx: "50%",
					cy: "50%",
					outerRadius: "70%",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "var(--color-line)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
							dataKey: "pillar",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 12
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
							dataKey: "score",
							stroke: "var(--color-accent)",
							fill: "var(--color-accent)",
							fillOpacity: .18,
							strokeWidth: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							contentStyle: tooltipStyle,
							formatter: (v) => [formatScore(Number(v)), "Score"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
				title: "Academics by year",
				hint: "Grade out of 5. Hover for class position.",
				empty: !years.length,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: years,
					margin: {
						top: 8,
						right: 8,
						left: 0,
						bottom: 0
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "year",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 12
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							domain: [0, 5],
							tick: {
								fill: "var(--color-muted)",
								fontSize: 12
							},
							axisLine: false,
							tickLine: false,
							width: 28
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							contentStyle: tooltipStyle,
							formatter: (v, _n, item) => {
								const pos = (item?.payload)?.position;
								return [`${formatScore(Number(v))} · ${pos ?? "—"}`, "Grade"];
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "grade",
							fill: "var(--color-accent)",
							radius: [
								8,
								8,
								0,
								0
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixCard, {
				title: "Activities mix",
				hint: "Won, placed, or took part.",
				data: activityMix
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MixCard, {
				title: "College events mix",
				hint: "Outcomes grouped the same way.",
				data: eventMix
			})
		]
	});
}
function ChartCard({ title, hint, empty, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_var(--color-line)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-paper",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-64",
				children: empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "flex h-full items-center text-sm text-subtle",
					children: "Nothing to chart yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children
				})
			})
		]
	});
}
function MixCard({ title, hint, data }) {
	const chart = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
		data,
		dataKey: "value",
		nameKey: "name",
		innerRadius: 48,
		outerRadius: 80,
		paddingAngle: 2,
		children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: PIE[i % PIE.length] }, data[i].name))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCard, {
		title,
		hint,
		empty: !data.length,
		children: chart
	});
}
function Portfolio() {
	const state = useFolio();
	const student = studentOf(state);
	const rec = recordsFor(state);
	const pillars = pillarScores(state);
	const composite = compositeScore(state);
	const tips = ruleTips(state);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function onPlan() {
		if (!student) return;
		setBusy(true);
		setError(null);
		const result = await generateGrowthPlan({ data: {
			student: {
				id: student.id,
				name: student.name,
				yearLabel: student.yearLabel
			},
			academic: rec.academic.map(({ classYear, classPosition, grade }) => ({
				classYear,
				classPosition,
				grade
			})),
			activities: rec.activities.map(({ eventName, result }) => ({
				eventName,
				result
			})),
			infractionCount: rec.discipline.infractionCount,
			events: rec.events.map(({ eventName, outcome }) => ({
				eventName,
				outcome
			})),
			pillars: pillars.map((p) => ({
				label: p.label,
				value: Number(p.value.toFixed(2))
			}))
		} });
		setBusy(false);
		if (!result.ok) {
			setError(result.error);
			return;
		}
		state.setGrowthPlan(student.id, result.plan);
	}
	if (!student) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { active: "folio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-5 py-16 text-muted",
			children: "No student selected. Open Admin to add one."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { active: "folio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-5 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-10 py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tracking-wide text-muted",
							children: [
								student.school,
								" · ",
								student.id
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-[clamp(2.5rem,7vw,4.75rem)] leading-[0.95] tracking-[-0.03em]",
							children: student.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-base text-paper",
							children: student.yearLabel
						}),
						state.students.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex flex-wrap gap-2",
							children: state.students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => state.selectStudent(s.id),
								className: `h-11 rounded-xl px-3.5 text-sm ${s.id === student.id ? "bg-ink text-accent-fg" : "bg-surface text-muted shadow-[0_0_0_1px_var(--color-line)] hover:text-ink"}`,
								children: s.name
							}, s.id))
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Combined efficiency"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-5xl leading-none",
								children: formatScore(composite)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-subtle",
								children: "out of 5.0 · four equal pillars"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-3",
								children: pillars.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-paper",
										children: p.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums text-ink",
										children: formatScore(p.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-elevated",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-accent",
										style: { width: `${p.value / 5 * 100}%` }
									})
								})] }, p.id))
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EfficiencyChart, { state }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 grid grid-cols-1 gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
							title: "Academics",
							kicker: "Class ranks and grades",
							children: rec.academic.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "No academic rows yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-4",
								children: rec.academic.slice().sort((a, b) => a.classYear - b.classYear).map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "border-t border-line pt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-medium",
											children: ["Grade ", y.classYear]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm tabular-nums text-muted",
											children: [
												positionLabel(y.classPosition),
												" · ",
												formatScore(y.grade),
												" / 5"
											]
										})]
									})
								}, y.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
							title: "Games / activities",
							kicker: "Participation and results",
							children: rec.activities.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "No activities recorded yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-4",
								children: rec.activities.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-t border-line pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: g.eventName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [
											g.result,
											" · ",
											g.date
										]
									})]
								}, g.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Segment, {
							title: "Discipline",
							kicker: "Infraction count",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-5xl tabular-nums leading-none",
								children: rec.discipline.infractionCount
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: rec.discipline.infractionCount === 0 ? "Clear record. Conduct score is 5.0." : `Conduct maps to ${formatScore(Math.max(0, 5 - rec.discipline.infractionCount))} / 5.`
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segment, {
							title: "College events",
							kicker: "Participation and outcomes",
							children: rec.events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "No college events recorded yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-4",
								children: rec.events.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "border-t border-line pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: s.eventName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted",
										children: [
											s.outcome,
											" · ",
											s.date
										]
									})]
								}, s.id))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)] sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-accent",
							children: "Suggestions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl",
							children: "From the current numbers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3 text-base leading-relaxed text-paper",
							children: tips.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border-t border-line pt-3",
								children: t
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: onPlan,
								disabled: busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), busy ? "Writing…" : rec.plan ? "Refresh AI plan" : "Ask the mentor"]
							}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-ember",
								children: error
							}) : null]
						}),
						rec.plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-base leading-relaxed text-paper",
								children: rec.plan.summary
							}), rec.plan.weekPlan.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-5 space-y-2 text-sm leading-relaxed text-paper",
								children: rec.plan.weekPlan.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [i + 1, ". "]
								}), step] }, step))
							}) : null]
						}) : null
					]
				})
			]
		})]
	});
}
function Segment({ title, kicker, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_var(--color-line)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-accent",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portfolio, {});
}
//#endregion
export { Home as component };
