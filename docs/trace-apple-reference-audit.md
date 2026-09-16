# Trace: 100-point audit of the four supplied Apple reference sheets

This is one detailed desk review with 100 distinct checks. It is not 100 user studies, 100 independent reviewers, or an Apple endorsement. The screenshots show visual design; they do not prove runtime behavior, native measurements, accessibility, or technical feasibility.

## Reference key

- **R1:** Circular Complications, 16 examples in the supplied crop.
- **R2:** App screens, 20 examples.
- **R3:** Larger app-screen details, 11 examples.
- **R4:** Smart Stack, 26 examples.

## Most consequential findings

1. **A circular family does not require three gauges.** Battery is a proportion; a person can sit in a quiet tile. The next location state now keeps the circle without an empty progress arc.
2. **The label completes the reading.** Proposed faces now say Watch battery, Connection, and Last shared. Failure changes the event label to Last attempt.
3. **Status needs words.** Offline and Not sent are explicit. Unknown remains a required missing-data state for native work; the five-moment ending focuses on change, failure, and recovery.
4. **The original design remains evidence.** Original green and spectrum explorations are preserved rather than silently rewritten.
5. **Density is surface-specific.** A full Watch app, a circular complication, and a rectangular Smart Stack card need different compositions. The references do not establish a universal padding value.

**Status key:** Applied = changed in the proposed web state study; Retain = existing choice preserved; Open = requires native design, engineering, or research; Browser check = implementation behavior to verify in the evaluation suite.

## 1. Circular anatomy

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 1 | R1 · Battery | The number sits inside a partially filled ring. Its fill and value describe the same bounded quantity. | Keep a percentage-driven arc in the next battery direction; preserve the original runtime drawing as exploration. | Applied |
| 2 | R1 · Find People | The person symbol occupies a circular tile without a progress ring. A circular container does not require a quantitative arc. | Use a quiet circular tile for the proposed location timestamp instead of an empty progress track. | Applied |
| 3 | R1 · Activity | Three concentric rings represent three related goals, with a distinct color for each. | Do not borrow multiple rings merely to make Trace feel like Apple; each additional ring needs another quantity. | Retain |
| 4 | R1 · Alarm | Time is the content; the circle is only its background. The small AM suffix clarifies interpretation. | Treat location age as time content. Keep ago visible rather than letting the circle imply duration remaining. | Applied |
| 5 | R1 · Audiobooks | The book identifies the subject while the amber arc can convey progress. Identity and quantity have separate jobs. | Keep the battery face quantitative; do not make a person checkmark stand in for delivery evidence. | Open |
| 6 | R1 · Compass | Dense ticks belong to an angular scale, supported by a degree value and direction. | Trace signal segments need a real strength scale. A compass-like dial is not justification for inventing precision. | Open |
| 7 | R1 · Contacts | A full-color portrait fits a circle without additional chrome. Its identity carries the content. | Preserve the recognizable person in the original; any recipient-specific portrait would need privacy review. | Retain |
| 8 | R1 · Calendar | Date identity and time share the circle with clear size differences. | Do not add battery percentage, estimated time, label, and multiple status symbols at equal emphasis. | Applied |
| 9 | R1 · Camera Remote | One recognizable symbol has generous dark surround. It does not fill the tile to its edge. | Protect internal clearance around the person and signal symbols; avoid scaling icons until they touch arcs. | Retain |
| 10 | R1 · Find Devices / Items / People | Each tile shares a format, while its glyph differentiates the job. | The three Trace faces can share geometry while using different visual encodings. Consistency does not require identical rings. | Applied |

