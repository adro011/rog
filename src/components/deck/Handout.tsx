import { ArrowLeft } from "lucide-react";
import { ACTS, BRIEF_DATE, SLIDES, actOf } from "@/lib/briefing-data";
import { useDeck } from "@/lib/deck-store";
import { Button } from "@/components/ui/button";
import { formatClock } from "@/lib/utils";

export function Handout() {
  const setMode = useDeck((s) => s.setMode);
  const start = useDeck((s) => s.start);

  return (
    <div className="print-handout min-h-dvh bg-bg text-ink">
      <div className="print:hidden mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-6">
        <Button variant="ghost" onClick={() => setMode("lobby")}>
          <ArrowLeft className="size-4" />
          Title
        </Button>
        <Button variant="outline" onClick={() => window.print()}>
          Print handout
        </Button>
      </div>
      <article className="mx-auto max-w-3xl px-5 pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Speaker handout · {BRIEF_DATE}
        </p>
        <h1 className="mt-3 font-display text-5xl leading-tight">The Chokepoint</h1>
        <p className="mt-4 text-lg text-paper">
          Iran, Israel & the global fuel crisis · 40 minutes · {SLIDES.length} slides
        </p>
        <ol className="mt-10 space-y-3">
          {ACTS.map((a) => (
            <li key={a.id} className="flex justify-between gap-4 border-b border-line py-2 text-sm">
              <span>
                {a.index} {a.title}
              </span>
              <span className="font-mono text-muted">{a.runtime}</span>
            </li>
          ))}
        </ol>
        <div className="mt-14 space-y-12">
          {SLIDES.map((slide, i) => {
            const act = actOf(slide.act);
            return (
              <section key={slide.id} className="break-inside-avoid">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
                  {i + 1} / {SLIDES.length} · Act {act.index} · {formatClock(slide.durationSec)} ·{" "}
                  {slide.kind}
                </p>
                <h2 className="mt-2 font-display text-2xl">{slide.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-paper">{slide.notes}</p>
              </section>
            );
          })}
        </div>
        <div className="print:hidden mt-12">
          <Button onClick={() => start({ index: 0 })}>Present from the top</Button>
        </div>
      </article>
    </div>
  );
}
