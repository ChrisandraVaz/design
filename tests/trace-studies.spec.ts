import {test,expect} from '@playwright/test';
for(const width of [390,768,1440]){
 test(`Trace exploration boards are complete and readable at ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:1000});await page.goto('/projects/trace');
  const boards=page.locator('.ts-variant-board');await expect(boards).toHaveCount(3);
  for(let i=0;i<3;i++){
   const board=boards.nth(i);await board.scrollIntoViewIfNeeded();
   await expect(board.locator('.ts-treatment')).toHaveCount(8);
   await expect(board.getByRole('img')).toHaveCount(24);
   await expect(board.locator('img')).toHaveCount(0);
   const bounds=(await board.boundingBox())!;expect(bounds.x).toBeGreaterThanOrEqual(0);expect(bounds.x+bounds.width).toBeLessThanOrEqual(width+1);
   expect(await board.evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
   for(const treatment of await board.locator('.ts-treatment').all()){
    const samples=treatment.locator('.ts-treatment-samples');
    expect(await samples.evaluate(n=>n.scrollWidth<=n.clientWidth+1)).toBe(true);
    for(const gauge of await samples.locator('svg').all()){
     expect((await gauge.boundingBox())!.width).toBeGreaterThan(55);
     const clipped=await gauge.evaluate(svg=>{const size=(svg as SVGSVGElement).viewBox.baseVal.width;return Array.from(svg.querySelectorAll('text')).map(t=>t.getBBox()).filter(b=>b.x<-.5||b.x+b.width>size+.5||b.y<-.5||b.y+b.height>size+.5).length});
     expect(clipped,'study text stays inside its circular surface').toBe(0);
    }
   }
   await board.screenshot({path:`test-results/views/trace-study-${i+1}-${width}-${testInfo.project.name}.png`});
  }
  const personFirst=page.locator('[data-study=location] .ts-treatment').nth(1);
  for(const gauge of await personFirst.locator('svg').all()){const caption=await gauge.locator('text').last().evaluate(t=>(t as SVGTextElement).getBBox().width);expect(caption,'person-first caption clears the arc').toBeLessThan(100);}
  await expect(page.locator('.trace-case details')).toHaveCount(0);
  await expect(page.getByText('What the prototype must prove.',{exact:true})).toHaveCount(0);
  await expect(page.getByText('Original Trace · recreated as vectors',{exact:true})).toHaveCount(0);
  await expect(page.getByText('Scroll to inspect ↓',{exact:true})).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 });
}
test('home bento previews color studies instead of a fabricated check-in message',async({page})=>{
 await page.goto('/');await expect(page.locator('.trace-color-study')).toContainText('Color study');
 await expect(page.getByText('Check-in not sent',{exact:true})).toHaveCount(0);
 await expect(page.locator('.scatter-trace img')).toHaveCount(1);
 await expect(page.locator('.scatter-trace img')).toHaveAttribute('src','/trace/watch-cover.png');
 for(const gauge of await page.locator('.trace-color-study .ts-gauge').all()){const b=(await gauge.boundingBox())!;expect(b.width).toBeGreaterThan(25);expect(Math.abs(b.width-b.height)).toBeLessThan(1);}
 await page.locator('.trace-color-study').screenshot({path:'test-results/views/trace-home-palette.png'});
});
