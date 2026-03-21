'use client';

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const TD_TOP_NAV_MAP: Record<string, string> = {
  overview: 'overview',
  context: 'overview',
  problem: 'problem',
  discovery: 'solution',
  audit: 'solution',
  legacy: 'solution',
  define: 'solution',
  research: 'solution',
  variables: 'solution',
  prototype: 'solution',
  components: 'solution',
  documentation: 'solution',
  testing: 'solution',
  uat: 'solution',
  workshops: 'solution',
  outcome: 'takeaways',
  adoption: 'takeaways',
  future: 'takeaways',
  takeaways: 'takeaways',
};

const TD_ALL_SECTIONS = [
  'overview', 'context', 'problem', 'discovery', 'audit', 'legacy',
  'define', 'research', 'variables', 'prototype', 'components', 'documentation',
  'testing', 'uat', 'workshops', 'outcome', 'adoption', 'future', 'takeaways'
];

export default function TDDesignSystemCaseStudy() {
  const [activeTopNav, setActiveTopNav] = useState('overview');
  const [activeTreeSection, setActiveTreeSection] = useState('overview');
  const [treeVisible, setTreeVisible] = useState(false);

  const parentMap: Record<string, string> = {
    'audit': 'discovery',
    'legacy': 'discovery',
    'research': 'define',
    'variables': 'define',
    'components': 'prototype',
    'documentation': 'prototype',
    'uat': 'testing',
    'workshops': 'testing',
    'adoption': 'outcome',
    'future': 'outcome',
  };

  const updateActiveLinks = useCallback(() => {
    let current = 'overview';
    TD_ALL_SECTIONS.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = sectionId;
        }
      }
    });

    setActiveTreeSection(current);
    setActiveTopNav(TD_TOP_NAV_MAP[current] || current);
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

  const isTreeSectionActive = (sectionId: string) => {
    return activeTreeSection === sectionId || parentMap[activeTreeSection] === sectionId;
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700&family=IBM+Plex+Mono:wght@500;600&family=Instrument+Sans:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; }

        .td-container { display: flex; flex-direction: column; min-height: 100vh; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; overflow-x: hidden; max-width: 100vw; }

        /* Top Navigation - Pill Style */
        .td-top-nav { position: fixed; top: 0; left: 0; right: 0; height: 64px; background: #fff; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 0 32px; border-bottom: 1px solid #f0f0f0; }
        .td-back-link { position: absolute; left: 32px; display: flex; align-items: center; gap: 8px; color: #111; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .td-back-link:hover { color: #666; }
        .td-nav-pills { display: flex; align-items: center; gap: 4px; background: #f5f5f7; padding: 4px; border-radius: 100px; }
        .td-nav-pills a { color: #666; text-decoration: none; font-size: 14px; font-weight: 500; padding: 8px 16px; border-radius: 100px; transition: all 0.2s; cursor: pointer; }
        .td-nav-pills a:hover { color: #111; }
        .td-nav-pills a.active { color: #111; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }

        /* Left Tree Navigation */
        .td-tree-nav { position: fixed; left: 32px; top: 50%; transform: translateY(-50%); opacity: 0; transition: opacity 0.3s ease; z-index: 50; font-family: 'IBM Plex Mono', monospace; }
        .td-tree-nav.visible { opacity: 1; }

        .td-tree-section { position: relative; margin-bottom: 4px; }
        .td-tree-section-link { display: block; font-size: 10px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: #999; text-decoration: none; padding: 4px 0; transition: color 0.2s; cursor: pointer; }
        .td-tree-section-link:hover { color: #666; }
        .td-tree-section.active > .td-tree-section-link { color: #111; }

        .td-tree-subsections { margin-left: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease; opacity: 0; }
        .td-tree-section.active .td-tree-subsections,
        .td-tree-section:hover .td-tree-subsections { max-height: 200px; opacity: 1; }

        .td-tree-subsection { position: relative; display: flex; align-items: center; }
        .td-tree-connector { display: flex; flex-direction: column; align-items: flex-start; margin-right: 8px; }
        .td-tree-connector-horizontal { display: flex; align-items: center; }
        .td-tree-connector-corner { width: 8px; height: 12px; border-left: 1px solid #999; border-bottom: 1px solid #999; border-radius: 0 0 0 3px; }
        .td-tree-subsection-link { font-size: 9px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: #999; text-decoration: none; padding: 2px 0; transition: color 0.2s; cursor: pointer; white-space: nowrap; }
        .td-tree-subsection-link:hover { color: #666; }
        .td-tree-subsection.active .td-tree-subsection-link { color: #111; }

        /* Main Content */
        .td-main-content { margin-top: 64px; padding: 48px 32px; max-width: none; width: 100%; display: flex; flex-direction: column; align-items: center; }
        .td-main-content > * { width: 100%; max-width: 900px; }

        .td-project-meta { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: #999; text-transform: uppercase; margin-bottom: 16px; }
        .td-project-title { font-family: 'Instrument Sans', 'Inter', -apple-system, sans-serif; font-size: 48px; font-weight: 600; line-height: 1.08; color: #111; margin-bottom: 48px; letter-spacing: -0.03em; }
        .td-hero-image { width: 100%; background: #1a3a2f; border-radius: 0; padding: 0; margin-bottom: 48px; display: block; height: 420px; overflow: hidden; position: relative; }
        .td-hero-image img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
        .td-project-info { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-bottom: 48px; }
        .td-info-item h4 { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #999; margin-bottom: 8px; }
        .td-info-item p { font-size: 14px; color: #111; line-height: 1.7; font-weight: 450; }
        .td-section { margin-bottom: 48px; }
        .td-section-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #999; margin-bottom: 16px; }
        .td-section-title { font-family: 'Instrument Sans', 'Inter', -apple-system, sans-serif; font-size: 28px; font-weight: 600; line-height: 1.35; color: #111; margin-bottom: 24px; letter-spacing: -0.015em; }
        .td-section-text { font-size: 16px; color: #666; line-height: 1.75; max-width: 720px; margin-bottom: 16px; }
        .td-section-text:last-child { margin-bottom: 0; }
        .td-subsection-header { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 600; color: #111; margin-top: 48px; margin-bottom: 16px; letter-spacing: -0.01em; }
        .td-key-insight { border-left: 3px solid #0C8CE9; padding-left: 24px; margin: 48px 0; }
        .td-key-insight p { font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; font-style: italic; color: #111; line-height: 1.5; font-weight: 400; }
        .td-user-quote-blue { margin: 32px 0; padding: 0 0 0 24px; border-left: 3px solid #0C8CE9; }
        .td-user-quote-blue p { font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; font-style: italic; color: #111; line-height: 1.5; margin: 0; }

        /* Disclaimer banner */
        .td-disclaimer { display: flex; gap: 16px; padding: 24px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; margin-bottom: 48px; align-items: center; transition: border-color 0.2s; }
        .td-disclaimer:hover { border-color: #0C8CE9; }
        .td-disclaimer-icon-wrap { width: 44px; height: 44px; background: #E8F4FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .td-disclaimer-icon-wrap svg { width: 20px; height: 20px; color: #0C8CE9; }
        .td-disclaimer p { font-size: 14px; color: #666; line-height: 1.65; margin: 0; }

        /* Locked project card */
        .td-locked-card { display: flex; gap: 16px; padding: 24px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; margin: 32px 0; transition: border-color 0.2s; }
        .td-locked-card:hover { border-color: #0C8CE9; }
        .td-locked-icon { width: 44px; height: 44px; background: #f5f5f7; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; flex-shrink: 0; }
        .td-locked-content p { font-size: 14px; color: #666; line-height: 1.65; margin: 0; }
        .td-locked-content a { color: #0C8CE9; text-decoration: none; font-weight: 500; }
        .td-locked-content a:hover { text-decoration: underline; }

        /* Image container / placeholder */
        .td-image-container { background: #f5f5f7; border-radius: 8px; padding: 32px; margin: 48px 0; border: 1px solid #e5e5e5; transition: border-color 0.2s ease; }
        .td-image-container:hover { border-color: #0C8CE9; }
        .td-image-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: #999; margin-bottom: 16px; }
        .td-image-placeholder { background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #bbb; font-size: 13px; font-weight: 500; text-align: center; padding: 20px; min-height: 260px; border: 1px dashed #ddd; }

        .td-approach-steps { display: flex; flex-direction: column; gap: 0; margin: 40px 0; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
        .td-approach-step { display: flex; gap: 20px; padding: 28px 28px; border-bottom: 1px solid #e5e5e5; transition: background-color 0.15s; }
        .td-approach-step:last-child { border-bottom: none; }
        .td-approach-step:hover { background-color: #fafafa; }
        .td-approach-number { width: 36px; height: 36px; background: #E8F4FD; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0C8CE9; font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 600; flex-shrink: 0; }
        .td-approach-content h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; font-weight: 600; color: #111; margin-bottom: 6px; }
        .td-approach-content p { font-size: 14px; color: #666; line-height: 1.7; margin: 0; }
        .td-stats-grid-simple { display: flex; flex-direction: column; gap: 16px; margin: 32px 0; }
        .td-stat-card-simple { display: flex; align-items: center; gap: 16px; padding: 24px 32px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; transition: border-color 0.2s; }
        .td-stat-card-simple:hover { border-color: #0C8CE9; }
        .td-stat-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: #E8F4FD; border-radius: 8px; color: #0C8CE9; flex-shrink: 0; }
        .td-stat-title { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; font-weight: 600; color: #111; margin: 0 0 4px 0; }
        .td-stat-desc { font-size: 14px; color: #999; margin: 0; }
        .td-comparison-container { background: #f5f5f7; border-radius: 8px; padding: 32px; margin: 48px 0; border: 1px solid #e5e5e5; }
        .td-comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .td-comparison-item { background: #fff; border-radius: 8px; padding: 24px; border: 1px solid #e5e5e5; transition: border-color 0.2s; }
        .td-comparison-item:hover { border-color: #0C8CE9; }
        .td-comparison-item h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: #111; margin-bottom: 8px; }
        .td-comparison-item p { font-size: 14px; color: #666; line-height: 1.65; }

        /* Version timeline */
        .td-version-timeline { margin: 40px 0; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
        .td-version-row { display: flex; gap: 20px; padding: 24px 28px; border-bottom: 1px solid #e5e5e5; transition: background-color 0.15s; align-items: flex-start; }
        .td-version-row:last-child { border-bottom: none; }
        .td-version-row:hover { background-color: #fafafa; }
        .td-version-row.active-version { background: #E8F4FD; }
        .td-version-badge { padding: 4px 12px; border-radius: 100px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; flex-shrink: 0; white-space: nowrap; }
        .td-version-badge.v1 { background: #f0f0f0; color: #999; }
        .td-version-badge.v2 { background: #f0f0f0; color: #999; }
        .td-version-badge.v3 { background: #0C8CE9; color: #fff; }
        .td-version-info h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 15px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .td-version-info p { font-size: 14px; color: #666; line-height: 1.65; margin: 0; }
        .td-version-info .td-version-status { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 6px; }
        .td-version-info .td-version-status.current { color: #0C8CE9; }

        /* Wins grid */
        .td-wins-grid { display: flex; flex-direction: column; gap: 0; margin: 40px 0; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; }
        .td-win-item { display: flex; gap: 16px; padding: 20px 28px; border-bottom: 1px solid #e5e5e5; transition: background-color 0.15s; align-items: center; }
        .td-win-item:last-child { border-bottom: none; }
        .td-win-item:hover { background-color: #fafafa; }
        .td-win-check { width: 28px; height: 28px; background: #E8F4FD; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0C8CE9; flex-shrink: 0; }
        .td-win-text { font-size: 15px; color: #111; font-weight: 500; }

        .td-design-decisions { margin: 48px 0; }
        .td-decision-item { display: flex; gap: 16px; padding: 24px; margin-bottom: 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; transition: border-color 0.2s; }
        .td-decision-item:hover { border-color: #0C8CE9; }
        .td-decision-item:last-child { margin-bottom: 0; }
        .td-decision-icon { width: 44px; height: 44px; background: #E8F4FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0C8CE9; flex-shrink: 0; }
        .td-decision-content h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .td-decision-content p { font-size: 14px; color: #666; line-height: 1.65; }
        .td-two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; }
        .td-column h3 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; font-weight: 600; color: #111; margin-bottom: 8px; }
        .td-column p { font-size: 14px; color: #666; line-height: 1.7; }
        .td-footer { margin-top: 40px; padding: 0; display: flex; justify-content: space-between; align-items: center; }
        .td-footer-credit { font-size: 12px; color: #999; }
        .td-footer-links { display: flex; gap: 24px; }
        .td-footer-links a { font-size: 12px; color: #666; text-decoration: none; transition: color 0.2s; }
        .td-footer-links a:hover { color: #0C8CE9; }

        /* Coming Soon Sections */
        .td-section.coming-soon .td-section-label,
        .td-section.coming-soon .td-section-title,
        .td-section.coming-soon .td-section-subtitle { opacity: 0.7; }
        .td-section.coming-soon .td-coming-soon-content { display: none; }
        .td-coming-soon-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
        .td-coming-soon-badge { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; color: #999; border: 1px solid #e5e5e5; border-radius: 100px; padding: 4px 12px; white-space: nowrap; align-self: center; flex-shrink: 0; }

        @media (max-width: 1200px) {
          .td-tree-nav { display: none; }
        }
        @media (max-width: 1024px) {
          .td-top-nav { padding: 0 16px; }
          .td-back-link { display: none; }
          .td-main-content { padding: 48px 16px; }
          .td-project-title { font-size: 40px; }
          .td-project-info { grid-template-columns: repeat(2, 1fr); }
          .td-two-column, .td-comparison-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 640px) {
          .td-top-nav { justify-content: center; }
          .td-nav-pills {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .td-nav-pills::-webkit-scrollbar { display: none; }
        }
        @media (max-width: 600px) {
          .td-project-info { grid-template-columns: 1fr; }
          .td-project-title { font-size: 32px; }
          .td-section-title { font-size: 28px; }
          .td-main-content { padding: 40px 16px; }
          .td-main-content > * { max-width: 100%; }
          .td-two-column { grid-template-columns: 1fr; gap: 24px; }
          .td-hero-image { height: 240px; }
        }
      `}</style>

      <div className="td-container">
        {/* Top Pill Navigation */}
        <nav className="td-top-nav">
          <Link href="/" className="td-back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
        </Link>
          <div className="td-nav-pills">
            <a className={activeTopNav === 'overview' ? 'active' : ''} onClick={() => scrollToSection('overview')}>Overview</a>
            <a className={activeTopNav === 'problem' ? 'active' : ''} onClick={() => scrollToSection('problem')}>Problem</a>
            <a className={activeTopNav === 'solution' ? 'active' : ''} onClick={() => scrollToSection('discovery')}>Solution</a>
            <a className={activeTopNav === 'takeaways' ? 'active' : ''} onClick={() => scrollToSection('takeaways')}>Takeaways</a>
          </div>
        </nav>

        {/* Left Tree Navigation */}
        <nav className={`td-tree-nav ${treeVisible ? 'visible' : ''}`}>
          <div className={`td-tree-section ${isTreeSectionActive('overview') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('overview')}>Overview</a>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('context') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('context')}>Context</a>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('problem') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('problem')}>The Problem</a>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('discovery') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('discovery')}>Discovery</a>
            <div className="td-tree-subsections">
              <div className={`td-tree-subsection ${activeTreeSection === 'audit' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('audit')}>Audit</a>
              </div>
              <div className={`td-tree-subsection ${activeTreeSection === 'legacy' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('legacy')}>Legacy</a>
              </div>
            </div>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('define') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('define')}>Define</a>
            <div className="td-tree-subsections">
              <div className={`td-tree-subsection ${activeTreeSection === 'research' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('research')}>Research</a>
              </div>
              <div className={`td-tree-subsection ${activeTreeSection === 'variables' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('variables')}>Variables</a>
              </div>
            </div>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('prototype') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('prototype')}>Prototype</a>
            <div className="td-tree-subsections">
              <div className={`td-tree-subsection ${activeTreeSection === 'components' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('components')}>Components</a>
              </div>
              <div className={`td-tree-subsection ${activeTreeSection === 'documentation' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('documentation')}>Docs</a>
              </div>
            </div>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('testing') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('testing')}>Testing</a>
            <div className="td-tree-subsections">
              <div className={`td-tree-subsection ${activeTreeSection === 'uat' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('uat')}>UAT</a>
              </div>
              <div className={`td-tree-subsection ${activeTreeSection === 'workshops' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('workshops')}>Workshops</a>
              </div>
            </div>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('outcome') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('outcome')}>Outcome</a>
            <div className="td-tree-subsections">
              <div className={`td-tree-subsection ${activeTreeSection === 'adoption' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('adoption')}>Adoption</a>
              </div>
              <div className={`td-tree-subsection ${activeTreeSection === 'future' ? 'active' : ''}`}>
                <div className="td-tree-connector"><div className="td-tree-connector-horizontal"><div className="td-tree-connector-corner"></div></div></div>
                <a className="td-tree-subsection-link" onClick={() => scrollToSection('future')}>Future</a>
              </div>
            </div>
          </div>
          <div className={`td-tree-section ${isTreeSectionActive('takeaways') ? 'active' : ''}`}>
            <a className="td-tree-section-link" onClick={() => scrollToSection('takeaways')}>Takeaways</a>
        </div>
      </nav>

        <main className="td-main-content">
          <p className="td-project-meta">Case Study</p>
          <h1 className="td-project-title">TD Bank (Securities) Design System</h1>

          <div className="td-hero-image">
          <Image
            src="/assets/tds.png"
            alt="TD Design System preview"
            width={1200}
            height={800}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
          />
        </div>

          {/* Disclaimer */}
          <div className="td-disclaimer">
            <div className="td-disclaimer-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            </div>
            <p>This case study is from my 2023 internship at TD Securities. Since then, Figma has introduced significant updates to design system tokens and much more at schema. The approaches documented here reflect the tools and patterns available at that time.</p>
          </div>

          <div className="td-project-info">
            <div className="td-info-item">
            <h4>Role</h4>
            <p>Product Design Intern</p>
          </div>
            <div className="td-info-item">
              <h4>Team</h4>
              <p>VP of Design &amp; Eng,<br/>Product Engineer,<br/>Business Systems Analyst</p>
            </div>
            <div className="td-info-item">
            <h4>Timeline</h4>
              <p>4 months<br/>(Summer 2023)</p>
            </div>
            <div className="td-info-item">
              <h4>Tools</h4>
              <p>Figma<br/>Figma Variables<br/>Excel (UAT)</p>
            </div>
          </div>

          {/* ============ OVERVIEW ============ */}
          <section id="overview" className="td-section">
            <p className="td-section-label">Overview</p>
            <h2 className="td-section-title">Building and scaling a design system from the ground up</h2>
            <p className="td-section-text">
              When I joined TD Securities as the only design intern, I inherited a fragmented design ecosystem -assets out of sync with code, dozens of undocumented variants, and no single source of truth. My job was to build Version 3 of the design system: simple, scalable, and understandable by both designers and developers.
            </p>
            <p className="td-section-text">
              What started as a component cleanup evolved into a full-scale system that was later adopted by multiple teams across TD Securities infrastructure and technology -including teams in New York and across Canada.
            </p>

            <div className="td-stats-grid-simple">
              <div className="td-stat-card-simple">
                <div className="td-stat-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                </div>
                <div>
                  <p className="td-stat-title">100+ Components Audited</p>
                  <p className="td-stat-desc">Consolidated from fragmented Figma files across multiple teams</p>
                </div>
              </div>
              <div className="td-stat-card-simple">
                <div className="td-stat-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <p className="td-stat-title">8+ Teams Onboarded</p>
                  <p className="td-stat-desc">Adoption across TD Securities infrastructure &amp; technology</p>
                </div>
              </div>
              <div className="td-stat-card-simple">
                <div className="td-stat-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="td-stat-title">Version 3  - Built on Figma Variables</p>
                  <p className="td-stat-desc">First version to leverage Figma&apos;s 2023 variables launch, replacing variant-only architecture</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ CONTEXT ============ */}
          <section id="context" className="td-section">
            <p className="td-section-label">Context</p>
            <h2 className="td-section-title">First design intern on a fast-paced innovation team</h2>
            <p className="td-section-text">
              As the first design intern joining TD Securities, I had huge responsibilities placed on my shoulders. I was essentially my own senior. I got to call the shots on design decisions, but that also meant inheriting every problem that came with the existing system.
            </p>
            <p className="td-section-text">
              Seeing the lack of parity between designs and the actual code, it was clear that a concrete design system was overdue. There was no single source of truth, scrappy foundations around color, typography, and interactions, and little documentation for onboarding new contributors.
            </p>

            <div className="td-key-insight">
              <p>Designers couldn&apos;t find the right components to use, and engineers didn&apos;t know which implementations matched the intended designs.</p>
            </div>

            <div className="td-locked-card">
              <div className="td-locked-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div className="td-locked-content">
                <p>My projects at TD are currently <strong>locked</strong>. If you&apos;d like to know more about my internship experience or the projects I worked on, <a href="https://calendly.com/chrisandravaz12/30min" target="_blank" rel="noopener noreferrer">feel free to schedule a call!</a></p>
              </div>
            </div>
          </section>

          {/* ============ THE PROBLEM ============ */}
          <section id="problem" className="td-section">
            <p className="td-section-label">The Problem</p>
            <h2 className="td-section-title">Too many variants, no single source of truth</h2>
            <p className="td-section-text">
              Many of the pains I encountered designing for TD Securities&apos; platform came from the inconsistency between my designs and the live application. Could it be that the developers were working with different assets? To validate my suspicions, I did a quick site audit.
            </p>
            <p className="td-section-text">
              I discovered that not only were the assets widely different -there were so many variants of buttons, badges, and other components scattered across files with no centralized documentation or review process.
            </p>

            <div className="td-image-container">
              <Image
                src="/assets/siteaduit.png"
                alt="Site audit screenshot showing inconsistent components across the application"
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
              />
            </div>

            <div className="td-comparison-container">
              <p className="td-section-label" style={{ marginBottom: 16 }}>Core Challenges</p>
              <div className="td-comparison-grid">
                <div className="td-comparison-item">
                  <h4>Variant Sprawl</h4>
                  <p>100+ mismatched components and edge-case variants with no centralized documentation or review process.</p>
                </div>
                <div className="td-comparison-item">
                  <h4>Design-Code Mismatch</h4>
                  <p>Figma assets out of sync with deployed code, creating constant friction during handoffs.</p>
                </div>
                <div className="td-comparison-item">
                  <h4>Siloed Teams</h4>
                  <p>Product, engineering, and design worked without standardized terminology or shared protocols.</p>
                </div>
                <div className="td-comparison-item">
                  <h4>Onboarding Gaps</h4>
                  <p>No starter kits or best practices documentation, making it nearly impossible for new team members to contribute consistently.</p>
                </div>
              </div>
            </div>

            <blockquote className="td-user-quote-blue">
              <p>How can I create a design system that is simple, scalable, and understandable by designers and developers?</p>
            </blockquote>
          </section>

          {/* ============ DISCOVERY ============ */}
          <section id="discovery" className="td-section coming-soon">
            <div className="td-coming-soon-header">
              <div>
                <p className="td-section-label">Discovery</p>
                <h2 className="td-section-title">Understanding what already existed  - and why it failed</h2>
              </div>
              <span className="td-coming-soon-badge">Coming Soon</span>
            </div>

            <div className="td-coming-soon-content">
            <h3 id="audit" className="td-subsection-header">Full-Scale Component Audit</h3>
            <p className="td-section-text">
              My first step was cataloguing every component and variant across Figma files. I mapped each to its coded counterpart (or lack thereof) to build a complete picture of the system&apos;s fragmentation. The audit revealed the full extent of the problem: duplicated components, inconsistent naming, and variants that existed for edge cases no one could explain.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">Component Audit Spreadsheet</p>
              <div className="td-image-placeholder" style={{ height: '280px' }}>
                [Component audit showing catalogued components, variants, and their coded counterparts]
              </div>
            </div>

            <h3 id="legacy" className="td-subsection-header">The Legacy: V1 and V2</h3>
            <p className="td-section-text">
              This wasn&apos;t the first attempt at a design system at TD Securities. Before I arrived, there had been two previous versions. V1 and V2 were built by a senior design lead, but progress stalled when he left the team. His work had many layers to it -complex nested structures that were difficult for others to pick up and maintain.
            </p>
            <p className="td-section-text">
              Both V1 and V2 relied entirely on Figma variants. At the time, that was the only option. But the files had become unwieldy -hundreds of variant combinations that were hard to navigate and even harder to keep in sync with code.
            </p>

            <div className="td-version-timeline">
              <div className="td-version-row">
                <span className="td-version-badge v1">V1</span>
                <div className="td-version-info">
                  <h4>Initial Foundation</h4>
                  <p>First attempt at component standardization. Built with Figma variants only. Established basic color and typography tokens but lacked governance.</p>
                  <p className="td-version-status">Archived  - Senior lead departed</p>
                </div>
              </div>
              <div className="td-version-row">
                <span className="td-version-badge v2">V2</span>
                <div className="td-version-info">
                  <h4>Expanded Coverage</h4>
                  <p>Added more component coverage and nested structures. Still variant-only architecture. Files became complex with many layers, making handoff difficult.</p>
                  <p className="td-version-status">Stalled  - Too complex to maintain without original author</p>
                </div>
              </div>
              <div className="td-version-row active-version">
                <span className="td-version-badge v3">V3</span>
                <div className="td-version-info">
                  <h4>Variables-First Rebuild</h4>
                  <p>Complete rebuild leveraging Figma&apos;s newly launched variables (2023). Simplified architecture, added governance, documentation, and cross-functional validation.</p>
                  <p className="td-version-status current">Active  - Adopted across 8+ teams</p>
                </div>
              </div>
            </div>

            <div className="td-key-insight">
              <p>I went back to the drawing board. V3 wouldn&apos;t just be another layer on top -it would be a clean rebuild with the new tools Figma had just given us.</p>
          </div>
            </div>
          </section>

          {/* ============ DEFINE & IDEATION ============ */}
          <section id="define" className="td-section coming-soon">
            <div className="td-coming-soon-header">
              <div>
                <p className="td-section-label">Define &amp; Ideation</p>
                <h2 className="td-section-title">How can I make this helpful for designers and developers?</h2>
              </div>
              <span className="td-coming-soon-badge">Coming Soon</span>
            </div>

            <div className="td-coming-soon-content">
            <h3 id="research" className="td-subsection-header">Learning from the Best</h3>
            <p className="td-section-text">
              I didn&apos;t start with the ability to create design systems. When I began, I had no idea how to organize all the components. Luckily, great companies like Shopify, Apple, and Google have public design systems I could learn from. However, these systems were massive and served more as inspiration than a direct guide.
            </p>
            <p className="td-section-text">
              What really helped me level up was incorporating Atomic Design principles -breaking everything down into atoms, molecules, organisms, templates, and pages. This gave me a mental model for how to structure the entire system.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">Research &amp; Reference Systems</p>
              <div className="td-image-placeholder" style={{ height: '280px' }}>
                [Research references: screenshots of Shopify Polaris, Apple HIG, Google Material Design alongside atomic design diagram]
          </div>
        </div>

            <h3 id="variables" className="td-subsection-header">The Variables Advantage</h3>
            <p className="td-section-text">
              V3 coincided with Figma&apos;s 2023 launch of variables. This was a game-changer. The V1 and V2 files had relied entirely on variants to handle theming, states, and responsive behavior. Variables gave us a proper token layer -color tokens, spacing scales, typography tokens -that could be swapped and themed without touching individual components.
            </p>
            <p className="td-section-text">
              Looking back at the original problem -how to create a system that is simple, scalable, and understandable by both designers and developers -I realized that the needs of the developers were going to be just as important. I got a front-end developer to collaborate with me on the design system. Together, we included tokens, CSS classes, and code snippets directly in the Figma file. This was a quick way for both of us to learn how the other thinks and communicates.
            </p>

            <div className="td-two-column">
              <div className="td-column">
                <h3>For Designers</h3>
                <p>Variables replaced variant overload. A single button component with variable-driven states instead of 30+ variant combinations. Clear naming conventions tied to design tokens.</p>
              </div>
              <div className="td-column">
                <h3>For Developers</h3>
                <p>Design tokens mapped directly to CSS variables. Code snippets embedded in Figma annotations. A shared language that eliminated guesswork during handoff.</p>
              </div>
            </div>
            </div>
        </section>

          {/* ============ PROTOTYPE ============ */}
          <section id="prototype" className="td-section coming-soon">
            <div className="td-coming-soon-header">
              <div>
                <p className="td-section-label">Prototype</p>
                <h2 className="td-section-title">Keeping it simple yet scalable</h2>
              </div>
              <span className="td-coming-soon-badge">Coming Soon</span>
            </div>

            <div className="td-coming-soon-content">
            <p className="td-section-text">
              Although I was the only designer, I knew the system would eventually house more designers. It needed to expand and be used by multiple people without breaking. What helped me keep elements scalable was sticking to atomic design principles, using nested components, and leveraging component properties to simplify variants.
            </p>

            <h3 id="components" className="td-subsection-header">Streamlining the Component Library</h3>
            <p className="td-section-text">
              I audited and streamlined over 100 components using atomic design principles, organizing everything from foundational elements like color, typography, and spacing to complex UI patterns including alerts, modals, badges, breadcrumbs, navigation, and steppers.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">Component Library Overview</p>
              <div className="td-image-placeholder" style={{ height: '340px' }}>
                [Figma component library: organized page showing atoms (colors, typography, icons), molecules (buttons, inputs, badges), organisms (modals, nav bars, steppers)]
              </div>
            </div>

            <p className="td-section-text">
              It&apos;s still an ongoing learning experience to identify which components will be needed for reuse and which elements are specific for edge cases. The key was building with flexibility in mind while maintaining strict governance on what gets added to the core library.
            </p>

            <h3 id="documentation" className="td-subsection-header">Documentation That Developers Can Use</h3>
            <p className="td-section-text">
              For each component, I created comprehensive documentation with design tokens, code snippets, and usage patterns. The documentation lived directly alongside the components in Figma, making it impossible to use a component without seeing how it should be implemented.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">Component Documentation</p>
              <div className="td-image-placeholder" style={{ height: '300px' }}>
                [Documentation page showing a button component with: design tokens, CSS class names, code snippets, do/don&apos;t usage examples, and state variations]
              </div>
            </div>

            <div className="td-key-insight">
              <p>One library, one language. Every token, variant, and usage pattern documented in a single source of truth.</p>
            </div>
            </div>
        </section>

          {/* ============ TESTING ============ */}
          <section id="testing" className="td-section coming-soon">
            <div className="td-coming-soon-header">
              <div>
                <p className="td-section-label">Testing</p>
                <h2 className="td-section-title">But did it actually work?</h2>
              </div>
              <span className="td-coming-soon-badge">Coming Soon</span>
            </div>

            <div className="td-coming-soon-content">
            <p className="td-section-text">
              The design system was constantly being iterated on. With new components being implemented, I needed to verify: had it actually improved the overall product? My dev team gave me insights into what was working and what wasn&apos;t.
            </p>

            <h3 id="uat" className="td-subsection-header">UAT Testing Framework</h3>
            <p className="td-section-text">
              Partnering with engineering, I built an Excel-based UAT audit that tracked every component against documented success and failure criteria. This wasn&apos;t a typical QA pass -it was a systematic validation of design-code parity, ensuring that what designers specified in Figma matched exactly what engineers shipped.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">UAT Testing Matrix</p>
              <div className="td-image-placeholder" style={{ height: '260px' }}>
                [Excel-based UAT audit showing component names, success criteria, failure criteria, pass/fail status, and notes columns]
              </div>
            </div>

            <h3 id="workshops" className="td-subsection-header">Executive Workshops &amp; Starter Kits</h3>
            <p className="td-section-text">
              To secure executive buy-in and gather continuous feedback, I hosted showcase workshops for VPs of Engineering and Design. These weren&apos;t just presentations -they were hands-on sessions where leadership could see the system in action, ask questions, and understand the value it brought to their teams.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">Workshop Session</p>
              <div className="td-image-placeholder" style={{ height: '300px' }}>
                [Workshop photo: presenting the design system to stakeholders, showing component library and documentation on screen]
              </div>
            </div>

            <p className="td-section-text">
              I also created a Design System Starter Kit with guided onboarding materials and best practices, then distributed it across 8+ product teams to accelerate adoption.
            </p>

            <div className="td-wins-grid">
              <div className="td-win-item">
                <div className="td-win-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="td-win-text">Less time spent on coding new components</span>
              </div>
              <div className="td-win-item">
                <div className="td-win-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="td-win-text">Handoff became more efficient  - less explanation needed</span>
              </div>
              <div className="td-win-item">
                <div className="td-win-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="td-win-text">Less back and forth during QA reviews</span>
              </div>
              <div className="td-win-item">
                <div className="td-win-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="td-win-text">Coded designs became significantly more consistent</span>
              </div>
            </div>
            </div>
        </section>

          {/* ============ OUTCOME ============ */}
          <section id="outcome" className="td-section">
            <p className="td-section-label">The Outcome</p>
            <h2 className="td-section-title">From one intern&apos;s initiative to cross-border adoption</h2>

            <h3 id="adoption" className="td-subsection-header">Scaling Beyond the Original Team</h3>
            <p className="td-section-text">
              What started as a V3 rebuild during my internship didn&apos;t stop when I left. The system was adopted by multiple teams across TD Securities infrastructure and technology. Teams in New York and across Canada began using it as their foundation for building internal tools and applications.
            </p>
            <p className="td-section-text">
              The governance processes, documentation standards, and starter kits I established gave the system legs to grow without me. New designers could onboard in days instead of weeks, and developers had a reliable reference for every component they needed to build.
            </p>

            <div className="td-image-container">
              <p className="td-image-label">System Adoption</p>
              <Image
                src="/assets/systemadpotion.png"
                alt="Adoption map showing teams across TD Securities that adopted the design system"
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto', borderRadius: '8px', display: 'block' }}
              />
            </div>

            <blockquote className="td-user-quote-blue">
              <p>These efforts reduced developer QA cycles, eliminated design-code mismatches, and established the single source of truth teams needed to build confidently.</p>
            </blockquote>

            <h3 id="future" className="td-subsection-header">Looking Towards the Future</h3>
            <p className="td-section-text">
              As the design system grows, the hope is to create more standardized assets that can be reused across frameworks. Breaking down components and documenting how they behave within the context of the developers&apos; frameworks (like Bootstrap) would be the next evolution.
            </p>
            <p className="td-section-text">
              As the design team grows bigger, collecting feedback from a designer&apos;s perspective on how the system improves their workflow and onboarding will be critical. And on the flip side, understanding how the system can better serve developers -what&apos;s the best way to document components, display guides, and provide usage instructions.
            </p>

            <div className="td-approach-steps">
              <div className="td-approach-step">
                <div className="td-approach-number">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </div>
                <div className="td-approach-content">
                  <h4>Framework-Specific Documentation</h4>
                  <p>Document component behavior within the context of frameworks developers actually use (Bootstrap, React, etc.).</p>
                </div>
              </div>
              <div className="td-approach-step">
                <div className="td-approach-number">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </div>
                <div className="td-approach-content">
                  <h4>Designer Feedback Loop</h4>
                  <p>Collect feedback on how the system improves workflow, onboarding speed, and design consistency for new team members.</p>
                </div>
              </div>
              <div className="td-approach-step">
                <div className="td-approach-number">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                </div>
                <div className="td-approach-content">
                  <h4>Productivity Measurement</h4>
                  <p>Implement surveys on how teams interact with the design system daily, and whether it has measurably increased work speed and productivity.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ============ TAKEAWAYS ============ */}
          <section id="takeaways" className="td-section" style={{ marginBottom: 0 }}>
            <p className="td-section-label">Key Takeaways</p>
            <h2 className="td-section-title">What I took away</h2>
            <div className="td-design-decisions">
              <div className="td-decision-item">
                <div className="td-decision-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div className="td-decision-content">
                  <h4>Governance and documentation are what make systems scale</h4>
                  <p>Building components is the easy part. Creating the governance processes, naming conventions, and documentation that let others contribute without breaking things -that&apos;s what separates a component library from a design system.</p>
                </div>
              </div>
              <div className="td-decision-item">
                <div className="td-decision-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="td-decision-content">
                  <h4>Cross-functional collaboration unlocks real impact</h4>
                  <p>By working closely with engineering from day one -embedding code snippets in Figma, building UAT frameworks together, and speaking in shared tokens -the system became something both sides actually wanted to use.</p>
                </div>
              </div>
              <div className="td-decision-item">
                <div className="td-decision-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <div className="td-decision-content">
                  <h4>Workshops and starter kits drive adoption faster than documentation alone</h4>
                  <p>Hosting executive workshops, building easy-to-use starter kits, and giving teams hands-on time with the system accelerated buy-in far more than any documentation page could. People adopt what they understand, and understanding comes from doing.</p>
                </div>
              </div>
            </div>
        </section>

          <footer className="td-footer">
            <p className="td-footer-credit">Crafted by Chrisandra Vaz</p>
            <div className="td-footer-links">
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
