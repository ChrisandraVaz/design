"use client";

import {useEffect, useRef, useState} from "react";
import {AgentDemo, type QueryStage} from "./SendToAgentDemo";
import "./agent-motion.css";

const queryIntro = 4200;
// Hold the menu for exactly one second; shift the original 1.72-second timeline.
const menuHoldMs = 1000;
const menuTimingOffset = menuHoldMs - 1720;
const duration = 14000 + queryIntro + menuTimingOffset;
const ease = "cubic-bezier(.22,1,.36,1)";
const opening = "translate(0,0) scale(.77)";
const closeUpScale = 1.12;
const resultScale = .87;
// Pull back during launch, then hold the complete window through confirmation.
const successAt = 12800 + menuTimingOffset;
const resetAt = 17000 + menuTimingOffset;

/** One clock drives the camera, background, and product state; pausing preserves the shot. */
export default function AgentMotionPreview({paused = false}: {paused?: boolean}) {
  const root = useRef<HTMLDivElement>(null);
  const pauseRef = useRef(paused);
  const syncPlayback = useRef<() => void>(() => {});
  const [step, setStep] = useState(13);
  const [shot, setShot] = useState("thinking");
  const [queryStage, setQueryStage] = useState<QueryStage>("thinking");
  const [queryElapsed, setQueryElapsed] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    pauseRef.current = paused;
    syncPlayback.current();
  }, [paused]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const camera = element.querySelector<HTMLElement>(".agent-film-camera")!;
    const backdrop = element.querySelector<HTMLElement>(".agent-film-backdrop")!;
    const body = element.querySelector<HTMLElement>(".agent-reference-body")!;
    const options: KeyframeAnimationOptions = {duration, iterations: Infinity, fill: "both"};
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const clock = backdrop.animate([
      {transform: "translate3d(0,0,0) scale(1)", offset: 0, easing: "ease-in-out"},
      {transform: "translate3d(0,0,0) scale(1.04)", offset: .5, easing: "ease-in-out"},
      {transform: "translate3d(0,0,0) scale(1)", offset: 1},
    ], options);
    // Pan the whole window until its header clears the stage, without fading it.
    // Match the purple right and bottom gutters at both camera scales.
    const cameraFrames = (): Keyframe[] => {
      const landscapeCorrection = Math.max(0, element.offsetWidth - element.offsetHeight) * .96;
      const closeUpGutter = Math.max(5, Math.min(element.offsetWidth, element.offsetHeight) * .13 - landscapeCorrection);
      const closeUpX = (1 - closeUpScale) * element.offsetWidth / 2 - closeUpGutter;
      const closeUpY = (1 - closeUpScale) * element.offsetHeight / 2 - closeUpGutter;
      const closeUp = `translate(${closeUpX}px,${closeUpY}px) scale(${closeUpScale})`;
      // A centered scale leaves a larger bottom gutter because the film is taller
      // than it is wide. Offset that exact difference to match the right gutter.
      const resultOffsetY = (element.offsetHeight - element.offsetWidth) * (1 - resultScale) / 2;
      const resultView = `translate(0,${resultOffsetY}px) scale(${resultScale})`;
      return [
        {transform: opening, opacity: 1, offset: 0},
        {transform: opening, offset: (1800 + queryIntro) / duration, easing: ease},
        {transform: closeUp, offset: (3200 + queryIntro) / duration},
        // Allow the click to settle, then reveal the whole chat during launch.
        // All response controls stay mounted and move with the same camera.
        {transform: closeUp, offset: 9190 / duration, easing: ease},
        {transform: resultView, opacity: 1, offset: 10390 / duration},
        {transform: resultView, opacity: 1, offset: (17600 + menuTimingOffset) / duration, easing: "ease-in-out"},
        {transform: opening, opacity: 1, offset: (17800 + menuTimingOffset) / duration},
        {transform: opening, opacity: 1, offset: 1},
      ];
    };
    const cameraMotion = camera.animate(cameraFrames(), options);
    const frameSizeObserver = new ResizeObserver(() => {
      (cameraMotion.effect as KeyframeEffect).setKeyframes(cameraFrames());
    });
    frameSizeObserver.observe(element);
    // Refresh only the conversation; the window, navigation and input stay visible.
    const conversationMotion = body.animate([
      {opacity: 1, offset: 0},
      {opacity: 1, offset: (16600 + menuTimingOffset) / duration, easing: "ease-out"},
      {opacity: 0, offset: (16900 + menuTimingOffset) / duration},
      {opacity: 0, offset: (17050 + menuTimingOffset) / duration, easing: ease},
      {opacity: 1, offset: (17400 + menuTimingOffset) / duration},
      {opacity: 1, offset: 1},
    ], options);
    const animations = [clock, cameraMotion, conversationMotion];
    for (const animation of animations) { animation.pause(); animation.currentTime = 0; }
    let visible = false;
    let frame = 0;
    let lastStep = 13;
    let lastShot = "thinking";
    let lastQuery: QueryStage = "thinking";
    let lastElapsed = 0;
    let lastAnswer = false;
    const tick = () => {
      const time = Number(clock.currentTime ?? 0) % duration;
      const handoffTime = time - queryIntro;
      const stage: QueryStage = time < 1000 || time >= resetAt ? "thinking" : time < 3200 ? "querying" : "complete";
      const elapsed = stage === "thinking" ? 0 : Math.min(2.2, Math.floor((time - 1000) / 100) / 10);
      const answer = time >= 3800 && time < resetAt;
      // Read from the top, then make one continuous scroll before the close-up.
      // Deriving it from the film clock keeps seeking and pause deterministic.
      const scrollProgress = answer ? Math.min(1, Math.max(0, (time - 4800) / 1200)) : 0;
      const scrollEase = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
      body.scrollTop = Math.max(0, body.scrollHeight - body.clientHeight) * scrollEase;
      const next = time >= resetAt || handoffTime < 3650 ? 13 : handoffTime < 5550 + menuTimingOffset ? 7 : time < successAt ? 4 : 5;
      const nextShot = time >= 16600 + menuTimingOffset && time < 17800 + menuTimingOffset ? "reset" : stage !== "complete" ? stage : handoffTime < 3650 ? "overview" : handoffTime < 5370 + menuTimingOffset ? "choose" : handoffTime < 5550 + menuTimingOffset ? "select" : time < successAt ? "sending" : "sent";
      if (stage !== lastQuery) { lastQuery = stage; setQueryStage(stage); }
      if (elapsed !== lastElapsed) { lastElapsed = elapsed; setQueryElapsed(elapsed); }
      if (answer !== lastAnswer) { lastAnswer = answer; setAnswerVisible(answer); }
      if (next !== lastStep) { lastStep = next; setStep(next); }
      if (nextShot !== lastShot) { lastShot = nextShot; setShot(nextShot); }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      const run = visible && !document.hidden && !motion.matches && !pauseRef.current;
      setPlaying(run);
      for (const animation of animations) {
        if (run) animation.play();
        else animation.pause();
      }
      if (motion.matches) {
        body.scrollTop = 0;
        for (const animation of animations) animation.currentTime = 0;
        lastStep = 13; lastShot = "overview";
        lastQuery = "complete"; lastElapsed = 2.2; lastAnswer = true;
        setStep(13); setShot("overview");
        setQueryStage("complete"); setQueryElapsed(2.2); setAnswerVisible(true);
      }
      if (run) frame = requestAnimationFrame(tick);
    };
    syncPlayback.current = sync;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, {threshold: .15});
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      frameSizeObserver.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      animations.forEach(animation => animation.cancel());
      syncPlayback.current = () => {};
    };
  }, []);

  return <div ref={root} className="agent-film" data-shot={shot} data-playing={playing} data-paused={paused} aria-hidden="true">
    <div className="agent-film-backdrop" />
    <div className="agent-film-camera">
      <AgentDemo compact previewStep={step} queryStage={queryStage} queryElapsed={queryElapsed} answerVisible={answerVisible} paused={!playing} />
    </div>
  </div>;
}
