'use client';
import {useId} from 'react';
import {traceMaterials,traceSegmentMaterials,mixTraceColor} from '../lib/trace-materials';
import {TraceSharingState} from './TraceStudyDial';
import './trace-studies.css';


type Tone='green'|'amber'|'red'|'gray'|'rainbow';
type GaugeProps={value?:string;unit?:string;badge?:string;badgeBottom?:boolean;person?:boolean;iconFirst?:boolean;signal?:boolean;signalCross?:boolean;segments?:boolean;marker?:boolean;markerAt?:number;tone?:Tone;amount?:number;label:string;battery?:boolean;plain?:boolean;signalBars?:number;ringWidth?:number};
const colors={green:'#57ee24',amber:traceMaterials.amber.ink,red:traceMaterials.red.ink,gray:traceMaterials.gray.ink,rainbow:'#57ee24'};
// Trigonometric results differ at machine precision between JS runtimes.
// Fixed SVG precision keeps server markup identical to browser hydration.
function arcPoint(t:number){const a=(140+t*260)*Math.PI/180;return {x:Number((60+49*Math.cos(a)).toFixed(6)),y:Number((60+49*Math.sin(a)).toFixed(6))};}
function arcPart(a:number,b:number){const s=arcPoint(a),e=arcPoint(b);return `M${s.x} ${s.y} A49 49 0 ${b-a>.692?1:0} 1 ${e.x} ${e.y}`;}
const arc=arcPart(0,1);
export function StudyGauge({value='22',unit='MIN',badge,badgeBottom=false,person=false,iconFirst=false,signal=false,signalCross=false,segments=false,marker=false,markerAt=.12,tone='green',amount=1,label,battery=false,plain=false,signalBars=2,ringWidth=10}:GaugeProps){
 const uid=useId().replace(/:/g,'');const color=colors[tone];
 const hasSignalCross=signalCross||tone==='red'||tone==='rainbow'||tone==='gray';
 const material=traceMaterials[tone==='rainbow'?'green':tone];
 const segmentMaterial=traceSegmentMaterials[tone==='rainbow'?'green':tone];
 const segmentFill=(x:number,y:number)=>{const light=Math.max(0,Math.min(1,(x+y-30)/180));return light<.48?mixTraceColor(segmentMaterial.light,segmentMaterial.mid,light/.48):mixTraceColor(segmentMaterial.mid,segmentMaterial.deep,(light-.48)/.52)};
 const rainbow=['#38b5d8','#63d5b7','#8cec79','#c2ec31','#ffe331','#ffc53c','#ff9a3b','#ff6548','#ff394f','#ec1757','#a80036'];
 const dot=arcPoint(markerAt);
 const spectrum=Array.from({length:96},(_,i)=>{const t=i/95*(rainbow.length-1),a=rainbow[Math.floor(t)],b=rainbow[Math.min(rainbow.length-1,Math.floor(t)+1)],f=t%1;return '#'+[1,3,5].map(k=>Math.round(parseInt(a.slice(k,k+2),16)*(1-f)+parseInt(b.slice(k,k+2),16)*f).toString(16).padStart(2,'0')).join('');});
 return <svg className="ts-gauge" viewBox="0 0 120 120" role="img" aria-label={label}>
  <defs><linearGradient id={uid} x1="0" y1="0" x2="1" y2="1"><stop stopColor={tone==='green'?'#b9ff9a':material.light}/><stop offset=".5" stopColor={tone==='green'?color:material.mid}/><stop offset="1" stopColor={tone==='green'?color:material.deep}/></linearGradient></defs>
  <circle cx="60" cy="60" r="60" fill={plain?'#1c1c1e':'#000'}/>
  {!plain&&(segments?Array.from({length:20},(_,i)=>{const a=arcPoint(i/19);return <rect key={i} x={a.x-3.7} y={a.y-5.4} width="7.4" height="10.8" rx="2.2" fill={i<Math.round(amount*20)?(tone==='green'?'#69ca65':segmentFill(a.x,a.y)):'#414144'} transform={`rotate(${140+i/19*260+90} ${a.x} ${a.y})`}/>;}):<><path d={arc} fill="none" stroke={tone==='gray'?'#242427':tone==='amber'?'#3c3118':tone==='red'?'#36191e':'#1c2918'} strokeWidth={ringWidth} strokeLinecap="round"/>{tone==='rainbow'?spectrum.map((c,i)=><path key={i} d={arcPart(i/96,(i+1)/96+.001)} fill="none" stroke={c} strokeWidth={ringWidth} strokeLinecap={i===0||i===95?'round':'butt'}/>):amount>0&&<path className="ts-charge-progress" d={arc} pathLength="100" strokeDasharray={`${Math.max(.015,amount)*100} 100`} fill="none" stroke={`url(#${uid})`} strokeWidth={ringWidth} strokeLinecap="round"/>}</>)}
  {marker&&<circle cx={dot.x} cy={dot.y} r="6" fill={color} stroke={tone==='green'?'#036d83':'#080808'} strokeWidth="3"/>}
  {badge&&<><rect x={badgeBottom?41:76} y={badgeBottom?101:8} width="37" height="19" rx="9" fill="#000"/><text x={badgeBottom?59.5:94.5} y={badgeBottom?114:22} fill={color} fontSize="12" textAnchor="middle">{badge}</text></>}
  {signal?<><g className="ts-signal-bars" fill={tone==='rainbow'?'#ff314e':color}>{[0,1,2,3,4].map(i=><rect key={i} x={(hasSignalCross?33:39.5)+i*8.5} y={68-(i+1)*5} width="7" height={(i+1)*5} rx="1.8" fill={signalCross&&i>=signalBars?'#414144':undefined} opacity={signalCross?1:tone==='gray'?.25:tone==='rainbow'?.25+i*.1875:i<signalBars?1:.2}/>)}</g>{hasSignalCross?<path d="M78 64l9 9m0-9-9 9" stroke={signalCross&&tone==='green'?'#69ca65':tone==='gray'?'#aaa':color==='#57ee24'?'#ff314e':color} strokeWidth="2.6" strokeLinecap="round"/>:null}<text x="60" y="92" fill="#f5f5f7" textAnchor="middle" fontSize={unit.length>5?'15':'20'}>{unit}</text></>:<>{!iconFirst&&<><text x="60" y={person?'60':'68'} fill="#f5f5f7" textAnchor="middle" fontSize={plain?'31':value.length>3?'30':value.length===3?'34':'39'} fontWeight="500" letterSpacing="-1.5">{value}</text><text x="60" y={person?'79':'89'} fill={plain?color:'#f5f5f7'} textAnchor="middle" fontSize={unit.length>6?'12':'19'}>{unit}</text></>}{person&&<g transform={iconFirst?'translate(39 35) scale(1.3)':'translate(46 85) scale(.85)'} fill={color}><circle cx="16" cy="8" r="7"/><path d="M0 33c0-19 32-19 32 0z"/><circle cx="30" cy="30" r="8"/><path d={tone==='red'?'m26 26 8 8m0-8-8 8':tone==='amber'?'M27 26v8m5-8v8':'m26 30 3 3 5-7'} stroke="#000" strokeWidth="2" fill="none"/></g>}{iconFirst&&<text x="60" y="102" fill="#f5f5f7" textAnchor="middle" fontSize="18">{value} {unit}</text>}{battery&&<g stroke={color} fill="none" strokeWidth="1.5"><rect x="47" y="98" width="24" height="11" rx="2"/><path d="M74 101v5"/><rect x="49" y="100" width={Math.max(1,20*amount)} height="7" fill={color} stroke="none"/></g>}</>}
 </svg>;
}
export function OriginalTraceStudy({label="Recreated original Trace component"}:{label?:string}){return <div className="trace-recreated" role="group" aria-label={label}><div className="trace-recreated-heading"><span>Trace</span><span className="trace-recreated-info" aria-hidden="true">i</span></div><div className="trace-recreated-gauges"><StudyGauge value="22" unit="MINS" badge="65%" label="Original battery exploration: 22 minutes, 65 percent"/><StudyGauge signal signalCross signalBars={3} segments amount={.55} unit="LOW" label="Original signal exploration: low"/><StudyGauge value="12" unit="HRS" person label="Original location exploration: 12 hours"/></div></div>;}
export function ColorStudyWidget(){return <div className="ts-widget" role="group" aria-label="Recreated multicolor Trace concept">
 <div className="ts-widget-heading"><span>Trace</span><span className="ts-info" aria-hidden="true">i</span></div>
 <div className="ts-widget-gauges"><StudyGauge value="6h" unit="hours" tone="rainbow" marker label="Multicolor battery estimate, 6 hours"/><StudyGauge signal unit="Low" tone="rainbow" label="Multicolor low signal concept"/><StudyGauge value="2h" unit="Sync" tone="rainbow" marker label="Multicolor two hour sync concept"/></div>
 </div>;}
export function TracePalette(){return <div className="ts-palette" aria-label="Color study: battery, connection, and last shared time">
 <div><StudyGauge value="65" unit="%" amount={.65} label="65 percent charge"/><StudyGauge signal signalCross segments tone="amber" amount={.4} unit="Low" label="Weak signal"/><TraceSharingState age="12h" state="history" tone="red" label="Red color study: last shared 12 hours ago"/></div>
 <span>Color study</span>
 </div>;}
