# Responsive layout and evaluation

The shared final stylesheet is `src/app/responsive.css`, imported last by the root layout. It supplies fluid gutters, section spacing, bounded media, stacking behavior, and mobile navigation. Component styles still own their visual appearance.

Home uses real card widths in a one-column phone grid and a two-column tablet grid. The authored draggable composition begins above 1100px. Changing viewport dimensions resets drag offsets, so a desktop drop cannot strand a card off-screen on a phone. Native touch scrolling is preserved in the grid.

The resting desktop arrangement places Focus above Location at left, a large Trace bento below Up next, News above Shader beside Trace, and Music above Running at right. CSS computes the canvas scale before hydration; initial card transitions are disabled until controls are ready. Hover leaves neighboring cards at their normal size. Reset animates the cards back to their authored coordinates and clears all drag offsets. Decorative card surfaces use `overflow: clip` to avoid stale clipped layers after translation.

Trace places the watch above the text below 700px and alongside it above that width. Its comparison preview stacks above the notes below 960px. The artwork and annotation overlay share a fluid aspect ratio. The page background fills the screen while content has a maximum reading width.

## Run

- `npm run test:responsive` builds the site into `.next-eval` and starts an isolated production server on port 3010 and runs the browser suite.
- The suite runs installed Google Chrome and Playwright WebKit. On a fresh machine install Chrome and run `npx playwright install webkit`.
- `npm run test:report` opens the HTML report. Failures retain a screenshot and browser trace.
- `test-results/views/` holds Home and Trace screenshots at 390, 768, and 1440px, labeled by browser.

The route matrix discovers all project folders and checks HTTP success, visible headings, page overflow, and unclipped main text across seven widths. Interaction tests cover phone links home, tapping Trace, Before/After, theme switching, the inspector and its grid view, desktop drag/resize/reset, and reduced-motion keyboard movement.

Canvas evaluations also compare server-rendered and hydrated coordinates at 1200px, verify the reference arrangement and neighboring card sizes on hover, throw cards into occupied spaces and toward walls, assert no overlaps or internal scrolling, and compare Trace screenshots before throws and after Reset. Reset views are saved in `test-results/views/reference-*.png` for each browser.

The checks use Chrome and WebKit with emulated phone inputs. They do not replace physical-device testing. The test server is isolated from the live development preview so compilation cannot interfere with interaction checks.

## Verified September 6, 2026

The previous 150-check baseline passed across both browser engines, including load/reset geometry, repeated wall throws, the Trace artwork comparison, and production image-optimizer requests for corrected case-study assets. The production build and targeted ESLint checks passed. Home and Trace screenshots were reviewed at phone, tablet, and desktop sizes, along with the dark reset arrangement. The live preview on port 3005 continued to return HTTP 200.

Trace study evaluations cover the three black exploration boards at 390, 768, and 1440px, keyboard state selection, low-charge / failed-update / unavailable labels, retention of the last-known timestamp, and the homepage palette’s gauge dimensions. Screenshots are saved as `trace-study-*`, `trace-states-*`, `trace-failed-*`, and `trace-unavailable-*`.

The latest compact composition is measured against the supplied 1372 × 734 reference. A geometry regression checks all nine card positions and widths to within one pixel, alongside the existing drag/reset and responsive checks.

Spacing refinement: News and Shader share a 200px column at the reference viewport, with more vertical separation. Hover enlargement is 3.5%; a regression hovers Trace, News, Shader, and Running and checks at least 12px clearance from every other card.


## Trace exploration and motion update · 6 September 2026

Final full run: **186 passed in 2.0 minutes**, Chrome and WebKit, with the production evaluation build. Lint passed without warnings. Added checks for 72 visible exploration samples, SVG text bounds, person-caption clearance, construction-card containment, five-moment playback, pause, keyboard control, retained timestamps, and reduced motion. All existing homepage canvas arrangement, drag/throw/reset, hydration, touch navigation, and 320–1920px route checks passed. Home and Trace screenshot reviews completed. Native watchOS behavior and on-device comprehension are outside this browser evaluation.


## Homepage framing update · 6 September 2026

