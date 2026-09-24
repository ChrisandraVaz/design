import { test, expect } from '@playwright/test';

test('Index preserves navigation alignment and packs Send to Agent below Message Queuing', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const before = (await nav.boundingBox())!;
  await page.getByRole('button', { name: 'Index', exact: true }).click();
  await expect(page.locator('.index-sidebar')).toBeVisible();
  const after = (await nav.boundingBox())!;
  expect(after.x).toBeCloseTo(before.x, 0);
  expect(after.y).toBeCloseTo(before.y, 0);
  const upcoming = (await page.locator('.index-widget-world .scatter-1').boundingBox())!;
  const location = (await page.locator('.index-widget-world .scatter-9').boundingBox())!;
  expect(location.x).toBeCloseTo(upcoming.x, 0);
  await expect.poll(async () => {
    const queue = (await page.locator('.index-widget-world .scatter-1').boundingBox())!;
    const agent = (await page.locator('.index-widget-world .scatter-9').boundingBox())!;
    return agent.y - queue.y - queue.height;
  }).toBeCloseTo(20, 0);
  expect(await page.locator('.scatter-trace').evaluate(el => getComputedStyle(el, '::before').content)).toBe('none');
  expect(await page.locator('.index-component-gallery').evaluate(el => getComputedStyle(el, '::before').content)).toBe('none');
});

for (const height of [600, 900]) {
  test(`Index opens with four project previews and equal cover widths at ${height}px tall`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height });
    await page.goto('/');
    await page.getByRole('button', { name: 'Index', exact: true }).click();
    await expect(page.locator('.index-sidebar')).toBeVisible();
    const sidebar = (await page.locator('.index-sidebar').boundingBox())!;
    const gallery = (await page.locator('.index-component-gallery').boundingBox())!;
    expect(gallery.x - sidebar.x - sidebar.width).toBeGreaterThanOrEqual(32);
    const covers = page.locator('.index-widget-world :is(.scatter-1,.scatter-9,.scatter-2,.scatter-5)');
    const boxes = await covers.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().toJSON()));
    expect(boxes).toHaveLength(4);
    for (const box of boxes) {
      expect(box.top).toBeGreaterThanOrEqual(0);
      // Taller experiment covers may continue below a short laptop viewport.
      expect(box.top + Math.min(box.height, 192)).toBeLessThanOrEqual(height);
      if (height === 900) expect(box.bottom).toBeLessThanOrEqual(height);
    }
    const paint = (await page.locator('.index-widget-world .paint-card video').boundingBox())!;
    const metal = (await page.locator('.index-widget-world .metallic-card video').boundingBox())!;
    expect(paint.width).toBeCloseTo(metal.width, 0);
    expect(paint.height).toBeCloseTo(metal.height, 0);
    expect(paint.width / paint.height).toBeCloseTo(1.5, 2);
    const watch=(await page.locator('.index-widget-world .trace-project-link').boundingBox())!,metalFrame=(await page.locator('.index-widget-world .metallic-card').boundingBox())!;
    expect(watch.width).toBeCloseTo(metalFrame.width,0);expect(watch.x).toBeCloseTo(metalFrame.x,0);
    await page.evaluate(async () => { await Promise.all(document.getAnimations().filter(a => a.effect instanceof KeyframeEffect && a.effect.pseudoElement?.startsWith('::view-transition')).map(a => a.finished.catch(() => {}))); });
    await page.getByRole('button', { name: 'Canvas', exact: true }).click();
    await expect(page.locator('.index-sidebar')).toHaveCount(0);
  });
}

