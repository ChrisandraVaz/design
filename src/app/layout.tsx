import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Vaz Portfolio",
  description: "Designer at Waterloo who ships products that click and cultivates thriving design communities.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Vaz Portfolio",
    description: "Designer at Waterloo who ships products that click and cultivates thriving design communities.",
    type: "website",
    images: [{ url: "/favicon.png", width: 512, height: 512, alt: "Vaz Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaz Portfolio",
    description: "Designer at Waterloo who ships products that click and cultivates thriving design communities.",
    images: ["/favicon.png"],
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
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${ibmPlexMono.variable} antialiased`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
