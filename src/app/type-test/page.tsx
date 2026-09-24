import type { Metadata } from 'next';
import { Instrument_Serif, Newsreader, Space_Grotesk, Space_Mono, Geist, Geist_Mono, Instrument_Sans, JetBrains_Mono, Fraunces, Hanken_Grotesk, Crimson_Text, Red_Hat_Display, EB_Garamond } from 'next/font/google';
import './type-test.css';

export const metadata: Metadata = { title: 'Type test · Chrisandra Vaz', robots: { index: false, follow: false } };

const instrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--tt-instrument-serif' });
const newsreader = Newsreader({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--tt-newsreader' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--tt-space-grotesk' });
const spaceMono = Space_Mono({ subsets: ['latin'], weight: '400', variable: '--tt-space-mono' });
const geist = Geist({ subsets: ['latin'], variable: '--tt-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--tt-geist-mono' });
const instrumentSans = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--tt-instrument-sans' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--tt-jetbrains' });
const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--tt-hanken' });
const crimson = Crimson_Text({ subsets: ['latin'], weight: ['400', '600'], style: ['normal', 'italic'], variable: '--tt-crimson' });
const redHat = Red_Hat_Display({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--tt-redhat' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--tt-garamond' });
const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--tt-fraunces' });

const variants = [
  { id: 'v1', name: '01 · Current', note: 'Helvetica Neue for everything, IBM Plex Mono for labels.' },
  { id: 'v2', name: '02 · Editorial italic', note: 'Instrument Serif italic headlines, Inter body, IBM Plex Mono labels. Closest to the Persona reference.' },
  { id: 'v3', name: '03 · Geist', note: 'Geist headlines and body, Geist Mono labels. Quiet, engineering-leaning.' },
  { id: 'v4', name: '04 · Newsreader', note: 'Newsreader headlines, Inter body, JetBrains Mono labels. Warmer serif, upright.' },
  { id: 'v5', name: '05 · Space Grotesk', note: 'Space Grotesk headlines, Instrument Sans body, Space Mono labels. More character, still a grotesk.' },
  { id: 'v6', name: '06 · Fraunces', note: 'Fraunces headlines, Instrument Sans body, IBM Plex Mono labels. Soft serif with personality.' },
  { id: 'v7', name: '07 · Hanken Grotesk', note: 'Hanken Grotesk for everything, IBM Plex Mono labels. Soft, rounder than Inter, not Figma-default.' },
  { id: 'v8', name: '08 · Sentient + Hanken', note: 'Sentient (Fontshare) headlines, Hanken Grotesk body, IBM Plex Mono labels. Fun serif over a soft grotesk.' },
  { id: 'v9', name: '09 · Crimson Text + Hanken', note: 'Crimson Text headlines, Hanken Grotesk body, IBM Plex Mono labels. Bookish serif.' },
  { id: 'v10', name: '10 · Red Hat Display + Hanken', note: 'Red Hat Display headlines, Hanken Grotesk body, IBM Plex Mono labels. Friendly geometric.' },
  { id: 'v11', name: '11 · Editorial New + Hanken', note: 'PP Editorial New headlines if installed on this Mac (not hostable without the license file), Hanken Grotesk body.' },
  { id: 'v13', name: '13 · Apple Garamond + Hanken', note: 'Apple Garamond Regular headlines if installed (falls back to the Garamond files on this Mac, then EB Garamond), Hanken Grotesk body.' },
  { id: 'v12', name: '12 · SF Pro Rounded + Hanken', note: 'SF Pro Rounded headlines (Apple system font, renders on Mac only), Hanken Grotesk body.' },
];

export default function TypeTestPage() {
  return (
    <main className={`tt ${instrumentSerif.variable} ${newsreader.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${geist.variable} ${geistMono.variable} ${instrumentSans.variable} ${jetbrains.variable} ${fraunces.variable} ${hanken.variable} ${crimson.variable} ${redHat.variable} ${ebGaramond.variable}`}>
      <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=sentient@400,500&display=swap" />
      <header className="tt-intro">
        <p className="tt-eyebrow">Type test · not linked</p>
        <h1>Thirteen type systems on the same Split Panel passage</h1>
        <p>Each block uses the same copy and sizes. Only the families change: H1, body, subtext, and the small-caps label.</p>
      </header>
      {variants.map(v => (
        <section key={v.id} className={`tt-variant tt-${v.id}`}>
          <div className="tt-meta"><strong>{v.name}</strong><span>{v.note}</span></div>
          <article className="tt-sample">
            <p className="tt-label">Split Panel, Sentry internship, 2026</p>
            <h2 className="tt-h1">One split panel the whole product can share</h2>
            <p className="tt-dek">Designing the shared contract between a resizable panel and the teams that adopt it.</p>
            <p className="tt-kicker">The problem</p>
            <h3 className="tt-h2">One divider, inconsistent behavior.</h3>
            <p className="tt-body">Teams had built resizable panels independently. Similar lines concealed different assumptions about layout, interaction states, and keyboard behavior. In the instances I audited, only one had keyboard support and ARIA attributes.</p>
            <p className="tt-body">A common visual treatment would leave those differences unresolved. The component needed a shared interaction model, a design representation of its code API, and a realistic path for existing screens to adopt it.</p>
            <dl className="tt-facts"><div><dt>Role</dt><dd>Component design &amp; migration</dd></div><div><dt>Timeline</dt><dd>Summer 2026</dd></div><div><dt>Team</dt><dd>Design Foundations, Scraps</dd></div></dl>
            <p className="tt-caption">The existing interaction in Session Replay and Seer. Original product recording.</p>
          </article>
        </section>
      ))}
    </main>
  );
}
