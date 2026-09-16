import {ColorStudyWidget,OriginalTraceStudy} from './TraceStudies';
import TraceStudyDial,{type TraceReading} from './TraceStudyDial';
import './trace-exploration-boards.css';

const tones=['green','amber','red'] as const;
const families:Record<TraceReading,{title:string;note:string}[]>={
 battery:[
  {title:'Time + upper badge',note:'The percentage sits in a cutout at the top of the ring.'},
  {title:'Percentage in the ring',note:'The number and the arc both show 65%.'},
  {title:'Time + lower badge',note:'The opening below the ring makes room for the percentage.'},
  {title:'Segmented charge',note:'Thirteen of twenty segments carry the charge reading.'},
  {title:'Battery symbol',note:'The silhouette identifies battery before the number is read.'},
  {title:'Marked endpoint',note:'A dark collar separates the endpoint from the arc.'},
  {title:'Fine arc',note:'A lighter perimeter gives the percentage more room.'},
  {title:'Closed percentage',note:'A closed ring treats charge as a fraction of a whole.'},
 ],
 connection:[
  {title:'Segments + bars',note:'The perimeter repeats the bar pattern. The cross adds a separate disconnect mark.'},
  {title:'Word-led signal',note:'Low takes the center; the segments stay at the edge.'},
  {title:'Continuous frame',note:'A smooth perimeter replaces the individual segments.'},
  {title:'Larger bars',note:'The bars expand into the center of the dial.'},
  {title:'Radio waves',note:'The radio symbol tests recognition without counting bars.'},
  {title:'Five levels',note:'Two of five arc sections repeat the bar scale.'},
  {title:'Fine arc',note:'The thinner edge leaves more space around the disconnect mark.'},
  {title:'Mark on the rim',note:'The disconnect mark moves out of the bar cluster.'},
 ],
 location:[
  {title:'Time + person',note:'The original hierarchy: time, unit, then the sharing symbol.'},
  {title:'Person + caption',note:'The person grows; the timestamp moves underneath.'},
  {title:'Confirmation above time',note:'A small confirmation mark sits above the last shared time.'},
  {title:'Send symbol',note:'A send arrow tests whether the action reads more clearly.'},
  {title:'Recorded clock time',note:'The clock time leads, with elapsed time underneath.'},
  {title:'Time beside the person',note:'The number and symbol share one line of sight.'},
  {title:'Fine arc',note:'The same hierarchy with less weight at the edge.'},
  {title:'Confirmation on the rim',note:'The confirmation gets its own cutout in the frame.'},
 ],
};

function StudyBoard({kind}:{kind:TraceReading}){
 const reading=(index:number)=>kind==='battery'?[0,2].includes(index)?'22 minutes, 65 percent charge; illustrative runtime estimate':'65 percent charge':kind==='connection'?'low signal':index===4?'last shared at 10:09, 12 hours ago':'last shared 12 hours ago';
 return <div className="ts-black-board ts-variant-board" data-study={kind}>
  <div className="trace-study-legend"><span>Color passes · fixed sample readings</span></div>
  {families[kind].map((family,index)=><figure className="ts-treatment" key={family.title}>
   <div className="ts-treatment-samples trace-study-surface">{tones.map(tone=><div key={tone}><TraceStudyDial kind={kind} variant={index} tone={tone} label={`${family.title}, ${tone==='amber'?'yellow':tone} palette: ${reading(index)}`}/></div>)}</div>
   <figcaption><h4><span>{String(index+1).padStart(2,'0')}</span>{family.title}</h4><p>{family.note}</p></figcaption>
  </figure>)}
 </div>;
}

