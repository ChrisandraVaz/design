import { test, expect } from '@playwright/test';

test('Relative Time cycles through eight unique centered specimens and respects pause', async ({page}) => {
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/projects/sentry-relative-time');
 const stage=page.locator('.se-hero-art .relative-time-reference');
 await stage.scrollIntoViewIfNeeded();
 const initial=Number(await stage.getAttribute('data-variant'));
 const seen=new Set<string>();
 for(let i=0;i<8;i++) {
  await expect(stage).toHaveAttribute('data-variant',String((initial+i)%8));
  seen.add((await stage.getAttribute('data-variant'))!);
  const a=(await stage.boundingBox())!, b=(await stage.locator('.rt-preview-layer.is-current .rt-specimen').boundingBox())!;
  expect(Math.abs((a.x+a.width/2)-(b.x+b.width/2))).toBeLessThan(2);
  expect(b.width).toBeLessThan(a.width);
 }
 expect(seen.size).toBe(8);
 await page.getByRole('button',{name:'Pause interaction preview'}).click();
 const frozen=await stage.getAttribute('data-variant');
 await page.waitForTimeout(3500);
 await expect(stage).toHaveAttribute('data-variant',frozen!);
});

test('Split Panel opens in the terminal, reveals the component, and accents its drag handle',async({page})=>{
 await page.goto('/projects/sentry-split-panel');
 const stage=page.locator('.split-reference-preview');
 await stage.scrollIntoViewIfNeeded();
 await expect(stage).toHaveAttribute('data-view','terminal');
 await expect(stage).toHaveAttribute('data-scene','1');
 await expect(stage).toHaveAttribute('data-scene','2');
 await expect(stage).toHaveAttribute('data-view','panel');
 const divider=stage.locator('.sp-reference-divider'),line=divider.locator('i');
 const surface=(await stage.locator('.sp-reference-surface').boundingBox())!,lineBox=(await line.boundingBox())!;
 expect(lineBox.y-surface.y,'the divider begins below the pane-label row').toBeGreaterThanOrEqual(29);
 await divider.hover();
 await expect.poll(()=>line.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(117, 84, 255)');
 const before=(await divider.boundingBox())!;
 await page.mouse.move(before.x,before.y+before.height/2);await page.mouse.down();await page.mouse.move(before.x+35,before.y+before.height/2,{steps:4});await page.mouse.up();
 const after=(await divider.boundingBox())!;expect(after.x).toBeGreaterThan(before.x+20);
 await page.emulateMedia({reducedMotion:'reduce'});
 const frozen=await stage.getAttribute('data-scene');
 await page.waitForTimeout(2500);
 await expect(stage).toHaveAttribute('data-scene',frozen!);
});

test('Split Panel accent follows hover, keyboard focus, and dragging; source motion plays',async({page})=>{
 await page.goto('/projects/sentry-split-panel');
 const left=(await page.locator('.sentry-live-demo .split-code strong').boundingBox())!;
 const right=(await page.locator('.sentry-live-demo .split-insight strong').boundingBox())!;
 expect(left.y).toBeCloseTo(right.y,0);
 const handle=page.getByRole('separator',{name:'Resize panels'});
 await handle.scrollIntoViewIfNeeded(); await page.mouse.move(0,0);
 const line=()=>handle.evaluate(e=>getComputedStyle(e,'::before').backgroundColor);
 await expect.poll(line).toBe('rgb(222, 220, 229)');
 await handle.hover(); await expect.poll(line).toBe('rgb(121, 81, 255)');
 await handle.focus(); await page.keyboard.press('ArrowRight');
 await expect(handle).toHaveAttribute('aria-valuenow','50');
 await page.mouse.move(0,0); await expect.poll(line).toBe('rgb(121, 81, 255)');
 const b=(await handle.boundingBox())!; await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+60,b.y+b.height/2,{steps:5});await expect(handle).toHaveClass(/is-dragging/);await page.mouse.up();await expect(handle).not.toHaveClass(/is-dragging/);
 const video=page.locator('.se-split-recording video');await video.scrollIntoViewIfNeeded();
 await video.evaluate(async(e:HTMLVideoElement)=>{e.muted=true;await e.play()});
 await expect.poll(()=>video.evaluate((e:HTMLVideoElement)=>e.currentTime)).toBeGreaterThan(0);
});


test('Queue hero pause freezes the sequence and the thinking dots', async ({page}) => {
 await page.clock.install();
 await page.goto('/projects/sentry-message-queuing');
 const preview=page.locator('.se-hero-art .sentry-queue');
 await page.getByRole('button',{name:'Pause interaction preview'}).click();
 const phase=await preview.getAttribute('data-phase');
 await expect(preview).toHaveAttribute('data-paused','true');
 for(const dot of await preview.locator('.sentry-thinking i').all())
  await expect(dot).toHaveCSS('animation-play-state','paused');
 await page.clock.runFor(8000);
 await expect(preview).toHaveAttribute('data-phase',phase!);
});

