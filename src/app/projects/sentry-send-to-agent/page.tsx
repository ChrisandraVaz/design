import type { Metadata } from "next";
import SendToAgentCaseStudy from "@/components/sentry/SendToAgentCaseStudy";
import { Instrument_Sans, Source_Serif_4 } from "next/font/google";
const instrument = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], weight: "400", style: "italic" });
export const metadata: Metadata = {
  title: "Seer Agent: Send to Agent Feature · Sentry · Chrisandra Vaz",
  description:
    "Designing the handoff from a Seer investigation to a coding agent.",
};
export default function Page() {
  return <div className={`${instrument.variable} ${sourceSerif.variable}`}><SendToAgentCaseStudy /></div>;
}
