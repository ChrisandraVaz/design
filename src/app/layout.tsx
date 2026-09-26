import type { Metadata } from "next";
import { Caveat, Inter, IBM_Plex_Mono, Instrument_Sans, Roboto, Rubik, Space_Grotesk, Space_Mono } from "next/font/google";
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
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"], weight: ["400", "500", "600"] });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"] });
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
  // suppressHydrationWarning: the inline frame-width script sets a style attribute on <html> before React hydrates.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/favicon.png" type="image/png" sizes="32x32" />
        {/* Dark is the site default. Apply the theme before paint so returning "light" visitors and the default dark both render without a flash. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('portfolio-theme');t=t==='light'?'light':'dark';}catch(e){t='dark';}var r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;})();" }} />
        {/* The gradient sits behind every Sentry card and hero; fetch it before the stylesheet asks for it. */}
        <link rel="preload" as="image" href="/assets/sentry/send-to-agent-background.jpg" fetchPriority="high" />
        {/* Seeds the canvas frame width in px before hydration. Safari mis-evaluates viewport units inside atan2(), so the CSS scale formula reads this instead. Mirrors the .scatter-viewport width rules. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){var r=document.documentElement;function s(){var w=r.clientWidth,f=w>1100?Math.min(1600,w-2*Math.min(56,Math.max(24,.03*w))):w>760?Math.min(1200,w-96):w-40;r.style.setProperty('--frame-width',f+'px')}s();addEventListener('resize',s)})();" }} />
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${roboto.variable} ${rubik.variable} ${caveat.variable} ${spaceGrotesk.variable} ${instrumentSans.variable} ${spaceMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
