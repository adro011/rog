export type ActId = "intro" | "present" | "rise" | "usa" | "cost" | "future";

export type Caption = {
  at: number;
  kicker?: string;
  text: string;
};

export type StatItem = {
  value: string;
  label: string;
  hint?: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

export type Bullet = {
  title: string;
  body: string;
};

export type CountryItem = {
  name: string;
  share: string;
  note: string;
};

export type LadderStep = {
  window: string;
  title: string;
  lead: string;
  points: string[];
};

type Base = {
  id: string;
  act: ActId;
  durationSec: number;
  notes: string;
  kicker?: string;
  title: string;
};

export type CoverSlide = Base & {
  kind: "cover";
  image: string;
  subtitle: string;
  meta: string[];
};

export type SectionSlide = Base & {
  kind: "section";
  image: string;
  actIndex: string;
  runtime: string;
  cue: string;
};

export type AgendaSlide = Base & {
  kind: "agenda";
};

export type SplitSlide = Base & {
  kind: "split";
  image: string;
  lead: string;
  bullets: Bullet[];
};

export type StatsSlide = Base & {
  kind: "stats";
  lead?: string;
  stats: StatItem[];
  footnote?: string;
};

export type TimelineSlide = Base & {
  kind: "timeline";
  items: TimelineItem[];
};

export type QuoteSlide = Base & {
  kind: "quote";
  quote: string;
  attribution: string;
  image?: string;
};

export type FilmSlide = Base & {
  kind: "film";
  video: string;
  stills: string[];
  captions: Caption[];
  filmLabel: string;
};

export type CompareSlide = Base & {
  kind: "compare";
  leftTitle: string;
  rightTitle: string;
  left: Bullet[];
  right: Bullet[];
};

export type ChartSlide = Base & {
  kind: "chart";
  chart: "brent" | "hormuz" | "asia";
  lead: string;
  footnote?: string;
};

export type CountriesSlide = Base & {
  kind: "countries";
  lead: string;
  items: CountryItem[];
};

export type LadderSlide = Base & {
  kind: "ladder";
  steps: LadderStep[];
};

export type MapSlide = Base & {
  kind: "map";
  image: string;
  lead: string;
  pins: { label: string; sub: string; x: string; y: string }[];
};

export type CloseSlide = Base & {
  kind: "close";
  image: string;
  quote: string;
  lines: string[];
};

export type Slide =
  | CoverSlide
  | SectionSlide
  | AgendaSlide
  | SplitSlide
  | StatsSlide
  | TimelineSlide
  | QuoteSlide
  | FilmSlide
  | CompareSlide
  | ChartSlide
  | CountriesSlide
  | LadderSlide
  | MapSlide
  | CloseSlide;

export type Act = {
  id: ActId;
  index: string;
  title: string;
  subtitle: string;
  runtime: string;
  durationSec: number;
  cue: string;
};
