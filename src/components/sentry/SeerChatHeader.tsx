import type {ReactNode} from "react";
import {FiClock, FiCopy, FiLink, FiMoreHorizontal, FiPlus, FiX} from "react-icons/fi";
import "./seer-chat-header.css";

/** The production header's spacing, with a light surface for the portfolio. */
export function SeerChatHeader({onNewChat, variant = "full", action}: {onNewChat?: () => void; variant?: "full" | "agent"; action?: ReactNode}) {
  return <header className={`seer-chat-header ${variant === "agent" ? "seer-chat-header-agent" : ""}`}>
    <span className="seer-chat-identity">
      <span className="seer-chat-close" aria-hidden="true"><FiX /></span>
      <span className="seer-chat-name">Seer Agent</span>
      <span className="seer-chat-beta" aria-label="Beta">
        {variant === "agent" ? (
          // getsentry/sentry static/app/icons/iconLab.tsx, solid variant.
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M12.25 0.5C12.66 0.5 13 0.84 13 1.25C13 1.66 12.66 2 12.25 2H11.5V6.53L14.67 11.55C15.56 12.95 14.67 14.76 13.1 14.98C12.99 14.99 12.89 15 12.77 15H3.23L3.06 14.99C3.01 14.99 2.95 14.98 2.9 14.98C2.74 14.96 2.59 14.92 2.45 14.87C2.26 14.8 2.08 14.7 1.92 14.59C1.45 14.25 1.12 13.73 1.01 13.16C0.99 13.06 0.98 12.96 0.97 12.87C0.97 12.82 0.97 12.77 0.97 12.72C0.97 12.57 0.99 12.42 1.02 12.27C1.05 12.12 1.1 11.98 1.17 11.83C1.21 11.74 1.26 11.64 1.32 11.55L2.94 9L4.5 6.53V2H3.75C3.34 2 3 1.66 3 1.25C3 0.84 3.34 0.5 3.75 0.5H12.25ZM6 6.75C6 6.89 5.96 7.03 5.88 7.15L4.71 9H11.29L10.12 7.15C10.04 7.03 10 6.89 10 6.75V2H6V6.75Z" /></svg>
        ) : (<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 1h6v1H10v4.5l3.7 6.1c.6 1-.1 2.4-1.3 2.4H3.6c-1.2 0-1.9-1.4-1.3-2.4L6 6.5V2H5V1Zm2.3 1v4.9L5.5 10h5L8.7 6.9V2H7.3Z" fill="currentColor" fillRule="evenodd" /></svg>)}
      </span>
    </span>
    <span className="seer-chat-tools">
      {action}
      {variant === "agent" ? <span className="seer-chat-utility" aria-hidden="true"><FiMoreHorizontal /></span> : <>
      <span className="seer-chat-utility" aria-hidden="true"><FiCopy /></span>
      <span className="seer-chat-utility" aria-hidden="true"><FiLink /></span>
      <span className="seer-chat-utility" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M4 6h.01M6.5 6h.01M9 6h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg></span>
      </>}
      <span className="seer-chat-utility" aria-hidden="true"><FiClock /></span>
      {onNewChat ? <button className="seer-chat-new" onClick={onNewChat} aria-label="Restart queue example"><FiPlus />{variant !== "agent" && "New chat"}</button> : <span className="seer-chat-new" aria-hidden="true"><FiPlus />{variant !== "agent" && "New chat"}</span>}
    </span>
  </header>;
}
