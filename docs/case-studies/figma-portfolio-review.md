# Portfolio revision against the supplied Figma early-career guide

Reviewed and revised 24 September 2026. Scope: FontContext, Send to Agent, Message Queuing, Relative Time, and access to the selected work. This is an editorial and implementation review, not a prediction of Figma's hiring assessment.

## Source and ownership corrections

The user supplied a Design Foundations brief for a canonical relative-time treatment and detail hovercard. It establishes that TimeSince already supported relative formats, units, live updates, and timezones. The missing standard concerned presentation and richer hover information. The initial ask covered a product audit, inline treatment, detail hovercard, and Figma component. A Date/Time format reference was a stretch deliverable. A configured organization timezone was possible scope, not evidence of delivery. The expected 2–3 weeks is a planning estimate, not a verified actual project duration.

The brief initially assigned technical consolidation to a design-engineering partner. The user explicitly corrected this twice on 24 September: she ended up taking on production implementation and technical consolidation herself. The case study now states that expanded ownership. Design-engineering review does not replace or diminish her implementation ownership. Shipping Relative Time does not by itself establish completion of every app-wide tooltip migration.

Existing sources remain the two internship scripts, supplied Figma boards, and the user's later delivery corrections. FontContext's earlier writing is also present in Downloads/fontcontext-FINAL-JENNY.md. The revision preserves its reported observations while avoiding generalizing anecdotal use into adoption metrics.

## Changes by criterion

| Criterion | Implemented improvement | Remaining evidence boundary |
| --- | --- | --- |
| Craft | Added a crisp, interactive tooltip-composition explanation with readable slot annotations and 44px controls. Added comparable queue exploration sketches. Preserved 4px frames, explicit light tooltip text colors, and natural source-image proportions. | Layout sketches explain existing alternatives; they are not the original Figma boards. |
| Curation | The mobile homepage now leads with Send to Agent, FontContext, and Relative Time, matching the desktop emphasis. Added related links among the three selected studies at the end of all four stories. Preserved desktop card dimensions and positions. | Additional work remains available; no projects were deleted. |
| Process | Queue alternatives each state the relevant decision. Relative Time makes wrapper, pointer, header/body/footer composition visible, with changing content across three examples. | An original queue exploration board would add primary visual evidence when a readable source file is accessible. |
| Ownership | Made Send to Agent's authored deliverables explicit. Relative Time now states ownership from research and Figma through production implementation and consolidation, incorporating the user's correction. FontContext names implementation, AI assistance, and peer code review separately. | Do not claim sole authorship of Sentry's existing TimeSince features or of the underlying platform. |
| Clarity | Removed Send to Agent's duplicate final demo pair and shortened proposed next steps. Replaced broad FontContext slogans and unsupported generalizations with specific observations, decisions, and limits. Removed checkbox-shaped affordances from its future-feature list. | Longer working boards remain secondary evidence; readers can open the original images. |
| Grounding | Distinguished approval from shipment, qualitative use from adoption, and proposed measurements from observed results. Incorporated the original TimeSince brief accurately. | Queue release results, payload-quality results, and app-wide migration coverage are not established. Do not fabricate them to improve a rating. |
| Curiosity | Connected FontContext's learning to actual implementation constraints: font loading, request limits, selection synchronization, and code review. | No filler experiments or invented accomplishments added. |

## Verification

- First pass: 30 focused interaction/navigation/story checks passed in Chrome.
- Full responsive route pass: 105 checks passed at 320, 390, 600, 768, 1024, 1440, and 1920px.
- Visually inspected dark desktop Queue alternatives, Relative Time anatomy, FontContext takeaways, Send to Agent outcome, and the new mobile anatomy view. The mobile chart specimen was changed from shrinking its text to a keyboard-focusable, horizontally scrollable example.
- Production build passed. Four post-adjustment checks passed, including keyboard scrolling at readable text size, keyboard expansion of FontContext sections, and the selected-work order.
- FontContext expandable section controls now expose their expanded state and support Enter and Space.

The checklist guides the changes. No self-awarded hiring score is published in the portfolio.
