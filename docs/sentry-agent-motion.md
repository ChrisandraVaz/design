# Send to Agent motion reference

Reference supplied September 14: `014fd18e1d67ccf03d07b358fc23ec1a202e3ca4.MP4`, 1920 × 1080, 30 fps, 16.5667 seconds. Extracted 497 frames for inspection. Local contact sheets and full-resolution frames are in `tmp/agent-motion-reference/` (not shipped).

The reference opens on a white product window over a grainy blue field with a broad pale curved highlight. The settings pane opens in about 200ms. A vertical pan establishes the action, followed by a much closer camera view at 2.45s; the shot then holds. A short title separates the steps at 3.83s. The app returns at 6.13s, a result card lifts out of it at 7.9–8.1s, and another close-up emphasizes the card action at 10.03s. The return to the app lands at 11.7s, followed by the closing brand frame at 13.87s.

## Final storyboard and composition

The author's four-frame sketch supersedes the standalone result card in the video. Use the supplied `Slide 16_9 - 19.png` unchanged as `/assets/sentry/send-to-agent-background.png`. The original grain and purple highlight are already in the asset; do not add a second procedural gradient or noise overlay.

Keep the existing Seer UI, Rubik, Claude integration mark, and approved outer card dimensions. The chat starts centered at 77% of both stage dimensions. In the close-up, the chat extends beyond the top and left while its right edge stays at 87% of the stage width and its bottom at 86.5% of the stage height. Hold this framing through the menu. During sending, ease back to a centered 87% scale. The latest ending sketch supersedes the previously anchored final view: equal 6.5% purple gutters reveal the full chat. The original green “Successfully sent response to agent” popup stays inside Seer.

- 0–1s: show the exact question “What are my slowest DB queries?” and the initial Thinking... spinner.
- 1–3.2s: show the expanded span-query call, with the Seer mark, monospace summary, disclosure chevron, elapsed timer and bordered running row. The timer reflects the preview’s elapsed query time.
- 3.2–3.8s: complete the query with one check and “No DB query spans found.”
- 3.8s: reveal the answer with a short opacity transition.
- 3.8–6s: hold the short answer in place. No programmatic conversation scroll. A completed tool call condenses to a single check row.
- 6–7.4s: ease into the existing close-up.
- 7.4–7.85s: hold before the menu opens.
- 7.85–9.57s: show agent destinations; the pointer is anchored to the selected Claude row.
- 9.57–9.75s: a small pointer press and row tint acknowledge the selection.
- 9.75–11.3s: sending state with the white “Launching coding agent...” spinner toast above the composer; ease back to the centered final framing.
- 11.3–11.55s: the camera is still while the launching toast remains visible, before it changes to green confirmation.
- 11.55–16.6s: hold the inline receipt and success toast. The toast enters over 280ms with a 5px rise and no overshoot.
- 16.6–17.8s: keep the white chat fully visible and ease back to the centered 77% opening.
- 16.6–16.9s: fade only the conversation and dismiss the success toast; navigation and input remain visible.
- 17s: reset the conversation inside the persistent window.
- 17.05–17.4s: reveal the new conversation.
- 17.8–18.2s: Thinking... continues across the loop boundary without a cut.

The Sentry Internship pill stays in the lower purple gutter. A single animation clock coordinates the camera and product states. Pause, offscreen state, and hidden tabs stop playback. Reduced motion shows the static chat with the completed query call.

## Composer reference

The latest 5:48 AM production screenshot places the purple action outside the input. Use a 38px-high field with 8px corners and 16px horizontal padding, a 6px gap, and a separate 36px square action with 8px corners. These measurements are before the film's camera scale. Use the supplied “Ask Seer a question, or press / for commands.” placeholder, a right arrow at rest, and two bars while sending. Keep 6px chat-window corners and the existing outer portfolio radius.

## Validation

Chrome and WebKit checks cover the opening proportions, close-up gutters, menu and popup bounds, composer separation, ordered loading states and answer reveal, complete header, synchronized playback, pause and reduced motion at 320/768/1440. The interactive case-study handoff, setup and recovery checks also pass. Inspect exported overview, menu, sending and success frames in both the Index card and case-study hero; a width assertion alone does not catch overflowing menu labels.

## 6:35–6:47 AM detail references

Retain the tall purple asset and source boards in `docs/references/sentry/README.md`. The menu follows the new close-up: Cursor above Claude, a larger Claude mark in its rounded coral tile, the robot on the open split button, 26px control segments in the home film (32px in the hero, 44px for the interactive demo), 6px control corners, and a 2px bottom shadow. Each feedback and agent segment has the same dimensions.

