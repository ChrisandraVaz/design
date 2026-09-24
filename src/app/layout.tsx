import type { Metadata } from "next";
import { Caveat, Crimson_Text, Hanken_Grotesk, Inter, IBM_Plex_Mono, Roboto, Rubik } from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import "./widgets.css";
import "./projects/trace/trace.css";
import "../../public/case-study.css";
import "../../public/case-typography.css";
import "./responsive.css";
const rubik = Rubik({ variable: "--font-rubik", subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const crimson = Crimson_Text({ variable: "--font-crimson", subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"] });
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["400", "500"] });

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://design-fawn-zeta.vercel.app"),
  title: "Chrisandra Vaz · Product Designer",
  description:
    "Product designer at Waterloo who ships products that click, builds agentic workflows and design systems in Figma and code.",
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    title: "Chrisandra Vaz · Product Designer",
    description:
      "Product designer at Waterloo who ships products that click, builds agentic workflows and design systems in Figma and code.",
    type: "website",
    images: [
      {
        url: "/assets/favicon.png",
        width: 512,
        height: 512,
        alt: "Chrisandra Vaz · Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chrisandra Vaz · Product Designer",
    description:
      "Product designer at Waterloo who ships products that click, builds agentic workflows and design systems in Figma and code.",
    images: ["/assets/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.png" type="image/png" sizes="32x32" />
        {/* The gradient sits behind every Sentry card and hero; fetch it before the stylesheet asks for it. */}
        <link rel="preload" as="image" href="/assets/sentry/send-to-agent-background.jpg" fetchPriority="high" />
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${roboto.variable} ${rubik.variable} ${caveat.variable} ${crimson.variable} ${hanken.variable} antialiased`}>{children}</body>
    </html>
  );
}
