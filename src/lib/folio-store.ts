import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_FOLIO } from "./folio-default";
import type {
  AcademicRecord,
  Activity,
  AdminSection,
  CollegeEvent,
  FolioState,
  GrowthPlan,
  Student,
  Task,
  ThemeMode,
  TypeSize,
} from "./folio-types";

type Actions = {
  selectStudent: (id: string) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: string, patch: Partial<Student>) => void;
  upsertAcademic: (row: AcademicRecord) => void;
  removeAcademic: (id: string) => void;
  addActivity: (row: Activity) => void;
  removeActivity: (id: string) => void;
  setInfractions: (studentId: string, infractionCount: number) => void;
  addEvent: (row: CollegeEvent) => void;
  removeEvent: (id: string) => void;
  addTask: (row: Task) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  setTheme: (theme: ThemeMode) => void;
  setTypeSize: (typeSize: TypeSize) => void;
  setGrowthPlan: (studentId: string, plan: GrowthPlan | null) => void;
  reset: () => void;
};

export const SECTIONS: { id: AdminSection; label: string }[] = [
  { id: "academics", label: "Academics" },
  { id: "activities", label: "Activities" },
  { id: "discipline", label: "Discipline" },
  { id: "events", label: "Events" },
  { id: "scheduler", label: "Scheduler" },
];

export const useFolio = create<FolioState & Actions>()(
  persist(
    (set) => ({
      ...DEFAULT_FOLIO,
      selectStudent: (id) => set({ selectedStudentId: id }),
      addStudent: (student) =>
        set((s) => ({
          students: [...s.students, student],
          discipline: [...s.discipline, { studentId: student.id, infractionCount: 0 }],
          selectedStudentId: student.id,
        })),
      updateStudent: (id, patch) =>
        set((s) => ({
          students: s.students.map((st) => (st.id === id ? { ...st, ...patch } : st)),
        })),
      upsertAcademic: (row) =>
        set((s) => {
          const sameYear = s.academic.find(
            (r) => r.studentId === row.studentId && r.classYear === row.classYear,
          );
          if (sameYear) {
            return {
              academic: s.academic.map((r) =>
                r.id === sameYear.id ? { ...row, id: sameYear.id } : r,
              ),
            };
          }
          return { academic: [...s.academic, row] };
        }),
      removeAcademic: (id) => set((s) => ({ academic: s.academic.filter((r) => r.id !== id) })),
      addActivity: (row) => set((s) => ({ activities: [...s.activities, row] })),
      removeActivity: (id) => set((s) => ({ activities: s.activities.filter((r) => r.id !== id) })),
      setInfractions: (studentId, infractionCount) =>
        set((s) => {
          const exists = s.discipline.some((d) => d.studentId === studentId);
          return {
            discipline: exists
              ? s.discipline.map((d) =>
                  d.studentId === studentId ? { ...d, infractionCount } : d,
                )
              : [...s.discipline, { studentId, infractionCount }],
          };
        }),
      addEvent: (row) => set((s) => ({ events: [...s.events, row] })),
      removeEvent: (id) => set((s) => ({ events: s.events.filter((r) => r.id !== id) })),
      addTask: (row) => set((s) => ({ tasks: [...s.tasks, row] })),
      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      setTheme: (theme) => set({ theme }),
      setTypeSize: (typeSize) => set({ typeSize }),
      setGrowthPlan: (studentId, plan) =>
        set((s) => ({ growthPlans: { ...s.growthPlans, [studentId]: plan } })),
      reset: () => set({ ...DEFAULT_FOLIO }),
    }),
    { name: "folio-v2", skipHydration: true },
  ),
);
