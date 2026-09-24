import { test, expect } from '@playwright/test';
for (const width of [390, 1440]) {
  test(`Tooltip composition explains changing slots at ${width}`, async ({ page }) => {
    await page.setViewportSize({width, height:900});
    await page.goto('/projects/sentry-relative-time');
    const compositions=page.getByRole('group',{name:'Tooltip compositions'});
    await compositions.getByRole('button',{name:'Latency',exact:true}).click();
    await expect(page.locator('.tc-specimen')).toContainText('12 seconds');
    await expect(page.locator('.tc-slots')).toContainText('Occurred and received');
    await compositions.getByRole('button',{name:'Chart series',exact:true}).click();
    await expect(page.locator('.tc-slots')).toContainText('Omitted so the series');
    await expect(page.locator('.tc-specimen .rt-footer')).toBeVisible();
    if(width===390) {
      await expect(page.locator('.tc-specimen .rt-wide')).toHaveCSS('font-size','12px');
      await page.locator('.tc-specimen').focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(()=>page.locator('.tc-specimen').evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
    }
    const overflow=await page.locator('.tooltip-composition').evaluate(el=>el.scrollWidth>el.clientWidth+1);
    expect(overflow).toBe(false);
    await expect(page.locator('.related-studies')).toHaveCount(0);
  });
}
test('FontContext scope remains reachable when its parent is collapsed',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/fontcontext.html');
  await page.locator('#who-for .section-header').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#who-for .section-header')).toHaveAttribute('aria-expanded','false');
  await page.locator('[data-target="scoping"]').evaluate((el:HTMLElement)=>el.click());
  await expect(page.locator('#scoping')).toBeVisible();
  await expect(page.getByText('Coming Soon',{exact:true})).toHaveCount(0);
  await expect(page.getByRole('navigation',{name:'More selected case studies'})).toHaveCount(0);
});
test('Mobile selected work precedes additional studies',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const order=await page.locator('.scatter-9,.scatter-fontcontext-slot,.scatter-3,.scatter-trace').evaluateAll(es=>es.map(e=>({name:e.className,y:e.getBoundingClientRect().y})).sort((a,b)=>a.y-b.y).map(e=>e.name));
  expect(order[0]).toContain('scatter-9');
  expect(order[1]).toContain('scatter-fontcontext-slot');
  expect(order[2]).toContain('scatter-3');
});
