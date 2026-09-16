import type {Metadata} from 'next';
import Link from 'next/link';
import TracePrototype from '@/components/TracePrototype';
import TraceReferences from '@/components/TraceReferences';
import TraceLayoutStudy from '@/components/TraceLayoutStudy';
import {OriginalTraceStudy} from '@/components/TraceStudies';
import TraceExplorationBoards from '@/components/TraceExplorationBoards';
import TraceMotion from '@/components/TraceMotion';
import TraceWatchAnchor from '@/components/TraceWatchAnchor';
import TraceSystemStudy from '@/components/TraceSystemStudy';
import './trace.css';
import './travel-case.css';
import './trace-editorial.css';
export const metadata:Metadata={title:'Designing for the solo journey | Chrisandra Vaz',description:'A watchOS travel status concept exploring how power, connectivity, and a shared location can support decisions during a solo trip.'};
export default function TracePage(){return <main className="trace-case travel-case">
 <nav className="trace-nav"><Link href="/" aria-label="Back to home">←</Link></nav>
 <div className="trace-opening trace-editorial-opening">
  <header className="trace-header"><span className="trace-kicker">Trace · A watchOS exploration in travel status</span><h1>Designing for<br/>the solo journey</h1></header>
  <figure className="trace-opening-image trace-hero-board"><div className="trace-hero-watch"><TraceWatchAnchor/></div><div className="trace-hero-detail"><OriginalTraceStudy label="Enlarged Trace overview"/></div><figcaption>The original Watch composition and the Trace component.</figcaption></figure>
  <dl className="trace-project-facts"><div><dt>Role</dt><dd>Product &amp; interaction design</dd></div><div><dt>Platform</dt><dd>Apple Watch</dd></div><div><dt>Project</dt><dd>Independent concept, 2026</dd></div></dl>

 </div>
 <section className="trace-narrative trace-problem-compact"><div><span className="trace-kicker">Overview</span><h2>How can Apple Watch support more independent travel?</h2></div><p>Trace is the working title for a travel status concept. It explores how power, connectivity, and a shared location can help someone traveling alone decide when to conserve charge, find a connection, or update a person they trust.</p></section>
 <section className="travel-evidence" aria-label="Published solo travel research"><div className="travel-stat"><span className="trace-kicker">Context · Solo travel</span><strong>41<span>%</span></strong><p>of solo travelers in Hostelworld’s survey said safety was a concern.</p></div><div className="travel-evidence-copy"><h2>Independence still involves staying in touch.</h2><p>23% reported sharing travel plans or location. This supports exploring how people stay connected during a trip; it does not establish demand for another tracking app.</p><p>Hostelworld community poll of 3,334 solo travelers, July 2025.</p><a href="https://www.hostelworld.com/state-of-solo-travel" target="_blank" rel="noreferrer">State of Solo Travel 2025 ↗</a></div></section>
 <section className="trace-narrative trace-problem-compact" id="intent"><div><span className="trace-kicker">The problem</span><h2>Changing conditions can limit what a traveler can do next.</h2></div><p>A low battery affects access to directions and communication. A connection affects which requests can go through. A shared location tells someone where you were. The design challenge is to make these limits understandable while someone is focused on the trip.</p></section>
 <section className="trace-travel-insight" aria-labelledby="trace-insight-title"><header><span className="trace-kicker">Design insight</span><h2 id="trace-insight-title">Each reading should support a different decision.</h2></header><div className="trace-insight-readings"><article><h3>Power</h3><p>Identify the device and its charge, so the traveler can decide when to conserve power or recharge.</p></article><article><h3>Connection</h3><p>Explain the available connection. Weak reception, an unavailable service, and an unsuccessful send need different meanings.</p></article><article><h3>Last shared</h3><p>Keep the time and sharing context visible, so the traveler can decide whether someone needs a newer update.</p></article></div></section>
 <section className="trace-narrative trace-problem-compact trace-ecosystem-context"><div><span className="trace-kicker">Product opportunity</span><h2>Build on the capabilities already in watchOS.</h2></div><div className="trace-ecosystem-copy"><p>Control Center already shows power and connection. Check In already has a Smart Stack widget and can share battery, network, and location details. I would explore this as a system-level travel view, with a route into those existing tools. Its value would be helping the traveler interpret conditions and choose an action.</p><p className="trace-ecosystem-sources"><a href="https://support.apple.com/guide/watch/use-control-center-apd06bc15da1/26/watchos/26" target="_blank" rel="noreferrer">Control Center ↗</a><a href="https://support.apple.com/guide/watch/use-check-in-apd7f329202c/watchos" target="_blank" rel="noreferrer">Check In ↗</a><a href="https://support.apple.com/en-ca/guide/iphone/iphc143bb7e9/26/ios/26" target="_blank" rel="noreferrer">Shared information ↗</a></p></div></section>
 <TracePrototype/>
 <TraceLayoutStudy/>
 <TraceReferences/>
 <TraceExplorationBoards/>
 <TraceSystemStudy/>
 <section className="trace-narrative trace-problem-compact"><div><span className="trace-kicker">The outcome</span><h2>A visual direction for travel status.</h2></div><p>The exploration brings together 24 layouts, three color treatments, and a shared grid. The next prototype would connect readings to actions and test whether travelers understand the device, freshness, and meaning of each value. Native integration and traveler testing remain open.</p></section>
 <TraceMotion/>
 <footer className="trace-end"><Link href="/">← Back to the canvas</Link></footer>
 </main>}
