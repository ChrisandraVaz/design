import { clearOf, fits, nearestFree, sweep, type Point, type Rect } from './canvasGeometry';
export type CanvasBody = Rect & { id: string };
export type CanvasBounds = { width: number; height: number };
const inset = 12;
const gap = 24;

function limit(rect: Rect, bounds: CanvasBounds): Rect {
  return {...rect, x:Math.max(inset,Math.min(bounds.width-rect.width-inset,rect.x)),y:Math.max(inset,Math.min(bounds.height-rect.height-inset,rect.y))};
}
/** Project only against the fixed page furniture, never against another movable card. */
export function protectIntro(rect:Rect,bounds:CanvasBounds,intro:Rect):Rect {
  let result=limit(rect,bounds);
  if(!clearOf(result,intro,gap)) {
    const p=nearestFree(result,[intro],bounds.width,bounds.height);
    result=limit({...result,...p},bounds);
  }
  return result;
}
export function moveAlongBoundary(from:Rect,target:Point,bounds:CanvasBounds,intro:Rect):Point {
  const direct=sweep(from,target,[intro],bounds.width,bounds.height);
  // Continue along a wall instead of locking both axes on diagonal movement.
  const horizontal=sweep({...from,...direct},{x:target.x,y:direct.y},[intro],bounds.width,bounds.height);
  return sweep({...from,...horizontal},{x:horizontal.x,y:target.y},[intro],bounds.width,bounds.height);
}
function separation(a:Rect,b:Rect):Point {
  const moves=[{x:b.x-a.x-a.width-gap,y:0},{x:b.x+b.width+gap-a.x,y:0},{x:0,y:b.y-a.y-a.height-gap},{x:0,y:b.y+b.height+gap-a.y}];
  return moves.sort((a,b)=>Math.hypot(a.x,a.y)-Math.hypot(b.x,b.y))[0];
}
/** Position constraints propagate through the group; the newly placed card is the anchor. */
export function reflowCanvas(source:CanvasBody[],anchorId:string,target:Point,bounds:CanvasBounds,intro:Rect):CanvasBody[] {
  const bodies=source.map(b=>({...b}));
  const anchor=bodies.find(b=>b.id===anchorId);
  if(!anchor)return bodies;
  Object.assign(anchor,protectIntro({...anchor,...target},bounds,intro));
  const touched=new Set([anchorId]);
  for(let iteration=0;iteration<100;iteration++) {
    let collisions=0;
    for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++) {
      const a=bodies[i],b=bodies[j];
      if(!touched.has(a.id)&&!touched.has(b.id))continue;
      if(clearOf(a,b,gap-.01))continue;
      collisions++;touched.add(a.id);touched.add(b.id);
      const shift=separation(a,b);
      const aWeight=a.id===anchorId?0:b.id===anchorId?1:.5;
      const bWeight=1-aWeight;
      a.x+=shift.x*aWeight;a.y+=shift.y*aWeight;
      b.x-=shift.x*bWeight;b.y-=shift.y*bWeight;
      if(a.id!==anchorId)Object.assign(a,protectIntro(a,bounds,intro));
      if(b.id!==anchorId)Object.assign(b,protectIntro(b,bounds,intro));
    }
    if(!collisions)break;
  }
  // Resolve rare multi-card corner deadlocks exactly, without moving the chosen anchor.
  const valid=bodies.every(a=>a.id===anchorId||!touched.has(a.id)||bodies.every(b=>a===b||clearOf(a,b,gap-.1)));
  if(!valid) {
    const settled:Rect[]=[intro,anchor];
    const ordered=bodies.filter(b=>b.id!==anchorId).sort((a,b)=>b.width*b.height-a.width*a.height);
    for(const b of ordered) {
      let p=nearestFree(b,settled,bounds.width,bounds.height);
      if(!fits({...b,...p},settled,bounds.width,bounds.height)){
        const availableHeight=Math.max(bounds.height,...settled.map(r=>r.y+r.height+b.height+gap+24));
        p=nearestFree(b,settled,bounds.width,availableHeight);
      }
      Object.assign(b,p);settled.push(b);
    }
  }
  return bodies;
}
export function predictThrow(body:Rect,velocity:Point,bounds:CanvasBounds,intro:Rect):Point {
  let p={x:body.x,y:body.y};const v={...velocity};
  for(let i=0;i<36;i++) {
    const target={x:p.x+v.x*.016,y:p.y+v.y*.016};
    const next=moveAlongBoundary({...body,...p},target,bounds,intro);
    if(Math.abs(target.x-next.x)>.2)v.x*=-.38;
    if(Math.abs(target.y-next.y)>.2)v.y*=-.38;
    p=next;v.x*=.91;v.y*=.91;
  }
  return p;
}
