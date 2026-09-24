import {test,expect} from '@playwright/test';
for(const width of [390,1440]) test(`queue handoff states at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/projects/sentry-message-queuing#try-it');
 const flow=page.locator('.queue-flow');
 await flow.getByRole('button',{name:'Queue prepared question'}).click();await expect(flow.locator('.qf-pending-row')).toHaveCount(1);
 await flow.getByRole('button',{name:'Queue prepared question'}).click();await expect(flow.locator('.qf-pending-row')).toHaveCount(2);await expect(flow.getByRole('textbox')).toBeDisabled();
 await flow.getByRole('button',{name:'Delete pending message 1'}).click();await expect(flow.locator('.qf-pending-row')).toHaveCount(1);await expect(flow.getByRole('textbox')).toBeEnabled();
 await flow.getByRole('button',{name:'Restart',exact:true}).click();
 for(let i=1;i<8;i++)await flow.getByRole('button',{name:'Next handoff state'}).click();
 await expect(flow.locator('.qf-pending-row')).toHaveCount(0);await expect(flow.locator('.qf-controls')).toContainText('8 of 8');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
 if(width===1440){const boxes=await page.locator('.se-concept-decisions figure').evaluateAll(els=>els.map(e=>e.getBoundingClientRect().top));expect(new Set(boxes).size).toBe(2);}
});
