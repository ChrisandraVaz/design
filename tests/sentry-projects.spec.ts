import { test, expect } from "@playwright/test";
const projects = [
  ["message-queuing", "Message Queuing"],
  ["send-to-agent", "Send to Agent"],
  ["split-panel", "Split Panel"],
  ["relative-time", "Relative Time"],
];

test("Sentry replaces Location and keeps News in both views", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".widget-world")).toHaveAttribute(
    "data-ready",
    "true",
  );
  for (const view of ["Canvas", "Index"]) {
    if (view === "Index")
      await page.getByRole("button", { name: "Index", exact: true }).click();
    await expect(page.locator(".scatter-sentry")).toHaveCount(4);
    for (const [slug, title] of projects)
      await expect(
        page.getByRole("link", { name: `Read ${title} case study` }),
      ).toHaveAttribute("href", `/projects/sentry-${slug}`);
    await expect(
      page.locator(
        ".scatter-item>.focus,.scatter-item>.upcoming,.scatter-item>.flight,.scatter-item>.location",
      ),
    ).toHaveCount(0);
    await expect(page.locator('.scatter-3 .sentry-preview-relative-time')).toHaveCount(1);
    await expect(page.locator('.scatter-5 .news')).toContainText('News stories');
    expect(await page.locator('.scatter-3 .relative-time-reference').evaluate(el=>getComputedStyle(el,'::before').backgroundImage)).toContain('send-to-agent-background.png');
    await expect(page.locator('.scatter-sentry .card-kind')).toHaveCount(4);
    for (const badge of await page.locator('.scatter-sentry .card-kind').all())
      await expect(badge).toHaveText('Sentry Internship · Case Study');
    await expect(page.locator('.sentry-preview-pause,.sentry-preview-caption')).toHaveCount(0);

  }
});

test("queue caps at two, reveals long text, deletes, and advances in FIFO order", async ({
  page,
  browserName,
}) => {
  // Freeze wall time while arranging the queue. Under parallel browser load,
  // setup itself can otherwise consume the generation + answer window.
  const start = new Date("2026-09-13T12:00:00Z");
  const controlledClock = browserName === "chromium";
  if (controlledClock) {
    await page.clock.install({ time: start });
    await page.clock.pauseAt(new Date(start.getTime() + 1000));
  }
  const advance = (milliseconds: number) => controlledClock
    ? page.clock.runFor(milliseconds)
    : page.waitForTimeout(milliseconds);
  await page.goto("/projects/sentry-message-queuing");
  const demo = page.locator("#try-it .sentry-demo"),
    input = demo.getByRole("textbox", { name: "Message to Seer" }),
    send = demo.getByRole("button", { name: "Send message", exact: true });
  await send.click();
  await input.fill("Are they tied to the same deploy?");
  await send.click();
  await expect(demo.locator(".queue-item")).toHaveCount(2);
  await expect(input).toBeDisabled();
  await expect(demo.getByRole("status")).toContainText("Queue full");
  await demo
    .getByRole("button", { name: "Read full pending message 1" })
    .click();
  await expect(demo.locator(".queue-item").first().locator("span")).toHaveClass(
    "is-expanded",
  );
  await demo.getByRole("button", { name: "Delete pending message 2" }).click();
  await expect(input).toBeEnabled();
  await input.fill("Are they tied to the same deploy?");
  await send.click();
  // Advance in small steps so React can commit the effect that starts each
  // generation before the assertion expects its result.
  await expect.poll(async () => {
    await advance(1000);
    return demo.locator(".sentry-answer").count();
  }, { intervals: [50], timeout: 30000 }).toBe(1);
  await expect(demo.locator(".sentry-answer")).toBeVisible();
  await expect
    .poll(async () => {
      await advance(400);
      return demo.locator(".sentry-user-message").textContent();
    })
    .toBe("Which 500 errors should engineering look at first?");
  await expect(demo.locator(".queue-item")).toHaveCount(1);
  await expect(demo.locator(".queue-item")).toContainText(
    "Are they tied to the same deploy?",
  );
  // Advance in small steps so React can commit the effect that starts each
  // generation before the assertion expects its result.
  await expect.poll(async () => {
    await advance(1000);
    return demo.locator(".sentry-answer").count();
  }, { intervals: [50], timeout: 30000 }).toBe(1);
  await expect(demo.locator(".sentry-answer")).toBeVisible();
  await expect
    .poll(async () => {
      await advance(400);
      return demo.locator(".sentry-user-message").textContent();
    })
    .toBe("Are they tied to the same deploy?");
  await expect(demo.locator(".queue-item")).toHaveCount(0);
  await demo.getByRole("button", { name: "Restart queue example" }).click();
  await expect(demo.locator(".sentry-user-message")).toHaveText(
    "What changed in the latest deploy?",
  );
  await expect(input).toHaveValue(
    "Which 500 errors should engineering look at first?",
  );
});

