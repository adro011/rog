import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { studentOf } from "@/lib/folio-score";
import { useFolio } from "@/lib/folio-store";
import { cn } from "@/lib/utils";

export function useFolioHydrated() {
  useEffect(() => {
    void useFolio.persist.rehydrate();
  }, []);
}

export function ThemeSync() {
  useFolioHydrated();
  const theme = useFolio((s) => s.theme);
  const typeSize = useFolio((s) => s.typeSize);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.dataset.typeSize = typeSize;
  }, [theme, typeSize]);
  return null;
}

export function ThemeControls() {
  const theme = useFolio((s) => s.theme);
  const typeSize = useFolio((s) => s.typeSize);
  const setTheme = useFolio((s) => s.setTheme);
  const setTypeSize = useFolio((s) => s.setTypeSize);
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="flex size-11 items-center justify-center rounded-xl text-muted hover:bg-surface hover:text-ink"
        aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
      <button
        type="button"
        className="flex h-11 items-center rounded-xl px-2.5 text-sm text-muted hover:bg-surface hover:text-ink"
        aria-label="Smaller type"
        onClick={() => setTypeSize(typeSize === "lg" ? "md" : "sm")}
      >
        A−
      </button>
      <button
        type="button"
        className="flex h-11 items-center rounded-xl px-2.5 text-sm text-muted hover:bg-surface hover:text-ink"
        aria-label="Larger type"
        onClick={() => setTypeSize(typeSize === "sm" ? "md" : "lg")}
      >
        A+
      </button>
    </div>
  );
}

export function SiteHeader({ active }: { active: "folio" | "studio" }) {
  const student = useFolio(studentOf);
  return (
    <>
      <ThemeSync />
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
          <Link to="/" className="flex min-w-0 items-baseline gap-3 text-ink">
            <span className="font-display text-xl tracking-tight">Folio</span>
            <span className="hidden truncate text-sm text-muted sm:inline">
              {student?.name}
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <nav className="flex items-center gap-1">
              <Link
                to="/"
                className={cn(
                  "flex h-11 items-center rounded-xl px-3.5 text-sm",
                  active === "folio"
                    ? "bg-surface text-ink shadow-[0_0_0_1px_var(--color-line)]"
                    : "text-muted hover:text-ink",
                )}
              >
                Portfolio
              </Link>
              <Link
                to="/admin"
                className={cn(
                  "flex h-11 items-center rounded-xl px-3.5 text-sm",
                  active === "studio"
                    ? "bg-surface text-ink shadow-[0_0_0_1px_var(--color-line)]"
                    : "text-muted hover:text-ink",
                )}
              >
                Admin
              </Link>
            </nav>
            <ThemeControls />
          </div>
        </div>
      </header>
    </>
  );
}
