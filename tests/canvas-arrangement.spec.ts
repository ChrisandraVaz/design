import {test,expect} from '@playwright/test';
import baseline from './fixtures/non-sentry-card-dimensions.json';

// Preserve the original sizes except the explicitly requested gap-filling changes.
for(const width of [390,768,1154,1440,1920]) test(`non-Sentry cards retain their authored dimensions within the fitted view at ${width}`,async({page},testInfo)=>{
 await page.setViewportSize({width,height:900});await page.goto('/');
 await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
 await page.evaluate(()=>document.fonts.ready);
 const expected=baseline[String(width) as keyof typeof baseline];
 const viewRatio=width>1100?await page.locator('.scatter').evaluate(el=>{const root=el as HTMLElement,viewport=root.parentElement!.getBoundingClientRect();return (root.getBoundingClientRect().width/root.offsetWidth)/(viewport.width/1200);}):1;
 for(const before of expected){
  if(width>1100&&['trace','metallic','5','10','12','paint'].includes(before.id))continue;
  const card=page.locator(`[data-card-id="${before.id}"]`),after=(await card.boundingBox())!;
  expect(Math.abs(after.width/viewRatio-before.width),`${before.id} width`).toBeLessThan(1);
  expect(Math.abs(after.height/viewRatio-before.height),`${before.id} height`).toBeLessThan(1);
 }
 if(width>1100){
  const agent=(await page.locator('.scatter-9').boundingBox())!,queue=(await page.locator('.scatter-1').boundingBox())!;
  expect(queue.width/agent.width).toBeCloseTo(1,2);
  expect(Math.abs(queue.x-agent.x)).toBeLessThan(.2);
  const font=(await page.locator('.scatter-fontcontext-slot').boundingBox())!;
  const fit=await page.locator('.scatter').evaluate(el=>el.getBoundingClientRect().width/(el as HTMLElement).offsetWidth);
  const watch=(await page.locator('.scatter-trace').boundingBox())!,claims=(await page.locator('.scatter-claims').boundingBox())!,split=(await page.locator('.scatter-2').boundingBox())!,shader=(await page.locator('.scatter-12').boundingBox())!,relative=(await page.locator('.scatter-3').boundingBox())!,metallic=(await page.locator('.scatter-metallic').boundingBox())!,news=(await page.locator('.scatter-5').boundingBox())!,nike=(await page.locator('.scatter-10').boundingBox())!;
  expect(Math.abs(split.width-claims.width),'Split Panel and Interest Claims widths match').toBeLessThan(.2);
  expect(Math.abs(split.x-claims.x),'Split Panel aligns with Interest Claims').toBeLessThan(.2);
  const horizontalGaps:Array<[string,typeof agent,typeof agent]>=[
   ['Send to Agent → Font Context',agent,font],
   ['Font Context → Shader',font,shader],
   ['Shader → Relative Time',shader,relative],
   ['Message Queuing → Apple Watch',queue,watch],
   ['Apple Watch → Interest Claims',watch,claims],
   ['Metallic → News',metallic,news],
   ['News → Nike',news,nike],
   ['Nike → Split Panel',nike,split],
  ];
  for(const [label,left,right] of horizontalGaps)expect(Math.abs((right.x-left.x-left.width)/fit-24),`${label} uses the shared 24px gap`).toBeLessThan(.35);
  expect(Math.abs((shader.x-font.x-font.width)/fit-24)).toBeLessThan(.2);
  expect(Math.abs((relative.x-shader.x-shader.width)/fit-24)).toBeLessThan(.2);
  expect(Math.abs(metallic.x-queue.x),'Metallic aligns with Message Queuing').toBeLessThan(.2);
  expect(Math.abs(metallic.width-queue.width),'Metallic matches Message Queuing width').toBeLessThan(.2);
  const paint=(await page.locator('.scatter-paint').boundingBox())!;
  expect(Math.abs(paint.x-news.x),'Paint aligns with News').toBeLessThan(.2);
  expect(Math.abs(paint.width-(nike.x+nike.width-news.x)),'Paint spans the News and Nike columns').toBeLessThan(.2);
  expect(Math.abs((paint.y-nike.y-nike.height)/fit-24),'Paint sits one shared gap below Nike').toBeLessThan(.35);
  const lowerSurfaces=await Promise.all([
   page.locator('.scatter-metallic > .portfolio-experiment-card').boundingBox(),
   page.locator('.scatter-paint > .portfolio-experiment-card').boundingBox(),
   page.locator('.scatter-2 > .sentry-preview-card').boundingBox(),
  ]);
  expect(Math.max(...lowerSurfaces.map(box=>box!.y))-Math.min(...lowerSurfaces.map(box=>box!.y)),'lower card surfaces align').toBeLessThan(.2);
  expect((font.x-agent.x-agent.width)/fit).toBeGreaterThan(20);
  expect((font.x-agent.x-agent.width)/fit).toBeLessThan(28);
  const agentLabel=(await page.locator('.scatter-9 .card-heading>span').boundingBox())!,fontLabel=(await page.locator('.scatter-fontcontext-slot .card-heading>span').boundingBox())!;
  expect(Math.abs(agentLabel.y-fontLabel.y)).toBeLessThan(9);
  const heading=(await page.locator('h1').boundingBox())!;
  expect(agent.y-heading.y-heading.height).toBeGreaterThan(24);
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:`test-results/views/puzzle-components-${width}-${testInfo.project.name}.png`});
});


