import { createServerFn } from "@tanstack/react-start";
import type { GrowthPlan } from "./folio-types";

type Snapshot = {
  student: { id: string; name: string; yearLabel: string };
  academic: { classYear: number; classPosition: number; grade: number }[];
  activities: { eventName: string; result: string }[];
  infractionCount: number;
  events: { eventName: string; outcome: string }[];
  pillars: { label: string; value: number }[];
};

export const generateGrowthPlan = createServerFn({ method: "POST" })
  .validator((input: Snapshot) => input)
  .handler(async ({ data }): Promise<{ ok: true; plan: GrowthPlan } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI is not available in this environment." };

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content:
              "You are a calm school mentor. Return ONLY valid JSON with keys summary (string), pillars (array of {name, diagnosis, actions: string[2-3]}), weekPlan (string[4-5]). Short, practical bullets. No markdown.",
          },
          {
            role: "user",
            content: `Improvement plan for this student:\n${JSON.stringify(data)}`,
          },
        ],
      }),
    });

    if (!res.ok) return { ok: false, error: `Could not reach the mentor (${res.status}).` };

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    const jsonText = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

    try {
      const parsed = JSON.parse(jsonText) as {
        summary?: string;
        pillars?: { name?: string; diagnosis?: string; actions?: string[] }[];
        weekPlan?: string[];
      };
      const plan: GrowthPlan = {
        generatedAt: new Date().toISOString(),
        summary: String(parsed.summary ?? "A short, steady plan will compound."),
        pillars: (parsed.pillars ?? []).slice(0, 4).map((p) => ({
          name: String(p.name ?? "Focus"),
          diagnosis: String(p.diagnosis ?? ""),
          actions: (p.actions ?? []).slice(0, 3).map(String),
        })),
        weekPlan: (parsed.weekPlan ?? []).slice(0, 5).map(String),
      };
      return { ok: true, plan };
    } catch {
      return { ok: false, error: "The mentor replied in a form we could not read. Try once more." };
    }
  });
