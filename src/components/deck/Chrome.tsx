import {
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Grid3x3,
  Maximize2,
  Notebook,
  Pause,
  Play,
  Timer,
} from "lucide-react";
import { ACTS, SLIDES, TOTAL_SEC, actOf, cumulativeStart } from "@/lib/briefing-data";
import { useDeck } from "@/lib/deck-store";
import { cn, formatClock } from "@/lib/utils";

export function Chrome({ elapsed }: { elapsed: number }) {
  const index = useDeck((s) => s.index);
  const notesOpen = useDeck((s) => s.notesOpen);
  const paused = useDeck((s) => s.paused);
  const rehearse = useDeck((s) => s.rehearse);
  const clockOn = useDeck((s) => s.clockOn);
  const next = useDeck((s) => s.next);
  const prev = useDeck((s) => s.prev);
  const toggleNotes = useDeck((s) => s.toggleNotes);
  const toggleHelp = useDeck((s) => s.toggleHelp);
  const togglePause = useDeck((s) => s.togglePause);
  const toggleClock = useDeck((s) => s.toggleClock);
  const setMode = useDeck((s) => s.setMode);
  const go = useDeck((s) => s.go);

  const slide = SLIDES[index];
  const act = actOf(slide.act);
  const remaining = Math.max(0, TOTAL_SEC - elapsed);
  const expected = cumulativeStart(index);
  const pace = elapsed - expected;
  const paceLabel =
    Math.abs(pace) < 8 ? "on pace" : pace > 0 ? `${formatClock(pace)} behind` : `${formatClock(-pace)} ahead`;

  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-4 py-3 sm:px-6">
        <div className="pointer-events-auto rounded-xl bg-bg/70 px-3 py-2 backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Act {act.index} · {act.title}
          </p>
          <p className="mt-0.5 max-w-[42vw] truncate text-xs text-paper sm:max-w-none">
            {slide.title}
          </p>
        </div>
        <div className="pointer-events-auto flex items-center gap-2 rounded-xl bg-bg/70 px-3 py-2 font-mono text-xs tabular-nums text-paper backdrop-blur-sm">
          {clockOn ? (
            <>
              <span>{formatClock(elapsed)}</span>
              <span className="text-subtle">/</span>
              <span>{formatClock(TOTAL_SEC)}</span>
              <span className="ml-2 hidden text-[10px] uppercase tracking-[0.16em] text-muted sm:inline">
                {formatClock(remaining)} left · {paceLabel}
              </span>
            </>
          ) : (
            <span className="text-muted">clock off</span>
          )}
          {rehearse ? (
            <span className="ml-2 text-[10px] uppercase tracking-[0.16em] text-ember">auto</span>
          ) : null}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-3 sm:px-5 sm:pb-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-bg/80 px-2 py-2 shadow-[0_0_0_1px_rgb(255_255_255/0.08)] backdrop-blur-sm sm:gap-3 sm:px-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="flex size-11 items-center justify-center rounded-xl text-ink hover:bg-surface"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label={paused ? "Resume" : "Pause"}
            onClick={togglePause}
            className="flex size-11 items-center justify-center rounded-xl text-ink hover:bg-surface"
          >
            {paused ? <Play className="size-4 translate-x-px" /> : <Pause className="size-4" />}
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="flex size-11 items-center justify-center rounded-xl text-ink hover:bg-surface"
          >
            <ChevronRight className="size-5" />
          </button>

          <div className="mx-1 hidden h-6 w-px bg-line sm:block" />

          <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto md:flex">
            {ACTS.map((a) => {
              const first = SLIDES.findIndex((s) => s.act === a.id);
              const active = slide.act === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => go(first)}
                  className={cn(
                    "h-8 shrink-0 rounded-lg px-2.5 font-mono text-[10px] uppercase tracking-[0.16em]",
                    active ? "bg-surface text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {a.index} {a.title}
                </button>
              );
            })}
          </div>

          <p className="ml-auto font-mono text-[11px] tabular-nums text-muted">
            {index + 1} / {SLIDES.length}
          </p>

          <button
            type="button"
            aria-label="Speaker notes"
            onClick={toggleNotes}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl hover:bg-surface",
              notesOpen ? "text-ink" : "text-muted",
            )}
          >
            <Notebook className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Overview"
            onClick={() => setMode("overview")}
            className="flex size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink"
          >
            <Grid3x3 className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Toggle clock"
            onClick={toggleClock}
            className="hidden size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink sm:flex"
          >
            <Timer className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Shortcuts"
            onClick={toggleHelp}
            className="flex size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink"
          >
            <CircleHelp className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Exit to title"
            onClick={() => setMode("lobby")}
            className="flex size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink"
          >
            <Maximize2 className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
}
