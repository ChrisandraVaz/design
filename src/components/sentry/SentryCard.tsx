"use client";
import Link from "next/link";
import { SentryDemo } from "./SentryDemos";
import { sentryProjects, type SentryProjectId } from "@/lib/sentry/projects";
import "./sentry-covers.css";

export default function SentryCard({ kind }: { kind: SentryProjectId }) {
  const project = sentryProjects[kind];
  const comingSoon = kind !== "send-to-agent";
  const artwork = <div className="sentry-preview-art" aria-hidden="true"><SentryDemo kind={kind} compact /></div>;
  return (
    <div
      className={`sentry-preview-card sentry-preview-${kind}${comingSoon ? " coming-soon-card" : ""}`}
      tabIndex={comingSoon ? 0 : undefined}
      aria-label={comingSoon ? `${project.title}, case study coming soon` : undefined}
    >
      {comingSoon ? <div className="sentry-preview-link">{artwork}</div> : (
        <Link href={`/projects/sentry-${kind}`} className="sentry-preview-link" aria-label={`Read ${project.title} case study`}>
          {artwork}
        </Link>
      )}
    </div>
  );
}
