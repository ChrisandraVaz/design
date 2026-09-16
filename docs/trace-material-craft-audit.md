# Trace: material and exploration review

6 September 2026. This review supersedes the earlier treatment of the exploration boards as gray status circles. It addresses the user's approved spectrum and green components, all three study families, and the final interaction.

This is a 100-point internal design and implementation review. It is not 100 participant sessions, Apple approval, or validation on an Apple Watch. “Checked” means inspected in the drawing, code, or browser evidence described. “Fixed” identifies a concrete correction in this pass. “Open” records a native or research question that the website cannot establish.

Final disposition: 72 checked, 24 fixed, four open. The final production evaluation passed all 220 Chrome/WebKit checks in 2.0 minutes. Lint passed. Generated screenshots were reviewed after the final changes.

## The design decision

There are 24 layouts, each drawn in three palettes: 72 visible samples. The boards hold sample readings fixed. A red 65% is a color experiment, not an operational low-battery rule. The legend states this once per board. The final interaction separately demonstrates state changes with consistent readings and symbols.

The approved spectrum and green components remain complete artifacts. New studies use their black faces, rounded type, open frame, carefully cut badges, and directional color. Gray inactive signal segments remain useful contrast; generic gray status faces are removed.

## Evidence

- Art direction: `docs/references/trace-approved-spectrum.png` and `trace-approved-green.png`, archived from the supplied references. These screenshots are not embedded in the study boards.
- Construction: `src/components/TraceStudyDial.tsx`; shared materials in `src/lib/trace-materials.ts`.
- Presentation: `TraceExplorationBoards.tsx` and `trace-exploration-boards.css`.
- Operational sequence: `TraceMotion.tsx`; original cover and film remain separate components.
- Browser evidence: `test-results/views/trace-study-*`, `trace-gradient-*`, `trace-failed-grayscale-*`, `trace-home-palette.png`, and Home / Trace viewport screenshots.
- Automated coverage: `trace-materials.spec.ts`, `trace-studies.spec.ts`, `trace-motion.spec.ts`, plus the existing authored-art, film, responsive, hydration, navigation, and canvas suites.
- Contrast calculations use WCAG relative luminance, opaque sRGB colors, and the stated backgrounds. They do not predict glare or physical watch readability.

## 01. Approved artwork and composition

| # | Review point | Result and evidence |
|---|---|---|
| 01 | Is the original green component still visible? | Checked. Complete artifact in the opening and the two-direction comparison. |
| 02 | Is the spectrum component still visible? | Checked. Complete three-face component beside the green direction. |
| 03 | Were the supplied references substituted with generic icons? | Fixed. Bespoke vector faces and a drawn person mark replace the gray status circles. The unused gray-state proposal has also been removed from source. |
| 04 | Does the new surface relate to the approved violet-black component? | Checked. Violet-black gradient, subtle rim, black circular faces. |
| 05 | Are the reference images used as screenshots inside the boards? | Checked. Every exploration is an SVG, with no raster image in the three boards. |
| 06 | Is the user-assigned cover still exact? | Checked. Shared original PNG; checksum and intrinsic dimensions covered by the authored-art tests. |
| 07 | Do cover and enlarged component remain distinct views? | Checked. The page still shows the watch and the component together. |
| 08 | Is the spectrum sweep preserved instead of forced into three flat states? | Checked. The complete rainbow exploration retains its cyan-to-crimson arc. |
| 09 | Has this pass moved the homepage cards? | Checked. The framing and drag/reset regression suite retains the supplied arrangement. |
| 10 | Is the ending still a motion solution? | Checked. Device film is followed by the interactive state sequence. |

## 02. Geometry and spacing

| # | Review point | Result and evidence |
|---|---|---|
| 11 | Do palettes share a common drawing coordinate system? | Checked. All exploration faces use a 160 × 160 viewBox. |
| 12 | Are faces genuinely circular? | Checked. Black face radius 80; rendered width and height remain equal. |
| 13 | Is the open frame geometry repeated accurately? | Checked. Radius 66, 260-degree sweep, common origin and endpoints. |
| 14 | Does the arc clear the outer face edge? | Checked. Default 13-unit stroke leaves 7.5 units at the closest edge. |
| 15 | Is the thinner frame a controlled variation? | Checked. Variant 07 uses an 8-unit stroke while retaining center and radius. |
| 16 | Are caps and joins consistent? | Checked. Continuous arcs use round caps; small icon paths use deliberate rounded joins. |
| 17 | Do palette changes resize the component? | Checked. Browser assertions compare all three bounding widths within each family. |
| 18 | Does the upper percentage badge have clearance? | Checked. A black capsule cuts the frame rather than placing green text over green stroke. |
| 19 | Does the lower badge collide with the unit? | Checked. It sits below the MINS baseline in the open frame, with its own black capsule. |
| 20 | Is the unbadged person optically centered? | Fixed. Its origin moves to account for the missing right-hand confirmation badge. |

