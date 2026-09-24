import {test,expect} from '@playwright/test';
for (const width of [320,390,768,1440]) test(`tooltip gallery shows all variants at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.goto('/projects/sentry-relative-time#try-it');
 const darkToggle=page.getByRole('button',{name:'Switch to dark mode'});
 if(await darkToggle.isVisible()) await darkToggle.click();
 const gallery=page.getByRole('region',{name:'Tooltip variants'});
 for(let i=0;i<8;i++){
  await expect(gallery.locator('.rt-gallery-controls span')).toContainText(`${i+1} of 8`);
  const fits=await gallery.locator('.rt-specimen').evaluate(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&el.scrollWidth<=el.clientWidth+1;});
  expect(fits).toBe(true);
  const paleText=await gallery.locator('.rt-specimen').evaluate(el=>Array.from(el.querySelectorAll('span,strong,b,time')).filter(node=>{const c=getComputedStyle(node).color.match(/\d+/g)?.map(Number);return c&&c[0]>190&&c[1]>190&&c[2]>190;}).map(node=>node.textContent));
  expect(paleText,'White tooltip surfaces must retain dark text in dark page mode').toEqual([]);
  await gallery.getByRole('button',{name:'Next tooltip'}).click();
 }
 await expect(gallery.locator('.rt-gallery-controls span')).toContainText('1 of 8');
 await gallery.focus();await gallery.press('ArrowLeft');
 await expect(gallery.locator('.rt-gallery-controls span')).toContainText('8 of 8');
 await gallery.press('ArrowRight');await expect(gallery.locator('.rt-gallery-controls span')).toContainText('1 of 8');
});
