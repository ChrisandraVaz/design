import {test, expect} from '@playwright/test';

test('Agent shows Thinking before the database tool call and matching answer', async ({page}) => {
  await page.clock.install();
  await page.goto('/projects/sentry-send-to-agent');
  const film = page.locator('.se-hero-product .agent-film');
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveAttribute('data-playing','true');
  const seek = async (time:number) => {
    await film.evaluate((el,time)=>el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time}), time);
    await page.clock.runFor(32);
  };
  await seek(100);
  await expect(film.locator('.agent-reference-question')).toHaveText('What are my slowest DB queries?');
  await expect(film.locator('.agent-initial-thinking')).toHaveText('Thinking...');
  await expect(film.locator('.agent-query-tool')).toHaveCount(0);
  await expect(film.locator('.agent-investigation-copy')).toBeHidden();
  await seek(1700);
  await expect(film.locator('.agent-query-progress')).toHaveAttribute('data-stage','querying');
  await expect(film.locator('.agent-query-detail')).toContainText('slowest database queries, sorted by p95 duration');
  await expect(film.locator('.agent-query-elapsed')).toHaveText('0.7s');
  await page.getByRole('button',{name:'Pause interaction preview'}).click();
  await page.clock.runFor(2000);
  await expect(film.locator('.agent-query-elapsed')).toHaveText('0.7s');
  await expect(film.locator('.agent-query-detail .agent-loading-ring')).toHaveCSS('animation-play-state','paused');
  await page.getByRole('button',{name:'Play interaction preview'}).click();
  await seek(3300);
  await expect(film.locator('.agent-query-progress')).toHaveAttribute('data-stage','complete');
  await expect(film.locator('.agent-query-detail')).toHaveText('No DB query spans found.');
  await expect(film.locator('.agent-query-detail > svg')).toHaveCount(1);
  await expect(film.locator('.agent-investigation-copy')).toBeHidden();
  await seek(4000);
  await expect(film.locator('.agent-investigation-copy')).toBeVisible();
  await expect(film.locator('.agent-investigation-copy p').first()).toHaveText("Your web-app project is a Next.js frontend application — it doesn't appear to have any database (db) spans instrumented. There are no DB query spans in the last 14 days.");
  await expect(film.locator('.agent-investigation-copy p')).toHaveCount(2);
  await expect(film.locator('.agent-investigation-copy p').last()).toHaveText("This is expected for a pure frontend project. DB queries would typically show up if you had a backend service (e.g., a Node.js API, Python server, etc.) instrumented with Sentry's server-side SDK.");
});

