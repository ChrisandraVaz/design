'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function IBMAccelerateCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [treeVisible, setTreeVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTreeVisible(scrollY > 300);

      const sectionIds = ["overview", "solution", "outcome", "takeaways"];
      let current = "overview";
      const viewportOffset = 200;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportOffset && rect.bottom >= viewportOffset) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
  };

  return (
    <div className="container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        :root {
          --text-primary: #111;
          --text-secondary: #666;
          --text-tertiary: #999;
          --bg-primary: #fff;
          --bg-tertiary: #f5f5f7;
          --border-light: #e5e5e5;
          --border-subtle: #f0f0f0;

          --font-hero: 48px;
          --font-section: 28px;
          --font-subsection: 20px;
          --font-body: 16px;
          --font-small: 14px;
          --font-micro: 11px;

          --space-xs: 4px;
          --space-sm: 8px;
          --space-md: 16px;
          --space-lg: 24px;
          --space-xl: 32px;
          --space-2xl: 48px;
          --space-3xl: 64px;

          --radius-sm: 8px;
          --radius-md: 12px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg-primary);
          color: #333;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .container { display: flex; flex-direction: column; min-height: 100vh; }

        .top-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: var(--bg-primary);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 var(--space-xl);
          border-bottom: 1px solid var(--border-subtle);
        }

        .back-link {
          position: absolute;
          left: var(--space-xl);
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          color: var(--text-primary);
          text-decoration: none;
          font-size: var(--font-small);
          font-weight: 500;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--text-secondary); }
        .back-link:focus-visible {
          outline: 2px solid var(--text-secondary);
          outline-offset: 2px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          background: var(--bg-tertiary);
          padding: 4px;
          border-radius: 999px;
        }
        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: var(--font-small);
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 999px;
          transition: all 0.2s;
        }
        .nav-links a:hover { color: var(--text-primary); }
        .nav-links a:focus-visible {
          outline: 2px solid var(--text-secondary);
          outline-offset: 2px;
        }

        .main-content {
          margin-top: 64px;
          margin-left: 240px;
          padding: 48px 80px;
          max-width: none;
          width: calc(100% - 240px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .main-content > * { width: 100%; max-width: 900px; }

        .tree-nav {
          position: fixed;
          left: 32px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 50;
          font-family: 'IBM Plex Mono', monospace;
        }
        .tree-nav.visible { opacity: 1; }
        .tree-section {
          position: relative;
          margin-bottom: 4px;
        }
        .tree-section-link {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-tertiary);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s;
          cursor: pointer;
        }
        .tree-section-link:hover { color: var(--text-secondary); }
        .tree-section-link:focus-visible {
          outline: 2px solid var(--text-tertiary);
          outline-offset: 2px;
        }
        .tree-section.active > .tree-section-link { color: var(--text-primary); }

        .project-meta {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          margin-bottom: var(--space-md);
        }
        .project-title {
          font-size: var(--font-hero);
          font-weight: 600;
          line-height: 1.08;
          color: var(--text-primary);
          margin-bottom: var(--space-2xl);
          letter-spacing: -0.03em;
        }

        .hero-image {
          width: 100%;
          height: 420px;
          overflow: hidden;
          border-radius: 4px;
          background: #0052ff;
          margin-bottom: var(--space-2xl);
        }
        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .project-info {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-xl);
          margin-bottom: var(--space-2xl);
        }
        .info-item h4 {
          font-family: 'IBM Plex Mono', monospace;
          font-size: var(--font-micro);
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: var(--space-sm);
        }
        .info-item p {
          font-size: var(--font-small);
          color: var(--text-primary);
          line-height: 1.7;
          font-weight: 450;
        }

        section { margin-bottom: var(--space-2xl); }
        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: var(--font-micro);
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: var(--space-md);
        }
        .section-title {
          font-size: var(--font-section);
          font-weight: 600;
          line-height: 1.35;
          color: var(--text-primary);
          margin-bottom: var(--space-lg);
          letter-spacing: -0.015em;
        }
        .section-text {
          font-size: var(--font-body);
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 720px;
          margin-bottom: var(--space-md);
        }
        .section-text:last-child { margin-bottom: 0; }

        .footer {
          margin-top: var(--space-lg);
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-subtle);
          padding-top: var(--space-xl);
        }
        .footer-credit {
          font-size: var(--font-caption, 12px);
          color: var(--text-tertiary);
        }
        .footer-links {
          display: flex;
          gap: var(--space-lg);
        }
        .footer-links a {
          font-size: var(--font-caption, 12px);
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--text-primary); }

        @media (max-width: 1200px) {
          .tree-nav { display: none; }
          .main-content {
            margin-left: 0;
            width: 100%;
          }
        }
        @media (max-width: 1024px) {
          .main-content { padding: 40px 32px; }
          .project-title { font-size: 40px; }
          .project-info { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .nav-links { display: none; }
          .project-title { font-size: 32px; }
          .project-info { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav className="top-nav">
        <Link href="/" className="back-link">
          <FaArrowLeft size={12} />
          Back
        </Link>
        <div className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#solution">Solution</a>
          <a href="#outcome">Outcome</a>
          <a href="#takeaways">Takeaways</a>
        </div>
      </nav>

      <div className={`tree-nav ${treeVisible ? "visible" : ""}`}>
        <div className={`tree-section ${activeSection === "overview" ? "active" : ""}`}>
          <button type="button" className="tree-section-link" onClick={() => scrollToSection("overview")}>
            Overview
          </button>
        </div>
        <div className={`tree-section ${activeSection === "solution" ? "active" : ""}`}>
          <button type="button" className="tree-section-link" onClick={() => scrollToSection("solution")}>
            Solution
          </button>
        </div>
        <div className={`tree-section ${activeSection === "outcome" ? "active" : ""}`}>
          <button type="button" className="tree-section-link" onClick={() => scrollToSection("outcome")}>
            Outcome
          </button>
        </div>
        <div className={`tree-section ${activeSection === "takeaways" ? "active" : ""}`}>
          <button type="button" className="tree-section-link" onClick={() => scrollToSection("takeaways")}>
            Takeaways
          </button>
        </div>
      </div>

      <main className="main-content">
        <p className="project-meta">IBM Accelerate</p>
        <h1 className="project-title">ManageIQ System Revamp</h1>

        <div className="hero-image">
          <Image
            src="/assets/ibm.gif"
            alt="ManageIQ System Revamp preview"
            width={1200}
            height={800}
            unoptimized
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div className="project-info">
          <div className="info-item">
            <h4>Role</h4>
            <p>Design Fellow</p>
          </div>
          <div className="info-item">
            <h4>Timeline</h4>
            <p>2023</p>
          </div>
          <div className="info-item">
            <h4>Team</h4>
            <p>IBM Accelerate</p>
          </div>
          <div className="info-item">
            <h4>Tools</h4>
            <p>Figma<br />Carbon Design System</p>
          </div>
        </div>

        <section id="overview">
          <p className="section-label">Overview</p>
          <h2 className="section-title">Modernizing a cloud management UI without breaking power workflows.</h2>
          <p className="section-text">
            As a Design Fellow in IBM&apos;s Accelerate program, I worked on redesigning the ManageIQ cloud management platform interface. The goal was to improve usability and modernize the experience while staying consistent with IBM&apos;s Carbon Design System.
          </p>
        </section>

        <section id="solution">
          <p className="section-label">Solution</p>
          <h2 className="section-title">Carbon-first patterns, clearer hierarchy, and less cognitive load.</h2>
          <p className="section-text">
            I redesigned key workflows and screens using Carbon components, with progressive disclosure to reduce information overload. The result is a more cohesive, scannable interface that supports both quick checks and deep management tasks.
          </p>
        </section>

        <section id="outcome">
          <p className="section-label">Outcome</p>
          <h2 className="section-title">A UI that feels modern, consistent, and easier to navigate.</h2>
          <p className="section-text">
            The revamp focused on clarity: tighter layout rhythm, more predictable interaction patterns, and a hierarchy that makes complex pages feel less intimidating.
          </p>
        </section>

        <section id="takeaways" style={{ marginBottom: 0 }}>
          <p className="section-label">Takeaways</p>
          <h2 className="section-title">Design systems are leverage—when you use them intentionally.</h2>
          <p className="section-text">
            Carbon gave us speed and consistency, but the real work was deciding what to show by default, what to hide until needed, and how to make power features feel approachable.
          </p>
        </section>

        <footer className="footer">
          <p className="footer-credit">Crafted by Chrisandra Vaz</p>
          <div className="footer-links">
            <a href="https://ca.linkedin.com/in/chrisandra-vaz" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:chrisandravaz12@gmail.com">
              Email
            </a>
            <a href="https://github.com/ChrisandraVaz" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
