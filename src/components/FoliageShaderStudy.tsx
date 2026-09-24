'use client';

import { useEffect, useRef } from 'react';

// The lower study is generated entirely in WebGL: branches, leaves, veins,
// lighting and motion are shader geometry. No image or video is sampled.
const leafVertex = `#version 300 es
precision highp float;
layout(location=0) in vec4 plant;
layout(location=1) in vec4 form;
layout(location=2) in vec4 material;
uniform float time;
uniform float aspect;
out vec3 baseColor;
out float across;
out float along;
out float kind;
out float phase;
out float depth;
void main() {
  float t = float(gl_VertexID / 2) / 63.0;
  float side = (gl_VertexID % 2 == 0) ? -1.0 : 1.0;
  vec2 axis = vec2(cos(plant.z), sin(plant.z));
  vec2 normal = vec2(-axis.y, axis.x);
  float breeze = sin(plant.x * 3.1 + plant.y * 2.7 - time * .53 + form.w);
  float taper = material.y < .5 ? 1.0
    : pow(max(0.0, sin(t * 3.14159)), material.y > 1.5 ? .62 : .56);
  float edgeRipple = material.y < .5 ? 0.0 : .075 * sin(t * 21.0 + form.w) * sin(t * 3.14159);
  float width = form.x * taper * (1.0 + edgeRipple) * (1.0 + side * (material.w - .5) * .24);
  float curve = form.y * sin(t * 3.14159)
    + (material.y < .5 ? 0.0 : .025 * sin(t * 5.0 + form.w)) * t;
  vec2 p = plant.xy + axis * plant.w * t
    + normal * (curve + side * width + breeze * (material.y < .5 ? .003 : .018) * t * t);
  p *= material.x > .7 ? .97 : 1.27;
  p.x /= aspect;
  gl_Position = vec4(p, 0.0, 1.0);

  float sun = .5 + .5 * sin(plant.x * 3.0 + plant.y * 1.6 + form.w * .38);
  if (material.y < .5) {
    baseColor = mix(vec3(.025,.085,.025), vec3(.13,.24,.07), sun);
  } else {
    vec3 darkLeaf = vec3(.009,.052,.038);
    vec3 greenLeaf = vec3(.058,.25,.139);
    vec3 litLeaf = vec3(.35,.53,.29);
    baseColor = mix(darkLeaf, greenLeaf, .34 + .62 * form.z);
    baseColor = mix(baseColor, litLeaf, pow(sun, 2.0) * (.08 + .43 * form.z));
    if (material.y > 1.5) {
      baseColor = mix(vec3(.010,.044,.018), vec3(.14,.36,.065), .27 + .55 * form.z);
      baseColor = mix(baseColor, vec3(.39,.62,.15), pow(sun, 3.0) * (.05 + .30 * form.z));
    }
    baseColor *= .80 + .24 * sin(t * 3.14159);
  }
  baseColor *= .28 + .72 * pow(material.x, 1.8);
  across = side;
  along = t;
  kind = material.y;
  phase = form.w;
  depth = material.x;
}`;

