import { test, expect } from '@playwright/test';

for (const theme of ['light','dark']) {
  for (const width of [390,1440]) {
    test(`Trace color explanations remain readable in ${theme} at ${width}`, async ({page})=>{
      await page.setViewportSize({width,height:900});
      await page.addInitScript(t=>localStorage.setItem('portfolio-theme',t),theme);
      await page.goto('/projects/trace');
      await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
      const strip=page.locator('.trace-material-strip');
      await strip.scrollIntoViewIfNeeded();
      const ratios=await strip.locator('h4,p').evaluateAll(nodes=>{
        const rgb=(s:string)=>s.match(/[\d.]+/g)!.map(Number);
        const luminance=(a:number[])=>a.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
        return nodes.map(n=>{const c=getComputedStyle(n);const bg=luminance(rgb(getComputedStyle(document.querySelector('.trace-case')!).backgroundColor));const fg=luminance(rgb(c.color));return (Math.max(bg,fg)+.05)/(Math.min(bg,fg)+.05);});
      });
      for(const ratio of ratios) expect(ratio).toBeGreaterThanOrEqual(4.5);
      await page.screenshot({path:`/tmp/trace-readable-${theme}-${width}.png`});
    });
  }
  test(`Metadata and chapter labels use one system in ${theme}`,async({page})=>{
    await page.addInitScript(t=>localStorage.setItem('portfolio-theme',t),theme);
    for(const [route,label,tree] of [
      ['/projects/sentry-send-to-agent','.agent-story-facts dt','.agent-story-tree a'],
      ['/projects/sentry-relative-time','.trace-project-facts dt','.trace-case-tree a'],
      ['/projects/sentry-message-queuing','.trace-project-facts dt','.trace-case-tree a'],
      ['/projects/sentry-split-panel','.trace-project-facts dt','.trace-case-tree a'],
      ['/projects/trace','.trace-project-facts dt','.trace-case-tree a'],
      ['/fontcontext.html','.info-item h4','.tree-nav a'],
    ]){
      await page.goto(route);
      for(const selector of [label,tree]){
        await expect(page.locator(selector).first()).toHaveCSS('text-transform','uppercase');
        await expect(page.locator(selector).first()).toHaveCSS('font-family',/IBM.Plex.Mono|IBM Plex Mono|ibmPlexMono|IBM_Plex_Mono/);
      }
    }
  });
}

for(const theme of ['light','dark']) {
 test(`Product specimens and research notes retain their own surfaces in ${theme}`,async({page})=>{
  await page.addInitScript(t=>localStorage.setItem('portfolio-theme',t),theme);
  await page.goto('/projects/sentry-split-panel');
  await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
  await expect(page.locator('.se-hero-split-panel')).toHaveCSS('background-color','rgb(255, 255, 255)');
  await expect(page.locator('.se-hero-split-panel .split-reference-preview')).toHaveCSS('background-color','rgb(255, 255, 255)');
  for(const specimen of await page.locator('.se-handle-study figure > div').all()) await expect(specimen).toHaveCSS('background-color','rgb(255, 255, 255)');
  const treatments=await page.locator('.se-handle-study i').evaluateAll(nodes=>nodes.map(n=>{const s=getComputedStyle(n);return [s.backgroundColor,s.boxShadow].join('|')}));
  expect(new Set(treatments).size).toBe(4);
  await expect(page.locator('.story-lessons .editorial-idea-icon')).toHaveCount(3);
  await page.goto('/projects/sentry-send-to-agent');
  for(const note of await page.locator('.agent-segment').all()) {
   await expect(note).toHaveCSS('background-color','rgb(255, 255, 153)');
   await expect(note.locator('h4')).toHaveCSS('color','rgb(51, 45, 35)');
  }
  await expect(page.locator('.agent-configuration-stat')).toBeVisible();
  await page.setViewportSize({width:390,height:844});
  await page.locator('.agent-configuration-stat').scrollIntoViewIfNeeded();
  expect(await page.locator('.agent-configuration-stat').evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
  await page.goto('/fontcontext.html');
  await page.locator('.technical-question-card').scrollIntoViewIfNeeded();
  expect(await page.locator('.technical-question-card').evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
 });
}
