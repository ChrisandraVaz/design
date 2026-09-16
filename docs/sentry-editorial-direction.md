# Sentry case-study editorial review — September 13

## Source and purpose

Re-read the 27-page internship presentation and both supplied scripts, including the long draft's alternatives and engineering constraints. Reviewed the rendered slides and the final interaction references. Later scripts and final boards take precedence where the draft contradicts them. The author’s Roboto and final caret instructions take precedence over older Rubik/no-dropdown text.

The four pages should show an early-career designer making consequential decisions within a team. They do not need inflated ownership, company-wide strategy, or invented launch metrics. Each begins with the user problem and the author's contribution, then connects evidence to a decision and shows the resulting interaction. The delivered status is visible near the opening. Research observations and future evaluation are separate from actual outcomes.

## Reference reading

- [Emmi Wu’s Figma case](https://emmiwu.com/figma): clear brief, context, insight, problem, solution and outcome. Apply that clarity to the author’s own project; do not borrow another designer’s claims or phrasing.
- [Rachel Chen’s OpenAI case](https://www.rachelchen.tech/projects/openai), plus the supplied PokerGPT text: the useful pattern is a decision made under a constraint, illustrated with the corresponding interface. The case includes what was narrowed or deferred, not only the polished result.
- The existing Trace case remains the visual source of truth: strong headings, open two-column narrative rows, a readable text measure, and artwork grouped with its explanation.
- [Figma’s early-career portfolio guidance](https://www.figma.com/blog/breaking-in-a-guide-to-landing-your-first-product-design-role/): show reasoning, trade-offs, a complete story, thoughtful reflection, and care in presentation. It explicitly allows unshipped work and prospective measurement when outcome data is unavailable.
- [Apple’s design team overview](https://www.apple.com/careers/us/work-at-apple/teams/design.html) and [Product Designer, Commerce & Subscriptions](https://jobs.apple.com/en-us/details/200643113/product-designer-commerce-subscriptions?team=APPST): use interaction, visual craft, usability, and problem solving as review lenses. The Apple listing is not an L1-specific hiring rubric; these references do not establish that either company would approve a portfolio.

## Four distinct stories

### Message Queuing

A blocked composer interrupts an ongoing investigation. The six-tool audit presents possible interaction models; short messages support compact rows. Four concepts lead back to a visible, two-message queue. Explain the costs of editing, reordering, injection and collapse individually. The two-message cap is a design judgment, not a statistical conclusion. The specification covers full text, capacity, deletion and ordered processing. Stop/cancel remains a separate unresolved track. Outcome: final design/specification, not a measured release.

### Send to Agent

Moving tools requires a transfer of context, not just a link. Show why a reply needs the question and tool calls that produced it, and why the full-chat action is a separate scope. Configuration evidence supports direct sending with a retained caret. Explain the engineering agreement needed to confirm transfer without promising an external fix. Outcome: cross-functional approval and entry into shipping cycle.

### Split Panel

The code component already existed. The author closes the gap through Figma, documentation, reusable behavior and migration. The turning point is twelve parent variants repeating handle states; separating the primitive makes responsibility clearer. The 40-file audit and 25 instances lead to a five-tier migration path, not a claim that every instance was replaced. Outcome: Figma/docs delivered, handle reused, first migration merged.

### Relative Time

A UTC-focused tooltip creates interpretation work during debugging. Three interviews clarify relative/local/UTC needs; the inventory exposes repeated content structure across more than one hovercard. Show how shared rows accommodate different meanings and precision. Pair large native specimens with their rationale; keep the full board available for detail instead of shrinking every variant into the main reading flow. Outcome: Figma family delivered and code adoption underway.

## Presentation checks

Preserve the latest approved Canvas/Index dimensions, neutral frames, badge conventions and relative-time/Nike size match. Review all four previews as a group. In case-study heroes, reserve enough space for full chat windows and their composers. New explanatory figures inherit Trace's typography; Sentry product artwork retains Roboto. Review mobile intrinsic widths, long dates, headings, reduced motion, and keyboard interactions before delivery.