for (const width of [320,768,1440]) test(`Seer header remains complete at ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:1000});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
  await page.getByRole('button',{name:'Index',exact:true}).click();
  const queueHeader=page.locator('.sentry-preview-message-queuing .seer-chat-header');
  const agentHeader=page.locator('.sentry-preview-send-to-agent .seer-chat-header');
  await expect(queueHeader).toHaveClass(/seer-chat-header-agent/);
  expect(await queueHeader.evaluate(el=>el.innerHTML)).toBe(await agentHeader.evaluate(el=>el.innerHTML));
  for (const header of await page.locator('.seer-chat-header').all()) {
    await header.scrollIntoViewIfNeeded();
    const isAgent = await header.evaluate(el=>el.classList.contains('seer-chat-header-agent'));
    await expect(header.locator('.seer-chat-utility')).toHaveCount(isAgent ? 2 : 4);
    await expect(header.locator('.seer-chat-new')).toHaveText(isAgent ? '' : 'New chat');
    await expect(header.locator('.seer-chat-new')).toBeVisible();
    if (isAgent) {
      await expect(header).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await expect(header.locator('.seer-chat-beta')).toHaveCSS('background-color', 'rgb(255, 243, 205)');
      await expect(header.locator('.seer-chat-beta > svg > path')).toHaveCount(1);
      await expect(header.locator('.seer-chat-beta img')).toHaveCount(0);
    }
    const parent=(await header.boundingBox())!;
    for (const item of await header.locator('.seer-chat-identity,.seer-chat-tools').all()) {
      const box=(await item.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(parent.x);
      expect(box.x+box.width).toBeLessThanOrEqual(parent.x+parent.width+1);
    }
    const identity=(await header.locator('.seer-chat-identity').boundingBox())!;
    const tools=(await header.locator('.seer-chat-tools').boundingBox())!;
    expect(tools.x).toBeGreaterThan(identity.x+identity.width);
  }
});

for (const context of ['home', 'hero']) for (const width of [320, 768, 1440]) test(`Agent ${context} film keeps the action readable at ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:1000});
  await page.goto(context === 'home' ? '/' : '/projects/sentry-send-to-agent');
  if (context === 'home') {
    await expect(page.locator('.widget-world')).toHaveAttribute('data-ready','true');
    await page.getByRole('button',{name:'Index',exact:true}).click();
  }
  const film = page.locator(context === 'home' ? '.scatter-9 .agent-film' : '.se-hero-product .agent-film');
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveAttribute('data-playing','true');
  const seek = async(time:number) => {
    await film.evaluate((el,time)=>el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time}),time);
  };
  await seek(100);
  await expect(film).toHaveAttribute('data-shot','thinking');
  const stageOpening=(await film.boundingBox())!, windowOpening=(await film.locator('.agent-film-camera').boundingBox())!;
  expect(windowOpening.width/stageOpening.width).toBeCloseTo(.77, 2);
  expect(windowOpening.height/stageOpening.height).toBeCloseTo(.77, 2);
  expect(Math.abs(windowOpening.x+windowOpening.width/2-stageOpening.x-stageOpening.width/2)).toBeLessThan(1);
  expect(Math.abs(windowOpening.y+windowOpening.height/2-stageOpening.y-stageOpening.height/2)).toBeLessThan(1);
  const overflow=await film.locator('.agent-reference-body').evaluate(el=>el.scrollHeight-el.clientHeight);
  expect(overflow).toBeLessThanOrEqual(1);
  await seek(5000);
  await expect(film).toHaveAttribute('data-shot','overview');
  // Measure both elements in the same frame while the conversation scrolls.
  const responseLayout = await film.evaluate(el => {
    const answer = el.querySelector('.agent-investigation-copy')!.getBoundingClientRect();
    const actions = el.querySelector('.agent-reference-actions')!.getBoundingClientRect();
    return {gap: actions.top - answer.bottom, height: actions.height};
  });
  expect(responseLayout.gap).toBeGreaterThan(0);
  expect(responseLayout.gap).toBeLessThan(12);
  expect(responseLayout.height).toBeLessThan(24);
  // Navigation travels with the white window; it never independently fades away.
  for (const time of [5800, 6200, 6800, 7400]) {
    await seek(time);
    await expect(film.locator('.seer-chat-header')).toHaveCSS('opacity','1');
  }
  await seek(8500);
  await expect(film).toHaveAttribute('data-shot','choose');
  const menu=film.locator('.agent-reference-menu');
  await expect(menu).toBeVisible();
  // Wait until the menu reveal has reached its resting box.
  await expect.poll(()=>menu.evaluate(el=>Number(getComputedStyle(el).opacity))).toBe(1);
  const menuBox=(await menu.boundingBox())!, buttonRow=(await film.locator('.agent-reference-actions').boundingBox())!;
  expect(buttonRow.y-menuBox.y-menuBox.height).toBeGreaterThanOrEqual(12);
  const stage=(await film.boundingBox())!, action=(await menu.boundingBox())!;
  const closeUp=(await film.locator('.agent-film-camera').boundingBox())!;
  const closeUpHeader=(await film.locator('.seer-chat-header').boundingBox())!;
  expect(closeUpHeader.y+closeUpHeader.height).toBeLessThan(stage.y-1);
  expect(closeUp.x).toBeLessThan(stage.x);
  const closeUpRight=stage.x+stage.width-closeUp.x-closeUp.width;
  expect(closeUpRight).toBeGreaterThan(0);
  await expect.poll(async()=>{
    const frame=(await film.boundingBox())!,camera=(await film.locator('.agent-film-camera').boundingBox())!;
    const right=frame.x+frame.width-camera.x-camera.width;
    const bottom=frame.y+frame.height-camera.y-camera.height;
    return Math.abs(right-bottom);
  }).toBeLessThan(.2);
  expect(action.y).toBeGreaterThanOrEqual(stage.y);
  expect(action.y+action.height).toBeLessThanOrEqual(stage.y+stage.height);
  expect(action.x).toBeGreaterThanOrEqual(stage.x);
  expect(action.x+action.width).toBeLessThanOrEqual(stage.x+stage.width+1);
  const controls = film.locator('.agent-feedback-icons,.agent-reference-split');
  const closeUpControls = await controls.evaluateAll(els => els.map(el => {
    const box = el.getBoundingClientRect(), camera=el.closest('.agent-film-camera') as HTMLElement, frame=camera.getBoundingClientRect(), scale=frame.width/camera.offsetWidth;
    return {x:(box.x-frame.x)/scale,y:(box.y-frame.y)/scale,width:box.width/scale,height:box.height/scale};
  }));
  const expectSteadyControls = async () => {
    await expect.poll(async () => {
      const boxes = await controls.evaluateAll(els => els.map(el => {
        const box = el.getBoundingClientRect(), camera=el.closest('.agent-film-camera') as HTMLElement, frame=camera.getBoundingClientRect(), scale=frame.width/camera.offsetWidth;
        return {x:(box.x-frame.x)/scale,y:(box.y-frame.y)/scale,width:box.width/scale,height:box.height/scale};
      }));
      return Math.max(...boxes.flatMap((box, i) => [
        Math.abs(box.width - closeUpControls[i].width),
        Math.abs(box.height - closeUpControls[i].height),
        Math.abs(box.x - closeUpControls[i].x),
        Math.abs(box.y - closeUpControls[i].y),
      ]));
    }).toBeLessThan(.2);
    // Bounding boxes omit shadows: keep the full painted buttons above the clip edge.
    const paintedBounds = await controls.evaluateAll(els => els.map(el => {
      const box = el.getBoundingClientRect();
      const body = el.closest('.agent-reference-body')!.getBoundingClientRect();
      const scale = box.height / (el as HTMLElement).offsetHeight;
      return {clearance: body.bottom - box.bottom, shadowOutset: 2 * scale};
    }));
    for (const bounds of paintedBounds) {
      expect(bounds.clearance).toBeGreaterThan(bounds.shadowOutset + .5);
    }
  };
  await expect(film.locator('.agent-composer-action')).toHaveAttribute('data-state','ready');
  const originalActions = (await film.locator('.agent-reference-actions').elementHandle())!;
  await seek(9020);
  await expect(film).toHaveAttribute('data-shot','select');
  const beforeClick = await originalActions.evaluate(el => (el as HTMLElement).offsetTop);
  await seek(9040);
  await expect(film).toHaveAttribute('data-shot','sending');
  const afterClick = await originalActions.evaluate(el => ({
    connected: el.isConnected,
    top: (el as HTMLElement).offsetTop,
    opacity: getComputedStyle(el).opacity,
    visibility: getComputedStyle(el).visibility,
  }));
  expect(afterClick.connected).toBe(true);
  expect(afterClick.opacity).toBe('1');
  expect(afterClick.visibility).toBe('visible');
  expect(Math.abs(afterClick.top - beforeClick)).toBeLessThan(3);
  await seek(9680);
  await expect(film.locator('.seer-chat-header')).toHaveCSS('opacity','1');
  await expectSteadyControls();
  await expect(film.locator('.agent-composer-action')).toHaveAttribute('data-state','sending');
  await expect(film.locator('.agent-reference-toast.sending')).toHaveText('Launching coding agent...');
  await expect(film.locator('.agent-toast-spinner')).toBeVisible();
  await expect(film.locator('.agent-reference-toast.sending')).toHaveCSS('background-color','rgb(255, 255, 255)');
  await seek(11280);
  await expect(film.locator('.seer-chat-header')).toHaveCSS('opacity','1');
  await expectSteadyControls();
  await seek(13980);
  await expect(film).toHaveAttribute('data-shot','sent');
  await expectSteadyControls();
  await expect(film.locator('.agent-toast-spinner')).toHaveCount(0);
  await expect(film.locator('.agent-receipt')).toBeVisible();
  await expect(film.locator('.agent-receipt')).toContainText('Response sent to Claude Agent Session');
  await expect.poll(async()=>{
    const frame=(await film.boundingBox())!,camera=(await film.locator('.agent-film-camera').boundingBox())!;
    const right=frame.x+frame.width-camera.x-camera.width;
    const bottom=frame.y+frame.height-camera.y-camera.height;
    return Math.abs(right-bottom);
  }).toBeLessThan(.2);
  const successFrame=(await film.locator('.agent-film-camera').boundingBox())!;
  expect(successFrame.width/stage.width).toBeCloseTo(.87,2);
  expect(successFrame.height/stage.height).toBeCloseTo(.87,2);
  expect(Math.abs(successFrame.x+successFrame.width/2-stage.x-stage.width/2)).toBeLessThan(.2);
  const copy=(await film.locator('.agent-investigation-copy').boundingBox())!;
  expect(Math.abs((await film.locator('.agent-receipt').boundingBox())!.x-copy.x)).toBeLessThan(1);
  const receipt=(await film.locator('.agent-receipt').boundingBox())!;
  expect(receipt.x).toBeGreaterThanOrEqual(stage.x);
  expect(receipt.y).toBeGreaterThanOrEqual(stage.y);
  expect(receipt.x+receipt.width).toBeLessThanOrEqual(stage.x+stage.width);
  const body=film.locator('.agent-reference-body');
  expect(await body.evaluate(el=>Math.abs(el.scrollHeight-el.clientHeight-el.scrollTop))).toBeLessThanOrEqual(1);
  const bodyBox=(await body.boundingBox())!;
  for (const item of await film.locator('.agent-investigation-copy p:last-child,.agent-receipt,.agent-reference-actions').all()) {
    const box=(await item.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(bodyBox.y);
    expect(box.y+box.height).toBeLessThanOrEqual(bodyBox.y+bodyBox.height+1);
  }
  await expect(film.locator('.agent-composer-action')).toHaveAttribute('data-state','transferred');
  const field=(await film.locator('.agent-composer-field').boundingBox())!, icon=(await film.locator('.agent-composer-action').boundingBox())!;
  expect(icon.x).toBeGreaterThan(field.x+field.width);
  expect(icon.y).toBeGreaterThan(field.y);
  expect(icon.y+icon.height).toBeLessThan(field.y+field.height);
  const toast=film.locator('.agent-reference-toast.sent');
  await expect(toast).toHaveText('Successfully sent response to agent');
  await expect.poll(()=>toast.evaluate(el=>Number(getComputedStyle(el).opacity))).toBe(1);
  const result=(await toast.boundingBox())!;
  await expect(film.locator('.agent-reference-composer')).toHaveCSS('border-top-width','0px');
  await expect(film.locator('.agent-reference-composer')).toHaveCSS('background-color','rgb(255, 255, 255)');
  const checkCell=(await toast.locator('span').first().boundingBox())!;
  expect(Math.abs(checkCell.width-result.height)).toBeLessThan(2);
  expect(result.height/field.height).toBeCloseTo(34/32,1);
  expect(result.y).toBeLessThan(field.y);
  expect((result.y+result.height-field.y)/field.height).toBeCloseTo(14/32,1);
  expect(await toast.evaluate(el=>el.scrollWidth-el.clientWidth)).toBeLessThanOrEqual(1);
  await expect(toast).toHaveCSS('background-color','rgb(227, 247, 226)');
  await expect(toast).toHaveCSS('color','rgb(0, 0, 0)');
  await expect(toast.locator('span').first()).toHaveCSS('background-color','rgb(8, 242, 98)');
  expect(await film.locator('.agent-film-camera').evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
  await expect(film.locator('.agent-film-receipt')).toHaveCount(0);
  expect(result.x).toBeGreaterThanOrEqual(stage.x);
  expect(result.x+result.width).toBeLessThanOrEqual(stage.x+stage.width+1);
  const actions=(await film.locator('.agent-reference-actions').boundingBox())!;
  expect(result.y).toBeGreaterThan(actions.y+actions.height-1);
  expect(result.y).toBeLessThan(field.y+field.height);
  expect(result.y).toBeGreaterThanOrEqual(stage.y);
  expect(result.y+result.height).toBeLessThanOrEqual(stage.y+stage.height+1);
});

