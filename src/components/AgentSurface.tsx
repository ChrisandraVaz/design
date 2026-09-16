"use client";
import { FiArrowUpRight, FiCheck, FiCommand, FiMoreHorizontal, FiArrowRight, FiLayers } from "react-icons/fi";
type Props = { compact?: boolean; state?: "ready" | "running" | "review" | "done"; overlay?: number; before?: boolean; onRun?: () => void; onApprove?: () => void; onReset?: () => void; };
export default function AgentSurface({ compact = false, state = "review", overlay = -1, before = false, onRun, onApprove, onReset }: Props) {
  return <div className={`agent-surface ${before ? "agent-before" : ""}`}>
    <div className="agent-top"><span className="agent-symbol"><FiCommand /></span><span>Workspace <span className="agent-slash">/</span> Research</span><FiMoreHorizontal /></div>
    <div className="agent-content">
      <div className="agent-title-row"><span className="agent-kicker">WORKFLOW 024</span><span className="agent-status"><i />{state === "running" ? "Working" : state === "done" ? "Complete" : state === "ready" ? "Ready" : "Needs you"}</span></div>
      <h3>A little clarity,<br />before the next step.</h3>
      <p className="agent-description">Turn scattered research into a brief<br />you can move forward with.</p>
      <div className={`agent-task ${overlay === 0 ? "agent-highlight" : ""}`}><div className="agent-task-icon"><FiLayers /></div><div><strong>Prepare a research brief</strong><span>3 sources · Product discovery</span></div><FiArrowUpRight /></div>
      <div className={`agent-timeline ${overlay === 1 ? "agent-highlight" : ""}`}>
        <div><span className="agent-check">{state === "ready" ? "·" : <FiCheck />}</span><span>Read the source material</span><small>{state === "ready" ? "Queued" : "3 files"}</small></div>
        <div><span className={`agent-check ${state === "running" ? "agent-pulse" : ""}`}>{state === "ready" ? "·" : <FiCheck />}</span><span>Find the common threads</span><small>{state === "ready" ? "Queued" : state === "running" ? "In progress" : "5 themes"}</small></div>
        <div><span className="agent-review-dot"/><span>{state === "done" ? "Brief approved" : "Review before saving"}</span><small>{state === "done" ? "Done" : state === "review" ? "Your turn" : "Waiting"}</small></div>
      </div>
      <div className={`agent-approval ${overlay === 2 ? "agent-highlight" : ""}`}><span className="agent-kicker">{state === "done" ? "SAVED IN THIS DEMO" : "A HUMAN CHECKPOINT"}</span><p>{state === "done" ? "Your brief is ready." : state === "ready" ? "You decide when to begin." : state === "running" ? "Finding the common threads…" : "The brief is ready for your eyes."}</p><span>{state === "done" ? "Nothing was sent to an external service." : "Nothing is saved until you approve."}</span>
        {!compact && state === "review" && <div className="agent-brief">Draft: prioritize clear status, inspectable sources, and an explicit approval step.</div>}
        {compact ? <div className="agent-action">Review brief <FiArrowRight /></div> : <button className="agent-action" disabled={state === "running"} onClick={state === "ready" ? onRun : state === "review" ? onApprove : state === "done" ? onReset : undefined}>{state === "ready" ? "Run demo" : state === "running" ? "Reading sources…" : state === "done" ? "Reset demo" : "Approve brief"}<FiArrowRight /></button>}
      </div>
    </div>
    <div className="agent-bottom"><span>↳ {compact ? "Designed for a thoughtful handoff" : "Interactive concept · Simulated data"}</span><span>⌘ ↵</span></div>
    {overlay === 3 && <div className="agent-padding" aria-hidden="true"><i/><i/></div>}
  </div>;
}