test("a follow-up entered between generations cannot jump the existing queue", async ({
  page,
}) => {
  await page.goto("/projects/sentry-message-queuing");
  const demo = page.locator("#try-it .sentry-demo"),
    input = demo.getByRole("textbox", { name: "Message to Seer" });
  await demo.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(demo.locator(".sentry-answer")).toBeVisible();
  await input.fill("Are they tied to the same deploy?");
  await demo.getByRole("button", { name: "Send message", exact: true }).click();
  await expect(demo.locator(".queue-item")).toHaveCount(2);
  await expect(demo.locator(".sentry-user-message")).toHaveText(
    "Which 500 errors should engineering look at first?",
  );
  await expect(demo.locator(".queue-item")).toContainText(
    "Are they tied to the same deploy?",
  );
});

for (const width of [390, 768])
  test(`the mobile Watch has its own layout space above News at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.locator(".widget-world")).toHaveAttribute(
      "data-ready",
      "true",
    );
    const watch = (await page.locator(".scatter-trace").boundingBox())!,
      art = (await page.locator(".trace-project-link").boundingBox())!,
      time = (await page.locator(".scatter-5").boundingBox())!;
    expect(watch.height).toBeGreaterThanOrEqual(art.height - 1);
    expect(time.y - watch.y - watch.height).toBeGreaterThanOrEqual(19);
    await page.getByRole("link", { name: "Explore Trace" }).click();
    await expect(page).toHaveURL("/projects/trace");
  });

test("agent handoff matches direct send, destination menu, receipts, and setup", async ({
  page,
}) => {
  await page.goto("/projects/sentry-send-to-agent");
  const demo = page.locator("#try-it .sentry-demo");
  await demo
    .getByLabel("Context to send", { exact: true })
    .selectOption("conversation");
  await demo.getByLabel("Simulate error").check();
  const selectedIcon = demo.locator(".agent-reference-split .agent-robot");
  await expect(selectedIcon).toBeVisible();
  await demo.getByRole("button", { name: "Choose agent" }).click();
  await expect(demo.locator(".agent-reference-menu")).toBeVisible();
  await expect(selectedIcon).toBeVisible();
  await demo
    .getByRole("button", { name: "Send to Cursor Agent", exact: true })
    .click();
  await expect(demo.locator(".agent-receipt")).toContainText(
    "Launching coding agent",
  );
  await expect(
    demo.getByRole("button", { name: "Choose agent" }),
  ).toBeDisabled();
  await expect(demo.locator(".agent-receipt")).toContainText(
    "Could not open agent session",
  );
  await expect(demo.locator(".agent-reference-toast")).toHaveClass(/error/);
  await demo.getByRole("button", { name: "Try again" }).click();
  await expect(demo.locator(".agent-receipt")).toContainText(
    "Conversation sent to Cursor Agent Session",
  );
  await demo.getByRole("button", { name: "View demo agent session" }).click();
  await expect(demo.locator(".agent-demo-session")).toContainText(
    "Cursor demo session",
  );
  await demo.getByRole("button", { name: "Close preview" }).click();
  await expect(selectedIcon).toBeVisible();
  await demo.getByRole("button", { name: "Choose agent" }).click();
  await expect(selectedIcon).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(selectedIcon).toBeVisible();
  await demo.getByLabel("Agent configuration").selectOption("none");
  await expect(demo.locator(".agent-reference-split .agent-robot")).toBeVisible();
  await demo.getByRole("button", { name: "Choose agent" }).click();
  await expect(demo.locator(".agent-reference-menu")).toContainText(
    "No Agents Configured",
  );
  await expect(demo.locator(".agent-menu-choice")).toHaveCount(0);
  await demo.locator(".agent-add-integration").click();
  await demo.getByLabel("Agent configuration").selectOption("single");
  await demo.getByRole("button", { name: "Choose agent" }).click();
  await expect(demo.locator(".agent-menu-choice")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(demo.locator(".agent-reference-menu")).toHaveCount(0);
  await expect(
    demo.getByRole("button", { name: "Choose agent" }),
  ).toBeFocused();
  await demo
    .getByRole("button", { name: "Send to Claude", exact: true })
    .click();
  await expect(demo.locator(".agent-receipt")).toContainText(
    "Conversation sent to Claude Agent Session",
  );
});

test("Send to Agent film follows the handoff and pauses every animated layer", async ({page}) => {
  await page.clock.install({time: new Date("2026-09-14T12:00:00Z")});
  await page.clock.pauseAt(new Date("2026-09-14T12:00:01Z"));
  await page.goto("/projects/sentry-send-to-agent");
  const film = page.locator(".se-hero-product .agent-film");
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveAttribute("data-playing", "true");
  for (const [time, shot, phase] of [[500,"thinking","overview"],[8500,"choose","agents"],[8750,"choose","agents"],[8910,"select","agents"],[9680,"sending","sending"],[11280,"sending","sending"],[12480,"sent","sent"],[15280,"sent","sent"],[16780,"reset","overview"],[17280,"thinking","overview"]] as const) {
    // Seek every layer together; RAF must derive the product state from that clock.
    await film.evaluate((el,time) => el.getAnimations({subtree:true}).forEach(animation => animation.currentTime = time),time);
    await page.clock.runFor(32);
    await expect(film).toHaveAttribute("data-shot",shot);
    await expect(film.locator(".agent-reference")).toHaveAttribute("data-phase",phase);
    await expect(film.locator(".agent-reference-split .agent-robot")).toHaveCount(1);
    await expect(film.locator(".agent-reference-split .agent-brand")).toHaveCount(0);
    await expect(film.locator(".seer-chat-header")).toHaveCSS("opacity", "1");
    if (time >= 7400 && time <= 9030) {
      const header = (await film.locator(".seer-chat-header").boundingBox())!;
      const stage = (await film.boundingBox())!;
      expect(header.y + header.height).toBeLessThan(stage.y);
    }
  }
  await page.getByRole("button",{name:"Pause interaction preview"}).click();
  await expect(film).toHaveAttribute("data-playing","false");
  // WAAPI pause is pending until the browser commits the next animation frame.
  await film.evaluate(el => Promise.all(el.getAnimations({subtree:true}).map(a=>a.ready)).then(()=>undefined));
  const before = await film.evaluate(el => el.getAnimations({subtree:true}).map(a=>a.currentTime));
  await page.clock.runFor(2000);
  expect(await film.evaluate(el => el.getAnimations({subtree:true}).map(a=>a.currentTime))).toEqual(before);
  await page.getByRole("button",{name:"Play interaction preview"}).click();
  await expect(film).toHaveAttribute("data-playing","true");
  await film.evaluate(el => el.getAnimations({subtree:true}).forEach(animation => animation.currentTime = 8500));
  await page.clock.runFor(32);
  await expect(film.locator(".seer-chat-header")).toHaveCSS("opacity","1");
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(film).toHaveAttribute("data-shot","overview");
  await expect(film).toHaveAttribute("data-playing","false");
  await expect(film.locator(".seer-chat-header")).toHaveCSS("opacity","1");
  await page.clock.runFor(2000);
  await expect(film).toHaveAttribute("data-shot","overview");
});

test("split panel supports keyboard bounds, pointer resizing, and orientation", async ({
  page,
}) => {
  await page.goto("/projects/sentry-split-panel");
  const demo = page.locator("#try-it .sentry-demo"),
    handle = demo.getByRole("separator", { name: "Resize panels" });
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "50");
  await page.keyboard.press("Shift+ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "60");
  await page.keyboard.press("End");
  await expect(handle).toHaveAttribute("aria-valuenow", "72");
  await page.keyboard.press("ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "72");
  await page.keyboard.press("Home");
  await expect(handle).toHaveAttribute("aria-valuenow", "28");
  const box = (await handle.boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(44);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 2, {
    steps: 6,
  });
  await page.mouse.up();
  await expect(handle).not.toHaveAttribute("aria-valuenow", "28");
  await handle.dblclick();
  await expect(handle).toHaveAttribute("aria-valuenow", "48");
  await demo.getByRole("button", { name: "Stack panels" }).click();
  await expect(handle).toHaveAttribute("aria-orientation", "horizontal");
  await handle.focus();
  await page.keyboard.press("ArrowDown");
  await expect(handle).toHaveAttribute("aria-valuenow", "50");
});

test("relative time converts one instant across calendar boundaries and can dismiss the hovercard", async ({
  page,
}) => {
  await page.goto("/projects/sentry-relative-time");
  const demo = page.locator("#try-it .sentry-demo"),
    tooltip = demo.locator(".time-tooltip");
  await demo
    .getByLabel("Timezone", { exact: true })
    .selectOption("Asia/Kolkata");
  await expect(tooltip).toContainText("10:50 PM");
  const zoneLabel = (await tooltip.locator(".timezone-local").boundingBox())!,
    localDate = (await tooltip.locator(".timezone-local+span").boundingBox())!;
  expect(zoneLabel.x + zoneLabel.width).toBeLessThan(localDate.x);
  await demo.getByLabel("Timezone", { exact: true }).selectOption("Asia/Tokyo");
  await expect(tooltip).toContainText("Aug 13, 2026");
  await expect(tooltip).toContainText("2:20 AM");
  await expect(tooltip).toContainText("Aug 12, 2026");
  await expect(tooltip).toContainText("5:20 PM");
  expect(
    await tooltip
      .locator("time")
      .evaluateAll((es) => es.map((e) => e.getAttribute("datetime"))),
  ).toEqual(["2026-08-12T17:20:00.000Z", "2026-08-12T17:20:00.000Z"]);
  await demo.getByLabel("Label", { exact: true }).selectOption("First seen");
  await expect(tooltip.locator("header")).toContainText("First seen");
  await demo.getByRole("button", { name: "3hr ago" }).focus();
  await page.keyboard.press("Escape");
  await expect(tooltip).toHaveClass(/is-hidden/);
  await page.keyboard.press("Enter");
  await expect(tooltip).not.toHaveClass(/is-hidden/);
});

for (const width of [320, 390, 768, 1440])
  for (const [slug] of projects)
    test(`${slug} visual and accessible demo at ${width}px`, async ({
      page,
    }, info) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`/projects/sentry-${slug}`);
      await expect(page).toHaveTitle(/Sentry/);
      await expect(page.locator("h1")).toBeVisible();
      await expect(
        page.locator(".se-source img").first(),
      ).toHaveAttribute("src", /\.(webp|png)$/);
      await page.locator("#try-it").scrollIntoViewIfNeeded();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
      await page.locator(".sentry-live-demo").screenshot({
        path: `test-results/views/sentry-${slug}-${width}-${info.project.name}.png`,
      });
      await expect(
        page.locator(".se-hero-product .sentry-demo"),
      ).toBeVisible();
      expect(
        await page
          .locator(".se-hero-product .sentry-demo")
          .evaluate(
            (el) =>
              el
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running").length,
          ),
      ).toBe(0);
      await expect(page.locator(".sentry-case")).toHaveAttribute("data-theme", "light");
      await expect(page.locator(".se-motion-control")).toBeHidden();
      expect(errors).toEqual([]);
    });

for (const width of [390, 1440])
 for (const [slug] of projects)
  test(`${slug} uses Trace's editorial hierarchy and covers the six topics at ${width}px`, async ({page}) => {
   await page.setViewportSize({width,height:900});
   await page.goto(`/projects/sentry-${slug}`);
   const opening=page.locator('.trace-editorial-opening');
   const title=(await opening.locator('h1').boundingBox())!;
   const hero=(await opening.locator('.se-hero-art').boundingBox())!;
   const facts=(await opening.locator('.trace-project-facts').boundingBox())!;
   expect(title.y+title.height).toBeLessThan(hero.y);
   expect(hero.y+hero.height).toBeLessThanOrEqual(facts.y);
   expect(Number(await opening.locator('h1').evaluate(e=>getComputedStyle(e).fontWeight))).toBeGreaterThanOrEqual(600);
   for(const id of ['overview','the-problem','context','insights','solution','the-outcome']) {
    const section=page.locator(`#${id}`);
    await expect(section).toHaveCount(1);
    const heading=section.getByRole('heading').first();
    expect(Number(await heading.evaluate(e=>getComputedStyle(e).fontWeight))).toBeGreaterThanOrEqual(600);
   }
   await expect(page.locator('.se-source img').first()).toHaveAttribute('src',/assets\/sentry/);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  });
