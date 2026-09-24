import {test,expect} from '@playwright/test';
import {readdirSync} from 'node:fs';
const projects=readdirSync('src/app/projects',{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);

test.describe('phone navigation and controls',()=>{
 test.use({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
 for(const slug of projects)test(`${slug} has a usable home link`,async({page})=>{
  await page.goto(`/projects/${slug}`,{waitUntil:'domcontentloaded'});
  const home=page.locator('a[href="/"]:visible').first();
  await expect(home).toBeVisible();await home.tap();await expect(page).toHaveURL('/');
 });
 test('Trace opens on tap, keeps its image visible, and toggles annotations',async({page})=>{
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await page.getByRole('link',{name:'Explore Trace'}).tap();
  await expect(page).toHaveURL('/projects/trace');
  const image=page.locator('.trace-opening-image');await expect(image).toBeInViewport();
  await expect(image.locator('.trace-watch-anchor')).toBeVisible();
  await expect(image.locator('img')).toHaveAttribute('src','/trace/watch-cover.png');
  expect(await image.locator('img').evaluate((n:HTMLImageElement)=>n.complete&&n.naturalWidth===764&&n.naturalHeight===1204)).toBe(true);
  const guides=page.getByRole('button',{name:'Toggle design annotations'});
  await guides.tap();await expect(guides).toHaveAttribute('aria-pressed','false');
  await guides.tap();await expect(page.locator('.travel-annotations')).toBeVisible();
  const stage=page.locator('.trace-comparison-stage'),art=page.locator('.trace-annotated-product');
  const a=await art.boundingBox(),b=await stage.boundingBox();expect(a!.x).toBeGreaterThanOrEqual(b!.x);expect(a!.x+a!.width).toBeLessThanOrEqual(b!.x+b!.width);
 });
 test('theme toggle persists on a small screen',async({page})=>{
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const theme=page.locator('.theme-control');const original=await theme.getAttribute('aria-label');await theme.tap();await expect(theme).not.toHaveAttribute('aria-label',original!);
  const selectedTheme=await page.locator('html').getAttribute('data-theme');
  await page.reload({waitUntil:'domcontentloaded'});
  await expect(page.locator('html')).toHaveAttribute('data-theme',selectedTheme!);
 });
});
test('desktop drag reflows and resizing restores the authored layout',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
 const trace=page.locator('[data-card-id="trace"]');await trace.scrollIntoViewIfNeeded();const b=(await trace.boundingBox())!;
 await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2+100,b.y+b.height/2-140,{steps:12});await page.mouse.up();
 await expect.poll(()=>trace.evaluate(n=>n.style.getPropertyValue('--move-x'))).not.toBe('');
 await page.setViewportSize({width:390,height:844});
 await expect.poll(()=>trace.evaluate(n=>n.style.getPropertyValue('--move-x'))).toBe('');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.setViewportSize({width:1440,height:1000});
 await expect.poll(()=>trace.evaluate(n=>n.style.getPropertyValue('--move-x'))).toBe('');
});
test('reduced motion supports keyboard card movement',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:1000});await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
 const trace=page.locator('[data-card-id="trace"]');await trace.focus();await page.keyboard.press('Shift+ArrowRight');
 expect(await trace.evaluate(n=>getComputedStyle(n).transitionDuration)).toBe('0s');
 await expect.poll(()=>trace.evaluate(n=>n.style.getPropertyValue('--move-x'))).not.toBe('');
});
