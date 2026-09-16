/** Authored color families. A common upper-left highlight keeps state changes in one material. */
export const traceMaterials = {
  green: {light:'#d0ffb3',mid:'#63f32b',deep:'#27ca06',ink:'#65ed36',track:'#182414'},
  amber: {light:'#fff6bd',mid:'#ffd447',deep:'#ed8706',ink:'#ffce45',track:'#302516'},
  red: {light:'#ffb5bf',mid:'#ff425e',deep:'#c30a39',ink:'#ff526d',track:'#30131d'},
  gray: {light:'#b8b8c3',mid:'#858590',deep:'#60606c',ink:'#a5a5b0',track:'#25252c'},
} as const;

export type TraceTone = keyof typeof traceMaterials;

/** Rounded signal segments are softer than the luminous continuous arcs in the reference. */
export const traceSegmentMaterials = {
  green:{light:'#92e687',mid:'#69ca65',deep:'#3fa640'},
  amber:{light:'#ffeb97',mid:'#f5c758',deep:'#dc921a'},
  red:{light:'#ff92a0',mid:'#f15a71',deep:'#ce3451'},
  gray:{light:'#a8a8b3',mid:'#858590',deep:'#60606c'},
} as const;

export function mixTraceColor(a:string,b:string,amount:number) {
  return '#'+[1,3,5].map(offset=>Math.round(parseInt(a.slice(offset,offset+2),16)*(1-amount)+parseInt(b.slice(offset,offset+2),16)*amount).toString(16).padStart(2,'0')).join('');
}
