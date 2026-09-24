import {test,expect} from '@playwright/test';
for(const width of [1280,1440]) for(const route of ['/projects/sentry-message-queuing','/projects/sentry-relative-time','/fontcontext.html']) test(`${route} opening fits ${width}`,async({page})=>{
 await page.setViewportSize({width,height:800});
 await page.goto(route);
 await page.evaluate(()=>document.fonts.ready);
 const facts=page.locator(route.includes('fontcontext')?'.project-info':'.trace-project-facts');
 const box=await facts.boundingBox();
 expect(box).not.toBeNull();
 expect(box!.y+box!.height).toBeLessThanOrEqual(800);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
});