const leafFragment = `#version 300 es
precision highp float;
in vec3 baseColor;
in float across;
in float along;
in float kind;
in float phase;
in float depth;
out vec4 outColor;
float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),
             mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);
}
void main() {
  float curl = pow(max(0.0, 1.0 - abs(across + .22)), 2.1);
  float lamina = .44 + (.48 + .24 * depth) * curl;
  float midrib = (kind > 1.5 ? .28 : .17) * exp(-abs(across - .035) * 25.0);
  float veins = exp(-abs(sin(along * 30.0 - abs(across) * 5.0 + phase)) * 21.0)
    * .026 * smoothstep(.05, .3, abs(across));
  float lengthwiseFibers = .028 * sin(across * 29.0 + along * 4.0 + phase)
    + .012 * sin(across * 49.0 - along * 5.0);
  float mottling = (noise(vec2(along * 16.0, across * 7.0) + phase) - .5) * .19
    + (noise(vec2(along * 34.0, across * 14.0) + phase) - .5) * .065;
  float wetSheen = (kind > 1.5 ? .48 : .11)
    * pow(max(0.0, 1.0 - abs(across - .29 - .10 * sin(along * 8.0 + phase))), 11.0);
  float leafSpotlight = kind > 1.5
    ? .29 * exp(-pow((along - .57) * 3.0, 2.0) - pow((across + .15) * 2.0, 2.0))
    : 0.0;
  float leafLight = lamina + midrib + veins + lengthwiseFibers + mottling + wetSheen + leafSpotlight;
  float shade = kind < .5 ? .90 : leafLight;
  float alpha = 1.0 - smoothstep(1.0 - fwidth(across) * 1.25, 1.0, abs(across));
  vec3 pigment = pow(max(baseColor * shade, vec3(0.0)),vec3(.86));
  outColor = vec4(pigment,alpha);
}`;

const backgroundVertex = `#version 300 es
precision highp float;
const vec2 points[3]=vec2[3](vec2(-1.,-1.),vec2(3.,-1.),vec2(-1.,3.));
out vec2 uv;
void main(){gl_Position=vec4(points[gl_VertexID],0.,1.);uv=points[gl_VertexID]*.5+.5;}`;

