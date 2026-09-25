// Loads every route at desktop and phone widths in Chrome and reports console errors, failed requests, and horizontal overflow.
// Usage: node scripts/console-sweep.mjs http://127.0.0.1:3010   (serve a production build first with npm run build:eval && npm run start:eval)
import { chromium } from '@playwright/test';
const base = process.argv[2] || 'http://127.0.0.1:3004';
const routes = ['/', '/about', '/projects/sentry-send-to-agent', '/projects/sentry-split-panel', '/projects/sentry-message-queuing', '/projects/sentry-relative-time', '/projects/trace', '/projects/td-bank-interest-claims', '/projects/td-design-system', '/projects/figbuild', '/projects/figma-keychain', '/projects/figma-sticker', '/fontcontext.html', '/serano.html', '/projects/ibm-accelerate', '/projects/agent-interface', '/projects/serano-cafe'];
const b = await chromium.launch({ channel: 'chrome' }); let total = 0;
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  for (const r of routes) {
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push('pageerror: ' + String(e).slice(0, 160)));
    p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text().slice(0, 160)); });
    p.on('response', res => { if (res.status() >= 400) errs.push(res.status() + ' ' + res.url().replace(base, '')); });
    try { await p.goto(base + r, { waitUntil: 'networkidle', timeout: 45000 }); await p.waitForTimeout(1500);
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1); if (overflow) errs.push('horizontal overflow');
    } catch (e) { errs.push('nav: ' + String(e).slice(0, 120)); }
    if (errs.length) { total += errs.length; console.log(`\n## ${w}px ${r}`); for (const e of [...new Set(errs)]) console.log('  ' + e); }
    await p.close();
  }
  await ctx.close();
}
await b.close(); console.log(`\nTOTAL issues: ${total}`);
