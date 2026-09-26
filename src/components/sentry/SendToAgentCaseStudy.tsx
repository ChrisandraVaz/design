'use client';

import Link from 'next/link';
import { FiMousePointer, FiLayers, FiEdit3 } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import { useEffect, useState, type ReactNode } from 'react';
import AgentMotionPreview from './AgentMotionPreview';
import AgentHandoffPreview from './AgentHandoffPreview';
import './send-to-agent-case.css';
import './send-to-agent-editorial.css';

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
  return <main className="agent-story is-editorial" data-theme="dark" data-user-theme={theme}>
    <nav className="agent-story-top" aria-label="Case study navigation">
      <Link className="agent-story-back back-home" href="/" prefetch={false}><span aria-hidden="true">‹</span>Back to Home</Link>
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
        <h1>Seer Agent<br />Send to Agent Feature</h1>
        <dl className="agent-story-facts">
          <div><dt>Role</dt><dd>Product designer</dd></div>
          <div><dt>Timeline</dt><dd>Summer 2026</dd></div>
          <div><dt>Team</dt><dd>AI/ML Seer Agent<br />1 Design Advisor, 4 Engineers, 1 PM</dd></div>
          <div><dt>Skills</dt><dd>Interaction design<br />Product flows, Systems thinking</dd></div>
        </dl>
        <p className="agent-story-label agent-impact-label">Impact</p>
        <ul className="agent-impact">
          <li>Handed off for the next shipping cycle with design, engineering, and PM sign-off, then presented to Sentry’s CTO, CFO, Chief of Staff, and Head of Design.</li>
          <li>Turned hand copying, 306 clipboard and 235 session-link copies in a 30-day May window, into one click with two payload scopes.</li>
          <li>Made the send a single tap for the 97% of users who had one agent, while keeping tool-call detail in the payload.</li>
        </ul>
        <figure className="agent-story-hero">
          <div className="agent-story-cover"><div className="agent-story-film"><AgentMotionPreview showCompletedQuery containFrame /></div></div>
        </figure>
        <p className="agent-story-label">Overview</p>
        <h2>Seer finds the cause. The fix gets written somewhere else.</h2>
        <p>Seer is Sentry’s debugging agent. A developer asks it in plain language what broke, and it reads the issue, traces, logs, and profiles to answer. When they are ready to write the fix, they leave for Claude or Cursor, and the reasoning that found the bug has to make the trip with them.</p>
        <p>I designed that handoff during my AI/ML internship: the entry points, what each one sends, and how the chat confirms it. A design advisor reviewed each round, four engineers worked the payload out with me on a whiteboard, and I settled the confirmation copy with the PM.</p>
      </header>

      <Chapter id="problem" label="The problem" title="Context left Seer by hand.">
        <p><strong>Problem Statement:</strong> Developers using Seer experience lost context and evidence when they hand an investigation to a coding agent, because the only ways to move it are copying by hand or sharing session links that agents cannot open, leading to broken handoffs and fixes that start without the reasoning that found the bug.</p>
        <p>The obvious fix is a link. But Seer’s session links are auth-gated and rendered in the browser, and a local agent has no logged-in browser to open them in. That left the clipboard, which holds one thing at a time and gets overwritten by the next copy. So the real question was not where to put a button. It was how to move enough of the investigation that another agent could pick it up.</p>
      </Chapter>

      <aside className="agent-design-question" aria-label="Design question">
        <span>Design question</span>
        <p>How might we transfer enough context for another agent to continue the investigation, without making developers rebuild it by hand and without relying on links the agent cannot open?</p>
      </aside>
      <p className="agent-pipeline-lead">Three structural questions came before styling a single component. Every answer had a design implication, and every implication had an engineering constraint.</p>
      <ol className="agent-decision-pipeline" aria-label="Decision order">
        <li><span>1</span><strong>Where does it live?</strong><p>Navigation, message level, or a slash command.</p></li>
        <li><span>2</span><strong>What does it send?</strong><p>A single block, the full conversation, or something in between.</p></li>
        <li><span>3</span><strong>What happens after?</strong><p>The agent doesn’t send results back, so the chat has to confirm the handoff.</p></li>
      </ol>

      <Chapter id="solution" label="The solution" title="Two ways to send context to a coding agent">
        <SolutionDemos />
        <p>Where a response is what matters, the developer sends just that answer and its context. Where the whole thread matters, the navigation sends everything. With one agent configured the icon sends on click; with several, it opens the choices. Design, engineering, and PM approved this version. Here is how it got there.</p>
      </Chapter>

      <section className="agent-story-process" id="process"><p className="agent-story-label">Design process</p><div className="agent-story-process-content">
        <h3>Two developers</h3>
        <p>I started with two developers in FigJam.</p>
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
      <Chapter id="evidence" label="Decision 01" title="What were developers already copying?">
        <p>I pulled Amplitude for a 30-day window in May. Block copying had launched on May 21, so its 45 events had less exposure than the 114 to 336 a week it reached from June through August, and I kept the two periods separate.</p>
        <div className="agent-story-image-pair">
        <Artifact file="agent-data-may.png" alt="Amplitude chart from the internship presentation showing session clipboard, session link, and block-copy activity through May">May: weekly copying, separate from the 30-day totals.</Artifact>
        <Artifact file="agent-data-summer.png" alt="Amplitude chart from the internship presentation showing weekly copying activity from June through August">June through August: block copying became routine. Copying observed before Send to Agent existed.</Artifact>
        </div>
        <aside className="agent-configuration-stat" aria-label="Agent configuration finding">
          <h3><span>97%</span> of users with an integration had just one agent.</h3>
          <p>I made the configured agent a one-click action. The adjacent menu keeps other agents and integration setup accessible.</p>
        </aside>
        <p className="agent-key-shift">Where the first direction fell apart: session links could not be read by a local agent, so the payload became the product.</p>
        <p className="agent-story-label">Result</p>
        <p>The payload became readable content; 306 clipboard copies and 235 link copies in 30 days backed the call.</p>
      </Chapter>

      <Chapter id="context" label="Decision 02" title="What travels with the send?">
        <p>I mapped the handoff in FigJam, then worked the payload through on a whiteboard with an engineer.</p>
        <div className="agent-journey-layout">
          <Artifact file="agent-journey-clean.png" alt="Send to Agent journey map comparing manual copying with proposed handoff and setup paths">Existing workarounds beside the proposed handoff.</Artifact>
        </div>
        <p>A single reply was often incomplete. A range “up to this point” avoided unrelated threads but asked the developer to judge which turns and tool outputs mattered. So I fixed two scopes: a response with its last user message and related tool calls, or the full conversation.</p>
        <Artifact file="agent-whiteboard.png" alt="Whiteboard brainstorming with an engineer about agent choice, payload, and optional prompts">What to send, how to choose the destination, whether to ask for more.</Artifact>
        <h3>Critique shrank the button</h3>
        <p>In critique the split button gave a secondary action too much weight, and one menu holding destination, scope, download, and setup added decisions. I moved to a compact action whose placement says what will be sent.</p>
        <div className="agent-story-iterations agent-story-exploration-grid">
          <Artifact file="agent-button-clean.png" alt="Early Send to Agent button beneath a response">A visible action beneath the response.</Artifact>
          <Artifact file="agent-table-clean.png" alt="Table output used to explore a three-dot send action">An action on the table itself.</Artifact>
          <Artifact file="agent-text-selection.png" alt="Selected text revealing a contextual Send to agent action">Select a passage to reveal the action.</Artifact>
          <Artifact file="agent-context-prompt.png" alt="Guided handoff asking whether to add written context">Ask for context before sending.</Artifact>
        </div>
        <p>I annotated both scopes in Figma so engineering would carry the question, the answer, and the tool output even with the details collapsed.</p>
        <p className="agent-key-shift">The key shift: the button could stay small because the payload had been worked out behind it.</p>
        <Artifact file="agent-explorations.webp" alt="Chrisandra’s Figma workspace showing Send to Agent iterations and discarded concepts">The working file, discarded directions included.</Artifact>
        <p className="agent-story-label">Result</p>
        <p>Two scopes, annotated in Figma, went to engineering as the payload contract.</p>
      </Chapter>

      <Chapter id="entry-points" label="Decision 03" title="Where should the button live?">
        <p>Three slash-command structures were not discoverable enough for the MVP, and Seer already had a feedback pop-up, so I dropped the idea of another command-triggered form. I reused the Autofix robot pattern as a compact icon whose placement sets the scope.</p>
        <div className="agent-story-image-pair">
          <Artifact file="agent-slash-commands.png" alt="Wireframe with separate slash commands for the full conversation and most recent response">The two scopes as commands in the input.</Artifact>
          <Artifact file="agent-feedback-reference.png" alt="Existing Seer Agent feedback form">Seer’s existing feedback pop-up, the reason I avoided another form.</Artifact>
        </div>
        <div className="agent-options" aria-label="Options considered">
          <table><caption>Entry point</caption><tbody>
            <tr><th scope="row">Split button in the toolbar</th><td>Pro: visible. Con: too much weight for a secondary action. Cut.</td></tr>
            <tr><th scope="row">Slash command</th><td>Pro: kept the send in the composer. Con: none of three structures was discoverable. Cut for MVP.</td></tr>
            <tr className="is-chosen"><th scope="row">Icon action, nav and message level</th><td>Pro: matched the Autofix robot pattern people knew. Con: relied on placement to say what it sends. Chosen.</td></tr>
          </tbody></table>
          <table><caption>Payload</caption><tbody>
            <tr><th scope="row">Single block</th><td>Pro: simplest to send. Con: too little context for the next agent. Cut.</td></tr>
            <tr><th scope="row">Range, “up to this point”</th><td>Pro: avoided unrelated threads. Con: lost evidence and made the developer choose. Cut.</td></tr>
            <tr className="is-chosen"><th scope="row">Two scopes: response with context, or full conversation</th><td>Pro: the entry point set the scope. Con: the full conversation sends more material. Chosen; the model weighted what mattered.</td></tr>
          </tbody></table>
          <table><caption>After sending</caption><tbody>
            <tr><th scope="row">Inline tool-call update</th><td>Pro: nothing new in the chat. Con: easy to miss when scrolling back. Cut.</td></tr>
            <tr><th scope="row">Large status card</th><td>Pro: a persistent record. Con: implied Seer was tracking the other agent’s work. Cut.</td></tr>
            <tr className="is-chosen"><th scope="row">Compact confirmation with session link</th><td>Pro: confirmed the one event Seer could verify. Con: says nothing about the fix. Chosen.</td></tr>
          </tbody></table>
        </div>
        <Artifact file="agent-final-flows.png" alt="Final chat and navigation flows for multiple agents, a default agent, and zero states">Design 1 and Design 2 boards as handed to engineering: both entry points across no-agent, one-agent, and multiple-agent configurations, then the zero states.</Artifact>
        <p className="agent-story-label">Result</p>
        <p>One icon in two places, the Autofix robot pattern reused, went to engineering on the Design 1 and Design 2 boards.</p>
      </Chapter>

      <Chapter id="zero-states" label="Decision 04" title="What happens with zero, one, or many agents?">
        <p>With none configured, the menu shows “No Agents Configured” and “Add Integration.” Setup can need an admin, so a missing integration had to read as a route to settings rather than a broken handoff.</p>
        <Artifact file="agent-button-states.png" alt="Button states showing no agents configured, one configured agent, and multiple agents">No configured agents, one agent, multiple agents.</Artifact>
        <h3>Rules for the edges</h3>
        <ul className="agent-edge-rules">
          <li><strong>No agent configured is not an error.</strong> Only admins can add integrations, so the menu offers “Add Integration” instead of a failure state.</li>
          <li><strong>The hidden send message never appears as a user bubble.</strong> Sending creates a background message for the integration; only the confirmation belongs in the visible chat.</li>
        </ul>
        <p className="agent-story-label">Result</p>
        <p>Three button patterns and two edge rules were documented on the button-states board.</p>
      </Chapter>

      <Chapter id="interaction" label="Decision 05" title="What can Seer honestly confirm?">
        <p>I first explored a large “Sent to Coding Agent” card with running, success, and error states. Then two engineers, a day apart, gave me opposite answers on whether the integration could return status. I brought engineering and PM into one thread and pushed for a written decision. The question became what Seer could honestly confirm.</p>
        <Artifact file="agent-block-states.png" alt="Large handoff card explored across launch, running, success, and error states">The larger card, including a version that ended the chat session.</Artifact>
        <p>The answer was that the receiving agent does not send a fix back, so success can only mean the context arrived. The card shrank to a launching indicator, a success line with a session link, or an error, all on the existing alert component.</p>
        <h3>Copy names the scope</h3>
        <Artifact file="agent-final-handoff.png" alt="Original Send to Agent success, session-link hover, and error designs">Confirmation and the session link beneath the response; the alert near the composer.</Artifact>
        <table className="agent-copy-table"><caption>Confirmation copy, scoped to what was sent</caption><thead><tr><th scope="col">Scope</th><th scope="col">Success</th><th scope="col">Error</th></tr></thead><tbody><tr><th scope="row">One response</th><td>Successfully sent response to Agent</td><td>Could not send response to Agent</td></tr><tr><th scope="row">Full conversation</th><td>Successfully sent conversation to Agent</td><td>Could not send conversation to Agent</td></tr></tbody></table>
        <p>Errors match their success strings, so a failed navigation send is never mistaken for a failed reply send. I worked the wording through with the PM.</p>
        <p className="agent-story-label">Result</p>
        <p>Four confirmation strings shipped in the spec on the existing alert component.</p>
      </Chapter>

      </div></section>
      <div className="agent-story-closing">
      <Chapter id="the-outcome" label="Outcome" title="The design was approved and has not shipped yet.">
        <p>Design, engineering, and PM approved the design and it entered the shipping cycle. I handed off both entry points, what each sends, and the setup, launching, success, and failure behavior. At the end of the internship I presented it, with my three other projects, to Sentry’s CTO, CFO, Chief of Staff, and Head of Design. It had not shipped by then, so I have no post-release usage data.</p>
        <h3>The next opportunity</h3>
        <p>Delivery per destination. A cloud agent could return a session link while a local agent needs a different open action, with the same two scopes underneath and the confirmation tied to the one event each integration can verify.</p>
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
