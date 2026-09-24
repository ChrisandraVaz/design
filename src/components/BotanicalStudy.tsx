'use client';

import { useEffect, useRef } from 'react';
import GrassShaderStudy from './GrassShaderStudy';
import './botanical-study.css';

type Kind = 'flowers' | 'leaf';

const screenVertex = `#version 300 es
precision highp float;
out vec2 uv;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  uv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const leafFragment = `#version 300 es
precision highp float;
in vec2 uv;
uniform vec2 resolution;
uniform float time;
out vec4 fragColor;
float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+1.0),f.x),f.y);
}
mat2 turn(float a) { return mat2(cos(a),-sin(a),sin(a),cos(a)); }
float outline(float t) {
  return .61 * pow(max(0.0,sin(clamp(t,0.0,1.0)*3.141593)),.66)
    * (1.0 + .035*sin(t*23.0) + .018*sin(t*41.0));
}
float heightAt(vec2 p) {
  float t=clamp((p.y+1.0)*.5,0.0,1.0), w=max(.01,outline(t));
  float side=abs(p.x)/w;
  float veinPhase=t*8.0-side*.42;
  return .38*(1.0-pow(min(side,1.0),.72))*sin(t*3.141593)
    + .021*sin(veinPhase*6.28318)*side
    + .055*sin(t*5.0+p.x*2.0);
}
vec4 leaf(vec2 p, float seed, float brightness) {
  float t=(p.y+1.0)*.5;
  float w=outline(t), side=abs(p.x)/max(w,.0001);
  float aa=2.0/resolution.y;
  float mask=smoothstep(-aa,aa,w-abs(p.x))*smoothstep(-aa,aa,t)*smoothstep(-aa,aa,1.0-t);
  // Curved slots grow outward from a rounded inner end, retaining one blade.
  for(int i=0;i<5;i++) {
    float root=.19+float(i)*.139+sign(p.x)*.023+sin(float(i)*3.1)*.009;
    float travel=clamp((side-.26)/.74,0.0,1.0);
    float center=root+.115*travel+.026*sin(travel*3.141593);
    float width=.002+.029*pow(travel,1.4);
    float slit=(1.0-smoothstep(width-aa,width+aa,abs(t-center)))*smoothstep(.25,.31,side);
    mask*=1.0-slit;
  }
  if(mask<.001)return vec4(0);
  float h=heightAt(p), e=.004;
  vec3 normal=normalize(vec3(-(heightAt(p+vec2(e,0))-h)/e,-(heightAt(p+vec2(0,e))-h)/e,1.0));
  vec3 light=normalize(vec3(-.7,.45,1.0));
  float diffuse=max(0.0,dot(normal,light));
  float spec=pow(max(0.0,dot(normal,normalize(light+vec3(0,0,1)))),18.0);
  float mottling=noise(p*18.0+seed)*.60+noise(p*57.0)*.25+noise(p*140.0)*.15;
  vec3 pigment=mix(vec3(.011,.052,.023),vec3(.074,.22,.082),mottling*.65+.18);
  float secondary=abs(sin((t*8.0-side*.42)*6.28318));
  float veins=exp(-secondary*55.0)*smoothstep(.06,.15,side);
  float fineVeins=pow(.5+.5*sin(t*360.0-side*155.0),18.0)*.016;
  // A tapered midrib catches light on one edge and shades the folded blade.
  float ribWidth=mix(.013,.003,clamp(t,0.0,1.0));
  float rib=1.0-smoothstep(ribWidth,ribWidth+aa,abs(p.x));
  float ribShadow=exp(-abs(p.x-ribWidth*1.7)*90.0);
  pigment*=.62+.62*diffuse;
  pigment+=vec3(.09,.16,.09)*fineVeins;
  pigment+=vec3(.21,.25,.095)*veins*.13;
  pigment+=vec3(.24,.34,.30)*spec*.72;
  pigment*=1.0-ribShadow*.16;
  pigment=mix(pigment,vec3(.20,.31,.12)*(.85+.15*diffuse),rib*.82);
  pigment*=1.0-.12*pow(side,4.0);
  pigment*=brightness;
  return vec4(pow(pigment,vec3(.83)),mask);
}
void main() {
  vec2 p=(uv-.5)*2.0; p.x*=resolution.x/resolution.y;
  vec3 color=mix(vec3(.006,.013,.012),vec3(.015,.039,.024),noise(p*2.5));
  float breeze=sin(time*.55)*.018;
  // Overlapping foliage fills the frame while the foreground blade stays dominant.
  vec4 behind=leaf(turn(.64+breeze*.3)*(p-vec2(-.60,.76))/.88,12.0,.38);
  color=mix(color,behind.rgb,behind.a);
  behind=leaf(turn(-1.14-breeze*.4)*(p-vec2(.64,.87))/.93,16.0,.33);
  color=mix(color,behind.rgb,behind.a);
  behind=leaf(turn(.93+breeze*.35)*(p-vec2(.46,-.78))/.87,19.0,.34);
  color=mix(color,behind.rgb,behind.a);
  behind=leaf(turn(-.48-breeze*.3)*(p-vec2(-.81,-.76))/.82,23.0,.37);
  color=mix(color,behind.rgb,behind.a);
  behind=leaf(turn(-.78+breeze*.5)*(p-vec2(.92,.25))/.94,4.0,.52);
  color=mix(color,behind.rgb,behind.a);
  behind=leaf(turn(.85-breeze*.7)*(p-vec2(-1.0,-.16))/.83,8.0,.54);
  color=mix(color,behind.rgb,behind.a);
  vec2 hero=turn(-.31+breeze)*(p-vec2(-.01,-.04))/1.11;
  vec4 front=leaf(hero,2.0,1.20);
  color=mix(color,front.rgb,front.a);
  color*=1.0-.15*smoothstep(.5,1.5,length(p));
  fragColor=vec4(color,1.0);
}`;

const flowerVertex = `#version 300 es
precision highp float;
layout(location=0) in vec4 bloom;
uniform vec2 resolution;
uniform float time;
out vec2 local;
out float variation;
const vec2 corners[6]=vec2[6](vec2(-1,-1),vec2(1,-1),vec2(-1,1),vec2(-1,1),vec2(1,-1),vec2(1,1));
void main() {
  local=corners[gl_VertexID]*1.15;
  vec2 center=bloom.xy;
  float wind=sin(center.x*2.0+center.y*3.0-time*.65);
  center+=vec2(.018,.009)*wind;
  vec2 point=center+local*bloom.z;
  point.x/=resolution.x/resolution.y;
  gl_Position=vec4(point,0,1);
  variation=bloom.w;
}`;

const flowerFragment = `#version 300 es
precision highp float;
in vec2 local;
in float variation;
out vec4 fragColor;
float hash(float n){return fract(sin(n*127.1)*43758.5453);}
void main() {
  vec2 p=local;
  float radius=length(p), count=10.0+floor(variation*4.0);
  float angle=atan(p.y,p.x)+variation*6.28318;
  float sector=6.28318/count;
  float index=floor(angle/sector+.5);
  float a=angle-index*sector;
  float r=hash(index+variation*19.0);
  vec2 q=vec2(cos(a),sin(a))*radius;
  q.x-=.56+(r-.5)*.035;
  float d=length(q/vec2(.39+(r-.5)*.06,.112+(r-.5)*.025))-1.0;
  float aa=max(fwidth(d),.035);
  float petals=1.0-smoothstep(-aa,aa,d);
  float disk=1.0-smoothstep(.225-fwidth(radius),.225+fwidth(radius),radius);
  float shadow=exp(-dot(p-vec2(.05,-.09),p-vec2(.05,-.09))*2.8)*.27;
  vec3 petalColor=mix(vec3(.64,.68,.57),vec3(.97,.94,.80),smoothstep(.20,.9,radius));
  petalColor*=.88+.12*cos(a*count*.5);
  petalColor+=vec3(.04)*p.y;
  float pollen=.5+.5*sin(p.x*125.0+sin(p.y*81.0))*sin(p.y*117.0);
  vec3 center=mix(vec3(.43,.26,.035),vec3(.91,.67,.16),.48+.45*pollen);
  center*=.79+.21*sqrt(max(0.0,1.0-radius/.225));
  vec3 color=mix(petalColor,center,disk);
  float alpha=max(petals,disk);
  color=mix(vec3(.01,.025,.006),color,alpha);
  fragColor=vec4(color,max(alpha,shadow));
}`;

function compile(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
  const program=gl.createProgram();
  if(!program)throw new Error('WebGL program unavailable');
  for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]] as const) {
    const shader=gl.createShader(type)!;
    gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(shader)||'Shader compilation failed');
    gl.attachShader(program,shader);gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program)||'Shader link failed');
  return program;
}

export default function BotanicalStudy({kind}:{kind:Kind}) {
  const ref=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    const canvas=ref.current;
    const gl=canvas?.getContext('webgl2',{alpha:kind==='flowers',antialias:true,premultipliedAlpha:false});
    if(!canvas||!gl)return;
    const program=compile(gl,kind==='flowers'?flowerVertex:screenVertex,kind==='flowers'?flowerFragment:leafFragment);
    const vao=gl.createVertexArray(),buffer=gl.createBuffer();
    gl.bindVertexArray(vao);
    let count=0;
    if(kind==='flowers') {
      let seed=1837;
      const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
      const flowers:number[]=[];
      for(let row=0;row<5;row++)for(let col=0;col<7;col++) {
        if(random()<.12)continue;
        flowers.push(-1.4+col*.45+(random()-.5)*.26,-.87+row*.44+(random()-.5)*.25,.065+Math.pow(random(),2)*.082,random());
      }
      count=flowers.length/4;
      gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(flowers),gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,4,gl.FLOAT,false,0,0);gl.vertexAttribDivisor(0,1);
    }
    const resolution=gl.getUniformLocation(program,'resolution'),timeUniform=gl.getUniformLocation(program,'time');
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let visible=true,frame=0,last=0;
    const started=performance.now();
    function draw(now:number) {
      if(!gl||!canvas)return;
      gl.useProgram(program);gl.bindVertexArray(vao);
      gl.uniform2f(resolution,canvas.width,canvas.height);
      gl.uniform1f(timeUniform,motion.matches?0:(now-started)/1000);
      if(kind==='flowers') {
        gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
        gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
        gl.drawArraysInstanced(gl.TRIANGLES,0,6,count);
      } else gl.drawArrays(gl.TRIANGLES,0,3);
    }
    function resize() {
      if(!gl||!canvas)return;
      const b=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
      canvas.width=Math.max(1,Math.round(Math.max(canvas.clientWidth,b.width)*dpr));canvas.height=Math.max(1,Math.round(Math.max(canvas.clientHeight,b.height)*dpr));
      gl.viewport(0,0,canvas.width,canvas.height);draw(performance.now());
    }
    function tick(now:number) {
      if(visible&&!document.hidden&&!motion.matches&&now-last>33){draw(now);last=now;}
      frame=requestAnimationFrame(tick);
    }
    const onMotion=()=>draw(performance.now());motion.addEventListener('change',onMotion);
    const ro=new ResizeObserver(resize);ro.observe(canvas);
    const io=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??false;});io.observe(canvas);
    resize();frame=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();motion.removeEventListener('change',onMotion);gl.deleteBuffer(buffer);gl.deleteVertexArray(vao);gl.deleteProgram(program);};
  },[kind]);
  return <div className={`grass-study botanical-study botanical-study--${kind}`} role="img" aria-label={kind==='flowers'?'Live WebGL meadow with pale daisies moving in the grass':'Live WebGL close-up of a broad split tropical leaf'}>
    {kind==='flowers'&&<GrassShaderStudy mode="field"/>}
    <canvas ref={ref} aria-hidden="true"/>
  </div>;
}