for(const [width,height] of [[1154,603],[1280,800],[1440,900],[1920,1080]])test(`desktop puzzle fills the frame without overlaps at ${width}x${height}`,async({page})=>{
 await page.setViewportSize({width,height});await page.goto('/');await page.evaluate(()=>document.fonts.ready);
 const cards=await page.locator('.scatter-item').evaluateAll(els=>els.map(el=>{
  const b=el.getBoundingClientRect(),label=el.querySelector('.card-heading>span')?.getBoundingClientRect();
  return {id:el.getAttribute('data-card-id'),x:Math.min(b.x,label?.x??b.x),y:Math.min(b.y,label?.y??b.y),right:Math.max(b.right,label?.right??b.right),bottom:Math.max(b.bottom,label?.bottom??b.bottom)};
 }));
 const frame=(await page.locator('.scatter-viewport').boundingBox())!;
 for(const a of cards){
  expect(a.x).toBeGreaterThanOrEqual(0);expect(a.right).toBeLessThanOrEqual(width);

  for(const b of cards.filter(c=>c.id!==a.id)){
   // Paint's left-aligned title sits beside Nike in the intentional stagger;
   // their actual card surfaces retain the asserted 24px vertical gap.
   if([a.id,b.id].sort().join(':')==='10:paint')continue;
   expect(a.right<=b.x||b.right<=a.x||a.bottom<=b.y||b.bottom<=a.y,`${a.id} and ${b.id} do not overlap`).toBe(true);
  }
 }
 expect(Math.abs(Math.min(...cards.map(c=>c.x))-frame.x)).toBeLessThan(2.1);
 expect(frame.x+frame.width-Math.max(...cards.map(c=>c.right))).toBeLessThan(26);
 const agent=cards.find(c=>c.id==='9')!,font=cards.find(c=>c.id==='fontcontext')!;
 expect(Math.abs(agent.y-Math.min(...cards.map(c=>c.y)))).toBeLessThan(5);
 expect(Math.abs(font.y-agent.y)).toBeLessThan(5);
 // Applying the approved gallery option must leave the real homepage unchanged.
 const approved=await page.evaluate(async()=>{
  const path='/layout-options/preview.js';
  const {layoutCSS}=await import(path);
  const options=await fetch('/layout-options/layouts.json').then(r=>r.json());
  const style=document.createElement('style');style.textContent=layoutCSS(options.find((o:{id:string})=>o.id==='02'));document.head.append(style);
  return [...document.querySelectorAll('.scatter-item')].map(el=>{
   const b=el.getBoundingClientRect(),label=el.querySelector('.card-heading>span')?.getBoundingClientRect();
   return {x:Math.min(b.x,label?.x??b.x),y:Math.min(b.y,label?.y??b.y),right:Math.max(b.right,label?.right??b.right),bottom:Math.max(b.bottom,label?.bottom??b.bottom)};
  });
 });
 for(let i=0;i<cards.length;i++){
  // These cards were explicitly repositioned to create one shared 24px gutter.
  if(['1','2','5','9','10','claims','metallic','paint'].includes(cards[i].id!))continue;
  for(const key of ['x','y','right','bottom'] as const)expect(Math.abs(cards[i][key]-approved[i][key]),`${cards[i].id} matches option 02`).toBeLessThan(.2);
 }
});

