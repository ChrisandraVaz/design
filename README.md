# Chrisandra Vaz — Portfolio

A Next.js portfolio with Canvas and Index views, interactive project previews, and case studies.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev -- --port 3005
```

Open http://127.0.0.1:3005.

## Production build

```sh
npm run build
npm run start
```

## Checks

```sh
npm run lint
npx playwright install chromium webkit
npm run test:responsive
```

The Chrome tests use the installed Google Chrome channel. The responsive suite builds an isolated production copy and starts it on port 3010.

## Project content

- `src/components/sentry`: four Sentry previews and case-study presentation.
- `src/components/sentry/SentryCaseStudy.tsx`: the four editorial case studies, using Trace’s layout and typography.
- `src/lib/sentry`: project metadata and source-supported status.
- `public/assets/sentry`: original boards, screenshots, and motion assets.
- `docs/sentry-source-audit.md`: internship evidence and claim boundaries.
- `docs/sentry-preview-spec.md`: tooltip, typography, spacing, and motion specification.

All assets required by the portfolio are included. Build output, dependencies, local caches, and environment secrets are excluded from the private repository. No environment variables are required to preview the portfolio.
