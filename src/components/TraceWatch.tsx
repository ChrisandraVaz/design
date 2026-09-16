'use client';
import {useId} from 'react';
import {OriginalTraceStudy} from './TraceStudies';
import './trace-watch.css';

/** Device and screen are drawn here; no screenshot is embedded in the mockup. */
export default function TraceWatch(){
 const id=useId().replace(/:/g,'');
 return <div className="trace-watch-device" role="img" aria-label="Trace recreated on a purple-band Apple Watch">
  <svg className="trace-watch-hardware" viewBox="0 0 764 1204" aria-hidden="true">
   <defs>
    <linearGradient id={`${id}-band`} x1="0" y1="0" x2=".22" y2="1"><stop stopColor="#b7bceb"/><stop offset=".25" stopColor="#898fbd"/><stop offset=".62" stopColor="#626d9c"/><stop offset="1" stopColor="#b6bdea"/></linearGradient>
    <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2=".35"><stop stopColor="#d1d1d2"/><stop offset=".03" stopColor="#343437"/><stop offset=".12" stopColor="#101012"/><stop offset=".5" stopColor="#3a3a3d"/><stop offset=".89" stopColor="#111112"/><stop offset=".96" stopColor="#9a9a9b"/><stop offset="1" stopColor="#262628"/></linearGradient>
    <linearGradient id={`${id}-glass`} x1="0" y1="0" x2=".3" y2="1"><stop stopColor="#c6c6c8"/><stop offset=".09" stopColor="#464649"/><stop offset=".3" stopColor="#111114"/><stop offset=".95" stopColor="#010102"/><stop offset="1" stopColor="#626268"/></linearGradient>
    <linearGradient id={`${id}-land`} x1="0" y1="0" x2=".2" y2="1"><stop stopColor="#7d842f"/><stop offset=".3" stopColor="#353e28"/><stop offset=".7" stopColor="#1d2835"/><stop offset="1" stopColor="#54787a"/></linearGradient>
    <linearGradient id={`${id}-time`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#eeeece"/><stop offset="1" stopColor="#9a9c98"/></linearGradient>
    <linearGradient id={`${id}-weather`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#3d8bbb"/><stop offset="1" stopColor="#95d8f8"/></linearGradient>
    <filter id={`${id}-blur`}><feGaussianBlur stdDeviation="23"/></filter>
    <clipPath id={`${id}-screen`}><rect x="93" y="266" width="569" height="680" rx="122"/></clipPath>
   </defs>
   <path d="M172 256c28-46 26-161 47-199C248 8 506 8 546 51c27 32 15 134 46 201ZM161 936c32 59 32 164 61 213 34 53 283 54 323 11 25-28 18-145 47-218Z" fill={`url(#${id}-band)`} stroke="#c1c6eb" strokeWidth="2"/>
   <rect x="687" y="395" width="61" height="126" rx="29" fill={`url(#${id}-metal)`} stroke="#171718" strokeWidth="4"/>
   {Array.from({length:10},(_,i)=><path key={i} d={`M707 ${407+i*10}h28`} stroke="#09090b" strokeWidth="5" strokeLinecap="round"/>)}
   <rect x="47" y="216" width="660" height="780" rx="170" fill="#030304" stroke="#929294" strokeWidth="3"/>
   <rect x="55" y="225" width="644" height="760" rx="161" fill={`url(#${id}-metal)`} stroke="#101013" strokeWidth="5"/>
   <rect x="67" y="238" width="620" height="734" rx="153" fill={`url(#${id}-glass)`} stroke="#010102" strokeWidth="5"/>
   <g clipPath={`url(#${id}-screen)`}>
    <rect x="93" y="266" width="569" height="680" fill={`url(#${id}-land)`}/>
    <g filter={`url(#${id}-blur)`}><path d="M76 320l190 50 23-121 142 96 188-58 78 125-240 49-216-17Z" fill="#a0a942"/><path d="M110 525l86-118 98 77 78-66 147 54 116-72 54 143-80 132-269-37Z" fill="#1a2534" opacity=".8"/></g>
    <text x="134" y="407" fill="#d5da7c" fontSize="58" fontWeight="400">TUE<tspan x="134" dy="67">APR</tspan><tspan x="134" dy="68" opacity=".4">1</tspan></text>
    <text x="610" y="447" fill={`url(#${id}-time)`} stroke="#e1e2c54a" strokeWidth="1" textAnchor="end" fontSize="118" fontWeight="650" letterSpacing="-9">10<tspan x="610" dy="100">09</tspan></text>
    <rect x="180" y="811" width="394" height="116" rx="28" fill="#1b3b51" stroke="#7fb2c261" strokeWidth="2"/>
    <text x="230" y="908" fontSize="21" fill="#62a2c7">♥</text><g stroke="#62a2c7" fill="none" strokeWidth="3"><path d="M326 891v12m0-10c-10-7-17 5-17 13 0 5 12 5 14 0m6-13c10-7 17 5 17 13 0 5-12 5-14 0"/><path d="M417 901v-9a4 4 0 0 1 8 0v9a7 7 0 1 1-8 0Z"/><path d="M421 894v11"/></g><path d="M492 892v17m0-8h40v8m-38-14h36v9h-36z" stroke="#62a2c7" strokeWidth="5" fill="none"/>
    <rect x="143" y="749" width="467" height="133" rx="35" fill={`url(#${id}-weather)`} stroke="#b5e7fb" strokeWidth="2"/>
    <text x="169" y="850" fontSize="68" fill="#d4e8ed">65°</text><text x="565" y="849" textAnchor="end" fontSize="37" fill="#d4e8ed">L:50°</text>
   </g>
  </svg>
  <div className="trace-watch-screen-widget"><OriginalTraceStudy label="Trace on the Watch display"/></div>
 </div>;
}
