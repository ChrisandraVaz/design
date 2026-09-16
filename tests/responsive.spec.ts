import { test, expect } from '@playwright/test';
import { readdirSync } from 'node:fs';
const routes = [
 '/',
 ...readdirSync('src/app/projects', {withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>`/projects/${d.name}`),
 '/fontcontext.html',
 '/serano.html',
 '/layout-options/index.html',
];
for (const width of [320,390,600,768,1024,1440,1920]) {
 for (const route of routes) {
  test(`${route} fits ${width}px`, async ({page},testInfo)=>{
   await page.setViewportSize({width,height:900});
   const runtimeErrors:string[]=[];
   page.on('pageerror',error=>runtimeErrors.push(error.message));
   const response=await page.goto(route, {waitUntil:"domcontentloaded"}); expect(response?.status()).toBe(200);
   await page.evaluate(async()=>{
    // Wait for fonts used by the page, rather than unrelated pending font faces.
    for (const element of [document.body, document.querySelector('h1')!]) {
     const style = getComputedStyle(element);
     // The computed shorthand can be empty when variable-font settings differ.
     await document.fonts.load(`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`);
    }
   });
   await expect(page.locator('h1').first()).toBeVisible();
   const problems=await page.evaluate(()=>{
    const failures:string[]=[];
    if(document.documentElement.scrollWidth>innerWidth+1) failures.push(`document width ${document.documentElement.scrollWidth} > ${innerWidth}`);
    for(const el of document.querySelectorAll('h1,h2,h3,p,nav')){
     const r=el.getBoundingClientRect();
     if(r.width===0||r.height===0||getComputedStyle(el).visibility==='hidden')continue;
     // Ignore intentionally clipped previews, but never the page's main heading.
     let clipped=false;for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(['hidden','clip','auto','scroll'].includes(s.overflowX)){clipped=true;break;}}
     if(!clipped&&(r.left< -1||r.right>innerWidth+1))failures.push(`${el.tagName} ${el.textContent?.slice(0,65)} [${Math.round(r.left)},${Math.round(r.right)}]`);
    }
    return failures;
   });
   expect(problems).toEqual([]);
   expect(runtimeErrors).toEqual([]);
   if((route==='/'||route==='/projects/trace')&&[390,768,1440].includes(width))await page.screenshot({path:`test-results/views/${route==='/'?'home':'trace'}-${width}-${testInfo.project.name}.png`});
  });
 }
}
