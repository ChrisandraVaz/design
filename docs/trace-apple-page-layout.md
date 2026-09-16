# Trace editorial layout reference

Reviewed September 6, 2026 at 1440px and 390px viewport widths. These are observations of published pages, not Apple specifications for a portfolio or a watchOS widget.

Sources:

- [Apple Watch Series 11](https://www.apple.com/apple-watch-series-11/)
- [MacBook Air](https://www.apple.com/macbook-air/)
- [Fonts for Apple platforms](https://developer.apple.com/fonts/)

## What the pages actually use

The inspected page styles specify SF Pro Display for large editorial text and SF Pro Text for smaller copy, with Helvetica and Arial fallbacks. Most prominent headings use weight 600. Apple identifies SF Compact as the watchOS system typeface; that is a different context from the typography of the website presenting a Watch.

Examples measured from the live pages:

| Role | Desktop | Phone |
| --- | --- | --- |
| Watch hero statement | 64px / 68px, weight 600 | 32px / 36px, weight 600 |
| Highlights heading on both pages | 56px / 60px, weight 600 | 28px / 32px, weight 600 |
| Watch health feature statement | 96px / 100px, weight 600 | 48px / 52px, weight 600 |
| Watch health introduction | 24px / 32px, weight 600 | 19px / 23px, weight 600 |
| Watch detail copy example | 17px / 25px, weight 400 | Smaller detail roles remain distinct from the introduction |

The Watch health introduction occupies a 525px column at 1440px. Some other blocks are wider. The MacBook Air design introduction occupies an 817px column at that viewport. There is no single text width applied to every piece of copy. At 390px, the main feature columns are about 341px wide, with about 24px outer gutters.

Section spacing also changes with the purpose of the content. Several Watch sections use 160px vertical padding on desktop and 96px on phones. MacBook Air uses a different spacing rhythm in its highlights. These values create product-launch pacing around large media; copying them throughout this case study would make the reading unnecessarily long.

## Decisions applied to Trace

The existing content and product artwork remain the basis of the case. This pass changes the editorial hierarchy and how the explanation relates to the images.

- Keep the system font stack. It uses the Apple system font on Apple platforms and familiar system fallbacks elsewhere. No Apple font files are copied or hosted.
- Use a title ranging from 36px to 64px, chapter headings from 30px to 40px, and narrative or study headings from 26px to 32px. Prominent headings use weight 600. The Solution heading shares the chapter role with Design decisions and Explorations.
- Relax the title tracking from -0.045em to -0.02em. Use separate tracking and leading for the smaller roles rather than shrinking a display style everywhere.
- Set explanatory copy at 17px with approximately 26px leading. Keep supporting notes smaller and make the body darker. Text explaining a design decision should be readily readable rather than resemble a footnote.
- Bound long introductions at 60ch and narrative copy at 58ch. The art can span the full content width while its explanation remains a comfortable reading column.
- Start paired narrative columns on the same reading axis. On narrower screens, place the explanation immediately below the heading rather than squeezing both into narrow columns.
- Keep roughly 18px between a chapter heading and its explanation, and 32px between the introduction and its artwork. Use 32–48px between narrative sections and 56–88px between major chapters. These are Trace's responsive editorial choices, not HIG measurements.
- Preserve the rounded product typography, gauge geometry, gradients, and the supplied watch image. Editorial rules live in `trace-editorial.css` and target the page roles separately from the product artwork.

## Motion and image rendering

The watch file remains the exact 764 × 1204 PNG supplied for the cover. The narrow presentation renders it at 135px wide before the zoom, so the screen details are necessarily small. The revised zoom animates the image's layout width instead of enlarging a transformed browser layer. It grows by 16%, which makes the watch easier to inspect without creating additional detail in the source.

The latest request makes the presentation repeat automatically. A 9.2-second cycle preserves the initial zoom and reveal, holds the finished component for about four seconds, then returns to the watch. The restart arrow is replaced by an icon-only pause/play control. The sequence pauses when outside the viewport or in a hidden tab. Reduced motion shows the final component and removes the unnecessary motion control.

## Verification

The final production build, lint, and all 232 Chrome/WebKit responsive checks passed. The editorial pass was inspected at 320, 390, 768, 1024, 1440, and 1920px. Motion checks cover both sides of the phone breakpoint, the automatic repeat, offscreen pausing, reduced motion, and keyboard pause/play. Home, Trace opening, layout, system, and solution screenshots were also inspected. Browser layout testing does not validate the native Watch interface or its underlying product claims.
