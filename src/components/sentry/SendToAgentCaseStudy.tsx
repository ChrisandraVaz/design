'use client';

import Link from 'next/link';
import { FiCopy, FiMousePointer, FiLayers, FiEdit3 } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState, type ReactNode } from 'react';
import AgentMotionPreview from './AgentMotionPreview';
import AgentHandoffPreview from './AgentHandoffPreview';
import './send-to-agent-case.css';

const chapters = [
  { id: 'overview', label: 'Overview', group: 'overview', child: false },
  { id: 'problem', label: 'The problem', group: 'problem', child: false },
  { id: 'solution', label: 'The solution', group: 'solution', child: false },
  { id: 'process', label: 'Design process', group: 'solution', child: false },
  { id: 'the-outcome', label: 'Outcome', group: 'takeaways', child: false },
  { id: 'takeaways', label: 'Takeaways', group: 'takeaways', child: false },
];

function Chapter({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return <section id={id} className="agent-story-section">
    <p className="agent-story-label">{label}</p>
    <h2>{title}</h2>
    {children}
  </section>;
}

const artifactSizes: Record<string, [number, number]> = {"agent-button-clean.png": [500,590], "agent-table-clean.png": [700,872], "agent-journey-clean.png": [1942,1284], "agent-segment-use-cases.png": [942, 846], "agent-data-may.png": [774, 647], "agent-data-summer.png": [774, 647], "agent-explorations.webp": [2848, 1906], "agent-button-weight.png": [1966, 1126], "agent-text-selection.png": [1056, 1444], "agent-early-flows.png": [674, 1152], "agent-feedback-reference.png": [746, 534], "agent-final-flows.png": [1060, 1276], "agent-nav-exploration.png": [872, 1162], "agent-nav-closeup.png": [674, 408], "agent-flow-map.png": [2494, 1346], "agent-final-handoff.png": [1948, 1340], "agent-slash-commands.png": [670, 924], "agent-whiteboard.png": [1832, 754], "agent-handoff-block.png": [872, 1162], "agent-user-segments.png": [1462, 1330], "agent-table-exploration.png": [872, 950], "agent-action-patterns.png": [1348, 1004], "agent-scope-prompt.png": [1056, 1444], "agent-context-prompt.png": [1056, 1444], "agent-error-patterns.png": [2438, 1058], "agent-button-states.png": [1368, 466], "agent-block-states.png": [2462, 1162], "agent-expanded-menu.png": [1526, 1126]};

function Artifact({ file, alt, children }: { file: string; alt: string; children: ReactNode }) {
  return <figure className="agent-story-artifact">
    <a href={`/assets/sentry/${file}`} target="_blank" rel="noreferrer" aria-label={`View full-size: ${alt}`}>
      {/* Preserve the full original board; readers can open its native resolution. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/assets/sentry/${file}`} alt={alt} width={artifactSizes[file]?.[0]} height={artifactSizes[file]?.[1]} loading="lazy" />
    </a>
    <figcaption>{children}</figcaption>
  </figure>;
}

function SolutionDemos() {
  return <>
        <div className="agent-solution-feature">
          <AgentHandoffPreview entryPoint="response" />
          <div className="agent-solution-copy">
            <p className="agent-story-label">01 From the chat</p>
            <h3>Send a specific response</h3>
            <p>A developer has found a useful response and is ready to act on it. The action beside that response sends the answer, its related tool calls, and the last user message.</p>
            <p>This example shows multiple configured agents: open the robot menu, choose Claude, then see confirmation in the chat.</p>
          </div>
        </div>
        <div className="agent-solution-feature is-reversed">
          <AgentHandoffPreview entryPoint="navigation" />
          <div className="agent-solution-copy">
            <p className="agent-story-label">02 From the navigation</p>
            <h3>Send the full conversation</h3>
            <p>When the next step belongs in a coding agent, the top navigation sends the full conversation. Earlier questions, findings, and tool calls travel together.</p>
            <p>This example shows one configured agent. Clicking the Claude icon starts the handoff directly; the caret keeps agent choices and integration setup accessible.</p>
          </div>
        </div>
  </>;
}

export default function SendToAgentCaseStudy() {
  const [active, setActive] = useState('overview');
  const { theme } = useTheme();
  useEffect(() => {
    let scrollFrame = 0;
    const update = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        let current = chapters[0].id;
        for (const chapter of chapters) {
          if ((document.getElementById(chapter.id)?.getBoundingClientRect().top ?? Infinity) <= 180) current = chapter.id;
        }
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) current = 'takeaways';
        setActive(current);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { cancelAnimationFrame(scrollFrame); window.removeEventListener('scroll', update); };
  }, []);
  const group = chapters.find(chapter => chapter.id === active)?.group;
  return <main className="agent-story" data-theme={theme}>
    <nav className="agent-story-top" aria-label="Case study navigation">
      <Link className="agent-story-back back-home" href="/"><span aria-hidden="true">‹</span>Back to Home</Link>
      <div className="agent-story-tabs">
        {['Overview', 'Problem', 'Solution', 'Takeaways'].map(label => <a key={label} href={`#${label.toLowerCase()}`} aria-current={group === label.toLowerCase() ? 'location' : undefined}>{label}</a>)}
      </div>
    </nav>
    <nav className="agent-story-tree" aria-label="Send to Agent chapters">
      {chapters.map(chapter => <div className="agent-tree-group" key={chapter.id}>
        <a href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined}>{chapter.label}</a>
        {chapter.id === 'process' && <div className="agent-tree-children">
          <a href="#evidence">Research</a><a href="#context">Journey and scope</a>
          <a href="#entry-points">Entry points</a><a href="#zero-states">Button patterns</a>
          <a href="#interaction">Handoff feedback</a>
        </div>}
      </div>)}
    </nav>
    <div className="agent-story-content">
      <header id="overview" className="agent-story-opening">
        <p className="agent-story-label">Sentry, Product design internship, 2026</p>
        <h1>Send to Agent</h1>
        <figure className="agent-story-hero">
          <div className="agent-story-cover"><div className="agent-story-film"><AgentMotionPreview showCompletedQuery containFrame /></div></div>
        </figure>
        <dl className="agent-story-facts">
          <div><dt>Role</dt><dd>Product designer</dd></div>
          <div><dt>Timeline</dt><dd>Summer 2026</dd></div>
          <div><dt>Team</dt><dd>AI/ML Seer Agent<br />1 Design Advisor, 4 Engineers, 1 PM</dd></div>
          <div><dt>Skills</dt><dd>Interaction design<br />Product flows, Systems thinking</dd></div>
        </dl>
        <p className="agent-story-label">Overview</p>
        <h2>Send the investigation, not the text</h2>
        <p>Developers ask Seer questions in plain language. It reads issue details, traces, logs, and profiles to investigate production issues inside Sentry and shows its progress as it works. Developers then move to Claude or Cursor to write the fix. During my AI and ML internship, I designed the handoff so a useful response or the full investigation could travel with them. The central design problem was the payload: deciding which messages and evidence the receiving agent needed to continue the work.</p>
        <p><strong>My contribution:</strong> I designed the entry points, payload scopes, integration states, and handoff feedback. I reviewed the interaction with design, engineering, and PM, and documented the agreed behavior for implementation.</p>
      </header>

      <Chapter id="problem" label="The problem" title="Developers were already moving context by hand">
        <p>Developers copied responses, session links, or entire conversations by hand. Copying something else replaced the clipboard contents. Session links required authentication and a rendered page, which agents without a logged-in browser or connector could not reliably access. Isolated replies could lose the question and evidence behind them. The design needed to support both a targeted next step and a full investigation.</p>
      </Chapter>

      <aside className="agent-design-question" aria-label="Design question"><span>Design question</span><p>How might we transfer enough context for another agent to continue the investigation without making developers rebuild it by hand?</p></aside>
      <p className="agent-pipeline-lead">Three structural questions came before styling a single component. Every answer had a design implication, and every implication had an engineering constraint.</p>
      <ol className="agent-decision-pipeline" aria-label="Decision order">
        <li><span>01</span><strong>Where does it live?</strong><p>Navigation, message level, or a slash command.</p></li>
        <li><span>02</span><strong>What does it send?</strong><p>A single block, the full conversation, or something in between.</p></li>
        <li><span>03</span><strong>What happens after?</strong><p>The agent doesn’t send results back, so the chat has to confirm the handoff.</p></li>
      </ol>
      <Chapter id="solution" label="The solution" title="Two ways to send context to a coding agent">

        <SolutionDemos />
        <p>Both entry points support one or multiple agents. With multiple agents, a robot control opens the choices. One configured agent enables direct sending; the caret keeps choices and setup available. With none configured, “Add Integration” leads to setup.</p>
      </Chapter>

      <section className="agent-story-decisions" aria-label="Evidence and turning points">
        <p className="agent-story-label">What changed the design</p>
        <div className="agent-decision-grid">
          <div><div className="agent-decision-symbol" aria-hidden="true"><FiCopy /></div><h3>Content over links</h3><p><strong>306 clipboard copies, 235 link copies</strong> in the May 30-day window. Auth-gated, client-rendered links made the payload itself the priority.</p></div>
          <div><div className="agent-decision-symbol" aria-hidden="true"><FiMousePointer /></div><h3>A direct primary action</h3><p><strong>97% had one agent configured.</strong> The agent icon sends directly, while the caret preserves access to choices and setup.</p></div>
          <div><div className="agent-decision-symbol" aria-hidden="true"><FiLayers /></div><h3>Less detail, enough context</h3><p><strong>12 of 1,000 messages led to tool-call clicks.</strong> Tool-call details stay hidden by default, but travel with the response.</p></div>
        </div>
        <p className="agent-pivot-note">Block copying grew from 45 events during its short May launch window to 114 to 336 per week in June through August. Critique reduced the button’s visual weight. Engineering discussions resolved what the handoff could confirm: sending context, not completing a fix.</p>
      </section>
      <section className="agent-story-process" id="process"><p className="agent-story-label">Design process</p><div className="agent-story-process-content">
        <h3>Starting with two developer needs</h3>
        <p>I began by defining two user segments and mapping their goals in FigJam. A developer who had found a useful answer wanted to take that specific context into another tool. Someone who had reached a limit in Seer wanted to continue the whole investigation elsewhere. Designing only for one would make the other do unnecessary selection work.</p>
        <div className="agent-segments" aria-label="Two developer needs">
          <article className="agent-segment">
            <p className="agent-segment-label">A specific finding</p>
            <h4>The expert developer</h4>
            <p>Seer has surfaced something useful. They know which part they want to act on.</p>
            <dl><dt>Use case: act on a specific finding</dt><dd>Send that response and its supporting context to a coding agent as a prompt or starting point, without copying it by hand.</dd></dl>
            <div className="agent-segment-route"><span>Entry point</span><strong>Chat level</strong></div>
          </article>
          <article className="agent-segment">
            <p className="agent-segment-label">A continuing investigation</p>
            <h4>The vibe coder</h4>
            <p>They have reached a limit in Seer and want to keep going in their coding agent.</p>
            <dl><dt>Use case: continue the investigation</dt><dd>Send the full Seer conversation to Claude or Cursor and keep working with the context already built.</dd></dl>
            <div className="agent-segment-route"><span>Entry point</span><strong>Navigation bar</strong></div>
          </article>
        </div>
      <Chapter id="evidence" label="Research" title="Understanding what people were copying">
        <p>I looked at Amplitude to understand how people were moving context out of Seer. In the 30-day window I reviewed in May, there were 306 session clipboard events and 235 session-link copies. Those actions showed transfer behavior, though they could not tell me the intent behind every copy.</p>
        <p>Block copying had only launched on May 21, so its 45 events had a shorter exposure period. Later, it reached 114 to 336 events per week. I kept those periods separate rather than treating them as a direct comparison.</p>
        <div className="agent-story-image-pair">
        <Artifact file="agent-data-may.png" alt="Amplitude chart from the internship presentation showing session clipboard, session link, and block-copy activity through May">May snapshot from my internship presentation. These weekly values show how copying changed over time; they are separate from the 30-day totals above.</Artifact>
        <Artifact file="agent-data-summer.png" alt="Amplitude chart from the internship presentation showing weekly copying activity from June through August">June through August: block copying became a recurring behavior after launch. The chart shows observed copying activity, not the impact of Send to Agent.</Artifact>
        </div>
        <p>Only 12 of 1,000 messages resulted in tool-call clicks. That supported keeping those details collapsed in Seer; it did not establish that the receiving agent could do without them. Related tool-call output still travels with the response.</p>
        <aside className="agent-configuration-stat" aria-label="Agent configuration finding">
          <h3><span>97%</span> of users with an integration had just one agent.</h3>
          <p>I made the configured agent a one-click action. The adjacent menu keeps other agents and integration setup accessible.</p>
        </aside>
        <p>The data helped simplify the route. The technical constraint shaped what travelled: readable investigation content, rather than relying on a session link.</p>
        <p className="agent-key-shift">Where the first direction fell apart: session links could not be read by a local agent, so the payload became the product.</p>
      </Chapter>

      <Chapter id="context" label="Design process, Journey" title="Mapping the handoff from Seer to a coding agent">
        <p>I mapped how developers moved from investigating an issue in Seer to continuing in another tool. The journey exposed the manual copying steps, the two handoff scopes, and the setup path when no agent was configured.</p>
        <div className="agent-journey-layout">
          <Artifact file="agent-journey-clean.png" alt="Send to Agent journey map comparing manual copying with proposed handoff and setup paths">Mapping the existing workarounds and the proposed handoff. Open the map to inspect it at full size.</Artifact>
        </div>
        <p>A single reply was easy to send, but could be incomplete on its own. Selecting a range, or sending “up to this point,” avoided irrelevant threads but could lose necessary context. It also asked the developer to decide which earlier turns and tool outputs mattered.</p>
        <p>I worked through these possibilities with an engineer, including on the whiteboard: which messages belonged in the payload, whether an optional prompt was needed, and how the destination would be chosen. That discussion helped separate the content decision from the control that triggered it.
        </p><Artifact file="agent-whiteboard.png" alt="Whiteboard brainstorming with an engineer about agent choice, payload, and optional prompts">Working through the handoff with an engineer: what to send, how to choose the destination, and whether to request more context.</Artifact>
        <h3>Exploring where and how to send</h3>
        <p>I explored a button beneath a response, an action on a table, text selection, and a guided prompt for additional context. Each option tested how visible the action should be and how much preparation to ask of the developer. I also explored a forward-style icon in the navigation.</p>
        <div className="agent-story-iterations agent-story-exploration-grid">
          <Artifact file="agent-button-clean.png" alt="Early Send to Agent button beneath a response">A visible action beneath the response.</Artifact>
          <Artifact file="agent-table-clean.png" alt="Table output used to explore a three-dot send action">A proposed action on the table itself.</Artifact>
          <Artifact file="agent-text-selection.png" alt="Selected text revealing a contextual Send to agent action">Select a passage to reveal the send action.</Artifact>
          <Artifact file="agent-context-prompt.png" alt="Guided handoff asking whether to add written context">Ask for additional context before sending.</Artifact>
        </div>
        <p>Critique showed that the large split button gave a secondary action too much emphasis. Combining destination, scope, download, and setup in one menu also added decisions. I moved toward a compact action whose placement communicates what will be sent.</p>
        <h3>Designing the payload around the next task</h3>
        <p>The visible answer was only one part of the handoff. The receiving agent also needed the question Seer was answering and the evidence it used. I defined two payload scopes and annotated them in Figma so engineering would carry that supporting context, even when the interface kept tool-call details collapsed.</p>
        <p><strong>For a specific response,</strong> the package contains the last user message, Seer’s complete answer, and the related tool calls and their output. The user message establishes the task; the answer carries the finding; the tool output preserves the evidence behind it. Sending only the answer would leave the next agent to reconstruct those relationships.</p>
        <p><strong>For a continuing investigation,</strong> the package contains the full conversation, including earlier messages and tool calls. This preserves the investigation history when the next step depends on more than one response. It also sends more material, which is why I kept a separate response-level action for a targeted task.</p>
        <p className="agent-key-shift">The key shift: the button could stay small because the payload had been worked out behind it.</p>
        <p>The boundary was defined by the task and the messages included, rather than a fixed amount of text. A selected passage could omit supporting evidence; the full conversation could include unrelated turns. The two entry points let developers choose a useful scope without manually assembling a prompt.</p>
        <p>The final design establishes scope through the entry point itself. The developer can send directly, then continue or add context in the receiving agent. That made it especially important for the action’s placement to communicate what would travel before the click.</p>
        <Artifact file="agent-explorations.webp" alt="Chrisandra’s Figma workspace showing Send to Agent iterations and discarded concepts">The working file includes response actions, navigation actions, selected-context explorations, and discarded directions.</Artifact>
      </Chapter>

      <Chapter id="entry-points" label="Design process, Commands and modals" title="Keeping the handoff in the conversation">
        <p>I explored three slash-command structures for sending the full conversation or the most recent response, but they were not discoverable enough for the MVP. Seer already had a feedback pop-up, and we decided against adding another command-triggered form. The visible entry points kept the action close to the content without adding another interruption.</p>
        <div className="agent-story-image-pair">
          <Artifact file="agent-slash-commands.png" alt="Wireframe with separate slash commands for the full conversation and most recent response">Exploration: expressing the two scopes as commands in the input.</Artifact>
          <Artifact file="agent-feedback-reference.png" alt="Existing Seer Agent feedback form">Existing product reference: the feedback pop-up informed the decision to avoid another form-based interruption.</Artifact>
        </div>
        <p>I moved forward with a compact icon-based action, reusing the familiar Autofix robot pattern for choosing among agents. Placing it beneath a response or in the navigation established what would be sent. This kept the two routes visible without asking the developer to work through the larger menu or a separate form.</p>
        <div className="agent-options" aria-label="Options considered">
          <table><caption>Entry point</caption><tbody>
            <tr><th scope="row">Split button in the toolbar</th><td>Cut. Wrong visual hierarchy for a secondary action.</td></tr>
            <tr><th scope="row">Slash command</th><td>Cut for MVP. Three structures explored; not discoverable enough.</td></tr>
            <tr className="is-chosen"><th scope="row">Icon action, nav and message level</th><td>Chosen. Matches the Autofix robot pattern people already know.</td></tr>
          </tbody></table>
          <table><caption>Payload</caption><tbody>
            <tr><th scope="row">Single block</th><td>Cut. Too little context for the next agent.</td></tr>
            <tr><th scope="row">Range, “up to this point”</th><td>Cut. Avoids unrelated threads but loses evidence.</td></tr>
            <tr className="is-chosen"><th scope="row">Two scopes: response with context, or full conversation</th><td>Chosen. The entry point sets the scope; the LLM weights what matters.</td></tr>
          </tbody></table>
          <table><caption>After sending</caption><tbody>
            <tr><th scope="row">Inline tool-call update</th><td>Cut. Easy to miss when scrolling back.</td></tr>
            <tr><th scope="row">Large status card</th><td>Cut. Implies Seer is tracking the other agent’s work.</td></tr>
            <tr className="is-chosen"><th scope="row">Compact confirmation with session link</th><td>Chosen. Confirms the one event Seer can verify.</td></tr>
          </tbody></table>
        </div>
        <h3>One response or the whole conversation</h3>
        <div className="agent-scope-explanation">
          <div><h4>Block-level action</h4><p>The action beneath a response sends that answer together with the last user message and related tool calls. The next agent receives the context behind the answer, without the entire conversation.</p></div>
          <div><h4>Chat-level action</h4><p>The action in the navigation sends the whole conversation, including earlier messages and tool calls. It supports continuing an investigation when the full history matters.</p></div>
        </div>
        <p>I used the Design 1 and Design 2 boards for engineering handoff, documenting both entry points across no-agent, single-agent, and multiple-agent configurations. The button patterns specify when the primary action sends directly and when the menu offers a choice.</p>
        <Artifact file="agent-final-flows.png" alt="Final chat and navigation flows for multiple agents, a default agent, and zero states">The full working board: both entry points across agent configurations, followed by the zero states.</Artifact>
      </Chapter>

      <Chapter id="zero-states" label="Interaction design" title="Button interaction patterns">
        <p>The button adapts to the number of configured agents. With one agent, its icon sends directly. With multiple agents, the robot control opens the available choices. With none, the menu shows “No Agents Configured” and “Add Integration.” Only that last configuration is an empty state.</p>
        <Artifact file="agent-button-states.png" alt="Button states showing no agents configured, one configured agent, and multiple agents">Button interaction patterns for no configured agents, one agent, and multiple agents.</Artifact>
        <p>Integration setup may require an admin. I needed to provide a clear route to settings without making missing permissions look like a broken handoff. Once an agent is configured, the primary action can send directly; the caret still provides access to the menu.</p>
        <h3>Two rules for the edges</h3>
        <ul className="agent-edge-rules">
          <li><strong>No agent configured is not an error.</strong> Only admins can add integrations, so the menu offers “Add Integration” instead of a failure state.</li>
          <li><strong>The hidden send message never appears as a user bubble.</strong> Sending creates a background message for the integration; only the confirmation belongs in the visible chat.</li>
        </ul>
      </Chapter>

      <Chapter id="interaction" label="Interaction &amp; collaboration" title="Showing what happened after sending">
        <p>I explored an expanded “Sent to Coding Agent” block that could show repository details, a link to the external agent, and running, success, or error states. I also considered what happened to the original conversation: one version changed the input to “Continue chatting with Seer,” while another showed a session-ended state. One concern was that a small inline update could be missed when scrolling back, so the larger block offered a more persistent record. It also raised questions about what the integration could actually tell us.</p>
        <Artifact file="agent-block-states.png" alt="Large handoff card explored across launch, running, success, and error states">The larger card across its proposed states, including a version that ended the original chat session.</Artifact>
        <p>The receiving agent did not automatically return a completed fix to Seer. That limited what a success state could honestly say. It could confirm that the context had been handed off; it could not promise that the code had changed.</p>
        <p>While the integration behavior was still being resolved, I explored both a one-way send and a flow that checked for updates. Engineering guidance conflicted on whether the card could show repository context and status. I brought engineering and PM into the discussion and pushed for a written decision so the design would not depend on contradictory assumptions.</p>
        <h3>The final feedback stays in the chat</h3>
        <p>The compact treatment confirms the action Seer can verify: that the context was sent. A large running-status card could imply that Seer was tracking the receiving agent’s work. Keeping confirmation and a session link in the chat avoids that implication and leaves the investigation visible.</p>
        <p>I also documented that the hidden action message created on send should not appear as a new user chat bubble. Only the handoff feedback belongs in the visible conversation. The final direction uses compact feedback: a launching indicator, a success message with a session link, or an error. The alert copy distinguishes a sent response from a sent conversation, so it confirms the scope of the action. The session link has its own hover treatment. These details make the handoff visible while keeping the investigation on screen.</p>
        <Artifact file="agent-final-handoff.png" alt="Original Send to Agent success, session-link hover, and error designs">Final feedback: confirmation and the session link sit beneath the response, with the alert near the composer.</Artifact>
        <table className="agent-copy-table"><caption>Confirmation copy, scoped to what was sent</caption><thead><tr><th scope="col">Scope</th><th scope="col">Success</th><th scope="col">Error</th></tr></thead><tbody><tr><th scope="row">One response</th><td>Successfully sent response to Agent</td><td>Could not send response to Agent</td></tr><tr><th scope="row">Full conversation</th><td>Successfully sent conversation to Agent</td><td>Could not send conversation to Agent</td></tr></tbody></table>
        <p>The response and the conversation get different strings so a developer can tell which scope just left Seer. Errors name the same scope, so a failed navigation send is never mistaken for a failed reply send. I worked through the wording with the PM, since the copy is what tells a developer what actually happened. All four states reuse the existing alert component.</p>
      </Chapter>

      </div></section>
      <div className="agent-story-closing">
      <Chapter id="the-outcome" label="Outcome" title="Approved for implementation">
        <p>The design was approved by design, engineering, and PM and entered the shipping cycle. I handed off both entry points, what each sends, and the behavior for setup, launching, success, and failure. At the end of the internship I presented it, with my three other projects, to Sentry’s CTO, CFO, Chief of Staff, and Head of Design. I didn’t yet have post-release usage data to see how people used it.</p>
        <h3>What I would measure next</h3>
        <p>The copy events established transfer behavior, not payload quality. I would test representative investigations to check whether each scope preserves the question, answer, and related tool output, and whether developers can continue without returning to copy missing context. I would track payload size in tokens, truncation, transfer failures, and time to continue by scope and destination. These are proposed measures, not project results.</p>
        <h3>Extending to cloud and local agents</h3>
        <p>The two content scopes could remain consistent while delivery adapts to each agent’s authentication, session, and size limits. A cloud destination might return a session link; a local agent might need a different open action. The feedback should confirm the event the integration can verify. Receiving context, starting a session, and completing a fix are different events.</p>
      </Chapter>

      <Chapter id="takeaways" label="Learnings" title="What I took away">
        <div className="agent-learning-list">
          <article><FiMousePointer aria-hidden="true" /><div><h3>Data should shrink the interface, not decorate it</h3><p>97% of users had one agent configured, so the dropdown became a direct action. 12 of 1,000 messages opened tool calls, so the details stayed collapsed but still travelled in the payload. I learned to use analytics to remove steps, not to justify adding them.</p></div></article>
          <article><FiLayers aria-hidden="true" /><div><h3>Design the payload before the button</h3><p>The interface looked like one small icon. The real design was the contract underneath it: which messages, tool calls, and prompt travel together. What looked like a button problem was a systems problem, and I now start with what moves through an interface before I style it.</p></div></article>
          <article><FiEdit3 aria-hidden="true" /><div><h3>Ambiguity is a conversation you haven’t had yet</h3><p>Two engineers gave me opposite answers about what the integration could return, a day apart. Instead of designing around the contradiction, I brought engineering and PM into one thread and pushed for a written decision. I no longer treat conflicting guidance as a constraint to absorb.</p></div></article>
        </div>
      </Chapter>
      </div>
      <footer className="agent-contact-footer"><p>Designed + Coded with ♡ by Chrisandra</p><nav aria-label="Contact"><a href="https://ca.linkedin.com/in/chrisandra-vaz" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:chrisandravaz12@gmail.com">Email</a><a href="https://github.com/ChrisandraVaz" target="_blank" rel="noreferrer">GitHub</a></nav></footer>
    </div>
  </main>;
}
