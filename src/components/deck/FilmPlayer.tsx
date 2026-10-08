import { useEffect, useMemo, useRef, useState } from "react";
import type { FilmSlide } from "@/lib/briefing-types";
import { formatClock } from "@/lib/utils";
import { useDeck } from "@/lib/deck-store";

export function FilmPlayer({ slide }: { slide: FilmSlide }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tRef = useRef(0);
  const lastRef = useRef(performance.now());
  const tickFilm = useDeck((s) => s.tickFilm);
  const paused = useDeck((s) => s.paused);
  const [t, setT] = useState(0);

  useEffect(() => {
    tRef.current = 0;
    lastRef.current = performance.now();
    setT(0);
    tickFilm(0);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [slide.id, tickFilm]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  useEffect(() => {
    let raf = 0;
    lastRef.current = performance.now();
    const loop = (now: number) => {
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      if (!paused) {
        tRef.current = Math.min(slide.durationSec, tRef.current + dt);
        setT(tRef.current);
        tickFilm(tRef.current);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, slide.durationSec, slide.id, tickFilm]);

  const caption = useMemo(() => {
    let current = slide.captions[0];
    for (const c of slide.captions) {
      if (c.at <= t) current = c;
    }
    return current;
  }, [slide.captions, t]);

  const stillIndex = slide.stills.length
    ? Math.min(slide.stills.length - 1, Math.floor(t / 12) % slide.stills.length)
    : 0;
  const still = slide.stills[stillIndex];
  const progress = Math.min(1, t / slide.durationSec);

  return (
    <div className="relative h-full w-full overflow-hidden bg-bg">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={slide.video}
        poster={still}
        muted
        loop
        playsInline
        autoPlay
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-bg/20" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg/80 to-transparent" />

      <div className="absolute left-5 top-20 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-paper sm:left-10 sm:top-24">
        <span className="inline-flex h-2 w-2 rounded-full bg-ember" />
        <span>{slide.filmLabel}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-28 sm:px-12 sm:pb-32">
        <div className="max-w-4xl">
          {caption?.kicker ? (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
              {caption.kicker}
            </p>
          ) : null}
          <p className="font-display text-[clamp(1.4rem,3.4vw,2.75rem)] leading-[1.18] text-ink">
            {caption?.text}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4">
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-ink" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="font-mono text-xs tabular-nums text-muted">
            {formatClock(t)} / {formatClock(slide.durationSec)}
          </span>
        </div>
      </div>
    </div>
  );
}
