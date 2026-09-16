# Trace: concept review and case-study direction

Draft exploration · September 6, 2026 · Not a shipped Apple product or validated usability study.

## Current direction: latest user feedback, September 6

The user clarified that the location studies started from Find My’s last-shared / last-updated time, not an invented Trace check-in service. The older check-in premise below is historical and must not drive new work.

- Preserve the original purple-band watch and green widget as the authored starting point.
- Recreate the newly supplied location, battery, and full-color sketches as scalable SVG studies on black boards. The original crops are preserved at `public/trace/studies/` and linked from the page.
- Show time-first and person-first location studies alongside a new explicit “12h ago” direction. Older information is not automatically a failed share.
- Show hours, segmented battery estimates, marker and percentage placements, a minimal no-arc variant, and a clearly labeled percentage-first next iteration. The percentage is the measured quantity; estimated runtime remains unvalidated.
- Recreate the rainbow Trace widget and separate low-signal treatment. Distinguish that visual experiment from a semantic state system.
- The interactive next iteration shows mixed readings, low charge, update failure, and unavailable data. Green denotes available charge, amber attention, red an attempted action that failed, and neutral gray older or unavailable information. Words and symbols carry meaning alongside color.
- Replace the homepage’s “Check-in not sent” panel with a compact color study; preserve the three-cell light bento and resting layout.
- Keep the existing scroll-linked spacing comparison, labeled as a spacing pass. It is not presented as proof of a validated final product.
- No Find My integration, real signal strength access, battery runtime model, or usability outcomes have been established. The case study states these limits and a concrete next testing plan.

Sources rechecked: Apple Color and Widgets HIG, WatchKit batteryLevel, Rachel Chen’s public Figma concept, and Haolun Yang’s public SixD page. SixD’s full case study remains private/on request. Apply concise purpose → design choice → implication writing, without borrowing their outcomes.

## Earlier premise (superseded by the update above)

**Trace: a clearer glance at your last check-in.**

Explore whether a watch can explain when a location check-in was last successfully sent, alongside the device conditions that may affect the next one. Start with an everyday heading-out scenario. This is a design hypothesis, not evidence of an unmet user need yet.

The key question is: “Did my check-in go through, and how old is it?” Battery and connection support that question. Three equally prominent system metrics currently leave the purpose unclear.

## Review of the supplied references

All 31 supplied files were inspected, including the AVIF after conversion for viewing. Reference imagery remains separate from Chrisandra's own design work.

| Files | What they contribute | Application to Trace |
| --- | --- | --- |
| IMG_0893.jpg | Chat / Build / Bot / Imagine / Voice bento presentation | Portfolio framing and varied visual density, not watch interaction guidance. |
| IMG_5214–5215 | Topic selection and news feed | Explicit selected states and clear source / time metadata. |
| IMG_5216 | Watch-face news complication | A glance is a summary; truncation is a real constraint. |
| IMG_5217 | Short notification look | One identifiable event before detail. |
| IMG_5218–5222 | Longer notification, scrolling actions, dismissal | Progressive disclosure. Avoid transferring this whole menu into a widget. |
| IMG_5223–5224 | Transition into detail and phone handoff | Keep the watch task short, with detail available on demand. |
| IMG_5225–5228 | Reading-list action and follow-topic content; several repeated states/crops | Confirmation and scope of an action matter more than extra dashboard ornament. |
| IMG_5230–5232 | World topic unselected, pressed, and checked; FIFA remains selected | Include before, during, and after states in the prototype. |
| IMG_5248 2.JPG | Hurricane alert on a physical watch | Source, age, and severity are visible. Do not borrow emergency credibility for an unvalidated concept. |
| IMG_5249.JPG | Weather conditions, warning, related news | Prioritize the most consequential information, then supporting context. |
| IMG_5250 2.AVIF | Beach Haven weather / severe-weather summary on a physical watch | Real-world reflections and size reduce readability; inspect designs beyond enlarged mockups. |
| IMG_5252.JPG | Heavy-rain prediction and precipitation chart | A chart earns its space by explaining a specific variable over time. |
| Circular Complications.png | Rings, icons, values, compact gauges | Rings suit bounded quantities; an action icon and a numeric gauge need not share the same treatment. |
| Rectangular Complications.png | Titles, timestamps, values, charts | Labels and data age can be more useful than a third gauge. |
| Screenshot 2.25.27 AM and 2.31.11 AM | Chrisandra's Trace widget on a purple-band watch, at two presentation scales | Strong compact silhouette; ambiguous units and uniform green states need revision. |
| Screenshot 2.31.23 AM | Exploration board with battery, signal, recency and recipient variants; snowboarding widget reference | Keep the iteration evidence. Separate percentage, ordinal strength, elapsed time and recipient identity instead of making every variable a ring. |
| Screenshot 2.31.36 AM | Messages, call and world-clock app screens | Full app screens can support actions and richer context than the Smart Stack. |
| Screenshot 2.31.47 AM | App-screen family | Consistency comes from hierarchy and legibility, not identical charts in every screen. |
| Smart Stack.png | Widget families and in-context stacks | Develop a compact glance first, then show its relationship to the watch app and complication. |

