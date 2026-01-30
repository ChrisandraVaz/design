"use client";

import { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "FontContext",
    subtitle: "The Context Aware Font Editor for Figma",
    image: "/assets/figma.mov",
    bgColor: "#e8f4f8",
    href: "/fontcontext.html",
  },
  {
    title: "TD Bank (Securities)",
    subtitle: "Interest Claims Manager",
    image: "/assets/td.png",
    bgColor: "#e8f5e8",
    href: "/projects/td-bank-interest-claims",
  },
  {
    title: "IBM Accelerate",
    subtitle: "ManageIQ System Revamp",
    image: "/assets/ibm.gif",
    bgColor: "#0052ff",
    href: "/projects/ibm-accelerate",
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
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPausedAtEnd, setIsPausedAtEnd] = useState(false);
  const manualScrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle manual scroll - pause auto-scroll temporarily
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isMobile) return;

    const handleWheel = () => {
      setIsAutoScrolling(false);
      if (manualScrollTimeout.current) {
        clearTimeout(manualScrollTimeout.current);
      }
      // Resume auto-scroll after 3 seconds of no scrolling
      manualScrollTimeout.current = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 3000);
    };

    container.addEventListener('wheel', handleWheel);
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (manualScrollTimeout.current) {
        clearTimeout(manualScrollTimeout.current);
      }
    };
  }, [isMobile]);

  // Auto-scroll only on desktop
  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollSpeed = 0.5;

    const autoScroll = () => {
      if (!container || !isAutoScrolling) return;

      // Check if at the end
      const isAtEnd = container.scrollTop >= container.scrollHeight - container.clientHeight - 1;

      if (isAtEnd && !isPausedAtEnd) {
        // Pause at end for 2 seconds before looping
        setIsPausedAtEnd(true);
        setTimeout(() => {
          if (container) {
            container.scrollTop = 0;
          }
          setIsPausedAtEnd(false);
        }, 2000);
        return;
      }

      if (!isPausedAtEnd) {
        container.scrollTop += scrollSpeed;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    if (isAutoScrolling && !isPausedAtEnd) {
      animationFrameId = requestAnimationFrame(autoScroll);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoScrolling, isMobile, isPausedAtEnd]);

  return (
    <div
      ref={containerRef}
      className="md:h-full overflow-y-auto md:overflow-y-auto scrollbar-hide"
      onMouseEnter={() => !isMobile && setIsAutoScrolling(false)}
      onMouseLeave={() => !isMobile && setIsAutoScrolling(true)}
    >
      <div className="space-y-4 pt-6 md:pt-[56px] pb-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
