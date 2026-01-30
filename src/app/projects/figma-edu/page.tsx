"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function FontContextCaseStudy() {
  const [currentPolaroid, setCurrentPolaroid] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const sections = ['validation', 'built-first', 'competitors', 'two-bar', 'who-for', 'modal-song', 'scoping', 'craft', 'didnt-solve'];
    const savedStates: Record<string, boolean> = {};
    sections.forEach(id => {
      const saved = localStorage.getItem(`section-${id}`);
      savedStates[id] = saved === 'true';
    });
    setExpandedSections(savedStates);
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newState = !prev[sectionId];
      localStorage.setItem(`section-${sectionId}`, String(newState));
      return { ...prev, [sectionId]: newState };
    });
  };

  const nextPolaroid = () => {
    setCurrentPolaroid(prev => (prev + 1) % 3);
  };

  const getPolaroidClass = (index: number) => {
    if (index === currentPolaroid) return "active";
    if (index === (currentPolaroid - 1 + 3) % 3) return "prev";
    if (index === (currentPolaroid + 1) % 3) return "next";
    return "";
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        .fc-container { display: flex; min-height: 100vh; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        .fc-sidebar { position: fixed; left: 0; top: 0; width: 240px; height: 100vh; padding: 40px 24px; background: #fff; z-index: 100; border-right: 1px solid #f0f0f0; }
        .fc-back-link { display: flex; align-items: center; gap: 8px; color: #666; text-decoration: none; font-size: 12px; font-weight: 500; letter-spacing: 0.5px; margin-bottom: 48px; transition: color 0.2s; }
        .fc-back-link:hover { color: #111; }
        .fc-back-link:focus-visible {
          outline: 2px solid #999;
          outline-offset: 2px;
        }
        .fc-nav-links { display: flex; flex-direction: column; gap: 4px; }
        .fc-nav-links a { color: #999; text-decoration: none; font-size: 14px; font-weight: 400; padding: 8px 0; transition: color 0.2s; }
        .fc-nav-links a:hover { color: #666; }
        .fc-nav-links a:focus-visible {
          outline: 2px solid #999;
          outline-offset: 2px;
        }
        .fc-main-content { margin-left: 240px; padding: 48px 80px 48px 80px; max-width: none; width: 100%; display: flex; flex-direction: column; align-items: center; }
        .fc-main-content > * { width: 100%; max-width: 900px; }
        .fc-project-meta { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: #999; text-transform: uppercase; margin-bottom: 16px; }
        .fc-project-title { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 48px; font-weight: 600; line-height: 1.08; color: #111; margin-bottom: 48px; letter-spacing: -0.03em; }
        .fc-hero-image { width: 100%; background: transparent; border-radius: 0; padding: 0; margin-bottom: 48px; display: block; height: 420px; overflow: hidden; position: relative; }
        .fc-hero-image video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
        .fc-project-info { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-bottom: 48px; }
        .fc-info-item h4 { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #999; margin-bottom: 8px; }
        .fc-info-item p { font-size: 14px; color: #111; line-height: 1.7; font-weight: 450; }
        .fc-section { margin-bottom: 48px; }
        .fc-section-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #999; margin-bottom: 16px; }
        .fc-section-title { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 28px; font-weight: 600; line-height: 1.35; color: #111; margin-bottom: 24px; letter-spacing: -0.015em; }
        .fc-section-text { font-size: 16px; color: #666; line-height: 1.75; max-width: 720px; margin-bottom: 16px; }
        .fc-section-subtitle { font-size: 14px; color: #999; line-height: 1.6; margin-bottom: 24px; max-width: 720px; }
        .fc-subsection-header { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 600; color: #111; margin-top: 48px; margin-bottom: 16px; letter-spacing: -0.01em; }
        .fc-key-insight { border-left: 3px solid #0C8CE9; padding-left: 24px; margin: 48px 0; }
        .fc-key-insight p { font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; font-style: italic; color: #111; line-height: 1.5; font-weight: 400; }
        .fc-user-quote-blue { margin: 32px 0; padding: 0 0 0 24px; border-left: 3px solid #0C8CE9; }
        .fc-user-quote-blue p { font-family: 'Source Serif 4', Georgia, serif; font-size: 20px; font-style: italic; color: #111; line-height: 1.5; margin: 0; }
        .fc-feature-showcase { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; margin: 48px 0; }
        .fc-feature-showcase.reverse { grid-template-columns: 1fr 1.1fr; }
        .fc-feature-showcase.reverse .fc-feature-image { order: 2; }
        .fc-feature-showcase.reverse .fc-feature-text { order: 1; }
        .fc-feature-image { background: #f5f5f7; border-radius: 12px; padding: 32px; min-height: 280px; display: flex; align-items: center; justify-content: center; border: 1px solid #e5e5e5; }
        .fc-feature-text h3 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 20px; font-weight: 600; color: #111; margin-bottom: 8px; }
        .fc-feature-text p { font-size: 14px; color: #666; line-height: 1.7; }
        .fc-numbered-feature { margin: 48px 0; }
        .fc-numbered-feature h3 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; font-weight: 600; color: #111; margin-bottom: 8px; }
        .fc-numbered-feature p { font-size: 14px; color: #666; line-height: 1.75; max-width: 720px; }
        .fc-pain-section-layout { display: grid; grid-template-columns: 480px 1fr; gap: 64px; margin-top: 24px; align-items: start; }
        .fc-pain-text-content { max-width: 480px; }
        .fc-polaroid-stack { position: relative; width: 300px; height: 360px; cursor: pointer; margin-left: auto; padding-left: 8px; }
        .fc-polaroid { position: absolute; top: 0; left: 0; width: 100%; background: #fff; padding: 16px 16px 40px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.06); border-radius: 2px; opacity: 0; transform: rotate(0deg) scale(0.95); transition: all 0.3s ease; pointer-events: none; }
        .fc-polaroid.active { opacity: 1; transform: rotate(-2deg) scale(1); pointer-events: auto; z-index: 3; }
        .fc-polaroid.prev { opacity: 0.6; transform: rotate(3deg) translateX(12px) scale(0.97); z-index: 2; }
        .fc-polaroid.next { opacity: 0.3; transform: rotate(-4deg) translateX(-10px) scale(0.94); z-index: 1; }
        .fc-polaroid-caption { position: absolute; bottom: 8px; left: 0; right: 0; text-align: center; font-size: 12px; color: #999; }
        .fc-collapsible-section .fc-section-header { cursor: pointer; display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; padding: 8px 0; transition: opacity 0.2s; }
        .fc-collapsible-section .fc-section-header:hover { opacity: 0.7; }
        .fc-chevron { font-size: 24px; font-weight: 600; color: #999; flex-shrink: 0; transition: transform 0.3s; user-select: none; line-height: 1; margin-top: 4px; }
        .fc-research-block { background: #E8F4FD; border-radius: 12px; padding: 32px; margin-bottom: 24px; }
        .fc-research-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin-bottom: 8px; }
        .fc-gap-table { margin-top: 24px; border-radius: 8px; overflow: hidden; background: #fff; }
        .fc-gap-header { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 16px; background: #fff; border-bottom: 1px solid #e5e5e5; }
        .fc-gap-header span { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; color: #999; }
        .fc-gap-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 16px; border-bottom: 1px solid #e5e5e5; }
        .fc-gap-row:last-child { border-bottom: none; }
        .fc-gap-row span:first-child { font-size: 14px; font-weight: 500; color: #111; }
        .fc-gap-row span:last-child { font-size: 14px; color: #666; }
        .fc-stats-grid-simple { display: flex; flex-direction: column; gap: 16px; margin: 32px 0; }
        .fc-stat-card-simple { display: flex; align-items: center; gap: 16px; padding: 24px 32px; background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; }
        .fc-stat-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: #E8F4FD; border-radius: 8px; color: #0C8CE9; flex-shrink: 0; }
        .fc-stat-title { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; font-weight: 600; color: #111; margin: 0 0 4px 0; }
        .fc-stat-desc { font-size: 14px; color: #999; margin: 0; }
        .fc-two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 48px; }
        .fc-column h3 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; font-weight: 600; color: #111; margin-bottom: 8px; }
        .fc-column p { font-size: 14px; color: #666; line-height: 1.7; }
        .fc-image-container { background: #f5f5f7; border-radius: 12px; padding: 32px; margin: 48px 0; border: 1px solid #e5e5e5; transition: border-color 0.2s; }
        .fc-image-container:hover { border-color: #0C8CE9; }
        .fc-image-container.dark { background: #1a1a1a; border-color: #333; }
        .fc-image-label { font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: #999; margin-bottom: 16px; }
        .fc-image-container.dark .fc-image-label { color: #888; }
        .fc-comparison-container { background: #E8F4FD; border-radius: 12px; padding: 32px; margin: 48px 0; border: 1px solid #e5e5e5; }
        .fc-comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .fc-comparison-item { background: #fff; border-radius: 8px; padding: 24px; border: 1px solid #e5e5e5; transition: border-color 0.2s; }
        .fc-comparison-item:hover { border-color: #0C8CE9; }
        .fc-comparison-item h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: #111; margin-bottom: 8px; }
        .fc-comparison-item p { font-size: 14px; color: #666; line-height: 1.65; }
        .fc-design-decisions { margin: 48px 0; }
        .fc-decision-item { display: flex; gap: 16px; padding: 24px; margin-bottom: 16px; background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; transition: border-color 0.2s; }
        .fc-decision-item:hover { border-color: #0C8CE9; }
        .fc-decision-item:last-child { margin-bottom: 0; }
        .fc-decision-icon { width: 44px; height: 44px; background: #E8F4FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0C8CE9; flex-shrink: 0; }
        .fc-decision-content h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .fc-decision-content p { font-size: 14px; color: #666; line-height: 1.65; }
        .fc-roadmap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 48px; margin-top: 24px; position: relative; }
        .fc-roadmap-grid::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px; background-image: linear-gradient(to bottom, #e5e5e5 50%, transparent 50%); background-size: 1px 8px; background-repeat: repeat-y; }
        .fc-roadmap-item { display: flex; gap: 16px; padding: 16px; border-radius: 6px; transition: background-color 0.15s; }
        .fc-roadmap-item:hover { background-color: #fafafa; }
        .fc-roadmap-checkbox { width: 14px; height: 14px; border: 1.5px solid #999; border-radius: 3px; flex-shrink: 0; margin-top: 3px; opacity: 0.6; cursor: pointer; transition: all 0.15s; }
        .fc-roadmap-checkbox:hover { opacity: 1; border-color: #111; }
        .fc-roadmap-content h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 500; color: #111; margin-bottom: 4px; }
        .fc-roadmap-content p { font-size: 12px; color: #999; line-height: 1.5; margin: 0; }
        .fc-story-block { display: flex; gap: 16px; padding: 24px; background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; margin: 40px 0; transition: border-color 0.2s; text-decoration: none; }
        .fc-story-block:hover { border-color: #0C8CE9; }
        .fc-story-icon { width: 44px; height: 44px; background: #E8F4FD; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #0C8CE9; flex-shrink: 0; }
        .fc-story-content h4 { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }
        .fc-story-content p { font-size: 14px; color: #666; line-height: 1.65; }
        .fc-footer { margin-top: 40px; padding: 0; display: flex; justify-content: space-between; align-items: center; }
        .fc-footer-credit { font-size: 12px; color: #999; }
        .fc-footer-links { display: flex; gap: 24px; }
        .fc-footer-links a { font-size: 12px; color: #666; text-decoration: none; transition: color 0.2s; }
        .fc-footer-links a:hover { color: #0C8CE9; }
        .fc-value-grid-container { padding: 48px 48px 32px 60px; background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; display: flex; flex-direction: column; }
        .fc-value-grid { position: relative; width: 100%; height: 0; padding-bottom: 100%; margin: 16px 0 32px 0; }
        .fc-grid-canvas { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-left: 2px solid #e5e5e5; border-bottom: 2px solid #e5e5e5; background-image: linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px); background-size: 25% 25%; }
        .fc-grid-axis-label { position: absolute; font-size: 12px; font-weight: 500; color: #666; letter-spacing: -0.01em; }
        .fc-grid-axis-label.x-axis { bottom: -40px; left: 50%; transform: translateX(-50%); }
        .fc-grid-axis-label.y-axis { left: -90px; top: 50%; transform: translateY(-50%) rotate(-90deg); transform-origin: center; }
        .fc-grid-quadrant-label { position: absolute; font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 500; color: #999; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.4; }
        .fc-grid-quadrant-label.top-left { top: 16px; left: 16px; }
        .fc-grid-quadrant-label.top-right { top: 16px; right: 16px; text-align: right; }
        .fc-grid-quadrant-label.bottom-left { bottom: 16px; left: 16px; }
        .fc-grid-quadrant-label.bottom-right { bottom: 16px; right: 16px; text-align: right; }
        .fc-grid-dot { position: absolute; width: 16px; height: 16px; border-radius: 50%; transform: translate(-50%, -50%); cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .fc-grid-dot:hover { transform: translate(-50%, -50%) scale(1.3); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .fc-grid-dot.fontcontext { width: 18px; height: 18px; background: #0C8CE9; border: 3px solid #fff; box-shadow: 0 2px 12px rgba(12,140,233,0.3); }
        .fc-grid-dot.competitor-1 { background: #A259FF; }
        .fc-grid-dot.competitor-2 { background: #FF7262; }
        .fc-grid-dot.competitor-3 { background: #0FA958; }
        .fc-grid-dot.competitor-4 { background: #FFC700; }
        .fc-grid-legend { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px 24px; margin-top: 32px; }
        .fc-legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #666; line-height: 1; }
        .fc-legend-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
        .fc-legend-dot.fontcontext { background: #0C8CE9; }
        .fc-legend-dot.competitor-1 { background: #A259FF; }
        .fc-legend-dot.competitor-2 { background: #FF7262; }
        .fc-legend-dot.competitor-3 { background: #0FA958; }
        .fc-legend-dot.competitor-4 { background: #FFC700; }
        .fc-image-placeholder { background: transparent; border: none; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 12px; font-weight: 500; text-align: center; padding: 0; overflow: hidden; }
        @media (max-width: 1024px) {
          .fc-sidebar { display: none; }
          .fc-main-content { margin-left: 0; padding: 40px 32px; }
          .fc-project-title { font-size: 40px; }
          .fc-two-column, .fc-comparison-grid { grid-template-columns: 1fr; gap: 32px; }
          .fc-feature-showcase { grid-template-columns: 1fr; gap: 32px; }
          .fc-feature-showcase.reverse .fc-feature-image, .fc-feature-showcase.reverse .fc-feature-text { order: unset; }
          .fc-project-info { grid-template-columns: repeat(2, 1fr); }
          .fc-pain-section-layout { grid-template-columns: 1fr; gap: 32px; }
          .fc-polaroid-stack { margin: 32px auto 0; }
        }
        @media (max-width: 600px) {
          .fc-project-info { grid-template-columns: 1fr; }
          .fc-project-title { font-size: 32px; }
          .fc-section-title { font-size: 28px; }
        }
      `}</style>

      <div className="fc-container">
        <nav className="fc-sidebar">
          <Link href="/" className="fc-back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            BACK
          </Link>
          <div className="fc-nav-links">
            <a href="#overview">Overview</a>
            <a href="#solution">Solution</a>
            <a href="#pain">The Pain</a>
            <a href="#built-first">MVP Building</a>
            <a href="#two-bar">Design Process</a>
            <a href="#craft">Craft</a>
            <a href="#clicked">Outcome</a>
            <a href="#didnt-solve">What&apos;s Next</a>
          </div>
        </nav>

        <main className="fc-main-content">
          <p className="fc-project-meta">FontContext · Shipped 2026</p>
          <h1 className="fc-project-title">The Context Aware<br/>Font Editor for Figma</h1>

          <div className="fc-hero-image">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ borderRadius: 4 }}
            >
              <source src="/assets/figma.mov" type="video/quicktime" />
              <source src="/assets/figma.mov" type="video/mp4" />
            </video>
          </div>

          <div className="fc-project-info">
            <div className="fc-info-item">
              <h4>Role</h4>
              <p>Product Designer &amp;<br/>Frontend Engineer</p>
            </div>
            <div className="fc-info-item">
              <h4>Timeline</h4>
              <p>Jan 2026 (1 week)</p>
            </div>
            <div className="fc-info-item">
              <h4>Team</h4>
              <p>Self Initiated<br/>(Waterloo Figma Campus Leader)</p>
            </div>
            <div className="fc-info-item">
              <h4>Skills</h4>
              <p>Product Design<br/>Figma Plugin Dev<br/>TypeScript<br/>UX Research</p>
            </div>
          </div>

          <section id="overview" className="fc-section">
            <p className="fc-section-label">Overview</p>
            <h2 className="fc-section-title">What if you could preview your actual design content across 1,000+ fonts without ever leaving your text selection?</h2>
            <p className="fc-section-text">Most designers suffer through a &quot;scroll and guess&quot; workflow. You select a text box, scroll through a tiny dropdown for 20 minutes, and wait for Figma to piece together fonts one by one. I built FontContext to bridge the gap between discovery and application, allowing designers to see their actual canvas context rendered across the entire Google Fonts library instantly.</p>
          </section>

          <section id="solution" className="fc-section">
            <p className="fc-section-label">The Solution</p>
            <h2 className="fc-section-title">FontContext is a live type tester that turns an administrative hurdle into a creative win.</h2>

            <div className="fc-feature-showcase">
              <div className="fc-feature-image" style={{ border: 'none', background: 'transparent' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}>
                  <source src="/assets/Selection Synchronization.mov" type="video/mp4" />
                </video>
              </div>
              <div className="fc-feature-text">
                <h3>1. Selection Synchronization</h3>
                <p>The plugin acts as a listener, not just a viewer. When you select a text layer on your canvas, FontContext instantly pulls that exact raw text string into the interface.</p>
              </div>
            </div>

            <div className="fc-feature-showcase reverse">
              <div className="fc-feature-image" style={{ border: 'none', background: 'transparent' }}>
                <Image src="/assets/The Live Preview Engine.png" alt="Live Preview Engine" width={600} height={400} style={{ width: '100%', height: 'auto' }} />
              </div>
              <div className="fc-feature-text">
                <h3>2. The Live Preview Engine</h3>
                <p>I replaced the standard search behavior with a dual-mode engine. Toggling the &quot;Eye&quot; icon, the list transforms from a standard directory into a live creative stage.</p>
              </div>
            </div>

            <div className="fc-feature-showcase">
              <div className="fc-feature-image" style={{ border: 'none', background: 'transparent' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}>
                  <source src="/assets/Standardized Favoriting.mov" type="video/mp4" />
                </video>
              </div>
              <div className="fc-feature-text">
                <h3>3. Standardized Favoriting</h3>
                <p>Scroll through the library and curate your own type foundry. Click the heart icon to save fonts to your personal collection.</p>
              </div>
            </div>

            <div className="fc-feature-showcase reverse">
              <div className="fc-feature-image" style={{ border: 'none', background: 'transparent' }}>
                <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}>
                  <source src="/assets/Adaptive Workspace Layouts.mov" type="video/mp4" />
                </video>
              </div>
              <div className="fc-feature-text">
                <h3>4. Adaptive Workspace Layouts</h3>
                <p>FontContext includes a responsive layout engine that toggles between Vertical (List) and Horizontal (Grid) views.</p>
              </div>
            </div>
          </section>

          <section id="pain" className="fc-section">
            <p className="fc-section-label">The Problem</p>
            <h2 className="fc-section-title">The Pain Was Always There</h2>

            <div className="fc-pain-section-layout">
              <div className="fc-pain-text-content">
                <p className="fc-section-text">3+ years running design workshops, judging hackathons, mentoring at Figma events. Hundreds of first-time Figma users.</p>
                <p className="fc-section-text">Every session, the same scene: someone opens the font dropdown. A thousand names scroll by. They pick one, apply it, squint, undo. Pick another. Undo. 10-30 minutes gone.</p>
                <blockquote className="fc-user-quote-blue">
                  <p>&quot;I&apos;m trying to envision my brand in this font. But I can&apos;t see it. I&apos;m just guessing.&quot;</p>
                </blockquote>
              </div>

              <div className="fc-polaroid-stack" onClick={nextPolaroid}>
                <div className={`fc-polaroid ${getPolaroidClass(0)}`}>
                  <Image src="/assets/image1.JPG" alt="Workshop photo 1" width={300} height={260} style={{ objectFit: 'cover', width: '100%', height: '260px' }} />
                  <span className="fc-polaroid-caption">Waterloo Velocity MVP Hacks</span>
                </div>
                <div className={`fc-polaroid ${getPolaroidClass(1)}`}>
                  <Image src="/assets/image2.JPG" alt="Workshop photo 2" width={300} height={260} style={{ objectFit: 'cover', width: '100%', height: '260px' }} />
                  <span className="fc-polaroid-caption">Waterloo Velocity MVP Hacks</span>
                </div>
                <div className={`fc-polaroid ${getPolaroidClass(2)}`}>
                  <Image src="/assets/image3.jpg" alt="Workshop photo 3" width={300} height={260} style={{ objectFit: 'cover', width: '100%', height: '260px' }} />
                  <span className="fc-polaroid-caption">Waterloo Velocity MVP Hacks</span>
                </div>
              </div>
            </div>
          </section>

          <section id="need" className="fc-section">
            <p className="fc-section-label">The Need</p>
            <h2 className="fc-section-title">Recall vs Recognition</h2>
            <p className="fc-section-text">The native picker forces recall. You guess what Playfair Display looks like, apply it, then see if you&apos;re wrong. What people actually need is recognition: the ability to see their text in a font before committing to it.</p>
            <div className="fc-user-quote-blue">
              <p>How might we create a type testing experience that is both contextual and performant, without leaving Figma?</p>
            </div>
          </section>

          <section id="clicked" className="fc-section">
            <p className="fc-section-label">The Outcome</p>
            <h2 className="fc-section-title">The Moment It Clicked</h2>
            <p className="fc-section-text">Sarah, a medtech startup founder new to design, helped me A/B test iterations. A few weeks after launch, I ran into her working on a brandbook. FontContext open, scrolling through serifs, hearting options. I asked if she remembered when picking fonts was hard. She looked confused. &quot;What do you mean? You just preview and pick.&quot;</p>

            <div className="fc-key-insight">
              <p>That&apos;s the taste moment. When the interface stops being designed and starts being inevitable.</p>
            </div>

            <a href="https://www.figma.com/community/plugin/1595278086629925626/fontcontext" target="_blank" rel="noopener noreferrer" className="fc-story-block">
              <div className="fc-story-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <div className="fc-story-content">
                <h4>Try FontContext</h4>
                <p>Live on Figma Community</p>
              </div>
            </a>
          </section>

          <section id="learnings" className="fc-section" style={{ marginBottom: 0 }}>
            <p className="fc-section-label">Learnings</p>
            <h2 className="fc-section-title">What I Took Away</h2>

            <div className="fc-design-decisions">
              <div className="fc-decision-item">
                <div className="fc-decision-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div className="fc-decision-content">
                  <h4>The Best Design Is Invisible</h4>
                  <p>When Sarah couldn&apos;t remember font picking being hard, I knew the design worked. Good design disappears into the workflow.</p>
                </div>
              </div>

              <div className="fc-decision-item">
                <div className="fc-decision-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="fc-decision-content">
                  <h4>AI Lowered the Barrier, But Taste Still Matters</h4>
                  <p>Claude taught me code patterns I didn&apos;t know. But AI can&apos;t tell me where to put the heart icon or when 120ms feels right. That&apos;s taste.</p>
                </div>
              </div>

              <div className="fc-decision-item">
                <div className="fc-decision-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="3" x2="9" y2="21"/>
                    <line x1="15" y1="3" x2="15" y2="21"/>
                  </svg>
                </div>
                <div className="fc-decision-content">
                  <h4>Think in Systems</h4>
                  <p>FontContext is a font picker, not a typography editor. Knowing what not to build is harder than knowing what to build.</p>
                </div>
              </div>
            </div>
          </section>

          <footer className="fc-footer">
            <p className="fc-footer-credit">Crafted by Chrisandra Vaz</p>
            <div className="fc-footer-links">
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
