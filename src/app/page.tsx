"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SocialLinks from "@/components/SocialLinks";
import WorkExperience from "@/components/WorkExperience";
import ProjectGallery from "@/components/ProjectGallery";
import Link from "next/link";

const currentExperience = [
  { company: "Figma", role: "Campus Leader" },
];

const previousExperience = [
  { company: "TD Bank", role: "UX Developer" },
  { company: "IBM", role: "Design Fellow" },
  { company: "TD Bank", role: "Product Design Intern" },
  { company: "TD Bank", role: "Product Design Intern" },
];

type ViewMode = "light" | "night";
type TrailPoint = { x: number; y: number; t: number; isBreak: boolean };

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>("night");
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [showPencilIntro, setShowPencilIntro] = useState(false);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const trailFrameRef = useRef<number | null>(null);

  const shellStyle = useMemo(() => {
    const mode = viewMode === "light"
      ? {
          text: "#171717",
          muted: "#505866",
          selectionBg: "#ffd7ea",
          selectionText: "#7d0f47",
          left: "#fcfcfd",
          shell: "#ffffff",
          right: "#fcfcfb",
          border: "rgba(20, 25, 32, 0.2)",
          panel: "rgba(255, 255, 255, 0.95)",
        }
      : {
          text: "#f4f6f8",
          muted: "#8e98a8",
          heading: "#ffffff",
          selectionBg: "#ff9dca",
          selectionText: "#4d0a2b",
          left: "#0c1015",
          shell: "#0c1015",
          right: "#151a20",
          border: "rgba(232, 236, 243, 0.18)",
          panel: "rgba(255, 255, 255, 0.05)",
        };

    const heading = viewMode === "light" ? "#171717" : mode.heading;
    return {
      "--portfolio-shell": mode.shell,
      "--portfolio-left": mode.left,
      "--portfolio-right": mode.right,
      "--portfolio-right-hi": mode.right,
      "--portfolio-text": mode.text,
      "--portfolio-heading": heading,
      "--portfolio-muted": mode.muted,
      "--portfolio-selection-bg": mode.selectionBg,
      "--portfolio-selection-text": mode.selectionText,
      "--portfolio-accent": "#d61f96",
      "--portfolio-border": mode.border,
      "--portfolio-panel": mode.panel,
    } as React.CSSProperties;
  }, [viewMode]);

  useEffect(() => {
    const resizeCanvas = () => {
      const panel = leftPanelRef.current;
      const canvas = canvasRef.current;
      if (!panel || !canvas) return;
      const rect = panel.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#e91e8c";
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowPencilIntro(true), 180);
    const hideTimer = setTimeout(() => setShowPencilIntro(false), 2600);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const animateTrail = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        const now = performance.now();
        const trailWindowMs = 900;
        const points = trailPointsRef.current.filter((p) => now - p.t <= trailWindowMs);
        trailPointsRef.current = points;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (points.length > 1) {
          ctx.beginPath();
          for (let i = 0; i < points.length; i += 1) {
            const p = points[i];
            if (p.isBreak || i === 0) {
              ctx.moveTo(p.x, p.y);
              continue;
            }
            const prev = points[i - 1];
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
          ctx.stroke();
        }
      }
      trailFrameRef.current = requestAnimationFrame(animateTrail);
    };

    trailFrameRef.current = requestAnimationFrame(animateTrail);
    return () => {
      if (trailFrameRef.current) cancelAnimationFrame(trailFrameRef.current);
      trailFrameRef.current = null;
    };
  }, [isDrawMode]);

  const pointFromEvent = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onDrawStart = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode) return;
    drawingRef.current = true;
    const p = pointFromEvent(event);
    trailPointsRef.current.push({ x: p.x, y: p.y, t: performance.now(), isBreak: true });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDrawMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !drawingRef.current) return;
    const p = pointFromEvent(event);
    trailPointsRef.current.push({ x: p.x, y: p.y, t: performance.now(), isBreak: false });
  };

  const onDrawEnd = () => {
    drawingRef.current = false;
  };

  const toggleDrawMode = () => {
    setIsDrawMode((prev) => {
      const next = !prev;
      if (!next) {
        drawingRef.current = false;
        trailPointsRef.current = [];
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
      return next;
    });
  };

  return (
    <div
      className="portfolio-shell min-h-screen md:h-screen flex flex-col md:flex-row overflow-auto md:overflow-hidden"
      style={shellStyle}
      data-mode={viewMode}
    >
      {/* Left Side - Info Section */}
      <div ref={leftPanelRef} className="portfolio-left relative w-full md:w-[45%] md:h-full flex flex-col p-6 md:p-[56px]">
        <canvas
          ref={canvasRef}
          className={`draw-layer ${isDrawMode ? "active" : ""}`}
          onPointerDown={onDrawStart}
          onPointerMove={onDrawMove}
          onPointerUp={onDrawEnd}
          onPointerCancel={onDrawEnd}
        />
        <div className="absolute right-6 top-6 md:right-[24px] md:top-[56px] z-10">
          <div className="tone-group">
            <button
              onClick={() => setViewMode("light")}
              className={`tone-btn tone-icon ${viewMode === "light" ? "active" : ""}`}
              aria-label="Light mode"
              title="Light mode"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="12" y1="1.8" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="22.2" />
                  <line x1="1.8" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="22.2" y2="12" />
                  <line x1="4.4" y1="4.4" x2="6.7" y2="6.7" />
                  <line x1="17.3" y1="17.3" x2="19.6" y2="19.6" />
                  <line x1="17.3" y1="6.7" x2="19.6" y2="4.4" />
                  <line x1="4.4" y1="19.6" x2="6.7" y2="17.3" />
                </g>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("night")}
              className={`tone-btn tone-icon ${viewMode === "night" ? "active" : ""}`}
              aria-label="Night mode"
              title="Night mode"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M21 14.2A8.8 8.8 0 1 1 9.8 3a7.2 7.2 0 1 0 11.2 11.2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="h-[64px] sm:h-[78px] md:h-[92px] mb-5 sm:mb-7 md:mb-[40px]" aria-hidden="true" />

        {/* Hero Text */}
        <h1 className="hero-headline font-normal mb-6 md:mb-[32px] text-[var(--portfolio-heading)] max-w-[620px]" style={{ fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: '1.14' }}>
          <span className="name-squiggle">Chrisandra</span>{" "}
          <span className="pencil-wrap">
            <button
              type="button"
              onClick={toggleDrawMode}
              className={`inline-block twitch-symbol pencil-trigger pencil-attention ${isDrawMode ? "active" : ""}`}
              aria-label={isDrawMode ? "Disable drawing mode" : "Enable drawing mode"}
            >
              ✐
            </button>
            <span className={`pencil-tooltip ${showPencilIntro ? "intro" : ""}`}>Click me to draw!</span>
          </span>{" "}
          is a designer at waterloo who ships products that click{" "}
          <span className="inline-block">✦</span> and cultivates thriving design communities{" "}
          <span className="inline-block">✧</span>.
        </h1>

        {/* Social Links and Status Badge row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <SocialLinks />
          <span className="status-badge text-[12px] md:text-[14px]">
            Seeking W26 & S26 Internships
          </span>
        </div>

        {/* First Divider */}
        <div className="portfolio-divider my-6 md:my-[24px]"></div>

        {/* CTA Section with About Me button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <p className="text-[14px] md:text-[15px] text-[var(--portfolio-text)] mb-1">Interested in working together?</p>
            <p className="text-[14px] md:text-[15px] text-[var(--portfolio-muted)]">
              Book a time{" "}
              <Link href="https://calendly.com/chrisandravaz12/30min" className="link-pink">
                here
              </Link>{" "}
              if you&apos;d like to chat.
            </p>
          </div>
          <Link href="https://vazzy.framer.website/about">
            <button className="about-btn">About Me</button>
          </Link>
        </div>

        {/* Second Divider */}
        <div className="portfolio-divider my-6 md:my-[24px]"></div>

        {/* Work Experience */}
        <div>
          <WorkExperience title="CURRENT" experiences={currentExperience} />
          <WorkExperience title="PREVIOUS" experiences={previousExperience} />
        </div>

        {/* Footer signature - hidden on mobile */}
        <div className="hidden md:block mt-auto text-right">
          <span className="text-[14px] text-[var(--portfolio-text)]">क्रिसेंद्रा.</span>
        </div>

        {/* Sentry Test Button - Remove after testing */}
        <button
          onClick={() => {
            throw new Error("Sentry Test Error - This is a test!");
          }}
          className="fixed bottom-4 left-4 px-3 py-2 bg-red-500 text-white text-xs rounded hover:bg-red-600 z-50"
        >
          Test Sentry
        </button>
      </div>

      {/* Right Side - Project Gallery */}
      <div className="portfolio-right w-full md:w-[55%] md:h-full p-[20px]">
        <ProjectGallery />
      </div>
    </div>
  );
}
