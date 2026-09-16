'use client';

import {useId} from 'react';
import {mixTraceColor,traceMaterials,traceSegmentMaterials,type TraceTone} from '../lib/trace-materials';

export type TraceReading = 'battery'|'connection'|'location';
type DialProps = {kind:TraceReading;variant:number;tone:TraceTone;label:string};
const precision=(n:number)=>Number(n.toFixed(5));
function point(t:number,r=66){const a=(140+t*260)*Math.PI/180;return {x:precision(80+r*Math.cos(a)),y:precision(80+r*Math.sin(a))};}
function arc(start=0,end=1){const a=point(start),b=point(end);return `M${a.x} ${a.y} A66 66 0 ${end-start>180/260?1:0} 1 ${b.x} ${b.y}`;}

export function SharingPerson({x,y=112,scale=1,fill,tone='green',mark='sent'}:{x?:number;y?:number;scale?:number;fill:string;tone?:TraceTone;mark?:'sent'|'paused'|'failed'|'none'}){
 const id=`trace-person-${useId().replace(/:/g,'')}`,m=traceMaterials[tone];
 const origin=x??precision(80-(mark==='none'?16:17.25)*scale);
 return <g className="trace-person-symbol" transform={`translate(${origin} ${y}) scale(${scale})`} fill={`url(#${id})`}>
  <defs><linearGradient id={id} x1="0" y1="0" x2="34.5" y2="37" gradientUnits="userSpaceOnUse"><stop stopColor={m.light}/><stop offset=".5" stopColor={fill}/><stop offset="1" stopColor={m.deep}/></linearGradient></defs>
  <circle cx="16" cy="8" r="7"/><path d="M0 33c0-19 32-19 32 0Z"/>
  {mark!=='none'&&<><circle cx="27" cy="29" r="7.5" stroke="#000" strokeWidth="1.5"/><path transform="translate(-4 0)" d={mark==='paused'?'M28 25v8m6-8v8':mark==='failed'?'m27.5 25.5 7 7m0-7-7 7':'m26.5 29 3 3 6-7'} fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></>}
 </g>;
}

