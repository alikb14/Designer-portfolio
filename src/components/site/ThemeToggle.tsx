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
      <span aria-hidden="true" className="theme-toggle-dot" />
    </button>
  );
}
