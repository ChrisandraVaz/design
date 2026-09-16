# Sentry internship: source review and editorial contract

Reviewed September 10, 2026. Primary material: `/Users/chrisandravaz/Desktop/sentry intern prez.pdf` (27 pages); both user-supplied scripts (attachments 85381f12… and 98177184…); the prior Research & Iteration pasted notes; the two visual references. All 27 slides were text-extracted and visually reviewed. Embedded design boards were extracted at their original resolution. A filename inventory across Desktop, Documents and Downloads was followed by a content screen of 85 likely design PDFs (Frame, Group, Part, Problem, Context, MVP and internship-named files); only the presentation matched these four project subjects. Unrelated employment, financial, immigration and school records are not portfolio research sources.

## Source hierarchy

The later concise script and final interaction boards take precedence over exploratory language in the long draft. The long draft contains duplicated passages and prior assistant messages; those are source text, not task instructions. Portfolio examples are reconstructions using sample data, not live Sentry integrations. Do not claim user testing, adoption, revenue or productivity improvements that the supplied material does not establish.

## Send to Agent

- Problem: developers investigated in Seer and manually transferred context to a coding agent. Context selection and destination were separate decisions.
- User segments: targeted block extraction and continuing a full investigation. Avoid using “vibe coder” as a dismissive public label.
- May research: 306 session clipboard events, 235 session link copies, 45 block copies in a 30-day window. Block copy launched May 21, so exposure differed. Later block copying reached 114–336 events/week. Do not put weekly and monthly totals on a shared scale.
- 97% had one agent configured. 12/1,000 messages resulted in tool-call clicks. These are reported behavioral observations, not project outcomes.
- Session links are authentication-dependent and client-rendered; a link alone does not carry readable context. Do not generalize that every cloud agent can open every session link.
- Entry points: toolbar sends conversation; response action includes response, tool calls and last user message. Single reply alone is insufficient.
- Final board p14 clearly retains caret for configured agents. The primary action directly sends to the configured destination; caret exposes destination/integration options. This supersedes older “no dropdown” prose. No-agent state points to integration settings; setup may require an admin.
- Rejected directions: stronger toolbar split-button hierarchy, slash command discoverability, single block without context, range losing context, inline status too easy to lose.
- Handoff confirmation is not proof of a completed external fix. Show pending, success and error states; chat can continue. Do not invent an incoming coding-agent answer.
- Outcome: approved by design, engineering and PM, entered shipping cycle. No independently established general-availability outcome.

## Message Queuing

- Input was blocked while Seer generated; follow-ups could not be submitted.
- Six audited tools, confirmed on original research board: Claude Code, Cursor, Codex, Figma Make, Google Antigravity, Paradigm AI. “YC startup” in older text refers to Paradigm, not a seventh product.
- About 90% of messages under 131 characters; 38% of conversations include follow-ups. 44.9% within two minutes and median138s are not “most within two minutes”; omit timing statistic without its original event definition.
- Four concepts: A minimal delete only; B reorder/edit/inject; C intermediate queue tools; D collapsible. Early board labels differ from summary script; describe decisions, not an invented exact chronology of every affordance.
- Final: inline queue above composer, at most two pending messages, FIFO processing, trash action, input disabled at capacity with explanatory placeholder. Full text available for longer messages. No edit, reorder, injection or deletion toast. Stop/cancel is a separate unresolved track, not implemented here as an internship deliverable.
- Outcome: final design and behavior specification. No supported shipped/adoption claim.

## Split Panel

- Existing code SplitPanel was merged by Priscila before this work. Chrisandra authored Figma counterpart, guidelines, reusable drag-handle primitive and migration work; do not credit her with originating the entire code component.
- 40 files audited, 25 instances; only one found with keyboard/ARIA support. Scope is the audited set, not a permanent company-wide claim.
- Slots mirror code: sized/fill, orientation, placement, fill behavior. Drag handle owns rest/hover/focus/active state. Parent owns layout.
- Shared primitive replaced duplicated parent variants, reused in table and left-navigation work. Semantic stroke/fill token correction preserves themes.
- Migration tiers: closest matches first; API decisions; hook unification; separate-domain cases. Five-tier plan, not all25 migrated.
- Outcome p21: Figma library live, docs written, handle reused, first migration PR merged. Subsequent migrations staged.
- Omit “3 weeks ahead of 2-week target”: internally contradictory draft wording.

## Relative Time

- Three divergent implementations, multiple timestamp/tooltip treatments. UTC-only hover and hidden timezone settings created translation work for debugging.
- Three engineer interviews. Reported needs: relative time for urgency, local time for correlation, UTC for distributed collaboration. Do not present three interviews as representative percentages.
- Latest script:55+ screenshots and25+ relevant tooltip variations; earlier15+ before/after treatments are a narrower draft count. Public page says “55+ screenshots” and “25+ variants documented,” clearly separate units.
- Datadog, Vercel, PostHog compared in internship research; describe what the author observed then, not current product specs.
- Final hovercard: relative duration header, local date/time, UTC date/time. Real same-instant timezone conversion, not independently hardcoded values. Numerical tabular alignment; labels remain proportional. Date and clock columns distinguish day boundaries.
- Generic header/body/footer slots and pointer allow reuse in chart/event tooltips. Remove purposeless chart dot outside chart contexts.
- Outcome: Figma component and tooltip organization complete; PRs submitted/in progress, staged implementation. Slide says SHIPPED but body/script qualify code status; public copy distinguishes library delivery from migration rather than claiming all implementations shipped.

