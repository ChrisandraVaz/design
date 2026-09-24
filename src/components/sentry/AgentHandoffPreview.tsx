'use client';

import {useEffect, useRef, useState} from 'react';
import {AgentDemo} from './SendToAgentDemo';

/** Focused case-study loops: one response to a chosen agent, or the full chat to Claude. */
export default function AgentHandoffPreview({entryPoint}: {entryPoint: 'response' | 'navigation'}) {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(13);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let elapsed = 0;
    let last = 0;
    let frame = 0;
    const tick = (now: number) => {
      if (last) elapsed += now - last;
      last = now;
      const time = elapsed % 11000;
      setStep(time < 2300 ? 13 : time < 4300 ? (entryPoint === 'response' ? 7 : 3) : time < 6600 ? 4 : 5);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      const run = visible && !document.hidden && !reduced.matches;
      setPlaying(run);
      if (reduced.matches) setStep(5);
      if (run) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; sync();}, {threshold: .2});
    observer.observe(element);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {observer.disconnect(); cancelAnimationFrame(frame); reduced.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync);};
  }, [entryPoint]);
  return <div ref={root} className={`agent-handoff-preview is-${entryPoint}`} data-step={step} role="img" aria-label={entryPoint === 'response' ? 'Animation: choose Claude from the response menu, send the response, and receive confirmation.' : 'Animation: click the configured Claude icon in the navigation, send the conversation, and receive confirmation.'}>
    <div className="agent-handoff-window" aria-hidden="true">
      <AgentDemo compact previewStep={step} entryPoint={entryPoint} singleAgent={entryPoint === 'navigation'} paused={!playing} />
      <svg className="agent-handoff-pointer" viewBox="0 0 24 28"><path d="M3 2v22l6-6 4 8 4-2-4-8h8Z" fill="#211b2b" stroke="white" strokeWidth="1.8" strokeLinejoin="round" /></svg>
    </div>
  </div>;
}
