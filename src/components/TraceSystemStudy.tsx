export default function TraceSystemStudy(){return <section className="trace-system-study" aria-labelledby="trace-system-title">
 <header className="trace-section-heading"><span className="trace-kicker">Component system</span><h2 id="trace-system-title">What the component needs to know.</h2><p>The web prototype uses reusable components, shared color tokens, and a consistent optical grid. Their props control the reading, layout, and tone. Native integration would also need to establish the device, observation time, and result behind each value.</p></header>
 <figure className="trace-system-board" aria-label="Proposed data flow from device readings through interpretation to the travel interface">
  <div className="trace-system-flow">
   <div className="trace-system-node"><span>01 / Source</span><h3>Observe separately</h3><ul><li>Device and battery reading</li><li>Available connection</li><li>Sharing record and attempt</li></ul></div>
   <svg className="trace-system-arrow" viewBox="0 0 32 24" aria-hidden="true"><path d="M2 12h26m-7-7 7 7-7 7"/></svg>
   <div className="trace-system-node"><span>02 / Meaning</span><h3>Preserve the context</h3><ul><li>Which device supplied it?</li><li>When was it observed?</li><li>What is actually confirmed?</li></ul></div>
   <svg className="trace-system-arrow" viewBox="0 0 32 24" aria-hidden="true"><path d="M2 12h26m-7-7 7 7-7 7"/></svg>
   <div className="trace-system-node"><span>03 / Interface</span><h3>Support an action</h3><ul><li>Keep value and unit together</li><li>Name the condition</li><li>Open the relevant tool</li></ul></div>
  </div>
  <figcaption>Proposed native data contract. A connection can be available while an update fails; that failure must not overwrite the earlier sharing record.</figcaption>
 </figure>
</section>}