## 2. Typographic hierarchy

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 11 | R2 · Heart Rate | 73 is dominant; BPM is a small adjacent unit, with older data below. | Make the reading primary. Put the device label outside the proposed battery face so it cannot be confused with a second reading. | Applied |
| 12 | R3 · Noise | 50 is substantially larger than dB. OK has its own status line. | Separate numeric value, unit, and qualitative state; do not expect color alone to distinguish them. | Applied |
| 13 | R3 · Weather | 65° leads, Sunny follows, and high/low sit together. The reading order is visible without borders. | Use a stable value-first reading order in Trace. Avoid repeated headings within each face. | Retain |
| 14 | R3 · Stocks | Company name, value, and change are separate levels. The current value remains the main number. | 65 and 22 should not compete as equally trustworthy battery facts. Keep percentage as the proposed primary quantity. | Applied |
| 15 | R4 · Stopwatch | Elapsed time uses most of the widget width. Its title remains small and above. | A single-value widget can use a larger number than a three-value widget. Do not transfer its typography literally. | Retain |
| 16 | R4 · Calendar | Time range, event name, and location form three short lines. Color highlights the first line, not all text. | Give location context a concise label instead of increasing the saturation of every element. | Applied |
| 17 | R4 · Heart Rate | A numeric value and a relative timestamp share one line but differ in color. | A timestamp needs an event definition. Last shared and Last attempt should not be interchangeable labels. | Applied |
| 18 | R1 · Blue uppercase catalog labels | The blue tracked labels appear outside the complications in the reference sheet. They are documentation labels. | Do not import the catalog typography into the tiny widget as product UI. | Retain |
| 19 | R3 · News | The headline carries multiple lines because reading is the primary activity on this surface. | Long explanation belongs in the case study or detail screen, not the glance. | Retain |
| 20 | R2 · Timer | Numbers sit inside circles while the MIN unit is subordinate and repeated consistently. | Keep unit treatment consistent within each proposed state; original mixed units remain documented as experiments. | Applied |

## 3. Padding and optical alignment

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 21 | R1 · Catalog grid | Equal cells help compare differently weighted icons, but the art does not occupy every cell identically. | Optical balance matters in addition to mathematical equality. Do not claim equal SVG bounds guarantee equal perceived weight. | Open |
| 22 | R1 · Battery / Alarm | Both are centered, but the battery arc extends closer to the boundary than the alarm text. | Maintain separate icon, text, and arc bounds. A single universal inset is insufficient. | Retain |
| 23 | R3 · Messages | The three-column contacts grid has consistent centers and a reserved header above. | Keep Trace face centers regular and the title separate from the gauge row. | Retain |
| 24 | R4 · Alarms | Three circular times fit below one header without duplicating a heading per circle. | Preserve one Trace title, then add only the minimum reading labels below proposed faces. | Applied |
| 25 | R4 · Music | Album images share size and gaps even when their artwork has different visual weight. | Use equal layout slots for Trace alternatives; avoid differently sized screenshots masquerading as design variation. | Retain |
| 26 | R4 · Home | The leading lock icon has its own space before three text lines. | If an icon is adjacent to a value, reserve real space; do not overlay a badge onto a critical digit. | Retain |
| 27 | R3 · News image card | Text is inset from rounded corners and placed over a quieter image region. | Keep hero captions outside the recreated Watch. Its home preview needs padding above the caption. | Retain |
| 28 | R3 · Stopwatch | The circular dial is large, yet controls occupy their own lower positions. | Controls need a separate interaction zone. The Trace info glyph is illustrative, not a tested tiny tap target. | Open |
| 29 | R2 / R3 · Top system areas | Time and navigation remain near the top while the app content varies beneath. | Respect system boundaries in native work. Browser study padding is not an Apple safe-area specification. | Retain |
| 30 | All references | These are scaled screenshots with unknown export scale, not measurement drawings. | Do not invent exact native point values from pixels. Validate margins using the intended widget family and device previews. | Open |

