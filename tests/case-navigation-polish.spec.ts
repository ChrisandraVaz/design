import { test, expect } from '@playwright/test';

for (const width of [390, 768, 1440]) {
  test(`case navigation controls remain separate at ${width}`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    for (const route of ['/projects/sentry-send-to-agent','/fontcontext.html','/projects/trace','/projects/sentry-split-panel']) {
      await page.goto(route);
      const controls = page.getByRole('navigation',{name:'Portfolio navigation'});
      await expect(controls).toBeVisible();
      const tabs = page.locator(route.includes('fontcontext') ? '.nav-links' : (route.endsWith('/trace') || route.endsWith('/sentry-split-panel')) ? '.trace-case-tabs' : '.agent-story-tabs');
      const a = await controls.boundingBox(); const b = await tabs.boundingBox();
      expect(a && b).toBeTruthy();
      expect(a!.x >= b!.x+b!.width || a!.y+a!.height <= b!.y || a!.y >= b!.y+b!.height).toBe(true);
      const button = controls.getByRole('button');
      const prior = await button.getAttribute('aria-label');
      await button.click();
      await expect(button).not.toHaveAttribute('aria-label',prior!);
    }
  });
}
test('chapter navigation is persistent and reveals branches on hover',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/fontcontext.html');
  await expect(page.locator('.tree-nav')).toHaveCSS('opacity','1');
  await page.goto('/projects/sentry-send-to-agent');
  const group=page.locator('.agent-tree-group').filter({has:page.getByRole('link',{name:'Design process',exact:true})});
  await expect(group.locator('.agent-tree-children')).toBeHidden();
  await group.hover();
  await expect(group.getByRole('link',{name:'Journey and scope'})).toBeVisible();
  const cards=page.locator('.agent-segments');
  const content=page.locator('.agent-story-content');
  expect(Math.round((await cards.boundingBox())!.width)).toBe(Math.round((await content.boundingBox())!.width));
});

test('Trace chapter branches and footer links work',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/projects/trace');
 const group=page.locator('.trace-case-tree-group').filter({has:page.getByRole('link',{name:'Design process',exact:true})});
 await group.hover();
 await group.getByRole('link',{name:'Power',exact:true}).click();
 await expect(page.locator('#battery-studies')).toBeInViewport();
 const footer=page.locator('.trace-contact-footer');
 await footer.scrollIntoViewIfNeeded();
 await expect(footer.getByRole('link',{name:'Email',exact:true})).toHaveAttribute('href','mailto:chrisandravaz12@gmail.com');
 await expect(page.getByText('Back to the canvas',{exact:false})).toHaveCount(0);
});
