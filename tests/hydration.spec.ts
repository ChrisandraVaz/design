import {test,expect} from '@playwright/test';

for(const route of ['/', '/projects/trace']){
 test(`${route} hydrates Trace gauges without runtime errors`,async({page})=>{
  const errors:string[]=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.goto(route);
  if(route==='/')await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
  else {
   await page.getByRole('button',{name:'Pause solution motion'}).click();
   await expect(page.locator('.trace-zoom-stage')).toHaveAttribute('data-playing','false');
   await expect(page.getByRole('button',{name:'Play solution motion'})).toBeVisible();
  }
  await expect(page.locator('.ts-gauge').first()).toBeVisible();
  expect(errors).toEqual([]);
 });
}
