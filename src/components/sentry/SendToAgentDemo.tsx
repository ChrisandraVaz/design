"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiLink,
  FiPlus,
  FiX,
  FiThumbsUp,
  FiThumbsDown,
  FiPause,
  FiArrowRight,
  FiAlertTriangle,
} from "react-icons/fi";
import {SeerChatHeader} from "./SeerChatHeader";
import {SeerMark} from "./SeerMark";
import "./send-to-agent.css";

type Agent = "Claude" | "Cursor";
export type QueryStage = "thinking" | "querying" | "complete";
const queryDescription = "Querying spans in web-app: 'slowest database queries, sorted by p95 duration'";
type Status = "ready" | "sending" | "sent" | "error";
const phases = [
  "unconfigured",
  "setup",
  "configured",
  "press",
  "sending",
  "sent",
  "receipt",
  "agents",
  "cursor",
  "sending-cursor",
  "error",
  "retry",
  "recovered",
  "overview",
];
function DemoCursor({className}: {className: string}) {
  return <svg className={className} viewBox="0 0 24 28" aria-hidden="true">
    <path d="M3 2v22l6-6 4 8 4-2-4-8h8Z" fill="#211b2b" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>;
}
function AgentIcon({ agent }: { agent?: Agent }) {
  return agent ? (
    <Image
      className="agent-brand"
      src={`/assets/sentry/logo-${agent.toLowerCase()}.svg`}
      width={18}
      height={18}
      alt=""
      unoptimized
    />
  ) : (
    <svg className="agent-robot" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.75" y="4.75" width="12.5" height="9.5" rx="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2v2.5M5.5 11.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="1.75" r="1" fill="currentColor" />
      <rect x="4.75" y="7.25" width="1.5" height="1.5" rx=".35" fill="currentColor" />
      <rect x="9.75" y="7.25" width="1.5" height="1.5" rx=".35" fill="currentColor" />
    </svg>
  );
}
function PreviewControl({
  compact,
  children,
  label,
  onClick,
  disabled,
  className = "",
  expanded,
}: {
  compact: boolean;
  children: ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  expanded?: boolean;
}) {
  return compact ? (
    <span className={className}>{children}</span>
  ) : (
    <button
      type="button"
      aria-label={label}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-expanded={expanded}
    >
      {children}
    </button>
  );
}
export function AgentDemo({
  compact = false,
  paused = false,
  previewStep,
  queryStage = "complete",
  queryElapsed = 2.2,
  answerVisible = true,
  entryPoint = "response",
  singleAgent = false,
}: {
  compact?: boolean;
  paused?: boolean;
  previewStep?: number;
  queryStage?: QueryStage;
  queryElapsed?: number;
  answerVisible?: boolean;
  entryPoint?: "response" | "navigation";
  singleAgent?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [sequenceStep, setStep] = useState(7);
  const step = previewStep ?? sequenceStep;
  const [state, setState] = useState<Status>("ready");
  const [agent, setAgent] = useState<Agent>("Claude");
  const [menu, setMenu] = useState(false);
  const [scope, setScope] = useState(entryPoint === "navigation" ? "conversation" : "response");
  const [configuration, setConfiguration] = useState("multiple");
  const [fail, setFail] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  useEffect(() => {
    if (!compact || paused || previewStep !== undefined) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (root.current) observer.observe(root.current);
    const timer = setInterval(() => {
      if (visible && !document.hidden && !motion.matches)
        setStep((s) => (s + 1) % 13);
    }, 1800);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [compact, paused, previewStep]);
  useEffect(() => {
    if (state !== "sending") return;
    const timer = setTimeout(() => setState(fail ? "error" : "sent"), 1400);
    return () => clearTimeout(timer);
  }, [state, fail]);
  useEffect(() => {
    if (compact || state === "ready") return;
    const body = root.current?.querySelector<HTMLElement>(".agent-reference-body");
    body?.scrollTo({top: body.scrollHeight, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
  }, [compact, state]);
  useEffect(() => {
    if (compact) return;
    // Safari does not focus buttons on pointer click. Keep keyboard dismissal
    // inside the open popover instead of leaving focus on the surrounding page.
    const selector = menu
      ? ".agent-reference-menu button"
      : sessionOpen
        ? ".agent-demo-session button"
        : null;
    if (selector)
      root.current
        ?.querySelector<HTMLButtonElement>(selector)
        ?.focus({ preventScroll: true });
  }, [compact, menu, sessionOpen]);
  const phase = phases[step];
  const activeAgent: Agent = compact
    ? step >= 9 && step <= 12
      ? "Cursor"
      : "Claude"
    : agent;
  const configured = compact ? step >= 2 : configuration !== "none";
  const showMenu = compact ? [1, 2, 7, 8].includes(step) : menu;
  const status: Status = compact
    ? [4, 9, 11].includes(step)
      ? "sending"
      : [5, 6, 12].includes(step)
        ? "sent"
        : step === 10
          ? "error"
          : "ready"
    : state;
  const subject = scope === "conversation" ? "Conversation" : "Response";
  const inspecting = queryStage !== "complete";
  const busy = status === "sending" || inspecting;
  const send = (destination: Agent) => {
    setAgent(destination);
    setMenu(false);
    setSessionOpen(false);
    setState("sending");
  };
  const choice = (destination: Agent) => (
    <PreviewControl
      key={destination}
      compact={compact}
      label={`Send to ${destination} Agent`}
      className={`agent-menu-choice ${compact && ((step === 7 && destination === "Claude") || (step === 8 && destination === "Cursor")) ? "is-highlighted" : ""}`}
      onClick={() => send(destination)}
    >
      <AgentIcon agent={destination} />
      <span>Send to {destination} Agent</span>
      {compact && previewStep !== undefined && destination === "Claude" && <DemoCursor className="agent-film-menu-cursor" />}
    </PreviewControl>
  );
  const handoffControls = <>
          <div className="agent-reference-split">
            <PreviewControl
              compact={compact}
              label={configured ? `Send to ${activeAgent}` : "Add integration"}
              disabled={busy}
              onClick={() => (configured ? send(activeAgent) : setMenu(!menu))}
              className={compact && step === 3 ? "is-pressed" : ""}
            >
              <AgentIcon agent={singleAgent ? activeAgent : undefined} />
            </PreviewControl>
            <PreviewControl
              compact={compact}
              label="Choose agent"
              expanded={showMenu}
              disabled={busy}
              onClick={() => setMenu(!menu)}
              className={showMenu ? "is-pressed" : ""}
            >
              <FiChevronDown />
            </PreviewControl>
          </div>
          {showMenu && (
            <div
              className="agent-reference-menu"
              aria-label="Agent destinations"
            >
              <div className="agent-menu-surface">
                {configured ? (
                  <>
                    {(!singleAgent && (compact ? step !== 2 : configuration === "multiple")) &&
                      choice("Cursor")}
                    {choice("Claude")}
                  </>
                ) : (
                  <p>No Agents Configured</p>
                )}
                <div className="agent-menu-separator" />
                <PreviewControl
                  compact={compact}
                  label="Add Integration"
                  className="agent-add-integration"
                  onClick={() => {
                    setConfiguration("multiple");
                    setMenu(false);
                    setState("ready");
                  }}
                >
                  <FiPlus viewBox="4 4 16 16" />
                  Add Integration
                </PreviewControl>
              </div>
            </div>
          )}
  </>;
  return (
    <div
      ref={root}
      className={`sentry-demo sentry-agent agent-reference ${compact ? "is-compact" : ""}`}
      data-phase={compact ? phase : status}
      data-status={status}
      data-paused={paused}
      data-answer-visible={answerVisible}
      onKeyDown={(e) => {
        if (e.key === "Escape" && (menu || sessionOpen)) {
          e.preventDefault();
          e.stopPropagation();
          const selector = sessionOpen
            ? ".agent-session-link"
            : '[aria-label="Choose agent"]';
          setMenu(false);
          setSessionOpen(false);
          root.current
            ?.querySelector<HTMLButtonElement>(selector)
            ?.focus({ preventScroll: true });
        }
      }}
    >
      <div className="agent-reference-window">
        <SeerChatHeader variant="agent" action={entryPoint === "navigation" ? <span className="agent-nav-handoff">{handoffControls}</span> : undefined} />
        <div className="agent-reference-body">
          <div className="agent-reference-question">
            What are my slowest DB queries?
          </div>
          <div className="agent-query-progress" data-stage={queryStage}>
            {queryStage === "thinking" ? (
              <div className="agent-initial-thinking"><span className="agent-loading-ring" /><span>Thinking...</span></div>
            ) : (
              <div className="agent-query-tool">
                <div className="agent-query-summary">
                  <SeerMark />
                  <span className="agent-query-description">{queryStage === "complete" ? "Queried spans in web-app: slowest database queries" : `${queryDescription}.`}</span>
                  <FiChevronDown />
                  <span className="agent-query-elapsed">{queryElapsed.toFixed(1)}s</span>
                </div>
                <div className="agent-query-detail">
                  {queryStage === "complete" ? <FiCheck /> : <span className="agent-loading-ring" />}
                  <span>{queryStage === "complete" ? "No DB query spans found." : `${queryDescription}...`}</span>
                </div>
              </div>
            )}
          </div>
          <div className="agent-investigation-copy" hidden={!answerVisible}>
            <p>Your <strong>web-app</strong> project is a Next.js frontend application. it doesn&apos;t appear to have any database (<code>db</code>) spans instrumented. There are no DB query spans in the last 14 days.</p>
            <p>This is expected for a pure frontend project. DB queries would typically show up if you had a backend service (e.g., a Node.js API, Python server, etc.) instrumented with Sentry&apos;s server-side SDK.</p>
          </div>
        <div className="agent-response-footer">
        <div className="agent-reference-actions">
          <div className="agent-feedback-icons" aria-hidden="true">
            <FiThumbsUp />
            <FiThumbsDown />
            <FiCopy />
          </div>
          {entryPoint === "response" && handoffControls}
          {entryPoint === "navigation" && compact && <div className="agent-reference-split" aria-hidden="true"><span><AgentIcon agent={activeAgent} /></span><span><FiChevronDown /></span></div>}
        </div>
        <div className="agent-receipt-slot">
        {status !== "ready" && <div
          className={`agent-reference-receipt agent-receipt status-${status}`}
          aria-live={compact ? "off" : "polite"}
        >
          {status === "sending" && (
            <span className="agent-receipt-line">
              <span className="agent-loading-ring" />
              Launching coding agent…
            </span>
          )}
          {status === "sent" && (
            <span className="agent-receipt-line">
              <FiCheck />
              <PreviewControl
                compact={compact}
                label="View demo agent session"
                onClick={() => setSessionOpen(!sessionOpen)}
                className={`agent-session-link ${compact && step === 6 ? "is-highlighted" : ""}`}
              >
                <span>
                  {subject} sent to {activeAgent} Agent Session
                </span>
                <FiLink />
              </PreviewControl>
            </span>
          )}
          {status === "error" && (
            <>
              <span className="agent-receipt-line">
              <FiX />
              <span>Could not open agent session</span>
              <PreviewControl
                compact={compact}
                label="Try again"
                onClick={() => {
                  setFail(false);
                  send(activeAgent);
                }}
              >
                Try again
              </PreviewControl>
              </span>
              <span className="agent-receipt-line agent-receipt-thinking"><span className="agent-loading-ring" />Thinking…</span>
            </>
          )}
        </div>}
        </div>

        </div>
        </div>
        <div className="agent-reference-composer" aria-hidden="true">
          <div className="agent-composer-field">
            <span className="agent-composer-placeholder">{status === "sent" ? "Continue this conversation in your coding agent" : "Ask Seer a question, or press / for commands."}</span>
          </div>
          <i className="agent-composer-action" data-state={inspecting ? "investigating" : busy ? "sending" : status === "sent" ? "transferred" : "ready"}>
            {busy || status === "sent" ? <FiPause /> : <FiArrowRight />}
          </i>
        </div>
        {status !== "ready" && (
          <div key={status} className={`agent-reference-toast ${status}`} aria-hidden="true">
            <span>{status === "sending" ? <span className="agent-loading-ring agent-toast-spinner" /> : status === "sent" ? <FiCheck /> : <FiAlertTriangle />}</span>
            <span>
              {status === "sending"
                ? "Launching coding agent..."
                : status === "sent"
                ? `Successfully sent ${scope} to agent`
                : `Could not send ${scope} to agent`}
            </span>
          </div>
        )}
        {compact && previewStep === undefined && <DemoCursor className="agent-demo-cursor" />}
        {sessionOpen && (
          <div className="agent-demo-session">
            <b>{activeAgent} demo session</b>
            <p>
              {subject} received with its supporting tool calls and question.
            </p>
            <button onClick={() => setSessionOpen(false)}>Close preview</button>
          </div>
        )}
      </div>
      {!compact && (
        <div className="sentry-demo-options agent-reference-options">
          <label>
            Send
            <select
              aria-label="Context to send"
              disabled={busy}
              value={scope}
              onChange={(e) => {
                setScope(e.target.value);
                setState("ready");
              }}
            >
              <option value="response">This response</option>
              <option value="conversation">Full conversation</option>
            </select>
          </label>
          <label>
            Agents
            <select
              aria-label="Agent configuration"
              disabled={busy}
              value={configuration}
              onChange={(e) => {
                setConfiguration(e.target.value);
                if (e.target.value === "single") setAgent("Claude");
                setMenu(false);
                setState("ready");
              }}
            >
              <option value="none">Unconfigured</option>
              <option value="single">Claude only</option>
              <option value="multiple">Claude + Cursor</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              aria-label="Simulate error"
              disabled={busy}
              checked={fail}
              onChange={(e) => setFail(e.target.checked)}
            />
            Simulate error
          </label>
        </div>
      )}
    </div>
  );
}