test('Canvas handoff retains the same buttons through launch and success',async({page})=>{
 await page.clock.install();
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 const film=page.locator('.scatter-9 .agent-film');await film.scrollIntoViewIfNeeded();
 const controls=film.locator('.agent-feedback-icons,.agent-reference-split');
 const boxes=()=>controls.evaluateAll(els=>els.map(el=>{const box=el.getBoundingClientRect(),camera=el.closest('.agent-film-camera') as HTMLElement,frame=camera.getBoundingClientRect(),scale=frame.width/camera.offsetWidth;return{x:(box.x-frame.x)/scale,y:(box.y-frame.y)/scale,width:box.width/scale,height:box.height/scale}}));
 const seek=async(time:number)=>{await film.evaluate((el,t)=>el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=t}),time);await page.clock.runFor(32);};
 await seek(8500);await expect(film).toHaveAttribute('data-shot','choose');const initial=await boxes();
 const closeUpFrame=await film.evaluate(el=>{const stage=el.getBoundingClientRect(),camera=el.querySelector('.agent-film-camera')!.getBoundingClientRect(),body=el.querySelector<HTMLElement>('.agent-reference-body')!;return{right:stage.right-camera.right,bottom:stage.bottom-camera.bottom,overflow:getComputedStyle(body).overflowY};});
 expect(Math.abs(closeUpFrame.right-closeUpFrame.bottom),'close-up purple right and bottom gutters match').toBeLessThan(.2);
 expect(closeUpFrame.overflow,'the close-up has no visible internal scrollbar').toBe('hidden');
 for(const [time,shot] of [[9680,'sending'],[13980,'sent']] as const){
  await seek(time);await expect(film).toHaveAttribute('data-shot',shot);
  const current=await boxes();
  for(let i=0;i<initial.length;i++)for(const axis of ['x','y','width','height'] as const)expect(Math.abs(initial[i][axis]-current[i][axis])).toBeLessThan(.2);
  await expect(film.locator('.agent-reference-toast')).toBeVisible();
  if(shot==='sending')await expect(film.locator('.agent-reference-receipt.status-sending')).toBeHidden();
 }
 const finalFrame=await film.evaluate(el=>{const box=(selector:string)=>el.querySelector(selector)!.getBoundingClientRect(),film=el.getBoundingClientRect(),camera=box('.agent-film-camera'),header=box('.seer-chat-header'),question=box('.agent-reference-question'),body=el.querySelector<HTMLElement>('.agent-reference-body')!;return{right:film.right-camera.right,bottom:film.bottom-camera.bottom,questionTop:question.top,headerBottom:header.bottom,scrollTop:body.scrollTop,scrollHeight:body.scrollHeight,clientHeight:body.clientHeight};});
 expect(Math.abs(finalFrame.right-finalFrame.bottom),'final purple right and bottom gutters match').toBeLessThan(.2);
 expect(finalFrame.questionTop,'the original question stays below the navigation').toBeGreaterThanOrEqual(finalFrame.headerBottom);
 expect(finalFrame.scrollTop,'the completed film does not scroll away from the question').toBe(0);
 expect(finalFrame.scrollHeight,'the completed response fits without an internal scrollbar').toBeLessThanOrEqual(finalFrame.clientHeight);
});
