import type { ReactNode } from "react";
import { ACTS } from "@/lib/briefing-data";
import type { Slide } from "@/lib/briefing-types";
import { AsiaChart, BrentChart, HormuzChart } from "./Charts";
import { FilmPlayer } from "./FilmPlayer";

function Kicker({ children }: { children: string }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">{children}</p>
  );
}

function Display({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={`font-display text-[clamp(1.8rem,4.6vw,3.6rem)] leading-[1.08] tracking-[-0.02em] text-ink ${className}`}
    >
      {children}
    </h1>
  );
}

export function SlideView({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "cover":
      return (
        <div className="relative h-full w-full overflow-hidden">
          <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" />
          <div className="slide-overlay">
            <div className="max-w-4xl">
              {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
              <Display className="mt-4">{slide.title}</Display>
              <p className="mt-5 max-w-2xl text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-paper">
                {slide.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {slide.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "section":
      return (
        <div className="relative h-full w-full overflow-hidden">
          <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-bg/80" />
          <div className="slide-overlay justify-center">
            <p className="font-mono text-sm tracking-[0.28em] text-muted">ACT {slide.actIndex}</p>
            <Display className="mt-6 max-w-4xl">{slide.title}</Display>
            <p className="mt-6 font-mono text-sm uppercase tracking-[0.2em] text-paper">
              {slide.runtime} · {slide.cue}
            </p>
          </div>
        </div>
      );
    case "agenda":
      return (
        <div className="slide-shell">
          <Kicker>{slide.kicker ?? "Run of show"}</Kicker>
          <Display className="mt-4">{slide.title}</Display>
          <ol className="mt-8 grid min-h-0 flex-1 grid-cols-1 content-start gap-3 overflow-auto sm:grid-cols-2 lg:grid-cols-3">
            {ACTS.map((act) => (
              <li
                key={act.id}
                className="flex flex-col justify-between rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-muted">
                    {act.index} · {act.runtime}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-tight text-ink">{act.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{act.subtitle}</p>
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper">
                  {act.cue}
                </p>
              </li>
            ))}
          </ol>
        </div>
      );
    case "split":
      return (
        <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative hidden min-h-0 lg:block">
            <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg" />
          </div>
          <div className="slide-shell justify-center overflow-auto">
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Display className="mt-4">{slide.title}</Display>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper sm:text-lg">
              {slide.lead}
            </p>
            <ul className="mt-8 space-y-5">
              {slide.bullets.map((b) => (
                <li key={b.title} className="border-t border-line pt-4">
                  <p className="text-sm font-medium tracking-wide text-ink">{b.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    case "stats":
      return (
        <div className="slide-shell justify-center overflow-auto">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display className="mt-4 max-w-4xl">{slide.title}</Display>
          {slide.lead ? (
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-paper">{slide.lead}</p>
          ) : null}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {slide.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-surface px-5 py-6 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
              >
                <p className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none text-ink">
                  {s.value}
                </p>
                <p className="mt-3 text-sm font-medium text-paper">{s.label}</p>
                {s.hint ? <p className="mt-1 text-xs text-muted">{s.hint}</p> : null}
              </div>
            ))}
          </div>
          {slide.footnote ? (
            <p className="mt-8 max-w-3xl text-xs leading-relaxed text-subtle">{slide.footnote}</p>
          ) : null}
        </div>
      );
    case "timeline":
      return (
        <div className="slide-shell justify-center overflow-auto">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display className="mt-4">{slide.title}</Display>
          <ol className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {slide.items.map((item, i) => (
              <li key={item.year} className="relative border-t border-line pt-5">
                <p className="font-mono text-xs tracking-[0.18em] text-ember">
                  {String(i + 1).padStart(2, "0")} · {item.year}
                </p>
                <p className="mt-3 font-display text-2xl text-ink">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      );
    case "quote":
      return (
        <div className="relative h-full w-full overflow-hidden">
          {slide.image ? (
            <>
              <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-bg/78" />
            </>
          ) : (
            <div className="absolute inset-0 bg-bg" />
          )}
          <div className="slide-overlay justify-center">
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <blockquote className="mt-6 max-w-4xl font-display text-[clamp(1.6rem,4vw,3.1rem)] leading-[1.15] text-ink">
              {slide.quote}
            </blockquote>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {slide.attribution}
            </p>
          </div>
        </div>
      );
    case "film":
      return <FilmPlayer slide={slide} />;
    case "compare":
      return (
        <div className="slide-shell overflow-auto">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display className="mt-4">{slide.title}</Display>
          <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {slide.leftTitle}
              </p>
              <ul className="mt-6 space-y-5">
                {slide.left.map((b) => (
                  <li key={b.title}>
                    <p className="text-base text-ink">{b.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{b.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-surface p-6 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                {slide.rightTitle}
              </p>
              <ul className="mt-6 space-y-5">
                {slide.right.map((b) => (
                  <li key={b.title}>
                    <p className="text-base text-ink">{b.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{b.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    case "chart":
      return (
        <div className="slide-shell overflow-auto">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display className="mt-4">{slide.title}</Display>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper sm:text-base">
            {slide.lead}
          </p>
          <div className="mt-6 min-h-0 flex-1">
            {slide.chart === "brent" ? <BrentChart /> : null}
            {slide.chart === "hormuz" ? <HormuzChart /> : null}
            {slide.chart === "asia" ? <AsiaChart /> : null}
          </div>
          {slide.footnote ? (
            <p className="mt-3 text-xs text-subtle">{slide.footnote}</p>
          ) : null}
        </div>
      );
    case "countries":
      return (
        <div className="slide-shell overflow-auto">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display className="mt-4">{slide.title}</Display>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper sm:text-base">
            {slide.lead}
          </p>
          <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
            {slide.items.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-2xl text-ink">{c.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {c.share}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "ladder":
      return (
        <div className="slide-shell overflow-auto">
          {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
          <Display className="mt-4">{slide.title}</Display>
          <div className="mt-8 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
            {slide.steps.map((step) => (
              <div
                key={step.title}
                className="flex flex-col rounded-2xl bg-surface p-5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)]"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
                  {step.window}
                </p>
                <p className="mt-3 font-display text-2xl text-ink">{step.title}</p>
                <p className="mt-2 text-sm text-paper">{step.lead}</p>
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted">
                  {step.points.map((p) => (
                    <li key={p} className="border-t border-line pt-2.5">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    case "map":
      return (
        <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="relative min-h-[42vh] lg:min-h-0">
            <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-bg/25" />
            {slide.pins.map((pin) => (
              <div
                key={pin.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pin.x, top: pin.y }}
              >
                <div className="h-2.5 w-2.5 rounded-full bg-ink shadow-[0_0_0_4px_rgb(236_232_225/0.2)]" />
                <div className="mt-2 whitespace-nowrap">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    {pin.label}
                  </p>
                  <p className="text-[11px] text-paper">{pin.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="slide-shell justify-center overflow-auto">
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Display className="mt-4">{slide.title}</Display>
            <p className="mt-5 text-base leading-relaxed text-paper">{slide.lead}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              20%+ of global petroleum liquids
            </p>
          </div>
        </div>
      );
    case "close":
      return (
        <div className="relative h-full w-full overflow-hidden">
          <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
          <div className="slide-overlay">
            {slide.kicker ? <Kicker>{slide.kicker}</Kicker> : null}
            <Display className="mt-4 max-w-4xl">{slide.title}</Display>
            <p className="mt-6 max-w-3xl font-display text-[clamp(1.15rem,2.2vw,1.7rem)] leading-snug text-paper">
              {slide.quote}
            </p>
            <div className="mt-8 space-y-2 text-sm text-muted">
              {slide.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
