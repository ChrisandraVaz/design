'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

const IBM_ALL_SECTIONS = ['overview', 'responsibilities', 'highlights', 'closing'];

const IBM_TOP_NAV_MAP: Record<string, string> = {
  overview: 'overview',
  responsibilities: 'overview',
  highlights: 'highlights',
  closing: 'closing',
};

export default function IBMAccelerateCaseStudy() {
  const { theme } = useTheme();
  const [activeTopNav, setActiveTopNav] = useState('overview');
  const [activeTreeSection, setActiveTreeSection] = useState('overview');
  const [treeVisible, setTreeVisible] = useState(false);

  const updateActiveLinks = useCallback(() => {
    let current = 'overview';
    IBM_ALL_SECTIONS.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = sectionId;
        }
      }
    });

    setActiveTreeSection(current);
    setActiveTopNav(IBM_TOP_NAV_MAP[current] || current);
    setTreeVisible(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveLinks);
    const frame = requestAnimationFrame(updateActiveLinks);
    return () => {
      window.removeEventListener('scroll', updateActiveLinks);
      cancelAnimationFrame(frame);
    };
  }, [updateActiveLinks]);

  const scrollToSection = (targetId: string) => {
    if (targetId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden" data-theme={theme}>
      <style jsx global>{`
        [data-theme="dark"] {
          --ibm-bg: #000000;
          --ibm-card-bg: #171717;
          --ibm-card-hover: #0F0F0F;
          --ibm-card-border: #262626;
          --ibm-text-primary: #f4f6f8;
          --ibm-text-secondary: #8e98a8;
          --ibm-border-subtle: #262626;
          --ibm-nav-bg: #000000;
          --ibm-nav-pills-bg: #171717;
          --ibm-nav-pill-active-bg: #262626;
        }
        [data-theme="dark"] .ibm-highlight-icon,
        [data-theme="dark"] .ibm-locked-icon {
          background: rgba(255,255,255,0.06);
          color: #4da6e8;
        }
        [data-theme="dark"] .ibm-tag {
          background: rgba(255,255,255,0.06);
          color: #8e98a8;
        }
        [data-theme="dark"] .ibm-tag:hover {
          background: rgba(255,255,255,0.10);
        }
        [data-theme="light"] {
          --ibm-bg: #fff;
          --ibm-card-bg: #fff;
          --ibm-card-hover: #fafafa;
          --ibm-card-border: #e5e5e5;
          --ibm-text-primary: #111;
          --ibm-text-secondary: #666;
          --ibm-border-subtle: #f0f0f0;
          --ibm-nav-bg: #fff;
          --ibm-nav-pills-bg: #f5f5f7;
          --ibm-nav-pill-active-bg: #fff;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Instrument+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }

        .ibm-container { display: flex; flex-direction: column; min-height: 100vh; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; overflow-x: hidden; max-width: 100vw; background: var(--ibm-bg); color: var(--ibm-text-primary); }

        /* Top Navigation - Pill Style */
        .ibm-top-nav { position: fixed; top: 0; left: 0; right: 0; height: 64px; background: var(--ibm-nav-bg); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 0 32px; border-bottom: 1px solid var(--ibm-border-subtle); }
        .ibm-back-link { position: absolute; left: 32px; display: flex; align-items: center; gap: 8px; color: var(--ibm-text-primary); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .ibm-back-link:hover { color: var(--ibm-text-secondary); }
        .ibm-nav-pills { display: flex; align-items: center; gap: 4px; background: var(--ibm-nav-pills-bg); padding: 4px; border-radius: 100px; }
        .ibm-nav-pills a { color: var(--ibm-text-secondary); text-decoration: none; font-size: 14px; font-weight: 500; padding: 8px 16px; border-radius: 100px; transition: all 0.2s; cursor: pointer; }
        .ibm-nav-pills a:hover { color: var(--ibm-text-primary); }
        .ibm-nav-pills a.active { color: var(--ibm-text-primary); background: var(--ibm-nav-pill-active-bg); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

        /* Left Tree Navigation */
        .ibm-tree-nav { position: fixed; left: 32px; top: 50%; transform: translateY(-50%); opacity: 0; transition: opacity 0.3s ease; z-index: 50; font-family: 'IBM Plex Mono', monospace; }
        .ibm-tree-nav.visible { opacity: 1; }
        .ibm-tree-section { position: relative; margin-bottom: 4px; }
        .ibm-tree-section-link { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--ibm-text-secondary); text-decoration: none; padding: 4px 0; transition: color 0.2s; cursor: pointer; background: none; border: none; font-family: 'IBM Plex Mono', monospace; }
        .ibm-tree-section-link:hover { color: var(--ibm-text-secondary); }
        .ibm-tree-section.active > .ibm-tree-section-link { color: var(--ibm-text-primary); }

        /* Main Content */
        .ibm-main-content { margin-top: 64px; padding: 48px 32px; max-width: none; width: 100%; display: flex; flex-direction: column; align-items: center; }
        .ibm-main-content > * { width: 100%; max-width: 880px; }

        .ibm-project-meta { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: var(--ibm-text-secondary); text-transform: uppercase; margin-bottom: 16px; }
        .ibm-project-title { font-family: 'Instrument Sans', 'Inter', -apple-system, sans-serif; font-size: 48px; font-weight: 600; line-height: 1.08; color: var(--ibm-text-primary); margin-bottom: 16px; letter-spacing: -0.03em; }
        .ibm-project-subtitle { font-size: 16px; color: var(--ibm-text-secondary); line-height: 1.75; margin-bottom: 48px; max-width: 720px; }

        .ibm-hero-image { width: 100%; background: #0052ff; border-radius: 4px; padding: 0; margin-bottom: 48px; display: block; height: 420px; overflow: hidden; position: relative; }
        .ibm-hero-image img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 50%; display: block; }

        .ibm-tags { display: flex; gap: 8px; margin-bottom: 48px; flex-wrap: wrap; }
        .ibm-tag { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: #0C8CE9; background: #E8F4FD; padding: 6px 14px; border-radius: 100px; }

        .ibm-project-info { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-bottom: 48px; }
        .ibm-info-item h4 { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--ibm-text-secondary); margin-bottom: 8px; }
        .ibm-info-item p { font-size: 14px; color: var(--ibm-text-primary); line-height: 1.7; font-weight: 450; }

        .ibm-section { margin-bottom: 48px; }
        .ibm-section-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--ibm-text-secondary); margin-bottom: 16px; }
        .ibm-section-title { font-family: 'Instrument Sans', 'Inter', -apple-system, sans-serif; font-size: 28px; font-weight: 600; line-height: 1.35; color: var(--ibm-text-primary); margin-bottom: 24px; letter-spacing: -0.015em; }
        .ibm-section-text { font-size: 16px; color: var(--ibm-text-secondary); line-height: 1.75; max-width: 720px; margin-bottom: 16px; }
        .ibm-section-text:last-child { margin-bottom: 0; }
        .ibm-subsection-header { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 600; color: var(--ibm-text-primary); margin-top: 48px; margin-bottom: 16px; letter-spacing: -0.01em; }

        /* Quote */
        .ibm-key-insight { border-left: 3px solid #0C8CE9; padding-left: 24px; margin: 48px 0; }
        .ibm-key-insight p { font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; font-style: italic; color: var(--ibm-text-primary); line-height: 1.5; font-weight: 400; }
        .ibm-key-insight .ibm-quote-author { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-style: normal; font-weight: 600; color: var(--ibm-text-secondary); letter-spacing: 0.5px; margin-top: 12px; display: block; }

        /* Locked card */
        .ibm-locked-card { display: flex; gap: 16px; padding: 24px; background: var(--ibm-card-bg); border: 1px solid var(--ibm-card-border); border-radius: 4px; margin: 32px 0; transition: border-color 0.2s; align-items: center; }
        .ibm-locked-card:hover { border-color: var(--ibm-text-secondary); }
        .ibm-locked-icon { width: 44px; height: 44px; background: #E8F4FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0C8CE9; flex-shrink: 0; }
        .ibm-locked-content p { font-size: 14px; color: var(--ibm-text-secondary); line-height: 1.65; margin: 0; }
        .ibm-locked-content a { color: #0C8CE9; text-decoration: none; font-weight: 500; }
        .ibm-locked-content a:hover { text-decoration: underline; }

        /* Highlight cards */
        .ibm-highlight-item { display: flex; gap: 16px; padding: 24px; margin-bottom: 16px; background: var(--ibm-card-bg); border: 1px solid var(--ibm-card-border); border-radius: 4px; transition: border-color 0.2s; }
        .ibm-highlight-item:hover { border-color: var(--ibm-text-secondary); }
        .ibm-highlight-item:last-child { margin-bottom: 0; }
        .ibm-highlight-icon { width: 44px; height: 44px; background: #E8F4FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0C8CE9; flex-shrink: 0; }
        .ibm-highlight-content h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: var(--ibm-text-primary); margin-bottom: 4px; }
        .ibm-highlight-content p { font-size: 14px; color: var(--ibm-text-secondary); line-height: 1.65; }

        /* Footer */
        .ibm-footer { margin-top: 40px; padding: 0; display: flex; justify-content: space-between; align-items: center; }
        .ibm-footer-credit { font-size: 12px; color: var(--ibm-text-secondary); }
        .ibm-footer-links { display: flex; gap: 24px; }
        .ibm-footer-links a { font-size: 12px; color: var(--ibm-text-secondary); text-decoration: none; transition: color 0.2s; }
        .ibm-footer-links a:hover { color: var(--ibm-text-primary); }

        @media (max-width: 1200px) {
          .ibm-tree-nav { display: none; }
        }
        @media (max-width: 1024px) {
          .ibm-top-nav { padding: 0 16px; }
          .ibm-back-link { display: none; }
          .ibm-main-content { padding: 48px 16px; }
          .ibm-project-title { font-size: 40px; }
          .ibm-project-info { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .ibm-top-nav { justify-content: center; }
          .ibm-nav-pills {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .ibm-nav-pills::-webkit-scrollbar { display: none; }
        }
        @media (max-width: 600px) {
          .ibm-project-info { grid-template-columns: 1fr; }
          .ibm-project-title { font-size: 32px; }
          .ibm-section-title { font-size: 28px; }
          .ibm-main-content { padding: 40px 16px; }
          .ibm-main-content > * { max-width: 100%; }
          .ibm-hero-image { height: 240px; }
        }
      `}</style>

      <div className="ibm-container">
        {/* Top Pill Navigation */}
        <nav className="ibm-top-nav">
          <Link href="/" className="ibm-back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          <div className="ibm-nav-pills">
            <a className={activeTopNav === 'overview' ? 'active' : ''} onClick={() => scrollToSection('overview')}>Overview</a>
            <a className={activeTopNav === 'highlights' ? 'active' : ''} onClick={() => scrollToSection('highlights')}>Highlights</a>
            <a className={activeTopNav === 'closing' ? 'active' : ''} onClick={() => scrollToSection('closing')}>Closing</a>
          </div>
        </nav>

        {/* Left Tree Navigation */}
        <nav className={`ibm-tree-nav ${treeVisible ? 'visible' : ''}`}>
          <div className={`ibm-tree-section ${activeTreeSection === 'overview' ? 'active' : ''}`}>
            <button className="ibm-tree-section-link" onClick={() => scrollToSection('overview')}>Overview</button>
          </div>
          <div className={`ibm-tree-section ${activeTreeSection === 'responsibilities' ? 'active' : ''}`}>
            <button className="ibm-tree-section-link" onClick={() => scrollToSection('responsibilities')}>Responsibilities</button>
          </div>
          <div className={`ibm-tree-section ${activeTreeSection === 'highlights' ? 'active' : ''}`}>
            <button className="ibm-tree-section-link" onClick={() => scrollToSection('highlights')}>Highlights</button>
          </div>
          <div className={`ibm-tree-section ${activeTreeSection === 'closing' ? 'active' : ''}`}>
            <button className="ibm-tree-section-link" onClick={() => scrollToSection('closing')}>Closing</button>
          </div>
        </nav>

        <main className="ibm-main-content">
          <p className="ibm-project-meta">Case Study</p>
          <h1 className="ibm-project-title">IBM Accelerate</h1>

          <div className="ibm-hero-image">
            <Image
              src="/assets/ibm.gif"
              alt="IBM Accelerate preview"
              width={1200}
              height={800}
              unoptimized
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%", display: "block" }}
            />
          </div>

          <div className="ibm-project-info">
            <div className="ibm-info-item">
              <h4>Role</h4>
              <p>Design Fellow</p>
            </div>
            <div className="ibm-info-item">
              <h4>Timeline</h4>
              <p>8 weeks<br/>(Summer 2023)</p>
            </div>
            <div className="ibm-info-item">
              <h4>Team</h4>
              <p>1 Chief Architect<br/>&amp; 2 Product Designers</p>
            </div>
            <div className="ibm-info-item">
              <h4>Tools</h4>
              <p>Figma<br/>Carbon Design System</p>
            </div>
          </div>

          <div className="ibm-key-insight">
            <p>&ldquo;Good Design is Good Business&rdquo;</p>
            <span className="ibm-quote-author">Thomas John Watson - Chairman and CEO of IBM</span>
          </div>

          {/* Locked Card */}
          <div className="ibm-locked-card">
            <div className="ibm-locked-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <div className="ibm-locked-content">
              <p>My projects at IBM are currently <strong>in development</strong>. If you&apos;d like to know more about my fellowship experience or the project I worked on, <a href="https://calendly.com/chrisandravaz12/30min" target="_blank" rel="noopener noreferrer">feel free to schedule a call with me!</a></p>
            </div>
          </div>

          {/* ============ OVERVIEW ============ */}
          <section id="overview" className="ibm-section">
            <p className="ibm-section-label">Overview</p>
            <h2 className="ibm-section-title">Top 5% of over 10,000 applicants</h2>
            <p className="ibm-section-text">
              During the summer of 2023 I placed in the top 5% of over 10,000 applicants to participate in an 8-week design training and mentorship program - IBM Accelerate - that covered design on an intermediate scale from industry professionals with over 10+ years of experience and mentors.
            </p>
            <p className="ibm-section-text">
              While being on a study term that summer I could not do an internship and so I wanted to brush up my skills and this program ended up being the perfect opportunity.
            </p>

            <h3 className="ibm-subsection-header">My Role</h3>
            <p className="ibm-section-text">
              Product Designer - ManageIQ project (IBM Open Source Community) &amp; IBM Accelerate Fellow
            </p>
          </section>

          {/* ============ RESPONSIBILITIES ============ */}
          <section id="responsibilities" className="ibm-section">
            <p className="ibm-section-label">Responsibilities</p>
            <h2 className="ibm-section-title">Design challenges, weekly meetings, and open-source contribution</h2>
            <p className="ibm-section-text">
              From starting the program to the very end, everyone was so kind - especially the IBM employees running the program. They pushed for all fellows&apos; personal growth. My responsibilities for the program were attending weekly meetings hosted by professionals at IBM on a specific topic on design, completing design challenges and tasks, and at the end presenting a term-end design report to managers and directors including learnings with IBM Design principles, design methodologies, accessibility guidelines, wireframing, prototyping and more.
            </p>
            <p className="ibm-section-text">
              While my responsibilities with the ManageIQ team were to help facilitate weekly design scrum meetings, document any UX bugs, find ways to improve the current system&apos;s outdated design, and address any bugs.
            </p>
          </section>

          {/* ============ HIGHLIGHTS ============ */}
          <section id="highlights" className="ibm-section">
            <p className="ibm-section-label">Highlights</p>
            <h2 className="ibm-section-title">Key learnings from the program</h2>

            <div>
              <div className="ibm-highlight-item">
                <div className="ibm-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                </div>
                <div className="ibm-highlight-content">
                  <h4>Designing for Enterprise Scale</h4>
                  <p>Working on the ManageIQ open-source project taught me how to design for large-scale, complex systems. The focus was on building user-friendly solutions that could scale seamlessly across diverse user needs in an enterprise environment.</p>
                </div>
              </div>

              <div className="ibm-highlight-item">
                <div className="ibm-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="ibm-highlight-content">
                  <h4>Collaboration with IT / Chief Architect Professionals</h4>
                  <p>This program gave me my first chance to work closely with a Chief Architect, rather than just developers and PMs. This shift helped me understand how architecture impacts design decisions, and how to align design with long-term technical strategies.</p>
                </div>
              </div>

              <div className="ibm-highlight-item">
                <div className="ibm-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div className="ibm-highlight-content">
                  <h4>Leveraging the IBM Design System</h4>
                  <p>I quickly learned to leverage the IBM Design System, integrating its pre-designed components to ensure consistency while customizing them for specific project needs. This experience reinforced the importance of systemized design in creating cohesive user experiences.</p>
                </div>
              </div>

              <div className="ibm-highlight-item">
                <div className="ibm-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <div className="ibm-highlight-content">
                  <h4>Navigating Outdated Systems</h4>
                  <p>One of the biggest challenges I faced was working with outdated systems. Integrating modern design principles into legacy platforms required creative problem-solving and an understanding of technical debt. I learned the importance of balancing the need for innovation with the constraints of existing systems, ensuring that designs were both feasible and forward-thinking.</p>
                </div>
              </div>

              <div className="ibm-highlight-item">
                <div className="ibm-highlight-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className="ibm-highlight-content">
                  <h4>Leveraging Your Resources</h4>
                  <p>Putting yourself out there and staying curious is so important. That&apos;s how I learned about the program in the first place. It also led me to volunteering for the IBM open-source community which turned out to be an invaluable experience.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ CLOSING ============ */}
          <section id="closing" className="ibm-section" style={{ marginBottom: 0 }}>
            <p className="ibm-section-label">Overall</p>
            <h2 className="ibm-section-title">A wonderful summer experience</h2>
            <p className="ibm-section-text">
              This summer was an incredible learning journey, where I had the privilege of working alongside industry professionals, particularly a UX expert with over 10 years of experience at IBM. Their guidance and insights were invaluable in shaping my understanding of user experience design. IBM, a pioneer in human-computer interaction, design, and technology, provided me with a unique opportunity to deepen my knowledge in a company that has played a significant role in shaping the design landscape. It was truly inspiring to learn from both the leaders and the history that has made IBM a key player in the design and tech world.
            </p>
          </section>

          {/* Footer */}
          <footer className="ibm-footer">
            <p className="ibm-footer-credit">Crafted by Chrisandra Vaz</p>
            <div className="ibm-footer-links">
              <a href="https://ca.linkedin.com/in/chrisandra-vaz" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:chrisandravaz12@gmail.com">Email</a>
              <a href="https://github.com/ChrisandraVaz" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
