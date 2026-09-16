import {test, expect} from '@playwright/test';

for (const width of [390, 1440]) {
  test(`Intro drawing follows the pointer at ${width}px and clears on Escape`, async ({page}) => {
    await page.setViewportSize({width, height:900});
    await page.goto('/');
    await page.getByRole('button', {name:'Enable drawing mode'}).click();
    const canvas=page.locator('.draw-layer');
    const box=(await canvas.boundingBox())!;
    await page.mouse.move(box.x+box.width*.55, box.y+box.height*.65);
    await page.mouse.down();
    await page.mouse.move(box.x+box.width*.85, box.y+box.height*.8, {steps:12});
    await page.mouse.up();
    // The drawing should remain after the old 900ms trail expired.
    await page.waitForTimeout(1100);
    expect(await canvas.evaluate((el:HTMLCanvasElement)=>{
      const ctx=el.getContext('2d')!;
      const x=Math.round(el.width*.7),y=Math.round(el.height*.725);
      return Array.from(ctx.getImageData(x-8,y-8,16,16).data).some((value,i)=>i%4===3&&value>0);
    })).toBe(true);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button',{name:'Enable drawing mode'})).toHaveAttribute('aria-pressed','false');
    expect(await canvas.evaluate((el:HTMLCanvasElement)=>Array.from(el.getContext('2d')!.getImageData(0,0,el.width,el.height).data).some((value,i)=>i%4===3&&value>0))).toBe(false);
  });
}

test('Canvas ends with the same breathing room as the introduction',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const spacing=await page.evaluate(()=>({
    top:document.querySelector('.original-intro')!.getBoundingClientRect().top,
    bottom:document.documentElement.scrollHeight-Math.max(...Array.from(document.querySelectorAll('.scatter-item'), n => n.getBoundingClientRect().bottom)),
  }));
  expect(Math.abs(spacing.top-spacing.bottom)).toBeLessThan(5);
});

test('Index separates its black introduction from its warm black gallery',async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:'Index',exact:true}).click();
  await page.getByRole('button',{name:'Switch to dark mode'}).click();
  await expect(page.locator('.index-sidebar')).toHaveCSS('background-color','rgb(0, 0, 0)');
  await expect(page.locator('.folio')).toHaveCSS('background-color','rgb(11, 9, 9)');
  await expect(page.locator('.index-sidebar h1')).toHaveCSS('color','rgb(255, 255, 255)');
  expect(await page.locator('.index-component-gallery').evaluate(el=>getComputedStyle(el).overflowY)).toBe('auto');
});

for (const width of [1230,1920]) {
  test(`Drawing hint matches Index at ${width}px`,async({page})=>{
    await page.setViewportSize({width,height:900});await page.goto('/');
    await page.getByRole('button',{name:'Enable drawing mode'}).hover();
    const hint=page.locator('.pencil-tooltip');
    await expect(hint).toHaveCSS('opacity','1');
    const canvas=(await hint.boundingBox())!;
    await page.getByRole('button',{name:'Index',exact:true}).click();
    await page.getByRole('button',{name:'Enable drawing mode'}).hover();
    await expect(hint).toHaveCSS('opacity','1');
    const index=(await hint.boundingBox())!;
    expect(canvas.width).toBeCloseTo(index.width,0);
    expect(canvas.height).toBeCloseTo(index.height,0);
    await expect(hint).toHaveCSS('animation-name','none');
  });
}
