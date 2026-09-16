"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
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
        aria-label="Toggle navigation"
        className="menu-toggle"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      <nav
        aria-label="Primary"
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
