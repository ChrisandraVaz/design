"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  FiArrowUp,
  FiMoreHorizontal,
  FiTrash2,
} from "react-icons/fi";
import type { SentryProjectId } from "@/lib/sentry/projects";
import "./sentry-ui.css";
import { RelativeTimePreview, SplitPanelPreview } from "./SentryReferencePreviews";
import {SeerMark} from "./SeerMark";
export {SeerMark} from "./SeerMark";
import {SeerChatHeader} from "./SeerChatHeader";
import { AgentDemo } from "./SendToAgentDemo";
import AgentMotionPreview from "./AgentMotionPreview";
export { AgentDemo } from "./SendToAgentDemo";

type DemoProps = { compact?: boolean; paused?: boolean };
function useSequence(enabled: boolean, length = 5, initial = 0) {
  const [step, setStep] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (ref.current) observer.observe(ref.current);
    const timer = setInterval(() => {
      if (visible && !document.hidden && !motion.matches)
        setStep((s) => (s + 1) % length);
    }, 2400);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [enabled, length]);
  return { step, ref };
}
function Thinking({ label = "Investigating" }: { label?: string }) {
  return (
    <span className="sentry-thinking">
      <i />
      <i />
      <i />
      <span>{label}</span>
    </span>
  );
}
const sampleQueue = [
  "Which 500 errors should engineering look at first?",
  "Are they tied to the same deploy?",
];
export function QueueDemo({ compact = false, paused = false }: DemoProps) {
  const { step, ref } = useSequence(compact && !paused, 8, 1);
  const [pending, setPending] = useState<string[]>([]);
  const [input, setInput] = useState(sampleQueue[0]);
  const [working, setWorking] = useState(true);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(
    "What changed in the latest deploy?",
  );
  const [run, setRun] = useState(0);
  const [started, setStarted] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const queue = compact
    ? step === 1
      ? [sampleQueue[0]]
      : step === 2 || step === 3
        ? sampleQueue
        : step === 4 || step === 5
          ? [sampleQueue[1]]
          : []
    : pending;
  const busy = compact ? ![3, 5, 7].includes(step) : working;
  useEffect(() => {
    if (compact || !working || !started) return;
    const timer = setTimeout(() => {
      setAnswer(
        question.toLowerCase().includes("tied")
          ? "Yes. These failures began after the checkout release at 14:20 UTC."
          : "The error spike starts with the latest deploy. Start with the checkout service.",
      );
      setWorking(false);
    }, 6500);
    return () => clearTimeout(timer);
  }, [compact, working, question, run, started]);
  useEffect(() => {
    if (compact || working || pending.length === 0) return;
    const timer = setTimeout(() => {
      setQuestion(pending[0]);
      setPending((p) => p.slice(1));
      setAnswer("");
      setExpanded(null);
      setWorking(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, [compact, working, pending]);
  const submit = () => {
    const value = input.trim();
    if (!value || pending.length >= 2) return;
    if (working || pending.length > 0) setPending((p) => [...p, value]);
    else {
      setQuestion(value);
      setWorking(true);
      setAnswer("");
    }
    setInput("");
  };
  const reset = () => {
    setStarted(true);
    setPending([]);
    setAnswer("");
    setInput(sampleQueue[0]);
    setQuestion("What changed in the latest deploy?");
    setExpanded(null);
    setWorking(true);
    setRun((r) => r + 1);
  };
  return (
    <div
      ref={ref}
      className={`sentry-demo sentry-queue ${compact ? "is-compact" : ""}`}
      data-phase={step}
      data-paused={paused}
      onFocusCapture={() => {
        if (!compact) setStarted(true);
      }}
      onPointerDownCapture={() => {
        if (!compact) setStarted(true);
      }}
    >
      <SeerChatHeader variant="agent" onNewChat={compact ? undefined : reset} />
      <div className="queue-conversation">
        <div className="sentry-user-message">
          {compact
            ? step < 4
              ? "What changed in the latest deploy?"
              : step < 6
                ? sampleQueue[0]
                : sampleQueue[1]
            : question}
        </div>
        {busy ? (
          <Thinking />
        ) : (
          <div className="sentry-answer">
            <SeerMark />
            <span>
              {compact
                ? step === 3
                  ? "Checkout errors rose after the release."
                  : step === 5
                    ? "Start with the checkout service."
                    : "Yes. They began with the same deploy."
                : answer}
            </span>
          </div>
        )}
      </div>
      <div className="queue-bottom">
        <div className="queue-pending" aria-label="Pending messages">
          {queue.map((message, i) => (
            <div className="queue-item" key={message + i}>
              <span className={expanded === i ? "is-expanded" : ""}>
                {message}
              </span>
              {compact ? (
                <FiTrash2 />
              ) : (
                <>
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    aria-label={`Read full pending message ${i + 1}`}
                    aria-expanded={expanded === i}
                  >
                    <FiMoreHorizontal />
                  </button>
                  <button
                    aria-label={`Delete pending message ${i + 1}`}
                    title="Delete pending message"
                    onClick={() => {
                      setPending((p) => p.filter((_, j) => j !== i));
                      setExpanded(null);
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
        {compact ? (
          <div
            className={`queue-composer ${queue.length === 2 ? "at-capacity" : ""}`}
          >
            <span>
              {queue.length === 2
                ? "Clear queue to type a new message"
                : "Ask a follow-up…"}
            </span>
            <FiArrowUp />
          </div>
        ) : (
          <form
            className="queue-composer"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <input
              aria-label="Message to Seer"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={pending.length === 2}
              placeholder={
                pending.length === 2
                  ? "Clear queue to type a new message"
                  : "Ask a follow-up…"
              }
            />
            <button
              aria-label="Send message"
              disabled={!input.trim() || pending.length === 2}
            >
              <FiArrowUp />
            </button>
          </form>
        )}
        {!compact && (
          <span className="sentry-demo-note" role="status">
            {pending.length === 2
              ? "Queue full · Delete a pending message to keep writing."
              : `${pending.length} of 2 pending · Messages send in order.`}
          </span>
        )}
      </div>
    </div>
  );
}
export function SplitDemo({ compact = false, paused = false }: DemoProps) {
  const { step, ref } = useSequence(compact && !paused, 6);
  const [size, setSize] = useState(48);
  const [vertical, setVertical] = useState(false);
  const [dragging, setDragging] = useState(false);
  const pane = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const ratio = compact ? [48, 48, 62, 62, 38, 48][step] : size;
  const id = useId();
  const change = (value: number) => setSize(Math.min(72, Math.max(28, value)));
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    const delta = e.shiftKey ? 10 : 2;
    const next =
      e.key === "Home"
        ? 28
        : e.key === "End"
          ? 72
          : e.key === "ArrowLeft" || e.key === "ArrowUp"
            ? size - delta
            : e.key === "ArrowRight" || e.key === "ArrowDown"
              ? size + delta
              : null;
    if (next !== null) {
      e.preventDefault();
      change(next);
    }
  };
  return (
    <div
      ref={ref}
      className={`sentry-demo sentry-split ${compact ? "is-compact" : ""}`}
    >
      <div className="sentry-demo-top"><span>SplitPanel</span><span className="sentry-muted">Scraps · Layout</span></div>
      <div
        className={`split-workspace ${vertical ? "is-vertical" : ""}`}
        ref={pane}
        style={{ "--pane-size": `${ratio}%` } as CSSProperties}
      >
        <div className="split-code" id={id}><strong>Sized pane</strong></div>
        <div
          className={`split-divider ${dragging ? "is-dragging" : ""}`}
          role={compact ? undefined : "separator"}
          tabIndex={compact ? undefined : 0}
          aria-label={compact ? undefined : "Resize panels"}
          aria-orientation={vertical ? "horizontal" : "vertical"}
          aria-valuemin={compact ? undefined : 28}
          aria-valuemax={compact ? undefined : 72}
          aria-valuenow={compact ? undefined : Math.round(size)}
          aria-controls={compact ? undefined : id}
          onKeyDown={key}
          onDoubleClick={() => setSize(48)}
          onPointerDown={(e) => {
            if (compact) return;
            e.stopPropagation();
            e.currentTarget.focus();
            active.current = true;
            setDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!active.current || !pane.current) return;
            const b = pane.current.getBoundingClientRect();
            change(
              vertical
                ? ((e.clientY - b.y) / b.height) * 100
                : ((e.clientX - b.x) / b.width) * 100,
            );
          }}
          onPointerUp={() => {
            active.current = false;
            setDragging(false);
          }}
          onPointerCancel={() => {
            active.current = false;
            setDragging(false);
          }}
        >
          <i />
        </div>
        <div className="split-insight"><strong>Fill pane</strong></div>
      </div>
      <div className="split-status">
        <span>
          {compact
            ? "One shared drag handle"
            : "Drag, use arrow keys, or double-click to reset"}
        </span>
        {compact ? (
          <span>
            {ratio}% / {100 - ratio}%
          </span>
        ) : (
          <button onClick={() => setVertical(!vertical)}>
            {vertical ? "Side by side" : "Stack panels"}
          </button>
        )}
      </div>
    </div>
  );
}
const timestamp = "2026-08-12T17:20:00.000Z";
const subscribeToTimezone = () => () => {};
const browserTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
const serverTimezone = () => "America/Los_Angeles";
function dateParts(zone: string) {
  const date = new Date(timestamp);
  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: zone,
    }).format(date),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: zone,
    }).format(date),
    abbr: new Intl.DateTimeFormat("en-US", {
      timeZoneName: "short",
      timeZone: zone,
    })
      .formatToParts(date)
      .find((p) => p.type === "timeZoneName")!.value,
  };
}
export function TimeDemo({ compact = false, paused = false }: DemoProps) {
  const { step, ref } = useSequence(compact && !paused, 4);
  const browserZone = useSyncExternalStore(
    subscribeToTimezone,
    browserTimezone,
    serverTimezone,
  );
  const [selectedZone, setZone] = useState<string | null>(null);
  const zone = selectedZone ?? (compact ? "America/Los_Angeles" : browserZone);
  const [open, setOpen] = useState(true);
  const [field, setField] = useState("Last seen");
  const id = useId();
  const local = dateParts(zone),
    utc = dateParts("UTC");
  return (
    <div
      ref={ref}
      className={`sentry-demo sentry-time ${compact ? "is-compact" : ""}`}
    >
      <div className="time-table">
        <div className="time-table-head">
          <span>Issue</span>
          <span>Last seen</span>
        </div>
        <div className="time-table-row">
          <span>
            <i /> Session not ready
          </span>
          {compact ? (
            <span className="time-trigger">3hr ago</span>
          ) : (
            <button
              className="time-trigger"
              aria-expanded={open}
              aria-controls={id}
              onClick={() => setOpen(true)}
              onMouseEnter={() => setOpen(true)}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              3hr ago
            </button>
          )}
        </div>
        <div className="time-table-row time-row-muted">
          <span>
            <i /> Request timed out
          </span>
          <span>1d ago</span>
        </div>
      </div>
      <div
        id={id}
        style={
          {
            "--zone-label-width": `${Math.max(2.6, local.abbr.length * .6 + .6)}em`,
          } as CSSProperties
        }
        className={`time-tooltip ${compact ? (step === 3 ? "time-tooltip-muted" : "") : open ? "" : "is-hidden"}`}
      >
        <header>
          <strong>{field}</strong>
          <span>3hr ago</span>
        </header>
        <div>
          <span className="timezone-local">{local.abbr}</span>
          <span>{local.date}</span>
          <time dateTime={timestamp}>{local.time}</time>
        </div>
        <div>
          <span className="timezone-utc">UTC</span>
          <span>{utc.date}</span>
          <time dateTime={timestamp}>{utc.time}</time>
        </div>
      </div>
      {!compact && (
        <div className="sentry-demo-options">
          <label>
            Timezone{" "}
            <select
              aria-label="Timezone"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
            >
              {Array.from(
                new Set([
                  zone,
                  "America/Los_Angeles",
                  "America/Toronto",
                  "Europe/Vienna",
                  "Asia/Kolkata",
                  "Asia/Tokyo",
                ]),
              ).map((z) => (
                <option key={z} value={z}>
                  {z.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>
          <label>
            Label{" "}
            <select
              aria-label="Label"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <option>Last seen</option>
              <option>First seen</option>
            </select>
          </label>
          <span className="sentry-demo-note">
            Example captured Aug 12, 2026 · 20:20 UTC
          </span>
        </div>
      )}
    </div>
  );
}
export function SentryDemo({
  kind,
  ...props
}: DemoProps & { kind: SentryProjectId }) {
  return kind === "message-queuing" ? (
    <QueueDemo {...props} />
  ) : kind === "send-to-agent" ? (
    props.compact ? <AgentMotionPreview paused={props.paused} /> : <AgentDemo {...props} />
  ) : kind === "split-panel" ? (
    props.compact ? <SplitPanelPreview paused={props.paused} /> : <SplitDemo {...props} />
  ) : (
    props.compact ? <RelativeTimePreview paused={props.paused} /> : <TimeDemo {...props} />
  );
}
