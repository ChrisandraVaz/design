import {test, expect} from '@playwright/test';

test('All 15 layouts have complete previews and keyboard navigation', async ({page}) => {
  await page.goto('/layout-options/index.html');
  await expect(page.locator('.option')).toHaveCount(15);
  for (const theme of ['dark', 'light']) {
    await page.locator(`[data-theme-choice="${theme}"]`).click();
    for (const preview of await page.locator('.preview img').all()) {
      await preview.scrollIntoViewIfNeeded();
      await expect.poll(()=>preview.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBe(1440);
    }
  }
  await page.locator('.open').first().click();
  await expect(page.locator('#viewer')).toBeVisible();
  await expect(page.locator('#viewer-label')).toContainText('01 /');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#viewer-label')).toContainText('02 /');
  await page.getByRole('button',{name:'Previous layout'}).click();
  await expect(page.locator('#viewer-label')).toContainText('01 /');
  await page.keyboard.press('Escape');
  await expect(page.locator('#viewer')).not.toBeVisible();
  await expect(page).toHaveURL(/index\.html$/);
});

test('Live preview applies the chosen layout and theme without changing the homepage', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/layout-options/index.html#03');
  await page.getByRole('button',{name:'Live preview',exact:true}).click();
  const live=page.frameLocator('#live-preview');
  await expect(live.locator('.widget-world')).toHaveAttribute('data-ready','true');
  await expect(live.locator('.folio')).toHaveAttribute('data-theme','dark');
  await expect(live.locator('style[data-layout-preview="03"]')).toHaveCount(1);
  await expect(live.locator('.scatter-viewport')).toHaveCSS('--puzzle-width','1250px');
  await expect(live.locator('.scatter-3')).toHaveCSS('--puzzle-y','577.808px');
  await page.getByRole('button',{name:'Still preview',exact:true}).click();
  await expect(page.locator('#full-preview')).toBeVisible();
  await page.getByRole('button',{name:'All layouts'}).click();
  await page.getByRole('link',{name:'Portfolio',exact:false}).click();
  await expect(page.locator('.scatter-viewport')).toHaveCSS('--puzzle-width','1250px');
  await expect(page.locator('.scatter-3')).toHaveCSS('--puzzle-y','0px');
});

for (const width of [320,390,768]) test(`Layout picker fits ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  await page.goto('/layout-options/index.html');
  await expect(page.locator('.option')).toHaveCount(15);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  for(const control of await page.locator('.themes button').all()) expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  await page.locator('.open').first().click();
  for(const control of await page.locator('.viewer-bar button:visible').all()) {
    const box=(await control.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x+box.width).toBeLessThanOrEqual(width);
  }
});

for (const width of [1154,1920]) test(`Selected option 02 fills the frame without collisions at ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
  await page.evaluate(()=>document.fonts.ready);
  const results=await page.evaluate(async()=>{
    const path='/layout-options/preview.js';
    const {layoutCSS}=await import(path);
    const layouts=await fetch('/layout-options/layouts.json').then(r=>r.json());
    const style=document.createElement('style');document.head.append(style);
    return layouts.filter((layout:{id:string})=>layout.id==='02').map((layout:{id:string})=>{
      style.textContent=layoutCSS(layout);
      const frame=document.querySelector('.scatter-viewport')!.getBoundingClientRect();
      const cards=[...document.querySelectorAll<HTMLElement>('.scatter-item')].map(el=>{
        const b=el.getBoundingClientRect(),l=el.querySelector('.card-heading>span')?.getBoundingClientRect();
        return {id:el.dataset.cardId,x:Math.min(b.x,l?.x??b.x),y:Math.min(b.y,l?.y??b.y),right:Math.max(b.right,l?.right??b.right),bottom:Math.max(b.bottom,l?.bottom??b.bottom)};
      });
      const collisions:string[]=[];
      for(let i=0;i<cards.length;i++)for(let j=i+1;j<cards.length;j++){
        const a=cards[i],b=cards[j];
        if(a.x<b.right&&a.right>b.x&&a.y<b.bottom&&a.bottom>b.y)collisions.push(`${a.id}/${b.id}`);
      }
      const agent=cards.find(c=>c.id==='9')!,font=cards.find(c=>c.id==='fontcontext')!,watch=cards.find(c=>c.id==='trace')!,time=cards.find(c=>c.id==='3')!;
      return {id:layout.id,collisions,leftGap:Math.min(...cards.map(c=>c.x))-frame.x,rightGap:frame.right-Math.max(...cards.map(c=>c.right)),
        agent, font, watch, time, agentLeft:agent.x-frame.x, top:Math.min(...cards.map(c=>c.y))};
    });
  });
  for(const result of results){
    expect(result.collisions,`layout ${result.id}`).toEqual([]);
    expect(Math.abs(result.leftGap),`layout ${result.id} left edge`).toBeLessThan(2);
    expect(Math.abs(result.rightGap),`layout ${result.id} right edge`).toBeLessThan(3);
    expect(Math.abs(result.agentLeft),`layout ${result.id}: Agent starts at the left edge`).toBeLessThan(1);
    expect(Math.abs(result.agent.y-result.top),`layout ${result.id}: Agent starts in the first row`).toBeLessThan(5);
    expect(Math.abs(result.font.y-result.agent.y),`layout ${result.id}: Font shares the first row`).toBeLessThan(5);
    expect(result.watch.y-result.font.bottom,`layout ${result.id}: Watch directly below Font`).toBeGreaterThan(8);
    expect(result.watch.y-result.font.bottom,`layout ${result.id}: no intervening card above Watch`).toBeLessThan(50);
    expect(result.watch.x,`layout ${result.id}: Watch aligned beneath Font`).toBeLessThanOrEqual(result.font.x+1);
    expect(result.watch.right,`layout ${result.id}: Watch spans Font's width`).toBeGreaterThanOrEqual(result.font.right-1);
    expect(result.time.x,`layout ${result.id}: Relative Time stays outside the Agent column`).toBeGreaterThan(result.agent.right+8);
  }
});
