import {test,expect} from '@playwright/test';
for(const width of [390,1440])test(`authored Trace composition and annotations at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.goto('/projects/trace');
 const art=page.getByRole('group',{name:'Recreated original Trace component',exact:true});
 await expect(art).toBeVisible();
 await expect(art.locator('svg.ts-gauge')).toHaveCount(3);
 await expect(art.locator('img')).toHaveCount(0);
 await expect(art).toContainText('22');
 await expect(art).toContainText('MINS');
 await expect(art).toContainText('12');
 await page.locator('.trace-scroll-step').nth(3).focus();
 await expect(page.locator('.travel-annotations')).toHaveAttribute('data-annotation','location');
 await expect(page.locator('.travel-references details')).toHaveCount(0);
 await expect(page.locator('.travel-icon-construction')).toBeVisible();
 await expect(page.locator('.travel-references img')).toHaveCount(0);
 await page.locator('.trace-workbench-display').screenshot({path:`test-results/views/trace-authored-${width}.png`});
});
for(const width of [320,390,768,1440])test(`decision scroller ends on content at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/projects/trace');
 const scroller=page.getByRole('region',{name:'Scrollable design decisions'});
 await scroller.evaluate(el=>{el.scrollTop=el.scrollHeight});
 await expect(page.locator('.travel-annotations')).toHaveAttribute('data-annotation','location');
 const geometry=await scroller.evaluate(el=>{const last=el.lastElementChild!.getBoundingClientRect(),bounds=el.getBoundingClientRect();return {gap:bounds.bottom-last.bottom,padding:parseFloat(getComputedStyle(el).paddingBottom)}});
 expect(Math.abs(geometry.gap)).toBeLessThan(3);expect(geometry.padding).toBe(0);
 if(width<600){const panel=await page.locator('.trace-workbench-display').boundingBox(),parent=await page.locator('.trace-workbench-columns').boundingBox();expect(Math.abs(panel!.width-parent!.width)).toBeLessThan(3);}
 await expect(page.getByRole('link',{name:'Explore the variations'})).toBeVisible();
 await page.locator('.trace-workbench-columns').screenshot({path:`test-results/views/trace-ending-${width}.png`});
});