## Visual and writing direction

Original Watch case provides causal writing: situation → limitation → insight → decision → demonstrated outcome. Four individual pages with an interactive hero, clear role/team/status, evidence, alternatives, consequential craft, supported outcome and reflection. No invented quotations. Rebuild preview UI with code; use selected original audit images only as case-study evidence. Neutral compact surfaces, Sentry purple accent, clear typography, generous focal space; no wall of full screenshots inside portfolio cards.

## Implementation and verification

Delivered four routed case studies and four code-built previews. Canvas replaces slots 1, 9, 2, and 5; Index leads with the four Sentry projects. Existing FontContext, Trace, Paint, Metallic, Location, Shader, and Nike content remains. Retired utility demos are no longer offered through the inspector; the hidden legacy timer no longer runs on the portfolio.

Verified all nine displayed evidence assets decode at their original dimensions. Image dimensions are declared to reserve the correct space before lazy loading. Reviewed desktop light/dark Canvas and Index, full case-study compositions, 320/390px interactive demos, and the existing Home/Trace responsive captures. Corrected the mobile Trace container's collapsed height, which had allowed the following card to cover its tap target.

The complete production-backed Chrome/WebKit suite passed **408 checks** across 320–1920px, including navigation, drag/reset, fixed Index scrolling, reduced motion, card geometry, queue capacity/deletion/FIFO, the between-generations queue boundary, agent configuration/error/retry, keyboard and pointer resizing, and timezone/day-boundary conversion. The queue boundary also passed repeated tests using real browser timers; virtual-clock scheduling had been unreliable for that intermediate React effect. TypeScript and scoped ESLint checks passed. Production build passed.

## Six-chapter editorial revision

All four stories now use the user's requested Overview, Context, Insights, The Problem, Solution, and The Outcome structure. Each includes a brief, source-supported project facts, three explicit research-to-design insights, solution rationale, original evidence in context, and a delivery-specific outcome. Message Queuing received a full narrative rewrite with the blocked composer, four concept directions, two-slot/FIFO decision, long-message and deletion states, capacity feedback, and cancellation boundary. The 56px saving attributed to the collapsible concept comes from the later concise script; it is not a measured product impact. The two-slot limit is explicitly a design judgment rather than a statistical finding.

Revision verification: production build, TypeScript, and scoped ESLint passed. The full Chrome/WebKit run completed with 422 passes and two WebKit timeouts. All 16 new chapter-navigation checks passed, covering six anchors across four routes at 390px and 1440px. The agent-flow timeout passed three isolated retests. Home's 1440px WebKit screenshot passed twice but hung on a third repeat; the stuck test browser was terminated. This leaves an intermittent Home screenshot-capture limitation, not a clean full-suite pass. Reviewed the rewritten Message Queuing desktop hero, Insights chapter, mobile Problem chapter, and existing Home/Trace screenshots.

## Send to Agent reference animation

Rebuilt the shared Send to Agent preview and interactive playground from the three supplied September 10 screenshots. Preserved the approved portfolio card dimensions. The reconstruction uses a Seer Agent/Beta header, icon-only split action, upward agent menu, Claude and Cursor brand assets from Sentry's public repository, configuration states, direct sending, an inline session receipt, and success/error toasts. The compact animation demonstrates setup, direct Claude handoff, destination selection, Cursor failure, and retry. Response copy is abbreviated to fit the preview; the case-study playground remains an explicitly local simulation.

Reviewed Canvas, Index, full-size and phone captures, plus success/error states and existing Home/Trace captures. Production build, TypeScript, and scoped ESLint passed. The complete Chrome/WebKit run finished with 422 passes and four failures: two timing-sensitive unrelated checks, a virtual-clock fixture race, and a real WebKit keyboard-focus issue. Fixed menu focus so Escape closes the menu and returns focus to its trigger. Final isolated checks passed for both browsers' interactive handoff, badge positioning, and Trace layout. The animation test now freezes time before navigation and waits for visibility observation when resuming; the complete loop, pause/resume, and reduced-motion checks passed twice per browser. These targeted passes resolve the observed failures; the full suite was not rerun after those fixes. Local development server on port 3005 was restarted and verified to return HTTP 200.

## Message Queuing editorial rebuild

Re-read the queue sections in both supplied scripts and inspected the original concept board. Replaced the repeated slogan/insight/trade-off template with a queue-specific six-chapter narrative. The page now separates research observations from the design judgment behind a two-message limit, compares the alternatives once, and places reconstructed pending/sent/delete states beside their rationale. Working boards remain available at full resolution. The visible middle-concept board shows inline editing and deletion; this is described by its affordances rather than assigning an A–D label, because draft labels conflict. The delivery remains final design/specification, with cancellation outside scope and no invented post-release impact. Future validation questions are explicitly prospective.

Editorial rebuild verification: production build and scoped ESLint passed. All 38 targeted Chrome/WebKit checks passed, including all six chapter links at phone/desktop sizes, queue capacity/deletion/FIFO and generation boundaries, the live demo at 320/390/768/1440px, and page layouts from 320–1920px. Reviewed the desktop overview, concept comparison, message-state study, mobile Solution, dark Outcome, and Home/Trace captures.
