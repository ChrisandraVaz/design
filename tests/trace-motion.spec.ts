import {test,expect} from '@playwright/test';

for(const width of [320,390,768,1440])test(`solution remains complete with reduced motion at ${width}`,async({page},testInfo)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width,height:900});
 await page.goto('/projects/trace');
 const motion=page.locator('#motion');
 await motion.scrollIntoViewIfNeeded();
 await expect(motion.getByRole('heading',{name:'Solution',exact:true})).toBeVisible();
 await expect(motion.getByRole('group',{name:'Final Trace component',exact:true})).toBeVisible();
 await expect(motion.getByRole('group',{name:'Final Trace component',exact:true}).getByRole('img')).toHaveCount(3);
 await expect(motion.locator('.trace-zoom-hero')).toHaveCSS('opacity','1');
 expect(await motion.evaluate(node=>node.getAnimations({subtree:true}).length)).toBe(0);
 await expect(motion.locator('.trace-zoom-controls')).toBeHidden();
 expect(await motion.evaluate(node=>node.scrollWidth<=node.clientWidth+1)).toBe(true);
 await motion.screenshot({path:`test-results/views/trace-motion-${width}-${testInfo.project.name}.png`});
});

// Inspect moving frames on both sides of the layout breakpoint. Static screenshots
// cannot detect an enlarged watch leaving its frame during the animation.
for(const width of [320,390,699,700,768,1440])test(`every solution frame stays inside its space at ${width}`,async({page},testInfo)=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.setViewportSize({width,height:900});
 await page.goto('/projects/trace');
 const motion=page.locator('#motion');
 await motion.scrollIntoViewIfNeeded();
 const photo=motion.locator('.trace-zoom-watch img');
 await expect(photo).toHaveAttribute('src','/trace/watch-cover.png');
 await expect.poll(()=>photo.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth===764&&img.naturalHeight===1204)).toBe(true);
 await expect(motion.locator('.trace-watch-device,.trace-zoom-watch-frame')).toHaveCount(0);
 const pause=motion.getByRole('button',{name:'Pause solution motion'});
 await expect(pause).toHaveText('');
 await expect(pause.locator('svg')).toHaveCount(1);
 const hit=(await pause.boundingBox())!;
 expect(hit.width).toBeGreaterThanOrEqual(44);expect(hit.height).toBeGreaterThanOrEqual(44);
 await expect(motion.locator('.trace-zoom-labels')).toHaveCount(0);
 let initialWatchWidth=0;
 for(const time of [0,1800,2400,3500,5200,8500,9400]){
  await motion.evaluate((node,t)=>node.getAnimations({subtree:true}).forEach(animation=>{animation.pause();animation.currentTime=t;}),time);
  const geometry=await motion.evaluate(node=>{
   const rect=(selector:string)=>{const r=node.querySelector(selector)!.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
   return {stage:rect('.trace-zoom-stage'),space:rect('.trace-zoom-sequence'),watch:rect('.trace-zoom-watch'),component:rect('.trace-recreated'),gauges:[...node.querySelectorAll('.trace-recreated-gauges>svg')].map(svg=>{const r=svg.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom};}),overflow:document.documentElement.scrollWidth>innerWidth+1};
  });
  const {stage,space,watch,component,gauges}=geometry;
  expect(geometry.overflow).toBe(false);
  expect(stage.height).toBeLessThanOrEqual(440);
  for(const visual of [watch,component]){
   expect(visual.x).toBeGreaterThanOrEqual(space.x-1);
   expect(visual.right).toBeLessThanOrEqual(space.right+1);
   expect(visual.y).toBeGreaterThanOrEqual(space.y-1);
   expect(visual.bottom).toBeLessThanOrEqual(space.bottom+1);
   expect(Math.abs(visual.x+visual.width/2-stage.x-stage.width/2)).toBeLessThan(1);
  }
  expect(watch.width).toBeLessThanOrEqual(184);
  if(time===0)initialWatchWidth=watch.width;
  if(time===1800){expect(watch.width/initialWatchWidth).toBeGreaterThan(1.14);expect(watch.width/initialWatchWidth).toBeLessThanOrEqual(1.161);}
  expect(component.width).toBeLessThanOrEqual(600);
  expect(component.width/component.height).toBeCloseTo(1118/458,1);
  expect(gauges).toHaveLength(3);
  for(const gauge of gauges){
   expect(Math.abs(gauge.width-gauge.height)).toBeLessThan(1);
   expect(gauge.x).toBeGreaterThan(component.x);
   expect(gauge.right).toBeLessThan(component.right);
   expect(gauge.bottom).toBeLessThan(component.bottom);
  }
  if(time===0){await expect(motion.locator('.trace-zoom-watch')).toHaveCSS('opacity','1');await expect(motion.locator('.trace-zoom-hero')).toHaveCSS('opacity','0');}
  if(time===5200){await expect(motion.locator('.trace-zoom-watch')).toHaveCSS('opacity','0');await expect(motion.locator('.trace-zoom-hero')).toHaveCSS('opacity','1');}
  if([320,390,1440].includes(width)&&[0,1800,5200].includes(time))await motion.screenshot({path:`test-results/views/trace-motion-phase-${width}-${time}-${testInfo.project.name}.png`});
 }
});

test('motion loops automatically, pauses offscreen, and supports a keyboard pause control',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/projects/trace');
 const motion=page.locator('#motion'),stage=motion.locator('.trace-zoom-stage');
 await expect(stage).toHaveAttribute('data-playing','false');
 await expect(motion.locator('.trace-zoom-watch')).toHaveCSS('animation-play-state','paused');
 await motion.scrollIntoViewIfNeeded();
 await expect(stage).toHaveAttribute('data-playing','true');
 await motion.evaluate(node=>node.getAnimations({subtree:true}).forEach(animation=>{animation.currentTime=5200}));
 await expect(motion.locator('.trace-zoom-hero')).toHaveCSS('opacity','1');
 await page.evaluate(()=>window.scrollTo(0,0));
 await expect(stage).toHaveAttribute('data-playing','false');
 await motion.scrollIntoViewIfNeeded();
 await expect(stage).toHaveAttribute('data-playing','true');
 await expect(motion.locator('.trace-zoom-hero')).toHaveCSS('opacity','1');
 await expect(motion.locator('.trace-zoom-watch')).toHaveCSS('opacity','0');
 // Seek into the next iteration without a click or a newly mounted sequence.
 await motion.evaluate(node=>node.getAnimations({subtree:true}).forEach(animation=>{animation.currentTime=9400}));
 await expect(motion.locator('.trace-zoom-watch')).toHaveCSS('opacity','1');
 await expect(motion.locator('.trace-zoom-hero')).toHaveCSS('opacity','0');
 await expect(motion.locator('.trace-zoom-watch')).toHaveCSS('animation-iteration-count','infinite');
 const pause=motion.getByRole('button',{name:'Pause solution motion'});
 await pause.focus();await page.keyboard.press('Enter');
 await expect(stage).toHaveAttribute('data-playing','false');
 await expect(motion.locator('.trace-zoom-watch')).toHaveCSS('animation-play-state','paused');
 const play=motion.getByRole('button',{name:'Play solution motion'});
 await expect(play).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(stage).toHaveAttribute('data-playing','true');
 await expect(pause).toBeFocused();
});
