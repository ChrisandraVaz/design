import {test,expect} from '@playwright/test';
for(const width of [390,768,1440]) for(const route of ['/about','/projects/sentry-message-queuing','/projects/sentry-relative-time']) test(`${route} authored content and navigation fit ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});
 await page.goto(route,{waitUntil:'domcontentloaded'});
 await expect(page.locator('h1')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await expect(page.getByRole('navigation',{name:'Portfolio navigation'}).getByRole('link',{name:'About',exact:true})).toHaveAttribute('href','/about');
 if(route!='/about'){
  // Takeaway articles (.story-lessons) intentionally reserve an icon column, so their paragraphs are excluded here.
  const narrowParagraphs=await page.locator('.se-narrative .trace-ecosystem-copy p,.se-chapter > p').evaluateAll(elements=>elements.filter(el=>Math.abs(el.getBoundingClientRect().width-el.parentElement!.getBoundingClientRect().width)>2).map(el=>el.textContent?.slice(0,60)));
  expect(narrowParagraphs,'Story paragraphs should fill their content column').toEqual([]);

  for(const id of ['overview','the-problem','solution','takeaways']) await expect(page.locator(`#${id}`)).toHaveCount(1);
  await page.getByRole('navigation',{name:'Case study navigation'}).getByRole('link',{name:'Takeaways',exact:true}).click();
  await expect(page.locator('#takeaways')).toBeInViewport();
  await expect(page.locator('details')).toHaveCount(0);
  if(width===1440){const nav=page.getByRole('navigation',{name:/chapters/});await nav.getByRole('link',{name:'Design process',exact:true}).hover();await expect(nav.getByRole('link',{name:route.includes('queuing')?'Four directions':'Detail decisions',exact:true})).toBeVisible();}
 }else{await expect(page.getByRole('heading',{level:1})).toContainText('product designer with more than 3 years');await expect(page.getByRole('group',{name:'Draggable photographs'})).toBeVisible();}
});
test('homepage About opens the internal page',async({page})=>{await page.goto('/');await page.locator('.portfolio-view-switch').getByRole('link',{name:'About',exact:true}).click();await expect(page).toHaveURL(/\/about$/);await expect(page.locator('h1')).toContainText('product designer with more than 3 years');});
