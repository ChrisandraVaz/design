import {test, expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

test('the approved cover stays intact on the canvas and the case study', async ({page}) => {
  const hash=createHash('sha256').update(readFileSync('public/trace/watch-cover.png')).digest('hex');
  expect(hash).toBe('dd5efdb2c6cb8ebf6d4169f17af9488164dec95e59bc13a5c211d4fb014ac9a8');
  for (const url of ['/', '/projects/trace']) {
    await page.goto(url);
    const image=page.getByRole('img',{name:'Original Trace design on a purple-band Apple Watch'});
    await expect(image).toHaveAttribute('src','/trace/watch-cover.png');
    await expect.poll(()=>image.evaluate((n:HTMLImageElement)=>n.complete&&n.naturalWidth===764&&n.naturalHeight===1204)).toBe(true);
  }
});

test('the obsolete 18 second film is not part of the case study',async({page})=>{
  await page.goto('/projects/trace');
  await expect(page.locator('.trace-watch-film, video[src="/trace/watch-motion.mp4"]')).toHaveCount(0);
  await expect(page.getByRole('group',{name:'Trace solution presentation'})).toHaveCount(1);
});
