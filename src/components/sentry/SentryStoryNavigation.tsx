'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../trace-case-navigation.css';
export default function SentryStoryNavigation({kind}:{kind:string}) {
 const queue=kind==='message-queuing';
 const split=kind==='split-panel';
 const groups=[{id:'overview',label:'Overview'},{id:'the-problem',label:'The problem'},{id:'solution',label:'The solution'},{id:queue?'insights':'context',label:'Design process',children:queue?[['insights','Message data'],['context','Competitive audit'],['explorations','Four directions'],['interaction-details','Interaction details']]:split?[['context','Implementation audit'],['insights','Extracting the handle'],['solution','Component contract'],['adoption','Migration plan']]:[['context','Interviews'],['references','Reference study'],['insights','The audit'],['component-design','Shared structure'],['craft','Detail decisions'],['library-handoff','Library and code']]},{id:'the-outcome',label:'Outcome'},{id:'takeaways',label:'Takeaways'}];
 const [active,setActive]=useState('overview');
 useEffect(()=>{const ids=['overview','the-problem','solution',queue?'insights':'context','the-outcome','takeaways'];const update=()=>{let current=ids[0];let nearest=-Infinity;for(const id of ids){const top=document.getElementById(id)?.getBoundingClientRect().top??Infinity;if(top<190&&top>nearest){current=id;nearest=top;}}setActive(current);};window.addEventListener('scroll',update,{passive:true});update();return()=>window.removeEventListener('scroll',update);},[queue]);
 const tab=active==='the-outcome'?'takeaways':active===(queue?'insights':'context')?'solution':active;
 return <><nav className="trace-case-top" aria-label="Case study navigation"><Link href="/" className="trace-case-back back-home"><span aria-hidden="true">‹</span>Back to Home</Link><div className="trace-case-tabs">{[['overview','Overview'],['the-problem','Problem'],['solution','Solution'],['takeaways','Takeaways']].map(([id,label])=><a key={id} href={`#${id}`} aria-current={tab===id?'location':undefined}>{label}</a>)}</div></nav><nav className="trace-case-tree" aria-label={`${queue?'Message Queuing':split?'Split Panel':'Relative Time'} chapters`}>{groups.map(g=><div className="trace-case-tree-group" key={g.id}><a href={`#${g.id}`} aria-current={active===g.id?'location':undefined}>{g.label}</a>{g.children&&<div className="trace-case-branches">{g.children.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</div>}</div>)}</nav></>;
}
