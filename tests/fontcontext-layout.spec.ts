import { expect, test } from '@playwright/test';

for (const width of [390, 1440]) {
  test(`FontContext keeps its authored typography and padding at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/fontcontext.html', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => document.fonts.ready);

    const styles = await page.evaluate(() => {
      const read = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing ${selector}`);
        const style = getComputedStyle(element);
        return {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          paddingTop: style.paddingTop,
          paddingRight: style.paddingRight,
          maxWidth: style.maxWidth,
        };
      };
      return {
        bodyClass: document.body.className,
        sharedSheet: Boolean(document.querySelector('link[href="/case-study.css"]')),
        main: read('.main-content'),
        title: read('.project-title'),
        sectionTitle: read('.section-title'),
        sectionText: read('.section-text'),
      };
    });

    expect(styles.bodyClass).toBe('');
    expect(styles.sharedSheet).toBe(false);
    expect(styles.title.fontFamily).toContain('Instrument Sans');
    expect(styles.title.fontSize).toBe(width <= 600 ? '32px' : '48px');
    expect(styles.title.fontWeight).toBe('600');
    expect(styles.sectionTitle.fontSize).toBe('28px');
    expect(styles.sectionTitle.fontWeight).toBe('600');
    expect(styles.sectionText.fontSize).toBe('16px');
    expect(styles.sectionText.lineHeight).toBe('28px');
    expect(styles.sectionText.maxWidth).toBe('720px');
    expect(styles.main.paddingTop).toBe(width <= 600 ? '40px' : '48px');
    expect(styles.main.paddingRight).toBe(width <= 1024 ? '16px' : '32px');
  });
}
