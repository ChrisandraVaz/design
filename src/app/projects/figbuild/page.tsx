"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const sections = ["overview", "problem", "solution"] as const;
type SectionId = (typeof sections)[number];
const demoTabs = [
  {
    id: "foundation",
    label: "System Foundation",
    title: "01 System foundation",
    description: "Figma Design Advocate defined the modular building blocks and baseline rules to keep outputs consistent.",
  },
  {
    id: "adaptation",
    label: "Local Adaptation",
    title: "02 Local adaptation",
    description: "Adjust copy and hierarchy for each campus while preserving the core structure.",
  },
  {
    id: "variant",
    label: "Variant Strategy",
    title: "03 Variant strategy",
    description: "Generate reusable post variants for event types, updates, and announcements.",
  },
  {
    id: "handoff",
    label: "Production Handoff",
    title: "04 Production handoff",
    description: "Package final assets with guidance so teams can publish quickly across channels with predictable quality.",
  },
] as const;
type DemoId = (typeof demoTabs)[number]["id"];

export default function FigBuildCaseStudyPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [activeDemo, setActiveDemo] = useState<DemoId>("handoff");
  const activeDemoData = demoTabs.find((tab) => tab.id === activeDemo) ?? demoTabs[3];

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
    <div className="min-h-screen bg-[#0b0f14] text-[#e8edf4]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
        .fb-wrap {
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0b0f14;
          color: #e8edf4;
        }
        .fb-top-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          border-bottom: 1px solid #1e2733;
          background: #0b0f14;
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
          color: #a3b0c1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
        }
        .fb-back:hover { color: #d7e0ec; }
        .fb-pills {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #161d27;
          border: 1px solid #263142;
          border-radius: 999px;
          padding: 4px;
        }
        .fb-pill {
          border: none;
          background: transparent;
          color: #9aa8bb;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 999px;
          cursor: pointer;
        }
        .fb-pill:hover { color: #d7e0ec; }
        .fb-pill.active {
          background: #232e3c;
          color: #eef3fb;
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
          color: #7f8ea3;
          margin-bottom: 16px;
        }
        .fb-title {
          font-size: 48px;
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f4f7fb;
          margin: 0 0 48px;
        }
        .fb-hero {
          width: 100%;
          background: #111923;
          border: 1px solid #222d3a;
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
          color: #7f8ea3;
          margin: 0 0 8px;
        }
        .fb-info p {
          font-size: 14px;
          line-height: 1.7;
          color: #dbe3ef;
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
          color: #7f8ea3;
          margin: 0 0 16px;
        }
        .fb-h2 {
          font-size: 28px;
          line-height: 1.35;
          letter-spacing: -0.015em;
          color: #f1f5fb;
          margin: 0 0 24px;
          font-weight: 600;
        }
        .fb-text {
          font-size: 16px;
          line-height: 1.75;
          color: #aebacf;
          margin: 0 0 16px;
          max-width: 720px;
        }
        .fb-callout {
          border-left: 3px solid #d61f96;
          padding-left: 18px;
          margin: 28px 0 0;
          color: #dbe4f2;
          font-style: italic;
          font-size: 20px;
          line-height: 1.55;
        }
        .fb-alert {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-top: 24px;
          border: 1px solid #2b3544;
          background: #111923;
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
          color: #f3f6fb;
        }
        .fb-alert-text {
          margin: 0;
          font-size: 15px;
          line-height: 1.7;
          color: #b1bdd0;
        }
        .fb-list {
          margin: 12px 0 0;
          padding-left: 18px;
          color: #aebacf;
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
          color: #c3ccd9;
          font-size: 16px;
          line-height: 1.7;
        }
        .fb-demo {
          margin-top: 14px;
          border: 1px solid #222a33;
          border-radius: 14px;
          background: #0f141a;
          overflow: hidden;
        }
        .fb-demo-tabs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
          border-bottom: 1px solid #202833;
          background: #10161d;
        }
        .fb-demo-tab {
          border: 0;
          border-right: 1px solid #202833;
          background: #151b23;
          color: #8f9aae;
          font-size: 15px;
          font-weight: 500;
          line-height: 1;
          padding: 16px 12px;
          text-align: left;
          cursor: pointer;
        }
        .fb-demo-tab:last-child { border-right: 0; }
        .fb-demo-tab:hover { color: #cad4e4; }
        .fb-demo-tab.active {
          background: #ff3ea8;
          color: #111318;
          font-weight: 600;
        }
        .fb-demo-body {
          padding: 24px 22px 22px;
          background: #121820;
        }
        .fb-demo-title {
          margin: 0 0 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 32px;
          line-height: 1.04;
          letter-spacing: -0.01em;
          color: #ff4db6;
        }
        .fb-demo-desc {
          margin: 0 0 18px;
          font-size: 18px;
          line-height: 1.5;
          color: #bdc8d8;
        }
        .fb-process-preview {
          border-radius: 12px;
          border: 1px solid #2a3442;
          overflow: hidden;
          background: #0d1218;
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
          .fb-demo-tabs { grid-template-columns: 1fr 1fr; }
          .fb-demo-tab {
            font-size: 13px;
            padding: 13px 10px;
          }
          .fb-demo-body {
            padding: 18px 14px 14px;
          }
          .fb-demo-title { font-size: 24px; }
          .fb-demo-desc { font-size: 15px; }
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
              <div className="fb-demo">
                <div className="fb-demo-tabs">
                  {demoTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`fb-demo-tab ${activeDemo === tab.id ? "active" : ""}`}
                      onClick={() => setActiveDemo(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="fb-demo-body">
                  <h4 className="fb-demo-title">{activeDemoData.title}</h4>
                  <p className="fb-demo-desc">{activeDemoData.description}</p>
                  <div className="fb-process-preview">
                    <Image
                      src="/assets/figbuild.png"
                      alt="FigBuild campaign asset set"
                      width={1800}
                      height={1100}
                      unoptimized
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>
                </div>
              </div>
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
