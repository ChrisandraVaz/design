'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './trace-case-navigation.css';

const groups = [
 {id:'trace-overview',label:'Overview',children:[]},
 {id:'intent',label:'The problem',children:[['trace-insight','Design insight'],['trace-opportunity','watchOS context']]},
 {id:'decisions',label:'Design process',children:[['references','Layout studies'],['battery-studies','Power'],['connection-studies','Connection'],['location-studies','Last shared'],['color-study','Color']]},
 {id:'motion',label:'The solution',children:[]},
 {id:'takeaways',label:'Takeaways',children:[]},
];
export default function TraceCaseNavigation() {
 const [active,setActive]=useState('trace-overview');
 useEffect(()=>{const update=()=>{let current=groups[0].id;for(const group of groups){if((document.getElementById(group.id)?.getBoundingClientRect().top??Infinity)<190)current=group.id;}setActive(current);};window.addEventListener('scroll',update,{passive:true});update();return()=>window.removeEventListener('scroll',update);},[]);
 const tab=active==='decisions'?'motion':active;
 return <>
  <nav className="trace-case-top" aria-label="Case study navigation"><Link href="/" className="trace-case-back"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Back to Home</Link><div className="trace-case-tabs">{[['trace-overview','Overview'],['intent','Problem'],['motion','Solution'],['takeaways','Takeaways']].map(([id,label])=><a key={id} href={`#${id}`} aria-current={tab===id?'location':undefined}>{label}</a>)}</div></nav>
  <nav className="trace-case-tree" aria-label="Trace chapters">{groups.map(group=><div key={group.id} className="trace-case-tree-group"><a href={`#${group.id}`} aria-current={active===group.id?'location':undefined}>{group.label}</a>{group.children.length>0&&<div className="trace-case-branches">{group.children.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</div>}</div>)}</nav>
 </>;
}
