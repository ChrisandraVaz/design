import {test,expect,type Page} from '@playwright/test';

async function checkInnerCorners(page:Page,index=false) {
 const faces=await page.locator([
  '.scatter-item .sentry-preview-art',
  '.scatter-item .fontcontext-card-media',
  '.scatter-item .trace-project-art > :is(.trace-bento-watch,.trace-bento-widget,.trace-bento-state)',
  '.scatter-item > .portfolio-experiment-card > video',
  '.scatter-item > .td-claims-card > .td-claims-media',
  index ? '.scatter-item > .index-component-frame > .card' : '',
  ].filter(Boolean).join(',')).evaluateAll(nodes=>nodes.map(n=>{
  const style=getComputedStyle(n),scale=n.getBoundingClientRect().width/(n as HTMLElement).offsetWidth;
  const frame=n.closest('.sentry-preview-card');
  const frameBox=frame?.getBoundingClientRect(),faceBox=n.getBoundingClientRect();
  const clipClearance=frame&&frameBox ? parseFloat(style.borderTopLeftRadius)*scale+Math.min(faceBox.x-frameBox.x,faceBox.y-frameBox.y)-parseFloat(getComputedStyle(frame).borderTopLeftRadius)*frameBox.width/(frame as HTMLElement).offsetWidth : 0;
  return {card:n.closest<HTMLElement>('.scatter-item')!.dataset.cardId,clipClearance,radii:[style.borderTopLeftRadius,style.borderTopRightRadius,style.borderBottomRightRadius,style.borderBottomLeftRadius].map(r=>parseFloat(r)*scale)};
 }));
 expect(faces).toHaveLength(index?13:11);
 expect(new Set(faces.map(face=>face.card)).size).toBe(index?11:9);
 const reference=await page.locator('.scatter-9>.sentry-preview-card').evaluate(n=>parseFloat(getComputedStyle(n).borderTopLeftRadius)*n.getBoundingClientRect().width/(n as HTMLElement).offsetWidth*.7);
 for(const face of faces){
  expect(face.clipClearance,`${face.card} outer frame does not clip its inner corner`).toBeGreaterThanOrEqual(-.15);
  for(const radius of face.radii)expect(Math.abs(radius-reference),`${face.card} inner corner matches the shared frame`).toBeLessThan(.2);
 }
 const watchGap=await page.locator('.trace-project-art').evaluate(n=>{
  const first=n.querySelector('.trace-bento-widget')!.getBoundingClientRect(),second=n.querySelector('.trace-bento-state')!.getBoundingClientRect();
  return second.top-first.bottom;
 });
 expect(Math.abs(watchGap-reference/14*7.5),'Watch divider keeps its visible width at every scale').toBeLessThan(.2);
}

async function checkFrameInsets(page:Page,index=false) {
 const pairs=index ? [
  ['.scatter-9>.sentry-preview-card','.scatter-9 .sentry-preview-art'],
  ['.scatter-1>.sentry-preview-card','.scatter-1 .sentry-preview-art'],
  ['.scatter-2>.sentry-preview-card','.scatter-2 .sentry-preview-art'],
  ['.scatter-3>.sentry-preview-card','.scatter-3 .sentry-preview-art'],
  ['.scatter-5>.index-component-frame','.scatter-5>.index-component-frame>.card'],
  ['.scatter-12>.index-component-frame','.scatter-12>.index-component-frame>.card'],
  ['.scatter-trace>.trace-project-link','.scatter-trace .trace-project-art'],
  ['.scatter-metallic>.portfolio-experiment-card','.scatter-metallic video'],
  ['.scatter-paint>.portfolio-experiment-card','.scatter-paint video'],
  ['.scatter-claims>.portfolio-experiment-card','.scatter-claims .td-claims-media'],
 ] : [
  ['.scatter-9>.sentry-preview-card','.scatter-9 .sentry-preview-art'],
  ['.scatter-1>.sentry-preview-card','.scatter-1 .sentry-preview-art'],
  ['.scatter-2>.sentry-preview-card','.scatter-2 .sentry-preview-art'],
  ['.scatter-3>.sentry-preview-card','.scatter-3 .sentry-preview-art'],
  ['.scatter-trace>.trace-project-link','.scatter-trace .trace-project-art'],
  ['.scatter-metallic>.portfolio-experiment-card','.scatter-metallic video'],
  ['.scatter-paint>.portfolio-experiment-card','.scatter-paint video'],
  ['.scatter-claims>.portfolio-experiment-card','.scatter-claims .td-claims-media'],
 ];
 const insets=[];
 for(const [outerSelector,innerSelector] of pairs){
  const outer=page.locator(outerSelector);
  insets.push(await outer.evaluate((frame,selector)=>{const face=document.querySelector(selector)!,a=frame.getBoundingClientRect(),b=face.getBoundingClientRect();return {selector,left:b.left-a.left,top:b.top-a.top,right:a.right-b.right,bottom:a.bottom-b.bottom};},innerSelector));
 }
 const reference=insets[index?6:4].left;
 for(const inset of insets)for(const side of ['left','top','right','bottom'] as const)
  expect(Math.abs(inset[side]-reference),`${inset.selector} ${side} inset matches Watch`).toBeLessThan(.25);
}

