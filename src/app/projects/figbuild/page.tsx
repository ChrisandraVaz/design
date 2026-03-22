"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

const sections = ["overview", "problem", "solution"] as const;
type SectionId = (typeof sections)[number];

export default function FigBuildCaseStudyPage() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const updateActiveSection = useCallback(() => {
    let current: SectionId = "overview";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (window.scrollY >= el.offsetTop - 180) current = id;
    });
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    const frame = requestAnimationFrame(updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      cancelAnimationFrame(frame);
    };
  }, [updateActiveSection]);

  const scrollToSection = (id: SectionId) => {
    if (id === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e8edf4]" data-theme={theme}>
      <style jsx global>{`
        [data-theme="dark"] {
          --fb-bg: #000000;
          --fb-wrap-bg: #000000;
          --fb-text-primary: #f4f6f8;
          --fb-text-secondary: #a0a0a0;
          --fb-text-muted: #a0a0a0;
          --fb-card-bg: #171717;
          --fb-card-border: #262626;
          --fb-card-hover: #0F0F0F;
          --fb-nav-bg: #000000;
          --fb-nav-border: #262626;
          --fb-pills-bg: #171717;
          --fb-pills-border: #262626;
          --fb-pill-active-bg: #262626;
          --fb-pill-active-color: #f4f6f8;
          --fb-hero-bg: #171717;
          --fb-hero-border: #262626;
          --fb-demo-bg: #0F0F0F;
          --fb-demo-border: #262626;
          --fb-demo-tabs-bg: #171717;
          --fb-demo-tab-bg: #171717;
          --fb-demo-tab-border: #262626;
          --fb-demo-body-bg: #0F0F0F;
          --fb-alert-bg: #171717;
          --fb-alert-border: #262626;
        }
        [data-theme="light"] {
          --fb-bg: #fff;
          --fb-wrap-bg: #fff;
          --fb-text-primary: #111;
          --fb-text-secondary: #555555;
          --fb-text-muted: #888888;
          --fb-card-bg: #fff;
          --fb-card-border: #e5e5e5;
          --fb-card-hover: #fafafa;
          --fb-nav-bg: #fff;
          --fb-nav-border: #f0f0f0;
          --fb-pills-bg: #f5f5f7;
          --fb-pills-border: #e5e5e5;
          --fb-pill-active-bg: #fff;
          --fb-pill-active-color: #111;
          --fb-hero-bg: #f5f5f7;
          --fb-hero-border: #e5e5e5;
          --fb-demo-bg: #f5f5f7;
          --fb-demo-border: #e5e5e5;
          --fb-demo-tabs-bg: #f5f5f7;
          --fb-demo-tab-bg: #fff;
          --fb-demo-tab-border: #e5e5e5;
          --fb-demo-body-bg: #fafafa;
          --fb-alert-bg: #f5f5f7;
          --fb-alert-border: #e5e5e5;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .fb-wrap {
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--fb-wrap-bg);
          color: var(--fb-text-primary);
        }
        .fb-top-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          border-bottom: 1px solid var(--fb-nav-border);
          background: var(--fb-nav-bg);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }
        .fb-back {
          position: absolute;
          left: 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--fb-text-secondary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
        .fb-back:hover { color: var(--fb-text-primary); }
        .fb-pills {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--fb-pills-bg);
          border: 1px solid var(--fb-pills-border);
          border-radius: 999px;
          padding: 4px;
        }
        .fb-pill {
          border: none;
          background: transparent;
          color: var(--fb-text-secondary);
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 999px;
          cursor: pointer;
        }
        .fb-pill:hover { color: var(--fb-text-primary); }
        .fb-pill.active {
          background: var(--fb-pill-active-bg);
          color: var(--fb-pill-active-color);
        }
        .fb-main {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 96px 80px 48px 80px;
        }
        .fb-meta {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--fb-text-muted);
          margin-bottom: 16px;
        }
        .fb-title {
          font-size: 48px;
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: var(--fb-text-primary);
          margin: 0 0 48px;
        }
        .fb-hero {
          width: 100%;
          background: var(--fb-hero-bg);
          border: 1px solid var(--fb-hero-border);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 48px;
        }
        .fb-info {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 32px;
          margin-bottom: 48px;
        }
        .fb-info h4 {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--fb-text-muted);
          margin: 0 0 8px;
        }
        .fb-info p {
          font-size: 14px;
          line-height: 1.7;
          color: var(--fb-text-primary);
          margin: 0;
        }
        .fb-section {
          margin-bottom: 48px;
          scroll-margin-top: 90px;
        }
        .fb-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 1.3px;
          text-transform: uppercase;
          color: var(--fb-text-muted);
          margin: 0 0 16px;
        }
        .fb-h2 {
          font-size: 28px;
          line-height: 1.35;
          letter-spacing: -0.015em;
          color: var(--fb-text-primary);
          margin: 0 0 24px;
          font-weight: 600;
        }
        .fb-text {
          font-size: 16px;
          line-height: 1.75;
          color: var(--fb-text-secondary);
          margin: 0 0 16px;
          max-width: 720px;
        }
        .fb-callout {
          border-left: 3px solid #d61f96;
          padding-left: 18px;
          margin: 28px 0 0;
          color: var(--fb-text-primary);
          font-style: italic;
          font-size: 20px;
          line-height: 1.55;
        }
        .fb-alert {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-top: 24px;
          border: 1px solid var(--fb-alert-border);
          background: var(--fb-alert-bg);
          border-radius: 10px;
          padding: 18px 20px;
        }
        .fb-alert-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(214, 31, 150, 0.15);
          color: #ff8bd4;
          font-size: 14px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .fb-alert-title {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 600;
          color: var(--fb-text-primary);
        }
        .fb-alert-text {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          color: var(--fb-text-secondary);
        }
        .fb-list {
          margin: 12px 0 0;
          padding-left: 18px;
          color: var(--fb-text-secondary);
          line-height: 1.8;
          font-size: 17px;
        }
        .fb-list li { margin-bottom: 8px; }
        .fb-process {
          margin-top: 26px;
        }
        .fb-process-title {
          margin: 0 0 8px;
          color: #ff4db6;
          font-size: 24px;
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .fb-process-text {
          margin: 0 0 16px;
          color: var(--fb-text-secondary);
          font-size: 16px;
          line-height: 1.7;
        }
        @media (max-width: 1024px) {
          .fb-main { padding: 96px 32px 40px; }
          .fb-title { font-size: 40px; }
          .fb-info { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 720px) {
          .fb-back { display: none; }
          .fb-main { padding: 84px 16px 40px; }
          .fb-title { font-size: 32px; margin-bottom: 32px; }
          .fb-h2 { font-size: 28px; }
          .fb-text { font-size: 16px; }
          .fb-info { grid-template-columns: 1fr; gap: 16px; }
          .fb-pills {
            overflow-x: auto;
            max-width: calc(100vw - 28px);
            scrollbar-width: none;
          }
          .fb-pills::-webkit-scrollbar { display: none; }
          .fb-process-title { font-size: 20px; }
        }
      `}</style>

      <div className="fb-wrap">
        <nav className="fb-top-nav">
          <Link href="/" className="fb-back">
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>
          <div className="fb-pills">
            <button className={`fb-pill ${activeSection === "overview" ? "active" : ""}`} onClick={() => scrollToSection("overview")}>
              Overview
            </button>
            <button className={`fb-pill ${activeSection === "problem" ? "active" : ""}`} onClick={() => scrollToSection("problem")}>
              Problem
            </button>
            <button className={`fb-pill ${activeSection === "solution" ? "active" : ""}`} onClick={() => scrollToSection("solution")}>
              Solution
            </button>
          </div>
        </nav>

        <main className="fb-main">
          <p className="fb-meta">FIGBUILD 2025 · SHIPPED 2025</p>
          <h1 className="fb-title">FigBuild 2025 | Figma Inaugural Designathon</h1>

          <div className="fb-hero">
            <Image
              src="/assets/figbuild.png"
              alt="FigBuild 2025 campaign assets"
              width={1800}
              height={1100}
              unoptimized
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          <div className="fb-info">
            <div>
              <h4>Role</h4>
              <p>Content Designer</p>
            </div>
            <div>
              <h4>Timeline</h4>
              <p>2025 Designathon Season</p>
            </div>
            <div>
              <h4>Team</h4>
              <p>Figma Campus + Student Organizers</p>
            </div>
            <div>
              <h4>Scope</h4>
              <p>Cross-Campus Campaign Assets</p>
            </div>
          </div>

          <section id="overview" className="fb-section">
            <p className="fb-label">Overview</p>
            <h2 className="fb-h2">The tl;dr</h2>
            <p className="fb-text">
              This project focused on creating a cohesive content and visual asset system for FigBuild, Figma&apos;s
              inaugural designathon spanning 8 universities. I worked on content direction, messaging hierarchy, and
              post-ready assets so 50+ organizing teams could communicate clearly and consistently across campuses.
            </p>
            <h2 className="fb-h2" style={{ marginTop: 34 }}>Some context</h2>
            <p className="fb-text">
              FigBuild brought together students from multiple schools under one shared event identity. Because each
              campus had different channels and posting styles, event communication quality varied. The opportunity was
              to create assets and content patterns that felt unified while still being practical for local organizers.
            </p>
          </section>

          <section id="problem" className="fb-section">
            <p className="fb-label">Problem</p>
            <h2 className="fb-h2">Event messaging and posts were fragmented</h2>
            <p className="fb-text">
              As the event scaled across universities, communication became inconsistent in structure, tone, and visual
              hierarchy. Important details like dates, registration flow, and what to expect were not always clear or
              prioritized in the same way.
            </p>
            <p className="fb-callout">
              The challenge was balancing consistency at scale with flexibility for each campus context.
            </p>
          </section>

          <section id="solution" className="fb-section">
            <p className="fb-label">Solution</p>
            <h2 className="fb-h2">Built a modular content system for multi-campus execution</h2>
            <p className="fb-text">
              Miggie designed the modular visual building blocks (the reusable cube-like components), and then I worked
              with three other designers to assemble and refine final campaign assets using those blocks.
            </p>
            <p className="fb-text">
              My focus was content design, message hierarchy, and clarity so each post could stay consistent across
              universities while still being easy for each campus to adapt and publish quickly.
            </p>
            <div className="fb-process">
              <h3 className="fb-process-title">Execution</h3>
              <p className="fb-process-text">
                Miggie set the core design blocks. I then partnered with three designers to compose final assets,
                refine hierarchy, and prep production-ready files that teams could publish with minimal edits.
              </p>
            </div>
            <div className="fb-alert">
              <span className="fb-alert-icon">✦</span>
              <div>
                <p className="fb-alert-title">Awh, this case study is in progress.</p>
                <p className="fb-alert-text">Full details are coming soon.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