## 4. Color meaning

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 31 | R1 · Battery | Green is local to a charge representation rather than applied to the entire reference page. | Give green a local meaning: charge, connection, or confirmed sharing. Never use it as an overall safety state. The authored green design stays visible. | Applied |
| 32 | R3 · Noise | Green combines with OK, a checkmark, and 50 dB. The message has several cues. | Keep written Low, Offline, and Not sent states alongside color; specify Unknown for missing data. | Applied |
| 33 | R3 · Stocks | Green appears in the value-change context of a rising chart. Its meaning is domain-specific. | Do not infer that any green device reading implies a traveler is safe. | Retain |
| 34 | R4 · Music / Podcasts / Audiobooks | Each uses a different saturated identity color without suggesting a warning. | Distinguish identity color from state color. Trace’s purple background can be identity without encoding severity. | Retain |
| 35 | R4 · Calendar | A red accent marks schedule information on white, not necessarily an error. | The reference does not establish a universal red rule. Trace must explicitly define its own error usage. | Applied |
| 36 | R4 · News / Reminders | White widgets use dark text and limited accent color. A black widget is not the only native-looking option. | Retain the light case-study framing and original dark component; avoid turning the whole page black to imitate the sheet. | Retain |
| 37 | R3 · Sleep | Multiple colors distinguish categorical stages and are repeated in a legend. | Only use multiple colors when the categories or scale are defined. The rainbow Trace study remains an experiment. | Retain |
| 38 | R3 · Weather | The blue field sets context; smaller complications retain their own contrasting marks. | Avoid letting a decorative background compete with the key numbers. | Retain |
| 39 | R1 · Find People | The green person communicates product identity, not the freshness of a location. | Use a neutral older timestamp in the proposed states; a green person alone cannot certify recency. | Applied |
| 40 | R4 · Vitals | Different markers and labels accompany color. The reference is not purely a gradient illustration. | Preserve shapes and words under grayscale. Native tinted mode still needs testing. | Open |

## 5. Density and composition

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 41 | R4 · Smart Stack board | Widgets share a compact rectangular envelope while internal structures differ. | Use a family-specific composition rather than squeezing a whole app screen into the widget. | Retain |
| 42 | R4 · Activity | Three lines of values coexist with the rings because the text is very concise. | Keep reading labels short. Add them to the proposed study rather than adding explanatory sentences inside the widget. | Applied |
| 43 | R4 · Alarms | Three similar values form a natural repeated row. | Trace’s three different data types require stronger labeling than three alarm times. | Applied |
| 44 | R4 · Tide | One large reading and a small secondary detail use an asymmetric composition. | Equal-width faces are one authored choice, not a universal Apple rule. Preserve it here; evaluate alternatives separately. | Retain |
| 45 | R4 · Translate | Two languages and a place fit into a few short lines with no graph. | A compact surface can earn its space without a gauge. The location face can be primarily text. | Applied |
| 46 | R4 · Now Playing | Playback control occupies a distinct trailing region. Text uses the remaining width. | Do not turn three Trace readings into three controls just because they look like buttons. | Retain |
| 47 | R4 · Weather | An hourly sequence packs many icons because the sequence itself is the content. | Avoid adding weather-style ticks to a location age unless they communicate an actual sequence or scale. | Retain |
| 48 | R3 · Shazam | One action dominates the entire screen. Dark space reinforces focus. | Negative space is purposeful when it directs attention. It should not come from accidental blank scroller padding. | Retain |
| 49 | R2 · Photos / Music | A partial next card signals that content continues. | Show continuation only when the interaction truly scrolls. Trace’s static study should not imply hidden readings. | Retain |
| 50 | R3 · Workout | A large activity tile groups icon and label; another partially visible tile suggests a list. | Do not add app-list chrome to the widget. Keep navigation at the case-study level. | Retain |