## 03. Color and material

| # | Review point | Result and evidence |
|---|---|---|
| 21 | Does yellow have actual directional shading? | Fixed. Three yellow-to-amber stops; screenshot pixels differ between highlight and edge. |
| 22 | Does red have actual directional shading? | Fixed. Rose-to-crimson stops; screenshot pixels establish visible tonal depth. |
| 23 | Does green retain a light-to-dark range? | Checked. Lime highlight, green middle, deeper green edge. |
| 24 | Is the light direction common to all palettes? | Checked. Shared user-space gradient axis from upper left to lower right. |
| 25 | Does the closed ring accidentally rotate its lighting? | Fixed. Its path starts at the top without transforming the gradient coordinate system. |
| 26 | Are signal segments over-bright compared with the reference? | Fixed. Separate softer segment ramps preserve the quieter segmented treatment. |
| 27 | Are transformed person icons washed out by their gradient coordinates? | Fixed. Person glyphs use a deliberate solid accent, matching the reference treatment. |
| 28 | Does the deepest red graphic retain contrast against black? | Checked. #d90e42 on black calculates to 4.09:1. Yellow is 10.09:1; green is 11.74:1. |
| 29 | Is the black failure mark visible on its red badge? | Checked. #000 on #ff526d calculates to 6.68:1; grayscale screenshot retains the X. |
| 30 | Is there a single shared palette for new states? | Fixed. Shared material tokens supply both the exploration faces and motion state surfaces. |

## 04. Type and captions

| # | Review point | Result and evidence |
|---|---|---|
| 31 | Are primary readings legible against the face? | Checked. #f5f5f7 on black calculates to 19.29:1. |
| 32 | Are SVG text boxes inside their drawing area? | Checked. Browser geometry checks all 72 samples at three widths in both engines. |
| 33 | Is the same reading retained across each color pass? | Checked. Automated comparison of actual rendered text per family. |
| 34 | Is runtime casing inconsistent between time variants? | Fixed. Both time-led battery studies use MINS. |
| 35 | Is percentage placement deliberate? | Checked. Upper badge, lower badge, central unit, and inline unit are separate named studies. |
| 36 | Does the person-led caption clear the frame? | Checked. 12h ago uses a bounded 22-unit line below the enlarged symbol. |
| 37 | Are secondary captions too faint on the dark board? | Checked. #a6a6af on #111113 calculates to 7.81:1. |
| 38 | Are the small sequence numbers readable? | Checked. #85858f on #111113 calculates to 5.16:1; tabular numerals align the sequence. |
| 39 | Are small comparison captions too faint on white? | Fixed. Darkened to #6d6d76, giving 5.12:1, after the original caption calculation fell below 4.5:1. |
| 40 | Do captions repeat the same status three times? | Fixed. Removed per-dial status captions; one concise construction note sits below each family. |

## 05. Battery explorations

| # | Review point | Result and evidence |
|---|---|---|
| 41 | Is the original time-led sketch respected? | Checked. 22 MINS and 65% remain together in the badge variants. |
| 42 | Does the page claim that 65% predicts 22 minutes? | Checked. The sample runtime is explicitly illustrative. |
| 43 | Does the percentage-first arc agree with 65%? | Checked. Active path occupies 65% of its defined arc. |
| 44 | Does segmented charge agree with 65%? | Checked. Thirteen active segments out of twenty. |
| 45 | Does the battery silhouette agree with its number? | Checked. The large interior fill is 31.2 of 48 available units, or 65%. |
| 46 | Does the battery-symbol variant's outer arc agree too? | Fixed. Changed its full outer arc to 65% to match the inner fill. |
| 47 | Does the endpoint marker actually mark the charge endpoint? | Checked. Marker uses the same 0.65 path parameter as the arc. |
| 48 | Is the marker distinguishable from the arc? | Checked. Dark collar separates the accent dot from the colored stroke. |
| 49 | Does the eighth study test a meaningful alternative? | Fixed. Closed percentage ring replaces the generic type-only direction. |
| 50 | Is the final operational reading a measured-style percentage? | Checked. Motion uses 65%, then 12%; it does not animate an untested runtime forecast. |

