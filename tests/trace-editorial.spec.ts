import {test,expect} from '@playwright/test';
for(const width of [320,390,768,1024,1440,1920])test(`Trace visual narrative at ${width}`,async({page},testInfo)=>{
 await page.setViewportSize({width,height:900});await page.goto('/projects/trace');
 const opening=page.locator('.trace-editorial-opening');
 await expect(opening.locator('h1')).toHaveCount(1);
 await expect(opening.locator('dt')).toHaveText(['Role','Platform','Project']);
 await expect(opening.getByRole('group',{name:'Enlarged Trace overview'})).toBeVisible();
 await opening.screenshot({path:`test-results/views/trace-opening-new-${width}-${testInfo.project.name}.png`});
 const layout=page.locator('.trace-layout-story');
 await expect(layout.locator('img')).toHaveCount(0);
 await expect(layout.getByRole('img',{name:/Schematic Watch app/})).toBeVisible();
 await expect(layout).toContainText('drawing measurements, not Apple-specified points');
 await layout.screenshot({path:`test-results/views/trace-layout-new-${width}-${testInfo.project.name}.png`});
 await expect(page.getByRole('navigation',{name:'Case study sections'})).toHaveCount(0);
 const references=page.locator('.travel-reference-atlas');
 await expect(references.locator('.travel-grid-watch')).toHaveCount(6);
 await expect(references.locator('.travel-icon-construction')).toBeVisible();
 await expect(references.locator('.travel-navigation-studies')).toBeVisible();
 for(const card of await references.locator('.travel-navigation-studies>div').all()){expect(await card.evaluate(n=>n.scrollWidth<=n.clientWidth+1),'navigation content stays inside its card').toBe(true);const box=(await card.boundingBox())!,board=(await references.locator('.travel-atlas-navigation').boundingBox())!;expect(box.x+box.width).toBeLessThanOrEqual(board.x+board.width);}
 const navigationCards=references.locator('.travel-navigation-studies>div');
 for(const card of await navigationCards.all()){
  await expect(card.locator('.travel-navigation-time')).toHaveText('10:09');
  const outside=await card.evaluate(node=>{
   const card=node.getBoundingClientRect();
   return [...node.querySelectorAll('span,strong,small')].filter(el=>{
    const range=document.createRange();range.selectNodeContents(el);const text=range.getBoundingClientRect();
    return text.left<card.left+7||text.right>card.right-7||text.top<card.top||text.bottom>card.bottom;
   }).map(el=>el.textContent);
  });
  expect(outside,'each complete time, title, and action clears its card edge').toEqual([]);
 }
 const rectangles=await navigationCards.evaluateAll(nodes=>nodes.map(n=>{const b=n.getBoundingClientRect();return {x:b.x,y:b.y,right:b.right,bottom:b.bottom}}));
 for(let i=0;i<rectangles.length;i++)for(let j=i+1;j<rectangles.length;j++){
  const a=rectangles[i],b=rectangles[j];
  expect(a.right+10<=b.x||b.right+10<=a.x||a.bottom+10<=b.y||b.bottom+10<=a.y,'navigation examples have visible space between them').toBe(true);
 }
 await references.screenshot({path:`test-results/views/trace-atlas-${width}-${testInfo.project.name}.png`});
 await page.locator('#color-study').scrollIntoViewIfNeeded();
 await expect(page.locator('#color-study')).toBeInViewport();
 await expect(page.locator('#color-study').getByRole('group',{name:'Recreated multicolor Trace concept'})).toBeVisible();
 await page.locator('#color-study').screenshot({path:`test-results/views/trace-color-new-${width}-${testInfo.project.name}.png`});
 await page.locator('.trace-color-meaning').screenshot({path:`test-results/views/trace-color-meaning-${width}-${testInfo.project.name}.png`});
 const system=page.locator('.trace-system-study');
 await system.screenshot({path:`test-results/views/trace-system-${width}-${testInfo.project.name}.png`});
});
