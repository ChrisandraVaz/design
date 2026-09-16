# Trace: 100-question design review

This is an internal desk review, not an Apple review or user study. Addressed means the web presentation or stated concept resolves the question; it does not certify native implementation. Evaluation entries refer to automated browser checks, with run results reported separately.

Reference reading: [Rachel, Figma](https://www.rachelchen.tech/projects/figma), [Rachel, hardware](https://www.rachelchen.tech/projects/openai), [Emmi, Figma](https://emmiwu.com/figma). Their moment → problem → solution structure informs presentation, not borrowed findings.

## Framing

| # | Challenge | Status | Finding |
|---|---|---|---|
| 1 | Is the subject clear in the title? | Addressed | Solo travel, at a glance; watchOS is named immediately below. |
| 2 | Does the opening describe a concrete use? | Addressed | Navigating an unfamiliar place alone. |
| 3 | Does it promise rescue? | Addressed | No claim of preventing harm or saving lives. |
| 4 | Is this presented as shipped? | Addressed | Independent concept, with no measured outcomes. |
| 5 | Is authorship clear? | Addressed | Original Trace identified as the author’s exploration. |
| 6 | Is the name presented as Apple’s? | Addressed | Trace is an exploration title, not an Apple product. |
| 7 | Is the audience bounded? | Addressed | Solo traveler in an ordinary journey. |
| 8 | Is the problem separate from styling? | Addressed | Charge, connection and location age answer different questions. |
| 9 | Does the page explain why the wrist? | Addressed | The proposed benefit is checking while navigating. |
| 10 | Is that benefit validated? | Open | No traveler research has established demand. |

## Evidence

| # | Challenge | Status | Finding |
|---|---|---|---|
| 11 | Is the headline statistic sourced? | Addressed | Hostelworld report linked beside 41%. |
| 12 | Is the population specified? | Addressed | Surveyed solo travelers, not all travelers. |
| 13 | Is the date included? | Addressed | July 2025. |
| 14 | Is the sample size included? | Addressed | 3,334 respondents. |
| 15 | Is concern confused with purchase intent? | Addressed | Explicitly not evidence of widget demand. |
| 16 | Is the statistic called Google data? | Addressed | Attributed to its actual publisher. |
| 17 | Is location sharing grounded? | Addressed | 23% is reported as survey behavior. |
| 18 | Is the cohort Watch-specific? | Open | No Apple Watch cohort available. |
| 19 | Is a safety outcome implied? | Addressed | Explicitly no improved-safety evidence. |
| 20 | Are success metrics invented? | Addressed | No research outcomes or conversion claims. |

## Product fit

| # | Challenge | Status | Finding |
|---|---|---|---|
| 21 | Does this duplicate Check In? | Open | Compare native Check In before deciding whether a new surface is justified. |
| 22 | Would this replace emergency services? | Out of scope | This concept is status awareness. |
| 23 | Is a business model needed? | Out of scope | No standalone paid product is claimed. |
| 24 | Is another notification justified? | Open | No added alert flow proposed or tested. |
| 25 | Can it avoid adding navigation? | Open | Measure against existing Watch flows. |
| 26 | Does it depend on Find My access? | Open | Third-party access is not established. |
| 27 | Does connection mean delivery? | Addressed | State explanation distinguishes them. |
| 28 | Are expeditions supported? | Out of scope | Off-grid survival scenarios are not validated. |
| 29 | Is automatic sharing required? | Addressed | Consent remains an explicit prerequisite. |
| 30 | What would stop the concept? | Open | Poor comprehension, unavailable data, or excessive power cost. |

## Authored visual design

| # | Challenge | Status | Finding |
|---|---|---|---|
| 31 | Are the original three faces retained? | Addressed | Vector recreation keeps the composition. |
| 32 | Is the purple-black surface retained? | Addressed | Original background direction preserved. |
| 33 | Are 22 MINS and 65% visible? | Addressed | Original values retained as exploration artifacts. |
| 34 | Is the person symbol retained? | Addressed | Location face keeps its person glyph. |
| 35 | Is segmented signal retained? | Addressed | Original signal includes segments and cross. |
| 36 | Is the title hierarchy retained? | Addressed | Trace remains above the three faces. |
| 37 | Are all exploration boards raster screenshots? | Addressed | Gauge studies are SVG. |
| 38 | Are reference grids rebuilt? | Addressed | Supporting grids and icon geometry are vectors. |
| 39 | Is the recreation pixel-identical? | Open | Font metrics vary by platform; no pixel-identity claim. |
| 40 | Are new states distinguishable from originals? | Addressed | Labeled next iteration, with original study provenance. |

## Battery meaning

| # | Challenge | Status | Finding |
|---|---|---|---|
| 41 | Does percentage identify a quantity? | Addressed | Percentage direction represents remaining charge. |
| 42 | Is runtime presented as measured? | Addressed | 22 MINS is explicitly an untested estimate. |
| 43 | Does the device matter? | Open | Native surface must name Watch versus phone. |
| 44 | Can unknown mean zero? | Addressed | Unknown gets a missing-value symbol. |
| 45 | Is low charge a tested threshold? | Open | 12% is illustrative, not a validated trigger. |
| 46 | Does charging change presentation? | Open | Requires a native charging state. |
| 47 | Is battery health included? | Out of scope | Health is not remaining charge. |
| 48 | Could temperature change runtime? | Open | Any prediction must account for operating conditions. |
| 49 | Can estimated hours justify a full green ring? | Open | Original study exposes this ambiguity; percentage direction avoids it. |
| 50 | Is energy overhead measured? | Open | Requires hardware profiling. |

## Connection and location

| # | Challenge | Status | Finding |
|---|---|---|---|
| 51 | Are signal bars real data? | Open | Illustrative only; platform availability must be verified. |
| 52 | Does weak signal prove no internet? | Addressed | No such equivalence is claimed. |
| 53 | Can a location capture count as sent? | Open | Native contract must require service acknowledgement. |
| 54 | Does sent mean read? | Addressed | No read-receipt claim. |
| 55 | Does age indicate safety? | Addressed | Inspector explicitly rejects that interpretation. |
| 56 | Does old age mean failure? | Addressed | Neutral old timestamp; red requires confirmed failure. |
| 57 | Is the recipient known? | Open | Detail flow must identify recipient/session. |
| 58 | Are timestamp clock changes handled? | Open | Test wall-clock changes and server timestamps. |
| 59 | Is phone separation handled? | Open | Native dependency testing required. |
| 60 | Is canceled sharing distinct from offline? | Open | Needs a separate inactive-session state. |

## Color and accessibility

| # | Challenge | Status | Finding |
|---|---|---|---|
| 61 | Is everything still green? | Addressed | State studies include amber, red and gray. |
| 62 | Is color the only message? | Addressed | Words and symbols accompany color. |
| 63 | Is red tied to an actual failure? | Addressed | Explicit confirmed-failure definition. |
| 64 | Is gray confused with failure? | Addressed | Older/missing explained separately. |
| 65 | Is the green original labeled exploratory? | Addressed | Original and next iteration clearly separated. |
| 66 | Are labels accessible in browser? | Addressed | SVG roles and descriptive accessible names. |
| 67 | Are controls keyboard reachable? | Addressed | Native buttons, links and focusable decisions. |
| 68 | Does reduced motion remain supported? | Addressed | Existing reduced-motion rules preserved. |
| 69 | Is actual Watch Dynamic Type tested? | Open | Browser scaling is not native Dynamic Type. |
| 70 | Is grayscale on wrist tested? | Open | Requires actual monochrome/tinted Watch evaluation. |

## Layout and typography

| # | Challenge | Status | Finding |
|---|---|---|---|
| 71 | Does the hero retain original Watch imagery? | Addressed | Purple-band original remains visible. |
| 72 | Does the title explain the project? | Addressed | Replaced vague awareness headline. |
| 73 | Is body copy bounded? | Addressed | Constrained editorial line lengths. |
| 74 | Do supporting details overwhelm the page? | Addressed | Reference and engineering details are disclosures. |
| 75 | Are exploration alternatives grouped? | Addressed | Three numbered directions on black boards. |
| 76 | Are values larger than labels? | Addressed | Original gauge hierarchy preserved. |
| 77 | Are native safe areas claimed from CSS? | Addressed | Study guides are not platform specifications. |
| 78 | Can all native sizes use this exact grid? | Open | Native Watch family testing still needed. |
| 79 | Do annotations fit the actual artwork? | Addressed | Annotation container now shares the original aspect ratio. |
| 80 | Are em dashes needed? | Addressed | Removed from case-study copy. |

## Scroll and interaction

| # | Challenge | Status | Finding |
|---|---|---|---|
| 81 | Can the scroller end in blank padding? | Fixed | Removed 120–210px trailing padding. |
| 82 | Does the last article have artificial empty height? | Fixed | Last article uses natural content height. |
| 83 | Is the final decision active at the end? | Fixed | Explicit end-of-scroll selection. |
| 84 | Does focus select a decision? | Addressed | Focusable article updates annotation. |
| 85 | Can guides be hidden? | Addressed | Toggle retains aria-pressed state. |
| 86 | Is scrolling trapped at the end? | Fixed | Restored scroll chaining. |
| 87 | Does the end lead somewhere useful? | Addressed | Link continues into variations. |
| 88 | Does the annotation block pointer input? | Addressed | Overlay ignores pointer events. |
| 89 | Are there Before/After controls? | Addressed | Removed because no before product exists. |
| 90 | Is each small gauge a tiny target? | Addressed | They are illustrative readings, not tiny buttons. |

## Validation and boundaries

| # | Challenge | Status | Finding |
|---|---|---|---|
| 91 | Are phone widths evaluated? | Evaluation | Responsive suite covers 320 and 390px. |
| 92 | Are tablets evaluated? | Evaluation | 600, 768 and 1024px coverage. |
| 93 | Are desktop widths evaluated? | Evaluation | 1440 and 1920px coverage. |
| 94 | Are two browser engines exercised? | Evaluation | Chrome and WebKit. |
| 95 | Is scroller geometry asserted? | Evaluation | Regression measures bottom gap and padding. |
| 96 | Are screenshots inspected? | Evaluation | Inspect Home, hero and scroller end views. |
| 97 | Are source images mistaken for implementation? | Addressed | Original Watch is artwork; recreated widget is web vector. |
| 98 | Has a staff designer approved it? | Open | No external review occurred. |
| 99 | Have 100 users tested it? | Open | This is a 100-question desk review, not participant research. |
| 100 | Can this be called production-ready? | Open | Native feasibility, accessibility and comprehension remain unresolved. |
