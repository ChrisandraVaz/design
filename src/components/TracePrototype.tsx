'use client';
import {useRef,useState} from 'react';
import {useHydrated} from '@/hooks/useHydrated';
import {FiGrid} from 'react-icons/fi';
import {OriginalTraceStudy} from './TraceStudies';
export function BatteryRing({value=65}:{value?:number}){return <div className="trace-battery-ring"><svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="30"/><circle cx="36" cy="36" r="30" pathLength="100" strokeDasharray={`${value} 100`}/></svg><span>{value}<small>%</small></span></div>}

const steps=[
 {title:'Keep the readings available together.',body:'Battery, connection, and sharing stay in consistent positions. This lets someone refer between them without remembering a value from another view. The shared card establishes their relationship; each circle keeps its own meaning.',note:'Recognition rather than recall',kind:'columns'},
 {title:'Make the grouping visible.',body:'Each value sits closer to its unit and symbol than to the next reading. Equal gaps separate the circles, while the title and outer faces share an inset. Proximity and a common boundary establish groups without adding dividers.',note:'Gestalt grouping · proximity and common region',kind:'inset'},
 {title:'Let the reading lead.',body:'The number receives the most visual weight, followed by its unit. The original 22 MINS tests time remaining, but an estimate needs a dependable model. Percentage is the next direction because it states charge directly. Elapsed location time also needs an explicit “ago.”',note:'Visual hierarchy · value, unit, supporting frame',kind:'labels'},
 {title:'Separate the last share from the next attempt.',body:'An earlier location remains useful even if a newer send fails. Its timestamp should stay visible, with a separate failure mark for the attempt. The person symbol identifies sharing; neither the green ring nor signal bars can confirm delivery.',note:'Visibility of system status',kind:'location'}
];
function Annotations({step}:{step:number}){return <svg className="travel-annotations" viewBox="0 0 330 135.2" aria-hidden="true" data-annotation={steps[step].kind}>{step===0?<g>{[21.5,127.5,233.5].map(x=><rect key={x} x={x} y="48" width="75" height="75"/>)}</g>:step===1?<g><rect x="21.5" y="11" width="287" height="112"/><path className="annotation-wash" d="M0 0h21.5v135.2H0zM308.5 0H330v135.2h-21.5z"/></g>:step===2?<g>{[35,141,247].map(x=><rect key={x} x={x} y="69" width="48" height="36"/>)}</g>:<rect x="233.5" y="48" width="75" height="75"/>}</svg>;}
export default function TracePrototype(){
 const hydrated=useHydrated(),[step,setStep]=useState(0),[guides,setGuides]=useState(true);
 const narrative=useRef<HTMLDivElement>(null);
 const followScroll=()=>{const root=narrative.current;if(!root)return;if(root.scrollHeight-root.scrollTop-root.clientHeight<3){setStep(steps.length-1);return}const readingLine=root.scrollTop+root.clientHeight*.32;let next=0;root.querySelectorAll<HTMLElement>('.trace-scroll-step').forEach((node,i)=>{if(node.offsetTop<=readingLine)next=i});setStep(next)};
 return <section className="trace-workbench travel-workbench" id="decisions" aria-label="Travel glance design decisions">
  <div className="trace-workbench-heading"><div className="trace-section-heading"><span className="trace-kicker">Design rationale</span><h2>Design decisions</h2><p>The readings belong together, but they answer different questions. The hierarchy makes their relationship visible without treating them as one measure of safety.</p></div></div>
  <div className="trace-workbench-columns">
   <div className="trace-reading-pane"><div className="trace-scroll-hint"><span>Design decisions</span></div><div className="trace-decision-scroll" ref={narrative} onScroll={followScroll} tabIndex={0} role="region" aria-label="Scrollable design decisions">
    {steps.map((s,i)=><article key={s.kind} className={`trace-scroll-step ${step===i?'is-current':''}`} tabIndex={0} onFocus={()=>setStep(i)}><span className="trace-step-index">0{i+1}</span><h3>{s.title}</h3><p>{s.body}</p><span className="trace-step-observation">{s.note}</span>{i===steps.length-1&&<a className="trace-decision-next" href="#explorations">Explore the variations ↓</a>}</article>)}
   </div></div>
   <div className="trace-workbench-display"><div className="trace-display-toolbar"><button disabled={!hydrated} className="trace-guide-toggle" aria-pressed={guides} onClick={()=>setGuides(!guides)} aria-label="Toggle design annotations"><FiGrid/></button></div>
    <div className="trace-comparison-stage"><div className="trace-comparison-art"><div className="trace-annotated-product"><OriginalTraceStudy/>{guides&&<Annotations step={step}/>}</div></div><div className="trace-stage-meta" aria-live="polite"><span>{steps[step].note}</span><span>Decision 0{step+1} / 04</span></div></div>
   </div>
  </div>
  <p className="trace-principle-source">Design references: <a href="https://www.nngroup.com/articles/ten-usability-heuristics/" target="_blank" rel="noreferrer">Nielsen’s usability heuristics ↗</a> and <a href="https://dictionary.apa.org/common-region" target="_blank" rel="noreferrer">common-region grouping ↗</a>. These informed the design; they do not substitute for testing it.</p>
 </section>;
}