async function checkNikeSilhouette(page:Page) {
 const result=await page.locator('.scatter-10').evaluate(node=>{const scale=parseFloat(getComputedStyle(node).getPropertyValue('--surface-scale'))||1,outer=getComputedStyle(node),photo=getComputedStyle(node.querySelector(':scope > .running')!);return {outerRadius:parseFloat(outer.borderTopLeftRadius)*scale,photoRadius:parseFloat(photo.borderTopLeftRadius)*scale,faces:node.querySelectorAll(':scope > .portfolio-inner-face').length};});
 expect(result.outerRadius,'Nike keeps its original outer radius').toBeCloseTo(24,1);
 expect(result.photoRadius,'Nike photo keeps its original radius').toBeCloseTo(24,1);
 expect(result.faces,'Nike stays a gray shell around one photo').toBe(0);
}

async function checkNewsShaderSilhouette(page:Page) {
 for(const selector of ['.scatter-5>.news','.scatter-12>.shader']){
  const result=await page.locator(selector).evaluate(node=>{const style=getComputedStyle(node),surfaceScale=parseFloat(getComputedStyle(node.closest('.scatter-item')!).getPropertyValue('--surface-scale'))||1;return {radius:parseFloat(style.borderTopLeftRadius)*surfaceScale,faces:node.querySelectorAll(':scope > .portfolio-inner-face').length};});
  expect(result.radius,`${selector} keeps its original single-card radius`).toBeCloseTo(14,1);
  expect(result.faces,`${selector} stays a single surface`).toBe(0);
 }
}