export default function TraceExplorationBoards(){return <section className="ts-explorations" id="explorations" aria-label="Recreated Trace explorations">
 <header className="ts-editorial trace-section-heading"><span className="trace-kicker">Form &amp; color</span><h2>Explorations</h2><p>I explored each reading separately before bringing them back into the same card. Eight layouts per reading compare what leads, what identifies the information, and how much the frame contributes. Each is shown in three color treatments.</p></header>
 <article className="ts-study ts-study-wide" id="battery-studies"><div className="ts-study-copy"><span>01 / Battery · 8 layouts, 24 color studies</span><h3>Time remaining is useful only if the estimate is trustworthy.</h3><p>The original pairs 22 minutes with a 65% badge. Percentage is the stronger next direction: it describes charge without predicting how long it will last. These studies compare whether the number, symbol, or ring makes that reading clearest.</p></div><StudyBoard kind="battery"/></article>
 <article className="ts-study ts-study-wide" id="connection-studies"><div className="ts-study-copy"><span>02 / Connection · 8 layouts, 24 color studies</span><h3>A connection needs more context than a set of bars.</h3><p>Bars offer a familiar indication of strength; Low makes the interpretation explicit. I compared bars, segments, and radio waves. The product would also need to identify the available connection, since reception alone cannot confirm that a call, message, or update will go through.</p></div><StudyBoard kind="connection"/></article>
 <article className="ts-study ts-study-wide" id="location-studies"><div className="ts-study-copy"><span>03 / Last shared · 8 layouts, 24 color studies</span><h3>The last shared time must remain readable.</h3><p>I compared time-led and symbol-led arrangements. The timestamp carries the useful detail; the person identifies what it refers to. Unlike charge, elapsed time is not progress toward a target, so this frame stays fixed.</p></div><StudyBoard kind="location"/></article>
 <article className="ts-color-comparison" id="color-study">
  <div className="ts-study-copy"><span>Color study</span><h3>Keep the material consistent. Give changes in color a reason.</h3><p>The rainbow study established the luminous arcs. The green direction carries that depth into a quieter palette. Yellow and red explore attention states using the same light-to-dark gradient, so a status change does not introduce a different visual language.</p></div>
  <div className="trace-color-originals">
   <figure><div className="ts-black-board trace-approved-art"><ColorStudyWidget/></div><figcaption><span>01 / The spectrum exploration</span><p>A continuous sweep from cyan to crimson.</p></figcaption></figure>
   <figure><div className="ts-black-board trace-approved-art"><OriginalTraceStudy label="Approved green Trace direction"/></div><figcaption><span>02 / The green direction</span><p>A violet-black surface and one luminous hue.</p></figcaption></figure>
  </div>
  <div className="trace-material-strip" aria-label="Color roles in the Trace system">
   <article><div className="trace-material-swatch" data-tone="green"/><h4>Green</h4><p>The authored base color links the three readings. Because green can suggest success, words and symbols still need to identify what is confirmed. It cannot stand for “safe.”</p></article>
   <article><div className="trace-material-swatch" data-tone="amber"/><h4>Yellow</h4><p>Proposed for a condition worth checking, such as low charge or weak reception. Pair it with the affected reading and an explicit label. An older timestamp alone is not a warning.</p></article>
   <article><div className="trace-material-swatch" data-tone="red"/><h4>Red</h4><p>Proposed for an unsuccessful action, paired with a failure mark. Keep the last confirmed share visible so attention to the failure does not remove useful history.</p></article>
  </div>
  <p className="ts-color-bridge">The gradients keep the same light direction across all three states, so urgency changes without changing the component’s material.</p>
  <figure className="trace-color-meaning" aria-label="Annotated example of color, location age, and a later unsuccessful update">
   <div className="trace-color-meaning-art"><TraceStudyDial kind="location" variant={0} tone="green" label="Authored location study showing 12 hours with a green ring"/><span>Authored location study</span></div>
   <figcaption><span className="trace-meaning-eyebrow">Interpretation to test</span><h4>Green can make an old update look current.</h4><p>The ring cannot establish freshness. The elapsed time needs to stay explicit. If a newer send fails, red should identify that attempt while the earlier record remains visible.</p>
    <div className="trace-record-timeline" aria-label="An earlier share remains in the history when a new attempt fails"><div><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="4"/></svg><strong>12 hours ago</strong><span>Earlier share</span></div><div><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg><strong>New attempt</strong><span>Update unsuccessful</span></div></div>
   </figcaption>
  </figure>
  <p className="trace-color-accessibility">Color accessibility. If red and green look similar, a change in hue can be missed. The proposed failure treatment therefore pairs a cross with “Update unsuccessful,” while “Last shared 12 hours ago” identifies the earlier record. Naming the event makes the meaning available without identifying its color: an unsuccessful send, weak reception, and an older location need different descriptions. Gradients add depth; words and symbols explain the condition. Contrast, color-vision differences, and readability at Watch size still need testing. <a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank" rel="noreferrer">W3C guidance on color ↗</a></p>
 </article>
 </section>;}
