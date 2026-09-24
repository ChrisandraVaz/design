# Deep analysis: portfolio vs. Figma and NVIDIA early-career criteria

Reviewed 24 September 2026 against: the supplied Figma Early Career portfolio guide (the pasted copy ends at "Before you start", so the category set reuses the seven criteria from the earlier pass: craft, curation, process, ownership, clarity, grounding, curiosity, plus logistics), the Figma Product Design Intern (2027) and Early Career Product Designer (2027) postings, the NVIDIA Product Design Intern, AI Infrastructure (Summer 2027) posting, both internship scripts, and the three latest resumes in Downloads (Product_Design_2027, NewGrad_2027, NVIDIA_AI_Infra_2027).

Pages reviewed on the local build: home, About, Send to Agent, Message Queuing, Relative Time, Split Panel, FontContext.

## What the job postings actually ask for

| Signal | Figma intern / early career | NVIDIA AI Infra intern | Where the portfolio shows it today |
| --- | --- | --- | --- |
| Own a feature start to finish, ship quickly | Required | Required ("problem through validated design and implementation handoff") | All four Sentry studies, FontContext |
| Visual + interaction craft (typography, hierarchy, spacing, component behavior) | Required | Required, "at least two case studies" | Relative Time, Split Panel, Send to Agent |
| Prototyping and code | Required | Required (Figma + HTML/CSS/JS, React a plus) | FontContext, Relative Time (production), Split Panel, the coded portfolio itself |
| Design tools and design systems, systems thinking, IA | Plus (Figma), plus (NVIDIA) | Plus | Split Panel, Relative Time, TD Design System |
| Tools for engineers and researchers, dense data, developer workflows | n/a | "Ways to stand out" | Seer studies, Relative Time, TD Interest Claims |
| LLMs and agents as working partners | n/a | Explicit responsibility | Send to Agent, Message Queuing, FontContext (Claude Code) |
| User interviews translated into design changes | Implied | Required | Relative Time (3 engineers), FontContext (12 people) |
| Novel, simple solutions | Early career: required | n/a | Message Queuing (cut to two-message queue), Send to Agent (one button) |
| Weekly critique, feedback loop | Required | "Stand out" | Mentioned in every Sentry study |
| Hiring, mentoring, culture | Early career: required | n/a | About page only |

Verdict: the work covers every signal. The gaps are in how visibly it is surfaced, in a few contradictions between the resume and the site, and in three pieces of content that exist in the scripts and resume but not on the site.

## Cross-cutting findings (fix these first)

### 1. The resume and the portfolio disagree on two outcomes

- Resume: "Shipped Send to Agent to release with Engineering, Product and Design sign-off." Site: "approved by design, engineering, and PM and entered the shipping cycle. I didn't yet have post-release usage data."
- Resume: RelativeTime primitives "now used across issues, traces and logs." Site: "migrating every existing tooltip remains a separate, staged effort."

Reviewers read the resume and the case study side by side. Pick one truth per project. If Send to Agent actually released before the internship ended, say so on the site and name the date. If it did not, soften the resume to "approved for release" or "handed off for release". The site's version is the safer one because it can be defended in an interview.

### 2. Seer on Desk (Hack Week) is on the resume but nowhere on the site

Script: "for hack week I worked as a seer on a desk. I helped build the animations / designed seer and its reactions to the health of your app." Resume: "a desktop-native AI agent and ambient visualization that turns live production issues into reactive on-screen states."

This is the single strongest piece of evidence for three things the postings ask for: curiosity, motion craft, and designing for humans and agents together. It also answers NVIDIA's "interest in designing tools for AI" directly. Add it as a home card in the Field studies row with a short recording and three sentences: what it was, what you designed (the reaction states), what you built (the animations, in code). Keep it labelled "Hack Week prototype" so it is not mistaken for shipped work.

### 3. Executive exposure is on the resume, not the site

Resume: "Hired by Sentry's founder and Head of Design", "presented all 4 to the CTO, CFO, Chief of Staff and Head of Design." The site never says who the work was presented to. One sentence in each Sentry outcome section ("Presented to Sentry's CTO, CFO, Chief of Staff and Head of Design at the end of the internship") is grounded and cheap. It also belongs on About.

### 4. About never says where you have worked

