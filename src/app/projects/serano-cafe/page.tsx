"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SeranoCafeCaseStudy() {
  const [activeSection, setActiveSection] = useState("overview");
  const [treeVisible, setTreeVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setTreeVisible(scrollY > 300);

      // Check subsections first (h3, h4 with id), then fall back to sections
      const subsections = document.querySelectorAll("h3[id], h4[id]");
      let currentActive = null;
      
      subsections.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          currentActive = element.id;
        }
      });
      
      // If no subsection is active, check main sections
      if (!currentActive) {
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActive = section.id;
          }
        });
      }
      
      // Fallback to overview if nothing found
      if (!currentActive) {
        currentActive = "overview";
      }
      
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --serano-navy: #1a1a6e;
          --serano-navy-light: #e8eaf6;
          --serano-navy-50: rgba(26, 26, 110, 0.5);
          --serano-gold: #c9a962;
          --light-purple: #f3e8ff;
          --light-purple-border: #e9d5ff;
          --text-primary: #111;
          --text-secondary: #666;
          --text-tertiary: #999;
          --bg-primary: #fff;
          --bg-secondary: #fafafa;
          --bg-tertiary: #f5f5f7;
          --border-light: #e5e5e5;
          --border-subtle: #f0f0f0;
          --font-hero: 48px;
          --font-section: 28px;
          --font-subsection: 20px;
          --font-body: 16px;
          --font-small: 14px;
          --font-caption: 12px;
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

        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

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
          display: flex;
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

        .nav-pills {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          background: var(--bg-tertiary);
          padding: 4px;
          border-radius: 100px;
        }

        .nav-pills a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: var(--font-small);
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 100px;
          transition: all 0.2s;
          cursor: pointer;
        }

        .nav-pills a:hover { color: var(--text-primary); }
        .nav-pills a:focus-visible {
          outline: 2px solid var(--text-secondary);
          outline-offset: 2px;
        }
        .nav-pills a.active {
          color: var(--text-primary);
          background: var(--bg-primary);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
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

        .main-content > * {
          width: 100%;
          max-width: 900px;
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
        .tree-section.active > .tree-section-link { color: var(--serano-navy); }

        .tree-subsections {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.3s ease, opacity 0.2s ease;
          margin-left: 0;
          position: relative;
          padding-left: 12px;
        }

        .tree-section:hover .tree-subsections,
        .tree-section.active .tree-subsections {
          max-height: 500px;
          opacity: 1;
        }

        /* Vertical line from parent section down to first subsection */
        .tree-section:hover .tree-subsections::before,
        .tree-section.active .tree-subsections::before {
          content: '';
          position: absolute;
          left: 0;
          top: -2px;
          width: 1px;
          height: 2px;
          background: var(--text-tertiary);
          opacity: 0.3;
        }

        .tree-subsection {
          margin-left: 0;
          margin-top: 2px;
          margin-bottom: 2px;
          position: relative;
          padding-left: 12px;
        }

        /* Horizontal line connecting to vertical line */
        .tree-subsection::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 6px;
          width: 8px;
          height: 1px;
          background: var(--text-tertiary);
          opacity: 0.3;
        }

        /* Vertical line going up from each subsection to connect with horizontal */
        .tree-subsection::after {
          content: '';
          position: absolute;
          left: -12px;
          top: -2px;
          width: 1px;
          height: 8px;
          background: var(--text-tertiary);
          opacity: 0.3;
        }

        .tree-subsection-link {
          display: block;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.3px;
          text-transform: uppercase;
          color: var(--text-tertiary);
          text-decoration: none;
          padding: 2px 0;
          transition: color 0.2s, opacity 0.2s;
          cursor: pointer;
          opacity: 0.7;
          max-width: 180px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tree-subsection-link:hover { 
          color: var(--text-secondary); 
          opacity: 1;
        }
        .tree-subsection-link:focus-visible {
          outline: 2px solid var(--text-tertiary);
          outline-offset: 2px;
        }

        .tree-section.active .tree-subsection-link.active,
        .tree-subsection-link.active { 
          color: var(--serano-navy); 
          opacity: 1;
          font-weight: 600;
        }

        .project-meta {
          font-family: 'IBM Plex Mono', monospace;
          font-size: var(--font-caption);
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--text-tertiary);
          text-transform: uppercase;
          margin-bottom: var(--space-md);
        }

        .project-title {
          font-size: 48px;
          font-weight: 600;
          line-height: 1.08;
          color: var(--text-primary);
          margin-bottom: var(--space-2xl);
          letter-spacing: -0.03em;
        }

        .hero-image {
          width: 100%;
          background: transparent;
          border-radius: 0;
          padding: 0;
          margin-bottom: var(--space-2xl);
          display: block;
          height: 470px; /* ~20% crop vs full-height at max width */
          overflow: hidden;
        }

        .project-info {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-xl);
          padding: 0;
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
          font-size: 28px;
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

        .subsection-header {
          font-size: 20px;
          font-weight: 600;
          color: #111;
          margin-top: 48px;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .journey-stage-header {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--text-primary);
          margin-top: var(--space-xl);
          margin-bottom: var(--space-sm);
        }

        .journey-divider {
          border: none;
          border-top: 1px solid var(--border-light);
          margin: var(--space-xl) 0;
        }

        .journey-stages-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin: var(--space-xl) 0;
        }

        .journey-stage-item {
          padding: var(--space-lg) 0;
          position: relative;
        }

        .journey-stage-item:not(:last-child)::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-image: repeating-linear-gradient(
            to right,
            var(--border-light) 0,
            var(--border-light) 8px,
            transparent 8px,
            transparent 16px
          );
        }

        .journey-stage-item h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--serano-navy);
          margin-bottom: var(--space-sm);
        }

        .journey-stage-item p {
          font-size: var(--font-body);
          color: var(--text-secondary);
          line-height: 1.7;
          margin: 0;
        }

        .journey-stage-item p + p {
          margin-top: var(--space-md);
        }

        .hmw-block {
          background: var(--bg-primary);
          border-radius: var(--radius-md);
          padding: var(--space-xl);
          margin: var(--space-xl) 0;
          border: 1px solid var(--border-light);
        }

        .hmw-block p {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: var(--font-body);
          font-style: normal;
          font-weight: 600;
          color: var(--serano-navy);
          line-height: 1.6;
          margin: 0 0 var(--space-md) 0;
        }

        .hmw-block p:first-child {
          margin-bottom: var(--space-sm);
        }

        .hmw-block p:last-child { margin-bottom: 0; }

        .key-insight {
          border-left: 3px solid var(--serano-navy);
          padding-left: var(--space-lg);
          margin: var(--space-2xl) 0;
        }

        .key-insight p {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: var(--font-subsection);
          font-style: normal;
          color: var(--text-primary);
          line-height: 1.5;
          font-weight: 400;
        }

        .user-quote {
          margin: var(--space-xl) 0;
          padding: 0 0 0 var(--space-lg);
          border-left: 3px solid var(--serano-navy);
        }

        .user-quote p {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: var(--font-subsection);
          font-style: normal;
          color: var(--text-primary);
          line-height: 1.5;
          margin: 0;
        }

        .user-quote p:last-child {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 14px;
          color: var(--text-secondary);
          margin-top: 8px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
          margin: var(--space-xl) 0;
        }

        .stat-card {
          padding: var(--space-xl);
          background: var(--bg-primary);
          border-radius: var(--radius-md);
          text-align: center;
          border: 1px solid var(--border-light);
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: var(--serano-navy);
          margin-bottom: var(--space-xs);
        }

        .stat-label {
          font-size: var(--font-small);
          color: var(--text-secondary);
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin: var(--space-xl) 0;
        }

        .problem-card {
          padding: var(--space-xl);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
        }

        .problem-card-header {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          margin-bottom: var(--space-sm);
        }

        .problem-icon {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          background: var(--bg-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--serano-navy);
          flex-shrink: 0;
        }

        .problem-card h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--serano-navy);
        }

        .problem-card p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .needs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin: var(--space-xl) 0;
        }

        .need-card {
          padding: var(--space-lg);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          border: none;
          outline: none;
        }

        .need-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: var(--serano-navy);
          color: #fff;
          border-radius: 50%;
          font-size: var(--font-small);
          font-weight: 600;
          margin-bottom: var(--space-sm);
        }

        .need-card h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
          outline: none;
          border: none;
        }

        .need-card p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .testing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin: var(--space-xl) 0;
        }

        .test-card {
          padding: var(--space-lg);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
        }

        .test-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: var(--serano-navy-light);
          color: var(--serano-navy);
          border-radius: 50%;
          font-size: var(--font-small);
          font-weight: 600;
          margin-bottom: var(--space-sm);
        }

        .test-card h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--serano-navy);
          margin-bottom: var(--space-sm);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .test-card p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .goals-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          margin: var(--space-xl) 0;
        }

        .goal-card {
          padding: var(--space-xl);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
        }

        .goal-card h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--serano-navy);
          margin-bottom: var(--space-sm);
        }

        .goal-card p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .image-container {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: var(--space-xl);
          margin: var(--space-2xl) 0;
          border: 1px solid var(--border-light);
          transition: border-color 0.2s ease;
        }

        /* Special spacing for image containers that follow subsection headers */
        .subsection-header + .image-container {
          margin-top: var(--space-md);
          margin-bottom: var(--space-2xl);
        }

        /* Special compact container for prototype pill */
        .image-container.prototype-pill-container {
          padding: 10px;
          margin-top: 0;
          margin-bottom: var(--space-md);
        }

        .image-container:hover { border-color: var(--border-light); }

        .image-container.dark {
          background: #1a1a1a;
          border-color: #333;
        }

        .image-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: var(--font-micro);
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: var(--space-md);
        }

        .image-container.dark .image-label { color: #888; }

        .wireframe-insights {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          margin: var(--space-xl) 0;
        }

        .wireframe-insight {
          padding: var(--space-lg);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
        }

        .wireframe-insight h4 {
          font-size: var(--font-small);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }

        .wireframe-insight p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .persona-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: var(--space-lg) var(--space-xl);
          margin: var(--space-xl) 0;
        }

        .persona-header {
          display: flex;
          align-items: center;
          gap: var(--space-lg);
          margin-bottom: 0;
        }

        .persona-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--serano-navy-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 24px;
          font-weight: 600;
          color: var(--serano-navy);
        }

        .persona-info {
          flex: 1;
        }

        .persona-name-row {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-xs);
        }

        .persona-header h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .persona-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: var(--font-micro);
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--text-tertiary);
          padding: 2px 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
        }

        .persona-header p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          font-style: normal;
          margin: 0;
        }

        .persona-journey {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
        }

        .journey-stage {
          background: var(--bg-primary);
          border-radius: var(--radius-sm);
          padding: var(--space-md);
        }

        .journey-stage h5 {
          font-size: var(--font-micro);
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--serano-navy);
          margin-bottom: var(--space-sm);
        }

        .journey-stage p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .decision-card {
          display: flex;
          gap: var(--space-md);
          padding: var(--space-lg);
          margin: var(--space-lg) 0;
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          transition: border-color 0.2s;
        }

        .decision-card:hover { border-color: var(--border-light); }

        .decision-icon {
          width: 44px;
          height: 44px;
          background: var(--serano-navy-light);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--serano-navy);
          flex-shrink: 0;
        }

        .decision-content h4 {
          font-size: var(--font-small);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-xs);
        }

        .decision-content p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .feature-showcase {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: var(--space-2xl);
          align-items: center;
          margin: var(--space-2xl) 0;
        }

        .feature-showcase.sitemap-showcase {
          grid-template-columns: 0.75fr 1.4fr;
          align-items: start;
        }

        .feature-showcase.sitemap-showcase .feature-text {
          margin-top: -10px;
        }

        .feature-showcase.sitemap-showcase .journey-stages-list {
          margin-top: 0;
        }

        .feature-showcase.reverse { grid-template-columns: 1fr 1.1fr; }
        .feature-showcase.reverse .feature-image { order: 2; }
        .feature-showcase.reverse .feature-text { order: 1; }

        .feature-image {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: var(--space-xl);
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-light);
        }

        .feature-text h3 {
          font-size: var(--font-subsection);
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: var(--space-sm);
        }

        .feature-text p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .results-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          margin: var(--space-xl) 0;
        }

        /* Reduce bottom margin for results-grid in the last section before footer */
        section:last-of-type .results-grid {
          margin-bottom: 0;
        }

        .result-card {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-lg) var(--space-xl);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          transition: border-color 0.2s;
          text-decoration: none;
          color: inherit;
        }

        .result-card:hover { 
          border-color: var(--border-light);
          text-decoration: none;
        }

        .goals-list {
          list-style: none;
          padding: 0;
          margin: var(--space-xl) 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }

        .goal-item {
          display: flex;
          align-items: flex-start;
          gap: var(--space-md);
          font-size: var(--font-body);
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .check-icon {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 1.5px solid var(--serano-navy);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
          flex-shrink: 0;
        }

        .check-icon svg {
          display: block;
        }

        .result-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--serano-navy-light);
          border-radius: var(--radius-sm);
          color: var(--serano-navy);
          flex-shrink: 0;
        }

        .result-content h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 var(--space-xs) 0;
        }

        .result-content p {
          font-size: var(--font-small);
          color: var(--text-tertiary);
          margin: 0;
        }

        .takeaways-list {
          list-style: none;
          padding: 0;
          margin: var(--space-lg) 0;
        }

        .takeaways-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: var(--space-sm);
          font-size: var(--font-body);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .takeaways-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 6px;
          height: 6px;
          background: var(--serano-navy);
          border-radius: 50%;
        }

        /* Double Diamond Chart Styles */
        .double-diamond-container {
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          padding: var(--space-xl);
          margin: var(--space-2xl) 0;
          border: 1px solid var(--border-light);
          overflow-x: auto;
        }

        .double-diamond-svg {
          width: 100%;
          height: auto;
          min-width: 700px;
        }

        .dd-phase-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          fill: var(--serano-navy);
        }

        .dd-handoff-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          fill: var(--serano-navy);
        }

        .dd-activity {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          fill: var(--text-secondary);
        }

        .dd-diamond-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          fill: var(--text-tertiary);
        }

        .process-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-md);
          margin: var(--space-xl) 0;
        }

        .process-step {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: var(--space-lg);
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
        }

        .process-step-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: var(--serano-navy);
          color: #fff;
          border-radius: 50%;
          font-size: var(--font-small);
          font-weight: 600;
          margin-bottom: var(--space-sm);
        }

        .process-step-content h4 {
          font-size: var(--font-body);
          font-weight: 600;
          color: var(--serano-navy);
          margin-bottom: var(--space-xs);
        }

        .process-step-content p {
          font-size: var(--font-small);
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .footer {
          margin-top: var(--space-lg);
          padding: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-credit {
          font-size: var(--font-caption);
          color: var(--text-tertiary);
        }

        .footer-links {
          display: flex;
          gap: var(--space-lg);
        }

        .footer-links a {
          font-size: var(--font-caption);
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover { color: var(--serano-navy); }

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
          .problems-grid,
          .needs-grid,
          .testing-grid,
          .goals-grid,
          .feature-showcase { grid-template-columns: 1fr; gap: var(--space-xl); }
          .feature-showcase.reverse .feature-image,
          .feature-showcase.reverse .feature-text { order: unset; }
          .project-info { grid-template-columns: repeat(2, 1fr); }
          .stats-row { grid-template-columns: 1fr; }
          .process-steps { grid-template-columns: repeat(2, 1fr); }
          .persona-journey { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .project-info { grid-template-columns: 1fr; }
          .project-title { font-size: 32px; }
          .section-title { font-size: 24px; }
          .nav-pills { display: none; }
          .process-steps { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="container">
        <nav className="top-nav">
          <Link href="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
          <div className="nav-pills">
            <a onClick={() => scrollToSection("overview")} className={activeSection === "overview" ? "active" : ""}>Overview</a>
            <a onClick={() => scrollToSection("discover")} className={activeSection === "discover" ? "active" : ""}>Discover</a>
            <a onClick={() => scrollToSection("define")} className={activeSection === "define" ? "active" : ""}>Define</a>
            <a onClick={() => scrollToSection("ideate")} className={activeSection === "ideate" ? "active" : ""}>Ideate</a>
            <a onClick={() => scrollToSection("solution")} className={activeSection === "solution" ? "active" : ""}>Solution</a>
            <a onClick={() => scrollToSection("results")} className={activeSection === "results" ? "active" : ""}>Results</a>
          </div>
        </nav>

        <nav
          className={`tree-nav ${treeVisible ? "visible" : ""}`}
          style={{ display: treeVisible ? "block" : "none" }}
          aria-hidden={!treeVisible}
        >
          <div className={`tree-section ${activeSection === "overview" || activeSection.startsWith("overview") ? "active" : ""}`}>
            <span className="tree-section-link" onClick={() => scrollToSection("overview")}>Overview</span>
          </div>
          <div className={`tree-section ${activeSection === "discover" || activeSection === "cognitive-walkthrough" || activeSection === "three-problems" ? "active" : ""}`}>
            <span className="tree-section-link" onClick={() => scrollToSection("discover")}>Discover</span>
            <div className="tree-subsections">
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "cognitive-walkthrough" ? "active" : ""}`} onClick={() => scrollToSection("cognitive-walkthrough")}>Cognitive Walkthrough</span>
              </div>
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "three-problems" ? "active" : ""}`} onClick={() => scrollToSection("three-problems")}>Three Problems</span>
              </div>
            </div>
          </div>
          <div className={`tree-section ${activeSection === "define" || activeSection === "design-goals" || activeSection === "sitemap" || activeSection === "user-persona" || activeSection === "user-goals" || activeSection === "journey-need" || activeSection === "journey-awareness" || activeSection === "journey-consideration" || activeSection === "journey-acquisition" || activeSection === "journey-questions" || activeSection === "journey-emotional-arc" || activeSection === "brand-identity" || activeSection === "branding-direction" ? "active" : ""}`}>
            <span className="tree-section-link" onClick={() => scrollToSection("define")}>Define</span>
            <div className="tree-subsections">
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "design-goals" ? "active" : ""}`} onClick={() => scrollToSection("design-goals")}>Design Goals</span>
              </div>
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "sitemap" ? "active" : ""}`} onClick={() => scrollToSection("sitemap")}>Sitemap</span>
              </div>
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "user-persona" ? "active" : ""}`} onClick={() => scrollToSection("user-persona")}>User Persona</span>
              </div>
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "user-goals" || activeSection === "journey-need" || activeSection === "journey-awareness" || activeSection === "journey-consideration" || activeSection === "journey-acquisition" ? "active" : ""}`} onClick={() => scrollToSection("user-goals")}>Journey Map</span>
              </div>
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "brand-identity" ? "active" : ""}`} onClick={() => scrollToSection("brand-identity")}>Brand Identity</span>
              </div>
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "branding-direction" ? "active" : ""}`} onClick={() => scrollToSection("branding-direction")}>Branding Exercise</span>
              </div>
            </div>
          </div>
          <div className={`tree-section ${activeSection === "ideate" || activeSection === "crazy-8" || activeSection === "lo-fi-wireframes" ? "active" : ""}`}>
            <span className="tree-section-link" onClick={() => scrollToSection("ideate")}>Ideate</span>
            <div className="tree-subsections">
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "crazy-8" ? "active" : ""}`} onClick={() => scrollToSection("crazy-8")}>Crazy 8</span>
              </div>
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "lo-fi-wireframes" ? "active" : ""}`} onClick={() => scrollToSection("lo-fi-wireframes")}>Lo-Fi Wireframes</span>
              </div>
            </div>
          </div>
          <div className={`tree-section ${activeSection === "solution" || activeSection === "high-fidelity-prototype" ? "active" : ""}`}>
            <span className="tree-section-link" onClick={() => scrollToSection("solution")}>Solution</span>
            <div className="tree-subsections">
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "high-fidelity-prototype" ? "active" : ""}`} onClick={() => scrollToSection("high-fidelity-prototype")}>High Fidelity Prototype</span>
              </div>
            </div>
          </div>
          <div className={`tree-section ${activeSection === "results" || activeSection === "takeaways" ? "active" : ""}`}>
            <span className="tree-section-link" onClick={() => scrollToSection("results")}>Results</span>
            <div className="tree-subsections">
              <div className="tree-subsection">
                <span className={`tree-subsection-link ${activeSection === "takeaways" ? "active" : ""}`} onClick={() => scrollToSection("takeaways")}>Takeaways</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <p className="project-meta">Website Redesign</p>
          <h1 className="project-title">Serano Cafe Website Redesign</h1>

          <div className="hero-image">
            <Image
              src="/assets/sernaobakerymockup.png"
              alt="Serano Cafe website redesign mockup"
              width={800}
              height={450}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: 4 }}
            />
          </div>

          <div className="project-info">
            <div className="info-item">
              <h4>Role</h4>
              <p>UX Designer</p>
            </div>
            <div className="info-item">
              <h4>Timeline</h4>
              <p>1 Week</p>
            </div>
            <div className="info-item">
              <h4>Team</h4>
              <p>Solo, collaborating with cafe owners</p>
            </div>
            <div className="info-item">
              <h4>Context</h4>
              <p>Project Redesign</p>
            </div>
          </div>

          {/* Overview Section */}
          <section id="overview">
            <p className="section-label">Overview</p>
            <h2 className="section-title">A beloved Greek café with an 83% bounce rate.</h2>
            <p className="section-text">
              Serano Cafe is a family-run Greek café in Toronto&apos;s Greektown, serving homemade pies, pastries, breads, gelato, and coffee with a sense of familiarity that regulars describe as comforting.
            </p>
            <p className="section-text">
              Their website, however, told a very different story. It suffered from an 83% bounce rate, with most revenue coming from walk-ins and almost none from digital channels. With 67% of traffic coming from mobile and 53% funneled from Instagram, the site was failing the exact audience most likely to convert.
            </p>
            <p className="section-text">
              As the UX designer on this one-week redesign, I set out to turn that underperforming digital presence into an experience that finally matched the warmth, heritage, and handmade quality of the café itself.
            </p>

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-number">&gt;83%</div>
                <div className="stat-label">Bounce rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">67.1%</div>
                <div className="stat-label">Mobile traffic</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">53%</div>
                <div className="stat-label">From Instagram</div>
              </div>
            </div>

            <div className="image-container">
              <p className="image-label">Final Homepage: Clear, Warm, and True to Serano</p>
              <Image
                src="/assets/serano/seranobakerysolution.png"
                alt="Serano Cafe Final Solution"
                width={800}
                height={450}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </section>

          {/* Discover Section */}
          <section id="discover">
            <p className="section-label">Discover</p>
            <h2 className="section-title">What do users want that Serano doesn&apos;t provide?</h2>
            <p className="section-text">
              I started by identifying the gaps between user expectations and what the website delivered. Three core needs emerged.
            </p>
            <p className="section-text">
              As I observed a group of five testers navigating the site, the same three questions kept surfacing: is this place accessible to me, is it worth my money, and does it feel like a brand I can trust?
            </p>

            <div className="image-container">
              <p className="image-label">Original Website: Before Redesign</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
                <Image
                  src="/assets/serano/Before & After Comparison1.png"
                  alt="Original Serano Cafe website homepage before redesign"
                  width={300}
                  height={220}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
                <Image
                  src="/assets/serano/Before & After Comparison2.png"
                  alt="Original Serano Cafe website product and interior pages before redesign"
                  width={300}
                  height={220}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
                <Image
                  src="/assets/serano/Before & After Comparison3.png"
                  alt="Original Serano Cafe website layout details before redesign"
                  width={300}
                  height={220}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className="image-container">
              <Image
                src="/assets/serano/for1.png"
                alt="Additional before redesign comparison"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div className="needs-grid">
              <div className="need-card">
                <span className="need-number">1</span>
                <h4>Accessibility</h4>
                <p>Does this place allow wheelchairs? What&apos;s the price of items? Users couldn&apos;t find basic accessibility and pricing information.</p>
              </div>
              <div className="need-card">
                <span className="need-number">2</span>
                <h4>Value</h4>
                <p>How much money am I saving? Do they offer membership? There was no clear value proposition or incentives for returning customers.</p>
              </div>
              <div className="need-card">
                <span className="need-number">3</span>
                <h4>Brand</h4>
                <p>Is this a store I&apos;d want to purchase from? The website didn&apos;t communicate what made Serano special or trustworthy.</p>
              </div>
            </div>

            <h3 id="cognitive-walkthrough" className="subsection-header">Cognitive Walkthrough & Baseline Metrics</h3>
            <p className="section-text">
              A timed cognitive walkthrough of the original website surfaced how much work users had to do to answer basic questions: some couldn&apos;t find a menu at all, most took multiple minutes to confirm hours and services, and several assumed there was no wheelchair access or Wi‑Fi because it wasn&apos;t clearly stated.
            </p>
            <p className="section-text">
              These gaps translated into concrete benchmarks for the redesign, reducing time to menu, making accessibility and services scannable at a glance, and cutting the number of clicks required for core tasks roughly in half.
            </p>

            <h3 id="three-problems" className="subsection-header">Three Problems Discovered</h3>
            <div className="problems-grid">
              <div className="problem-card">
                <div className="problem-card-header">
                  <h4>Limited Aesthetics</h4>
                </div>
                <p>8/10 users said they would not continue exploring due to an immediate lack of polish and overall visual refinement.</p>
              </div>
              <div className="problem-card">
                <div className="problem-card-header">
                  <h4>Lack of Functionality</h4>
                </div>
                <p>Basic information was missing or buried; the Instagram section was blank, with no clear menu, CTA, or accessibility details.</p>
              </div>
              <div className="problem-card">
                <div className="problem-card-header">
                  <h4>Brand Ambiguity</h4>
                </div>
                <p>The site felt like a generic template with no Greek heritage or clear value, and several users assumed prices would be higher than they actually were.</p>
              </div>
            </div>
          </section>

          {/* Define Section */}
          <section id="define">
            <p className="section-label">Define</p>
            <h2 className="section-title">Clarifying the problem, goals, and brand direction.</h2>

            <div className="hmw-block">
              <p>How might we rebrand the café to better align with their products and differentiate them?</p>
              <p>How might we capture potential customers and increase orders?</p>
            </div>

            <h3 id="design-goals" className="subsection-header">Defining Success Through Design Goals</h3>
            <p className="section-text">
              To avoid drifting into purely aesthetic improvements, I defined a set of design goals that would anchor every decision in purpose.
            </p>

            <ul className="goals-list">
              <li className="goal-item">
                <span className="check-icon">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 6.2L4.9 8 9 4" />
                  </svg>
                </span>
                <span>
                  <strong>Purposeful &amp; accessible:</strong> Every element should guide the user, and critical information such as menu, hours, pricing, accessibility, and services must be easy to find without hunting.
                </span>
              </li>
              <li className="goal-item">
                <span className="check-icon">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 6.2L4.9 8 9 4" />
                  </svg>
                </span>
                <span>
                  <strong>Aesthetically pleasing but not frivolous:</strong> Use the aesthetic–usability effect to build trust and delight, without adding decorative noise that slows decision-making.
                </span>
              </li>
              <li className="goal-item">
                <span className="check-icon">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 6.2L4.9 8 9 4" />
                  </svg>
                </span>
                <span>
                  <strong>Informative &amp; friendly:</strong> Clearly communicate what Serano offers, in a conversational tone that feels like a warm recommendation rather than a hard sell.
                </span>
              </li>
            </ul>

            <h3 id="sitemap" className="subsection-header">Rebuilding the Sitemap from the Ground Up</h3>
            <div className="feature-showcase sitemap-showcase">
              <div className="feature-text">
                <div className="journey-stages-list">
                  <div className="journey-stage-item">
                    <h4>The Problem</h4>
                    <p>
                      The original sitemap was fragmented, with essential information buried beneath irrelevant sections and half the homepage missing content entirely.
                    </p>
                    <p>
                      The old sitemap forced users to scroll through empty space, guess where information might be, and rely on incomplete sections like the blank Instagram feed.
                    </p>
                  </div>
                  <div className="journey-stage-item">
                    <h4>The Solution</h4>
                    <p>
                      I rebuilt the structure around the way users actually search for information, prioritizing the menu, hours, location, and services at the top level.
                    </p>
                    <p>
                      Reorganizing the content into clear, predictable categories reduced cognitive load and made the experience feel more intuitive. The new structure allowed users to find what they needed in seconds rather than minutes, which directly addressed the friction uncovered in testing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="feature-image">
                <Image
                  src="/assets/serano/image 4.png"
                  alt="Sitemap comparison showing the original fragmented structure and the redesigned, user-centered hierarchy"
                  width={800}
                  height={400}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>

            <h3 id="user-persona" className="subsection-header">User Persona</h3>
            <div className="persona-card">
              <div className="persona-header">
                <div className="persona-avatar">E</div>
                <div className="persona-info">
                  <div className="persona-name-row">
                    <h4>Eleni</h4>
                    <span className="persona-label">Student</span>
                  </div>
                  <p>
                    Eleni is a student who drinks coffee daily, treats herself on exam-heavy weeks, and usually chooses the closest café because it feels predictable, affordable, and fast.
                    She expects digital experiences to mirror that simplicity, with clear prices, quick paths to the menu, and reassurance that the space will work for her schedule and needs.
                  </p>
                </div>
              </div>
            </div>

            <h3 id="user-goals" className="subsection-header">Understanding Their Goals and Expectations</h3>
            <p className="section-text">
              This persona expects a café website to answer basic questions quickly: what&apos;s on the menu, how much it costs, and whether the space accommodates their needs.
              They want reassurance that the café is worth the trip, especially when dietary restrictions or accessibility concerns are involved.
              When these answers aren&apos;t available, they default to the nearest alternative, even if it&apos;s less interesting.
            </p>

            <div className="journey-stages-list">
              <div className="journey-stage-item">
                <h4 id="journey-need">Need</h4>
                <p>
                  The journey begins with a simple craving, &quot;I want some caffeine,&quot; paired with the desire to try something new.
                </p>
                <p>
                  In one of my tests, two Greek sisters searched for coffee in Toronto and landed on Serano&apos;s website, excited by the possibility of finding a place that felt familiar. Their initial mindset was open and curious, but that curiosity depended on the website&apos;s ability to guide them.
                </p>
              </div>
              <div className="journey-stage-item">
                <h4 id="journey-awareness">Awareness</h4>
                <p>
                  At this stage, the user lands on the homepage and forms an immediate impression based on visuals, clarity, and hierarchy.
                </p>
                <p>
                  One sister said, &quot;This looks cool, I&apos;ll take a look at their menu now,&quot; but the excitement faded when she realized the menu wasn&apos;t visible or accessible. The homepage created interest but didn&apos;t support it, leaving users to scroll through empty space and guess where essential information might be.
                </p>
              </div>
              <div className="journey-stage-item">
                <h4 id="journey-consideration">Consideration</h4>
                <p>
                  The user tries to learn more about the café by browsing the site, looking for hours, location, pricing, and dietary notes.
                </p>
                <p>
                  This is where the experience breaks down: the hours are buried, the address is present but not emphasized, and the menu lacks pricing or allergen information, which made the sisters question whether the café was worth the trip. Their questions grew instead of shrinking, which is the opposite of what a consideration stage should do.
                </p>
              </div>
              <div className="journey-stage-item">
                <h4 id="journey-acquisition">Acquisition</h4>
                <p>
                  By the time the user decides whether to visit, they&apos;ve already formed an emotional impression of the brand based on how easy or difficult the website made their decision.
                </p>
                <p>
                  The sisters wanted to visit because the café looked promising, but they hesitated because they couldn&apos;t confirm accessibility for one of them or pricing for the items they were interested in. Their final sentiment was hopeful but uncertain, which is a fragile place for a brand to leave a potential customer.
                </p>
              </div>
            </div>

            <div className="image-container">
              <p className="image-label">Customer Journey: Emotional and Informational Breakdown</p>
              <Image
                src="/assets/serano/map1.png"
                alt="Customer Journey Map for Eleni from need to in-store visit"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <h3 id="brand-identity" className="subsection-header">Brand Identity &amp; Visual Direction</h3>
            <p className="section-text">
              The brand identity work began with a simple observation: the café&apos;s physical presence felt warm, handmade, and unmistakably Greek, while the website felt generic and disconnected.
              I needed to translate the emotional resonance of the space into a digital system that felt modern without losing its cultural roots, grounding the redesign in values rather than surface aesthetics.
            </p>

            <div className="image-container dark">
              <p className="image-label">Typography &amp; Color System</p>
              <Image
                src="/assets/serano/textstyleandcolorguide.png"
                alt="Typography and Color System"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <h3 id="branding-direction" className="subsection-header">Branding Exercise</h3>
            <p className="section-text">
              To clarify the direction, I ran a This / Not That exercise that helped define the boundaries of the brand.
              Serano needed to feel elegant but not pretentious, modern but not sterile, and culturally expressive without leaning into clichés.
              This exercise became a filter for every design decision, ensuring the final identity felt cohesive and true to the café&apos;s personality.
            </p>

            <p className="section-text">
              The visual language centered on a deep Mediterranean blue inspired by Greek signage, paired with warm neutrals that echoed the café&apos;s pastries and interior textures.
              I chose a clean, modern typeface for readability and paired it with a subtle serif accent to evoke heritage without overwhelming the layout.
              This combination created a balance between clarity and character, allowing the brand to feel both fresh and rooted.
            </p>

            <p className="section-text">
              Accessibility was a non‑negotiable requirement, so every color choice was tested against WCAG AA contrast standards.
              The previous brown palette failed these tests, which contributed to the site&apos;s low readability and visual fatigue.
              The new palette not only passed accessibility requirements but also created a sense of warmth that aligned with the café&apos;s welcoming atmosphere.
            </p>

            <div className="image-container">
              <p className="image-label">Brand Exploration: This / Not That</p>
              <Image
                src="/assets/serano/thisorthat.png"
                alt="This or That Brand Exercise"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <div className="image-container">
              <p className="image-label">Brand Moodboard: Warm, Greek, Handmade, Modern</p>
              <Image
                src="/assets/serano/moodboard.png"
                alt="Mood Board"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

          </section>

          {/* Ideate Section */}
          <section id="ideate">
            <p className="section-label">Ideate</p>
            <h2 className="section-title">Crazy 8, low-fi explorations, and early layout experiments.</h2>
            <p className="section-text">
              To break out of the constraints of the original layout, I ran a Crazy 8 session to explore eight radically different homepage directions in eight minutes.
              The goal wasn&apos;t to find a perfect solution but to stretch the boundaries of what the Serano experience could become, from bold menu‑first layouts to story‑driven hero sections.
              This exercise helped me identify which elements carried emotional weight and which ones distracted from the core experience.
            </p>

            <h3 id="crazy-8" className="subsection-header">Crazy 8</h3>
            <div className="image-container">
              <p className="image-label">Crazy 8 Ideation: Exploring Eight Directions in Eight Minutes</p>
              <Image
                src="/assets/serano/seranocrazy8.png"
                alt="Crazy 8 Design Iterations"
                width={900}
                height={600}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div className="image-container">
              <p className="image-label">Crazy 8 Testing: Selecting the Strongest Direction</p>
              <Image
                src="/assets/serano/12.png"
                alt="Crazy 8 Testing artifact showing how each concept was evaluated and the strongest direction selected"
                width={900}
                height={600}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <p className="section-text">
              After evaluating each Crazy 8 concept, I selected the strongest direction that balanced clarity with emotional resonance.
              This testing process helped identify which layout elements resonated most with users and which approaches felt too generic or overwhelming.
            </p>

            <h3 id="lo-fi-wireframes" className="subsection-header">Lo-Fi Wireframes</h3>
            <div className="image-container">
              <p className="image-label">Low-Fidelity Wireframes</p>
              <Image
                src="/assets/serano/lowfidelity_wireframe.png"
                alt="Low-Fidelity Wireframes"
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <p className="section-text">
              With the strongest direction selected, I developed low-fidelity wireframes to map out the information architecture and user flows.
              These wireframes focused on making essential information, menu, hours, location, and services, immediately accessible while maintaining a clean, scannable layout.
            </p>
          </section>

          {/* Solution Section */}
          <section id="solution">
            <p className="section-label">Solution</p>
            <div className="feature-showcase reverse">
              <div className="feature-text">
                <h2 className="section-title">Solution: A cohesive, warm, and accessible system</h2>
                <div className="user-quote">
                  <p>&quot;It&apos;s so cute that I almost forgot you&apos;re trying to make money off of me.&quot;</p>
                  <p>Anonymous tester</p>
                </div>
                <p className="section-text">
                  Once the high-fidelity screens were ready, I tested them with the same group of five users. Their reactions were immediate and emotional, and comments like this one signaled that the new identity created delight without sacrificing usability.
                  The final system felt intentional, modern, and true to Serano&apos;s heritage.
                </p>
              </div>
              <div className="feature-image">
                <Image
                  src="/assets/serano/high.png"
                  alt="High fidelity prototype results showing user reactions and feedback"
                  width={900}
                  height={600}
                  style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
            </div>

            <div className="image-container">
              <p className="image-label">Final High-Fidelity System: Cohesive, Warm, and Accessible</p>
              <Image
                src="/assets/serano/All Screens Overview.png"
                alt="All Screens Overview"
                width={900}
                height={600}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div className="image-container">
              <Image
                src="/assets/serano/seranobakerysolution.png"
                alt="Serano Cafe Homepage Design"
                width={900}
                height={600}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            <h3 id="high-fidelity-prototype" className="subsection-header">High Fidelity Prototype</h3>
            <div className="image-container prototype-pill-container">
              <div className="results-grid">
                <a
                  href="https://www.figma.com/proto/iBo2ULQN0z6sS1nr6TZspL/serano-cafe?node-id=224-303&t=ar2msyQf8Qe6pXDV-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="result-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"/>
                      <path d="M14.06 6.19l2.12-2.12a2 2 0 0 1 2.83 0l1.06 1.06a2 2 0 0 1 0 2.83l-2.12 2.12"/>
                    </svg>
                  </div>
                  <div className="result-content">
                    <h4>Click to see prototype</h4>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section id="results">
            <p className="section-label">Results</p>
            <h2 className="section-title">Overall</h2>
            <p className="section-text">
              The original website felt underwhelming, visually flat, and structurally incomplete, with half the homepage missing and essential information buried or absent.
              The redesigned experience replaced that uncertainty with clarity, warmth, and a cohesive brand identity that finally reflected the café&apos;s physical charm and values.
            </p>
            <p className="section-text">
              The Double Diamond framework naturally reflected how the project unfolded, from broad discovery to focused definition, through iterative development, and finally into a polished, build-ready system handed off to developers.
            </p>

            {/* Double Diamond Chart */}
            <div className="double-diamond-container">
              <svg viewBox="0 0 900 320" className="double-diamond-svg">
                {/* Background diamonds */}
                <path d="M50,160 L200,40 L350,160 L200,280 Z" fill="#e8eaf6" stroke="#1a1a6e" strokeWidth="2"/>
                <path d="M350,160 L500,40 L650,160 L500,280 Z" fill="#e8eaf6" stroke="#1a1a6e" strokeWidth="2"/>

                {/* Dev Handoff Arrow */}
                <path d="M650,160 L850,160" stroke="#1a1a6e" strokeWidth="3" strokeDasharray="8,4"/>
                <polygon points="850,160 830,150 830,170" fill="#1a1a6e"/>

                {/* Phase Labels */}
                <text x="125" y="160" textAnchor="middle" className="dd-phase-label">DISCOVER</text>
                <text x="275" y="160" textAnchor="middle" className="dd-phase-label">DEFINE</text>
                <text x="425" y="160" textAnchor="middle" className="dd-phase-label">DEVELOP</text>
                <text x="575" y="160" textAnchor="middle" className="dd-phase-label">DELIVER</text>
                <text x="750" y="145" textAnchor="middle" className="dd-handoff-label">DEV</text>
                <text x="750" y="175" textAnchor="middle" className="dd-handoff-label">HANDOFF</text>

                {/* Activity dots and labels */}
                {/* Discover */}
                <circle cx="125" cy="100" r="6" fill="#1a1a6e"/>
                <text x="125" y="85" textAnchor="middle" className="dd-activity">Research</text>
                <circle cx="175" cy="120" r="6" fill="#1a1a6e"/>
                <text x="175" y="105" textAnchor="middle" className="dd-activity">User Interviews</text>

                {/* Define */}
                <circle cx="275" cy="100" r="6" fill="#1a1a6e"/>
                <text x="275" y="85" textAnchor="middle" className="dd-activity">Journey Map</text>
                <circle cx="325" cy="120" r="6" fill="#1a1a6e"/>
                <text x="325" y="105" textAnchor="middle" className="dd-activity">HMW Statement</text>

                {/* Develop */}
                <circle cx="425" cy="100" r="6" fill="#1a1a6e"/>
                <text x="425" y="85" textAnchor="middle" className="dd-activity">Wireframes</text>
                <circle cx="475" cy="120" r="6" fill="#1a1a6e"/>
                <text x="475" y="105" textAnchor="middle" className="dd-activity">Prototypes</text>

                {/* Deliver */}
                <circle cx="575" cy="100" r="6" fill="#1a1a6e"/>
                <text x="575" y="85" textAnchor="middle" className="dd-activity">Hi-Fi Designs</text>
                <circle cx="625" cy="120" r="6" fill="#1a1a6e"/>
                <text x="625" y="105" textAnchor="middle" className="dd-activity">User Testing</text>

                {/* Bottom labels */}
                <text x="200" y="300" textAnchor="middle" className="dd-diamond-label">Problem Space</text>
                <text x="500" y="300" textAnchor="middle" className="dd-diamond-label">Solution Space</text>

                {/* Handoff icon */}
                <rect x="820" y="140" width="40" height="40" rx="8" fill="#1a1a6e"/>
                <text x="840" y="167" textAnchor="middle" fill="white" fontSize="18">→</text>
              </svg>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="process-step-number">1</div>
                <div className="process-step-content">
                  <h4>Discover</h4>
                  <p>Competitive analysis, stakeholder conversations, cognitive walkthroughs, and timed tasks to surface real user pain points.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="process-step-number">2</div>
                <div className="process-step-content">
                  <h4>Define</h4>
                  <p>Customer journey mapping, HMW statements, and design goals that balanced clarity, warmth, and accessibility.</p>
                </div>
              </div>
              <div className="process-step">
                <div className="process-step-number">3</div>
                <div className="process-step-content">
                  <h4>Develop</h4>
                  <p>Crazy 8 ideation, low-fidelity wireframes, sitemap restructuring, and iterative layout testing.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="process-step-number">4</div>
                <div className="process-step-content">
                  <h4>Deliver</h4>
                  <p>High-fidelity designs, user testing, final refinements, and a detailed developer handoff package.</p>
                </div>
              </div>
            </div>

            <h3 id="takeaways" className="subsection-header">Takeaways</h3>
            <div className="results-grid">
              <div className="result-card">
                <div className="result-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                  </svg>
                </div>
                <div className="result-content">
                  <h4>Clarity enables beauty</h4>
                  <p>Aesthetic polish only resonates when the structure beneath it answers real user questions.</p>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="result-content">
                  <h4>Design as a bridge</h4>
                  <p>Aligning the digital experience with the physical café experience builds trust and loyalty.</p>
                </div>
              </div>
              <div className="result-card">
                <div className="result-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="3" x2="9" y2="21"/>
                    <line x1="15" y1="3" x2="15" y2="21"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="3" y1="15" x2="21" y2="15"/>
                  </svg>
                </div>
                <div className="result-content">
                  <h4>Systems over single screens</h4>
                  <p>A strong design system, tokens, and components make future updates more consistent and sustainable.</p>
                </div>
              </div>
            </div>

          </section>

          <footer className="footer">
            <p className="footer-credit">Crafted by Chrisandra Vaz</p>
            <div className="footer-links">
              <a href="https://ca.linkedin.com/in/chrisandra-vaz" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:chrisandravaz12@gmail.com">Email</a>
              <a href="https://github.com/ChrisandraVaz" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
