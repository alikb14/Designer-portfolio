"use client";

import { useSyncExternalStore } from "react";

type Theme = "dark" | "light";

function resolveTheme(): Theme {
  const saved = window.localStorage.getItem("yaad-theme");

  if (saved === "dark" || saved === "light") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-color-scheme: dark)");
      window.addEventListener("themechange", onChange);
      query.addEventListener("change", onChange);
      return () => {
        window.removeEventListener("themechange", onChange);
        query.removeEventListener("change", onChange);
      };
    },
    resolveTheme,
    () => "light",
  );

  const toggle = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("yaad-theme", nextTheme);
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
