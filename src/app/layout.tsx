import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Roboto, Rubik } from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import "./widgets.css";
import "./projects/trace/trace.css";
import "../../public/case-study.css";
import "./responsive.css";
const rubik = Rubik({ variable: "--font-rubik", subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://design-fawn-zeta.vercel.app"),
  title: "Chrisandra Vaz · Product Designer",
  description:
    "Product designer at Waterloo exploring API component design, design engineering, and agentic UI workflows.",
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    title: "Chrisandra Vaz · Product Designer",
    description:
      "Product designer at Waterloo exploring API component design, design engineering, and agentic UI workflows.",
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
      "Product designer at Waterloo exploring API component design, design engineering, and agentic UI workflows.",
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
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} ${roboto.variable} ${rubik.variable} antialiased`}>{children}</body>
    </html>
  );
}