## 06. Connection explorations

| # | Review point | Result and evidence |
|---|---|---|
| 51 | Does the signal symbol use repeatable bar geometry? | Checked. Five rounded bars, common baseline, evenly increasing heights. |
| 52 | Are active and inactive bars distinct? | Checked. Two bright bars for the fixed Low example; dark remaining bars. |
| 53 | Does the segmented perimeter use the same sample strength? | Checked. Eight of twenty segments, matching two of five bars as a visual study. |
| 54 | Is signal expressed as an invented percentage? | Checked. No numeric signal percentage appears in the new boards or motion. |
| 55 | Is text available independently of the color? | Checked. Low / LOW remains in each signal construction. |
| 56 | Are bars and word-led treatments genuinely different? | Checked. The word-led center removes the bars and gives the word the primary type scale. |
| 57 | Does the radio-wave study add a distinct recognition test? | Checked. Three nested waves and a dot replace the five-bar symbol. |
| 58 | Is the five-level arc a separate construction? | Checked. Five arc sections with two active sections, rather than twenty ticks. |
| 59 | Is the original cross silently equated with weak signal? | Fixed. The original drawing keeps its cross; the caption distinguishes it from the interaction's Low state. |
| 60 | Does the interaction imply that signal alone proves delivery? | Fixed. The confirmed update can arrive while signal stays Low. Only the sharing face changes; delivery does not imply strong signal. |

## 07. Last-shared explorations

| # | Review point | Result and evidence |
|---|---|---|
| 61 | Have generic gray state faces been removed? | Fixed. Last-shared boards now use the approved-style black face and colored frame. |
| 62 | Does the original person-and-time hierarchy remain available? | Checked. First sharing family preserves time, unit, then person. |
| 63 | Is the timestamp visible in every color pass? | Checked. 12 hours ago remains represented in all eight families. |
| 64 | Does the clock-led study identify what its clock means? | Checked. LAST SHARED above 10:09; 12h ago below. |
| 65 | Does the symbol-led treatment actually prioritize the symbol? | Checked. Person increases to 1.6 scale; timestamp becomes the lower caption. |
| 66 | Does the time-plus-person variant align their optical weights? | Checked. Number is offset left, smaller person right, with clear separation. |
| 67 | Is the rim confirmation drawn as its own mark? | Checked. Dedicated black cutout and check, avoiding overlap with the arc. |
| 68 | Does elapsed time fill toward a target? | Checked. Sharing frame is static and has no dash-array progress encoding. |
| 69 | Does a failed send erase or replace the past timestamp? | Fixed. Failure retains 2m ago and changes the person mark to an X. |
| 70 | Is a past record confused with a fresh confirmation? | Fixed. History uses an unbadged person; a newly confirmed update adds the check and Now / Sent. |

## 08. Case-study editing and presentation

| # | Review point | Result and evidence |
|---|---|---|
| 71 | Are there separate sections for the three readings? | Checked. Battery, Connection, Last shared each have their own board. |
| 72 | Is the number of explorations stated honestly? | Fixed. Each section says 8 layouts, 24 color studies, rather than implying 24 unrelated concepts. |
| 73 | Are the study conditions explicit? | Fixed. Each board says Color passes · fixed sample readings. |
| 74 | Is anything hidden behind disclosures? | Checked. All 72 samples are visible in the document; no details element or dropdown. |
| 75 | Does each construction have one identifiable change? | Checked. Captions name badge placement, frame, symbol, marker, or type priority. |
| 76 | Does the old “Direction to carry forward” prose remain? | Fixed. Removed all three repeated direction statements. |
| 77 | Do invented failure captions dominate the exploration pages? | Fixed. Removed Failed attempt / Sharing paused repetitions from the boards. |
| 78 | Are original references and new palettes both visible? | Checked. Complete two-direction comparison follows the three boards, with three gradient strips. |
| 79 | Does the palette comparison lead into the interaction? | Checked. One short bridge explains that the ending changes color with a named state. |
| 80 | Did this redesign introduce em dashes or a new research claim? | Checked. New board copy contains neither em dashes nor invented measured outcomes. |

## 09. Motion and interaction

