import type { SentryProjectId } from "./projects";

export type StorySection = { title: string; paragraphs: string[] };
export type SentryStory = {
  intro: string;
  timeline: string;
  role: string;
  team: string;
  tools: string;
  prompt: string;
  brief: StorySection;
  context: StorySection;
  insights: StorySection;
  findings: { title: string; body: string }[];
  problem: StorySection;
  solution: StorySection;
  steps: StorySection[];
  signals: { value: string; label: string; note: string }[];
  decisions: { title: string; before: string; after: string }[];
  evidence: {
    file: string;
    width: number;
    height: number;
    title: string;
    caption: string;
    stage: "insights" | "solution";
  }[];
  outcomeTitle: string;
  outcome: string;
  reflection: string;
  next: SentryProjectId;
};

export const sentryStories: Record<SentryProjectId, SentryStory> = {
  "message-queuing": {
    intro:
      "I designed message queuing for Seer, Sentry’s AI debugging agent, so developers could submit follow-up questions while an investigation was still running.",
    role: "Product Design Intern",
    team: "AI/ML · Seer",
    timeline: "Summer 2026",
    tools: "Figma",
    prompt:
      "Add two follow-ups, remove one, and watch the next message enter the conversation.",
    brief: {
      title: "My part in the project",
      paragraphs: [
        "I audited six tools, explored four queue concepts, and worked through the final interaction states in Figma. The project ended with a design specification for an inline queue with two pending messages.",
      ],
    },
    context: {
      title: "Seer made developers wait before asking a follow-up.",
      paragraphs: [
        "Seer investigates errors using issue details, traces, and logs. During an investigation, a developer might think of another question before the current answer is finished. At the time, Seer blocked the input while it generated a response.",
        "There was no way to submit that next question and leave it waiting. The developer had to come back when generation finished. My task was to make room for that follow-up within the existing chat.",
      ],
    },
    insights: {
      title: "The queue needed to fit how people already used Seer.",
      paragraphs: [
        "I reviewed Seer conversation data alongside a competitive audit of Claude Code, Cursor, Codex, Figma Make, Google Antigravity, and Paradigm AI. I compared where each tool placed pending messages and how it handled editing, reordering, deletion, and sending a message into an active turn.",
        "The audit gave me options to explore. The conversation data helped me decide which of those options belonged in Seer.",
      ],
    },
    signals: [
      {
        value: "38%",
        label: "of conversations included follow-ups",
        note: "There was an existing behavior to support: continuing an investigation with another question.",
      },
      {
        value: "90%",
        label: "of messages were under 131 characters",
        note: "A compact row would fit most messages. Longer messages still needed a way to be read in full.",
      },
    ],
    findings: [],
    problem: {
      title: "How should a message behave when Seer is already answering?",
      paragraphs: [
        "Unlocking the input was only part of the problem. I needed to distinguish a question waiting to be sent from one Seer was already processing, show which question would go next, and give the developer a way to remove a pending message.",
        "I treated those as the core requirements. Editing, reordering, and interrupting the current turn were additional decisions, each with its own cost.",
      ],
    },
    solution: {
      title: "Two pending messages, directly above the input.",
      paragraphs: [
        "After exploring four directions in design critiques, I returned to the minimal inline concept. Follow-ups wait above the composer and send in the order they were added. Each message has one action: delete.",
      ],
    },
    decisions: [
      {
        title: "Minimal inline queue",
        before: "Visible pending messages with a delete action.",
        after:
          "Selected. It made the order clear and kept the queue beside the input.",
      },
      {
        title: "Full queue controls",
        before:
          "Editing, reordering, and injecting a message into the active chat.",
        after:
          "Not selected. Reordering changed the next question; injection changed the active turn. I kept those behaviors outside this queue.",
      },
      {
        title: "Inline editing",
        before: "Edit a pending message in place, or delete it.",
        after:
          "Not selected. Editing needed its own save and cancel behavior. For the short follow-ups common in Seer, I prioritized deletion.",
      },
      {
        title: "Collapsible queue",
        before: "Hide pending messages to recover vertical space.",
        after:
          "Not selected. It saved about 56px, but added an interaction to see what was waiting.",
      },
    ],
    steps: [
      {
        title: "A pending message should look pending.",
        paragraphs: [
          "I used a quieter fill and text treatment for queued messages than for sent messages. The queue stays above the composer, so the developer can review what is waiting without searching through the conversation. Once the current response finishes, the oldest queued message becomes the next user message.",
        ],
      },
      {
        title: "Delete means the message will not be sent.",
        paragraphs: [
          "I chose a trash icon instead of an ×: this action removes a message from the queue, rather than dismissing a piece of UI. The hover label reads “Delete pending message.”",
          "Deletion is visible where it happens, so I left out a separate confirmation toast. For longer questions, the row truncates to two lines and reveals the full message on hover.",
        ],
      },
      {
        title: "Explain the limit before it feels like another blocked input.",
        paragraphs: [
          "The final queue holds two messages. When both slots are occupied, the input becomes unavailable and explains that the queue is full. Deleting a message or letting one send opens a slot again.",
          "Two was a layout and scope decision: keep the pending conversation visible without letting it take over the chat. The message-length data supported compact rows; it did not establish that two was the ideal limit.",
        ],
      },
    ],
    evidence: [
      {
        file: "queue-research.webp",
        width: 2386,
        height: 1976,
        title: "Competitive audit",
        caption:
          "My working board comparing pending-message placement and controls across six tools.",
        stage: "insights",
      },
      {
        file: "queue-concepts.webp",
        width: 2922,
        height: 1700,
        title: "Queue explorations",
        caption:
          "Wireframes and high-fidelity flows from the working file. These include alternatives that did not become the final design.",
        stage: "solution",
      },
    ],
    outcomeTitle: "Final design and interaction specification.",
    outcome:
      "I completed the two-message queue design, including pending and sent states, long-message handling, deletion, and the full-queue state. Editing, reordering, and injection stayed outside the final scope. Stopping or cancelling an active generation was a separate frontend/backend issue and remained outside this project.",
    reflection:
      "The next thing I would validate is whether people understand that a queued message sends automatically. I would also check whether the two-message limit interrupts real investigations. Those are open questions; this case study documents the design, not a measured result after release.",
    next: "send-to-agent",
  },
  "send-to-agent": {
    intro:
      "Seer could explain why something broke. The next step—turning that investigation into a code change—still required a handoff. I designed Send to Agent to carry the right context into a developer’s configured coding agent.",
    role: "Product design · Workflow research, interaction design, handoff",
    team: "AI/ML · Seer",
    prompt:
      "Send directly or choose a destination from the agent menu. Use the controls below to explore configuration, context scope, and an error with retry.",
    signals: [
      {
        value: "306",
        label: "clipboard copies in a 30-day window",
        note: "Alongside 235 session-link copies and 45 block copies; block copy launched partway through the window.",
      },
      {
        value: "97%",
        label: "had one configured agent",
        note: "A strong reason to make the default agent the primary action.",
      },
      {
        value: "12 / 1,000",
        label: "messages received a tool-call click",
        note: "Critical context should not depend on the user opening every tool call.",
      },
    ],
    decisions: [
      {
        title: "Default path",
        before: "Ask for an agent on every send.",
        after:
          "Send directly to the configured agent; retain a caret for alternatives.",
      },
      {
        title: "Payload",
        before: "Copy an answer or a link without its supporting context.",
        after:
          "Carry the response, tool calls, and question—or the full conversation.",
      },
      {
        title: "Confirmation",
        before: "A fleeting state leaves the destination uncertain.",
        after: "Show a persistent receipt and an explicit retry on failure.",
      },
    ],
    evidence: [
      {
        file: "agent-entry-patterns.webp",
        width: 1838,
        height: 588,
        title: "The final entry pattern",
        caption:
          "The final design retains the primary send action and a separate caret for the agent menu.",
        stage: "solution",
      },
      {
        file: "agent-flow.webp",
        width: 3312,
        height: 1824,
        title: "Mapping the handoff",
        caption:
          "Original workflow research connecting investigation, context selection, and the coding agent.",
        stage: "insights",
      },
      {
        file: "agent-explorations.webp",
        width: 2848,
        height: 1906,
        title: "Exploring the entry points",
        caption:
          "The working design board used to compare action placement and context scope.",
        stage: "solution",
      },
    ],
    outcome:
      "The design was approved with design, engineering, and product partners and entered the shipping cycle. The specification covered context scope, default-agent behavior, integration setup, and sending feedback.",
    reflection:
      "The most important part of the interaction was the context crossing between tools. Designing the payload, the default action, and the receipt together made the handoff easier to understand.",
    next: "split-panel",
    brief: {
      title:
        "How might we carry a Seer investigation into the tool that can act on it?",
      paragraphs: [
        "Make the handoff to a configured coding agent direct, while preserving the question, evidence, and scope the developer wants to continue.",
      ],
    },
    context: {
      title: "Finding the problem was only half the workflow.",
      paragraphs: [
        "Seer helped developers understand why something broke. Turning that investigation into a code change could still mean moving to Claude, Cursor, or another coding agent and assembling the context again.",
        "Developers could copy an answer or share a session link, but those actions left them responsible for deciding what the next tool needed. I mapped two intentions: act on one response, or continue the full conversation elsewhere.",
      ],
    },
    insights: {
      title: "Developers were already carrying the investigation across tools.",
      paragraphs: [
        "The usage review showed 306 clipboard copies and 235 session-link copies in a 30-day window. Block copy recorded 45 copies after launching partway through that window; later weekly counts ranged from 114 to 336. These were signals of an existing handoff behavior, rather than evidence of impact from my design.",
        "The configuration data and tool-call interactions helped identify where the new flow could remove effort. Most users had a single configured agent, and opening individual tool calls was uncommon.",
      ],
    },
    findings: [
      {
        title: "The common destination was already known.",
        body: "97% of users in the reviewed configuration data had one agent. A direct action could serve that default, with alternatives available when needed.",
      },
      {
        title: "An answer needs its evidence.",
        body: "Only 12 out of 1,000 messages received a tool-call click. The handoff should carry supporting context without requiring developers to open and select every detail.",
      },
      {
        title: "A link is not the investigation.",
        body: "An authenticated, client-rendered Seer page was not a reliable way for an external agent to read the underlying context. The flow needed to send usable content.",
      },
    ],
    problem: {
      title: "Developers had to reconstruct context that Seer already had.",
      paragraphs: [
        "Copying individual pieces could separate an answer from the question and evidence behind it. Sending everything every time could lose the distinction between a focused task and a broader continuation.",
        "The handoff needed an explicit scope, a useful payload, and confirmation that the destination received it.",
      ],
    },
    solution: {
      title: "Send the right context to the configured agent.",
      paragraphs: [
        "A response-level action sends a focused package. A conversation-level action sends the broader investigation. Both make the destination explicit and keep the default path direct.",
      ],
    },
    steps: [
      {
        title: "Keep the answer attached to its evidence.",
        paragraphs: [
          "The response payload includes the response, its tool calls, and the user’s last question. The navigation-level action carries the full conversation. Choosing the entry point defines the scope before the handoff happens.",
        ],
      },
      {
        title: "Make the usual action one click.",
        paragraphs: [
          "I explored a toolbar action, slash commands, isolated block copying, and range selection. The final split action sends directly to the configured agent; a separate caret retains agent selection and integrations. If no agent is configured, the flow points toward setup, where organization permissions may apply.",
        ],
      },
      {
        title: "Close the loop with a receipt.",
        paragraphs: [
          "Sending, success, and error states make the handoff legible. A visible receipt records the destination, and an error offers retry. Confirmation means the context was sent; it does not imply that the agent has generated or applied a fix.",
        ],
      },
    ],
    outcomeTitle: "An approved design, ready for implementation.",
    timeline: "Summer 2026",
    tools: "Figma",
  },
  "split-panel": {
    intro:
      "Sentry had a new SplitPanel in code, but designers still needed a matching Figma component and existing screens used different dividers. During my Design Foundations rotation, I built the Figma component, wrote its guidance, and planned the migration.",
    role: "Product design · Component architecture, documentation, migration",
    team: "Design Foundations · Scraps",
    prompt:
      "Drag the divider. Focus it and use arrow keys, Shift + arrows, Home, or End. Try stacking the panels.",
    signals: [
      {
        value: "40",
        label: "files in the audit",
        note: "A scattered set of implementations to understand before standardizing.",
      },
      {
        value: "25",
        label: "existing instances",
        note: "Similar dividers served different layouts and interaction models.",
      },
      {
        value: "1",
        label: "instance with keyboard / ARIA support",
        note: "The audited set exposed an accessibility gap, not just visual inconsistency.",
      },
    ],
    decisions: [
      {
        title: "Component structure",
        before: "Repeat every handle state across parent variants.",
        after: "Extract a handle primitive; compose it inside layout variants.",
      },
      {
        title: "Interaction",
        before: "Pointer behavior varies and keyboard support is rare.",
        after:
          "Make state, focus, and resizing behavior explicit in the shared pattern.",
      },
      {
        title: "Migration",
        before: "Treat all 25 instances as a bulk replacement.",
        after: "Prioritize close matches and identify API work and exclusions.",
      },
    ],
    evidence: [
      {
        file: "split-documentation.webp",
        width: 3456,
        height: 2166,
        title: "Making the system usable",
        caption:
          "Original Scraps documentation and component guidance from the internship presentation.",
        stage: "solution",
      },
    ],
    outcome:
      "The Figma component and documentation were delivered, the handle primitive was reused, and the first migration PR merged. My contribution connected the existing code foundation to the design library and established the first steps toward adoption.",
    reflection:
      "The key decision was the component boundary: state in the handle, layout in the parent. That made reuse and maintenance easier to reason about. A staged migration gave the team a way to build on that foundation.",
    next: "relative-time",
    brief: {
      title:
        "How might one shared split-panel pattern become usable across Sentry?",
      paragraphs: [
        "Connect the existing code component to Figma, interaction guidance, and a practical migration path, so teams can adopt consistent layout and resizing behavior.",
      ],
    },
    context: {
      title: "The code was ready. The design library needed to catch up.",
      paragraphs: [
        "Priscila had already merged the new SplitPanel implementation. During my Design Foundations rotation, I worked on its Figma counterpart, documentation, and the path from existing implementations to the shared component.",
        "A divider can look simple while carrying different layout assumptions, interaction states, and APIs. Before defining the design-system pattern, I needed to understand where those differences mattered.",
      ],
    },
    insights: {
      title: "Similar dividers concealed very different behavior.",
      paragraphs: [
        "I audited 40 files containing 25 instances. Only one instance in that audited set included keyboard and ARIA support. The opportunity went beyond making the divider look consistent: teams needed a common interaction model and guidance on where it belonged.",
      ],
    },
    findings: [
      {
        title: "Consistency includes access.",
        body: "The audit exposed a keyboard-support gap. Rest, hover, focus, and active states needed to be part of the pattern, not left to each screen.",
      },
      {
        title: "State and layout change for different reasons.",
        body: "Repeating handle states across twelve parent variants would duplicate maintenance. The handle could own its states while the panel defined layout.",
      },
      {
        title: "Adoption needs an order.",
        body: "The 25 instances were not interchangeable. Close matches could migrate first; others required API decisions, hook unification, or exclusion from this pattern.",
      },
    ],
    problem: {
      title:
        "Teams were still designing and building different dividers.",
      paragraphs: [
        "Without a matching Figma component and clear usage guidance, designers and engineers would continue working from different models. Without a migration plan, existing screens would retain their inconsistent behavior.",
        "The task was to make the component understandable, reusable, and possible to adopt incrementally.",
      ],
    },
    solution: {
      title: "Separate the handle’s state from the panel’s layout.",
      paragraphs: [
        "I built the Figma structure around a reusable handle primitive and two content slots, then connected it to documentation and a staged migration plan.",
      ],
    },
    steps: [
      {
        title: "Compose the layout instead of multiplying variants.",
        paragraphs: [
          "The panel supports sized and fill slots, horizontal and vertical orientations, and start or end placement. The extracted handle owns rest, hover, focus, and active states, avoiding duplication across twelve parent variants. I also corrected semantic stroke and fill token usage.",
        ],
      },
      {
        title: "Make the smaller part reusable.",
        paragraphs: [
          "Separating the handle made it useful in table and navigation contexts as well as split views. The documentation explains the component’s structure and behavior so teams can use the shared parts deliberately.",
        ],
      },
      {
        title: "Make migration part of delivery.",
        paragraphs: [
          "I organized existing instances into five migration tiers, beginning with close matches. Other tiers identified API decisions and hook unification; domain-specific controls that only looked similar stayed outside the migration. This gave engineers a practical sequence without assuming all 25 instances could be replaced the same way.",
        ],
      },
    ],
    outcomeTitle: "A library component with adoption underway.",
    timeline: "Summer 2026",
    tools: "Figma",
  },
  "relative-time": {
    intro:
      "“Three hours ago” is useful until a developer needs to compare the event with a log, a teammate’s report, or a deployment in another timezone. I redesigned Sentry’s relative-time hovercard and used it to establish a more consistent tooltip pattern.",
    role: "Product design · Audit, engineer interviews, component design",
    team: "Design Foundations · Scraps",
    prompt:
      "Change the timezone. Local time and UTC refer to the same instant—even when the calendar date changes.",
    signals: [
      {
        value: "3",
        label: "engineer interviews",
        note: "Qualitative input on reading and comparing time during investigations.",
      },
      {
        value: "55+",
        label: "screenshots reviewed",
        note: "An inventory across timestamp and tooltip surfaces.",
      },
      {
        value: "25+",
        label: "variants catalogued",
        note: "Enough inconsistency to justify a shared component structure.",
      },
    ],
    decisions: [
      {
        title: "Time context",
        before: "An exact timestamp requires a timezone assumption.",
        after: "Show local and UTC together, with a date on each row.",
      },
      {
        title: "Hierarchy",
        before: "Relative age, field meaning, and formatting compete.",
        after: "Use a contextual header above aligned timestamp rows.",
      },
      {
        title: "Reuse",
        before: "Each tooltip reimplements its own structure.",
        after:
          "Compose shared parts without importing irrelevant chart decoration.",
      },
    ],
    evidence: [
      {
        file: "time-final.webp",
        width: 1100,
        height: 644,
        title: "The final timestamp pattern",
        caption:
          "Original final hovercard: relative age, local time, and UTC presented together.",
        stage: "solution",
      },
      {
        file: "time-inventory.webp",
        width: 1580,
        height: 1718,
        title: "The variation behind one small hover",
        caption:
          "Original tooltip inventory documenting the breadth of patterns across surfaces.",
        stage: "insights",
      },
      {
        file: "time-comparison.webp",
        width: 1580,
        height: 1718,
        title: "Checking the pattern in context",
        caption:
          "Original before-and-after comparisons used to assess hierarchy and consistency.",
        stage: "solution",
      },
    ],
    outcome:
      "The Figma component and design specification were complete. Code PRs had been submitted and implementation was in progress, with staged adoption still needed across existing timestamp surfaces.",
    reflection:
      "Consistency matters when it removes an assumption. Keeping local and UTC readings together lets the interface explain the conversion, so the developer can focus on comparing the evidence.",
    next: "message-queuing",
    brief: {
      title:
        "How might a small timestamp reveal the exact moment without extra interpretation?",
      paragraphs: [
        "Give developers relative age, local time, and UTC in one readable hovercard, then define shared tooltip parts that related surfaces can reuse.",
      ],
    },
    context: {
      title: "“Three hours ago” is only the beginning of an investigation.",
      paragraphs: [
        "Relative time helps a developer orient themselves quickly. Comparing an event with a log, a deployment, or a teammate’s report requires the exact moment and a clear timezone.",
        "Sentry’s timestamp behavior was spread across three implementations and multiple surfaces. Some hovers exposed UTC without local time, while preferences that affected interpretation were difficult to discover.",
      ],
    },
    insights: {
      title: "One small hover carried several kinds of context.",
      paragraphs: [
        "I interviewed three engineers and inventoried more than 55 screenshots and 25 variants. The interviews provided qualitative insight into comparing events, while the inventory showed how timestamp and tooltip patterns varied across the product.",
        "My competitive audit documented local time in Datadog, local and UTC in Vercel, and UTC in PostHog at the time of the research. Those different approaches helped me compare the trade-offs before defining a pattern for Sentry.",
      ],
    },
    findings: [
      {
        title: "Orientation and precision belong together.",
        body: "Relative age provides a quick reading; an exact timestamp supports correlation. The hovercard needed to support both without forcing a choice.",
      },
      {
        title: "The timezone can change the date.",
        body: "A local clock and a UTC clock can refer to different calendar days. Keeping a date on each row removes an important assumption.",
      },
      {
        title: "Reuse the structure, not every decoration.",
        body: "Timestamp cards and chart tooltips have related content needs. Shared parts can improve consistency without forcing irrelevant chart indicators into a timestamp.",
      },
    ],
    problem: {
      title: "An exact timestamp still left room for interpretation.",
      paragraphs: [
        "When a hover omitted local time or left the timezone unclear, the reader had to convert or investigate the formatting before comparing evidence. Inconsistent tooltip structures added another layer of interpretation across surfaces.",
        "The design needed to make the event’s meaning and its time representation clear at the same glance.",
      ],
    },
    solution: {
      title: "One instant, shown in two useful ways.",
      paragraphs: [
        "The final pattern pairs a contextual header and relative age with aligned local and UTC rows. A composable tooltip structure carries the same clarity into related components.",
      ],
    },
    steps: [
      {
        title: "Give each reading its context.",
        paragraphs: [
          "A header such as First seen or Last seen explains what the timestamp describes. Each row then includes its timezone, date, and time. Both represent the same instant, even when the calendar day changes.",
        ],
      },
      {
        title: "Make comparison easy to scan.",
        paragraphs: [
          "Aligned date and clock columns let the eye compare values directly. Tabular numerals keep numeric alignment stable, while labels retain proportional typography.",
        ],
      },
      {
        title: "Build shared parts with clear responsibilities.",
        paragraphs: [
          "I defined a header, body, footer, and pointer that related tooltips can compose as needed. A chart may need a series indicator; a timestamp does not. Before-and-after comparisons helped assess the hierarchy in context.",
        ],
      },
    ],
    outcomeTitle: "A completed design-system pattern, moving into code.",
    timeline: "Summer 2026",
    tools: "Figma",
  },
};
