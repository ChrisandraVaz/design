import { test, expect } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`Trace theme covers the article and outer gutters at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/projects/trace');
    const toggle = page.getByRole('navigation', { name: 'Portfolio navigation' }).getByRole('button');
    for (const theme of ['dark', 'light', 'dark']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) await toggle.click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const bg = theme === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
      for (const selector of ['.case-design', '.trace-has-navigation', '.trace-case-top']) {
        await expect(page.locator(selector)).toHaveCSS('background-color', bg);
      }
      await expect(page.locator('.trace-header h1')).toHaveCSS('color', theme === 'dark' ? 'rgb(244, 246, 248)' : 'rgb(29, 29, 31)');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `/tmp/trace-theme-${width}-${theme}.png` });
    }
  });
}
