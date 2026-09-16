import {test,expect} from '@playwright/test';
import sharp from 'sharp';

for(const width of [390,768,1440]) test(`Trace color studies retain real shading and stable readings at ${width}`,async({page},testInfo)=>{
 await page.setViewportSize({width,height:1000});await page.goto('/projects/trace');
 const sheets=page.locator('.ts-variant-board');
 for(const sheet of await sheets.all()){
  for(const family of await sheet.locator('.ts-treatment').all()){
   const readings=await family.locator('.trace-study-dial').evaluateAll(svgs=>svgs.map(svg=>[...svg.querySelectorAll('text')].map(t=>t.textContent).join('|')));
   expect(new Set(readings).size,'color passes preserve the same reading and unit').toBe(1);
   const boxes=await family.locator('.trace-study-dial').evaluateAll(svgs=>svgs.map(svg=>svg.getBoundingClientRect().width));
   expect(Math.max(...boxes)-Math.min(...boxes),'palette changes never alter optical size').toBeLessThan(1);
  }
  await expect(sheet).not.toContainText('Failed attempt');await expect(sheet).not.toContainText('Sharing paused');
  const surface=sheet.locator('.trace-study-surface').first();
  expect(await surface.evaluate(n=>getComputedStyle(n).backgroundImage)).toContain('linear-gradient');
 }
 // Sample the actual rendered arc pixels, not just the presence of a gradient definition.
 const first=page.locator('[data-study=battery] .ts-treatment').first();
 for(const tone of ['green','amber','red']){
  const svg=first.locator(`[data-tone=${tone}]`);
  const png=await svg.screenshot({path:`test-results/views/trace-gradient-${tone}-${width}-${testInfo.project.name}.png`});
  const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const at=(x:number,y:number)=>{const index=(Math.round(y/160*(info.height-1))*info.width+Math.round(x/160*(info.width-1)))*info.channels;return [...data.subarray(index,index+3)]};
  const onArc=(angle:number)=>at(80+66*Math.cos(angle*Math.PI/180),80+66*Math.sin(angle*Math.PI/180));
  const lit=onArc(220),edge=onArc(385);
  const difference=lit.reduce((sum,c,i)=>sum+Math.abs(c-edge[i]),0);
  expect(difference,`${tone} has visible highlight-to-edge shading`).toBeGreaterThan(60);
  expect(lit.reduce((a,b)=>a+b)-edge.reduce((a,b)=>a+b),`${tone} keeps the same light direction`).toBeGreaterThan(40);
  if(tone==='amber'){expect(edge[0]).toBeGreaterThan(edge[1]);expect(edge[1]).toBeGreaterThan(edge[2]+45);}
  if(tone==='red'){expect(edge[0]).toBeGreaterThan(edge[1]+90);expect(edge[0]).toBeGreaterThan(edge[2]+60);}
  expect(Math.max(...at(80,145)),'the face is black, not a gray status tile').toBeLessThan(8);
 }
});

test('the final motion reuses the approved component material',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/projects/trace');
 const approved=page.getByRole('group',{name:'Approved green Trace direction',exact:true});
 const final=page.getByRole('group',{name:'Final Trace component',exact:true});
 await final.scrollIntoViewIfNeeded();
 await expect(final).toBeVisible();
 expect(await final.locator('text').allTextContents()).toEqual(await approved.locator('text').allTextContents());
 const materials=await Promise.all([approved,final].map(widget=>widget.evaluate(node=>({background:getComputedStyle(node).backgroundImage,border:getComputedStyle(node).borderColor,shadow:getComputedStyle(node).boxShadow}))));
 expect(materials[1]).toEqual(materials[0]);
});

test('palette headings explain the comparison and obsolete directions are absent',async({page})=>{
 await page.goto('/projects/trace');
 const section=page.locator('#explorations');
 await expect(section.getByText('Color passes · fixed sample readings',{exact:true})).toHaveCount(3);
 for(const removed of ['Direction to carry forward','Type only','A useful contrast','12h Paused','Failed attempt'])await expect(section).not.toContainText(removed);
 await expect(section.locator('details')).toHaveCount(0);
 await expect(page.getByRole('group',{name:'Approved green Trace direction',exact:true})).toBeVisible();
 await expect(page.getByRole('group',{name:'Recreated multicolor Trace concept',exact:true})).toBeVisible();
 await expect(section.getByRole('heading',{name:'Green',exact:true})).toBeVisible();
 await expect(section.getByRole('heading',{name:'Yellow',exact:true})).toBeVisible();
 await expect(section.getByRole('heading',{name:'Red',exact:true})).toBeVisible();
 for(const bar of await section.locator('.trace-signal-bars rect').all()){
  const width=Number(await bar.getAttribute('width')),height=Number(await bar.getAttribute('height'));
  expect(height/width,'signal bars keep a compact Watch-like proportion').toBeLessThanOrEqual(3.6);
 }
});

test('low signal symbols are compact and their disconnect marks stay separate',async({page},testInfo)=>{
 await page.setViewportSize({width:390,height:900});await page.goto('/projects/trace');
 for(const selector of ['.trace-signal-bars','.ts-signal-bars']){
  const symbols=await page.locator(selector).evaluateAll(groups=>groups.map(group=>{
   const bars=[...group.querySelectorAll('rect')].map(bar=>(bar as SVGGraphicsElement).getBBox());
   const width=Math.max(...bars.map(r=>r.x+r.width))-Math.min(...bars.map(r=>r.x));
   const height=Math.max(...bars.map(r=>r.y+r.height))-Math.min(...bars.map(r=>r.y));
   const cross=group.querySelector('path') as SVGGraphicsElement|null;
   return {ratio:width/height,barRatios:bars.map(r=>r.height/r.width),gap:cross?cross.getBBox().x-Math.max(...bars.map(r=>r.x+r.width)):null};
  }));
  expect(symbols.length).toBeGreaterThan(0);
  for(const symbol of symbols){expect(symbol.ratio).toBeGreaterThan(1.5);for(const ratio of symbol.barRatios)expect(ratio).toBeLessThanOrEqual(3.6);if(symbol.gap!==null)expect(symbol.gap).toBeGreaterThanOrEqual(4);}
 }
 for(const radio of await page.locator('.trace-radio-waves').all()){
  const ratio=await radio.evaluate(node=>{const box=(node as SVGGraphicsElement).getBBox();return box.width/box.height;});
  expect(ratio).toBeGreaterThan(1.3);
 }
 for(const variant of [0,3,4])await page.locator('[data-study=connection] .ts-treatment').nth(variant).screenshot({path:`test-results/views/trace-signal-${variant}-${testInfo.project.name}.png`});
});
