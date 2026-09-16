export type SentryProjectId =
  "message-queuing" | "send-to-agent" | "split-panel" | "relative-time";
export const sentryProjects = {
  "message-queuing": {
    title: "Message Queuing",
    eyebrow: "Seer · AI/ML",
    headline: "Ask a follow-up while Seer is still working.",
    summary:
      "Making room for the next question while an AI investigation is still running.",
    status: "Final design",
    number: "01",
  },
  "send-to-agent": {
    title: "Send to Agent",
    eyebrow: "Seer · AI/ML",
    headline: "Send Seer’s investigation to a coding agent.",
    summary:
      "A designed handoff from an investigation in Seer to the coding agent a developer already uses.",
    status: "Approved for implementation",
    number: "02",
  },
  "split-panel": {
    title: "Split Panel",
    eyebrow: "Scraps · Design Foundations",
    headline: "A reusable split panel for Sentry.",
    summary:
      "Connecting a new code component to Figma, documentation, and a practical migration path.",
    status: "Library delivered · Migration started",
    number: "03",
  },
  "relative-time": {
    title: "Relative Time",
    eyebrow: "Scraps · Design Foundations",
    headline: "Making timestamps easier to compare.",
    summary:
      "Turning a timestamp hovercard into a shared system for presenting time and telemetry.",
    status: "Figma complete · Code in progress",
    number: "04",
  },
} as const;
export const sentrySlots: Record<number, SentryProjectId> = {
  1: "message-queuing",
  9: "send-to-agent",
  2: "split-panel",
  3: "relative-time",
};
