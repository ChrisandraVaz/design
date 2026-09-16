import type { Metadata } from "next";
import SentryCaseStudy from "@/components/sentry/SentryCaseStudy";
export const metadata: Metadata = {
  title: "Send to Agent · Sentry — Chrisandra Vaz",
  description:
    "Designing the handoff from a Seer investigation to a coding agent.",
};
export default function Page() {
  return <SentryCaseStudy kind="send-to-agent" />;
}
