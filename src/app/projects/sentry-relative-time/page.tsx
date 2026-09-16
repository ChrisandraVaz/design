import type { Metadata } from "next";
import SentryCaseStudy from "@/components/sentry/SentryCaseStudy";
export const metadata: Metadata = {
  title: "Relative Time · Sentry — Chrisandra Vaz",
  description:
    "Designing a shared timestamp hovercard with local time and UTC.",
};
export default function Page() {
  return <SentryCaseStudy kind="relative-time" />;
}
