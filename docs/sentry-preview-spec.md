# Sentry preview and editorial specification

## Source of truth

The September 12 screenshots and original 11.66-second recording are preserved in `public/assets/sentry`. The first three attachments were static PNGs. `split-panel-motion.mp4` is the browser-compatible export of the later MOV. Original product material appears in the relevant case study and opens at full resolution.

## Relative Time

- Rubik, 11.5px reference text at a 225px specimen width; 600-weight contextual headers above the divider.
- White surface, 4px reference corners, faint shadow and centered pointer. No glass or heavy border.
- Reference header padding: 7px vertically, 11px horizontally. Body: 9px top, 11px sides, 10px bottom; 5px row gap and 6px column gap.
- Local zone uses `#7951ff` on `#efebff`; UTC is neutral. Dates and tabular clock values occupy consistent columns.
- Typography and padding scale together. The specimen uses almost the full available cover width rather than a small fixed-size tooltip.
- Eight structurally distinct examples: First Seen, Events, timestamp precision, Latency, event timing, person attribution, performance scores, and percentiles. Near-duplicate labels and repeated count treatments stay out of the animated cover.
- Each state enters for 460ms, holds clearly, and exits for 260ms before the next appears. The layers never overlap, and the background remains stationary.
- The live case-study example calculates two timezone readings from the same real instant and uses the same surface, pointer, row hierarchy, and type treatment.
- Offscreen, hidden-document, pause, and reduced-motion states stop the sequence.

## Split Panel

- The cover opens on a macOS-style terminal: a gray title bar, red/yellow/green controls, a dark code surface, and the two authored SplitPanel examples. It then reveals the Sized pane / Fill pane composition.
- White panel, 4px corners, 2.5:1 aspect ratio, fine neutral divider. Hovering or dragging uses the Sentry accent `#7554FF`; direct dragging tracks the pointer without interpolation.
- Six 2.2-second scenes: two terminal examples, then panel positions at 40%, 62%, 30%, and 40%. Scripted column changes interpolate over 1.35 seconds.
- The original Replay / Seer recording appears in the case study, followed by the handle's states, Scraps documentation, and an interactive component.
- Live behavior retains a 44px hit target, arrow keys, Shift increments, Home/End bounds, double-click reset, pointer capture and vertical orientation.

## Home and Index

- Existing portfolio frames, labels and neutral bottom-left pills remain shared.
- Message Queuing has no internship pill, as requested.
- Agent and Queue use matching Seer Agent / Beta headers. Their Canvas UI is counter-scaled with a transform so internal type remains readable.
- The larger Canvas Agent and Queue cards grow upward from their established lower edges. Relative Time stays aligned with the Watch's bottom edge.
- In the compact Canvas Agent cover, the destination button and portfolio badge share the bottom row. Success/error feedback sits above them; redundant receipts and decorative feedback icons are omitted there. The complete interaction remains available in the case study.
- No cover play button or extra caption bar. Case-study hero motion has an accessible pause control, hidden when reduced motion is enabled.

## Case studies

All four use the actual Trace editorial styles: title, full-width product visual, metadata, and open two-column narrative sections. Bold headings and regular body copy share Trace's scale and reading axis. Each story covers Overview, Problem, Context, Insights, Solution and Outcome in an order appropriate to the project; there is no competing sticky chapter template.

The queue story explains the six-tool audit, observed message behavior, four directions and two-message FIFO decision. Agent explains payload scope, configuration and handoff feedback. Split Panel distinguishes the pre-existing code component from Chrisandra's Figma, documentation, handle and migration work. Relative Time connects the initial hovercard brief to the wider tooltip audit and shared slots.

Outcome language follows the internship source audit. Research observations are not presented as measured post-launch gains. Designs in progress are not described as shipped.