const backgroundFragment = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 outColor;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+1.),f.x),f.y);}
void main(){
  float ambient=noise(uv*5.0)*.14+noise(uv*11.0)*.055;
  vec3 c=mix(vec3(.004,.009,.021),vec3(.014,.044,.030),ambient+.25*uv.y);
  outColor=vec4(c,1.);
}`;

function makeProgram(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
  const program=gl.createProgram();
  if(!program)throw new Error('WebGL program unavailable');
  for(const [kind,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]] as [number,string][]){
    const shader=gl.createShader(kind);
    if(!shader)throw new Error('WebGL shader unavailable');
    gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader)||'Shader compilation failed');
    gl.attachShader(program,shader);gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'Shader link failed');
  return program;
}

function makeLeaves() {
  let state=392871;
  const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  const background:number[]=[],foreground:number[]=[];
  const leaf=(target:number[],x:number,y:number,angle:number,length:number,width:number,curve:number,light:number,depth:number,phase:number,kind=1)=>{
    target.push(x,y,angle,length,width,curve,light,phase,depth,kind,.75,random());
  };
  // A dark bed of leaves provides depth behind the larger, attached leaves.
  for(let layer=0;layer<2;layer++){
    const count=[210,68][layer];
    const tufts=Array.from({length:[43,20][layer]},()=>[random()*3.0-1.5,random()*2.7-1.35]);
    for(let i=0;i<count;i++){
      const tuft=tufts[Math.floor(random()*tufts.length)];
      const x=tuft[0]+(random()-.5)*.16;
      const y=tuft[1]+(random()-.5)*.11;
      const angle=random()*6.28;
      const length=[.32,.72][layer]*(.67+random()*.80);
      const width=[.029,.070][layer]*(.65+random()*.80);
      const depth=[.30,.53][layer]+random()*.18;
      leaf(background,x,y,angle,length,width,(random()-.5)*length*.31,.27+random()*.69,depth,random()*12);
    }
  }
  // Each split leaf is a frond: a single rib with paired lobes rooted along
  // it. The gaps are physical spaces between meshes, not painted cutouts.
  const frond=(x:number,y:number,angle:number,length:number,scale:number,depth:number,light:number,phase:number,pairs:number)=>{
    const axis=[Math.cos(angle),Math.sin(angle)];
    const normal=[-axis[1],axis[0]];
    foreground.push(x,y,angle,length,.013*scale,.05*scale,light,phase,depth,0,0,0);
    leaf(foreground,x,y,angle,length,scale*.145,.045*scale,light*.86,depth,phase+19,2);
    for(let i=0;i<pairs;i++){
      const t=.23+(i+.25)/(pairs+.5)*.60;
      const rootX=x+axis[0]*length*t+normal[0]*.05*scale*Math.sin(t*Math.PI);
      const rootY=y+axis[1]*length*t+normal[1]*.05*scale*Math.sin(t*Math.PI);
      for(const side of [-1,1]){
        const lobeAngle=angle+side*(.66+random()*.22)+(random()-.5)*.08;
        const lobeLength=scale*(.48+.15*Math.sin((i+1)/(pairs+1)*Math.PI))*(1-.10*t);
        const lobeWidth=scale*(.12+.032*random());
        leaf(foreground,rootX,rootY,lobeAngle,lobeLength,lobeWidth,
          side*(.025+random()*.045),light*(.77+.23*random()),depth,phase+i*1.4+side,2);
      }
    }
  };
  frond(-1.06,-.76,.92,1.35,.84,.73,.47,1.1,5);
  frond(1.08,-.85,2.25,1.44,.90,.78,.48,4.3,5);
  frond(-1.05,.68,-.28,1.24,.75,.83,.43,7.2,4);
  frond(.04,-1.00,1.53,1.55,1.16,.99,.82,10.2,7);
  return new Float32Array([...background,...foreground]);
}

export default function FoliageShaderStudy() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=canvasRef.current;
    const gl=canvas?.getContext('webgl2',{alpha:false,antialias:true,powerPreference:'low-power'});
    if(!canvas||!gl)return;
    let leaves:WebGLProgram,background:WebGLProgram;
    try{leaves=makeProgram(gl,leafVertex,leafFragment);background=makeProgram(gl,backgroundVertex,backgroundFragment);}
    catch(error){console.error('Foliage shader could not start:',error);return;}
    const data=makeLeaves(),buffer=gl.createBuffer(),vao=gl.createVertexArray();
    if(!buffer||!vao)return;
    gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    for(let i=0;i<3;i++){
      gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,4,gl.FLOAT,false,48,i*16);gl.vertexAttribDivisor(i,1);
    }
    gl.bindVertexArray(null);
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced=motion.matches,visible=true,frame=0,last=0;
    const started=performance.now();
    const onMotion=()=>{reduced=motion.matches;if(reduced)draw(0);};
    motion.addEventListener('change',onMotion);
    function draw(time:number){
      if(!gl||!canvas)return;
      gl.disable(gl.BLEND);gl.useProgram(background);gl.drawArrays(gl.TRIANGLES,0,3);
      gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(leaves);
      gl.uniform1f(gl.getUniformLocation(leaves,'time'),time);
      gl.uniform1f(gl.getUniformLocation(leaves,'aspect'),canvas.width/canvas.height);
      gl.bindVertexArray(vao);gl.drawArraysInstanced(gl.TRIANGLE_STRIP,0,128,data.length/12);gl.bindVertexArray(null);
    }
    function resize(){
      if(!canvas||!gl)return;
      const bounds=canvas.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);
      canvas.width=Math.max(1,Math.round(bounds.width*dpr));canvas.height=Math.max(1,Math.round(bounds.height*dpr));
      gl.viewport(0,0,canvas.width,canvas.height);draw(reduced?0:(performance.now()-started)/1000);
    }
    function tick(now:number){if(visible&&!reduced&&now-last>=33){draw((now-started)/1000);last=now;}frame=requestAnimationFrame(tick);}
    const ro=new ResizeObserver(resize);ro.observe(canvas);
    const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;});io.observe(canvas);
    resize();frame=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();motion.removeEventListener('change',onMotion);gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(leaves);gl.deleteProgram(background);};
  },[]);
  return <div className="grass-study foliage-study" role="img" aria-label="Live WebGL study of layered leaves growing from branching stems"><canvas ref={canvasRef} aria-hidden="true" /></div>;
}