Updated the resting composition reference to the user's 1154 × 603 framing, archived at `docs/references/home-framing-2026-09-06.png`. The outer frame now aligns the heading and canvas on the left and navigation on the right. It scales fluidly with a 1600px maximum. Mobile/tablet navigation remains in normal flow, with tighter top spacing and a centered theme icon.

Final result: **198 passed in 1.6 minutes**, Chrome and WebKit, including the production build. Lint and whitespace checks passed. New coverage verifies the supplied-size coordinates, shared frame edges, centered theme icons, keyboard switching, persistence after reload, and unchanged card bounds across theme changes at 390, 768, 1100, 1154, 1440, and 1920px. Existing route overflow checks also cover 320, 600, and 1024px. Drag/throw/reset, hydration, and Trace behavior remain passing. Visually reviewed the new dark desktop reference, light desktop/mobile frames, and the Trace opening.

## Original cover and Watch film · 6 September 2026

Final result: **210 passed in 1.9 minutes**, Chrome and WebKit, including the production build. Lint and whitespace checks passed. The cover test verifies the exact supplied image checksum, its 764 × 1204 intrinsic dimensions, successful loading, and shared use on the homepage and case-study opening.

New film checks cover 320, 390, 768, and 1440px: actual H.264 decode at 1440 × 1008, 18-second duration, play, pause, seeking, keyboard scrubbing, replay after completion, 44px controls, page containment, pause when scrolled away, and deliberate playback under reduced motion. Existing canvas geometry, reset, theme switching, navigation, color studies, and final interaction sequence remain passing.

Visually inspected the dark homepage at the user's 1154px framing, the Trace opening at 390 and 1440px, the film's front/left/right/close-up compositions, and the encoded close-up on mobile. The device turns use an interpreted vector presentation model with layered case depth. They do not establish physical hardware dimensions or validate native watchOS behavior.

## Trace material and study redesign · 6 September 2026

Final production run: **220 passed in 2.0 minutes**, Chrome and WebKit. Production build, lint, and whitespace checks passed. The live preview on port 3005 returned HTTP 200 and contained all 72 new vector samples.

The three boards now contain eight layouts each, drawn in three fixed-reading palette passes. New checks compare text and dimensions across palettes, verify containment at phone/tablet/desktop sizes, and sample actual rendered arc pixels. Green, yellow, and red each have a measurable highlight-to-edge difference. The face interiors remain black. These checks catch flat fallback colors as well as missing gradients.

The failure review verifies that the last confirmed timestamp, frame geometry, and component bounds stay fixed while the sharing symbol changes. Grayscale screenshots preserve the X and named result. The final confirmed update leaves battery at 12% and signal Low, so delivery does not imply that either reading recovered. Playback resumes at the selected moment; completion offers replay. Existing cover, film, layout-guide, red-annotation, page, touch, keyboard, theme, and canvas checks remain passing.

One intermediate WebKit run stalled at the homepage's page-wide load event, while its failure snapshot showed the rendered canvas. That geometry test now waits for DOM readiness followed by the existing hydrated-canvas readiness assertion. No layout assertion or image check was removed. The final full run passed.

Visual review included all three boards on desktop, tablet sharing, phone battery and color comparison, the final failure/recovery and grayscale views, the preserved opening, and light/dark Home views. The closed-ring lighting, small white-background captions, and independent recovery behavior received corrections after screenshot/source review. Caption contrast is 5.12:1 on white; primary dial text is 19.29:1 on black.

The accompanying `trace-material-craft-audit.md` records 100 distinct review points: 72 checked, 24 corrected, and four explicit native/research boundaries. This is a design and browser implementation review, not 100 user studies or validation on physical Apple Watch hardware.

## Navigation construction-card correction

The narrow atlas panel now uses a two-by-two navigation grid at every breakpoint. Previous four-column desktop packing clipped times and crowded neighboring examples. Added full text-range containment and minimum inter-card gap assertions at 320, 390, 768, 1024, 1440, and 1920px. Desktop and phone atlas screenshots were visually inspected, along with Home. Final result: **226 passed in 2.3 minutes** across Chrome and WebKit, including the production build. Lint and whitespace checks passed.
