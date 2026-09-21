"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "dark" | "light";
let volatileTheme: Theme | undefined;

function resolveTheme(): Theme {
  if (volatileTheme) return volatileTheme;
  try {
    const saved = window.localStorage.getItem("yaad-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Fall back to the system, not the SSR theme written during hydration.
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="12"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="12"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      window.addEventListener("themechange", onChange);
      window.addEventListener("storage", onChange);
      query.addEventListener("change", onChange);
      return () => {
        window.removeEventListener("themechange", onChange);
        window.removeEventListener("storage", onChange);
        query.removeEventListener("change", onChange);
      };
    },
    resolveTheme,
    () => "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem("yaad-theme", nextTheme);
    } catch {
      // The selected theme still works for this page when storage is denied.
      volatileTheme = nextTheme;
    }
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <button
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
      className="theme-toggle"
      onClick={toggle}
      type="button"
    >
      <span aria-hidden="true" className="theme-toggle-track">
        <span className="theme-toggle-track-icon theme-toggle-sun">
          <SunIcon />
        </span>
        <span className="theme-toggle-track-icon theme-toggle-moon">
          <MoonIcon />
        </span>
      </span>
      <span aria-hidden="true" className="theme-toggle-dot">
        <span className="theme-toggle-thumb-icon is-sun">
          <SunIcon />
        </span>
        <span className="theme-toggle-thumb-icon is-moon">
          <MoonIcon />
        </span>
      </span>
    </button>
  );
}
