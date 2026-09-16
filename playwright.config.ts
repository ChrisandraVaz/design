import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', timeout: 60000, expect:{timeout:15000}, fullyParallel: true, workers: 2,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: process.env.EVAL_URL || 'http://127.0.0.1:3010', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [{name:'chrome',use:{channel:'chrome'}},{name:'webkit',use:{browserName:'webkit'}}],
  webServer: process.env.EVAL_URL ? undefined : { command: 'npm run build:eval && npm run start:eval', url: 'http://127.0.0.1:3010', reuseExistingServer: false, timeout: 180000 },
});
