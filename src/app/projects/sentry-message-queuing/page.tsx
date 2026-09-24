import type { Metadata } from "next";
import SentryCaseStudy from "@/components/sentry/SentryCaseStudy";
export const metadata: Metadata = {
  title: "Message Queuing · Sentry · Chrisandra Vaz",
  description: "Designing a bounded follow-up queue for Seer at Sentry.",
};
export default function Page() {
  return <SentryCaseStudy kind="message-queuing" />;
}