The older news sequence is useful interaction evidence, not a current watchOS visual specification. Apple templates and third-party screenshots should remain credited reference material; the Trace iterations are the project work.

## Specific issues in the purple-band design

1. **22 MINS + 65%:** readers cannot tell whether minutes refer to battery life, an activity, or a countdown. If both describe battery, their relationship needs an explicit model. The percentage is too small to carry that explanation.
2. **Green LOW:** weak signal and a reassuring green gauge send opposing messages. Signal bars also do not measure remaining mobile data or guarantee a successful transmission.
3. **12 HRS + person icon:** this could mean time since sharing, remaining sharing duration, or a contact's last activity. A nearly full green ring does not explain which one.
4. **Three equivalent circles:** battery percentage is bounded, strength is ordinal, and elapsed time has no natural maximum. Equal graphics imply a comparability these values do not have.
5. **Information hierarchy:** the title and three gauges look orderly but do not establish what the person should notice or do next.
6. **Device identity:** specify whether battery and connection belong to the watch or phone. A paired phone's state is not automatically the watch's state.

Keep the quiet dark surface, compact proportions, purple accent and physical watch context. Use the accent for identity; let text and icons carry status meaning. Check native size, increased text size, grayscale, tinted rendering and privacy redaction before refining tiny visual details.

## Feasibility boundary

| Data | Defensible concept treatment | Open implementation work |
| --- | --- | --- |
| Watch battery | Percentage and charging state, with unknown fallback | Confirm availability and refresh behavior in the selected watch app / extension architecture. Apple's documented battery level is a percentage, not an estimate of remaining minutes. |
| Remaining minutes | Optional later experiment, visibly labeled estimate for a defined activity | Requires a model and validation across workload, connectivity and device conditions. Avoid invented precision. |
| Connection | Last observed connection or last successful service contact, timestamped | Validate watchOS networking implementation. A network path does not prove that the check-in server or recipient was reached. |
| Cellular bars | Keep out of the initial third-party implementation claim | Apple documents no general-purpose real-time signal-strength API on iOS. That is not a complete watchOS API audit; do not infer that a phone companion solves this requirement. |
| Last shared location | A Trace-owned, opt-in event: “Check-in sent 12 min ago” | Define server acknowledgement, recipient and permissions. Do not assume access to Find My sharing history. “Sent” must not silently mean “read.” |
| Freshness | Show observation age; preserve the last known value or say unavailable | WidgetKit refreshes are scheduled and budgeted. A widget is not a continuously running live monitor. |

If the goal remains a unified Apple-controlled view of all system signals, label it an **independent watchOS system concept** and list assumed platform capabilities. A third-party Trace app needs a narrower, verified data contract. Neither version should be presented as an Apple collaboration.

## First prototype specification

Use simulated data, explicitly identified as such in the case study.

**Smart Stack widget:**

- Small Trace label with a restrained violet accent.
- Primary: “Check-in sent” / “12 min ago”.
- Secondary: a battery icon with “Watch 65%”.
- Supporting state when relevant: “Offline when checked · 2 min ago”. Avoid an unqualified live “Connected” claim.
- Tap opens the check-in detail in the watch app. Avoid making the tiny information icon the only route.

**Watch app detail:** recipient, sent timestamp, last attempt, current action, and permissions context. A new check-in uses an explicit user action. A queued attempt is shown separately from the last successful send.

**Complication:** one meaningful summary, such as last check-in age with a recognizable icon. Do not compress all three metrics into a tiny circle.

**State set:**

| State | Example content | Important behavior |
| --- | --- | --- |
| Successful | Check-in sent · 12 min ago | Success means the defined service acknowledgement, not recipient read confirmation. |
| Sending | Sending check-in… | Do not replace the last successful timestamp yet. |
| Offline / failed attempt | Not sent · Try again | Distinguish failed attempt from historical success. |
| Stale observation | Last updated 2h ago | Do not continue implying live device status. |
| No history | No check-ins yet | Explain the first action. |
| Sharing disabled | Sharing off | A deliberate privacy choice is not a failure. |
| Permission unavailable | Location access needed | Explain why and provide an appropriate route to resolve it. |
| Privacy redacted | Open Trace for details | Conceal recipient / location information where appropriate. |

