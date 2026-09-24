# Three case-study proofreading and coverage review

Reviewed September 24, 2026 against the two supplied presentation scripts, current authored case-study components, and the user's later written corrections and attached Figma boards. This checks source fidelity and storytelling coverage, not the underlying analytics or release systems.

## Send to Agent

| Storytelling fact | Current coverage |
| --- | --- |
| Seer investigates telemetry; implementation continues in a coding agent | Overview and problem |
| Clipboard, session-link and isolated-block workarounds | Problem and research |
| Expert developer / targeted finding and whole-investigation use cases | Segments and solution |
| May: 306 clipboard events, 235 link copies; block copy launched May 21 with 45 events | Research, with exposure periods distinguished |
| June–August: 114–336 weekly block copies | Evidence and charts |
| 97% had one agent configured | Direct-send decision and takeaway |
| 12 of 1,000 messages led to tool-call clicks | Evidence, with visible detail distinguished from payload needs |
| Auth-gated, client-rendered links require access the destination may lack | Problem and payload rationale |
| Response payload includes last user message, answer, related tool calls and output | Payload section |
| Full conversation for continuing the investigation; tradeoff against targeted scope | Payload section and entry points |
| Range/selection and prompt alternatives; split-button critique; three slash-command structures | Exploration and commands sections |
| Reuse of Autofix robot; zero, one and multiple agents; integration setup | Interaction patterns |
| Fire-and-forget vs polling, conflicting engineering guidance and written decision | Collaboration section |
| Hidden action message must not appear as a user bubble | Feedback section |
| Launching, success, error and session-link feedback | Final feedback and demos |
| Design, engineering and PM approval; entered shipping cycle | Outcome |

No material source-backed story gap found. Cloud/local extensions and payload evaluation are explicitly prospective. The scripts do not supply a token budget, truncation policy, measured transfer-quality result or completed-fix rate. Do not imply those were delivered or measured.

## Message Queuing

| Storytelling fact | Current coverage |
| --- | --- |
| Disabled composer during generation interrupts the developer's next question | Overview and problem |
| Six named tools audited and controls compared | Reference study |
| 38% of conversations included follow-ups; 90% of messages under 131 characters | Research |
| Short-message evidence informed delete-only versus editing | Strengthened in this review |
| A–D explored in wireframes and critique | Four horizontal concept cards |
| A minimal; B full controls; C inline edit/delete; D collapsing | Corrected to latest Figma notes rather than older script shorthand |
| Approximately 56px saved by collapsing | Concept D |
| Queue is short-lived; developer may switch tabs | Critique rationale restored in this review, presented as design reasoning |
| Final two-message inline queue, delete only | Solution and Concept E explanation |
| Trash vs dismiss, no deletion toast, long-text access, disabled composer at capacity | Interaction details |
| Ordered release from pending to sent and input re-enabling | Engineering handoff and eight-state walkthrough |
| Stop/cancel has separate frontend/backend scope | Interaction boundaries |
| Final Figma specification, no verified post-release result | Outcome |

Open source question: the later script reports 44.9% arriving within two minutes and median 138 seconds. It does not define the population, interval start/end, or time window sufficiently to publish those as a clear analytic claim. They remain omitted pending clarification. The 38% and 90% figures remain, and are not described as proof of an optimal queue size.

The earlier script calls the final result a return to A and describes C as reorder/delete. The supplied Figma notes describe C as edit/delete without reordering, and the combined final board is labeled E. The case study now follows those more specific boards and explains the relationship to A.

The original queue-board image files remain inaccessible at their macOS temporary paths. The concept content, comparison rationale and interaction states have been rebuilt, but the original boards have not been embedded. This is a visual-evidence gap, not a missing textual decision.

## Relative Time

| Storytelling fact | Current coverage |
| --- | --- |
| Three relative-time implementations, competing duration components and utilities | Problem, using latest user-supplied specifics |
| Six surfaces plus a bucketed-chart range case | Problem; range composition now explicit in component design |
| UTC default, hidden local setting, DST and mental conversion | Problem and interviews |
| Requested by product and frontend engineers for over a year | Problem |
| Three engineer interviews | Research, kept qualitative |
| Datadog browser-zone detection, Vercel relative/local/UTC hierarchy, PostHog discoverability | Reference study, clarified in this review |
| 55+ screenshots, 25+ variations, frequency mapping, 15+ before/after treatments | Research and component design |
| Product Design Crit and engineering collaboration | Component design |
| Broadening from a hovercard into generic tooltip primitives | Overview, audit, component design and takeaway |
| Wrapper, pointer, header/body/footer as interchangeable slots | Strengthened in this review |
| Multi-series, locale formatting and edge-case playground | Component design and Figma boards |
| Rubik tabular numbers on numeric values only; labels retain normal spacing | Craft |
| Label/value hierarchy, latency priority, chart-only series dots | Craft |
| Date/time separation, day boundaries, local time alongside UTC | Solution and craft |
| Precision from minutes to nanoseconds, dependent on context/data | Problem and craft |
| Library organized under Overlays; two or three initial targets; staged deprecation | Handoff, clarified in this review |
| Shipped at internship end | Overview and outcome, following explicit user correction |

The older scripts describe PRs in progress. The user's later confirmation that Relative Time shipped takes precedence. Shipping this component does not establish that every existing tooltip was migrated. Adoption and task-performance measures remain future evaluation, not claimed results.

## Proofreading changes

- Removed an unsupported assertion that Message Queuing had no existing infrastructure; the scripts establish the interaction gap, not that technical conclusion.
- Replaced the unverified claim that queue work ended at specification with a statement of the known deliverable and unconfirmed release outcome.
- Linked short-message evidence to the edit/delete decision without claiming causal proof.
- Removed repeated 56px reasoning from the queue wrap-up and restored the short-lived-state critique.
- Clarified visible tool-call engagement versus evidence included in a payload.
- Made browser timezone detection, reusable slots, time ranges and staged deprecation explicit.
- Preserved all later user corrections, including the single-agent caret and compact Send to Agent feedback.

The important problem, research, alternatives, decisions, collaboration and outcome facts are covered after this pass. The unresolved timing definition and missing original queue boards are the remaining limitations; neither is silently treated as complete.

## Later ownership clarification and portfolio revision

On 24 September, the user supplied the original Relative Time brief and clarified that she ultimately took on the production implementation and technical consolidation herself, despite the initial split of responsibilities in that brief. Current case-study copy reflects this expanded role. See `figma-portfolio-review.md` for the checklist-driven revision, including scope boundaries for organization timezones, format documentation, and staged migration.