test('Reduced motion switches layouts directly and returns to the top', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Index', exact: true }).click();
  await expect(page.locator('.index-sidebar')).toBeVisible();
  await page.locator('.index-widget-world .scatter-10').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Canvas', exact: true }).click();
  await expect(page.locator('.index-sidebar')).toHaveCount(0);
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

for (const height of [500, 600, 900]) {
  test(`Index sidebar stays in place at the bottom in a ${height}px tall viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height });
    await page.goto('/');
    await page.getByRole('button', { name: 'Index', exact: true }).click();
    const sidebar = page.locator('.index-sidebar');
    const initial = await sidebar.boundingBox();
    await page.locator('.index-component-gallery').evaluate(el => el.scrollTop = el.scrollHeight);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    await expect.poll(async () => (await sidebar.boundingBox())!.y).toBeCloseTo(initial!.y, 0);
    const end = await sidebar.boundingBox();
    expect(end!.y + end!.height).toBeLessThanOrEqual(height - 80);
    await expect(page.getByRole('group', { name: 'Portfolio view' })).toBeInViewport();
  });
}

for (const width of [320, 390, 600, 768, 1024, 1440, 1920]) {
  test(`Index contains every Canvas component on one scrollable page at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const ids = await page.locator('.scatter-item').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-card-id')).sort());
    const toggle = page.getByRole('group', { name: 'Portfolio view' });
    await toggle.getByRole('button', { name: 'Index', exact: true }).click();
    await expect(page.locator('.portfolio-index h1')).toContainText('is a product designer at Waterloo who ships products that click');
    await expect(page.getByRole('main')).toHaveCount(1);
    const gallery = page.getByRole('region', { name: 'Canvas components' });
    expect(await gallery.locator('.scatter-item').evaluateAll(nodes => nodes.map(node => node.getAttribute('data-card-id')).sort())).toEqual(ids);
    await expect(gallery.getByRole('link', { name: 'Open TD Securities Interest Claims case study' })).toHaveCount(0);
    await expect(gallery.locator('a[href*="td-design"],a[href*="ibm"],a[href*="serano"]')).toHaveCount(0);
    await expect(gallery.getByRole('link', { name: 'Open Microsoft Paint recreation' })).toHaveAttribute('href', 'https://chrisandravaz.github.io/Microsoft-Paint/');
    await expect(gallery.getByRole('link', { name: 'Open Liquid Metallic Button' })).toHaveAttribute('href', 'https://chrisandravaz.github.io/Liquid-Metallic-Button-/liquid-metal-button');
    const covers = await gallery.locator('.scatter-item').evaluateAll(nodes => nodes.map(node => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, width: r.width }; }));
    for (const cover of covers) { expect(cover.left).toBeGreaterThanOrEqual(0); expect(cover.right).toBeLessThanOrEqual(width + 1); expect(cover.width).toBeGreaterThan(140); }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await gallery.locator('.scatter-10').scrollIntoViewIfNeeded();
    if (width > 700) {
      expect(await gallery.evaluate(el => el.scrollTop)).toBeGreaterThan(100);
      expect(await page.evaluate(() => scrollY)).toBe(0);
    } else expect(await page.evaluate(() => scrollY)).toBeGreaterThan(100);
    await expect(gallery.locator('.scatter-10')).toBeInViewport();
    await gallery.getByRole('button', { name: 'Inspect News', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await gallery.evaluate(el => el.scrollTop = 0);
    await page.evaluate(() => window.scrollTo(0, 0));
    for (const theme of ['light', 'dark']) {
      if (theme === 'dark') { await page.getByRole('button', { name: 'Switch to dark mode' }).click(); await expect(page.locator('.folio')).toHaveCSS('background-color', 'rgb(11, 9, 9)'); }
      if ([390, 768, 1440].includes(width)) await page.screenshot({ path: `test-results/views/index-${width}-${theme}-${testInfo.project.name}.png`, fullPage: true });
    }
    await toggle.getByRole('button', { name: 'Canvas', exact: true }).click();
    await expect(page.locator('.index-widget-world')).toHaveCount(0);
    await expect(page.locator('.widget-world')).toBeVisible();
  });
}

test('Index preserves Font Context sequence and shared Sentry badges', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('group', { name: 'Portfolio view' }).getByRole('button', { name: 'Index' }).click();
  const card = page.locator('.index-widget-world .fontcontext-card');
  await expect(card.locator('.fontcontext-card-cover')).toHaveAttribute('src', '/assets/fontcontext-card.mp4');
  await card.locator('.fontcontext-card-cover').dispatchEvent('ended');
  await expect(card.locator('.fontcontext-card-media')).toHaveClass(/is-follow-up/);
  await expect(card.locator('.fontcontext-card-follow-up')).toHaveAttribute('src', '/assets/fontcontext-follow-up.mp4');
  await card.locator('.fontcontext-card-follow-up').dispatchEvent('ended');
  await expect(card.locator('.fontcontext-card-media')).not.toHaveClass(/is-follow-up/);
  const focus = page.locator('.index-widget-world .scatter-1');
  await expect(focus.locator('.card-kind')).toHaveCount(0);
  await expect(focus.locator('button')).toHaveCount(0);
});

