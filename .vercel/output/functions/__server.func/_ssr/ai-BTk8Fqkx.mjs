import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-BTk8Fqkx.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var generateGrowthPlan_createServerFn_handler = createServerRpc({
	id: "a74c4ca433442868192c1c7f606354741531365e1602cec4214547b646be5119",
	name: "generateGrowthPlan",
	filename: "src/lib/ai.ts"
}, (opts) => generateGrowthPlan.__executeServer(opts));
var generateGrowthPlan = createServerFn({ method: "POST" }).validator((input) => input).handler(generateGrowthPlan_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			temperature: .4,
			messages: [{
				role: "system",
				content: "You are a calm school mentor. Return ONLY valid JSON with keys summary (string), pillars (array of {name, diagnosis, actions: string[2-3]}), weekPlan (string[4-5]). Short, practical bullets. No markdown."
			}, {
				role: "user",
				content: `Improvement plan for this student:\n${JSON.stringify(data)}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Could not reach the mentor (${res.status}).`
	};
	const jsonText = ((await res.json()).choices?.[0]?.message?.content ?? "").replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
	try {
		const parsed = JSON.parse(jsonText);
		return {
			ok: true,
			plan: {
				generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
				summary: String(parsed.summary ?? "A short, steady plan will compound."),
				pillars: (parsed.pillars ?? []).slice(0, 4).map((p) => ({
					name: String(p.name ?? "Focus"),
					diagnosis: String(p.diagnosis ?? ""),
					actions: (p.actions ?? []).slice(0, 3).map(String)
				})),
				weekPlan: (parsed.weekPlan ?? []).slice(0, 5).map(String)
			}
		};
	} catch {
		return {
			ok: false,
			error: "The mentor replied in a form we could not read. Try once more."
		};
	}
});
//#endregion
export { generateGrowthPlan_createServerFn_handler };