for (const width of [320, 768, 1440, 1920]) for (const view of ['Canvas', 'Index']) {
 test(`Chat covers retain their composers at ${width}px in ${view}`, async ({page}) => {
  await page.setViewportSize({width, height:1100});
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.goto('/');
  await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
  if (view === 'Index') {
   await page.getByRole('button',{name:'Index',exact:true}).click();
   await expect(page.locator('.index-folio')).toBeVisible();
  }
  const queue = page.locator('.scatter-1 .sentry-preview-card');
  const agent = page.locator('.scatter-9 .sentry-preview-card');
  await queue.scrollIntoViewIfNeeded();
  await expect(queue.locator('.sentry-queue')).toHaveAttribute('data-phase','3');
  const response = (await queue.locator('.sentry-answer').boundingBox())!;
  const pending = (await queue.locator('.queue-pending').boundingBox())!;
  expect(pending.y - response.y - response.height).toBeGreaterThanOrEqual(8);
  const q = (await queue.boundingBox())!, a = (await agent.boundingBox())!;
  expect(a.width).toBeCloseTo(q.width, 0);
  if(view === 'Index') expect(a.height - q.height).toBeGreaterThanOrEqual(80);
  else expect(a.height).toBeGreaterThanOrEqual(q.height-1);
  if (width >= 1440 && view === 'Index') {
   expect(q.width).toBeGreaterThan(400);
   expect(q.width / q.height).toBeCloseTo(1.357, 2);
  }
  // The film intentionally crops into the action; judge the full chat in its overview shot.
  await page.emulateMedia({reducedMotion:'reduce'});
  await expect(agent.locator('.agent-film')).toHaveAttribute('data-shot','overview');
  for (const [card, selector] of [[queue,'.queue-composer'], [agent,'.agent-reference-composer']] as const) {
   const composer = card.locator(selector);
   await expect(composer).toBeVisible();
   await composer.scrollIntoViewIfNeeded();
   const frame = (await card.locator('.sentry-preview-art').boundingBox())!;
   const outer = (await card.boundingBox())!;
   expect(frame.height / outer.height).toBeGreaterThan(.88);
   const input = (await composer.boundingBox())!;
   expect(input.x).toBeGreaterThanOrEqual(frame.x);
   expect(input.x + input.width).toBeLessThanOrEqual(frame.x + frame.width + 1);
   expect(input.y + input.height).toBeLessThanOrEqual(frame.y + frame.height);
   expect(input.height).toBeGreaterThanOrEqual(view === 'Canvas' && width > 1100 ? 18 : 24);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
 });
}


for (const width of [320,390,768,1100,1440]) for (const view of ['Canvas','Index']) {
 test(`Relative Time stays square with aligned timestamps at ${width}px in ${view}`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
  if(view==='Index') {
   await page.getByRole('button',{name:'Index',exact:true}).click();
   await expect(page.locator('.index-folio')).toBeVisible();
  }
  const time=(await page.locator('.scatter-3 .sentry-preview-card').boundingBox())!;
  const nike=(await page.locator('.scatter-10').boundingBox())!;
  expect(time.width).toBeCloseTo(nike.width,0);
  expect(time.height).toBeCloseTo(time.width,0);
  const stage=page.locator('.scatter-3 .relative-time-reference');
  const card=page.locator('.scatter-3 .sentry-preview-card');
  const rows=stage.locator('.rt-preview-layer.is-current .rt-dates > div');
  const columns=await rows.evaluateAll(els=>els.map(el=>[...el.children].map(child=>{
   const box=child.getBoundingClientRect();return {left:box.left,right:box.right};
  })));
  for(let column=0;column<3;column++) {
   expect(Math.abs(columns[0][column].left-columns[1][column].left)).toBeLessThan(1);
   expect(Math.abs(columns[0][column].right-columns[1][column].right)).toBeLessThan(1);
  }
  const tooltip=(await stage.locator('.rt-preview-layer.is-current .rt-specimen').boundingBox())!;
  const badge=(await card.locator('.card-kind').boundingBox())!;
  expect(tooltip.y+tooltip.height+4).toBeLessThan(badge.y);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 });
}

test('Relative Time uses the full image and balanced tooltip gutters',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 const stage=page.locator('.scatter-3 .relative-time-reference');
 await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
 const visual=await stage.evaluate(el=>{
  const css=getComputedStyle(el,'::before'),frame=el.getBoundingClientRect(),tip=el.querySelector('.is-current .rt-specimen')!.getBoundingClientRect();
  return {image:css.backgroundImage,filter:css.filter,rotation:css.transform,left:tip.left-frame.left,right:frame.right-tip.right,top:tip.top-frame.top,bottom:frame.bottom-tip.bottom};
 });
 expect(visual.image).toContain('send-to-agent-background.jpg');expect(visual.filter).not.toContain('blur');
 expect(visual.rotation).toBe('matrix(0, -1, 1, 0, 0, 0)');
 expect(Math.abs(visual.left-visual.right)).toBeLessThan(1);
 expect(Math.abs(visual.top-visual.bottom)).toBeLessThan(1);
 const specimens=await stage.locator('.rt-specimen').evaluateAll(els=>els.map(el=>({width:el.clientWidth,overflow:el.scrollWidth-el.clientWidth})));
 expect(specimens).toHaveLength(8);
 for(const item of specimens)expect(item.overflow).toBeLessThanOrEqual(1);
});
