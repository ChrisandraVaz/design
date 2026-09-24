"use client";
import Link from "next/link";
import EditorialIcon from "./EditorialIcon";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiPause,
  FiPlay,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { SentryDemo, SeerMark } from "./SentryDemos";
import { sentryProjects, type SentryProjectId } from "@/lib/sentry/projects";
import "@/app/projects/trace/travel-case.css";
import "@/app/projects/trace/trace-editorial.css";
import "./sentry-editorial.css";
import SentryStoryNavigation from "./SentryStoryNavigation";
import { useTheme } from "@/hooks/useTheme";
import "./sentry-story-polish.css";
import QueueConceptSketch from './QueueConceptSketch';
import TooltipComposition from './TooltipComposition';
import QueueFlowWalkthrough from "./QueueFlowWalkthrough";
import { RelativeTimeGallery, RelativeTimeSpecimen } from "./SentryReferencePreviews";

const openingDeks: Record<SentryProjectId, string> = {
  "send-to-agent": "Designing the product contract between Sentry’s debugging agent and the coding agent where a developer continues the work.",
  "message-queuing": "",
  "split-panel": "",
  "relative-time": "A shared way to read time across Sentry’s issues, traces, and logs, shipped to production at the end of the internship.",
};
function Narrative({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="trace-narrative trace-problem-compact se-narrative"
    >
      <div>
        <span className="trace-kicker">{label}</span>
        <h2>{title}</h2>
      </div>
      <div className="trace-ecosystem-copy">{children}</div>
    </section>
  );
}
function Chapter({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="se-chapter">
      <header className="trace-section-heading">
        <span className="trace-kicker">{label}</span>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}
function Source({
  file,
  caption,
  width = 1600,
  height = 1000,
  hideCaption = false,
  nativeSize = false,
}: {
  file: string;
  caption: string;
  width?: number;
  height?: number;
  hideCaption?: boolean;
  nativeSize?: boolean;
}) {
  return (
    <figure className="se-source" style={nativeSize ? { maxWidth: width, marginInline: "auto" } : undefined}>
      <a href={`/assets/sentry/${file}`} target="_blank" rel="noreferrer">
        <Image
          src={`/assets/sentry/${file}`}
          alt={caption}
          width={width}
          height={height}
          unoptimized
        />
      </a>
      {!hideCaption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
function LiveDemo({
  kind,
  title,
  children,
}: {
  kind: SentryProjectId;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id="try-it"
      className={`se-live se-live-${kind}`}
      aria-label="Interactive solution"
    >
      <div className="trace-section-heading">
        <span className="trace-kicker">Try the interaction</span>
        <h2>{title}</h2>
        <p>{children}</p>
      </div>
      <div className="sentry-live-demo">
        <SentryDemo kind={kind} />
      </div>
    </section>
  );
}
function QueueLine({ children }: { children: ReactNode }) {
  return (
    <div className="se-queue-line">
      <span>{children}</span>
      <FiTrash2 />
    </div>
  );
}
function QueueCase() {
  return (
    <>
      <Narrative
        id="overview"
        label="Overview"
        title="A waiting state, not a backlog"
      >
        <p>Seer disabled its input while generating a response. Developers had to wait before submitting another question, even when it was relevant to the investigation already underway. I designed message queuing so they could submit questions during generation without interrupting the current response.</p>
        <p>On the AI/ML team, I took this from a six-tool audit through four design directions and the final Figma specification. I explored editing, reordering, and collapsing before settling on two visible pending messages with a delete action.</p>
      </Narrative>
      <Narrative
        id="the-problem"
        label="The problem"
        title="Seer blocked follow-ups while it was working"
      >
        <p>Seer investigates production problems by reading issue details, traces, and logs. While it works, a developer might spot another error or think of a question about a recent deploy. That question belongs to the investigation already underway.</p>
        <p>But the input was disabled during generation. Submitting a follow-up meant waiting for the current response to finish. My brief was to let developers submit a follow-up without interrupting the investigation or adding another panel to manage.</p>
      </Narrative>
      <aside className="queue-design-question" aria-label="Design question"><span>Design question</span><p>How might we let developers queue their next question without interrupting Seer’s investigation?</p></aside>
      <section id="solution" className="story-queue-solution">
        <div>
          <div className="trace-section-heading"><span className="trace-kicker">Solution</span><h2>An inline queue above the composer</h2></div>
          <p>Pending messages sit above the input, separate from the conversation. Developers can review or delete a question while Seer finishes its current response. Each message enters the conversation when its turn begins.</p>
          <p>I limited the queue to two pending messages to preserve space for the investigation. At capacity, the composer explains that a message must be removed before another can be added. The limit was a layout decision, not a validated usage threshold.</p>
        </div>
        <Source file="queue-slide-final.png" width={1143} height={1186} hideCaption caption="Two pending messages above the Seer composer, with individual delete actions" />
      </section>
      <Chapter
        id="insights"
        label="Insights"
        title="What the conversation data showed"
      >
        <div className="se-research-pair">
          <article>
            <strong>
              38<span>%</span>
            </strong>
            <h3>of conversations included follow-ups</h3>
            <p>
              Developers were already asking follow-up questions. The queue needed to support that habit while Seer was busy. Among conversations with a follow-up, 45% sent it within two minutes (median 138 seconds), so the queue is designed as a short-lived state rather than a backlog.
            </p>
          </article>
          <article>
            <strong>
              90<span>%</span>
            </strong>
            <h3>of messages were under 131 characters</h3>
            <p>
              Short messages supported compact rows and a delete-only MVP instead of an editing workflow. That was a design judgment informed by the data, not proof that editing would never be useful. Long messages still needed full-text access.
            </p>
          </article>
        </div>
        <p className="se-caption">
          Seer conversation data reviewed during the project. These observations
          informed the design; they are not results of the proposed queue.
        </p>
      </Chapter>
      <Narrative
        id="context"
        label="Context"
        title="Comparing queues in six tools"
      >
        <p>I examined message queuing in Claude Code, Cursor, Codex, Figma Make, Google Antigravity, and Paradigm AI. I compared where pending messages appeared, how much of the text stayed visible, and whether users could edit, reorder, collapse, or inject a message into the active turn.</p>
        <p>The audit gave me several directions to try. Some tools let users manage a backlog; others let a new message change the active turn. For Seer, I needed to decide how much of that control was useful when someone simply wanted to ask their next question.</p>
      </Narrative>

      <Source file="queue-competitive-research.png" width={609} height={504} nativeSize caption="My FigJam research board comparing message queuing in Claude Code, Cursor, Codex, Figma Make, Google Antigravity, and Paradigm AI." />

      <Chapter
        id="explorations"
        label="Exploration"
        title="Four queue directions"
      >
        <p className="se-reading-copy">I explored four directions, from a single pending message to a drawer with editing and ordering controls. The question was how much queue management belonged inside an active investigation. These were alternatives, not four steps of the final flow. The layout sketches below summarize how each direction organized the queue.</p>
        <Source file="queue-concept-explorations.png" width={985} height={790} nativeSize caption="A zoomed-in view of my Concepts A–D exploration board, showing queue layouts and interaction states." />
        <div className="se-concept-decisions">
          {[
            {
              mode: "final",
              title: "A. Simplest",
              text: "One pending message above the composer, with delete only. No editing or reordering. I kept the direct placement and delete-only control, then expanded the final queue to two pending messages.",
            },
            {
              mode: "controls",
              title: "B. Most complex",
              text: "A counted drawer with multiple messages, editing, reordering, push-to-top, deletion, and injection into the active chat. I set this aside because managing a backlog added states beyond the immediate follow-up task.",
            },
            {
              mode: "reorder",
              title: "C. Middle ground",
              text: "Multiple messages in a counted drawer, with inline editing and deletion. No reordering or push-to-top. I dropped editing and the drawer to avoid save/cancel and hidden-queue states in the first version.",
            },
            {
              mode: "collapsed",
              title: "D. Collapsible queue",
              text: "Collapsing saved 56px in this exploration. In critique, that saving did not justify hiding the questions and making users reopen the queue to inspect them.",
            },
          ].map((c) => (
            <figure key={c.title}>
              <QueueConceptSketch mode={c.mode} />
              <figcaption>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <h3>From four concepts to the combined direction</h3>
        <p className="se-key-shift">The key shift: the queue is a waiting state, not a backlog to manage.</p>
        <p>Critique brought me back to the purpose of the queue: a short-lived waiting state, not a backlog to manage. A developer might leave the tab while Seer worked. The final direction combined A’s restrained controls with two visible pending messages, without editing, reordering, injection, or a collapsible drawer. The working board labels this combined direction Concept E.</p>
        <p>The exploration raised specific questions: should deleting a message trigger confirmation, does closing the drawer hide or cancel its contents, and does editing preserve the original text? Removing the drawer and editing controls eliminated those additional states. Deletion removes the pending row without an extra toast.</p>
        <Source file="queue-delete-options.png" width={908} height={752} caption="My comparison of delete-control placement and visibility: a separate button, an action inside the message, and a hover-only action, with the tradeoffs documented beside each option." />
        <div className="queue-option-comparison">
          <article><h3>Separate remove button</h3><p>Easy to spot, but the separate bordered control made one message look like two attached components.</p></article>
          <article><h3>Action inside the pill</h3><p>A single, coherent row. The action needed enough contrast to remain discoverable without dominating the message.</p></article>
          <article><h3>Hover-only action</h3><p>A quieter default state, but developers would have to discover how to remove a pending request.</p></article>
        </div>
        <p>The final handoff uses a trash icon inside the pending row, with a hover explanation. It communicates deletion more precisely than an ×, which could read as dismissing the interface.</p>
      </Chapter>

      <div id="interaction-details" className="se-queue-details">
        <article>
          <div className="se-message-pair">
            <span className="se-sent-message">
              Which errors should engineering look at first?
            </span>
            <QueueLine>
              Which errors should engineering look at first?
            </QueueLine>
          </div>
          <h3>Make pending look different from sent</h3>
          <p>
            Muted text and a neutral row distinguish a pending question from a sent chat bubble. The question becomes part of the conversation only when its turn begins.
          </p>
        </article>
        <article>
          <div className="se-delete-study">
            <QueueLine>Are they tied to the same deploy?</QueueLine>
            <span>Delete pending message.</span>
          </div>
          <h3>Keep the action specific</h3>
          <p>
            I chose a trash icon because it means delete; an × could read as dismissing the UI. Removing the row is the feedback, so I left out a deletion toast that would compete with the conversation.
          </p>
        </article>
        <article>
          <div className="se-capacity-study">
            <QueueLine>Which errors should we look at first?</QueueLine>
            <QueueLine>Are they tied to the same deploy?</QueueLine>
            <div>Clear queue to type a new message</div>
          </div>
          <h3>Explain what happens at the limit</h3>
          <p>
            At two pending messages, the composer explains why it is unavailable and how to make room. Truncated questions retain a full-text affordance, so users can inspect what they are about to delete.
          </p>
        </article>
      </div>
      <Narrative label="Interaction boundaries" title="Deleting a question and stopping Seer are different actions">
        <p>A queued message has not started processing. Deleting it removes only that future request. It leaves the active response and the other pending question intact.</p>
        <p>Stop and cancel had unresolved frontend and backend behavior, so I kept them on a separate project track. Adding interruption controls would have tied the queue to that unresolved work.</p>
      </Narrative>
      <Chapter id="queue-handoff" label="Engineering handoff" title="Defining when pending becomes sent">
        <p>I specified the sent and pending message styles, the delete hover state, and full-text access for truncated messages. The flow shows when the composer disables at two pending messages and re-enables as the first message enters the conversation. Removing a queued message does not interrupt the active response.</p>
        <ol className="queue-handoff-sequence"><li>Submit the initial request</li><li>Queue the first question</li><li>Reach the two-message limit</li><li>Inspect the delete action</li><li>Release the first question</li><li>Read the remaining long message</li><li>Send the remaining question</li><li>Complete the response</li></ol>
      </Chapter>
      <Narrative
        id="the-outcome"
        label="The outcome"
        title="The final specification"
      >
        <p>I delivered the final Figma flow and behavior specification: submission during generation, two pending slots, ordered processing, deletion, full-text access, and feedback at capacity. Editing, reordering, and injection were left out of the final specification. I presented the specification, with my three other projects, to Sentry’s CTO, CFO, Chief of Staff, and Head of Design at the end of the internship.</p>
        <p>My deliverable was the design specification; I do not have a confirmed release outcome or post-release usage results. The next validation would be a developer trying to queue a follow-up without guidance: can they tell what is waiting, what is running, and what deleting a message will do? I would also track how often the two-message limit is reached before considering more capacity.</p>
      </Narrative>
      <Chapter id="try-it" label="The final interaction" title="Walk through the eight handoff states">
        <p>Queue the prepared questions using the send button. Hover or focus a pending message to read it, or use its trash control to delete it. Advance the response to see each question enter the conversation. The arrows let you inspect every state from the handoff.</p>
        <QueueFlowWalkthrough />
      </Chapter>
      <Chapter id="takeaways" label="Takeaways" title="What I took away">
        <div className="story-lessons">
          <article><EditorialIcon kind="queue" /><h3>Simplicity was a decision, not a default</h3><p>I explored reordering, injection, editing, and collapsing, and cut each one with a reason: 90% of messages under 131 characters, follow-ups arriving within two minutes, a 56px saving that hid the questions. Every feature I removed had evidence behind it, which is what made the minimal answer defensible in critique.</p></article>
          <article><EditorialIcon kind="measure" /><h3>Know what the data can and cannot say</h3><p>Message length told me how much space and editing support to offer. It did not tell me the right queue size. Keeping that line clear made the two-message limit a decision I could explain and revisit, rather than a number I had to defend.</p></article>
          <article><EditorialIcon kind="states" /><h3>The small states are the spec</h3><p>Long text, deletion, capacity, and the moment a pending question becomes a sent one: writing those rules down mattered as much as choosing the layout. Engineers build from states, not from the hero screen, so that is where I now spend the last mile.</p></article>
        </div>
      </Chapter>
    </>
  );
}
function AgentButton({ name = "Claude" }: { name?: "Claude" | "Cursor" }) {
  return (
    <span className="se-agent-button">
      <Image
        src={`/assets/sentry/logo-${name.toLowerCase()}.svg`}
        width={18}
        height={18}
        alt=""
        unoptimized
      />
      <span className="se-agent-button-caret">
        <FiChevronDown />
      </span>
    </span>
  );
}
function PayloadStudy({ whole = false }: { whole?: boolean }) {
  return (
    <div className={`se-payload ${whole ? "whole" : "response"}`}>
      <header>
        <span>{whole ? "Conversation handoff" : "Response handoff"}</span>
        <span>
          <FiCopy />
          <SeerMark />
        </span>
      </header>
      <div className="se-payload-messages">
        <span className="se-payload-scope">
          {whole ? "Included · full conversation" : "Not included · earlier turns"}
        </span>
        <div className="se-payload-old">
          <i />
          <i />
        </div>
        <span className="se-payload-scope included">Included · immediate context</span>
        <div className="se-payload-question">
          What changed in the latest deploy?
        </div>
        <div className="se-payload-tools">
          <FiCheck /> Inspected issues and recent releases
        </div>
        <div className="se-payload-answer">
          <strong>Checkout errors increased after the release.</strong>
          <p>
            The response, its tool calls, and the question that led to them
            travel together.
          </p>
        </div>
        <div className="se-payload-actions">
          <span><FiCheck /> {whole ? "Conversation packaged" : "3 related items packaged"}</span>
        </div>
      </div>
    </div>
  );
}
function AgentCase() {
  return (
    <>
      <nav className="se-case-index" aria-label="Send to Agent case study chapters">
        <a href="#the-problem">Problem</a>
        <a href="#context">System</a>
        <a href="#interaction">Interaction</a>
        <a href="#the-outcome">Outcome</a>
      </nav>
      <Narrative
        id="overview"
        label="Overview"
        title="Seer could explain the issue. The work still stopped before the fix."
      >
        <p>Seer investigates production issues using traces, logs, releases, and issue details. Developers then move to Claude or Cursor to change the code. The product could explain the failure, but it could not carry that reasoning into the tool where implementation began.</p>
        <p>I designed the handoff between those two workflows. My scope covered the entry points, payload rules, destination logic, permissions, and feedback states. The design had to make a small button communicate a consequential transfer.</p>
      </Narrative>

      <section id="the-problem" className="se-agent-journey" aria-labelledby="handoff-gap-title">
        <header>
          <span className="trace-kicker">The broken handoff</span>
          <h2 id="handoff-gap-title">The useful context ended at the product boundary.</h2>
          <p>A copied link looked convenient, but a coding agent could not depend on Sentry authentication or a client-rendered page. The transferable object had to be the investigation content itself.</p>
        </header>
        <ol>
          <li><span>01</span><strong>Observe</strong><p>An issue, trace, or alert starts the investigation.</p></li>
          <li><span>02</span><strong>Investigate</strong><p>Seer connects the question to product evidence.</p></li>
          <li className="is-friction"><span>03</span><strong>Rebuild context</strong><p>Copy blocks, gather links, switch tools, and explain it again.</p></li>
          <li><span>04</span><strong>Implement</strong><p>The coding agent writes and tests the change.</p></li>
        </ol>
      </section>

      <Chapter
        id="insights"
        label="Evidence"
        title="Behavior pointed to a direct handoff, not another export menu."
      >
        <div className="se-agent-evidence">
          <article>
            <strong>97<span>%</span></strong>
            <div><h3>One destination was already configured</h3><p>Among users with an agent integration, nearly everyone had one destination. The primary action could use that choice instead of asking again.</p></div>
          </article>
          <article>
            <strong>541</strong>
            <div><h3>Session-copy actions in 30 days</h3><p>306 clipboard events plus 235 copied session links showed an existing transfer behavior. I treated this as directional evidence, not proof of why each person copied.</p></div>
          </article>
          <article className="is-note">
            <span>Research boundary</span>
            <p>Block copying had only just launched, so its 45 events were not an equal comparison. Later weekly usage ranged from 114 to 336 events. The data supported the need to transfer context; it did not determine the interface by itself.</p>
          </article>
        </div>
      </Chapter>

      <Narrative
        id="context"
        label="System definition"
        title="The design problem was a contract between two agents."
      >
        <p>Four decisions had to stay aligned: where the action appears, what context it selects, which destination receives it, and what Sentry can truthfully confirm. Treating them as one contract prevented the interface from promising more than the integration could deliver.</p>
        <p>The key rule was visible scope. An action beside a response sends that response with its immediate evidence. An action in the chat header sends the complete conversation.</p>
      </Narrative>

      <div className="se-agent-contract" aria-label="Send to Agent product contract">
        <article><span>01 · Trigger</span><h3>Place the action where scope is visible.</h3><p>Response actions select one answer. The header action selects the full investigation.</p></article>
        <article><span>02 · Payload</span><h3>Send meaning, not a fragile link.</h3><p>Package the user question, related tool calls, and Seer’s response as readable context.</p></article>
        <article><span>03 · Route</span><h3>Use the configured agent by default.</h3><p>Keep alternate destinations and setup behind the adjoining menu.</p></article>
        <article><span>04 · Receipt</span><h3>Confirm transfer, not resolution.</h3><p>“Sent” means the context reached the agent. It does not mean the code changed or the issue closed.</p></article>
      </div>

      <Chapter label="Payload model" title="A response is only useful with the evidence that produced it.">
        <p className="se-reading-copy">I compared sending a single block, a selected range, and the complete session. A block dropped the question and tool output that made the answer meaningful. A selected range added work and could still omit the wrong turn. The final model offers two predictable packages.</p>
      </Chapter>
      <div className="se-payload-comparison">
        <figure>
          <PayloadStudy />
          <figcaption>
            <span>Response action</span>
            <h3>Continue from one useful answer</h3>
            <p>The latest question, its related tool calls, and the response travel as one package. Earlier turns stay behind.</p>
          </figcaption>
        </figure>
        <figure>
          <PayloadStudy whole />
          <figcaption>
            <span>Header action</span>
            <h3>Continue the complete investigation</h3>
            <p>Every turn travels together when earlier reasoning still matters to the next step.</p>
          </figcaption>
        </figure>
      </div>

      <Narrative
        id="solution"
        label="Destination logic"
        title="The primary click should finish the common decision."
      >
        <p>With one configured destination, the agent icon sends immediately. The caret opens secondary choices: another agent or integration setup. This keeps the frequent path to one click while preserving control for less common configurations.</p>
        <p>I explored a larger labeled split button and three slash-command structures. The toolbar button won because it was discoverable in context without giving a secondary action too much weight.</p>
      </Narrative>
      <div className="se-agent-configurations">
        <figure>
          <div className="se-config-art">
            <span className="se-agent-button"><SeerMark /><FiChevronDown /></span>
            <div className="se-agent-menu">
              <p>No Agents Configured</p>
              <span><FiPlus /> Add Integration</span>
            </div>
          </div>
          <figcaption><span>Setup state</span><h3>No agent configured</h3><p>Route to integration settings. Setup may require an admin, so this state cannot look like a failed transfer.</p></figcaption>
        </figure>
        <figure>
          <div className="se-config-art">
            <AgentButton />
            <div className="se-direct-route">↓<span>Send directly to Claude</span></div>
          </div>
          <figcaption><span>Primary path</span><h3>One configured destination</h3><p>The main button sends directly to Claude. The caret remains available without interrupting the common path.</p></figcaption>
        </figure>
        <figure>
          <div className="se-config-art">
            <AgentButton />
            <div className="se-agent-menu">
              <span><Image src="/assets/sentry/logo-claude.svg" alt="" width={16} height={16} unoptimized /> Send to Claude Agent</span>
              <span><Image src="/assets/sentry/logo-cursor.svg" alt="" width={16} height={16} unoptimized /> Send to Cursor Agent</span>
              <span><FiPlus /> Add Integration</span>
            </div>
          </div>
          <figcaption><span>Choice state</span><h3>More than one destination</h3><p>The menu names every available agent and keeps integration setup in the same predictable place.</p></figcaption>
        </figure>
      </div>

      <Narrative
        id="interaction"
        label="Feedback model"
        title="The receipt reports the transfer, not the future fix."
      >
        <p>The receiving agent did not automatically return a completed fix to Seer. The success state therefore confirms only that the selected context was transferred. The original conversation remains available, and a failure never removes the investigation.</p>
        <p>I worked with engineering and PM to separate a send acknowledgement from any future polling or session-status behavior. That product boundary shaped the copy, duration, and recovery action for every state.</p>
      </Narrative>
      <div className="se-handoff-states" aria-label="Handoff feedback states">
        <article><span className="se-state-indicator pending" /><span>Transient</span><h3>Sending to Claude…</h3><p>Name the destination and hold the state long enough to register.</p></article>
        <article><span className="se-state-indicator success" /><span>Confirmed</span><h3>Response sent</h3><p>Confirm the payload and destination while keeping the conversation in place.</p></article>
        <article><span className="se-state-indicator error" /><span>Recoverable</span><h3>Couldn’t send</h3><p>Keep the investigation intact and provide a retry path without implying lost work.</p></article>
      </div>
      <LiveDemo kind="send-to-agent" title="Follow the handoff from selection to receipt.">
        Send the current response, inspect the destination menu, then switch to
        the recoverable error path. The demo preserves the conversation in every state.
      </LiveDemo>

      <figure className="se-agent-artifact se-source" aria-labelledby="artifact-title">
        <div className="se-agent-artifact-frame">
          <Image
            src="/assets/sentry/agent-action-patterns.png"
            alt="Figma exploration comparing response-level and chat-level Send to Agent actions"
            width={1365}
            height={1017}
            unoptimized
          />
        </div>
        <figcaption id="artifact-title"><strong>Working artifact</strong> I compared the payload selected by an action beside a response with the payload selected by an action in the chat header.</figcaption>
      </figure>

      <Narrative
        id="the-outcome"
        label="Outcome"
        title="The approved design turned a button into a defined product boundary."
      >
        <p>The team approved the flow for implementation. The specification defined two entry points, two payload scopes, the configured-destination shortcut, setup and permission paths, and sending, success, and recovery feedback.</p>
        <p>The work ended before post-release results were available. I would measure completed and failed handoffs alongside manual-copy behavior, then study whether developers can begin useful work in the receiving agent without supplying more context. That is the real test of the handoff.</p>
      </Narrative>
    </>
  );
}
function SplitCase() {
  return (
    <>
      <Narrative
        id="overview"
        label="Overview"
        title="One split panel the whole product can share"
      >
        <p>In Sentry, a split panel lets developers widen a replay or open Seer beside an issue list. Priscila had already merged a shared SplitPanel in code when I joined the Design Foundations rotation. Designers still needed a matching component and guidance for using it.</p>
        <p>I built the Figma counterpart, wrote the usage guidelines, extracted a reusable drag handle with the team, and audited existing implementations to plan and begin migration. My job was to connect the new code component to the way teams design and maintain the product.</p>
      </Narrative>
      <Narrative
        id="the-problem"
        label="The problem"
        title="One divider, inconsistent behavior."
      >
        <p>Teams had built resizable panels independently. Similar lines concealed different assumptions about layout, interaction states, and keyboard behavior. In the instances I audited, only one had keyboard support and ARIA attributes.</p>
        <p>A common visual treatment would leave those differences unresolved. The component needed a shared interaction model, a design representation of its code API, and a realistic path for existing screens to adopt it.</p>
      </Narrative>
      <div className="se-split-recording">
        <video
          controls
          playsInline
          preload="metadata"
          aria-label="Original Split Panel recording in Session Replay and Seer"
        >
          <source
            src="/assets/sentry/split-panel-motion.mp4"
            type="video/mp4"
          />
        </video>
        <p className="se-caption">
          The existing interaction in Session Replay and Seer. Original product
          recording.
        </p>
      </div>
      <Chapter
        id="context"
        label="Context"
        title="The audit showed the scale of the inconsistency."
      >
        <div className="se-split-audit">
          <article>
            <strong>40</strong>
            <h3>files reviewed</h3>
          </article>
          <article>
            <strong>25</strong>
            <h3>instances identified</h3>
          </article>
          <article>
            <strong>1</strong>
            <h3>with keyboard and ARIA support</h3>
          </article>
        </div>
        <p className="se-reading-copy">
          These counts describe the set I reviewed. I traced how each instance was built so the migration could account for its layout, API dependencies, and accessibility behavior.
        </p>
      </Chapter>
      <Narrative
        id="insights"
        label="Insights"
        title="Twelve parent variants were repeating the same handle states."
      >
        <p>My first Figma structure kept the drag handle inside SplitPanel. Twelve parent variants repeated its interaction states. Each additional layout option meant maintaining behavior that was already defined elsewhere in the component.</p>
        <p className="se-key-shift">The key shift: the panel owns layout, the handle owns interaction.</p>
        <p>After aligning with Priscila and Nate, I extracted the handle into a nested primitive and exposed its properties. <strong>The panel owns layout; the handle owns interaction.</strong> A future affordance, such as a mobile thumb, could then be added in one place and used by each parent.</p>
      </Narrative>
      <div className="se-component-contract" aria-label="Split Panel component responsibilities">
        <article><span className="trace-kicker">SplitPanel</span><h3>Where the content goes</h3><p>Sized + fill slots<br />Horizontal / vertical<br />Start / end placement</p></article>
        <span className="se-contract-connector" aria-hidden="true">↔</span>
        <article><span className="trace-kicker">Drag handle</span><h3>How resizing behaves</h3><p>Rest + hover<br />Focus + active<br />Reusable across parent layouts</p></article>
      </div>
      <div className="se-handle-study" aria-label="Drag handle states in both orientations">
        {(["vertical", "horizontal"] as const).map((orientation) => (
          <div className={`se-handle-row is-${orientation}`} key={orientation}>
            <p className="se-handle-row-label">{orientation === "vertical" ? "Vertical handle · horizontal split" : "Horizontal handle · vertical split"}</p>
            {[["Rest", 0], ["Hover", 1], ["Active", 3], ["Focus", 2]].map(([state, code]) => (
              <figure key={`${orientation}-${state}`}>
                <div data-state={code} data-orientation={orientation}>
                  <span>Sized pane</span>
                  <i />
                  <span>Fill pane</span>
                </div>
                <figcaption>{state}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
      <Narrative
        id="solution"
        label="Solution"
        title="A shared contract for layout and interaction."
      >
        <p>I built the component around <strong>sized</strong> and <strong>fill</strong> slots, matching the code API. Designers can place their own content into either pane, choose horizontal or vertical orientation, and position the sized pane at the start or end.</p>
        <p>I wrote the usage guidelines first, before the Figma variants, because documentation should ship with the component rather than follow it. The extracted drag handle is also used by the content-slider diff component, so a future affordance such as a mobile thumb is added once and inherited everywhere. I also corrected a semantic stroke/fill token mismatch: a divider that looked right in one theme still needed to use the right token in the others.</p>
      </Narrative>
      <Source
        file="split-scraps.png"
        width={1363}
        height={853}
        caption="SplitPanel in Scraps: documented properties, a live example, and the corresponding code."
      />
      <LiveDemo kind="split-panel" title="Give either pane more room.">
        Drag the divider or use the arrow keys. Shift changes the increment;
        Home and End move to the limits. Double-click to reset, or switch to a
        vertical layout.
      </LiveDemo>
      <Narrative
        id="adoption"
        label="Adoption"
        title="A shared component needs an adoption path."
      >
        <p>I reviewed 40 files and identified 25 instances, then grouped the migration into five tiers. The first two contained the closest matches. Starting there let us establish the pattern in small PRs before changing APIs or shared hooks.</p>
        <p>The remaining tiers separated cases needing API decisions, cases blocked on hook unification, and controls that belonged to a different domain. A similar-looking line was not enough reason to replace a component. The migration had to preserve the job each control performed.</p>
      </Narrative>
      <div className="se-migration-plan" aria-label="Five-tier migration plan">
        {[
          ["01 and 02", "Closest matches", "Start with instances that already fit the shared behavior."],
          ["03", "API decisions", "Resolve differences in the component contract before replacing callers."],
          ["04", "Shared hooks", "Unify the underlying resize behavior before moving dependent instances."],
          ["05", "Different domain", "Keep controls with a different purpose outside this migration."],
        ].map(([tier, title, description]) => <article key={tier}><span>{tier}</span><h3>{title}</h3><p>{description}</p></article>)}
      </div>
      <Narrative
        id="the-outcome"
        label="The outcome"
        title="The library was live, and adoption had started."
      >
        <p>The Figma component and documentation were delivered, and the first migration PR merged. The reusable handle was also adopted in table and left-navigation work, extending beyond the original split-panel use case. I presented this work, with my three other projects, to Sentry’s CTO, CFO, Chief of Staff, and Head of Design at the end of the internship.</p>
        <p>The other instances remained on the staged migration plan. I learned to treat adoption as part of component design: a clear API, reliable interaction states, and small migration steps make a shared pattern practical. Completing the remaining migrations and checking keyboard and theme behavior would be the next measure of progress.</p>
      </Narrative>
      <Chapter id="takeaways" label="Takeaways" title="What this changed about my systems work">
        <div className="story-lessons">
          <article><EditorialIcon kind="layout" /><h3>Good component boundaries compound</h3><p>Twelve parent variants were mirroring one handle’s states. Extracting the drag handle gave the interaction a single home, and the same primitive went on to power table and left-navigation work I never planned for. Drawing the boundary well paid off beyond the component I was designing.</p></article>
          <article><EditorialIcon kind="audit" /><h3>Audit behavior, not appearance</h3><p>The dividers looked alike, but only one of 25 had keyboard support and ARIA attributes. The migration tiers came from what each control did and depended on, not from what it looked like. I now treat a visual audit as the start of the question, not the answer.</p></article>
          <article><EditorialIcon kind="adoption" /><h3>A component is done when teams use it, not when it merges</h3><p>Usage guidelines written first, MDX docs, and a five-tier migration plan turned a merged PR into a shared pattern. The first migration was progress, not the finish line, and planning that path is now part of how I define a component’s scope.</p></article>
        </div>
      </Chapter>
    </>
  );
}
function TimeCase() {
  return (
    <>
      <Narrative
        id="overview"
        label="Overview"
        title="One hovercard became a tooltip system"
      >
        <p>My Design Foundations brief was to design a canonical relative-time treatment and a detail hovercard for distributed debugging. TimeSince already supported relative formats, units, live updates, and timezones. The gap was a consistent presentation: what to show inline, which details belong on hover, and how teams reuse the pattern in Figma.</p>
        <p>I owned the product audit, three engineer interviews, and the Figma component family. My scope expanded beyond the original design brief to include production implementation and technical consolidation. I reviewed the work with design engineers and brought the designs to Product Design Crit. The relative-time component shipped at the end of my internship.</p>
      </Narrative>
      <Narrative
        id="the-problem"
        label="The problem"
        title="Reading timestamps took extra work"
      >
        <p>Sentry shows timestamps almost everywhere, but had no documented presentation standard across surfaces. Relative time had three separate implementations: the shared TimeSince component, a bespoke timeAgoCell, and the useRelativeDateTime hook. Duration had two competing components and a long tail of formatting utilities.</p>
        <p>Across six surfaces, last seen, first seen, the issue events chart, spans, logs, and the event detail card, each made different choices about labels, precision, and hover content. The audit surfaced a seventh case: bucketed charts represent a time range rather than a single moment, with no shared pattern for it.</p>
        <p>UTC appeared on hover by default. All three engineers I interviewed described relying on local time instead. Mental conversion added friction, and daylight saving changed the offset twice a year. Local time was available in settings, but discovering that setting was part of the problem. Product and frontend engineers had been asking for this improvement for over a year.</p>
        <p>The brief separated the inline treatment from the new details hovercard. The component had to support precision from minutes on an issues list to nanoseconds on a span, and hosts from dense table rows to chart tooltips. Keeping that distinction let me reuse an established inline pattern while designing the richer information revealed on hover.</p>
      </Narrative>
      <aside className="queue-design-question" aria-label="Design question"><span>Design question</span><p>How might we show time consistently across Sentry so engineers can read a timestamp without doing conversion in their head?</p></aside>
      <Chapter
        id="solution"
        label="Solution"
        title="Local time and UTC in one hovercard"
      >
        <div className="se-time-feature">
          <div className="se-time-example">
            <RelativeTimeSpecimen scene={0} />
          </div>
          <div className="se-time-explanation">
            <article>
              <span>01</span>
              <h3>Start with the context</h3>
              <p>
                First Seen or Last Seen explains what the time describes.
                Relative age gives a quick reading before the exact timestamp.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Show local time and UTC</h3>
              <p>
                Each row has its own timezone and date, so a day boundary does
                not get lost in the conversion.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Align what people compare</h3>
              <p>
                Dates and times get separate columns so midnight crossings remain visible. Tabular numerals align the values being compared; text labels keep their normal spacing.
              </p>
            </article>
          </div>
        </div>
      </Chapter>
      <Source
        file="time-product-context.png"
        width={1336}
        height={1194}
        caption="Before: timestamp hovers and chart tooltips used different content structures. The two timestamp captures show a date and clock time without an explicit timezone label; the new component pairs local time with UTC and labels both rows."
      />
      <Chapter
        id="context"
        label="Context"
        title="What I learned from three engineers"
      >
        <div className="se-split-audit">
          <article>
            <strong>3</strong>
            <h3>engineer interviews</h3>
          </article>
          <article>
            <strong>
              55<span>+</span>
            </strong>
            <h3>screenshots collected</h3>
          </article>
          <article>
            <strong>
              25<span>+</span>
            </strong>
            <h3>tooltip variations documented</h3>
          </article>
        </div>
        <p className="se-reading-copy">
          The engineers I spoke with used relative time to judge urgency and local time to connect events to their own day. One did not know the timezone setting existed; another described confusion around daylight saving. I treated these interviews as qualitative direction, then used the product audit to understand where a shared pattern could help.
        </p>
      </Chapter>
      <Narrative id="references" label="Reference study" title="Keep local time useful and UTC available">
        <p>In my internship research, Datadog paired relative time with the browser’s detected timezone. Vercel placed relative duration above local time and UTC, which gave me a useful content model. PostHog exposed a similar discoverability concern around timezone settings. I used those comparisons to define the information hierarchy without copying another tool’s visual treatment.</p>
        <p>I kept UTC for distributed debugging and added local time alongside it. The two rows let someone read the event in their own context while retaining a common reference for a teammate in another timezone. The brief also raised a configured organization timezone as a possibility; the delivered treatment shown here focuses on local time and UTC.</p>
      </Narrative>
      <Source
        file="time-competitive-audit.png"
        width={898}
        height={700}
        caption="My competitive audit in FigJam: Sentry, Datadog, Vercel, and PostHog, with product captures and comparison notes."
      />
      <Narrative
        id="insights"
        label="Insights"
        title="Auditing tooltips across Sentry"
      >
        <p>The audit exposed a shared problem beneath the original hovercard brief. Across more than 55 screenshots and 25 relevant variations, I found repeated differences in row structure, type size, color, and precision. Adding local time to one hovercard would leave those inconsistencies in the surrounding product. I used the audit to identify reusable structure while keeping Relative Time as the immediate application.</p>
        <p className="se-key-shift">The key shift: relative time is one composition of a tooltip system, not a component of its own.</p>
        <p>I reviewed those patterns with design engineers and separated the shared structure from the content it hosts. The wrapper and pointer form the shell; header, body, and footer rows are composable primitives. Relative time is one composition. A chart or latency tooltip can reuse the same structure without inheriting fields it does not need.</p>
      </Narrative>

      <Source file="time-figma-audit.jpg" width={4000} height={3288} caption="My working audit of timestamp and chart tooltips, including product captures and design notes. Open the image to inspect the board." />
      <Narrative
        id="component-design" label="Component design"
        title="Building reusable tooltip rows"
      >
        <p>A chart needs series labels and values. A bare timestamp may only need date rows. An event can need both occurred and received times. Bucketed charts need a start and end rather than a single timestamp. Reusing the same rows gives these tooltips a consistent reading order without forcing them to display identical fields.</p>
        <p>I mapped how frequently each treatment appeared and built a before-and-after table with a rationale for each change. In a design playground, I checked multiple chart series, locale formatting, and edge cases, then brought the work to Product Design Crit. The before-and-after table covered more than 15 treatments, and the final inventory documented over 25 relevant variations.</p>
      </Narrative>
      <TooltipComposition />
      <Chapter id="craft" label="Detail decisions" title="The rows had to hold up with real data">
        <div className="story-lessons">
          <article><EditorialIcon kind="align" /><h3>Align numbers without changing the typeface</h3><p>I used Rubik’s tabular numerals for numeric values. Labels such as month names kept proportional spacing. Separating the date and clock time made it easier to notice when local time and UTC fell on different days.</p></article>
          <article><EditorialIcon kind="hierarchy" /><h3>Choosing which details to show</h3><p>Heading tokens distinguished labels from content values. In event cards, latency moved to the top when it was the primary reading. I removed the purple series dot outside chart contexts because it no longer identified anything.</p></article>
          <article><EditorialIcon kind="precision" /><h3>Matching precision to the task</h3><p>A quick urgency check and a detailed telemetry inspection need different precision. The design accommodated minutes through seconds and finer values where the underlying data supported them, while keeping local time and UTC tied to the same instant.</p></article>
        </div>
      </Chapter>
      <Chapter id="try-it" label="Component family" title="Explore the tooltip variants">
        <p>Browse the eight variants shown in the cover preview. Use the arrows below or the left and right keys while the viewer is focused.</p>
        <RelativeTimeGallery />
        <Source file="time-figma-table.jpg" width={3011} height={4000} caption="Before-and-after explorations, organized by product surface with the reasoning for each variation. Open the board to inspect the details." />
      </Chapter>
      <Narrative
        id="library-handoff" label="Design-system organization"
        title="Organize the library around reuse"
      >
        <p>I moved the generic tooltip parts onto the main library page. Chart and relative-time compositions received their own pages under Overlays, making it clearer which parts were shared and which represented a specific use.</p>
        <p>I also took on the technical consolidation, which had originally been outside my design scope. The broader component needed a practical way into the codebase. With design engineers, I proposed starting with two or three high-impact patterns. The audit would guide later replacements and deprecation of the old patterns, so the team could migrate existing tooltips in stages without requiring every surface to change at once. A Date/Time format reference, modeled on the existing Number Formatting documentation, was a stretch deliverable in the brief, separate from the component itself.</p>
      </Narrative>
      <Source file="time-figma-playground.png" width={2396} height={1715} caption="The Figma playground showing timestamp, duration, chart, and event tooltip variations. Open the board for the full-size view." />
      <Narrative
        id="the-outcome"
        label="The outcome"
        title="Shipped at the end of my internship"
      >
        <p>I designed the Figma component family, reorganized the tooltip library, implemented the production component, and took on technical consolidation, incorporating design and engineering feedback. Relative Time shipped at the end of my internship, and I presented it, with my three other projects, to Sentry’s CTO, CFO, Chief of Staff, and Head of Design. The reusable rows support other tooltip patterns; migrating every existing tooltip remains a separate, staged effort.</p>
        <p>The next validation would use debugging tasks: can engineers correlate an event across local time and UTC without leaving the tooltip, including across a day boundary? I would pair that with migration coverage to check both sides of the work: whether the pattern is useful and whether teams are adopting it consistently.</p>
      </Narrative>
      <figure className="se-hero-art se-hero-relative-time story-outcome-preview">
        <div className="se-hero-product"><SentryDemo kind="relative-time" compact /></div>

      </figure>
      <Chapter id="takeaways" label="Takeaways" title="What I took away">
        <div className="story-lessons">
          <article><EditorialIcon kind="system" /><h3>Let the evidence widen the scope, not ambition</h3><p>I started with a hovercard. Fifty-five screenshots later the brief had become a tooltip system, because the same hierarchy and row problems kept appearing across the product. The wider scope came from repeated evidence in the interface, which is the only reason I would argue for it again.</p></article>
          <article><EditorialIcon kind="time" /><h3>Design for the timezone people actually live in</h3><p>Three interviews showed UTC was friction, not a feature: one engineer converted by hand and got it wrong twice a year. Showing local time and UTC together lets someone place an event in their own day and still hand a teammate a shared reference.</p></article>
          <article><EditorialIcon kind="migration" /><h3>Owning the code made the design accountable</h3><p>Taking on implementation and consolidation exposed what Figma hides: three competing implementations, precision that changes by surface, and a migration that had to keep old tooltips working. Shipping the component myself meant every design decision had to survive contact with the codebase.</p></article>
        </div>
      </Chapter>
    </>
  );
}
const openings: Record<
  SentryProjectId,
  { title: ReactNode; role: string; team: string; next: SentryProjectId }
> = {
  "message-queuing": {
    title: (
      <>
        Message Queuing for Seer
      </>
    ),
    role: "Product & interaction design",
    team: "AI and ML, Seer",
    next: "send-to-agent",
  },
  "send-to-agent": {
    title: (
      <>
        Move from diagnosis to implementation
        <br />
        without rebuilding context
      </>
    ),
    role: "Product & interaction design",
    team: "AI and ML, Seer",
    next: "split-panel",
  },
  "split-panel": {
    title: (
      <>
        Designing a shared
        <br />
        split panel
      </>
    ),
    role: "Component design & migration",
    team: "Design Foundations, Scraps",
    next: "relative-time",
  },
  "relative-time": {
    title: (
      <>
        Relative Time and Tooltips
      </>
    ),
    role: "Design Systems and Engineering",
    team: "Design Foundations, Scraps",
    next: "message-queuing",
  },
};
export default function SentryCaseStudy({ kind }: { kind: SentryProjectId }) {
  const [paused, setPaused] = useState(false);
  const { theme } = useTheme();
  const revised = kind === "message-queuing" || kind === "relative-time" || kind === "split-panel";
  const project = sentryProjects[kind],
    opening = openings[kind];
  return (
    <main
      className={`trace-case travel-case sentry-case sentry-editorial se-case-${kind}${revised ? " se-story-polished" : ""}`}
      data-theme={revised ? theme : "light"}
    >
      {revised ? <SentryStoryNavigation kind={kind} /> : <nav className="trace-nav">
        <Link href="/" aria-label="Back to home">
          ←
        </Link>
      </nav>}
      <div className="trace-opening trace-editorial-opening">
        <header className="trace-header">
          <span className="trace-kicker">
            {project.title}, {kind === "relative-time" ? "Shipped 2026" : "Sentry internship, 2026"}
          </span>
          <h1>{opening.title}</h1>
          {openingDeks[kind] && <p className="se-opening-dek">{openingDeks[kind]}</p>}
        </header>
        <figure className={`se-hero-art se-hero-${kind}`}>
          <div className="se-hero-product">
            <SentryDemo kind={kind} compact paused={paused} />
          </div>
          {!revised && (
          <button
            className="se-motion-control"
            onClick={() => setPaused(!paused)}
            aria-label={`${paused ? "Play" : "Pause"} interaction preview`}
          >
            {paused ? <FiPlay /> : <FiPause />}
          </button>
          )}
          <figcaption>
            {project.title}: an animated reconstruction of my design.
          </figcaption>
        </figure>
        <dl className="trace-project-facts">
          <div>
            <dt>Role</dt>
            <dd>{opening.role}</dd>
          </div>
          <div><dt>Timeline</dt><dd>Summer 2026</dd></div>
          <div><dt>Team</dt><dd>{opening.team}</dd></div>
          {revised && <div><dt>Skills</dt><dd>{kind === "split-panel" ? "Design systems, component APIs, accessibility, migration" : kind === "relative-time" ? "Design systems, research, frontend engineering" : "Product design, research, interaction design"}</dd></div>}
        </dl>
        {!revised && <p className="se-delivery-status">{project.status}</p>}
      </div>
      {kind === "message-queuing" ? (
        <QueueCase />
      ) : kind === "send-to-agent" ? (
        <AgentCase />
      ) : kind === "split-panel" ? (
        <SplitCase />
      ) : (
        <TimeCase />
      )}
      {revised ? <footer className="story-contact-footer"><p>Designed + Coded with ♡ by Chrisandra</p><nav aria-label="Contact links"><a href="https://ca.linkedin.com/in/chrisandra-vaz">LinkedIn</a><a href="mailto:chrisandravaz12@gmail.com">Email</a><a href="https://github.com/ChrisandraVaz">GitHub</a></nav></footer> : <footer className="trace-end">
        <Link href="/">← Back to the canvas</Link>
        <Link href={`/projects/sentry-${opening.next}`}>
          {sentryProjects[opening.next].title} →
        </Link>
      </footer>}
    </main>
  );
}