for(const width of [390,768,1100,1154,1440,1920])test(`homepage frame and navigation survive theme changes at ${width}`,async({page},testInfo)=>{
 await page.setViewportSize({width,height:width===1154?603:900});await page.goto('/');
 await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
 const checkCardHeadings=async()=>{
  const labels=await page.locator('.card-heading>span').evaluateAll(nodes=>nodes.map(n=>{
   const r=n.getBoundingClientRect(),surface=n.parentElement!.nextElementSibling!.getBoundingClientRect();
   return {height:r.height,color:getComputedStyle(n).color,gap:surface.top-r.bottom};
  }));
  expect(labels).toHaveLength(11);
  expect(new Set(labels.map(label=>label.color)).size).toBe(1);
  expect(Math.max(...labels.map(label=>label.height))-Math.min(...labels.map(label=>label.height))).toBeLessThan(.15);
  for(const label of labels)expect(label.gap).toBeGreaterThanOrEqual(0);
  const arrows=await page.locator('.card-heading>:is(button,.card-heading-action)').evaluateAll(nodes=>nodes.map(n=>{
   const button=n.getBoundingClientRect(),title=n.previousElementSibling!.getBoundingClientRect(),surface=n.parentElement!.nextElementSibling!.getBoundingClientRect();
   return {label:n.getAttribute('aria-label'),titleGap:button.left-title.right,rightInset:surface.right-button.right,centerOffset:Math.abs(button.top+button.height/2-title.top-title.height/2),height:button.height};
  }));
  expect(arrows).toHaveLength(11);
  for(const arrow of arrows){
   expect(arrow.titleGap,`${arrow.label} is to the right of its title`).toBeGreaterThan(0);
   expect(arrow.rightInset,`${arrow.label} stays inside the card right edge`).toBeGreaterThanOrEqual(0);
   expect(arrow.centerOffset,`${arrow.label} is vertically centered with its title`).toBeLessThan(1);
   if(width<=1100)expect(arrow.height,`${arrow.label} preserves the mobile touch target`).toBeGreaterThanOrEqual(44);
  }
  await expect(page.locator('.scatter-10>.card-heading')).toHaveCount(0);
  const radii=await page.locator('.scatter-item:not(.scatter-10):not(.scatter-5):not(.scatter-12)>.card,.scatter-trace>.trace-project-link,.scatter-item>.portfolio-experiment-card,.scatter-item>.sentry-preview-card').evaluateAll(nodes=>nodes.map(n=>{
   const radius=parseFloat(getComputedStyle(n).borderTopLeftRadius);
   return radius*n.getBoundingClientRect().width/(n as HTMLElement).offsetWidth;
  }));
  expect(radii).toHaveLength(9);
  expect(Math.max(...radii)-Math.min(...radii)).toBeLessThan(.15);
  await checkInnerCorners(page);
  await checkFrameInsets(page);
  await checkNewsShaderSilhouette(page);
  await checkNikeSilhouette(page);
 };
 await checkCardHeadings();
 const nav=page.getByRole('navigation',{name:'Main navigation'}),heading=page.locator('.hero-headline'),canvas=page.locator('.scatter-viewport'),theme=page.locator('.theme-control');
 await expect(nav.getByRole('link',{name:'Work',exact:true})).toHaveAttribute('href','#work');
 await expect(nav.getByRole('link',{name:'About'})).toHaveAttribute('href','https://vazzy.framer.website/about');
 const initial=await page.locator('.hero-headline,.scatter-item').evaluateAll(nodes=>nodes.map(n=>{const b=n.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height}}));
 const h=(await heading.boundingBox())!,n=(await nav.boundingBox())!,c=(await canvas.boundingBox())!,t=(await theme.boundingBox())!;
 expect(t.height).toBeGreaterThanOrEqual(44);
 const icon=(await theme.locator('svg').boundingBox())!;
 expect(Math.abs(icon.x+icon.width/2-t.x-t.width/2),'theme icon is horizontally centered').toBeLessThan(1);
 expect(Math.abs(icon.y+icon.height/2-t.y-t.height/2),'theme icon is vertically centered').toBeLessThan(1);
 expect(n.x).toBeGreaterThanOrEqual(0);expect(n.x+n.width).toBeLessThanOrEqual(width);
 expect(Math.abs(c.x-h.x),'heading shares the canvas left edge').toBeLessThan(1);
 if(width>1100){
  const fontContext=(await page.locator('.scatter-fontcontext-slot .fontcontext-card').boundingBox())!;
  expect(fontContext.y-h.y-h.height,'Font Context keeps breathing room below the introduction').toBeGreaterThanOrEqual(24);
  expect(Math.abs(n.x+n.width-c.x-c.width),'navigation shares the canvas right edge').toBeLessThan(1);
  expect(h.y).toBeGreaterThan(54);expect(h.y).toBeLessThan(67);
  expect(h.x+h.width).toBeLessThan(n.x-24);
  if(width===1154){expect(Math.abs(h.x-35)).toBeLessThan(1);expect(Math.abs(n.x-935)).toBeLessThan(2);}
 }else expect(h.y).toBeGreaterThanOrEqual(n.y+n.height+16);
 await theme.click();await expect(page.locator('.canvas-folio')).toHaveAttribute('data-theme','dark');
 await checkCardHeadings();
 await expect(theme).toHaveAttribute('aria-label','Switch to light mode');
 await page.mouse.move(0,0);
 const dark=await page.locator('.hero-headline,.scatter-item').evaluateAll(nodes=>nodes.map(n=>{const b=n.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height}}));
 expect(dark).toEqual(initial);
 if([390,1154,1440].includes(width))await page.screenshot({path:`test-results/views/home-frame-dark-${width}-${testInfo.project.name}.png`});
 await page.reload();await expect(page.locator('.canvas-folio')).toHaveAttribute('data-theme','dark');
 await theme.focus();await page.keyboard.press('Enter');await expect(page.locator('.canvas-folio')).toHaveAttribute('data-theme','light');
 await expect(theme).toHaveAttribute('aria-label','Switch to dark mode');
 await page.mouse.move(0,0);
 if([390,1154,1440].includes(width))await page.screenshot({path:`test-results/views/home-frame-light-${width}-${testInfo.project.name}.png`});
 if(width===1440){
  const flightArrow=page.getByRole('button',{name:'Inspect News',exact:true});
  await flightArrow.hover();await expect(flightArrow).toHaveCSS('opacity','1');
  await page.locator('.scatter-5').screenshot({path:`test-results/views/home-news-arrow-light-${width}-${testInfo.project.name}.png`});
 }
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});

for(const width of [390,768,1440,1920])test(`Index cards share outer and inner corners at ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');
 await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
 await page.getByRole('button',{name:'Index',exact:true}).click();
 for(const theme of ['light','dark']){
  if(await page.locator('.folio').getAttribute('data-theme')!==theme)await page.locator('.theme-control').click();
  const outer=await page.locator('.scatter-item>.index-component-frame,.scatter-trace>.trace-project-link,.scatter-item>.portfolio-experiment-card,.scatter-item>.sentry-preview-card').evaluateAll(nodes=>nodes.map(n=>parseFloat(getComputedStyle(n).borderTopLeftRadius)*n.getBoundingClientRect().width/(n as HTMLElement).offsetWidth));
  expect(outer).toHaveLength(11);
  for(const radius of outer)expect(radius).toBeCloseTo(20,1);
  await checkInnerCorners(page,true);
  await checkFrameInsets(page,true);
  await checkNikeSilhouette(page);
 }
});
