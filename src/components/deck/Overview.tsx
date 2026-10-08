import { X } from "lucide-react";
import { ACTS, SLIDES } from "@/lib/briefing-data";
import { useDeck } from "@/lib/deck-store";
import { cn, formatClock } from "@/lib/utils";

export function Overview() {
  const index = useDeck((s) => s.index);
  const go = useDeck((s) => s.go);
  const setMode = useDeck((s) => s.setMode);
  const start = useDeck((s) => s.start);

  return (
    <div className="min-h-dvh bg-bg px-4 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Slide overview
          </p>
          <h1 className="mt-2 font-display text-3xl">Jump the rundown</h1>
        </div>
        <button
          type="button"
          aria-label="Close overview"
          onClick={() => setMode("present")}
          className="flex size-11 items-center justify-center rounded-xl bg-surface text-ink"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="mx-auto mt-10 max-w-6xl space-y-10">
        {ACTS.map((act) => {
          const group = SLIDES.filter((s) => s.act === act.id);
          return (
            <section key={act.id}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                Act {act.index} · {act.runtime}
              </p>
              <h2 className="mt-2 font-display text-2xl">{act.title}</h2>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {group.map((slide) => {
                  const i = SLIDES.findIndex((s) => s.id === slide.id);
                  const active = i === index;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        go(i);
                        start({ index: i });
                      }}
                      className={cn(
                        "rounded-xl p-4 text-left shadow-[0_0_0_1px_rgb(255_255_255/0.08)]",
                        active ? "bg-ink text-accent-fg" : "bg-surface text-ink hover:bg-bg-elevated",
                      )}
                    >
                      <p
                        className={cn(
                          "font-mono text-[10px] uppercase tracking-[0.16em]",
                          active ? "text-accent-fg/70" : "text-muted",
                        )}
                      >
                        {i + 1} · {formatClock(slide.durationSec)} · {slide.kind}
                      </p>
                      <p className="mt-2 text-sm leading-snug">{slide.title}</p>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