## 6. Symbols and shapes

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 51 | R1 · Find People | The person family is recognizable at a glance with few shapes. | Preserve the person in original Trace. Test whether a checkmark implies delivered or seen before reusing it in native states. | Open |
| 52 | R1 · Maps | A single directional shape conveys navigation without a circular progress scale. | Use symbols for categories, not as invented measurements. | Retain |
| 53 | R1 · Heart Rate | The heart outline sits within a simple dark disk. | A quiet circular background can retain the authored family without an arc. | Applied |
| 54 | R1 · Home | A detailed warm home icon differs from the simpler monochrome symbols. | Do not assume every Apple icon has the same stroke weight or fill treatment. Match each role. | Retain |
| 55 | R3 · Noise | A checkmark and OK explicitly express the status. | Unknown and failure need distinct marks and words, not the same dimmed circle. | Applied |
| 56 | R2 · Compass | The pointer is a solid directional object, while the degree text provides precision. | Keep a large recognizable mark when necessary, with small precision information only if it is trustworthy. | Retain |
| 57 | R3 · Stopwatch | Controls use recognizable play and reset symbols with distinct circular bounds. | If Trace becomes interactive, use actual controls with accessible labels; decorative info remains noninteractive in the study. | Open |
| 58 | R4 · Shazam | An app symbol and a brief action label work together. | An icon alone is not enough for the proposed mixed-data glance. | Applied |
| 59 | R1 · Cycle Tracking | Several small marks suggest a cycle but do not pretend to be a numeric battery ring. | Different patterns can imply different data models. Keep the meaning of segmented signal explicit. | Open |
| 60 | R4 · Timers | Repeated tick rings belong to repeated durations. | Do not copy timer ticks onto the location age just for visual cohesion. | Retain |

## 7. Time, status, and trust

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 61 | R4 · Heart Rate | The age of the measurement is visible beside the reading. | A value must be tied to its freshness. The location face explicitly says ago. | Applied |
| 62 | R3 · Sleep | A date accompanies a historical chart. | Historical content should not look like a live feed. Trace’s old timestamp stays neutral. | Applied |
| 63 | R3 · Stocks | The chart has time labels and a market-data qualifier. | Connection does not imply live updates. Explain refresh constraints outside the glance. | Retain |
| 64 | R4 · Timers | A duration is clearly marked with minute units. | Distinguish time remaining from elapsed age; MINS and ago answer different questions. | Applied |
| 65 | R4 · Home | Locked names a concrete device state. | Use a concrete result such as Not sent, rather than a generic alarming red ring. | Applied |
| 66 | R4 · Calendar | An event time is supported by an event name and place. | The timestamp in Trace needs an event label, not merely a number and a person. | Applied |
| 67 | R3 · Noise | OK is a qualitative interpretation supported by a numeric scale. | Low signal requires a defensible source and threshold; the screenshot cannot validate either. | Open |
| 68 | R4 · Weather | Now and later hours differentiate current and forecast data. | Never present a runtime prediction with the same certainty as a reported battery percentage. | Retain |
| 69 | All four images | None provides the full set of offline, denied-permission, stale, or failed-delivery states. | Do not claim error handling was learned from these screenshots alone. Design and test it separately. | Open |
| 70 | R1 · Battery / R4 · Activity | Progress has a bounded frame of reference; location age does not show a target in these examples. | Remove the residual empty ring from the proposed old-location face; it otherwise resembles zero progress. | Applied |

## 8. Accessibility and scaling

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 71 | R3 · Noise | The green state is also spelled out and marked with a glyph. | Retain multiple cues when color is unavailable or difficult to distinguish. | Applied |
| 72 | R3 · Sleep | A visible legend names each category. | Short textual labels improve the proposed Trace faces; screen-reader names are still required. | Applied |
| 73 | R1 · Catalog captions | The external labels are much larger than many tiny in-circle labels. | Do not confuse documentation readability with readability of the complication itself. | Open |
| 74 | R4 · Truncated titles | Music content can truncate because surrounding context remains. | Do not truncate critical state words such as Unknown or Not sent. | Applied |
| 75 | R2 · Timers | Repeated units aid interpretation but consume space. | Check short and long localized units. The web SVG cannot prove localization support. | Open |
| 76 | R2 / R3 · System time | The repeated time has a stable location and sufficient surrounding space. | Stable placement helps reacquisition; actual Watch accessibility sizes still need native previews. | Open |
| 77 | R3 · News | A larger multi-line heading is appropriate to a reading screen. | Do not scale the entire UI down indiscriminately to fit a compact widget. | Retain |
| 78 | R4 · Thin chart lines | Fine detail is visible in the export, but export visibility is not wrist visibility. | Validate stroke weight and contrast at actual device scale, especially in motion. | Open |
| 79 | All references | Static full-color images do not show tinted, high-contrast, or always-on behavior. | Those conditions remain native validation work, not passed audit items. | Open |
| 80 | Trace implementation | SVG role descriptions and labeled buttons exist in the web study. | Keep accessible labels synchronized with the visible state, particularly failed versus old updates. | Applied |

