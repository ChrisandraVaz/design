'use client';
/* Native images keep the flyer crops as exported, like the rest of the canvas. */
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import './figbuild-flyers.css';

/* The FigBuild 2025 run in the order it went out: panel, its four speakers,
   both workshops with their detail slides, the countdown, then the close. */
const flyers = [
  { src: 'announcement', alt: 'FigBuild 2025 official event announcement, a multi-campus design-a-thon by Figma for Edu' },
  { src: 'join-us', alt: 'Join us in person or online: stream the session via Zoom or attend a campus watch party' },
  { src: 'campuses', alt: 'Participating campuses, from California College of the Arts to UCLA' },
  { src: 'workshop-miggi', alt: 'Miggi Cardona\u2019s hands-on workshop: concept to clickable prototype' },
  { src: 'workshop-steph', alt: 'Steph Zhou\u2019s workshop on telling a compelling story with Figma Slides' },
  { src: 'register', alt: 'Register your team by Saturday April 19, 3pm ET' },
  { src: 'countdown-1', alt: 'Countdown flyer, one' },
  { src: 'countdown-2', alt: 'Countdown flyer, two' },
];

const ADVANCE_MS = 1500;
const PEEL_MS = 620;

const REDUCED = '(prefers-reduced-motion: reduce)';
function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
function readReducedMotion() {
  return window.matchMedia(REDUCED).matches;
}

function flyerSrc(index: number) {
  return `/assets/figbuild/${flyers[index].src}.jpg`;
}

export default function FigBuildFlyers() {
  const [index, setIndex] = useState(0);
  /* The flyer being revealed underneath; null whenever the sheet is at rest. */
  const [target, setTarget] = useState<number | null>(null);
  const [held, setHeld] = useState(false);
  /* True for the single frame in which the lifted sheet snaps back to rest. */
  const [snapping, setSnapping] = useState(false);
  const timeout = useRef<number | undefined>(undefined);
  const frame = useRef(0);

  /* Reduced motion stops the reel outright rather than swapping twice a second
     without the turn to explain it. Read as an external store so it also
     follows the setting changing, and so nothing is set during an effect. */
  const still = useSyncExternalStore(subscribeToReducedMotion, readReducedMotion, () => false);

  useEffect(() => () => {
    window.clearTimeout(timeout.current);
    cancelAnimationFrame(frame.current);
  }, []);

  const peel = useCallback(() => {
    setTarget(current => {
      if (current !== null) return current; // a turn is already running
      const next = (index + 1) % flyers.length;
      timeout.current = window.setTimeout(() => {
        /* Swap the sheet and drop back to rest with no transition, so the fold
           never animates in reverse. */
        setSnapping(true);
        setIndex(next);
        setTarget(null);
        frame.current = requestAnimationFrame(() => {
          frame.current = requestAnimationFrame(() => setSnapping(false));
        });
      }, PEEL_MS);
      return next;
    });
  }, [index]);

  useEffect(() => {
    if (held || still) return;
    const timer = window.setInterval(peel, ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [held, still, peel]);

  const beneath = target ?? (index + 1) % flyers.length;

  return (
    <div
      className="portfolio-experiment-card figbuild-flyers"
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
    >
      <div className={`flyer-stage${target !== null ? ' is-peeling' : ''}${snapping ? ' is-snapping' : ''}`}>
        <div className="flyer-sheet-box">
          {/* Revealed as the sheet above it lifts away. */}
          <img className="flyer-sheet flyer-beneath" src={flyerSrc(beneath)} alt="" aria-hidden="true" draggable={false} />
          <img className="flyer-sheet flyer-front" src={flyerSrc(index)} alt={flyers[index].alt} draggable={false} />
          {/* The lifted paper back: the same sheet, mirrored across the fold. */}
          <div className="flyer-fold" aria-hidden="true">
            <img src={flyerSrc(index)} alt="" draggable={false} />
          </div>
        </div>
      </div>
      <span className="card-kind">FigBuild 2025 · Shipped Assets</span>
    </div>
  );
}
