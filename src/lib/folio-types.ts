export type ClassYear = 7 | 8 | 9;
export type ThemeMode = "light" | "dark";
export type TypeSize = "sm" | "md" | "lg";
export type AdminSection = "academics" | "activities" | "discipline" | "events" | "scheduler";
export type TaskSection = "academic" | "extra";

export type Student = {
  id: string;
  name: string;
  school: string;
  yearLabel: string;
};

export type AcademicRecord = {
  id: string;
  studentId: string;
  classYear: ClassYear;
  classPosition: number;
  grade: number;
};

export type Activity = {
  id: string;
  studentId: string;
  eventName: string;
  date: string;
  result: string;
};

export type Discipline = {
  studentId: string;
  infractionCount: number;
};

export type CollegeEvent = {
  id: string;
  studentId: string;
  eventName: string;
  date: string;
  outcome: string;
};

export type Task = {
  id: string;
  studentId: string;
  section: TaskSection;
  eventName: string;
  date: string;
  done: boolean;
};

export type GrowthPlan = {
  generatedAt: string;
  summary: string;
  pillars: { name: string; diagnosis: string; actions: string[] }[];
  weekPlan: string[];
};

export type FolioState = {
  students: Student[];
  academic: AcademicRecord[];
  activities: Activity[];
  discipline: Discipline[];
  events: CollegeEvent[];
  tasks: Task[];
  selectedStudentId: string;
  theme: ThemeMode;
  typeSize: TypeSize;
  growthPlans: Record<string, GrowthPlan | null>;
};

export type PillarId = "academic" | "activities" | "discipline" | "events";

export type PillarScore = {
  id: PillarId;
  label: string;
  value: number;
};
