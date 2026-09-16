export type Point = { x:number; y:number };
export type Rect = Point & { width:number; height:number };
export const CARD_GAP = 24;
export function clearOf(a:Rect,b:Rect,gap=CARD_GAP) { return a.x+a.width+gap<=b.x || b.x+b.width+gap<=a.x || a.y+a.height+gap<=b.y || b.y+b.height+gap<=a.y; }
export function fits(r:Rect, obstacles:Rect[], width:number, height:number) { return r.x>=8 && r.y>=8 && r.x+r.width<=width-8 && r.y+r.height<=height-8 && obstacles.every(o=>clearOf(r,o)); }
// An authored layout can already sit within a conservative hover-sized barrier.
// Allow a card to move out of that clearance, without deepening it or entering a new one.
function penetrations(r:Rect, obstacles:Rect[], width:number, height:number) {
 return [Math.max(0,8-r.x),Math.max(0,8-r.y),Math.max(0,r.x+r.width-width+8),Math.max(0,r.y+r.height-height+8),
  ...obstacles.map(o=>Math.max(0,Math.min(r.x+r.width+CARD_GAP-o.x,o.x+o.width+CARD_GAP-r.x,r.y+r.height+CARD_GAP-o.y,o.y+o.height+CARD_GAP-r.y)))];
}
export function sweep(from:Rect,target:Point,obstacles:Rect[],width:number,height:number):Point {
 const steps=Math.max(1,Math.ceil(Math.hypot(target.x-from.x,target.y-from.y)/3));
 let result={x:from.x,y:from.y}, previous=penetrations(from,obstacles,width,height);
 for(let i=1;i<=steps;i++){
  const p={x:from.x+(target.x-from.x)*i/steps,y:from.y+(target.y-from.y)*i/steps};
  const next=penetrations({...from,...p},obstacles,width,height);
  if(next.some((value,index)=>value>previous[index]+0.000001))break;
  result=p;previous=next;
 }
 return result;
}
export function nearestFree(rect:Rect,obstacles:Rect[],width:number,height:number):Point {
 const xs=[Math.max(8,Math.min(width-rect.width-8,rect.x)),8],ys=[Math.max(8,rect.y),8];
 obstacles.forEach(o=>{xs.push(o.x-rect.width-CARD_GAP,o.x+o.width+CARD_GAP);ys.push(o.y-rect.height-CARD_GAP,o.y+o.height+CARD_GAP);});
 return xs.flatMap(x=>ys.map(y=>({x,y}))).filter(p=>fits({...rect,...p},obstacles,width,height)).sort((a,b)=>Math.hypot(a.x-rect.x,a.y-rect.y)-Math.hypot(b.x-rect.x,b.y-rect.y))[0]||{x:rect.x,y:rect.y};
}
