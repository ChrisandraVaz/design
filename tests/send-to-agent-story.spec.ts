import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`Send to Agent narrative navigation and assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/projects/sentry-send-to-agent');
    const heading = page.getByRole('heading', { name: 'Send to Agent', exact: true });
    await expect(heading).toHaveCSS('font-weight', '700');
    await expect(heading).toHaveCSS('font-family', /Helvetica Neue/);
    const nav = page.getByRole('navigation', { name: 'Case study navigation' });
    for (const name of ['Solution', 'Problem', 'Takeaways', 'Overview']) {
      await nav.getByRole('link', { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
      await expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute('aria-current', 'location');
    }
    await expect(page.getByRole('button', { name: 'Pause preview' })).toHaveCount(0);
    await expect(page.locator('.agent-story-film .agent-reference-body')).not.toHaveText('');
    await expect(page.locator('.agent-story-process')).toBeVisible();
    const images = page.locator('.agent-story-artifact img');
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    await expect(page.locator('#solution')).toContainText('With multiple agents, a robot control');
    await expect(page.locator('#zero-states')).toContainText('No Agents Configured');
  });
}

test('Solution demos use distinct entry points and confirm the correct scope', async ({ page }) => {
  await page.goto('/projects/sentry-send-to-agent#solution');
  const response = page.locator('#solution .agent-handoff-preview.is-response');
  await response.scrollIntoViewIfNeeded();
  await expect(response.locator('.agent-reference-actions .agent-reference-split')).toHaveCount(1);
  await expect(response.locator('.agent-reference-menu')).toBeVisible({timeout: 12000});
  await expect(response.locator('.agent-reference-toast')).toContainText('Successfully sent response', {timeout: 12000});
  const navigation = page.locator('#solution .agent-handoff-preview.is-navigation');
  await navigation.scrollIntoViewIfNeeded();
  await expect(navigation.locator('.seer-chat-header .agent-brand')).toHaveAttribute('src', /logo-claude/);
  await expect(navigation.locator('.agent-reference-actions .agent-reference-split')).toHaveCount(1);
  await expect(navigation.locator('.agent-reference-toast')).toContainText('Successfully sent conversation', {timeout: 12000});
  const navSize = await navigation.locator('.agent-nav-handoff .agent-reference-split').boundingBox();
  const chatSize = await navigation.locator('.agent-reference-actions .agent-reference-split').boundingBox();
  expect(navSize!.height).toBeCloseTo(chatSize!.height, 0);
  expect(navSize!.width).toBeCloseTo(chatSize!.width, 0);
  await expect(page.locator('.agent-solution-feature')).toHaveCount(2);
  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(navigation).toHaveAttribute('data-step', '5');
  await expect(page.locator('.agent-segment').first()).toHaveCSS('animation-name', 'none');
});

test('Restored preview sizing and deep links reveal process', async ({ page }) => {
  await page.setViewportSize({width: 1280, height: 720});
  await page.goto('/projects/sentry-send-to-agent');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.agent-story-process > summary')).toHaveCount(0);
  await expect(page.locator('.agent-story-cover')).toHaveCSS('height', '360px');
  await expect(page.locator('.agent-handoff-window').first()).toHaveCSS('height', '420px');
  await page.goto('/projects/sentry-send-to-agent#zero-states');
  await expect(page.locator('.agent-story-process')).toBeVisible();
  await expect(page.locator('#zero-states')).toBeInViewport();
});

for (const width of [390, 1280]) {
  test(`Hero camera remains inside its frame throughout the zoom at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('/projects/sentry-send-to-agent');
    const camera = page.locator('.agent-story-film .agent-film-camera');
    await expect.poll(() => camera.evaluate(el => el.getAnimations().length)).toBeGreaterThan(0);
    const contained = await camera.evaluate(el => {
      const animation = el.getAnimations()[0];
      animation.pause();
      const frame = el.parentElement!.getBoundingClientRect();
      return [0, 6000, 7400, 9190, 10390, 16500].every(time => {
        animation.currentTime = time;
        const box = el.getBoundingClientRect();
        return box.left >= frame.left - 1 && box.right <= frame.right + 1 && box.top >= frame.top - 1 && box.bottom <= frame.bottom + 1;
      });
    });
    expect(contained).toBe(true);
  });
}

for (const entryPoint of ['response', 'navigation']) {
  test(`Handoff feedback stays below stationary ${entryPoint} controls`, async ({page}) => {
    await page.goto('/projects/sentry-send-to-agent#solution');
    const demo = page.locator(`#solution .agent-handoff-preview.is-${entryPoint}`);
    await demo.scrollIntoViewIfNeeded();
    await expect(demo).toHaveAttribute('data-step', '13', {timeout: 15000});
    const actionY = () => demo.evaluate(el => {
      const actions = el.querySelector('.agent-reference-actions')!.getBoundingClientRect();
      return actions.top - el.getBoundingClientRect().top;
    });
    const readyY = await actionY();
    for (const step of ['4', '5']) {
      await expect(demo).toHaveAttribute('data-step', step, {timeout: 15000});
      expect(await actionY()).toBeCloseTo(readyY, 0);
      expect(await demo.evaluate(el => {
        const controls = el.querySelector('.agent-reference-actions')!.getBoundingClientRect();
        const receipt = el.querySelector('.agent-reference-receipt')!.getBoundingClientRect();
        return receipt.top >= controls.bottom;
      })).toBe(true);
    }
  });
}

for (const width of [390, 1280]) {
  test(`Cover keeps chat still and shows launching feedback at ${width}px`, async ({page}) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('/projects/sentry-send-to-agent');
    const film = page.locator('.agent-story-film .agent-film');
    await film.scrollIntoViewIfNeeded();
    await expect(film).toHaveAttribute('data-shot', 'choose', {timeout: 16000});
    expect(await film.locator('.agent-reference-body').evaluate(el => el.scrollTop)).toBe(0);
    await expect(film).toHaveAttribute('data-shot', 'sending', {timeout: 12000});
    await expect(film.locator('.agent-reference-receipt.status-sending')).toBeVisible();
    const bounds = await film.evaluate(el => {
      const body = el.querySelector('.agent-reference-body')!;
      const receipt = el.querySelector('.agent-reference-receipt')!.getBoundingClientRect();
      return {scroll: body.scrollTop, bottom: receipt.bottom, limit: body.getBoundingClientRect().bottom};
    });
    expect(bounds.scroll).toBe(0);
    expect(bounds.bottom).toBeLessThanOrEqual(bounds.limit + 1);
  });
}
