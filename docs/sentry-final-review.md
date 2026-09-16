# Sentry portfolio review — September 13, 2026

## Delivered

Four case studies now use the actual Trace editorial layout and typography. Each covers overview, problem, context, insights, solution, and outcome, with project-specific decisions and original source material. Research observations and delivery status remain distinct from post-launch outcomes.

Canvas and Index show larger Agent, Queue, and Relative Time UI. The Relative Time card remains aligned with the Watch. Split Panel opens with the two authored code examples in a macOS terminal, then reveals the basic composition with a fine `#7554FF` active divider; the original Replay/Seer recording is included in the case study. Badge placement clears the menus, composer, and success/error feedback.

Relative Time presents eight distinct tooltip structures from the author's board. Each enters, holds, and exits without overlapping the next state; the separate live timezone demo performs real conversion. Queue's pause control freezes both the sequence and thinking dots.

## Validation

- Production build: `EVAL_BUILD_DIR=.next-final npm run build` passed.
- ESLint passed.
- Full 438-test browser run completed with 436 passing. Two test timing issues were corrected: Index spacing is now measured after entry settles, and Relative Time is observed through a real ten-state cycle instead of advancing a virtual clock before WebKit delivers visibility events.
- Targeted reruns passed in Chrome and WebKit for both corrected checks and the new Queue pause regression. The resulting suite contains 440 distinct browser checks; all are covered by the full run and successful reruns.
- Manual animation-bound checks at 1154, 1440, and 1920px found no composer clipping, menu overflow, or toast/badge overlap.
- Reviewed desktop Canvas, Index, the four case studies, phone typography, and the unchanged Trace opening.

The final one-line Latency date correction changes a fixed specimen value only; the production build and lint were rerun after it.


## September 13: wide chat covers

Message Queuing follows the supplied 1.357:1 frame. At 1440px Canvas it measures 447 × 329px; Send to Agent is 447 × 474px and includes its composer. Index retains aligned cover widths. Narrow layouts reserve enough height for two pending messages. The inner chat is anchored to the frame to avoid Safari’s percentage-height/min-height flex sizing issue.

Validation: production build and ESLint passed. The full responsive suite completed with 454 passes and two outdated badge-inset assertions, which were updated for the inset required by the restored composer. After the mobile queue and Safari corrections, all 94 affected Canvas arrangement, Index, home framing, and Sentry preview checks passed in Chrome and WebKit. The final checks include the two-message queue state, equal chat widths, visible composers, filled frames, theme changes, drag/reset, and mobile overflow. Home and Trace screenshots were visually reviewed.


## September 13: Relative Time cover proportions

Relative Time now matches Nike Running in Canvas, Index, and responsive layouts. Desktop Canvas uses the same 352 × 410 base surface and scale, with the Watch bottom alignment preserved. Watch shifts right to maintain a 20px gap, and News/Shader move below it. The tooltip specimens and animation are unchanged.

Validation: production build and ESLint passed. All 126 affected layout, framing, drawing, Index, and Sentry preview checks passed in Chrome and WebKit against the final build. The broader first-build run passed 453 of 456 checks: two footer-spacing failures were corrected and passed in the final run; an unrelated WebKit queue timing failure passed on isolated rerun. Reviewed desktop Home, the live narrow Relative Time card, and the unchanged Trace opening.

## September 13: four case-study narrative revisions

Re-read the 27-page presentation, both internship scripts, the supplied Rachel Chen OpenAI/PokerGPT case text, Emmi Wu's Figma case and the existing Trace editorial layout. The new `sentry-editorial-direction.md` records the story decisions and source boundaries. All four pages now make the author's scope, evidence, alternatives, implementation constraints and delivered status explicit. Queue includes readable concept comparisons and the cancellation boundary; Agent explains payload and feedback decisions; Split Panel shows the handle/layout separation and tiered adoption plan; Relative Time shows three readable component compositions with the full source board available on demand.

The case-study Agent and Queue heroes have larger type and full composers at page scale. Existing Canvas and Index cover geometry is preserved, including the Nike-sized Relative Time surface. Visually reviewed desktop/phone openings, the new supporting figures, Home/Index and the unchanged Trace opening. The visible user tab could not be refreshed because macOS was locked; the final production server is running on port 3005.

Validation: production build and ESLint passed. The broad responsive run completed with 490/494 passing; four WebKit timing/navigation failures were investigated. The hero-polish run completed with 130/134 passing, with a queue timer fixture race and overlapping WebKit timing failures. The queue fixture now freezes setup time and advances in small steps so React can commit each generation effect. All 30 final targeted browser checks passed on the delivery build, covering the failed paths, native tooltip bounds, full composers, and animation/reduced-motion behavior. No application queue or animation behavior was changed to accommodate the tests.

The final 18-check pass verified all four six-topic layouts at 390px and 1440px in both browsers, plus the corrected Queue fixture.
