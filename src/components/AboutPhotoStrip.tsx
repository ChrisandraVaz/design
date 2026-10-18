'use client';
import {useEffect,useRef} from 'react';

export type AboutPhoto={src:string;alt:string};
export default function AboutPhotoStrip({photos}:{photos:AboutPhoto[]}) {
 const strip=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=strip.current;
  if(!element)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,last=0,position=element.scrollLeft,interacting=false;
  const enter=()=>{interacting=true;};
  const leave=()=>{interacting=false;position=element.scrollLeft;};
  const tick=(now:number)=>{
   const elapsed=last?Math.min(now-last,50):0;last=now;
   if(!motion.matches&&!interacting&&!document.hidden){
    const loop=element.scrollWidth/2;
    position=(position+elapsed*.028)%loop;
    element.scrollLeft=position;
   }
   frame=requestAnimationFrame(tick);
  };
  element.addEventListener('pointerenter',enter);
  element.addEventListener('pointerleave',leave);
  element.addEventListener('touchstart',enter,{passive:true});
  element.addEventListener('touchend',leave);
  element.addEventListener('focusin',enter);
  element.addEventListener('focusout',leave);
  frame=requestAnimationFrame(tick);
  return ()=>{
   cancelAnimationFrame(frame);
   element.removeEventListener('pointerenter',enter);element.removeEventListener('pointerleave',leave);
   element.removeEventListener('touchstart',enter);element.removeEventListener('touchend',leave);
   element.removeEventListener('focusin',enter);element.removeEventListener('focusout',leave);
  };
 },[]);
 return <section className="about-photos" aria-label="Life outside the screen">
  <div ref={strip} id="about-photo-strip" className="about-photo-strip" role="region" aria-label="Photographs of Chrisandra, travel, and community. Scroll horizontally to explore." tabIndex={0}>
   {[0,1].map(copy=><div className="about-photo-run" key={copy} aria-hidden={copy===1?true:undefined}>
    {photos.map((photo,index)=><figure className="about-photo" key={photo.src}>
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src={photo.src} alt={copy===0?photo.alt:''} loading={index<2?'eager':'lazy'} draggable={false}/>
    </figure>)}
   </div>)}
  </div>
  <div className="about-film-shade" aria-hidden="true"/>
  <div className="about-film-grain" aria-hidden="true"/>
 </section>;
}