## 9. Case-study presentation

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 81 | R1 · Comparison grid | A stable comparison field makes small differences easy to inspect. | Keep alternative battery faces together on one board rather than scatter them through prose. | Retain |
| 82 | R2 · App board | Uniform device silhouettes let content differences carry the comparison. | Maintain consistent framing in recreated studies; avoid differently cropped screenshots as primary evidence. | Retain |
| 83 | R3 · Expanded crops | Larger examples reveal label hierarchy and spacing absent in the full catalog. | Pair the recreated Watch hero with an enlarged component. Preserve the sharp source asset in the archive as a visual reference. | Retain |
| 84 | R4 · Smart Stack board | The sheet demonstrates variety without adding a paragraph to every widget. | Keep on-page explanation selective. Store the detailed audit in this document. | Applied |
| 85 | R1 · Catalog heading | The heading states the family, then one sentence explains its capacity. | Use precise section names such as Color study and Layout & scale. | Retain |
| 86 | R2 / R3 · Dense boards | A catalog is useful for studying a system but would overwhelm a small project story if copied wholesale. | Do not add every reference example to Trace simply to increase image count. | Retain |
| 87 | Trace original / next states | Original design and proposed corrections answer different questions. | Keep original green and rainbow versions visible; label new states as proposals. | Retain |
| 88 | Trace construction board | Alignment overlays illustrate specific bounds on the actual component. | Keep guides tied to a decision, not a decorative grid covering the whole page. | Retain |
| 89 | Trace scroller | The end now points to variations rather than an empty region. | Preserve the fixed end behavior and its regression checks while adding studies. | Retain |
| 90 | Reference provenance | The supplied sheets are evidence of visible patterns, not evidence that Apple reviewed Trace. | Avoid staff-designer approval claims and distinguish observation from validation. | Retain |

## 10. Evaluation and unresolved work

| # | Evidence / target | Finding | Trace consequence | Disposition |
|---|---|---|---|---|
| 91 | Original component | There must be no accidental mutation of the authored hero while changing proposed states. | Verify original retains 22 MINS, green segments, and 12 HRS. | Browser check |
| 92 | Proposed battery | 65% and 12% must drive different arc lengths. | Check rendered percentage states and accessible names. | Browser check |
| 93 | Proposed labels | The two temporal contexts must not be conflated. | Check Last shared in normal states and Last attempt on failure. | Browser check |
| 94 | Proposed location | The old timestamp should retain a circular tile but no misleading gauge track. | Assert that its SVG contains no arc path. | Browser check |
| 95 | Unavailable state | Missing readings must not become 0 or retain a previous successful label. | Specify missing data separately from offline and from zero. The focused motion ending does not demonstrate every unavailable-data combination. | Open |
| 96 | Original color board | The rainbow exploration must remain available after state revisions. | Scroll to the visible Color study board and inspect the full-color recreation. | Browser check |
| 97 | Phone / tablet / desktop | New labels can wrap or collide even when the page does not overflow. | Inspect state screenshots at 390, 768, and 1440px in both engines. | Browser check |
| 98 | Touch / keyboard | State controls must update consistently without needing hover. | Use native buttons with pressed state and test keyboard activation. | Browser check |
| 99 | Native Watch experience | Browser responsiveness does not establish energy use, refresh behavior, or readability on a moving wrist. | Prototype on device before making performance or safety claims. | Open |
| 100 | Traveler comprehension | No supplied screenshot establishes whether someone distinguishes old location, no connection, and failure. | Run formative comprehension tasks before declaring this solution validated. | Open |

