# Case-study visual and usability review

September 24, 2026. Review limited to a maximum of 20 minutes per case study.

## Shared presentation

- Helvetica Neue editorial typography: 48px desktop title, 36px section headings, 24px subheadings, 16px reading copy, and 14px card copy. Headings reduce on narrow screens.
- Restored uppercase IBM Plex Mono chapter and metadata labels; kept readable neutral gray in both themes.
- Neutral bordered cards with 24px padding; two columns for substantial explanations and three for short parallel ideas where appropriate.
- Upright inset statements, open takeaway lists, and claim-plus-explanation impact rows.
- Orange and violet editorial accents. Original product artwork and interface colors remain authored.

## Case-specific findings and changes

| Case | Review outcome |
| --- | --- |
| Send to Agent | Chapter labels now match the shared system. Neon-purple accents, yellow research notes, an unboxed research finding, and open takeaways support the narrative. Removed redundant related-work cards. |
| Relative Time | Shared metadata and chapter styling, violet accents, readable specimen text and captions. Native tooltip typography stays separate from editorial typography. Detail decisions use distinct alignment, hierarchy, and precision diagrams. |
| Message Queuing | Shared hierarchy and neutral concept cards. Long concept explanations use two columns on desktop and one on mobile. Interactive queue states and the two-message limit remain functional. |
| Split Panel | Added matching top and chapter navigation. Tightened framing around the shared layout/interaction contract, migration, and takeaways. Hero uses a white background; specimens stay light in both themes, with distinct rest, hover, focus, and active treatments. |
| Apple Watch / Trace | Fixed dark text on black in the color exploration. Unified page, gutter, and navigation backgrounds. Preserved dark text inside fixed light artwork. |
| FontContext | Shared heading and metadata system, orange editorial accents, and a corner-accent feasibility-question card. |
| IBM Accelerate | Fixed dark-mode top navigation and reduced oversized metadata labels. Applied the shared inset statement treatment. |
| TD Design System | Fixed navigation contrast and metadata size. Editorial notices and statements use violet accents; TD artwork stays green. |
| TD Interest Claims | Shared heading, metadata, navigation contrast, and editorial treatments. |
| Serano | Shared type and readable navigation; standalone case also uses the shared stylesheet. |
| Figbuild | Shared editorial type and metadata; responsive navigation checked. |
| Agent Interface | Improved reading-copy contrast and themed page framing while retaining prototype styling. |

## Verification scope

Browser checks cover chapter navigation, home links, theme switching, queue interaction, tooltip navigation, responsive fit, and targeted text contrast. Automated fit checks cover 320, 390, 600, 768, 1024, 1440, and 1920 pixels. Visual inspection includes the homepage and Trace, plus representative case-study openings, cards, and callouts.

This is interface QA, not a participant usability study or a comprehensive accessibility certification. The reference site's custom KK Sans is not installed; Helvetica Neue is used locally.

Latest verification: the full responsive and interaction run passed 128 checks before the subsequent targeted specimen/callout refinements. Production build also passed after the component refinements.
Targeted follow-up: 21 checks passed, including fixed-light SplitPanel specimens in both themes, distinct state treatments, yellow research-note contrast, narrow-screen findings and callouts, chapter navigation, queue states, and tooltip variants.

Follow-up: removed the oversized 97% card, its divider, and slogan heading. The statistic now appears as a factual sentence in the reading flow, followed by the specific interaction decision.
