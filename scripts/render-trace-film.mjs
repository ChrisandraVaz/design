/** Deterministic device film. Uses the same editable vectors as the supplied motion reference.
 * node scripts/render-trace-film.mjs [--stills]
 * Frames live in the OS temp directory; only the poster and encoded MP4 ship.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {chromium} from '@playwright/test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const ts = require('typescript');
require.extensions['.tsx'] = (module, filename) => {
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
  });
  module._compile(result.outputText, filename);
};
require.extensions['.css'] = () => {};
require.extensions['.ts'] = require.extensions['.tsx'];
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const TraceWatch = require(path.join(root, 'src/components/TraceWatch.tsx')).default;
const watch = renderToStaticMarkup(React.createElement(TraceWatch));
const css = ['trace-studies.css', 'trace-watch.css'].map(name => fs.readFileSync(path.join(root, 'src/components', name), 'utf8')).join('\n');
const frames = fs.mkdtempSync(path.join(os.tmpdir(), 'trace-film-'));
const browser = await chromium.launch({channel: 'chrome'});
const page = await browser.newPage({viewport: {width: 1440, height: 1008}, deviceScaleFactor: 1});

await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
${css}
*{box-sizing:border-box}html,body{margin:0;width:1440px;height:1008px;overflow:hidden}
body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f8f8fa}
.stage{width:100%;height:100%;position:relative;overflow:hidden;background:radial-gradient(ellipse at 52% 32%,#fff 0%,#fafafb 45%,#f1f1f5 100%)}
.camera{position:absolute;inset:0;transform-origin:50% 50%;perspective:2400px;transform-style:preserve-3d}
.watch-rig{position:absolute;left:50%;top:50%;width:576px;height:907.77px;transform-style:preserve-3d}
.trace-watch-device{position:absolute;inset:0;transform:translateZ(12px);backface-visibility:visible}
.case-edge{position:absolute;left:6.15%;top:17.94%;width:86.4%;height:64.78%;border-radius:25.75% / 21.8%;background:linear-gradient(110deg,#99999d 0%,#353539 3%,#070708 15%,#141416 80%,#67676c 96%,#28282c 100%);border:1px solid #151518}
.glass-light{position:absolute;left:8.8%;top:19.9%;width:81.15%;height:60.9%;border-radius:24% / 20%;transform:translateZ(13px);pointer-events:none;background:linear-gradient(118deg,transparent 27%,#ffffff10 40%,transparent 56%);mix-blend-mode:screen;opacity:.2}
.shadow{position:absolute;top:90.5%;left:50%;width:290px;height:18px;border-radius:50%;background:#353544;filter:blur(20px);transform:translateX(-50%);opacity:.1}
</style></head><body><div class="stage"><div class="shadow"></div><div class="camera"><div class="watch-rig">${Array.from({length: 14}, (_, i) => `<div class="case-edge" style="transform:translateZ(${10-i*2}px)"></div>`).join('')}${watch}<div class="glass-light"></div></div></div></div>
<script>
// The object stays frontal enough to preserve the supplied face. The curved case has depth;
// the camera moves around it, then settles over the component. No unseen back is invented.
const keyframes = [
 {t:0,scale:1,y:0,rx:0,ry:0,rz:0},
 {t:1.5,scale:1,y:0,rx:0,ry:0,rz:0},
 {t:5,scale:1.035,y:0,rx:4,ry:-24,rz:-2},
 {t:8,scale:1.035,y:0,rx:-3,ry:22,rz:1.5},
 {t:11,scale:2.65,y:-236,rx:0,ry:-4,rz:0},
 {t:14,scale:2.65,y:-236,rx:0,ry:4,rz:0},
 {t:17.3,scale:1,y:0,rx:0,ry:0,rz:0},
 {t:18,scale:1,y:0,rx:0,ry:0,rz:0}
];
window.renderFrame = function(t){
 let a=keyframes[0],b=keyframes[1];
 for(let i=0;i<keyframes.length-1;i++){if(t>=keyframes[i].t){a=keyframes[i];b=keyframes[i+1];}}
 const p=Math.max(0,Math.min(1,(t-a.t)/(b.t-a.t))),ease=p*p*p*(p*(p*6-15)+10);
 const v={};for(const key of ['scale','y','rx','ry','rz'])v[key]=a[key]+(b[key]-a[key])*ease;
 document.querySelector('.camera').style.transform='translateY('+v.y+'px)';
 document.querySelector('.camera').style.perspective=(2400*v.scale)+'px';
 const rig=document.querySelector('.watch-rig');
 // Lay the vectors out at the camera's current size so close-ups stay sharp.
 rig.style.width=(576*v.scale)+'px';rig.style.height=(907.77*v.scale)+'px';
 rig.style.transform='translate(-50%,-50%) rotateX('+v.rx+'deg) rotateY('+v.ry+'deg) rotateZ('+v.rz+'deg)';
 document.querySelector('.glass-light').style.background='linear-gradient('+(112+v.ry*.8)+'deg,transparent 20%,#ffffff16 43%,transparent 66%)';
 document.querySelector('.shadow').style.opacity=String(.1/Math.pow(v.scale,3));
 document.querySelector('.shadow').style.transform='translateX(-50%) scaleX('+(1-Math.abs(v.ry)/160)+')';
};window.renderFrame(0);
</script></body></html>`);
await page.evaluate(() => document.fonts.ready);
for (const [name, time] of [['front', 0], ['left', 5], ['right', 8], ['detail', 12.5]]) {
  await page.evaluate(t => window.renderFrame(t), time);
  await page.screenshot({path: path.join(frames, `${name}.png`)});
}
await page.evaluate(() => window.renderFrame(0));
await page.screenshot({path: path.join(root, 'public/trace/watch-motion-poster.jpg'), type:'jpeg', quality:92});
fs.writeFileSync(path.join(frames, 'manifest.json'), JSON.stringify({width:1440, height:1008, fps:30, seconds:18}, null, 2)+'\n');
console.log(`Film stills: ${frames}`);
if (!process.argv.includes('--stills')) {
  for (let frame = 0; frame < 540; frame++) {
    await page.evaluate(t => window.renderFrame(t), frame / 30);
    await page.screenshot({path: path.join(frames, `${String(frame).padStart(4, '0')}.png`)});
    if (frame % 90 === 0) console.log(`Rendered ${frame}/540 frames`);
  }
}
await browser.close();
if (!process.argv.includes('--stills')) {
  const result = spawnSync('swift', ['-module-cache-path', path.join(os.tmpdir(), 'trace-swift-cache'), path.join(root, 'scripts/encode-trace-film.swift'), frames, path.join(root, 'public/trace/watch-motion.mp4')], {stdio:'inherit'});
  if (result.status !== 0) process.exit(result.status || 1);
}
