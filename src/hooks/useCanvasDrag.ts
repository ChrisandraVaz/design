'use client';
import {useEffect,useRef,useState,type RefObject,type PointerEvent as ReactPointerEvent,type KeyboardEvent as ReactKeyboardEvent,type MouseEvent as ReactMouseEvent} from 'react';
import {moveAlongBoundary,predictThrow,reflowCanvas,type CanvasBody,type CanvasBounds} from '@/lib/canvasLayout';
import type {Point,Rect} from '@/lib/canvasGeometry';
type MovingBody=CanvasBody & {node:HTMLElement;base:Point;translateScale:number;target:Point;velocity:Point};
type Gesture={id:string;pointer:number;capture:Element;start:Point;origin:Point;last:Point;time:number;velocity:Point;factor:number;moved:boolean};

export function useCanvasDrag(canvas:RefObject<HTMLDivElement|null>,activate:(id:string|null)=>void){
 const bodies=useRef<MovingBody[]>([]),gesture=useRef<Gesture|null>(null),frame=useRef<number|null>(null);
 const [dragging,setDragging]=useState<string|null>(null);
 const animationStarted=useRef(0);
 const afterAnimation=useRef<(()=>void)|null>(null);
 const lastFrame=useRef(0),suppressed=useRef<string|null>(null);
 const bounds=useRef<CanvasBounds>({width:1280,height:900}),intro=useRef<Rect>({x:0,y:0,width:0,height:0});
 const read=()=>{
  const root=canvas.current?.querySelector<HTMLElement>('.scatter');if(!root)return;
  const rootRect=root.getBoundingClientRect(),mobile=window.innerWidth<=1100,factor=mobile?1:rootRect.width/root.offsetWidth;
  const heading=root.querySelector<HTMLElement>('.scatter-intro')!.getBoundingClientRect();
  intro.current={x:(heading.x-rootRect.x)/factor,y:(heading.y-rootRect.y)/factor,width:heading.width/factor,height:heading.height/factor};
  bodies.current=Array.from(root.querySelectorAll<HTMLElement>('.scatter-item')).map(node=>{
   const style=getComputedStyle(node),translate=style.translate.split(' ');
   const translateScale=mobile?(parseFloat(style.zoom)||1):1;
   const offset={x:(parseFloat(translate[0])||0)*translateScale,y:(parseFloat(translate[1])||0)*translateScale};
   const size=parseFloat(style.getPropertyValue('--size'))*1.08;
   const actual=node.getBoundingClientRect();
   const width=mobile?actual.width:node.offsetWidth*size,height=mobile?actual.height:node.offsetHeight*size;
   const base=mobile?{x:actual.x-rootRect.x-offset.x,y:actual.y-rootRect.y-offset.y}:{x:node.offsetLeft+(node.offsetWidth-width)/2,y:node.offsetTop+(node.offsetHeight-height)/2};
   const x=base.x+offset.x,y=base.y+offset.y;
   return {id:node.dataset.cardId!,node,base,translateScale,x,y,width,height,target:{x,y},velocity:{x:0,y:0}};
  });
  bounds.current={width:mobile?rootRect.width+24:Math.max(root.offsetWidth,...bodies.current.map(b=>b.base.x+b.width+12)),height:Math.max(mobile?Math.max(rootRect.height+600,1800):900,...bodies.current.map(b=>b.y+b.height+24))};
 };
 const paint=(body:MovingBody)=>{
  body.node.style.setProperty('--move-x',`${(body.x-body.base.x)/body.translateScale}px`);
  body.node.style.setProperty('--move-y',`${(body.y-body.base.y)/body.translateScale}px`);
 };
 const tick=(now:number)=>{
  if(now-animationStarted.current>1600){
   for(const b of bodies.current){b.x=b.target.x;b.y=b.target.y;b.velocity={x:0,y:0};paint(b)}
   frame.current=null;if(!gesture.current)setDragging(null);afterAnimation.current?.();afterAnimation.current=null;return;
  }
  const dt=Math.min(.025,Math.max(.001,(now-lastFrame.current)/1000));lastFrame.current=now;
  let moving=false;
  for(const b of bodies.current){
   if(gesture.current?.moved&&gesture.current.id===b.id)continue;
   const dx=b.target.x-b.x,dy=b.target.y-b.y;
   if(Math.hypot(dx,dy)<.08&&Math.hypot(b.velocity.x,b.velocity.y)<.5){b.x=b.target.x;b.y=b.target.y;b.velocity={x:0,y:0};paint(b);continue;}
   moving=true;
   b.velocity.x+=(170*dx-25*b.velocity.x)*dt;
   b.velocity.y+=(170*dy-25*b.velocity.y)*dt;
   const target={x:b.x+b.velocity.x*dt,y:b.y+b.velocity.y*dt};
   const p=afterAnimation.current?target:moveAlongBoundary(b,target,bounds.current,intro.current);
   if(Math.abs(p.x-target.x)>.1)b.velocity.x*=-.38;
   if(Math.abs(p.y-target.y)>.1)b.velocity.y*=-.38;
   b.x=p.x;b.y=p.y;paint(b);
  }
  if(moving)frame.current=requestAnimationFrame(tick);
  else {frame.current=null;if(!gesture.current)setDragging(null);afterAnimation.current?.();afterAnimation.current=null;}
 };
 const animate=(time:number)=>{if(frame.current!==null)cancelAnimationFrame(frame.current);lastFrame.current=time;animationStarted.current=time;frame.current=requestAnimationFrame(tick)};
 const place=(id:string,target:Point,velocity:Point,time:number)=>{
  const result=reflowCanvas(bodies.current,id,target,bounds.current,intro.current);
  const extent=Math.max(bounds.current.height,...result.map(b=>b.y+b.height+24));
  bounds.current.height=extent;
  if(canvas.current){
    const root=canvas.current.querySelector<HTMLElement>('.scatter');
    if(root&&window.innerWidth>1100){root.style.height=`${extent}px`;canvas.current.style.setProperty('height',`${extent*root.getBoundingClientRect().width/root.offsetWidth}px`);}
    else canvas.current.style.setProperty('min-height',`${extent}px`);
  }
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  for(const b of bodies.current){const next=result.find(n=>n.id===b.id)!;b.target={x:next.x,y:next.y};b.velocity=b.id===id?velocity:{x:0,y:0};if(reduced){b.x=next.x;b.y=next.y;paint(b)}}
  if(reduced)setDragging(null);else animate(time);
 };
 const start=(event:ReactPointerEvent<HTMLElement>,id:string)=>{
  if(event.button!==0||window.innerWidth<=1100||(event.target as Element).closest('input,textarea,select'))return;
  afterAnimation.current=null;
  if(frame.current!==null)cancelAnimationFrame(frame.current);frame.current=null;
  read();const body=bodies.current.find(b=>b.id===id);if(!body)return;
  const root=canvas.current!.querySelector<HTMLElement>('.scatter')!;
  const point={x:event.clientX,y:event.clientY};
  gesture.current={id,pointer:event.pointerId,capture:event.target as Element,start:point,origin:{x:body.x,y:body.y},last:point,time:event.timeStamp,velocity:{x:0,y:0},factor:window.innerWidth<=1100?1:root.getBoundingClientRect().width/root.offsetWidth,moved:false};
  suppressed.current=null;
  (event.target as Element).setPointerCapture(event.pointerId);
 };
 const move=(event:ReactPointerEvent<HTMLElement>)=>{
  const g=gesture.current;if(!g||event.pointerId!==g.pointer)return;
  const dx=(event.clientX-g.start.x)/g.factor,dy=(event.clientY-g.start.y)/g.factor;
  if(!g.moved&&Math.hypot(dx,dy)<4)return;
  if(!g.moved){g.moved=true;activate(g.id);setDragging(g.id);event.currentTarget.setPointerCapture(event.pointerId);g.capture=event.currentTarget;}
  event.preventDefault();const b=bodies.current.find(b=>b.id===g.id)!;
  const elapsed=Math.max(8,event.timeStamp-g.time)/1000;
  g.velocity={x:.6*g.velocity.x+.4*(event.clientX-g.last.x)/g.factor/elapsed,y:.6*g.velocity.y+.4*(event.clientY-g.last.y)/g.factor/elapsed};
  g.last={x:event.clientX,y:event.clientY};g.time=event.timeStamp;
  const p=moveAlongBoundary(b,{x:g.origin.x+dx,y:g.origin.y+dy},bounds.current,intro.current);
  b.x=p.x;b.y=p.y;paint(b);
 };
 const end=(event:ReactPointerEvent<HTMLElement>)=>{
  const g=gesture.current;if(!g||g.pointer!==event.pointerId)return;
  if(g.capture.hasPointerCapture(g.pointer))g.capture.releasePointerCapture(g.pointer);
  gesture.current=null;
  if(!g.moved){setDragging(null);return;}
  suppressed.current=g.id;
  const b=bodies.current.find(b=>b.id===g.id)!;
  const shouldCoast=event.type!=='pointercancel'&&event.timeStamp-g.time<90&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const velocity=shouldCoast?{x:Math.max(-1500,Math.min(1500,g.velocity.x)),y:Math.max(-1500,Math.min(1500,g.velocity.y))}:{x:0,y:0};
  const target=shouldCoast?predictThrow(b,velocity,bounds.current,intro.current):{x:b.x,y:b.y};
  place(g.id,target,velocity,event.timeStamp);
 };
 const key=(event:ReactKeyboardEvent<HTMLElement>,id:string)=>{
  if(window.innerWidth<=1100||!event.shiftKey||!event.key.startsWith('Arrow') )return;
  afterAnimation.current=null;
  event.preventDefault();read();const b=bodies.current.find(b=>b.id===id)!;activate(id);
  place(id,{x:b.x+(event.key==='ArrowLeft'?-30:event.key==='ArrowRight'?30:0),y:b.y+(event.key==='ArrowUp'?-30:event.key==='ArrowDown'?30:0)},{x:0,y:0},event.timeStamp);
 };
 const clearLayout=()=>{
  canvas.current?.querySelectorAll<HTMLElement>('.scatter-item').forEach(node=>{node.style.removeProperty('--move-x');node.style.removeProperty('--move-y')});
  canvas.current?.style.removeProperty('height');canvas.current?.style.removeProperty('min-height');
  canvas.current?.querySelector<HTMLElement>('.scatter')?.style.removeProperty('height');
  bodies.current=[];activate(null);setDragging(null);
 };
 const resetLayout=()=>{
  if(frame.current!==null)cancelAnimationFrame(frame.current);
  frame.current=null;gesture.current=null;afterAnimation.current=null;suppressed.current=null;
  if(window.innerWidth<=1100||window.matchMedia('(prefers-reduced-motion: reduce)').matches){clearLayout();return;}
  read();activate(null);
  for(const b of bodies.current){b.target={...b.base};b.velocity={x:0,y:0};}
  afterAnimation.current=clearLayout;
  animate(performance.now());
 };
 useEffect(()=>{
  const resetOnResize=()=>{
   if(frame.current!==null)cancelAnimationFrame(frame.current);
   frame.current=null;gesture.current=null;bodies.current=[];afterAnimation.current=null;
   canvas.current?.querySelectorAll<HTMLElement>('.scatter-item').forEach(node=>{node.style.removeProperty('--move-x');node.style.removeProperty('--move-y')});
   canvas.current?.style.removeProperty('height');canvas.current?.style.removeProperty('min-height');
   canvas.current?.querySelector<HTMLElement>('.scatter')?.style.removeProperty('height');
   activate(null);setDragging(null);
  };
  window.addEventListener('resize',resetOnResize);
  return ()=>{window.removeEventListener('resize',resetOnResize);if(frame.current!==null)cancelAnimationFrame(frame.current)};
 },[canvas,activate]);
 const movable=(id:string)=>({
  'data-card-id':id,'data-dragging':dragging===id,tabIndex:0,
  onPointerDown:(event:ReactPointerEvent<HTMLElement>)=>start(event,id),onPointerMove:move,onPointerUp:end,onPointerCancel:end,
  onKeyDown:(event:ReactKeyboardEvent<HTMLElement>)=>key(event,id),
  onClickCapture:(event:ReactMouseEvent<HTMLElement>)=>{if(suppressed.current===id){event.preventDefault();event.stopPropagation();suppressed.current=null}}
 });
 return {movable,resetLayout,dragging,isInteracting:()=>gesture.current!==null||frame.current!==null};
}
