"use client";
import Link from "next/link";
import { SentryDemo } from "./SentryDemos";
import { sentryProjects, type SentryProjectId } from "@/lib/sentry/projects";
import "./sentry-covers.css";

export default function SentryCard({ kind }: { kind: SentryProjectId }) {
  const project = sentryProjects[kind];
  return (
    <div
      className={`sentry-preview-card sentry-preview-${kind}`}
    >
      <Link
        href={`/projects/sentry-${kind}`}
        className="sentry-preview-link"
        aria-label={`Read ${project.title} case study`}
      >
        <div className="sentry-preview-art" aria-hidden="true">
          <SentryDemo kind={kind} compact />
        </div>
        <span className="card-kind">Sentry Internship · Case Study</span>
      </Link>
    </div>
  );
}
