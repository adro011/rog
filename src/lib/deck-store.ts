import { create } from "zustand";
import { SLIDES } from "./briefing-data";

export type DeckMode = "lobby" | "present" | "overview" | "handout";

const KEY = "chokepoint-deck-v1";

type Persist = {
  index: number;
};

function load(): Persist {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { index: 0 };
    const p = JSON.parse(raw) as Persist;
    if (typeof p.index !== "number") return { index: 0 };
    return { index: Math.min(Math.max(0, p.index), SLIDES.length - 1) };
  } catch {
    return { index: 0 };
  }
}

function save(index: number) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ index }));
  } catch {
    /* ignore */
  }
}

type State = {
  mode: DeckMode;
  index: number;
  rehearse: boolean;
  paused: boolean;
  notesOpen: boolean;
  helpOpen: boolean;
  clockOn: boolean;
  startedAt: number | null;
  holdElapsed: number;
  slideEnteredAt: number;
  filmClock: number;
  setMode: (mode: DeckMode) => void;
  go: (index: number) => void;
  next: () => void;
  prev: () => void;
  start: (opts?: { rehearse?: boolean; index?: number }) => void;
  togglePause: () => void;
  toggleNotes: () => void;
  toggleHelp: () => void;
  toggleClock: () => void;
  tickFilm: (sec: number) => void;
  elapsed: () => number;
};

export const useDeck = create<State>((set, get) => ({
  mode: "lobby",
  index: 0,
  rehearse: false,
  paused: false,
  notesOpen: false,
  helpOpen: false,
  clockOn: true,
  startedAt: null,
  holdElapsed: 0,
  slideEnteredAt: Date.now(),
  filmClock: 0,
  setMode: (mode) => set({ mode }),
  go: (index) => {
    const i = Math.min(Math.max(0, index), SLIDES.length - 1);
    save(i);
    set({ index: i, slideEnteredAt: Date.now(), filmClock: 0 });
  },
  next: () => {
    const { index } = get();
    if (index < SLIDES.length - 1) get().go(index + 1);
  },
  prev: () => {
    const { index } = get();
    if (index > 0) get().go(index - 1);
  },
  start: (opts) => {
    const index = opts?.index ?? load().index;
    const now = Date.now();
    set({
      mode: "present",
      rehearse: Boolean(opts?.rehearse),
      paused: false,
      index,
      startedAt: now,
      holdElapsed: 0,
      slideEnteredAt: now,
      filmClock: 0,
      notesOpen: false,
      helpOpen: false,
    });
    save(index);
  },
  togglePause: () => {
    const { paused, startedAt, holdElapsed } = get();
    if (!startedAt) {
      set({ paused: !paused });
      return;
    }
    if (!paused) {
      set({
        paused: true,
        holdElapsed: holdElapsed + (Date.now() - startedAt),
        startedAt: null,
      });
    } else {
      set({ paused: false, startedAt: Date.now() });
    }
  },
  toggleNotes: () => set({ notesOpen: !get().notesOpen }),
  toggleHelp: () => set({ helpOpen: !get().helpOpen }),
  toggleClock: () => set({ clockOn: !get().clockOn }),
  tickFilm: (sec) => set({ filmClock: sec }),
  elapsed: () => {
    const { startedAt, holdElapsed, paused } = get();
    const live = startedAt && !paused ? Date.now() - startedAt : 0;
    return (holdElapsed + live) / 1000;
  },
}));
