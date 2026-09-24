"use client";

import Link from "next/link";
import { useState } from "react";
import { flushSync, preload } from "react-dom";
import PortfolioIndex from "@/components/PortfolioIndex";
import "./portfolio-index.css";
import { useTheme } from "@/hooks/useTheme";
import { useHydrated } from "@/hooks/useHydrated";
import WidgetCanvas from "@/components/WidgetCanvas";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Home() {
  preload('/widget-images/wind-field-square.jpg', { as: 'image' });
  const hydrated=useHydrated();
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState<"canvas" | "index">("canvas");
  const switchView = (next: "canvas" | "index") => {
    if (next === view) return;
    flushSync(() => setView(next));
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <div className={`folio canvas-folio${view === "index" ? " index-folio" : ""}`} data-theme={theme}>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <header className="folio-header">
        <Link href="/" className="folio-name">
          <span className="name-mark" aria-hidden="true">
            cv.
          </span>
          Chrisandra Vaz
        </Link>
        <nav aria-label="Main navigation">
          <a className="nav-current" href="#work">
            Work
          </a>
          <a href="/about">
            About
          </a>
          <button disabled={!hydrated}
            className="theme-control"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </nav>
      </header>
      {view === "canvas" ? <WidgetCanvas /> : <PortfolioIndex />}
      <div className="portfolio-view-switch" role="group" aria-label="Portfolio view">
        <button type="button" aria-pressed={view === "canvas"} onClick={() => switchView("canvas")}>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="3" width="6" height="7" rx="1.5" stroke="currentColor"/><rect x="11" y="2" width="7" height="5" rx="1.5" stroke="currentColor"/><rect x="5" y="13" width="5" height="5" rx="1.5" stroke="currentColor"/><rect x="13" y="10" width="5" height="7" rx="1.5" stroke="currentColor"/></svg>
          Canvas
        </button>
        <a href="/about">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor"/><path d="M8 3v14M4 7h2M4 10h2" stroke="currentColor"/></svg>
          About
        </a>
      </div>
    </div>
  );
}
