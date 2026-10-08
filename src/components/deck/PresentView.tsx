import { useEffect, useRef, useState, type TouchEvent } from "react";
import { SLIDES } from "@/lib/briefing-data";
import { useDeck } from "@/lib/deck-store";
import { Chrome } from "./Chrome";
import { SlideView } from "./SlideView";

export function PresentView() {
  const index = useDeck((s) => s.index);
  const next = useDeck((s) => s.next);
  const prev = useDeck((s) => s.prev);
  const go = useDeck((s) => s.go);
  const toggleNotes = useDeck((s) => s.toggleNotes);
  const toggleHelp = useDeck((s) => s.toggleHelp);
  const togglePause = useDeck((s) => s.togglePause);
  const setMode = useDeck((s) => s.setMode);
  const notesOpen = useDeck((s) => s.notesOpen);
  const helpOpen = useDeck((s) => s.helpOpen);
  const rehearse = useDeck((s) => s.rehearse);
  const paused = useDeck((s) => s.paused);
  const slideEnteredAt = useDeck((s) => s.slideEnteredAt);
  const elapsedFn = useDeck((s) => s.elapsed);
  const [elapsed, setElapsed] = useState(0);

  const touchX = useRef<number | null>(null);
  const slide = SLIDES[index];

  useEffect(() => {
    const id = window.setInterval(() => setElapsed(elapsedFn()), 250);
    return () => window.clearInterval(id);
  }, [elapsedFn]);

  useEffect(() => {
    if (!rehearse || paused) return;
    const remain = Math.max(0, slide.durationSec * 1000 - (Date.now() - slideEnteredAt));
    const t = window.setTimeout(() => next(), remain);
    return () => window.clearTimeout(t);
  }, [rehearse, paused, slide.durationSec, slideEnteredAt, index, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "Backspace") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        go(0);
      } else if (e.key === "End") {
        go(SLIDES.length - 1);
      } else if (e.key === "s" || e.key === "S") {
        toggleNotes();
      } else if (e.key === "o" || e.key === "O" || e.key === "Escape") {
        if (helpOpen) toggleHelp();
        else setMode("overview");
      } else if (e.key === "?" || e.key === "h" || e.key === "H") {
        toggleHelp();
      } else if (e.key === "p" || e.key === "P") {
        togglePause();
      } else if (e.key === "b" || e.key === "B" || e.key === ".") {
        togglePause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, toggleNotes, toggleHelp, togglePause, setMode, helpOpen]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.changedTouches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const x = e.changedTouches[0]?.clientX;
    if (touchX.current == null || x == null) return;
    const dx = x - touchX.current;
    if (dx < -50) next();
    if (dx > 50) prev();
    touchX.current = null;
  };

  return (
    <div
      className="relative h-dvh overflow-hidden bg-bg"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="absolute inset-y-0 left-0 z-10 w-[12%] cursor-w-resize"
        onClick={prev}
        aria-hidden
      />
      <div
        className="absolute inset-y-0 right-0 z-10 w-[12%] cursor-e-resize"
        onClick={next}
        aria-hidden
      />
      <div className="h-full w-full">
        <SlideView key={slide.id} slide={slide} />
      </div>
      <Chrome elapsed={elapsed} />

      {notesOpen ? (
        <aside className="absolute bottom-24 left-4 right-4 z-30 max-h-[40vh] overflow-auto rounded-2xl bg-bg-elevated/95 p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.1)] backdrop-blur-md sm:left-auto sm:right-5 sm:w-[min(28rem,92vw)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Speaker notes · {formatClockSafe(slide.durationSec)}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper">{slide.notes}</p>
        </aside>
      ) : null}

      {helpOpen ? (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-bg/70 p-4">
          <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_rgb(255_255_255/0.1)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Shortcuts
            </p>
            <ul className="mt-4 space-y-2 text-sm text-paper">
              <li className="flex justify-between gap-4">
                <span>Next / previous</span>
                <span className="font-mono text-muted">← → space</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Speaker notes</span>
                <span className="font-mono text-muted">S</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Overview</span>
                <span className="font-mono text-muted">O / esc</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Pause clock</span>
                <span className="font-mono text-muted">P / B</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Help</span>
                <span className="font-mono text-muted">H / ?</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={toggleHelp}
              className="mt-6 h-11 w-full rounded-xl bg-ink text-sm font-medium text-accent-fg"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function formatClockSafe(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
