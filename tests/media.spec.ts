import {test,expect} from '@playwright/test';

test('Liquid Metallic Button opens its live GitHub Pages demo',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('link',{name:'Open Liquid Metallic Button'})).toHaveAttribute('href','https://chrisandravaz.github.io/Liquid-Metallic-Button-/liquid-metal-button');
});

test('Microsoft Paint Recreation opens its live GitHub Pages demo',async({page})=>{
 await page.goto('/');
 await expect(page.getByRole('link',{name:'Open Microsoft Paint recreation'})).toHaveAttribute('href','https://chrisandravaz.github.io/Microsoft-Paint/');
});

test('case-study images resolve through the production image optimizer',async({request})=>{
 for(const src of ['/assets/tdinterestclaims.png','/assets/serano/before-after-1.png','/assets/serano/before-after-2.png','/assets/serano/before-after-3.png']){
  const response=await request.get(`/_next/image?url=${encodeURIComponent(src)}&w=640&q=75`);
  expect(response.status(),src).toBe(200);
  expect(response.headers()['content-type'],src).toMatch(/^image\//);
 }
});

test('Font Context Plugin card repeats both media items in order',async({page})=>{
 await page.goto('/');
 const card=page.getByRole('link',{name:'Open Font Context Plugin case study'});
 await expect(card).toHaveAttribute('href','/fontcontext.html');
 await expect(card.locator('.fontcontext-card-cover')).toHaveAttribute('src','/assets/fontcontext-card.mp4');
 await expect(card.locator('.fontcontext-card-follow-up')).toHaveAttribute('src','/assets/fontcontext-follow-up.mp4');
 const cover=card.locator('.fontcontext-card-cover');
 const followUp=card.locator('.fontcontext-card-follow-up');
 await expect(page.locator('.scatter-fontcontext-slot .widget-label')).toHaveText('Font Context Plugin');
 for(const video of [cover,followUp]) {
  await expect(video).not.toHaveAttribute('loop','');
  await expect.poll(()=>video.evaluate(el=>(el as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
 }
 for(let cycle=0;cycle<2;cycle++) {
  await expect.poll(()=>cover.evaluate(el=>(el as HTMLVideoElement).paused)).toBe(false);
  await cover.evaluate(el=>{const video=el as HTMLVideoElement;video.currentTime=video.duration-0.15;});
  await expect(card.locator('.fontcontext-card-media')).toHaveClass(/is-follow-up/);
  await expect.poll(()=>followUp.evaluate(el=>(el as HTMLVideoElement).paused)).toBe(false);
  await followUp.evaluate(el=>{const video=el as HTMLVideoElement;video.currentTime=video.duration-0.15;});
  await expect(card.locator('.fontcontext-card-media')).not.toHaveClass(/is-follow-up/);
 }
});
