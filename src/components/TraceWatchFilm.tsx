'use client';

import {useEffect, useRef, useState} from 'react';
import './trace-watch-film.css';

const LENGTH = 18;
function timeLabel(seconds: number) {
  return `0:${String(Math.floor(seconds)).padStart(2, '0')}`;
}

export default function TraceWatchFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    // Playback is deliberate. Leaving the film or changing motion preferences pauses it.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) element.pause();
    });
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pause = () => element.pause();
    const onVisibility = () => { if (document.hidden) pause(); };
    observer.observe(element);
    preference.addEventListener('change', pause);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', pause);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  async function togglePlayback() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) { element.pause(); return; }
    if (element.ended || element.currentTime >= LENGTH - .05) element.currentTime = 0;
    try { await element.play(); setUnavailable(false); }
    catch { setUnavailable(true); }
  }

  return <figure className="trace-watch-film" aria-labelledby="trace-film-caption">
    <div className="trace-film-picture">
      <video ref={video} src="/trace/watch-motion.mp4" poster="/trace/watch-motion-poster.jpg"
        width={1440} height={1008} muted playsInline preload="none"
        aria-label="Watch film: a front view, gentle turns, and a close-up of the Trace readings"
        aria-describedby="trace-film-description"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)} onTimeUpdate={event => setTime(event.currentTarget.currentTime)}
        onError={() => setUnavailable(true)}/>
      {!playing && time === 0 && <button className="trace-film-start" aria-label="Play Watch film" onClick={togglePlayback}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>
      </button>}
    </div>
    <div className="trace-film-controls" role="group" aria-label="Watch film controls">
      <button onClick={togglePlayback} aria-label={playing ? 'Pause Watch film' : time >= LENGTH - .05 ? 'Replay Watch film' : 'Play Watch film'}>
        <svg viewBox="0 0 24 24" aria-hidden="true">{playing ? <path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" strokeWidth="3"/> : <path d="m9 5 11 7-11 7Z" fill="currentColor"/>}</svg>
      </button>
      <span className="trace-film-time" aria-hidden="true">{timeLabel(time)}</span>
      <input type="range" aria-label="Watch film progress" min={0} max={LENGTH} step={.1} value={time}
        aria-valuetext={`${timeLabel(time)} of 0:18`}
        onChange={event => { const next = Number(event.target.value); setTime(next); if (video.current) { if (video.current.readyState === 0) video.current.load(); video.current.currentTime = next; } }}/>
      <span className="trace-film-time" aria-hidden="true">0:18</span>
    </div>
    <figcaption id="trace-film-caption"><span>The Watch, in motion.</span><span id="trace-film-description">Overview, angles, and a closer look at the three readings.</span></figcaption>
    {unavailable && <p className="trace-film-fallback" role="status">The film couldn’t play here. <a href="/trace/watch-motion.mp4">Open the Watch film ↗</a></p>}
  </figure>;
}