## Case-study storyboard

Working title: **Trace: making check-in status understandable at a glance.**

1. **Lead with the prototype:** purple-band hero plus the widget at readable size. Label “Independent watchOS concept · In progress”.
2. **Pose the question:** can a glance explain whether a check-in was sent and how current that information is?
3. **Show the starting point:** the original three green gauges, with concise annotations about mixed units, semantics and missing labels.
4. **Show the constraint that changed the design:** separate measurable percentage, inferred remaining time, observed network state and recorded sharing events. This is the API/component-design story.
5. **Compare focused iterations:** original three rings; labeled three-column version; one primary check-in with supporting device context. Evaluate all three at real watch size.
6. **Demonstrate the flow:** glance → detail → explicit send → pending → success or failure. Include stale and permission states, not just the ideal screen.
7. **Describe validation honestly:** planned comprehension sessions until they happen. Ask what “12 hrs” means, whether the check-in was sent, what device the battery refers to, and what happens offline. Report actual observations later.
8. **Close with the design decision and unresolved work:** the result today is a prototype and a clarified scope. No fabricated adoption, usability gains, Apple affiliation or shipped status.

Rachel Chen's Figma concept is relevant for its concise challenge → problem → solution → outcome structure. Her reported event outcome belongs to her project. Trace can currently conclude with decisions, limits and a testing plan instead.

## Sources checked

- [Apple: batteryLevel](https://developer.apple.com/documentation/watchkit/wkinterfacedevice/batterylevel)
- [Apple: battery monitoring](https://developer.apple.com/documentation/watchkit/wkinterfacedevice/isbatterymonitoringenabled)
- [Apple: keeping a widget up to date](https://developer.apple.com/documentation/widgetkit/keeping-a-widget-up-to-date)
- [Apple: WidgetKit strategy](https://developer.apple.com/documentation/WidgetKit/Developing-a-WidgetKit-strategy)
- [Apple DTS: iOS Network Signal Strength](https://developer.apple.com/forums/thread/721067)
- [Rachel Chen: Mobile-first for Figma](https://www.rachelchen.tech/projects/figma)

## Authored design restored · 6 September 2026

The main case-study inspector now presents a vector recreation of the author's Trace composition, including its three circular faces, purple-black surface, percentage badge, signal segments, and person symbol. The separate Travel redesign is no longer presented. Product concerns are explained as questions for the next iteration, not permission to replace the visual direction.

The original 22-minute estimate and 12-hour location label remain visible as exploration artifacts. They are not validated measurements or working integrations. State studies preserve the circular language while exploring percentage, age, unavailable data, and confirmed failure. Red annotations describe the authored composition. Supporting grid/icon/navigation studies are reconstructed vectors behind a disclosure, not displayed reference screenshots.

The page prioritizes the problem, sourced context, original component, three exploration directions, and color/state decisions. No claimed user-study outcomes. The 41% figure is attributed to Hostelworld's July 2025 poll of 3,334 solo travelers, not Google or all travelers. Native data access, battery impact, refresh behavior, accessibility on real Watch hardware, and comprehension remain to be tested.

## Visual narrative and applied layout · editorial pass

The opening now has four distinct levels: a small project identifier, a two-line title, a brief purpose statement, and labeled project facts below the artwork. The redundant opening CTA was removed. The main visual pairs the supplied higher-resolution Watch mockup (764 × 1204, preserved as PNG) with an enlarged vector recreation. The color study has a named anchor and a direct chapter link.

Added a visible construction study distinguishing app safe areas from widget content margins. It shows the container boundary, circular alignment grid, and gaps on the actual Trace recreation. Its 330-unit drawing measurements are explicitly not Apple point specifications. Apple's Watch documentation discusses safe areas, scene padding, and Dynamic Type; WidgetKit uses context-dependent content margins. This distinction matters more than copying a fixed padding number from a screenshot.

The battery variations now get a wider board and shorter captions. Original spectrum and state color studies are preserved. Source-reference images are not substituted for recreated diagrams. No claim of native device evaluation is added.

Additional source: https://developer.apple.com/videos/play/wwdc2023/10027/


## Latest case-study edit

Replaced the conclusion with the five-moment Trace motion study. Moved no content into a disclosure: layout, icon, and navigation studies are now visible. Removed the long on-page feasibility block at the user's request; its engineering constraints remain in this document. The original component's 22 MINS is preserved as an exploration. The motion proposal uses percentage, with no runtime or safety promise. The 72 exploration samples are eight treatments in three states per reading, not 72 independent research findings.