Restore the inline response status after the answer; do not hide it in the film. Sending shows the launching row, success shows the check and session link, and the interactive error scene includes its following Thinking row. The latest ending storyboard defines the film toast: 67.4% of chat width, 10.3% of chat height, a 4.7% right inset and 10% bottom inset. It overlaps the top of the footer, whose height is 16.7% of the chat (at least 72px so the existing input fits). The feedback buttons and composer controls retain their approved sizes. The standalone interactive demo keeps its original production toast geometry. The transferred composer directs users to continue in their coding agent and uses a muted pause control.

## 7:41–7:46 AM database-query and compact-header references

Use “What are my slowest DB queries?” exactly. The loading sequence is Thinking... followed by “Querying spans in web-app: 'slowest database queries, sorted by p95 duration'”. Keep the established handoff and green in-chat confirmation. The response uses the author’s supplied no-DB-spans example. It is demo copy, not a fresh query against a connected Sentry project.

Only Send to Agent uses the latest compact header: close, title, lab badge, ellipsis, history, square plus. Message Queuing keeps its existing full header. Use Sentry’s actual solid IconLab path from https://raw.githubusercontent.com/getsentry/sentry/master/static/app/icons/iconLab.tsx. The close-up’s dark-mode colors are #4d2d32 and #ffce04. The author then explicitly requested light mode: retain the exact inline solid SVG silhouette, with the light interface’s pale warning tile (#fff3cd) and amber icon (#d8a300). Never render a screenshot or bitmap for the lab badge. At normal scale the badge is 20px with a 12px icon, utility cells and plus are 28px, and the gap before the plus is 6px. Keep the portfolio’s white chat surface.

## Ending and motion review, 7:47 AM reference

The final sketch is retained as `docs/references/sentry/agent-ending-storyboard.png`. Grey denotes the supplied purple field; green denotes the existing in-chat success toast. It is a composition guide, not a request to replace real UI with rectangles. The final chat is centered at 87%, with the green toast straddling the footer’s upper edge.

Revisited the original 30fps contact sheets, including the final app hold at 11.7–13.8s. The useful qualities are a single visual focus, camera moves that finish before the next action, and quiet holds where the outcome can be read. Apply these to the existing Sentry interaction; do not reintroduce the video’s separate result card or title sequence.

