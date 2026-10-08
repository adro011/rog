import { ArrowRight, Clapperboard, LayoutGrid, NotebookText } from "lucide-react";
import { ACTS, BRIEF_DATE, SLIDES, TOTAL_SEC } from "@/lib/briefing-data";
import { useDeck } from "@/lib/deck-store";
import { Button } from "@/components/ui/button";
import { formatClock } from "@/lib/utils";

export function Lobby() {
  const start = useDeck((s) => s.start);
  const setMode = useDeck((s) => s.setMode);
  const go = useDeck((s) => s.go);

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <div className="relative isolate overflow-hidden">
        <img
          src="/briefing/hormuz-aerial.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/75 to-bg" />
        <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-5 pb-12 pt-24 sm:px-8 sm:pb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-paper">
            Special briefing · {BRIEF_DATE}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,10vw,7.2rem)] leading-[0.92] tracking-[-0.03em]">
            The Chokepoint
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper sm:text-xl">
            Iran, Israel, the American shadow, and the fuel crisis that followed one strait.
            A full forty-minute briefing with films, speaker notes, and a live rundown clock.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button size="lg" onClick={() => start({ rehearse: false, index: 0 })}>
              Begin briefing
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => start({ rehearse: true, index: 0 })}
            >
              <Clapperboard className="size-4" />
              Rehearse auto-run
            </Button>
            <Button size="lg" variant="ghost" onClick={() => setMode("overview")}>
              <LayoutGrid className="size-4" />
              Slide overview
            </Button>
            <Button size="lg" variant="ghost" onClick={() => setMode("handout")}>
              <NotebookText className="size-4" />
              Handout
            </Button>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {formatClock(TOTAL_SEC)} · {SLIDES.length} slides · {ACTS.length} acts · open source
          </p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Run of show</p>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACTS.map((act) => {
            const first = SLIDES.findIndex((s) => s.act === act.id);
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => {
                  go(first);
                  start({ rehearse: false, index: first });
                }}
                className="rounded-2xl bg-surface p-5 text-left shadow-[0_0_0_1px_rgb(255_255_255/0.08)] transition-transform duration-150 ease-out hover:translate-y-[-1px]"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] text-muted">
                  {act.index} · {act.runtime}
                </p>
                <p className="mt-3 font-display text-2xl leading-tight">{act.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{act.subtitle}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper">
                  {act.cue}
                </p>
              </button>
            );
          })}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-subtle">
          Built from the visual brief at The Chokepoint and the six-part speaker outline:
          intro film, Israel’s present position, the 1948–2026 rise, the US nuclear-treaty
          track, casualties and a country-wise fuel report, then the solution ladder.
          Figures are compiled from public reporting as of {BRIEF_DATE} and often disagree.
          Not a forecast or investment guide.
        </p>
      </section>
    </div>
  );
}
