'use client';

import {useEffect,useRef,useState} from 'react';
import {OriginalTraceStudy} from './TraceStudies';

export default function TraceMotion(){
 const [paused,setPaused]=useState(false);
 const [visible,setVisible]=useState(false);
 const stage=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=stage.current;
  if(!element)return;
  let inView=false;
  const sync=()=>setVisible(inView&&!document.hidden);
  const observer=new IntersectionObserver(([entry])=>{inView=entry.intersectionRatio>=.25;sync();},{threshold:.25});
  observer.observe(element);
  document.addEventListener('visibilitychange',sync);
  return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);};
 },[]);
 return <section className="trace-motion" id="motion" aria-labelledby="trace-motion-title">
  <header className="trace-section-heading">
   <h2 id="trace-motion-title">Solution</h2>
   <p className="trace-solution-intro">The original Trace composition brings power, connection, and a shared location into a compact travel view. It establishes the visual direction for the proposed watchOS feature.</p>
  </header>
  <div ref={stage} className="trace-zoom-stage" role="group" aria-label="Trace solution presentation" data-playing={visible&&!paused}>
   <div className="trace-zoom-sequence">
    <div className="trace-zoom-watch" aria-hidden="true">
     {/* Use the supplied photograph without redrawing or overlaying its screen. */}
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src="/trace/watch-cover.png" width={764} height={1204} alt="" loading="lazy" decoding="async" draggable={false}/>
    </div>
    <div className="trace-zoom-hero"><OriginalTraceStudy label="Final Trace component"/></div>
   </div>
   <div className="trace-zoom-controls">
    <button type="button" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Play solution motion':'Pause solution motion'}>
     <svg viewBox="0 0 24 24" aria-hidden="true">{paused?<path d="m8 5 11 7-11 7z" fill="currentColor"/>:<g fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></g>}</svg>
    </button>
   </div>
  </div>
 </section>;
}
