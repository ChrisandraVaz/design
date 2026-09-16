"use client";
import { useEffect, useRef, useState } from "react";
import AgentSurface from "./AgentSurface";
const decisions = [
  { title:"Start with intent", text:"The task comes first, with its source material close by. A person should understand what the agent is about to do before they need to understand how it works.", detail:"01 · Context before execution", overlay:0 },
  { title:"Make progress legible", text:"A compact sequence separates what has happened from what needs attention. Each step has a plain-language label and a small piece of evidence, instead of a single indefinite spinner.", detail:"02 · Visible state", overlay:1 },
  { title:"Design the handoff", text:"The agent pauses at a clear checkpoint. The action explains what happens next, and the supporting copy makes the boundary explicit: nothing is saved until a person approves.", detail:"03 · Human agency", overlay:2 },
  { title:"Give every layer room", text:"A shared 8px spacing scale keeps the component predictable. The 24px content inset aligns the task, progress, and approval surfaces. Red bands show that common edge.", detail:"04 · 24px inset / 8px rhythm", overlay:3 },
  { title:"Try the state transition", text:"Hide the guides and run the demo. It moves from ready, to working, to review, to complete. This is an independent interaction study with simulated data; no model or external API is connected.", detail:"05 · Interactive prototype", overlay:-1 },
];
export default function DesignWalkthrough() {
  const [version,setVersion] = useState<"before"|"after">("after");
  const [active,setActive] = useState(0);
  const [guides,setGuides] = useState(true);
  const [state,setState] = useState<"ready"|"running"|"review"|"done">("ready");
  const narrative = useRef<HTMLDivElement>(null);
  useEffect(() => { if(state !== "running") return; const timer = setTimeout(() => setState("review"),1600); return () => clearTimeout(timer); },[state]);
  return <section className="walkthrough" aria-label="Interactive interface design walkthrough">
    <header className="walkthrough-heading"><div><span className="walkthrough-eyebrow">Anatomy of an interaction</span><h2>Small decisions. Clearer agency.</h2></div><div className="walkthrough-switch" role="group" aria-label="Compare component iterations">{(["before","after"] as const).map(v => <button key={v} aria-pressed={version===v} onClick={()=>setVersion(v)}>{v === "before" ? "Before" : "After"}</button>)}</div></header>
    <div className="walkthrough-body">
      <div className="walkthrough-narrative" ref={narrative} tabIndex={0} role="region" aria-label="Scroll through design decisions" onScroll={event=>{const root=event.currentTarget;let closest=0,distance=Infinity;Array.from(root.children).forEach((panel,index)=>{const d=Math.abs(panel.getBoundingClientRect().top-root.getBoundingClientRect().top-32);if(d<distance){closest=index;distance=d;}});setActive(closest);}}>
        {decisions.map((d,i)=><article key={d.title} className={`walkthrough-step ${active===i?"active":""}`}><button className="walkthrough-step-link" onClick={()=>{setActive(i);const root=narrative.current;if(root)root.scrollTo({top:(root.children[i] as HTMLElement).offsetTop-32,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}><span>0{i+1}</span><h3>{d.title}</h3></button><p>{d.text}</p><small>{d.detail}</small></article>)}
      </div>
      <div className="walkthrough-preview"><div className="walkthrough-live-art"><AgentSurface state={state} before={version==="before"} overlay={guides?decisions[active].overlay:-1} onRun={()=>setState("running")} onApprove={()=>setState("done")} onReset={()=>setState("ready")} /></div><div className="walkthrough-caption"><span aria-live="polite">{decisions[active].detail}</span><button aria-pressed={guides} onClick={()=>setGuides(!guides)}>{guides?"Hide":"Show"} guides</button></div></div>
    </div><p className="walkthrough-hint">Scroll the explanation to explore. Before / After compares the initial and refined component layouts.</p>
  </section>;
}
