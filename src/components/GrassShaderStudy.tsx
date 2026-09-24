'use client';

import { useEffect, useRef } from 'react';

type Study = 'field' | 'close';

const vertexSource = `#version 300 es
precision highp float;
layout(location=0) in vec4 blade;
layout(location=1) in vec4 detail;
uniform float time;
uniform float aspect;
uniform float mode;
out vec3 color;
out float across;
out float along;
out float seed;

void main() {
  float t = float(gl_VertexID / 2) / 11.0;
  float side = (gl_VertexID % 2 == 0) ? -1.0 : 1.0;
  vec2 direction = vec2(cos(blade.z), sin(blade.z));
  vec2 normal = vec2(-direction.y, direction.x);
  float layer = floor(detail.w / 16.0);
  float phase = mod(detail.w, 16.0);
  float gust = sin(blade.x * 4.2 + blade.y * 2.5 - time * .72 + phase);
  gust += .35 * sin(blade.x * 8.4 - blade.y * 4.8 - time * 1.13);
  float bend = detail.y * (.88 * sin(t * 3.14159) + .22 * t) + gust * .034 * t * t;
  float width = mode < .5
    ? detail.x * smoothstep(0.0, .13, t) * pow(1.0 - t, .68)
    : detail.x * pow(max(0.0, sin(t * 3.14159)), .72) * (1.0 + .12 * sin(t * 5.0 + phase));
  vec2 point = blade.xy + direction * blade.w * (t * .82 + t * t * .18)
    + normal * (bend + side * width + .013 * sin(t * 5.2 + phase) * t);
  point.x /= aspect;
  gl_Position = vec4(point, 0.0, 1.0);

  float light = .5 + .5 * sin(blade.x * 3.4 + blade.y * 2.1 - time * .35);
  float variation = detail.z;
  vec3 darkColor = mode < .5 ? vec3(.085,.165,.046) : vec3(.014,.062,.024);
  vec3 midColor = mode < .5 ? vec3(.25,.46,.12) : vec3(.075,.29,.105);
  vec3 litColor = mode < .5 ? vec3(.66,.83,.31) : vec3(.40,.68,.24);
  color = mix(darkColor, midColor, (mode < .5 ? .54 : .12) + (mode < .5 ? .44 : .82) * variation);
  color = mix(color, litColor, pow(light, 1.8) * ((mode < .5 ? .18 : .03) + (mode < .5 ? .70 : .85) * variation));
  color *= ((mode < .5 ? .84 : .64) + (mode < .5 ? .17 : .18) * layer)
    * (.82 + .24 * sin(phase * 6.19));
  color *= mode < .5 ? (.84 + .16 * t) : (.70 + .34 * sin(t * 3.14159));
  across = side;
  along = t;
  seed = phase;
}`;

const fragmentSource = `#version 300 es
precision highp float;
in vec3 color;
in float across;
in float along;
in float seed;
uniform float mode;
out vec4 outColor;
void main() {
  float rib = .5 + .5 * sin(along * 102.0 + seed * 11.0 + across * 9.0);
  float vein = exp(-abs(across - .08) * 12.0);
  float sheen = pow(max(0.0, 1.0 - abs(across + .12)), 2.4);
  float sideLight = .70 + .32 * sheen + .12 * across;
  float fibers = mode < .5
    ? .026 * sin(across * 18.0 + seed * 2.0 + along * 5.0)
    : .055 * sin(across * 22.0 + seed * 2.0 + along * 3.0)
      + .026 * sin(across * 40.0 - along * 11.0 + seed);
  float surface = mode < .5 ? sideLight : .46 + .66 * pow(max(0.0, 1.0 - abs(across + .21)), 2.1);
  float midrib = mode < .5 ? .14 * vein : .30 * exp(-abs(across) * 17.0);
  vec3 pigment = color * (surface + midrib + .028 * rib + fibers);
  float edge = 1.0 - smoothstep(1.0 - fwidth(across) * 1.15, 1.0, abs(across));
  outColor = vec4(pow(pigment, vec3(.86)), edge);
}`;

const backdropVertex = `#version 300 es
precision highp float;
const vec2 points[3] = vec2[3](vec2(-1.,-1.),vec2(3.,-1.),vec2(-1.,3.));
out vec2 uv;
void main() { gl_Position = vec4(points[gl_VertexID],0.,1.); uv = .5 + .5 * points[gl_VertexID]; }`;

const backdropFragment = `#version 300 es
precision highp float;
in vec2 uv;
uniform float mode;
out vec4 outColor;
float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453); }
void main() {
  vec3 low = mode < .5 ? vec3(.026,.075,.027) : vec3(.009,.052,.026);
  vec3 high = mode < .5 ? vec3(.098,.176,.049) : vec3(.029,.117,.060);
  float shade = .23 + .5 * uv.y + .17 * sin(uv.x * 9. + uv.y * 5.);
  vec3 c = mix(low, high, clamp(shade,0.,1.));
  c += (hash(gl_FragCoord.xy) - .5) * .018;
  outColor = vec4(c,1.);
}`;

function makeProgram(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const shaders: WebGLShader[] = [];
  for (const [type, source] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]] as [number, string][]) {
    const shader = gl.createShader(type);
    if (!shader) throw new Error('WebGL shader unavailable');
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const issue = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(issue || 'Shader compilation failed');
    }
    shaders.push(shader);
  }
  const program = gl.createProgram();
  if (!program) throw new Error('WebGL program unavailable');
  for (const shader of shaders) gl.attachShader(program, shader);
  gl.linkProgram(program);
  for (const shader of shaders) gl.deleteShader(shader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const issue = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(issue || 'WebGL program link failed');
  }
  return program;
}