/** The studies use one optical grid; each variant changes a named construction choice. */
export default function TraceStudyDial({kind,variant,tone,label}:DialProps){
 const id=`trace-dial-${useId().replace(/:/g,'')}`,m=traceMaterials[tone],segmentMaterial=kind==='connection'?traceSegmentMaterials[tone]:m,paint=`url(#${id})`;
 const segmented=(kind==='battery'&&variant===3)||(kind==='connection'&&(variant===0||variant===1||variant===5));
 const amount=kind==='battery'&&[1,3,4,5,6,7].includes(variant)?.65:kind==='connection'&&segmented?.4:1;
 const ringWidth=variant===6?8:13;
 const marker=kind==='battery'&&variant===5;
 const markerPosition=point(.65);
 const hasBars=kind==='connection'&&![1,4,5].includes(variant);
 const largeBars=kind==='connection'&&variant===3;
 const signalCross=hasBars&&![3,7].includes(variant);
 const signalY=94;
 const signalStep=largeBars?11:10;
 const signalWidth=largeBars?8.5:8;
 const signalSpan=4*signalStep+signalWidth;
 const signalX=80-(signalSpan+(signalCross?16:0))/2;
 const stateBadge=variant===7;
 const n=(value:string,y:number,size=52,x=80)=><text x={value==='12'?x-2:x} y={y} textAnchor="middle" fontSize={size} fontWeight="500" letterSpacing="0" fill="#f5f5f7">{value}</text>;
 const unit=(value:string,y:number,size=24,x=80)=><text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="500" letterSpacing="-.4" fill="#f5f5f7">{value}</text>;
 const badge=(value:string,bottom=false)=><g className="trace-percentage-badge"><rect x={bottom?55:100} y={bottom?133:11} width="45" height="25" rx="12.5" fill="#000"/><text x={bottom?77.5:122.5} y={bottom?151:29} textAnchor="middle" fill={m.ink} fontSize="17" fontWeight="500">{value}</text></g>;
 return <svg className="ts-gauge trace-study-dial" viewBox="0 0 160 160" role="img" aria-label={label} data-reading={kind} data-variant={variant} data-tone={tone}>
  <defs><linearGradient id={id} x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse"><stop stopColor={m.light}/><stop offset=".48" stopColor={m.mid}/><stop offset="1" stopColor={m.deep}/></linearGradient></defs>
  <circle cx="80" cy="80" r="80" fill="#000"/>
  {kind==='battery'&&variant===7?<>
   <circle className="trace-dial-track" cx="80" cy="80" r="66" fill="none" stroke={m.track} strokeWidth={ringWidth}/>
   <path className="trace-dial-arc" d="M80 14a66 66 0 1 1 0 132a66 66 0 1 1 0-132" pathLength="100" strokeDasharray="65 100" fill="none" stroke={paint} strokeWidth={ringWidth} strokeLinecap="round"/>
  </>:kind==='connection'&&variant===5?Array.from({length:5},(_,i)=><path key={i} className={i<2?'trace-segment-active':'trace-segment-track'} d={arc(i*.2+.015,(i+1)*.2-.035)} fill="none" stroke={i<2?paint:'#333337'} strokeWidth="13" strokeLinecap="round"/>):segmented?Array.from({length:20},(_,i)=>{
   const p=point(i/19),light=Math.max(0,Math.min(1,((p.x+p.y)-40)/240));
   const active=i<Math.round(amount*20),color=light<.48?mixTraceColor(segmentMaterial.light,segmentMaterial.mid,light/.48):mixTraceColor(segmentMaterial.mid,segmentMaterial.deep,(light-.48)/.52);
   return <rect className={active?'trace-segment-active':'trace-segment-track'} key={i} x={p.x-4.7} y={p.y-7.2} width="9.4" height="14.4" rx="2.7" fill={active?color:'#333337'} transform={`rotate(${precision(140+i/19*260+90)} ${p.x} ${p.y})`}/>;
  }):<>
   <path className="trace-dial-track" d={arc()} fill="none" stroke={m.track} strokeWidth={ringWidth} strokeLinecap="round"/>
   <path className="trace-dial-arc" d={arc()} pathLength="100" strokeDasharray={`${amount*100} 100`} fill="none" stroke={paint} strokeWidth={ringWidth} strokeLinecap="round"/>
  </>}
  {marker&&<circle cx={markerPosition.x} cy={markerPosition.y} r="8" fill={m.ink} stroke="#030305" strokeWidth="4"/>}
  {kind==='battery'&&<>
   {[0,2].includes(variant)&&<>{n('22',94,55)}{unit('MINS',121,25)}{badge('65%',variant===2)}</>}
   {[1,3,5,6].includes(variant)&&<>{n('65',96,54)}{unit('%',123,23)}</>}
   {variant===4&&<><g className="trace-battery-symbol" fill="none" stroke={paint} strokeWidth="3.5"><rect x="49" y="48" width="58" height="30" rx="6"/><path d="M112 57v12" strokeLinecap="round"/><rect x="54" y="53" width="31.2" height="20" rx="2" fill={paint} stroke="none"/></g>{n('65%',119,34)}</>}
   {variant===7&&<><text x="78" y="94" textAnchor="middle" fontSize="52" letterSpacing="-2" fill="#f5f5f7">65<tspan fontSize="23" letterSpacing="0">%</tspan></text><g fill="none" stroke={paint} strokeWidth="2.6"><rect x="63" y="110" width="31" height="14" rx="3"/><path d="M98 114v6"/><rect x="67" y="114" width="14.95" height="6" rx="1" fill={paint} stroke="none"/></g></>}
  </>}
  {kind==='connection'&&<>
   {hasBars&&<g className="trace-signal-bars">{[0,1,2,3,4].map(i=>{const step=largeBars?6:5;return <rect key={i} x={signalX+i*signalStep} y={signalY-(i+1)*step} width={signalWidth} height={(i+1)*step} rx="2" fill={i<2?paint:'#252529'}/>})}{signalCross&&<path d={`m${signalX+signalSpan+6} 91 10 10m0-10-10 10`} fill="none" stroke={paint} strokeWidth="2.8" strokeLinecap="round"/>}</g>}
   {[1,5].includes(variant)&&<>{n('Low',93,43)}{unit('Signal',123,21)}</>}
   {variant===4&&<><g className="trace-radio-waves" fill="none" stroke={paint} strokeWidth="6" strokeLinecap="round"><path d="M48 66q32-24 64 0" opacity=".25"/><path d="M59 77q21-16 42 0" opacity=".42"/><path d="M70 88q10-8 20 0"/><circle cx="80" cy="99" r="3.3" fill={paint} stroke="none"/></g>{unit('LOW',129,25)}</>}
   {hasBars&&unit('LOW',largeBars?132:129,25)}
   {stateBadge&&<g className="trace-disconnect-badge"><circle cx="128" cy="29" r="15" fill="#000"/><path d="m121 22 14 14m0-14-14 14" fill="none" stroke={m.ink} strokeWidth="3.3" strokeLinecap="round"/></g>}
  </>}
  {kind==='location'&&<>
   {[0,6,7].includes(variant)&&<>{n('12',82,57)}{unit('HRS',109,25)}<SharingPerson tone={tone} fill={m.ink} mark={variant===7?'none':'sent'} y={116} scale={.94}/></>}
   {variant===1&&<><SharingPerson tone={tone} fill={m.ink} y={43} scale={1.6}/>{unit('12h ago',133,22)}</>}
   {variant===2&&<><g fill="none" stroke={paint} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m69 43 8 8 16-19"/></g>{n('12h',101,46)}{unit('ago',127,22)}</>}
   {variant===3&&<><path className="trace-send-symbol" d="m55 72 50-26-17 48-9-17-24-5Zm24 5 26-31" fill="none" stroke={paint} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/>{unit('12h ago',133,22)}</>}
   {variant===4&&<>{unit('LAST SHARED',54,12)}{n('10:09',96,35)}{unit('12h ago',123,21)}</>}
   {variant===5&&<>{n('12',88,48,65)}{unit('HRS',112,19,65)}<SharingPerson tone={tone} fill={m.ink} x={96} y={62} scale={.67}/></>}
   {stateBadge&&<g className="trace-confirmation-badge"><circle cx="129" cy="30" r="16" fill="#000"/><path d="m120 29 6 6 12-14" fill="none" stroke={m.ink} strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round"/></g>}
  </>}
 </svg>;
}

/** State surface: history remains a number, and the person carries the new result. */
export function TraceSharingState({age,unit='ago',state,label,tone:studyTone}:{age:string;unit?:string;state:'sent'|'paused'|'failed'|'history';label:string;tone?:TraceTone}){
 const id=`trace-share-${useId().replace(/:/g,'')}`;
 const tone=studyTone??(state==='paused'?'amber':state==='failed'?'red':'green'),m=traceMaterials[tone];
 return <svg className="ts-gauge trace-sharing-state" viewBox="0 0 160 160" role="img" aria-label={label} data-sharing-state={state}>
  <defs><linearGradient id={id} x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse"><stop stopColor={m.light}/><stop offset=".48" stopColor={m.mid}/><stop offset="1" stopColor={m.deep}/></linearGradient></defs>
  <circle cx="80" cy="80" r="80" fill="#000"/>
  <path className="trace-sharing-frame" d={arc()} fill="none" stroke={`url(#${id})`} strokeWidth="13" strokeLinecap="round"/>
  <text x="80" y="83" fill="#f5f5f7" textAnchor="middle" fontSize={age.length>2?'42':'51'} fontWeight="500" letterSpacing="-1.8">{age}</text>
  <text x="80" y="109" fill="#f5f5f7" textAnchor="middle" fontSize="24" fontWeight="500">{unit}</text>
  <SharingPerson tone={tone} y={116} scale={.94} fill={m.ink} mark={state==='history'?'none':state}/>
 </svg>;
}
