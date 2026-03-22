"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import { useTheme } from "@/hooks/useTheme";

export default function TDBankInterestClaimsCaseStudy() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("overview");
  const [treeVisible, setTreeVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "problem", "solution", "takeaways"];
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (!element) return;
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
        }
      });

      setTreeVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 overflow-x-hidden max-w-[100vw]" data-theme={theme}>
      <style jsx global>{`
        [data-theme="dark"] {
          --td-bg: #000000;
          --td-card-bg: #171717;
          --td-card-hover: #0F0F0F;
          --td-card-border: #262626;
          --td-text-primary: #f4f6f8;
          --td-text-secondary: #8e98a8;
          --td-border-subtle: #262626;
          --td-nav-bg: rgba(0,0,0,0.9);
          --td-nav-pills-bg: #171717;
          --td-nav-pill-active-bg: #262626;
          --td-image-container-bg: #171717;
        }
        [data-theme="light"] {
          --td-bg: #fff;
          --td-card-bg: #fff;
          --td-card-hover: #fafafa;
          --td-card-border: #e5e5e5;
          --td-text-primary: #111;
          --td-text-secondary: #666;
          --td-border-subtle: #f0f0f0;
          --td-nav-bg: rgba(255,255,255,0.9);
          --td-nav-pills-bg: #f5f5f7;
          --td-nav-pill-active-bg: #fff;
          --td-image-container-bg: #f5f5f7;
        }

        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;600&family=Inter:wght@300;400;450;500;600;700&display=swap');

        .td-nav-pills {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--td-nav-pills-bg);
          padding: 4px;
          border-radius: 24px;
        }

        .td-nav-pill {
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--td-text-secondary);
          background: transparent;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .td-nav-pill:hover {
          color: var(--td-text-primary);
          background: rgba(255, 255, 255, 0.5);
        }
        .td-nav-pill:focus-visible {
          outline: 2px solid #2D8A4E;
          outline-offset: 2px;
        }

        .td-nav-pill.active {
          color: var(--td-text-primary);
          background: var(--td-nav-pill-active-bg);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        .td-section { margin-bottom: 64px; }

        .td-section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--td-text-secondary);
          margin-bottom: 16px;
        }

        .td-section-title {
          font-size: 28px;
          font-weight: 600;
          line-height: 1.35;
          color: var(--td-text-primary);
          margin-bottom: 24px;
          letter-spacing: -0.015em;
        }

        .td-section-text {
          font-size: 16px;
          color: var(--td-text-secondary);
          line-height: 1.75;
          max-width: 720px;
          margin-bottom: 16px;
        }

        .td-key-insight {
          border-left: 3px solid #2D8A4E;
          padding-left: 24px;
          margin: 48px 0;
        }

        .td-key-insight p {
          font-size: 20px;
          font-style: italic;
          color: var(--td-text-primary);
          line-height: 1.5;
          font-weight: 400;
        }

        .td-image-container {
          background: var(--td-image-container-bg);
          border-radius: 12px;
          padding: 32px;
          margin: 32px 0;
          border: 1px solid var(--td-card-border);
          transition: border-color 0.2s;
        }

        .td-image-container:hover { border-color: #2D8A4E; }

        .td-image-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--td-text-secondary);
          margin-bottom: 16px;
        }

        .td-locked-card {
          display: flex;
          gap: 16px;
          padding: 24px;
          background: var(--td-card-bg);
          border: 1px solid var(--td-card-border);
          border-radius: 4px;
          margin: 32px 0;
          transition: border-color 0.2s;
          align-items: center;
        }
        .td-locked-card:hover { border-color: #2D8A4E; }
        .td-locked-icon {
          width: 44px;
          height: 44px;
          background: #e8f5e8;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D8A4E;
          flex-shrink: 0;
        }
        .td-locked-content p {
          font-size: 14px;
          color: var(--td-text-secondary);
          line-height: 1.65;
          margin: 0;
        }
        .td-locked-content a {
          color: #2D8A4E;
          text-decoration: none;
          font-weight: 500;
        }
        .td-locked-content a:hover { text-decoration: underline; }

        .td-takeaway-item {
          display: flex;
          gap: 16px;
          padding: 24px;
          margin-bottom: 16px;
          background: var(--td-card-bg);
          border: 1px solid var(--td-card-border);
          border-radius: 4px;
          transition: border-color 0.2s;
        }

        .td-takeaway-item:hover { border-color: #2D8A4E; }
        .td-takeaway-item:last-child { margin-bottom: 0; }

        .td-takeaway-icon {
          width: 44px;
          height: 44px;
          background: #e8f5e8;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D8A4E;
          flex-shrink: 0;
        }

        .td-takeaway-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--td-text-primary);
          margin-bottom: 4px;
        }

        .td-takeaway-content p {
          font-size: 14px;
          color: var(--td-text-secondary);
          line-height: 1.65;
        }

        .td-footer {
          margin-top: 40px;
          padding-top: 40px;
          border-top: 1px solid var(--td-border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .td-footer-credit {
          font-size: 12px;
          color: var(--td-text-secondary);
        }

        .td-footer-links {
          display: flex;
          gap: 24px;
        }

        .td-footer-links a {
          font-size: 12px;
          color: var(--td-text-secondary);
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .td-footer-links a:hover { opacity: 0.7; }
        .td-footer-links a:focus-visible {
          outline: 2px solid #2D8A4E;
          outline-offset: 2px;
        }

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
          color: var(--td-text-secondary);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s;
          cursor: pointer;
        }
        .tree-section-link:hover { color: #666; }
        .tree-section-link:focus-visible {
          outline: 2px solid #999;
          outline-offset: 2px;
        }
        .tree-section.active > .tree-section-link { color: var(--td-text-primary); }

        @media (max-width: 1200px) {
          .tree-nav { display: none; }
        }

        @media (max-width: 768px) {
          .td-nav-pills {
            gap: 2px;
            padding: 3px;
          }
          .td-nav-pill {
            padding: 6px 12px;
            font-size: 12px;
          }
          .td-section-title { font-size: 24px; }
        }

        @media (max-width: 640px) {
          .td-back-link-wrapper { display: none; }
          .td-spacer { display: none; }
          .td-header-inner { justify-content: center !important; }
          .td-nav-pills {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .td-nav-pills::-webkit-scrollbar { display: none; }
        }

        /* Dark mode overrides for Tailwind classes */
        [data-theme="dark"] { background: var(--td-bg) !important; color: var(--td-text-primary) !important; }
        [data-theme="dark"] .text-gray-400 { color: var(--td-text-secondary) !important; }
        [data-theme="dark"] .text-gray-600 { color: var(--td-text-secondary) !important; }
        [data-theme="dark"] .text-black { color: var(--td-text-primary) !important; }
      `}</style>

      {/* Fixed Header with Pill Navigation */}
      <header className="fixed top-0 left-0 right-0 backdrop-blur-md z-50 border-b" style={{ background: 'var(--td-nav-bg)', borderColor: 'var(--td-border-subtle)' }}>
        <div className="td-header-inner max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="td-back-link-wrapper flex items-center gap-2 text-sm hover:opacity-70 transition-opacity">
            <FaArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>

          {/* Pill Navigation */}
          <nav className="td-nav-pills">
            <button
              className={`td-nav-pill ${activeSection === "overview" ? "active" : ""}`}
              onClick={() => scrollToSection("overview")}
            >
              Overview
            </button>
            <button
              className={`td-nav-pill ${activeSection === "problem" ? "active" : ""}`}
              onClick={() => scrollToSection("problem")}
            >
              Problem
            </button>
            <button
              className={`td-nav-pill ${activeSection === "solution" ? "active" : ""}`}
              onClick={() => scrollToSection("solution")}
            >
              Solution
            </button>
            <button
              className={`td-nav-pill ${activeSection === "takeaways" ? "active" : ""}`}
              onClick={() => scrollToSection("takeaways")}
            >
              Takeaways
            </button>
          </nav>

          {/* Spacer for balance */}
          <div className="td-spacer w-[100px]"></div>
        </div>
      </header>

      <div className={`tree-nav ${treeVisible ? "visible" : ""}`}>
        <div className={`tree-section ${activeSection === "overview" ? "active" : ""}`}>
          <button
            type="button"
            className="tree-section-link"
            onClick={() => scrollToSection("overview")}
          >
            Overview
          </button>
        </div>
        <div className={`tree-section ${activeSection === "problem" ? "active" : ""}`}>
          <button
            type="button"
            className="tree-section-link"
            onClick={() => scrollToSection("problem")}
          >
            Problem
          </button>
        </div>
        <div className={`tree-section ${activeSection === "solution" ? "active" : ""}`}>
          <button
            type="button"
            className="tree-section-link"
            onClick={() => scrollToSection("solution")}
          >
            Solution
          </button>
        </div>
        <div className={`tree-section ${activeSection === "takeaways" ? "active" : ""}`}>
          <button
            type="button"
            className="tree-section-link"
            onClick={() => scrollToSection("takeaways")}
          >
            Takeaways
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <p className="font-mono text-[12px] font-semibold tracking-[0.16em] text-gray-400 uppercase mb-4">
            TD Bank (Securities) · Internal Tool
          </p>
          <h1 className="text-[48px] leading-tight font-semibold tracking-[-0.03em] mb-8">
            Interest Claims Manager
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600 mb-12">
            <div>
              <p className="font-medium text-black">Role</p>
              <p>UX Developer</p>
            </div>
            <div>
              <p className="font-medium text-black">Duration</p>
              <p>Summer 2024</p>
            </div>
            <div>
              <p className="font-medium text-black">Tools</p>
              <p>Figma, React</p>
            </div>
            <div>
              <p className="font-medium text-black">Team</p>
              <p>TD Securities Operations</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="rounded-2xl overflow-hidden bg-[#e8f5e8]">
            <Image
              src="/assets/td.png"
              alt="TD Bank Interest Claims Tool"
              width={1200}
              height={800}
              className="w-full h-auto block"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Overview Section */}
          <section id="overview" className="td-section">
            <p className="td-section-label">Overview</p>
            <h2 className="td-section-title">Streamlining interest claims processing for TD Securities operations team</h2>
            <p className="td-section-text">
              Designed and developed an internal tool for TD Securities to streamline the interest claims
              process, reducing manual work and improving accuracy for the operations team.
            </p>

            <div className="td-locked-card">
              <div className="td-locked-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <div className="td-locked-content">
                <p>This project is currently <strong>locked</strong>. To view the full case study and design files, <a href="https://www.figma.com/design/ELwpccTPf9f4mlvkop55RA/TD---Atomic-Summer-2025?node-id=0-1&t=pWAgmDksnmq7jC0T-1" target="_blank" rel="noopener noreferrer">visit the Figma file</a>.</p>
              </div>
            </div>
          </section>

          {/* Problem Section */}
          <section id="problem" className="td-section">
            <p className="td-section-label">The Problem</p>
            <h2 className="td-section-title">Manual workflows leading to errors and inefficiencies</h2>
            <p className="td-section-text">
              The existing interest claims workflow relied heavily on spreadsheets and manual data entry,
              leading to errors and inefficiencies. The operations team needed a more robust solution
              to handle the growing volume of claims.
            </p>

            <div className="td-key-insight">
              <p>The team was spending 40% of their time on manual data entry that could be automated.</p>
            </div>
          </section>

          {/* Solution Section */}
          <section id="solution" className="td-section">
            <p className="td-section-label">The Solution</p>
            <h2 className="td-section-title">A comprehensive claims management interface</h2>
            <p className="td-section-text">
              Built a comprehensive claims management interface with filtering, sorting, and batch processing
              capabilities. The tool integrates with existing systems and provides real-time status updates
              for all claims in progress.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">Claims Dashboard</p>
              <Image
                src="/assets/tdinterestclaims.png"
                alt="Claims Dashboard Interface"
                width={1200}
                height={500}
                unoptimized
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </div>
          </section>

          {/* Takeaways Section */}
          <section id="takeaways" className="td-section" style={{ marginBottom: 0 }}>
            <p className="td-section-label">Takeaways</p>
            <h2 className="td-section-title">What I learned</h2>

            <div>
              <div className="td-takeaway-item">
                <div className="td-takeaway-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="td-takeaway-content">
                  <h4>Enterprise Constraints</h4>
                  <p>Working within TD&apos;s design system and security requirements taught me how to innovate within constraints.</p>
                </div>
              </div>

              <div className="td-takeaway-item">
                <div className="td-takeaway-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="td-takeaway-content">
                  <h4>Stakeholder Management</h4>
                  <p>Balancing needs between operations team, compliance, and development taught me effective cross-functional collaboration.</p>
                </div>
              </div>

              <div className="td-takeaway-item">
                <div className="td-takeaway-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div className="td-takeaway-content">
                  <h4>Measuring Impact</h4>
                  <p>Tracking time saved and error reduction helped quantify the value of design decisions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="td-footer">
            <p className="td-footer-credit">Crafted by Chrisandra Vaz</p>
            <div className="td-footer-links">
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
        </div>
      </main>
    </div>
  );
}
