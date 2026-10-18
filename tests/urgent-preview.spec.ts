import {test,expect} from '@playwright/test';
for(const width of [390,1440]) test(`Project availability and neutral stages at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/');
 await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
 await expect(page.locator('.card-kind')).toHaveCount(0);
 await expect(page.locator('.sentry-preview-send-to-agent .agent-film-camera')).toHaveCSS('box-shadow','none');
 const pending=['.scatter-1','.scatter-2','.scatter-3','.scatter-trace','.scatter-claims'];
 for(const selector of pending){
  const card=page.locator(selector);await expect(card.locator('a')).toHaveCount(0);
  const surface=card.locator('.coming-soon-card');await surface.focus();
  await expect.poll(()=>surface.evaluate(e=>getComputedStyle(e,'::after').opacity)).toBe('1');
  expect(await surface.evaluate(e=>getComputedStyle(e,'::after').content)).toBe('"Case study coming soon"');
  await surface.click();await expect(page).toHaveURL('/');
 }
 for(const selector of ['.agent-film','.agent-film-backdrop','.relative-time-reference']){
  const stage=page.locator(`.widget-world ${selector}`).first();await expect(stage).toHaveCSS('background-color','rgb(250, 250, 250)');await expect(stage).toHaveCSS('background-image','none');
 }
 await expect(page.getByRole('link',{name:'Read Send to Agent case study'})).toHaveAttribute('href','/projects/sentry-send-to-agent');
 await expect(page.getByRole('link',{name:'Open Font Context Plugin case study'})).toHaveAttribute('href','/fontcontext.html');
 await expect(page.locator('.scatter-metallic a')).toHaveCount(2);
 await expect(page.locator('.scatter-paint a')).toHaveCount(2);
});
for(const width of [320,390,600,768,1024,1440,1920]) test(`About film and navigation at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.goto('/about');
 await expect(page.locator('h1')).toContainText('product designer');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 const strip=page.locator('.about-photo-strip');await expect(strip).toHaveJSProperty('clientWidth',width);
 await expect(page.locator('.about-photo-run').first().locator('img')).toHaveCount(4);
 await strip.focus();await strip.evaluate(e=>e.scrollLeft=100);await expect(strip).toHaveJSProperty('scrollLeft',100);
 const toggle=page.getByRole('button',{name:'Switch to dark mode'});await toggle.click();
 await expect(page.locator('.selected-about')).toHaveAttribute('data-theme','dark');
 const back=page.getByRole('link',{name:'Back to work'});expect((await back.boundingBox())!.height).toBeGreaterThanOrEqual(44);
 if([390,1440].includes(width))await page.screenshot({path:`test-results/views/about-${width}.png`,fullPage:true,animations:'disabled'});
 await back.click();await expect(page).toHaveURL('/');await expect(page.locator('.canvas-folio')).toHaveAttribute('data-theme','dark');
});
test('About film respects reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/about');
 const strip=page.locator('.about-photo-strip');await page.waitForTimeout(300);await expect(strip).toHaveJSProperty('scrollLeft',0);
 await expect(page.locator('.about-film-grain')).toHaveCSS('animation-name','none');
});
test('Available case studies still open by touch',async({browser,browserName})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:browserName!=='firefox'});
 const page=await context.newPage();await page.goto('/');
 await page.getByRole('link',{name:'Read Send to Agent case study'}).tap();await expect(page).toHaveURL('/projects/sentry-send-to-agent');
 await page.goto('/');await page.getByRole('link',{name:'Open Font Context Plugin case study'}).tap();await expect(page).toHaveURL('/fontcontext.html');
 await context.close();
});
for(const motion of ['reduce','no-preference'] as const) for(const width of [390,768,1024,1440,1920]) test(`Coming-soon pills render at the same size at ${width} with ${motion}`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:motion});await page.goto('/');
 let reference:{width:number;height:number;font:number}|undefined;
 for(const selector of ['.scatter-claims','.scatter-1','.scatter-2','.scatter-3','.scatter-trace']){
  const card=page.locator(`${selector} .coming-soon-card`);await card.focus();
  await expect.poll(()=>card.evaluate(e=>getComputedStyle(e,'::after').opacity)).toBe('1');
  const size=await card.evaluate(e=>{const p=getComputedStyle(e,'::after');const t=new DOMMatrix(p.transform);const scale=e.getBoundingClientRect().width/(e as HTMLElement).offsetWidth;return {width:parseFloat(p.width)*t.a*scale,height:parseFloat(p.height)*t.d*scale,font:parseFloat(p.fontSize)*t.a*scale,opacity:p.opacity};});
  reference ??= size;
  expect(Math.abs(size.width-reference.width),selector).toBeLessThan(1);expect(Math.abs(size.height-reference.height),selector).toBeLessThan(.3);expect(Math.abs(size.font-reference.font),selector).toBeLessThan(.1);expect(size.opacity).toBe('1');
 }
});
test('Light defaults independently of OS and deliberate theme choices persist across Home and About',async({page})=>{
 await page.emulateMedia({colorScheme:'dark'});await page.goto('/');await expect(page.locator('html')).toHaveAttribute('data-theme','light');await expect(page.locator('.canvas-folio')).toHaveAttribute('data-theme','light');
 await page.getByRole('button',{name:'Switch to dark mode'}).click();await page.reload();await expect(page.locator('.canvas-folio')).toHaveAttribute('data-theme','dark');
 await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'About',exact:true}).click();await expect(page.locator('.selected-about')).toHaveAttribute('data-theme','dark');
 await page.getByRole('button',{name:'Switch to light mode'}).click();await page.reload();await expect(page.locator('.selected-about')).toHaveAttribute('data-theme','light');
});
test('Default light surface is present before hydration even with a dark OS',async({page})=>{
 await page.emulateMedia({colorScheme:'dark'});
 await page.route('**/_next/static/**/*.js',route=>route.abort());
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.canvas-folio')).toHaveAttribute('data-theme','light');
 await expect(page.locator('.canvas-folio')).toHaveCSS('background-color','rgb(255, 255, 255)');
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
});
test('Pending cards reveal coming-soon feedback on touch without opening',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
 const page=await context.newPage();await page.goto('/');
 for(const selector of ['.scatter-1','.scatter-2','.scatter-3','.scatter-trace','.scatter-claims']){
  const card=page.locator(`${selector} .coming-soon-card`);await card.tap();await expect(page).toHaveURL('/');
  await expect.poll(()=>card.evaluate(e=>getComputedStyle(e,'::after').opacity)).toBe('1');
 }
 await context.close();
});
