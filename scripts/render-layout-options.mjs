import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {layoutCSS} from '../public/layout-options/preview.js';
const layouts=JSON.parse(await fs.readFile('public/layout-options/layouts.json','utf8'));
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await page.clock.install({time:new Date('2026-09-14T12:00:00Z')});
await page.goto(process.env.EVAL_URL||'http://127.0.0.1:3012/');
await page.locator('.widget-world[data-ready="true"]').waitFor();
await page.evaluate(()=>document.fonts.ready);
await page.clock.pauseAt(new Date('2026-09-14T12:00:06Z'));
await page.evaluate(()=>document.querySelectorAll('video').forEach(video=>{video.pause();if(video.readyState>0)video.currentTime=3;}));
const style=await page.addStyleTag({content:'/* layout preview */'});
for(const theme of ['dark','light']){
 if(await page.locator('.canvas-folio').getAttribute('data-theme')!==theme)await page.locator('.theme-control').click();
 await page.clock.runFor(200);
 await page.mouse.move(0,0);
 for(const layout of layouts){
  await style.evaluate((el,css)=>el.textContent=css,layoutCSS(layout));
  await page.locator('.scatter-9 .agent-film').evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=13980}));
  await page.clock.runFor(32);
  // React mounts the answer and success toast on the next film tick. Let those
  // one-shot reveals finish so each still shows a settled, readable endpoint.
  await page.locator('.scatter-9 .agent-film').evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>{if(a.effect.getTiming().iterations!==Infinity){a.pause();a.currentTime=13980}}));
  await page.clock.runFor(32);
  const geometry=await page.evaluate(()=>({frame:document.querySelector('.scatter-viewport').getBoundingClientRect().toJSON(),cards:[...document.querySelectorAll('.scatter-item')].map(el=>{const b=el.getBoundingClientRect(),l=el.querySelector('.card-heading>span')?.getBoundingClientRect();return{id:el.dataset.cardId,x:Math.min(b.x,l?.x??b.x),y:Math.min(b.y,l?.y??b.y),right:Math.max(b.right,l?.right??b.right),bottom:Math.max(b.bottom,l?.bottom??b.bottom)}})}));
  const overlaps=[];
  for(let i=0;i<geometry.cards.length;i++)for(let j=i+1;j<geometry.cards.length;j++){const a=geometry.cards[i],b=geometry.cards[j];if(a.x<b.right&&a.right>b.x&&a.y<b.bottom&&a.bottom>b.y)overlaps.push(`${a.id}/${b.id}`)}
  if(overlaps.length)throw new Error(`${layout.id}: ${overlaps.join(', ')} overlap`);
  const right=Math.max(...geometry.cards.map(c=>c.right)),left=Math.min(...geometry.cards.map(c=>c.x));
  if(Math.abs(left-geometry.frame.x)>1||Math.abs(right-geometry.frame.right)>2)throw new Error(`${layout.id}: frame edges do not align ${left} ${right}`);
  await page.screenshot({path:`public/layout-options/images/${layout.id}-${theme}.jpg`,type:'jpeg',quality:88,fullPage:true});
  console.log(`Rendered ${layout.id} ${theme}; no overlaps, both edges aligned`);
 }
}
await browser.close();