test('Agent ending holds success and keeps the chat visible through the loop', async ({page}) => {
  await page.clock.install();
  await page.goto('/projects/sentry-send-to-agent');
  const film=page.locator('.se-hero-product .agent-film');
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveAttribute('data-playing','true');
  const seek=async(time:number)=>{
    await film.evaluate((el,time)=>el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=time}),time);
    await page.clock.runFor(32);
  };
  for (const time of [10680, 11280, 11980]) {
    await seek(time);
    await expect(film).toHaveAttribute('data-shot','sending');
    const loading = film.locator('.agent-reference-toast.sending');
    await expect(loading).toHaveText('Launching coding agent...');
    const camera = (await film.locator('.agent-film-camera').boundingBox())!;
    const toast = (await loading.boundingBox())!;
    expect(toast.x).toBeGreaterThanOrEqual(camera.x);
    expect(toast.y).toBeGreaterThanOrEqual(camera.y);
    expect(toast.x + toast.width).toBeLessThanOrEqual(camera.x + camera.width);
    expect(toast.y + toast.height).toBeLessThanOrEqual(camera.y + camera.height);
  }
  await page.getByRole('button',{name:'Pause interaction preview'}).click();
  await page.clock.runFor(1000);
  await expect(film).toHaveAttribute('data-shot','sending');
  await expect(film.locator('.agent-toast-spinner')).toHaveCSS('animation-play-state','paused');
  await page.getByRole('button',{name:'Play interaction preview'}).click();
  for(const time of [12480,14280,15780]) {
    await seek(time);
    await expect(film).toHaveAttribute('data-shot','sent');
    await expect(film.locator('.agent-reference-toast.sent')).toBeVisible();
    await expect(film.locator('.agent-film-camera')).toHaveCSS('opacity','1');
  }
  await page.getByRole('button',{name:'Pause interaction preview'}).click();
  await page.clock.runFor(2000);
  await expect(film.locator('.agent-reference-toast.sent')).toBeVisible();
  await page.getByRole('button',{name:'Play interaction preview'}).click();
  // The white window must remain present at every point of the former fade-out.
  for (const time of [15880, 16030, 16180, 16280, 16380, 16580, 16780, 17080]) {
    await seek(time);
    await expect(film.locator('.agent-film-camera')).toHaveCSS('opacity','1');
    await expect(film.locator('.agent-film-camera')).toHaveCSS('background-color','rgb(255, 255, 255)');
    await expect(film.locator('.seer-chat-header')).toBeVisible();
    await expect(film.locator('.agent-reference-composer')).toBeVisible();
  }
  await seek(16380);
  await expect(film.locator('.agent-reference-toast')).toHaveCount(0);
  await expect(film.locator('.agent-initial-thinking')).toHaveText('Thinking...');
  for(const time of [17380,17580]) {
    await seek(time);
    await expect(film).toHaveAttribute('data-shot','thinking');
    await expect(film.locator('.agent-film-camera')).toHaveCSS('opacity','1');
    await expect(film.locator('.agent-reference-body')).toHaveCSS('opacity','1');
  }
});