test('Index profile stays still during entry and its controls have quiet hover feedback',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');
 const switchBefore=(await page.getByRole('group',{name:'Portfolio view'}).boundingBox())!;
 await page.getByRole('button',{name:'Index',exact:true}).click();
 const switchAfter=(await page.getByRole('group',{name:'Portfolio view'}).boundingBox())!;
 expect(switchAfter.x).toBeCloseTo(switchBefore.x,1);expect(switchAfter.y).toBeCloseTo(switchBefore.y,1);
 expect(switchAfter.x+switchAfter.width/2).toBeCloseTo(720,0);
 const sidebar=page.locator('.index-sidebar'),first=(await sidebar.boundingBox())!;
 for(const delay of [40,80,160]){await page.waitForTimeout(delay);const box=(await sidebar.boundingBox())!;expect(box.x).toBeCloseTo(first.x,1);expect(box.y).toBeCloseTo(first.y,1);}
 const about=page.getByRole('link',{name:'About Me',exact:true});
 for(const theme of ['light','dark']){
  if(theme==='dark')await page.locator('.theme-control').click();
  await page.mouse.move(0,0);
  const resting=await about.evaluate(e=>getComputedStyle(e).backgroundColor);
  const size=(await about.boundingBox())!;expect(size.width).toBeGreaterThanOrEqual(110);expect(size.height).toBeGreaterThanOrEqual(44);
  await about.hover();await expect.poll(()=>about.evaluate(e=>getComputedStyle(e).backgroundColor)).not.toBe(resting);
  expect(await page.locator('.index-availability').evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
  for(const selector of ['.index-availability','.index-contact-note a'])expect(await page.locator(selector).evaluate(e=>getComputedStyle(e).color)).toBe(theme==='light'?'rgb(209, 0, 138)':'rgb(255, 107, 194)');
 }
 const media=(await page.locator('.fontcontext-card-media').boundingBox())!,video=(await page.locator('.fontcontext-card-cover').boundingBox())!;
 expect(video.width).toBeGreaterThan(media.width);expect(video.height).toBeGreaterThan(media.height);
 expect(await page.locator('.fontcontext-card-cover').evaluate(e=>getComputedStyle(e).objectFit)).toBe('cover');
});

test('Project type badges stay visible without shifting the cards',async({page})=>{
 await page.setViewportSize({width:1440,height:1100});await page.goto('/');
 for(const view of ['Canvas','Index']){
  if(view==='Index')await page.getByRole('button',{name:'Index',exact:true}).click();
  await expect(page.locator('.scatter-trace>.card-heading')).toContainText('Apple Watch Trace');
  await expect(page.locator('.scatter-trace .card-kind')).toHaveText('Concept • Case study');
  await expect(page.locator('.scatter-fontcontext-slot .card-kind')).toHaveText('Case study');
  for(const cls of ['scatter-paint','scatter-metallic','scatter-trace','scatter-fontcontext-slot','scatter-claims','scatter-9','scatter-2','scatter-3']){
   const card=page.locator('.'+cls),caption=card.locator('.card-kind');
   await card.scrollIntoViewIfNeeded();await page.mouse.move(0,0);
   await expect(caption).toBeVisible();const before=(await card.boundingBox())!;
   const badge=(await caption.boundingBox())!;expect(badge.height).toBeCloseTo(24,0);expect(badge.x+badge.width).toBeLessThanOrEqual(before.x+before.width);
   const surface=(await card.locator(':scope>.portfolio-experiment-card,:scope>.trace-project-link,:scope>.sentry-preview-card').boundingBox())!;
   const isSentry=['scatter-1','scatter-9','scatter-2','scatter-3'].includes(cls);
   const inset=cls==='scatter-fontcontext-slot'||isSentry?18:16;
   expect(badge.x-surface.x).toBeGreaterThanOrEqual(inset-1);expect(badge.x-surface.x).toBeLessThan(inset+2);
   const bottomInset=surface.y+surface.height-badge.y-badge.height;expect(bottomInset).toBeGreaterThanOrEqual(inset-1);expect(bottomInset).toBeLessThan(inset+2);
   const resting=await caption.evaluate(e=>getComputedStyle(e).backgroundColor);
   await card.hover();await expect(caption).toBeVisible();await expect(caption).toHaveText(['scatter-paint','scatter-metallic'].includes(cls)?'Component':isSentry?'Sentry Internship':cls==='scatter-trace'?'Concept • Case study':'Case study');
   await expect.poll(()=>caption.evaluate(e=>getComputedStyle(e).backgroundColor)).not.toBe(resting);
   const after=(await card.boundingBox())!;expect(after.width).toBeCloseTo(before.width,0);expect(after.height).toBeCloseTo(before.height,0);
   const label=(await card.locator('.card-heading>span').boundingBox())!;expect(label.x+label.width).toBeLessThanOrEqual(after.x+after.width+1);
  }
 }
});
