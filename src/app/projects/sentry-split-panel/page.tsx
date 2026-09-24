import type { Metadata } from "next";
import SentryCaseStudy from "@/components/sentry/SentryCaseStudy";
export const metadata: Metadata = {
  title: "Split Panel · Sentry · Chrisandra Vaz",
  description:
    "Connecting Sentry’s shared SplitPanel component to Figma, documentation, and migration.",
};
export default function Page() {
  return <SentryCaseStudy kind="split-panel" />;
}
