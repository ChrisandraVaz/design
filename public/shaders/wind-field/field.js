'use strict';
const canvas = document.querySelector('#field');
const gl = canvas.getContext('webgl2', { antialias: true, preserveDrawingBuffer: true, alpha: false });
if (!gl) {
  canvas.setAttribute('aria-label', 'This landscape requires WebGL 2.');
  throw new Error('WebGL 2 unavailable');
}
const common = `#version 300 es
precision highp float;
`;
function program(vs, fs) {
  const p = gl.createProgram();
  for (const [type, source] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]) {
    const s = gl.createShader(type); gl.shaderSource(s, common + source); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    gl.attachShader(p,s);
  }
  gl.linkProgram(p); if (!gl.getProgramParameter(p,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  return p;
}
const grass = program(`
layout(location=0) in vec2 segment;
layout(location=1) in vec4 root;
layout(location=2) in vec4 trait;
uniform vec2 view;
uniform float time;
out vec3 color;
out float edge;
void main(){
  float t=segment.x;
  float wind=sin(root.x*.65+root.y*.45-time*.95)
    +.30*sin(root.y*1.4-root.x*.5-time*1.25);
  float gust=.5+.5*sin(root.x*.35+root.y*.24-time*.38);
  vec2 direction=normalize(root.zw);
  vec2 normal=vec2(-direction.y,direction.x);
  float bend=wind*(.105+.035*gust)*t*t;
  float length=trait.x;
  vec2 position=root.xy+direction*length*(t*.72+t*t*.28)*(1.+wind*.045*t)+normal*(bend+segment.y*trait.w*(1.-pow(t,1.4)));
  // A shared breeze moves neighboring tips together; roots stay planted.
  position+=vec2(.055,.022)*wind*t*t;
  position.y+=sin(t*3.14159)*length*.11;
  gl_Position=vec4(position/view,-t*.35-trait.y*.25,1.);
  float light=clamp(trait.y+wind*.026*t, .05, 1.);
  vec3 dark=vec3(.035,.073,.012);
  vec3 mid=vec3(.16,.42,.018);
  vec3 sun=vec3(.48,.80,.07);
  vec3 hue=mix(mid,sun,smoothstep(.30,1.,light));
  color=mix(dark,hue,pow(light,.8)*(.25+.75*pow(t,.65)));
  color*=.84+trait.z*.30;
  color+=vec3(.065,.085,.018)*pow(t,5.)*light;
  edge=segment.y;
}`, `
in vec3 color;
in float edge;
out vec4 frag;
void main(){frag=vec4(pow(color*(1.-.14*abs(edge)),vec3(.78)),1.);}
`);
const quadVS=`layout(location=0) in vec2 position; out vec2 uv; void main(){uv=position;gl_Position=vec4(position,0,1);}`;
const people=program(quadVS,`
in vec2 uv;out vec4 frag;uniform vec2 view;
float pixelAA;
float surfaceDepth;
float ellipse(vec2 p,vec2 r){return (length(p/r)-1.)*min(r.x,r.y);}
float capsule(vec2 p,vec2 a,vec2 b,float r){vec2 v=p-a,w=b-a;return length(v-w*clamp(dot(v,w)/dot(w,w),0.,1.))-r;}
float coverage(float d){return 1.-smoothstep(-pixelAA,pixelAA,d);}
vec4 over(vec4 back,vec4 front){
 float a=front.a+back.a*(1.-front.a);
 return vec4((front.rgb*front.a+back.rgb*back.a*(1.-front.a))/max(a,.00001),a);
}
vec4 paint(vec4 c,vec3 color,float d){return over(c,vec4(color,coverage(d)));}
float garment(vec2 p,int kind){
 // Separate cloth contours, measured against the four reference poses.
 vec2 v[10];
 if(kind==0){
  v=vec2[10](vec2(-.049,.014),vec2(.043,.014),vec2(.095,-.022),vec2(.117,-.072),vec2(.076,-.098),vec2(.104,-.181),vec2(.019,-.201),vec2(-.080,-.178),vec2(-.091,-.084),vec2(-.091,-.025));
 }else if(kind==1){
  v=vec2[10](vec2(-.045,.012),vec2(.047,.010),vec2(.092,-.027),vec2(.100,-.070),vec2(.077,-.091),vec2(.070,-.147),vec2(.012,-.174),vec2(-.068,-.145),vec2(-.088,-.077),vec2(-.084,-.025));
 }else if(kind==2){
  v=vec2[10](vec2(-.045,.013),vec2(.041,.012),vec2(.095,-.029),vec2(.103,-.079),vec2(.077,-.097),vec2(.079,-.186),vec2(.014,-.207),vec2(-.071,-.187),vec2(-.086,-.080),vec2(-.093,-.030));
 }else{
  v=vec2[10](vec2(-.047,.014),vec2(.044,.012),vec2(.097,-.019),vec2(.104,-.073),vec2(.080,-.096),vec2(.085,-.166),vec2(.024,-.195),vec2(-.074,-.171),vec2(-.092,-.074),vec2(-.095,-.023));
 }
 float d=dot(p-v[0],p-v[0]),sign=1.;
 for(int i=0,j=9;i<10;j=i,i++){
  vec2 e=v[j]-v[i],w=p-v[i];
  vec2 b=w-e*clamp(dot(w,e)/dot(e,e),0.,1.);
  d=min(d,dot(b,b));
  bvec3 test=bvec3(p.y>=v[i].y,p.y<v[j].y,e.x*w.y>e.y*w.x);
  if(all(test)||all(not(test)))sign=-sign;
 }
 return sign*sqrt(d)-.003;
}
vec4 person(vec2 world,vec2 center,int kind,float angle){
 float groupSpacing=min(.75,max(.1,(view.y*.62-.45)/5.675));
 center.y=(center.y-.675)*groupSpacing;
 vec2 delta=(world-center)/1.65;
 // Everything is already fully transparent before this circular cull boundary.
 // Screen-space derivatives were computed outside the branch in main().
 if(dot(delta,delta)>.49)return vec4(0.);
 mat2 rotation=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
 vec2 p=rotation*delta;
 // Shadow falls away from the shared image-right light.
 vec2 sp=(p-vec2(-.020,-.135))/vec2(.112,.155);
 float shadow=exp(-dot(sp,sp)*1.7)*.65*(1.-smoothstep(1.6,2.6,length(sp)));
 vec4 c=vec4(.018,.027,.009,shadow);
 float legs=min(ellipse(p-vec2(-.022,-.205),vec2(.024,.071)),ellipse(p-vec2(.027,-.194),vec2(.022,.063)));
 c=paint(c,vec3(.042,.052,.028),legs);
 vec3 skin=vec3(.66,.49,.32);
 vec2 leftWrist=vec2(-.108,-.101),rightWrist;
 float leftArm=capsule(p,vec2(-.088,-.060),leftWrist,.016);
 float rightArm;
 if(kind==0){
  rightWrist=vec2(.144,-.034);
  rightArm=capsule(p,vec2(.104,-.068),rightWrist,.016);
 }else if(kind==1){
  rightWrist=vec2(.123,-.005);
  rightArm=capsule(p,vec2(.094,-.054),rightWrist,.015);
 }else{
  rightWrist=vec2(.108,-.119);
  rightArm=capsule(p,vec2(.092,-.065),rightWrist,.015);
 }
 c=paint(c,skin*.86,leftArm);
 c=paint(c,skin*1.08,rightArm);
 // Hands extend beyond the sleeve contour instead of being painted over by it.
 c=paint(c,skin*.96,ellipse(p-leftWrist,vec2(.018,.024)));
 c=paint(c,skin*1.13,ellipse(p-rightWrist,vec2(.020,.022)));
 vec3 lit,shade;
 if(kind==0){lit=vec3(.804,.326,.122);shade=vec3(.431,.196,.071);}
 else if(kind==1){lit=vec3(.18,.79,.94);shade=vec3(.065,.34,.46);}
 else if(kind==2){lit=vec3(.835,.129,.196);shade=vec3(.282,.043,.043);}
 else{lit=vec3(.025,.34,.68);shade=vec3(.045,.16,.29);}
 vec2 localLight=rotation*normalize(vec2(.8,-.35));
 float clothLight=clamp(.84+dot(p,localLight)*2.9+.12*sin(p.y*15.+float(kind)),0.,1.);
 clothLight-=.18*(1.-smoothstep(-.085,-.025,dot(p,localLight)));
 float folds=.045*sin(p.x*68.+p.y*13.+float(kind)*2.)+.022*sin(p.x*119.-p.y*24.);
 folds-=.09*exp(-pow((p.x+.032+p.y*.08)/.013,2.));
 vec3 cloth=mix(shade,lit*1.08,clamp(clothLight+folds,0.,1.));
 float body=garment(p,kind);
 // A pale cloth edge is visible only on selected poses, interrupted by grass.
 float hemY=kind==1?-.157:(kind==3?-.180:-.194);
 float hem=exp(-pow((p.y-hemY-p.x*.07)/.006,2.));
 if(kind==1||kind==2||kind==3)cloth=mix(cloth,mix(lit,vec3(.76,.77,.66),.40),hem*.48);
 c=paint(c,cloth,body);
 c=paint(c,skin*.75,ellipse(p-vec2(.006,.014),vec2(.034,.034)));
 float hatShadow=ellipse(p-vec2(-.017,.018),vec2(.104,.093));
 c=over(c,vec4(.048,.042,.018,coverage(hatShadow)*coverage(body)*.48));
 // Broad straw brim around a raised crown: both remain legible at small scale.
 vec2 hp=p-vec2(-.007,.055);
 vec2 hatSize=vec2(.117,.104);
 float hat=ellipse(hp,hatSize);
 vec2 h=hp/hatSize;
 float radius=length(h);
 vec3 hatLit=vec3(.91,.88,.71),hatShade=vec3(.46,.43,.27);
 if(kind==1){hatLit=vec3(.94,.94,.85);hatShade=vec3(.55,.58,.43);}
 if(kind==3){hatLit=vec3(.88,.84,.65);hatShade=vec3(.48,.44,.29);}
 float brimLight=clamp(.65+dot(h,localLight)*.18,0.,1.);
 float strawGrain=.010*sin(radius*135.)+.006*sin(atan(h.y,h.x)*48.+radius*16.);
 vec3 hatColor=mix(hatShade,hatLit,brimLight)+strawGrain;
 vec2 crownPoint=hp-vec2(-.009,.014);
 vec2 crownSize=vec2(.071,.067);
 float crownRadius=length(crownPoint/crownSize);
 // The narrow base shadow separates the crown from the projecting brim.
 float crownShadow=exp(-pow((crownRadius-1.055)/.10,2.));
 hatColor*=1.-.27*crownShadow;
 float crownMask=coverage(ellipse(crownPoint,crownSize));
 vec2 slope=crownPoint/crownSize;
 float crownLight=clamp(.73+dot(slope,localLight)*.28+.11*(1.-min(crownRadius,1.)),0.,1.);
 vec3 crownColor=mix(hatShade,hatLit,crownLight)+strawGrain*.65;
 hatColor=mix(hatColor,crownColor,crownMask);
 // A thin woven binding defines the outer edge without a heavy outline.
 float rim=smoothstep(.93,.99,radius);
 vec3 rimColor=mix(hatShade,hatLit,.43+clamp(dot(h,localLight)*.12,-.12,.12));
 hatColor=mix(hatColor,rimColor,rim*.8);
 c=paint(c,hatColor,hat);
 // Keep clothing opaque. Real moving grass depth hides the lower silhouette.
 float immersion=smoothstep(.13,.275,-p.y);
 if(c.a>.001)surfaceDepth=min(surfaceDepth,mix(.17,.43,immersion));
 return c;
}
void main(){
 vec2 p=uv*view;
 vec2 pixelSize=fwidth(p);
 pixelAA=max(max(pixelSize.x,pixelSize.y)*.5/1.65,.0007);
 surfaceDepth=1.;
 vec4 c=vec4(0.);
 c=over(c,person(p,vec2(-3.05,6.35),0,.17));
 c=over(c,person(p,vec2(-1.6,2.15),1,.29));
 c=over(c,person(p,vec2(.85,-1.0),2,.10));
 c=over(c,person(p,vec2(2.7,-5.0),3,.24));
 if(c.a<.001)discard;
 gl_FragDepth=surfaceDepth;
 frag=c;
}
`);
const ground=program(quadVS,`in vec2 uv;out vec4 frag;void main(){frag=vec4(.031,.062,.009,1.);}`);
const quad=gl.createVertexArray();gl.bindVertexArray(quad);
const qb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,qb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
const vao=gl.createVertexArray();gl.bindVertexArray(vao);
const geometry=[];
for(let i=0;i<5;i++){const a=i/5,b=(i+1)/5;geometry.push(a,-1,a,1,b,-1,b,-1,a,1,b,1);}
const gb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,gb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(geometry),gl.STATIC_DRAW);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
const instances=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,instances);
for(let i=1;i<=2;i++){gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,4,gl.FLOAT,false,32,(i-1)*16);gl.vertexAttribDivisor(i,1);}
// A small set of actual grass blades sits in front of each lower body.
const foregroundVao=gl.createVertexArray();gl.bindVertexArray(foregroundVao);
gl.bindBuffer(gl.ARRAY_BUFFER,gb);gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
const foregroundInstances=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,foregroundInstances);
for(let i=1;i<=2;i++){gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,4,gl.FLOAT,false,32,(i-1)*16);gl.vertexAttribDivisor(i,1);}
let foregroundCount=0;
let seed=42,count=0;
function hash(x,y){let n=Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(seed,144269);n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;}
function noise(x,y){let ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy);const a=hash(ix,iy),b=hash(ix+1,iy),c=hash(ix,iy+1),d=hash(ix+1,iy+1);return a+(b-a)*fx+(c-a)*fy+(a-b-c+d)*fx*fy;}
function terrain(x,y){
 const wx=x+2.1*(noise(x*.32+7,y*.32)-.5), wy=y+2.1*(noise(x*.32,y*.32+19)-.5);
 return noise(wx*.69,wy*.69)*.82+noise(wx*1.36+4,wy*1.36)*.18;
}
function generate(){
 // Each instance is a tapered, curved blade. Large-scale relief determines
 // both its lighting and direction, so highlights follow the folds.
 const n=340000,data=new Float32Array(n*8);count=n;
 let state=seed;function random(){state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;}
 for(let i=0;i<n;i++){
   const x=(random()-.5)*28,y=(random()-.5)*22,h=terrain(x,y);
   const dx=(terrain(x+.035,y)-terrain(x-.035,y))/.07,dy=(terrain(x,y+.035)-terrain(x,y-.035))/.07;
   const angle=1.25+noise(x*.25+20,y*.25)*5.5;
   let vx=Math.cos(angle)*.38-dx*1.7+dy*1.3,vy=Math.sin(angle)*.38-dy*1.7-dx*1.3+.65;
   const len=Math.hypot(vx,vy);vx/=len;vy/=len;
   const ridge=Math.max(0,Math.min(1,(h-.25)*1.5+dx*.75+dy*.30));
   const light=Math.max(.075,Math.min(1,.18+ridge*1.15));
   const r=random();
   data.set([x,y,vx,vy,.18+random()*.30+len*.13,light,r,.0029+random()*.0045],i*8);
 }
 gl.bindBuffer(gl.ARRAY_BUFFER,instances);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
}
const uniforms=new Map();for(const p of [grass,people])uniforms.set(p,{view:gl.getUniformLocation(p,'view'),time:gl.getUniformLocation(p,'time')});
// Fill the viewport without stretching the grass or people.
const view=[6,9];
let time=0,last=0;
function generateForeground(){
 const data=[];
 const spacing=Math.min(.75,Math.max(.1,(view[1]*.62-.45)/5.675));
 const figures=[[-3.05,6.35,.17],[-1.6,2.15,.29],[.85,-1,.10],[2.7,-5,.24]];
 let state=9721;
 const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
 for(const [cx,baseY,angle] of figures){
  const cy=(baseY-.675)*spacing,c=Math.cos(angle),s=Math.sin(angle);
  for(let i=0;i<72;i++){
   const lx=(random()-.5)*.23*1.65,ly=(-.255+random()*.045)*1.65;
   const x=cx+c*lx-s*ly,y=cy+s*lx+c*ly;
   const lean=(random()-.5)*.95+.20*Math.sin(x*2.3+y);
   const inv=1/Math.hypot(lean,1);
   const vx=(c*lean-s)*inv,vy=(s*lean+c)*inv;
   const h=terrain(x,y);
   const dx=(terrain(x+.035,y)-terrain(x-.035,y))/.07;
   const dy=(terrain(x,y+.035)-terrain(x,y-.035))/.07;
   const ridge=Math.max(0,Math.min(1,(h-.25)*1.5+dx*.75+dy*.30));
   const light=Math.max(.075,Math.min(1,.18+ridge*1.15));
   data.push(x,y,vx,vy,.15+random()*.16,light,random(),.0018+random()*.0021);
  }
 }
 foregroundCount=data.length/8;
 gl.bindBuffer(gl.ARRAY_BUFFER,foregroundInstances);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
}
function resize(){
 const dpr=Math.min(devicePixelRatio,2);
 const bounds=canvas.getBoundingClientRect();
 const aspect=bounds.width/bounds.height;
 view[1]=Math.min(10.5,Math.max(9,6/aspect));
 view[0]=view[1]*aspect;
 if(view[0]>13.5){view[0]=13.5;view[1]=13.5/aspect;}
 canvas.width=Math.round(bounds.width*dpr);
 canvas.height=Math.round(bounds.height*dpr);
 gl.viewport(0,0,canvas.width,canvas.height);
 generateForeground();
}
function render(){
 gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.clear(gl.DEPTH_BUFFER_BIT);gl.bindVertexArray(quad);gl.useProgram(ground);gl.drawArrays(gl.TRIANGLES,0,6);
 gl.enable(gl.DEPTH_TEST);gl.bindVertexArray(vao);gl.useProgram(grass);gl.uniform2fv(uniforms.get(grass).view,view);gl.uniform1f(uniforms.get(grass).time,time);gl.drawArraysInstanced(gl.TRIANGLES,0,30,count);
 // Keep the four figures readable above the dense field. The small foreground
 // blade pass below restores the grass overlap around their feet.
 gl.disable(gl.DEPTH_TEST);gl.depthMask(false);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.bindVertexArray(quad);gl.useProgram(people);gl.uniform2fv(uniforms.get(people).view,view);gl.drawArrays(gl.TRIANGLES,0,6);gl.depthMask(true);
 // These foreground stems use exactly the field's blade geometry and wind.
 gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.bindVertexArray(foregroundVao);gl.useProgram(grass);gl.drawArraysInstanced(gl.TRIANGLES,0,30,foregroundCount);
}
let firstFrame=true;
function tick(now){
 if(last)time+=Math.min((now-last)/1000,.1);
 last=now;
 render();
 if(firstFrame){
  firstFrame=false;
  if(window.parent!==window)window.parent.postMessage({type:'portfolio-wind-field-ready'},window.location.origin);
 }
 requestAnimationFrame(tick);
}
window.addEventListener('resize',resize);
document.addEventListener('visibilitychange',()=>{last=0;});
generate();resize();requestAnimationFrame(tick);