[Material’s duration and easing guidance](https://m1.material.io/motion/duration-easing.html) distinguishes short feedback motion from longer movements across larger distances and recommends smooth, asymmetric acceleration. Here the product feedback is a 180ms selection press and a 280ms toast reveal, while the editorial camera retains its longer travel. The success state remains readable for about five seconds. Only the conversation fades for its reset; the white chat window stays visible throughout the loop. No extra particles, shine, or animated gradients are added to the supplied artwork.

## 8:55 AM success and composer reference

The latest production crop supersedes the schematic toast size and footer edge. Remove the divider above the input and keep the composer surface white. At the reference's 577px CSS chat width, the input is 32px high with 7px corners, 13px inset and an 8px gap before the 40px-wide pause action. The toast is 34px high, with a square 34px green check cell, 12px Rubik text, 10px left / 26px right label padding, 7px corners, a 30px right inset and 28px bottom inset. Its lower 14px overlap the input. Scale these dimensions together in decorative previews; use a minimum 9px text size for narrow cards. The toast width follows its label rather than a percentage of the chat.

Colors measured from the supplied image after converting its embedded profile to sRGB: pale green #e3f7e2, green check cell #08f262, green border #7cd88a, black text. The transferred input uses #fbfbfb, border #e9e8eb and placeholder #a6a4a9; the action uses #ac98ff with a #9b7de6 border and white pause bars. Keep the established camera timing, inline receipt and small response-action buttons.

## Short response and stable conversation

The author requested less text and removal of the awkward scroll. The author’s latest response is a normal paragraph: “No DB query spans were found in web-app over the last 14 days. It appears to be a frontend-only repo.” Only the project name is bold. Remove the repeated introduction, SQL excerpt and explanation. After the expanded running tool call, use one completed check row, “No DB query spans found.” The question, result and inline handoff receipt fit in the chat together; the film never writes `scrollTop` or scrolls the conversation. Preserve the established camera shots, menu gap and final toast.

## 8:56–8:59 AM response actions

Keep the destination menu design. The latest correction is the relationship between the short answer and its actions: move the feedback and agent controls inside the conversation, 10px after the response or receipt. Remove the empty receipt spacer. Both decorative previews use 24px segments, 14px icons and a 12px gap between groups. The interactive demo retains its 44px targets. The menu aligns to the right edge of the action row with a 14px offset above it (12px clear after its solid lower shadow). Shift the close-up toward this upper response using translate(-19%, 8%) scale(1.12); preserve the centered opening/ending and existing timing.

## Full response and restrained spacing — latest revision

Restore the author's complete supplied frontend-only response with web-app as the project name, four paragraphs and two numbered instrumentation steps. This is authored demonstration copy, not telemetry. Paragraphs and list items share the existing preview type scale. Increase the completed tool result's lower margin from 14px to 20px only; retain the body and card padding. The small response controls remain in normal flow, 10px below the answer (20px segments / 12px icons).

The longer response has one controlled conversation scroll: hold its opening until 4.8s, ease to the bottom over 1.2s, then move the camera to translate(-19%, -19.5%) scale(1.12). Use the film clock for scroll position so pause, seeking and offscreen behavior remain synchronized. Keep the composer fixed, and retain the launching/success toast geometry and 18.2s loop. The final view includes the answer's closing paragraph, receipt and response controls. Reduced motion presents a static answer. This replaces the short-response framing above.

Latest copy trim: keep only the first two frontend-only paragraphs, ending with Sentry's server-side SDK. Remove the lead-in 'To get DB query visibility', the numbered steps and the closing question. Keep the existing 6px spacing adjustment and compact action row.

With the shorter response, bring the close-up's vertical translation to -3% so the destination menu remains fully in frame in the wide hero. Opening, ending, horizontal framing and timing stay the same.

Latest handoff feedback correction: keep Launching coding agent... through 12.8s, giving it a clear 1.5-second hold after the camera settles at 11.3s. Success then holds until the existing 16.6s fade. Each toast status gets a fresh entry transition, so changing sending to sent replays the 360ms opacity/8px upward reveal instead of abruptly swapping an already-visible badge. Preserve spinner, paused/reduced-motion behavior, toast geometry and green reference colors.

The 10:13 AM close-up correction hides the chat navigation and its divider during the zoom. Fade the header out from 5.8–6.0s, keep it hidden through the menu, and restore it from 10.4–11.3s as the camera pulls back. Preserve the header's layout space so the response and menu do not shift. Drive this layer from the same paused/offscreen/reduced-motion timeline; static and interactive chat headers remain visible.

The 10:14 AM clarification supersedes the configured-logo treatment: the primary response action ALWAYS displays the generic robot, including ready, menu-open, sending, sent and error states. Claude/Cursor brand marks remain inside the destination choices. Direct-send labels and selected destination behavior are unchanged.

The 10:15 AM state comparison revealed that the camera pullback reduced the response controls from 22.4px to 17.4px on screen. Preserve their approved close-up size during the pullback, loading and success by compensating the action row for the camera's scale. Counter-scale the complete row to preserve border weight and reserve the extra height in the conversation layout, including narrow views. Keep the robot, corner radius, divider weight, gaps and existing opening/menu scale. Reset compensation while hidden and for reduced motion.

Latest loop correction: never fade the chat window away to a purple-only frame. Keep its opacity at 1, ease from the final 87% framing back to the 77% opening over 16.6–17.8s, and fade only the conversation around its 17s reset. Navigation and composer remain visible. Dismiss the success toast with a short downward fade. All new motion follows the existing pause and reduced-motion behavior.

Latest menu pacing: add a 1.2-second reading hold before the Claude click. The destination menu now remains open for 2.92 seconds before the selection press (7.85–10.77s). Shift all following camera, loading, success and loop-reset events by 1.2 seconds, preserving their durations and the continuously visible chat. The complete loop is now 19.4 seconds.

Menu timing correction: the requested hold is exactly 1 second total from menu appearance to the selection press (7.85–8.85s), superseding the longer hold above. Keep the 180ms click feedback and all subsequent motion durations. The complete loop is 17.48 seconds.

Post-click continuity: the inline launching receipt was inserting roughly 38–45px above the response controls in one frame. Keep the existing action elements mounted and visible, and open the receipt's space smoothly over 420ms using the same film clock as the camera and scrolling. Preserve the approved final layout, control scale, robot icon and one-second menu hold.

Recording review (10:56 AM): the response controls' lower corners and solid 2px shadows were clipped against the conversation's lower overflow boundary during sending and success. Earlier checks covered only their element bounds. Add 6px of bottom padding inside the film conversation so the entire painted control remains visible, and check the transformed shadow extent as well as the border box. Preserve the controls' styling, scale, timing and existing content flow.

The navigation's separate fade looked detached from the zoom. Remove that animation and keep the header fully opaque and mounted throughout. Frame the close-up by measuring the actual header height: the complete header and divider sit 8px above the stage, then return solely through the existing camera pullback. Keep the original horizontal framing, scale, easing, menu hold, and result composition. Observe header resizing so the same framing works in the home card and case-study hero without clipping the menu.

## Latest continuity correction

The handoff camera now stays at the close-up framing throughout agent selection, launching, and success. Copy, feedback, and robot control bounds remain identical across those phases. Return the camera only when refreshing the conversation for the next loop. A fixed 72px receipt area sits below the existing action row; the loading toast is the sole visible launching status, and success adds the inline session link without inserting space above the buttons. This supersedes the earlier receipt expansion and camera counter-scaling approach.