test('Agent hero menu labels and pointer fit on a narrow screen', async ({page}) => {
  await page.setViewportSize({width:320,height:1000});
  await page.goto('/projects/sentry-send-to-agent');
  const film=page.locator('.se-hero-product .agent-film');
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveAttribute('data-playing','true');
  await film.evaluate(el=>el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=8500}));
  await expect(film).toHaveAttribute('data-shot','choose');
  const menu=film.locator('.agent-reference-menu');
  await expect.poll(()=>menu.evaluate(el=>Number(getComputedStyle(el).opacity))).toBe(1);
  const bounds=(await menu.boundingBox())!;
  for(const label of await menu.locator('.agent-menu-choice > span').all()) {
    const box=(await label.boundingBox())!;
    expect(box.x).toBeGreaterThan(bounds.x);
    expect(box.x+box.width).toBeLessThan(bounds.x+bounds.width);
  }
  const cursor=menu.locator('.agent-film-menu-cursor');
  await expect(film.locator('.agent-reference-split .agent-robot')).toBeVisible();
  await expect(film.locator('.agent-reference-split .agent-brand')).toHaveCount(0);
  const controlSizes=await film.locator('.agent-feedback-icons > svg,.agent-reference-split > span').evaluateAll(els=>els.map(el=>el.getBoundingClientRect().height));
  expect(Math.max(...controlSizes)-Math.min(...controlSizes)).toBeLessThan(1);
  await expect.poll(()=>cursor.evaluate(el=>Number(getComputedStyle(el).opacity))).toBe(1);
  const selected=(await menu.locator('.is-highlighted').boundingBox())!, pointer=(await cursor.boundingBox())!;
  expect(pointer.x).toBeGreaterThan(selected.x);
  expect(pointer.x).toBeLessThan(selected.x+selected.width);
  expect(pointer.y).toBeGreaterThan(selected.y);
  expect(pointer.y).toBeLessThan(selected.y+selected.height);
});