| # | Review point | Result and evidence |
|---|---|---|
| 81 | Is the final sequence deliberate rather than autoplay? | Checked. Static initial state with an explicit play control. |
| 82 | Can every moment be selected independently? | Checked. Five named buttons remain available. |
| 83 | Does signal change while other readings stay fixed? | Checked. First transition keeps 65% and 2m ago. |
| 84 | Does low charge change only the battery reading? | Checked. Battery changes to 12%; weak signal and history remain. |
| 85 | Does failed delivery retain history and geometry? | Fixed. Same timestamp and SVG bounds; red frame and failure badge change the result cue. |
| 86 | Is failure still visible without hue? | Checked. Grayscale screenshot retains the X, 2m ago, and Not sent caption. |
| 87 | Does recovery invent a recharged battery? | Checked. Confirmed arrival changes sharing to Now / Sent while charge stays at 12%. |
| 88 | Does Pause genuinely pause rather than reset? | Fixed. Resume preserves the selected moment; replay after completion restarts the sequence. |
| 89 | Are keyboard and reduced-motion controls retained? | Checked. Browser tests cover keyboard selection, 44px controls, and deliberate motion. |
| 90 | Does the device film continue to work after the shared drawing changes? | Checked. Existing H.264 asset, poster, play/pause/seek and visibility behavior pass the film suite. |

## 10. Responsive checks and claim boundaries

| # | Review point | Result and evidence |
|---|---|---|
| 91 | Do study boards fit phone, tablet, and desktop widths? | Checked. Dedicated board tests at 390, 768, 1440; route containment from 320 through 1920. |
| 92 | Does mobile preserve the three-color comparison? | Checked. Families stack in one column, with all three dials together inside each family. |
| 93 | Is desktop density controlled without clipping the page? | Checked. Two columns with intrinsic min-width fixes; page overflow assertions remain passing. |
| 94 | Do gradients render in both browser engines? | Checked. Actual arc pixels sampled in Chrome and WebKit; highlight/edge differences are asserted. |
| 95 | Are SVG IDs and hydration stable? | Checked. Per-instance IDs and deterministic numeric geometry; browser console hydration tests pass. |
| 96 | Did the wider portfolio regress? | Checked. Production route, image, navigation, theme, homepage arrangement, drag/reset, and touch suites run with Trace. |
| 97 | Are these drawing units Apple layout points? | Open. They are web SVG units. Native WidgetKit margins and family sizing require a native implementation. |
| 98 | Are these exact palette hex values mandated by Apple? | Open. No. They are authored choices informed by the supplied art; native tint modes remain unvalidated. |
| 99 | Can the proposed implementation read and refresh every value? | Open. Browser simulation does not establish watch battery, connection, sharing acknowledgement, or refresh API access. |
| 100 | Is comprehension or safety improvement proven? | Open. No traveler study or on-wrist test was conducted. The page remains an independent concept. |

## Reference principles

Apple's guidance informs the questions, not a claim that this is an Apple component. The custom gradients come from the user's art direction.

- [Color](https://developer.apple.com/design/human-interface-guidelines/color): consistent meaning and cues beyond hue. Applied to labels, person marks, and the grayscale failure review.
- [Complications](https://developer.apple.com/design/human-interface-guidelines/complications): concise readings and appropriate gauge construction. Applied to the percentage comparison and avoiding an age countdown.
- [Designing for watchOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos/): prioritizing useful information on a small surface. Applied to the three readings and limited central marks.
- [Widgets](https://developer.apple.com/design/human-interface-guidelines/widgets): content hierarchy and color that supports information. The browser presentation does not establish native widget sizing.
- [Layout](https://developer.apple.com/design/human-interface-guidelines/layout): distinguish system safe areas from authored content spacing. The website's board padding is a presentation choice.

Rachel Chen and Emmi Wu's earlier reference review remains in `portfolio-design-principles.md`. Its application here is visual evidence followed by short, specific explanations. It is not a claim that they reviewed this work or validated these decisions.

## Follow-up: navigation-example clipping

The user's next screenshot exposed overlap in the separate construction atlas. The previous in-card overflow check did not establish separation between examples or full text clearance. The navigation panel now keeps two columns at every width, giving each example enough room for the time, title, and controls. The editorial regression covers 320, 390, 768, 1024, 1440, and 1920px and measures text ranges against card edges as well as the gaps between cards. This defect is a concrete limit of the earlier review, not evidence that passing browser checks establishes perfection.
