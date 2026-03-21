"use client";

import { useEffect, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "FontContext (Figma Plugin)",
    subtitle: "Context Aware Font Editor",
    image: "/assets/figma.mp4",
    bgColor: "#e8f4f8",
    href: "/fontcontext.html",
  },
  {
    title: "Liquid Metallic Button",
    subtitle: "Interactive Component",
    image: "/assets/metalicbutton1.mov",
    bgColor: "#2b2b2b",
    href: "https://chrisandravaz.github.io/Liquid-Metallic-Button-/liquid-metal-button",
  },
  {
    title: "2000s Microsoft Paint Recreation",
    subtitle: "Interactive Component",
    image: "/assets/microsoftpaint.mp4",
    bgColor: "#c0c0c0",
    href: "https://chrisandravaz.github.io/Microsoft-Paint/",
  },
  {
    title: "TD Bank (Securities)",
    subtitle: "Interest Claims Manager",
    image: "/assets/tdinterestclaims.png",
    bgColor: "#e8f5e8",
    href: "https://www.figma.com/deck/gtOsKJthDfJ5AMuEzoLeIc/TD-Interest-Claims-Manager?node-id=21-5529&viewport=-137%2C-76%2C0.64&t=4X9qVynR5g75X3F1-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  },
  {
    title: "IBM Accelerate",
    subtitle: "ManageIQ System Revamp",
    image: "/assets/ibm.gif",
    bgColor: "#0052ff",
    href: "/projects/ibm-accelerate",
  },
  {
    title: "Figma - FigBuild 2025",
    subtitle: "Inaugural Designathon (8 Universities) · Content Design",
    image: "/assets/figbuild.png",
    bgColor: "#eef0f3",
    href: "/projects/figbuild",
  },
  {
    title: "TD Bank (Securities) Design System",
    subtitle: "Tokenized Foundations",
    image: "/assets/tds.png",
    bgColor: "#1a3a2f",
    href: "/projects/td-design-system",
  },
  {
    title: "Serano Cafe",
    subtitle: "Visual Design & Web Design",
    image: "/assets/sernaobakerymockup.png",
    bgColor: "#1a1a2e",
    href: "/projects/serano-cafe",
  },
];

export default function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const manualPauseUntilRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fontContext, liquidMetallicButton, microsoftPaint, ...featureStack] = projects;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Keep auto-scroll desktop-only. On touch/mobile this interferes with reading and tapping.
    const isTouchLike =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches;
    if (isTouchLike) return;

    const speedPxPerSecond = 10;
    const endPauseMs = 900;
    let isRunning = true;

    const tick = (ts: number) => {
      if (!isRunning) return;
      const el = containerRef.current;
      if (!el) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const hasOverflow = el.scrollHeight > el.clientHeight + 1;
      if (!hasOverflow || isHovered || Date.now() < manualPauseUntilRef.current) {
        lastTsRef.current = ts;
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const prevTs = lastTsRef.current ?? ts;
      const deltaSec = Math.min((ts - prevTs) / 1000, 0.05);
      lastTsRef.current = ts;
      el.scrollTop += speedPxPerSecond * deltaSec;

      const atEnd = el.scrollTop >= el.scrollHeight - el.clientHeight - 1;
      if (atEnd) {
        el.scrollTop = 0;
        manualPauseUntilRef.current = Date.now() + endPauseMs;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    const pauseForManualInput = () => {
      manualPauseUntilRef.current = Date.now() + 2500;
    };

    container.addEventListener("wheel", pauseForManualInput, { passive: true });
    container.addEventListener("touchmove", pauseForManualInput, { passive: true });
    container.addEventListener("pointerdown", pauseForManualInput, { passive: true });

    return () => {
      isRunning = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTsRef.current = null;
      container.removeEventListener("wheel", pauseForManualInput);
      container.removeEventListener("touchmove", pauseForManualInput);
      container.removeEventListener("pointerdown", pauseForManualInput);
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="md:h-full overflow-y-auto scrollbar-hide"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="space-y-2.5 p-0">
        <ProjectCard {...fontContext} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ProjectCard {...microsoftPaint} />
          <ProjectCard {...liquidMetallicButton} />
        </div>
        {featureStack.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