The About page talks about sketching dresses, community, and hobbies, but never mentions Sentry, TD Securities, IBM, BeReal, or the Figma Campus Leader role by name in the intro. Add a two-line "Now / Previously" block under the intro: "Now: final year at Waterloo, capstone. Previously: product design and design engineering at Sentry (AI/ML and Design Foundations), UX developer at TD Securities, IBM Accelerate design fellow, Figma Campus Leader." Add a resume link and LinkedIn there and in the site header.

### 5. No resume link, and the home page has no contact footer

The header is "Work / About" only. The home page ends at the TD card with no footer. Every case-study page has the LinkedIn / Email / GitHub footer; the home page and About header should too, plus a "Resume" link. Figma's guide asks that reviewers can find you and your resume in seconds.

### 6. Four large or non-web assets

| Asset | Size / format | Problem | Fix |
| --- | --- | --- | --- |
| public/assets/h.mov (FontContext home card) | 1.3 MB QuickTime | QuickTime container; Chrome on Windows and many Android browsers will not play it, so the card renders as an empty grey box (this is what the first desktop screenshot showed before the video loaded) | Re-encode to H.264 .mp4 and WebM, add a poster image |
| public/assets/metalicbutton1.mov | 1.0 MB QuickTime | Same | Same |
| public/assets/sentry/split-panel-motion.mp4 | 9.4 MB hero | Slow first paint on the Split Panel page | Compress to under 3 MB, add a poster |
| public/assets/serano/All Screens Overview.png | 29 MB | Serano page loads a 29 MB image | Export at 2x max, WebP |
| public/assets/serano/seranobakeryslides.pdf, split-panel-original.mov, Frame 2.pdf | 87 MB, 11 MB, 8 MB | Unreferenced but shipped to production | Delete from public/ |

public/ totals 304 MB. Figma's guide flags slow-loading portfolios; NVIDIA reviewers open dozens in a sitting.

## Per-criterion assessment

Ratings: Exceeds, Meets, Gap. "Exceeds" means a reviewer would cite it as a positive example.

### Craft: Meets, Exceeds on Relative Time and Split Panel

Strong: live coded demos on every Sentry page (queue walkthrough with eight states, tooltip variant viewer, draggable split panel with keyboard support), consistent editorial type system, tabular numerals reasoning, token-mismatch fix, four handle states.

Gaps:
- Send to Agent: the four confirmation strings from the script ("Successfully sent response to Agent", "Could not send response to Agent", "Successfully sent conversation to Agent", "Could not send conversation to Agent") are described but not shown. A small copy table next to the final feedback image is a cheap, concrete craft signal. Reviewers like seeing microcopy decisions.
- Home: the two "Component" cards (Liquid Metallic Button, Microsoft Paint) show only a label and a black frame until the video plays. Add poster frames so the grid never looks broken.
- Fade-in-on-scroll sections render blank for a beat when jumping via the chapter nav (observed on Message Queuing). Respect prefers-reduced-motion and shorten the delay so nothing looks missing.

### Curation: Meets

The home grid leads with Send to Agent, Message Queuing, Split Panel, FontContext, Relative Time, then studies and older work. That is the right order for Figma. For NVIDIA, Relative Time and Split Panel are the two "dense data, design systems, code" studies and they sit third and fifth. Consider a second ordering that swaps Relative Time above Split Panel, or a one-line "Start here for design systems work" pointer.

Send to Agent is the longest page and the existing audit already notes it no longer meets the two-and-a-half-scroll target, with both demos repeated at top and bottom. Cut the repeated demo at the end and merge "Commands and modals" into "Exploring where and how to send". Figma's guide explicitly rewards knowing what to leave out.

The Field studies, keychain, sticker, and FigBuild cards are good curiosity signals; keep them but keep them visually smaller than the case studies (they already are).

### Process: Exceeds on all four Sentry studies

Every study shows alternatives, a reason each was cut, a data point that changed a decision, and a critique moment. Two additions from the scripts would push this further:
- Send to Agent, "Structure before styling": the deck's Decision Pipeline (where does it live, what does it do, what happens after) is a memorable framing that the page only implies. Add it as a three-step strip under the design question.
- Message Queuing: the script's timing evidence ("44.9% of follow-ups arrive within two minutes, median 138 seconds") is already on the resume as "45% of follow-ups within 2 minutes" but the site omits it. It is the strongest justification for "the queue is short-lived, the user may be in another tab." Publish it with the population stated: "Among conversations with a follow-up, 45% sent it within two minutes (median 138 s)." If the resume uses the number, the site should too.
- Message Queuing: the original Concept A to D boards are still reconstructed sketches. If the Figma file is reachable, export the real boards; reviewers weigh real artifacts above tidy recreations.

