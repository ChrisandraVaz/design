"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import {
  FiArrowUp,
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
import { RelativeTimeSpecimen } from "./SentryReferencePreviews";

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
}: {
  file: string;
  caption: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="se-source">
      <a href={`/assets/sentry/${file}`} target="_blank" rel="noreferrer">
        <Image
          src={`/assets/sentry/${file}`}
          alt={caption}
          width={width}
          height={height}
          unoptimized
        />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
function WorkingBoard({
  file,
  children,
}: {
  file: string;
  children: ReactNode;
}) {
  return (
    <details className="se-working-board">
      <summary>
        {children}
        <span>↗</span>
      </summary>
      <Source
        file={file}
        caption="Original working board from my internship presentation. Open the image to inspect it at full size."
      />
    </details>
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
      <p className="se-caption">Portfolio reconstruction with sample data.</p>
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
function QueueStudy({
  mode = "final",
}: {
  mode?: "blocked" | "final" | "controls" | "edit" | "collapsed";
}) {
  return (
    <div className={`se-queue-study mode-${mode}`}>
      <div className="se-study-chat">
        <SeerMark />
        <span>Investigating the latest deploy…</span>
      </div>
      <div className="se-study-response">
        <i />
        <i />
        <i />
      </div>
      <div className="se-study-pending">
        {mode === "collapsed" ? (
          <div className="se-collapsed">
            2 messages queued <FiChevronDown />
          </div>
        ) : (
          mode !== "blocked" && (
            <>
              <QueueLine>
                Which errors should engineering look at first?
              </QueueLine>
              {mode !== "edit" && (
                <QueueLine>Are they tied to the same deploy?</QueueLine>
              )}
              {mode === "controls" && (
                <div className="se-queue-tools">
                  Reorder <span>Edit</span>
                  <span>Send now</span>
                </div>
              )}
              {mode === "edit" && (
                <div className="se-edit-actions">
                  Cancel <span>Save message</span>
                </div>
              )}
            </>
          )
        )}
      </div>
      <div className="se-study-input">
        <span>
          {mode === "blocked"
            ? "Wait for Seer to finish…"
            : "Ask Seer a question…"}
        </span>
        {mode === "blocked" ? <FiPause /> : <FiArrowUp />}
      </div>
    </div>
  );
}
function QueueCase() {
  return (
    <>
      <Narrative
        id="overview"
        label="Overview"
        title="A follow-up should not have to wait for the input."
      >
        <p>I designed the first message-queuing flow for Seer, Sentry’s AI debugging agent. The proposed flow lets developers submit their next question while an investigation is running, then have Seer answer it in order.</p>
        <p>On the AI/ML team, I owned the competitive audit, four interaction directions, critique iterations, and final Figma specification. The central decision was how much control a short-lived queue actually needed.</p>
      </Narrative>
      <Narrative
        id="the-problem"
        label="The problem"
        title="Seer blocked follow-ups while it was working."
      >
        <p>Seer investigates production problems by reading issue details, traces, and logs. While it works, a developer might spot another error or think of a question about a recent deploy. That question belongs to the investigation already underway.</p>
        <p>But the input was disabled during generation. Submitting a follow-up meant waiting for the current response to finish. My brief was to remove that interruption while keeping the active investigation intact.</p>
      </Narrative>
      <div className="se-before-after">
        <figure>
          <QueueStudy mode="blocked" />
          <figcaption>
            <strong>Before</strong> The composer is unavailable while Seer
            works.
          </figcaption>
        </figure>
        <figure>
          <QueueStudy />
          <figcaption>
            <strong>Proposed</strong> Submit the follow-up and keep its place in
            the conversation.
          </figcaption>
        </figure>
      </div>
      <Chapter
        id="insights"
        label="Insights"
        title="Follow-ups were common. Most messages were short."
      >
        <div className="se-research-pair">
          <article>
            <strong>
              38<span>%</span>
            </strong>
            <h3>of conversations included follow-ups</h3>
            <p>
              This was an existing conversation pattern to support, rather than a new behavior to introduce.
            </p>
          </article>
          <article>
            <strong>
              90<span>%</span>
            </strong>
            <h3>of messages were under 131 characters</h3>
            <p>
              Short messages made compact rows a reasonable starting point. The remaining long messages still needed a readable full-text state.
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
        title="The audit gave me options. Seer’s workflow gave me a filter."
      >
        <p>I examined message queuing in Claude Code, Cursor, Codex, Figma Make, Google Antigravity, and Paradigm AI. I compared where pending messages appeared, how much of the text stayed visible, and whether users could edit, reorder, collapse, or inject a message into the active turn.</p>
        <p>Those controls solve different problems. Reordering manages a backlog; injection changes work already in progress. Here, the immediate need was to hold a follow-up until Seer was ready. I used that distinction to evaluate four directions in design critiques.</p>
      </Narrative>
      <WorkingBoard file="queue-research.webp">
        View my six-tool audit
      </WorkingBoard>
      <Chapter
        label="Exploration"
        title="Four directions for a pending message."
      >
        <p className="se-reading-copy">I brought these directions through design critiques. The question was what each extra control added to a developer’s next step. These studies summarize the interaction differences; the original Figma board is available below.</p>
        <div className="se-concept-decisions">
          {[
            {
              mode: "final",
              title: "Keep the queue inline",
              text: "The pending text stays visible, with one action to remove it. I returned to this direction after reviewing the more elaborate concepts.",
            },
            {
              mode: "controls",
              title: "Add queue controls",
              text: "Reordering and injection could support more complex work, but would require users to understand both a queue and an active turn. That exceeded the follow-up problem I was solving.",
            },
            {
              mode: "edit",
              title: "Allow inline editing",
              text: "Inline editing helped revise a pending question, but added another mode to a brief waiting state. Given the mostly short messages, I prioritized deletion for the initial scope.",
            },
            {
              mode: "collapsed",
              title: "Collapse the queue",
              text: "Collapsing saved 56px in this exploration. In critique, that saving did not justify hiding the questions and making users reopen the queue to inspect them.",
            },
          ].map((c) => (
            <figure key={c.title}>
              <QueueStudy mode={c.mode as "final" | "controls" | "edit" | "collapsed"} />
              <figcaption>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Chapter>
      <WorkingBoard file="queue-concepts.webp">View the original concept explorations</WorkingBoard>
      <Narrative
        id="solution"
        label="Solution"
        title="Keep the next two questions in view."
      >
        <p>I returned to an inline queue above the composer. Pending questions stay beside the place they were written, and Seer processes them in the order they were submitted. The current response continues uninterrupted.</p>
        <p>I capped the queue at two messages to preserve room for the conversation and keep the next steps visible. This was a scope and layout judgment: the message-length data supported compact rows, but did not establish an ideal queue length. A larger backlog would need its own design justification.</p>
      </Narrative>
      <div className="se-queue-details">
        <article>
          <div className="se-message-pair">
            <span className="se-sent-message">
              Which errors should engineering look at first?
            </span>
            <QueueLine>
              Which errors should engineering look at first?
            </QueueLine>
          </div>
          <h3>Make pending look different from sent.</h3>
          <p>
            Muted text and a neutral row distinguish a pending question from a sent chat bubble. The question becomes part of the conversation only when its turn begins.
          </p>
        </article>
        <article>
          <div className="se-delete-study">
            <QueueLine>Are they tied to the same deploy?</QueueLine>
            <span>Delete pending message.</span>
          </div>
          <h3>Keep the action specific.</h3>
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
          <h3>Explain what happens at the limit.</h3>
          <p>
            At two pending messages, the composer explains why it is unavailable and how to make room. Truncated questions retain a full-text affordance, so users can inspect what they are about to delete.
          </p>
        </article>
      </div>
      <Narrative label="Interaction boundaries" title="Deleting a question and stopping Seer are different actions.">
        <p>A queued message has not started processing. Deleting it removes only that future request. It leaves the active response and the other pending question intact.</p>
        <p>Stop and cancel had unresolved frontend and backend behavior, so I kept them on a separate project track. Expanding the queue into interruption controls would have made its promise harder to explain and its implementation harder to isolate.</p>
      </Narrative>
      <LiveDemo
        kind="message-queuing"
        title="Add a follow-up while Seer is working."
      >
        Queue two questions, remove one, and watch the remaining message enter
        the conversation.
      </LiveDemo>
      <Narrative
        id="the-outcome"
        label="The outcome"
        title="A complete interaction, ready for implementation."
      >
        <p>I delivered the final Figma flow and behavior specification: submission during generation, two pending slots, ordered processing, deletion, full-text access, and feedback at capacity. Editing, reordering, and injection were left out of this release.</p>
        <p>The work ended at design specification; I do not have post-release usage results. The next validation would be a developer trying to queue a follow-up without guidance: can they tell what is waiting, what is running, and what deleting a message will do? I would also track how often the two-message limit is reached before considering more capacity.</p>
      </Narrative>
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
            <p>Block copying had only just launched, so its 45 events were not an equal comparison. Later weekly usage ranged from 114–336 events. The data supported the need to transfer context; it did not determine the interface by itself.</p>
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
        title="Make a shared component usable by the next team."
      >
        <p>In Sentry, a split panel lets developers widen a replay or open Seer beside an issue list. Priscila had already merged a shared SplitPanel in code when I joined the Design Foundations rotation. Designers still needed a matching component and guidance for using it.</p>
        <p>I built the Figma counterpart, wrote the usage guidelines, extracted a reusable drag handle with the team, and audited existing implementations to plan and begin migration. My job was to connect the new code component to the way teams design and maintain the product.</p>
      </Narrative>
      <Narrative
        id="the-problem"
        label="The problem"
        title="A familiar divider could behave differently on every screen."
      >
        <p>Teams had built resizable panels independently. Similar lines concealed different assumptions about layout, interaction states, and keyboard behavior. In the instances I audited, only one had keyboard support and ARIA attributes.</p>
        <p>A common visual treatment would leave those differences unresolved. The component needed a shared interaction model, a design representation of its code API, and a realistic path for existing screens to adopt it.</p>
      </Narrative>
      <div className="se-split-recording">
        <video
          controls
          playsInline
          preload="metadata"
          poster="/assets/sentry/split-replay.png"
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
        <p>After aligning with Priscila and Nate, I extracted the handle into a nested primitive and exposed its properties. <strong>The panel owns layout; the handle owns interaction.</strong> A future affordance, such as a mobile thumb, could then be added in one place and used by each parent.</p>
      </Narrative>
      <div className="se-component-contract" aria-label="Split Panel component responsibilities">
        <article><span className="trace-kicker">SplitPanel</span><h3>Where the content goes</h3><p>Sized + fill slots<br />Horizontal / vertical<br />Start / end placement</p></article>
        <span className="se-contract-connector" aria-hidden="true">↔</span>
        <article><span className="trace-kicker">Drag handle</span><h3>How resizing behaves</h3><p>Rest + hover<br />Focus + active<br />Reusable across parent layouts</p></article>
      </div>
      <div className="se-handle-study">
        {["Rest", "Hover", "Focus", "Active"].map((state, i) => (
          <figure key={state}>
            <div data-state={i}>
              <span>Sized pane</span>
              <i />
              <span>Fill pane</span>
            </div>
            <figcaption>{state}</figcaption>
          </figure>
        ))}
      </div>
      <Narrative
        id="solution"
        label="Solution"
        title="Use the same model in Figma and code."
      >
        <p>I built the component around <strong>sized</strong> and <strong>fill</strong> slots, matching the code API. Designers can place their own content into either pane, choose horizontal or vertical orientation, and position the sized pane at the start or end.</p>
        <p>I wrote usage guidance alongside the component rather than leaving those choices implicit. I also corrected a semantic stroke/fill token mismatch: a divider that looked right in one theme still needed to use the right token in the others.</p>
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
        label="Adoption"
        title="A shared component needs an adoption path."
      >
        <p>I reviewed 40 files and identified 25 instances, then grouped the migration into five tiers. The first two contained the closest matches. Starting there let us establish the pattern in small PRs before changing APIs or shared hooks.</p>
        <p>The remaining tiers separated cases needing API decisions, cases blocked on hook unification, and controls that belonged to a different domain. A similar-looking line was not enough reason to replace a component. The migration had to preserve the job each control performed.</p>
      </Narrative>
      <div className="se-migration-plan" aria-label="Five-tier migration plan">
        {[
          ["01–02", "Closest matches", "Start with instances that already fit the shared behavior."],
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
        <p>The Figma component and documentation were delivered, and the first migration PR merged. The reusable handle was also adopted in table and left-navigation work, extending beyond the original split-panel use case.</p>
        <p>The other instances remained on the staged migration plan. I learned to treat adoption as part of component design: a clear API, reliable interaction states, and small migration steps make a shared pattern practical. Completing the remaining migrations and checking keyboard and theme behavior would be the next measure of progress.</p>
      </Narrative>
    </>
  );
}
function TimeCase() {
  return (
    <>
      <Narrative
        id="overview"
        label="Overview"
        title="Read when it happened without doing the conversion."
      >
        <p>I redesigned Sentry’s relative-time hovercard to show an event’s age, the developer’s local time, and UTC together. The brief began with one hovercard, but the audit exposed a broader inconsistency in how tooltips presented information.</p>
        <p>I owned the research, inventory, Figma component work, and tooltip organization, then worked with design engineers on implementation PRs. The result was a relative-time design built from reusable rows that could also support charts and event details.</p>
      </Narrative>
      <Narrative
        id="the-problem"
        label="The problem"
        title="An accurate timestamp could still be hard to use."
      >
        <p>Engineers compare timestamps to connect an error with a deploy, a log, or a teammate’s report. Sentry showed time across issues, logs, Explore, and charts, but three separate implementations produced different labels, precision, and hover content.</p>
        <p>The existing UTC-focused hovers often left the developer to convert the time. Timezone settings were difficult to find. Before someone could compare events, they first had to work out how the displayed time related to their own.</p>
      </Narrative>
      <Source
        file="time-product-context.png"
        width={1336}
        height={1194}
        caption="Where the work started: earlier timestamp and chart tooltips in the product. These captures show the context, not the final designs."
      />
      <Chapter
        id="context"
        label="Context"
        title="Three interviews clarified what each time format is for."
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
      <Narrative label="Reference study" title="Keep local time useful and UTC available.">
        <p>In my internship research, Datadog emphasized relative and local time, while Vercel brought local time and UTC together. PostHog exposed a similar discoverability concern around timezone settings. These comparisons helped me separate the information developers needed from the visual treatment of any one tool.</p>
        <p>I kept UTC for distributed debugging and added local time alongside it. The two rows let someone read the event in their own context while retaining a common reference for a teammate in another timezone.</p>
      </Narrative>
      <Narrative
        id="insights"
        label="Insights"
        title="One improved hovercard would leave the same problem elsewhere."
      >
        <p>I collected more than 55 screenshots and documented over 25 relevant tooltip variations. Across them, the differences included row structure, font size, color tokens, precision, and which information received emphasis. The problem was larger than adding a second timezone.</p>
        <p>After reviewing the audit with design engineers, I built shared header, body, and footer rows with a wrapper and pointer. The relative-time hovercard became one composition of those parts. This let us address repeated structure while keeping the content specific to each use case.</p>
      </Narrative>
      <WorkingBoard file="time-inventory.webp">
        View the original tooltip inventory
      </WorkingBoard>
      <Chapter
        id="solution"
        label="Solution"
        title="Keep the meaning, date, and timezone together."
      >
        <div className="se-time-feature">
          <div className="se-time-example">
            <SentryDemo kind="relative-time" compact paused />
          </div>
          <div className="se-time-explanation">
            <article>
              <span>01</span>
              <h3>Start with the context.</h3>
              <p>
                First Seen or Last Seen explains what the time describes.
                Relative age gives a quick reading before the exact timestamp.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Show local time and UTC.</h3>
              <p>
                Each row has its own timezone and date, so a day boundary does
                not get lost in the conversion.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Align what people compare.</h3>
              <p>
                Dates and times get separate columns so midnight crossings remain visible. Tabular numerals align the values being compared; text labels keep their normal spacing.
              </p>
            </article>
          </div>
        </div>
      </Chapter>
      <Narrative
        label="Component design"
        title="Share the structure. Keep the meaning of each context."
      >
        <p>A chart needs series labels and values. A bare timestamp may only need date rows. An event can need both occurred and received times. Reusing the same rows gives these tooltips a consistent reading order without making them display identical fields.</p>
        <p>I worked through before-and-after treatments and tested the designs in a playground with multiple series, locale formatting, and different levels of precision. This is where the shared model had to prove useful beyond the original hovercard.</p>
      </Narrative>
      <div className="se-time-family">
        {[[0, "Context + time", "A header names the event; the body pairs local time with UTC."], [2, "Precision when needed", "The same body rows accommodate seconds and milliseconds."], [6, "Chart values", "Series values use the body; the timestamp moves into a footer."]].map(([scene, title, caption]) => <figure key={scene}><div className="se-specimen-stage"><RelativeTimeSpecimen scene={Number(scene)} /></div><figcaption><h3>{title}</h3><p>{caption}</p></figcaption></figure>)}
      </div>
      <WorkingBoard file="time-variants.png">View the complete component family</WorkingBoard>
      <LiveDemo
        kind="relative-time"
        title="Compare the same event in another timezone."
      >
        Change the timezone and notice when the calendar date changes. Both rows
        still describe the same instant.
      </LiveDemo>
      <Narrative
        label="Design-system organization"
        title="Organize the library around reuse."
      >
        <p>I moved the generic tooltip parts onto the main library page. Chart and relative-time compositions received their own pages under Overlays, making it clearer which parts were shared and which represented a specific use.</p>
        <p>With design engineers, I proposed starting implementation with two or three high-impact patterns. Older tooltips could then be replaced in stages, using the inventory to guide the remaining work rather than attempting a product-wide change at once.</p>
      </Narrative>
      <Narrative
        id="the-outcome"
        label="The outcome"
        title="The Figma system was complete. Code adoption was underway."
      >
        <p>I completed the component family and reorganized the tooltip library. Implementation PRs were submitted and receiving feedback, with three in progress at the end of my internship. The design delivery was complete; the product migration was still underway.</p>
        <p>The next validation would use debugging tasks: can engineers correlate an event across local time and UTC without leaving the tooltip, including across a day boundary? I would pair that with migration coverage to check both sides of the work: whether the pattern is useful and whether teams are adopting it consistently.</p>
      </Narrative>
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
        Making room
        <br />
        for follow-ups
      </>
    ),
    role: "Product & interaction design",
    team: "AI/ML · Seer",
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
    team: "AI/ML · Seer",
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
    team: "Design Foundations · Scraps",
    next: "relative-time",
  },
  "relative-time": {
    title: (
      <>
        Making time
        <br />
        easier to read
      </>
    ),
    role: "Product & design systems",
    team: "Design Foundations · Scraps",
    next: "message-queuing",
  },
};
export default function SentryCaseStudy({ kind }: { kind: SentryProjectId }) {
  const [paused, setPaused] = useState(false);
  const project = sentryProjects[kind],
    opening = openings[kind];
  return (
    <main
      className={`trace-case travel-case sentry-case sentry-editorial se-case-${kind}`}
      data-theme="light"
    >
      <nav className="trace-nav">
        <Link href="/" aria-label="Back to home">
          ←
        </Link>
      </nav>
      <div className="trace-opening trace-editorial-opening">
        <header className="trace-header">
          <span className="trace-kicker">
            {project.title} · Sentry internship, 2026
          </span>
          <h1>{opening.title}</h1>
          {kind === "send-to-agent" && (
            <p className="se-opening-dek">
              Designing the product contract between Sentry’s debugging agent
              and the coding agent where a developer continues the work.
            </p>
          )}
        </header>
        <figure className={`se-hero-art se-hero-${kind}`}>
          <div className="se-hero-product">
            <SentryDemo kind={kind} compact paused={paused} />
          </div>
          <button
            className="se-motion-control"
            onClick={() => setPaused(!paused)}
            aria-label={`${paused ? "Play" : "Pause"} interaction preview`}
          >
            {paused ? <FiPlay /> : <FiPause />}
          </button>
          <figcaption>
            {project.title}: an animated reconstruction of my design.
          </figcaption>
        </figure>
        <dl className="trace-project-facts">
          <div>
            <dt>Role</dt>
            <dd>{opening.role}</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>{opening.team}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>Summer 2026</dd>
          </div>
        </dl>
        <p className="se-delivery-status"><span>At internship end</span>{project.status}</p>
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
      <footer className="trace-end">
        <Link href="/">← Back to the canvas</Link>
        <Link href={`/projects/sentry-${opening.next}`}>
          {sentryProjects[opening.next].title} →
        </Link>
      </footer>
    </main>
  );
}
