"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const routes = [
  { href: "/work", label: "WORK" },
  { href: "/play", label: "PLAY" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const nav = document.getElementById("primary-navigation");
    if (!nav) return;
    const updateNavWidth = () => {
      document.documentElement.style.setProperty(
        "--site-nav-width",
        `${nav.getBoundingClientRect().width}px`
      );
    };
    updateNavWidth();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateNavWidth);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuRef.current?.focus();
        }
      }}
    >
      <Link
        aria-current={isActive("/") ? "page" : undefined}
        className="home-link"
        href="/"
        onClick={() => setOpen(false)}
      >
        HOME
      </Link>

      <button
        aria-expanded={open}
        aria-controls="primary-navigation"
        aria-label="Toggle navigation"
        className="menu-toggle"
        ref={menuRef}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      <nav
        aria-label="Primary"
        id="primary-navigation"
        className={open ? "site-nav is-open" : "site-nav"}
      >
        {routes.map((route) => (
          <Link
            aria-current={isActive(route.href) ? "page" : undefined}
            href={route.href}
            key={route.href}
            onClick={() => setOpen(false)}
          >
            {route.label}
          </Link>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