### Ownership: Exceeds

Every study names collaborators (Priscila, Nate, an engineer, PM), separates "I designed" from "already existed" (TimeSince, Priscila's SplitPanel), and FontContext separates AI assistance and peer code review from the author's own implementation. This is exactly what the guide asks for. Two small additions:
- Split Panel: the script says you wrote the usage guidelines first "because good documentation needs to ship with the component", that the handle is also used in a content slider diff component, and that a senior engineer's table migration adopted it. The page has the table and left-nav reuse but not the diff component or the guidelines-first sequencing.
- Relative Time: the resume says the request had been backlogged 18 months; the site says "over a year". Use one figure.

### Clarity: Meets

Copy is direct and free of hype. Two readability items:
- FontContext keeps a more promotional voice than the Sentry pages ("That's not a design opinion. That's a usability failure."). That is fine as personality, but the section labelled "COMPETITORS" and "WHAT'S NEXT" contain only a heading and a one-line subhead with no body on the rendered page. Either fill them or remove the headings.
- Split Panel's hero label reads "SENTRY INTERNSHIP, 2026" while Relative Time reads "SHIPPED 2026". Use one label pattern across the four Sentry pages (for example "SENTRY · DESIGN FOUNDATIONS · SHIPPED 2026").

### Grounding: Exceeds

Approval is separated from shipment, qualitative interviews from percentages, exposure windows from each other, and proposed measures from results. Keep it. The only grounding risk is the resume mismatch in finding 1 above.

### Curiosity: Meets, Exceeds once Seer on Desk is added

FontContext (shipped plugin, built in code), shader experiments, the Apple Watch trace study, and the coded portfolio itself already show initiative. Seer on Desk is the missing piece and the one that speaks most directly to both postings.

### Logistics: Gap

No resume link, no home footer, QuickTime videos, 300 MB of static assets. See findings 5 and 6.

## Recommended edit list, in order

1. Align Send to Agent and Relative Time outcome wording between resume and site.
2. Add a Seer on Desk card (home, Field studies row) with a recording and three sentences.
3. Add "Now / Previously" and a resume link to About; add Resume to the header; add the contact footer to the home page.
4. Re-encode h.mov and metalicbutton1.mov to mp4 + webm with posters; compress split-panel-motion.mp4; delete the unreferenced 87 MB PDF, 11 MB .mov and 8 MB PDF; re-export the 29 MB Serano PNG.
5. Message Queuing: add the follow-up timing statistic with its population stated.
6. Send to Agent: add the three-step decision pipeline and the confirmation-copy table; remove the duplicated demos at the end.
7. Split Panel: add guidelines-first sequencing and the diff-component reuse.
8. Add the executive presentation sentence to each Sentry outcome and to About.
9. Fill or remove the empty FontContext "Competitors" and "What's next" sections.
10. Unify the hero label pattern across the four Sentry pages.

## Hero one-liner

Constraints from you: keep "ships products that click", keep systems thinking and product design central, signal designing for agents and humans, design engineering, and design systems with good component APIs. Constraints from the postings: Figma wants craft, prototyping and code, design tools and systems; NVIDIA wants tools for engineers and their agents, Figma plus code.

Current line (buzzword problem you named): "is a product designer at waterloo exploring API component design ✦, design engineering, and agentic UI workflows ✧."

Options, all grounded in the resume title "Product Design & Design Engineering Intern":

A. Recommended
"Chrisandra ✐ is a product designer and design engineer at Waterloo who ships products that click ✦, from design systems built to scale to interfaces where developers and their agents work together ✧."

B. Shorter
"Chrisandra ✐ is a product designer at Waterloo who ships products that click ✦: design systems with clean component APIs, and tools for developers and their agents ✧."

C. Systems-first (for NVIDIA-leaning traffic)
"Chrisandra ✐ is a product designer at Waterloo who ships products that click ✦, building design systems in Figma and code and designing how humans and agents share an interface ✧."

Why A: it keeps the joke, names both disciplines in the first clause, puts "systems built to scale" (Figma's design systems and systems thinking signal) and "developers and their agents" (NVIDIA's AI tooling signal, Sentry's Seer work) in plain words, and avoids "API component design" and "agentic UI workflows", which read as keywords rather than a sentence a person would say. Move "cultivates thriving design communities" to the About intro, where the Campus Leader work backs it up.

Update the same string in the site metadata description in src/app/layout.tsx so search previews match the hero.

## Implemented on 24 September 2026 (same day)

- About: rebuilt as the single hero from the old Framer page. "About me." kicker plus H1 in Bluu Next (font-face wired to `public/fonts/BluuNext-Bold.woff2`, Baskerville fallback until the file is added), four paragraphs, and a draggable four-photo pile with keyboard support. Lower sections removed at the user's request. Old community.jpg replaced by the optimized `about-*.jpg` set.
- Figma work: new minimal, image-led pages modeled on braydenpetersen.com/work: `/projects/figbuild`, `/projects/figma-keychain`, `/projects/figma-sticker`. Shared template `MinimalWorkPage`. Sticker page shows the dark sticker on white and the light sticker on black. Home cards for all three now link out, with the same expand arrow as other cards.
- Navigation: Resume link (public/Chrisandra_Vaz_Resume.pdf, copied from the 18 September Product Design 2027 resume) added to the case-study header and the home sidebar.
- Send to Agent: three-step decision-order strip under the design question; confirmation-copy table under the final feedback; executive presentation sentence in the outcome.
- Message Queuing: follow-up timing statistic added with its population stated; presentation sentence in the outcome.
- Split Panel: guidelines-first sequencing and content-slider diff reuse added; presentation sentence in the outcome.
- Relative Time: presentation sentence in the outcome.
- Hero one-liner: placeholder applied ("who ships products that click ✦, building design systems and agent interfaces in Figma and code ✧") pending the user's pick from the 12 options below. Metadata description matches.
- Assets: QuickTime videos re-encoded to H.264 mp4 (fontcontext-card.mp4, metallic-button.mp4); split-panel-motion.mp4 reduced from 9.4 MB to 6.1 MB; the 29 MB Serano PNG and 7.6 MB image2.JPG re-exported; unreferenced 87 MB PDF, 11 MB .mov and 8 MB PDF deleted. public/ went from 304 MB to 161 MB.
- Code health: ESLint 0 errors, 0 warnings; production build passes for all 17 routes; setState-in-effect in WidgetCanvas replaced with useSyncExternalStore; dead WorkingBoard and QueueStudy components removed; tests updated for the new hero copy, About H1, and video path.

Not done, needs the user: Seer on Desk recording; resume wording alignment for Send to Agent ("shipped") and RelativeTime ("used across issues, traces and logs"); the Bluu Next font file; a final pick for the hero one-liner.

## Twelve hero one-liner options

All follow "Chrisandra ✐ is a product designer at Waterloo …" and stay near the length of the original.

1. who ships products that click ✦ and builds design systems that scale ✧.
2. who ships products that click ✦ and designs how humans and agents work together ✧.
3. who ships products that click ✦, from design systems to interfaces for developers and their agents ✧.
4. who ships products that click ✦ and thinks in systems, from tokens to agent workflows ✧.
5. who ships products that click ✦ in Figma and in code ✧.
6. designing for humans and agents ✦ and shipping design systems in Figma and code ✧.
7. who ships products that click ✦ and components with clean APIs ✧.
8. who ships products that click ✦ and builds the systems behind them in Figma and React ✧.
9. who designs developer tools that click ✦ and design systems that scale ✧.
10. who ships products that click ✦ for developers, their agents, and the teams that build them ✧.
11. who ships products that click ✦ and turns one-off screens into systems ✧.
12. who ships products that click ✦, bridging design and engineering for humans and agents ✧.

Recommended: 3 for Figma and NVIDIA together; 9 if NVIDIA is the priority; 1 if you want the shortest.

## Learnings from giangs.art/persona (Theme Sets & Design Tokens)

What makes that write-up read as senior, and how each device maps onto Chrisandra's four Sentry studies.

| Device in the Persona study | What it does for the reader | Where it applies here |
| --- | --- | --- |
| Title is an impact statement with scale and named customers ("building blocks that power customization across millions of verification flows for OpenAI, Reddit, Brex") | Tells a reviewer the stakes before the first scroll | Sentry titles are descriptive ("Send to Agent", "Relative Time and Tooltips"). Add a one-line dek with scale: "for 4M+ developers using Sentry's AI debugging agent" (grounded in the resume). |
| Overview headline is a thesis ("Bringing order to a system of systems"), then two short paragraphs: context, then "I led…" | Frames the whole project as one idea and states ownership in sentence two | Relative Time: "One hovercard became a tooltip system." Split Panel: "25 dividers, one contract." Queue: "A waiting state, not a backlog." Send to Agent: "Send the investigation, not the text." |
| Problem is made concrete with one customer and hard counts (Twilio: one hex value repeated 1000×, 435×, across 30 theme sets) | Turns an abstract problem into a number a reviewer can repeat | Split Panel already has 40 / 25 / 1. Relative Time can lead with one engineer converting UTC by hand and getting it wrong twice a year (DST). Send to Agent can lead with the clipboard replacing itself the moment you copy again. |
| "The initial proposal" then "Where it fell apart", then the user's deceptively simple question ("Where does this value actually come from?") | Shows iteration as a story beat, not a gallery of rejected options | Send to Agent: session links fell apart because local agents can't read auth-gated pages. Relative Time: the hovercard brief fell apart when 55 screenshots showed 25 variations. Queue: concepts B to D fell apart in critique because the queue is short-lived. |
| "So we already had the primitive we needed" and "The key shift was:" written as single sentences | States the insight in one line a reviewer can quote in a debrief | Send to Agent: "The button could stay small because the payload had been worked out behind it." Relative Time: "Relative time is one composition of a tooltip system." Both exist in the copy but are buried mid-paragraph; promote them to their own line. |
| Numbered decisions, each with three options, pros and cons, and the chosen option with the reason | Answers "why this, not that?" before the interviewer asks | Send to Agent has this in prose (entry point, payload, post-handoff). Render each as a compact three-option block, the way the decision-order strip now works. |
| Edge case gets its own headline ("How do we prevent runtime errors?") and a bold rule ("enforce a shared universal token schema") | Shows systems thinking beyond the happy path | Send to Agent: "No agent configured is not an error" and "the hidden send message must never appear as a user bubble" deserve their own headline. Queue: "Deleting a question is not stopping Seer." |
| "From architecture to interface" comes only after the model is settled | Signals structure before styling | Send to Agent already says "structure before styling"; make the chapter order reflect it (decisions, then screens). |
| "The next opportunity" | Shows the designer sees past the shipped scope | Already present as "What I would measure next" and "Extending to cloud and local agents". |
| Takeaways are growth contrasts ("the interface was only the tip of the iceberg", "high fidelity can make a weak concept feel resolved") | Reads as reflection, not summary | Chrisandra's takeaways are decision recaps. Reframe one per study as a contrast: what she believed going in versus what the work taught her. |

Two cautions. First, keep the grounding discipline already in place; the Persona study claims "adopted widely" without evidence, and this portfolio is stronger for not doing that. Second, do not add a dek or thesis that the scripts cannot support; every suggested line above comes from the scripts or the resume.

## Later the same day

- Takeaways on all four Sentry studies rewritten in the principle → evidence → what changed shape (from the Rootly and Persona studies on giangs.art). Each stays grounded in the scripts: no new claims.
- About condensed to three one-sentence paragraphs; Bluu Next stays wired with DM Serif Display as the stand-in; the hint arrow redrawn.
- Sticker page order: kicker, title, facts row, description, dark sticker on white, light sticker on black. Keychain page uses three crops from the cover image only.
- Resume link removed from the case-study nav at the user's request; it remains in the home sidebar and at public/Chrisandra_Vaz_Resume.pdf.
- Hero placeholder shortened to three lines ("who ships products that click ✦ and builds design systems that scale ✧") because the canvas layout tests fit cards under the intro; options 3, 10 and 12 above would run to four lines at 1440px.

## Criteria table, end of day 24 September 2026

"Exceptional" here means a reviewer could cite the item as a positive example in a debrief. Evidence column names what is on the site now.

| Figma criterion | What they look for | Evidence on the site now | Status | What would make it exceptional (remaining) |
| --- | --- | --- | --- | --- |
| Craft | Spacing, type, crisp images, interaction feedback, prototypes or motion, no wireframey finals, no broken links or spelling errors on desktop and mobile | Live coded demos on all four Sentry pages (eight-state queue walkthrough, tooltip variant viewer, keyboard-accessible split panel, handoff previews); shared editorial type system; videos re-encoded so cards play in Chrome and Android; About photo pile with drag and keyboard; Figma pages rebuilt in the shared opening format | Exceeds on Sentry pages; meets on About and Figma pages | Bluu Next font file (About H1 currently uses DM Serif Display); Seer on Desk motion piece; poster frames for the two Component cards |
| Curation | Strongest work first, two or three solid projects immediately visible, no padding | Home leads with Send to Agent, Message Queuing, Split Panel, FontContext, Relative Time; Figma merch pages are short and image-led so they read as supporting work, not filler | Meets | Decide whether Serano, IBM, TD Design System stay on the home grid or move behind an "Archive" link; a reviewer sees 15 items today |
| Process | Earlier directions you moved away from, before/after, why this not that | Send to Agent: decision-order strip, three option tables (entry point, payload, after sending), split-button critique, slash-command explorations, larger-card exploration; Queue: four concepts with a reason each, delete-control comparison; Relative Time: 55 screenshots, before/after table of 15+ treatments; Split Panel: 12 variants collapsed into a primitive | Exceeds | Embed the original Concept A to D boards for Queue (currently reconstructed sketches) |
| Ownership | Explicit about your role on team work | "My contribution" paragraphs; collaborators named (Priscila, Nate, PM, engineers); FontContext separates AI help and peer review; Relative Time states expanded ownership into implementation; every Sentry outcome names the executive presentation | Exceeds | Align resume wording with the site for Send to Agent (approved, not shipped) and Relative Time (migration staged) |
| Clarity | Restraint, easy to follow, portfolio doesn't compete with the work, reasoning clear about who and why | Each study opens with a thesis headline and a one-line scale dek; key shift stated on its own line at each pivot; two rules for the edges; confirmation copy table; three-sentence About | Exceeds on Sentry pages | Send to Agent is still the longest page; consider trimming the repeated demo at the end |
| Grounding | Shipped, used, or tested work; concept work tied to real constraints | Four Sentry projects with analytics, engineering constraints, and approval or ship status stated honestly; FontContext shipped on Figma Community with 12 test participants; TD tools in production | Exceeds | Keep claims honest; do not add adoption numbers that the scripts don't support |
| Curiosity | Side projects and experiments that are genuinely strong | FontContext (built and published), shader studies, Apple Watch Trace, Liquid Metallic Button, Microsoft Paint recreation, the coded portfolio itself | Meets | Seer on Desk (Hack Week) is the strongest missing piece; it needs a recording from the user |

## Page-by-page criteria matrix (evening pass)

Legend: ✓✓ a reviewer would cite it; ✓ solid; ○ present but thin; – not applicable.

| Page | Craft | Curation | Process | Ownership | Clarity | Grounding | Curiosity | Changed this pass |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | ✓ (canvas + index modes, video cards now mp4) | ✓ (Sentry first, Figma merch small) | – | – | ✓ (three-line hero) | – | ✓ (shader, watch, experiments) | Hero placeholder; Resume in sidebar; three Figma cards link out |
| About | ✓ (bold Helvetica H1, drag pile with keyboard) | ✓✓ (one screen) | – | – | ✓✓ (three sentences) | ✓ | ✓ (photo pile) | Rebuilt from the Framer original; back link matches case studies |
| Send to Agent | ✓✓ (live handoff demos, copy table) | ✓ (long) | ✓✓ (decision order, three option tables, explorations, critique) | ✓✓ | ✓✓ (thesis, key shifts, two edge rules) | ✓✓ (analytics with exposure windows, approval not shipment) | – | Thesis headline, scale dek, two key-shift lines, option tables, edge rules, PM credit on copy, takeaways |
| Message Queuing | ✓✓ (eight-state walkthrough) | ✓ | ✓✓ (four concepts with reasons, delete-control comparison) | ✓✓ | ✓✓ | ✓✓ (38%, 90%, 45% within two minutes, limits stated) | – | Thesis headline, dek, key shift, timing stat, takeaways |
| Split Panel | ✓✓ (keyboard demo, interaction contract table, four handle states) | ✓ | ✓✓ (12 variants → primitive, five migration tiers) | ✓✓ (Priscila, Nate named) | ✓✓ | ✓✓ (40 / 25 / 1 counts, first PR merged) | – | Thesis headline, dek, key shift, guidelines-first, diff reuse, interaction contract, takeaways |
| Relative Time | ✓✓ (tooltip variant viewer, tabular numerals reasoning) | ✓ | ✓✓ (55 screenshots, 25 variations, before/after table) | ✓✓ (implementation ownership stated) | ✓✓ | ✓✓ (shipped; migration staged) | – | Thesis headline, dek, key shift, takeaways |
| FontContext | ✓ (all five videos now mp4 so they play everywhere) | ✓ | ✓✓ (three failed attempts, 12 testers, cut features) | ✓✓ (AI help and peer review separated) | ✓ (long, collapsible sections) | ✓✓ (published; one return-use anecdote, not adoption) | ✓✓ (self-initiated, built) | Key-shift line under the HMW; four QuickTime videos re-encoded |
| Apple Watch Trace | ✓✓ (coded component, construction studies, 72 studies) | ○ (very long) | ✓ (four rationale decisions; explorations shown, fewer "why not") | ✓✓ (solo) | ○ (Solution sits near the end) | ✓ (concept, honest about limits) | ✓✓ | Key-shift line ("a decision aid, not a safety score"); Takeaways section added; Outcome split from Takeaways |
| FigBuild, Keychain, Sticker | ✓ (shared opening format, full-width images) | ✓✓ (short, supporting) | ○ (image-led by design) | ✓ | ✓✓ | ✓ | ✓ | Rebuilt as image-led pages |

Trace is the one page where curation and clarity still lag: the Solution and Outcome sit below 72 studies. If it stays on the home grid as a concept piece, consider moving the "Solution" composition up under the Overview and collapsing the layout studies into a single "Explorations" chapter.

## Geo-restricting the site (asked in passing)

Possible on Vercel with Edge Middleware reading the request's country (`request.geo.country` or the `x-vercel-ip-country` header) and returning a 403 or a holding page for non-US visitors; Cloudflare firewall rules do the same at the DNS layer. Not recommended for a job-search portfolio: IP geolocation is approximate, VPNs bypass it, recruiters travel, and it would block Canadian reviewers (and you, in Waterloo). Not implemented.

## Evening changes, 24 September

- About: title and kicker now bold Helvetica Neue (Bluu Next dropped at the user's request); header uses the same "Back to Home" link as the case studies.
- Hero: "who ships products that click ✦ and codes agentic workflows and design systems that scale ✧" (three lines at 1440px; metadata matches).
- Message Queuing: opening dek removed; delete-control comparison board shown at column width (source file is 454px wide, upscaled 2x; a 2x export from Figma would be sharper); the "Delete pending message" hover label restyled as a tooltip.
- All em dashes removed from case-study copy and page titles.
- FontContext: four remaining QuickTime videos re-encoded to mp4 and verified loading; key-shift line under the HMW.
- Trace: key-shift line, Outcome separated from a new Takeaways section.
- Split Panel: interaction contract table under the live demo.

## Verification, end of day

- ESLint: 0 errors, 0 warnings across src and tests.
- Production build (EVAL_BUILD_DIR, Turbopack): compiles, all 17 routes prerender.
- Playwright, Chrome, one worker: media, story-and-about, interactions specs, 31 of 31 passed against the production build.
- Not run to green: canvas-arrangement, home-framing, intro-drawing, portfolio-index, fontcontext-layout. These specs click an "Index" view toggle that an earlier session replaced with an About link, compare against a card-dimension fixture from 15 September, or expect FontContext to have no shared stylesheet. They were failing before today's work and need their expectations rewritten, not the site.
- story-and-about's narrow-paragraph check now excludes takeaway articles, because case-typography.css intentionally reserves a 24px icon column in them.

- Hero final: "who ships products that click ✦ and builds agentic workflows and design systems in Figma and code ✧". The canvas intro block was widened (860px base, 1060px at the ≥761px breakpoint) so the line sits on three rows at 1154, 1440 and 1920 without touching the first card; metadata matches.
- Password protection: not recommended. Figma's guide flags friction and broken access as reasons reviewers move on; a whole-site password is exactly that. If a future project is under NDA, protect that one page rather than the site.
