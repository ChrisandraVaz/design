import {test,expect} from '@playwright/test';

for(const width of [320,768,1440]) test(`Time component studies retain full dates and values at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.goto('/projects/sentry-relative-time');
 const stages=page.locator('.se-specimen-stage');
 await expect(stages).toHaveCount(3);
 for(const stage of await stages.all()) {
  await stage.scrollIntoViewIfNeeded();
  const layout=await stage.evaluate(el=>{
   const b=el.getBoundingClientRect();
   return [...el.querySelectorAll('.rt-dates > div,.rt-heading,.rt-series > div,.rt-footer')].map(row=>{
    const r=row.getBoundingClientRect();
    return {left:r.left-b.left,right:b.right-r.right,overflow:row.scrollWidth-row.clientWidth};
   });
  });
  for(const row of layout){ expect(row.left).toBeGreaterThanOrEqual(0);expect(row.right).toBeGreaterThanOrEqual(-1);expect(row.overflow).toBeLessThanOrEqual(1); }
 }
});

for(const kind of ['message-queuing','send-to-agent']) for(const width of [320,768,1440]) test(`${kind} editorial hero retains its composer at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(`/projects/sentry-${kind}`);
 const hero=page.locator('.se-hero-product');
 const composer=hero.locator(kind==='message-queuing'?'.queue-composer':'.agent-reference-composer');
 await expect(composer).toBeVisible();
 const parent=(await hero.boundingBox())!,child=(await composer.boundingBox())!;
 expect(child.y+child.height).toBeLessThanOrEqual(parent.y+parent.height+1);
 expect(child.x).toBeGreaterThanOrEqual(parent.x);
 expect(child.x+child.width).toBeLessThanOrEqual(parent.x+parent.width+1);
});

for(const width of [320,768,1440]) test(`Send to Agent keeps its product contract legible at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/projects/sentry-send-to-agent');
 await expect(page.getByRole('heading',{name:'Move from diagnosis to implementation without rebuilding context'})).toBeVisible();
 await expect(page.locator('.se-case-index a')).toHaveText(['Problem','System','Interaction','Outcome']);
 const contract=page.locator('.se-agent-contract article');
 await expect(contract).toHaveCount(4);
 await expect(contract).toContainText(['Trigger','Payload','Route','Receipt']);
 await expect(page.locator('.se-payload-comparison figure')).toHaveCount(2);
 await expect(page.locator('.se-payload-comparison')).toContainText('3 related items packaged');
 await expect(page.locator('.se-payload-comparison')).toContainText('Conversation packaged');
 const sections=page.locator('#overview,#context,#interaction,#the-outcome');
 const positions=await sections.evaluateAll(nodes=>nodes.map(node=>node.getBoundingClientRect().top+scrollY));
 expect(positions).toEqual([...positions].sort((a,b)=>a-b));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