## Supporting official guidance

[Complications](https://developer.apple.com/design/human-interface-guidelines/complications): timely information, family-specific layouts, and meaningful presentation in tinted mode. [Color](https://developer.apple.com/design/human-interface-guidelines/color): consistent meaning and alternative cues when color conveys information. These corroborate the principles; the screenshot-specific observations above are derived from the supplied images.

## Validation boundary

The on-page values are illustrative. Battery runtime prediction, signal strength availability, service acknowledgement, participant comprehension, localization, native Dynamic Type, and energy cost remain unresolved. Automated browser tests verify the web presentation only. Evaluation results follow below.


## Applied after the latest feedback

- Removed the opening jump links, “Scroll to inspect,” and the vector-production label. The problem is a compact two-column beat on desktop, stacked on mobile.
- Removed the long prototype-constraints and reflection blocks from the page. Their feasibility reasoning remains in the review documents. The page keeps a short concept note.
- Made layout families, icon construction, and navigation visible together. No disclosure or dropdown is required.
- Added separate battery, connection, and sharing boards. Each shows **8 treatments × 3 color states = 24 variations**, for **72 rendered variations** total. This counts systematic variations, not 72 unrelated design directions or tested prototypes.
- Extended the signal sketches beyond the single LOW treatment with words, numeric steps, continuous arcs, standalone bars, and lighter strokes. Captions name the tradeoff.
- Preserved the rainbow whole-widget exploration as its own visible color study.
- Rebuilt the purple Watch, its display, the component, and the construction boards as SVG/CSS. The Trace page and its home preview no longer embed the supplied screenshots. Physical materials and wallpaper are vector interpretations, not photographic duplicates.
- Matched the latest supplied component reference with more internal clearance, about 6.5% side insets, equal face positions, a purple-black gradient, and a fine rim. At the 330-unit construction width, the side inset is about 21.5 units. These are drawing measurements, not Apple-defined native margins.
- Ended with a playable five-moment solution. Battery changes from 65% to 12%; signal responds independently; a failed update preserves the previous timestamp; only confirmation earns Now. Playback is deliberately compressed and values are illustrative.
- Playback has play/pause, direct selection, keyboard support, and reduced-motion behavior. Native background refresh and power use remain untested.

### Storytelling continuity

The prior Rachel Chen and Emmi Wu comparison remains in `docs/portfolio-design-principles.md`. The page follows the useful editorial pattern: purpose, visible product, concise evidence, choices shown in artifacts, then the resulting interaction. It does not borrow another project's outcomes. The ending now demonstrates the choice instead of closing with a long generic reflection.


## Final web evaluation · 6 September 2026

- `npm run lint`: passed with no warnings.
- `npm run test:responsive`: **186 passed**, Chrome and WebKit, including the production evaluation build. Final run completed in 2.0 minutes.
- Responsive route checks cover 320, 390, 600, 768, 1024, 1440, and 1920px.
- Each of the three boards contains 8 treatments and 24 SVG samples. Checks cover text bounds, board overflow, gauge size, and caption clearance in both engines.
- Motion checks cover independent updates, the retained timestamp on failure, confirmation, keyboard selection, play/pause, completion, and reduced motion.
- Home arrangement, repeated throws into occupied spaces, wall collisions, resize behavior, hydration, and animated reset passed.
- Visually inspected Home, the Trace opening, exploration boards, layout overlays, the construction atlas, and motion states at phone and desktop sizes. The visual review caught and corrected a person-caption/arc clearance issue and a desktop navigation-card sizing issue; both now have regression checks.
- Confirmed the live preview on port 3005 serves the motion section and new studies without disclosure elements.
- Confirmed this report has exactly 100 distinct numbered review items. This is an internal desk review, not proof of native device performance or traveler comprehension.

Generated screenshot evidence is in `test-results/views/`. Detailed source and feasibility reasoning remains in `docs/trace-concept-review.md`.