function randomSequence(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createBlades(mode: Study) {
  const random = randomSequence(mode === 'field' ? 1904 : 8231);
  const layers = mode === 'field' ? [42000, 18000, 5300, 0] : [1800, 1200, 800, 35];
  const output = new Float32Array(layers.reduce((sum, count) => sum + count, 0) * 8);
  let index = 0;
  layers.forEach((count, layer) => {
    const tuftCount = mode === 'field' ? [360, 220, 130, 44][layer] : [72, 50, 28, 15][layer];
    const tufts = Array.from({ length: tuftCount }, () => {
      let x = random() * 4.4 - 2.2;
      const y = random() * 4.3 - 2.15;
      // Keep the taller crossing stems out of the upper-center clearing.
      if (mode === 'field' && layer > 0 && Math.abs(x) < .78 && y > -.10 && y < 1.35) {
        x += x < 0 ? -.86 : .86;
      }
      return [x, y, random() < .55 ? .62 : 2.46];
    });
    for (let i = 0; i < count; i++) {
      // Fine rooted blades make a continuous field beneath the larger clumps.
      // The taller blades still share tuft roots and move together.
      const tuft = mode === 'field' && layer < 2
        ? [(random() - .5) * 2.7, (random() - .5) * 2.7, 1.16]
        : tufts[Math.floor(random() * tuftCount)];
      const r = random();
      const direction = mode === 'field'
        ? (r < .8 ? 1.16 : 2.10) + (random() - .5) * 1.05
        : tuft[2] + (random() - .5) * (layer < 2 ? 1.15 : .86);
      const length = mode === 'field'
        ? [.22, .34, .56, 1.05][layer] * (.64 + random() * .93)
        : [.24, .62, 1.10, 2.05][layer] * (.64 + random() * .76);
      const width = mode === 'field'
        ? [.0035, .0060, .010, .026][layer] * (.60 + random() * .95)
        : [.0035, .012, .027, .098][layer] * (.62 + random() * .86);
      const jitter = [.065, .095, .13, .19][layer];
      output.set([
        tuft[0] + (random() - .5) * jitter,
        tuft[1] + (random() - .5) * jitter,
        direction,
        length,
        width,
        (random() - .5) * length * .84,
        Math.pow(random(), .75),
        layer * 16 + random() * 12,
      ], index);
      index += 8;
    }
  });
  return output;
}

export default function GrassShaderStudy({ mode }: { mode: Study }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2', { alpha: false, antialias: true, powerPreference: 'low-power' });
    if (!gl) return;
    let bladeProgram: WebGLProgram;
    let backgroundProgram: WebGLProgram;
    try {
      bladeProgram = makeProgram(gl, vertexSource, fragmentSource);
      backgroundProgram = makeProgram(gl, backdropVertex, backdropFragment);
    } catch (error) {
      console.error('Grass study could not start:', error);
      return;
    }

    const data = createBlades(mode);
    const buffer = gl.createBuffer();
    const vao = gl.createVertexArray();
    if (!buffer || !vao) return;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    for (let attribute = 0; attribute < 2; attribute++) {
      gl.enableVertexAttribArray(attribute);
      gl.vertexAttribPointer(attribute, 4, gl.FLOAT, false, 32, attribute * 16);
      gl.vertexAttribDivisor(attribute, 1);
    }
    gl.bindVertexArray(null);

    let visible = true;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let last = 0;
    const start = performance.now();
    const modeValue = mode === 'field' ? 0 : 1;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => { reducedMotion = motion.matches; if (reducedMotion) render(0); };
    motion.addEventListener('change', onMotion);

    function resize() {
      if (!canvas || !gl) return;
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(2, window.devicePixelRatio || 1);
      const width = Math.max(1, Math.round(Math.max(canvas.clientWidth, bounds.width) * ratio));
      const height = Math.max(1, Math.round(Math.max(canvas.clientHeight, bounds.height) * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      render(reducedMotion ? 0 : (performance.now() - start) / 1000);
    }

    function render(time: number) {
      if (!gl || !canvas) return;
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      gl.useProgram(backgroundProgram);
      gl.uniform1f(gl.getUniformLocation(backgroundProgram, 'mode'), modeValue);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.useProgram(bladeProgram);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniform1f(gl.getUniformLocation(bladeProgram, 'time'), time);
      gl.uniform1f(gl.getUniformLocation(bladeProgram, 'aspect'), canvas.width / canvas.height);
      gl.uniform1f(gl.getUniformLocation(bladeProgram, 'mode'), modeValue);
      gl.bindVertexArray(vao);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 24, data.length / 8);
      gl.bindVertexArray(null);
    }

    function tick(now: number) {
      if (visible && !reducedMotion && now - last >= 33) {
        render((now - start) / 1000);
        last = now;
      }
      frame = requestAnimationFrame(tick);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
    });
    visibilityObserver.observe(canvas);
    resize();
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      motion.removeEventListener('change', onMotion);
      gl.deleteBuffer(buffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(bladeProgram);
      gl.deleteProgram(backgroundProgram);
    };
  }, [mode]);

  return <div className={`grass-study grass-study-${mode}`} role="img" aria-label={mode === 'field' ? 'Live WebGL study of fine grass moving in wind' : 'Live WebGL close-up of overlapping green grass blades'}>
    <canvas ref={canvasRef} aria-hidden="true" />
  </div>;
}
