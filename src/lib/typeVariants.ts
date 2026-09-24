/* Type systems for the in-page type switcher (?typetest=1). Shared by the React switcher and the static-page script. */
export type TypeVariant = { id: string; name: string; heading: string; body: string; label: string; headingWeight: number; italic?: boolean };

export const typeVariants: TypeVariant[] = [
  { id: 'helvetica', name: 'Helvetica Neue (previous)', heading: '"Helvetica Neue", Helvetica, Arial, sans-serif', body: '"Helvetica Neue", Helvetica, Arial, sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 700 },
  { id: 'crimson', name: 'Crimson Text + Hanken (current)', heading: '"Crimson Text", Georgia, serif', body: '"Hanken Grotesk", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 600 },
  { id: 'instrument', name: 'Instrument Serif italic + Inter', heading: '"Instrument Serif", Georgia, serif', body: 'Inter, sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 400, italic: true },
  { id: 'geist', name: 'Geist + Geist Mono', heading: 'Geist, sans-serif', body: 'Geist, sans-serif', label: '"Geist Mono", monospace', headingWeight: 600 },
  { id: 'newsreader', name: 'Newsreader + Inter + JetBrains Mono', heading: 'Newsreader, Georgia, serif', body: 'Inter, sans-serif', label: '"JetBrains Mono", monospace', headingWeight: 500 },
  { id: 'spacegrotesk', name: 'Space Grotesk + Instrument Sans + Space Mono', heading: '"Space Grotesk", sans-serif', body: '"Instrument Sans", sans-serif', label: '"Space Mono", monospace', headingWeight: 600 },
  { id: 'fraunces', name: 'Fraunces + Instrument Sans', heading: 'Fraunces, Georgia, serif', body: '"Instrument Sans", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 500 },
  { id: 'hanken', name: 'Hanken Grotesk everywhere', heading: '"Hanken Grotesk", sans-serif', body: '"Hanken Grotesk", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 600 },
  { id: 'sentient', name: 'Sentient + Hanken', heading: 'Sentient, Georgia, serif', body: '"Hanken Grotesk", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 500 },
  { id: 'redhat', name: 'Red Hat Display + Hanken', heading: '"Red Hat Display", sans-serif', body: '"Hanken Grotesk", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 600 },
  { id: 'editorialnew', name: 'Editorial New (local) + Hanken', heading: '"PP Editorial New", "Editorial New", Georgia, serif', body: '"Hanken Grotesk", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 400 },
  { id: 'sfrounded', name: 'SF Pro Rounded (Mac) + Hanken', heading: '"SF Pro Rounded", ui-rounded, -apple-system, sans-serif', body: '"Hanken Grotesk", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 600 },
  { id: 'garamond', name: 'Apple Garamond (local) + Hanken', heading: '"Apple Garamond", "Garamond Becker No2", Garamond, "EB Garamond", Georgia, serif', body: '"Hanken Grotesk", sans-serif', label: '"IBM Plex Mono", monospace', headingWeight: 700 },
];

export const typeTestFontLinks = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:ital,wght@0,400;0,500;1,400&family=Space+Grotesk:wght@400;500;600&family=Space+Mono&family=Geist:wght@400;500;600&family=Geist+Mono&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,wght@0,400;0,500;1,400&family=Red+Hat+Display:wght@500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@400;500;600&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap',
  'https://api.fontshare.com/v2/css?f[]=sentient@400,500&display=swap',
];

export function applyTypeVariant(v: TypeVariant | null) {
  const root = document.documentElement;
  if (!v) { root.removeAttribute('data-type'); root.style.removeProperty('--tt-heading'); root.style.removeProperty('--tt-body'); root.style.removeProperty('--tt-label'); root.style.removeProperty('--tt-heading-weight'); root.style.removeProperty('--tt-heading-style'); return; }
  root.dataset.type = v.id;
  root.style.setProperty('--tt-heading', v.heading);
  root.style.setProperty('--tt-body', v.body);
  root.style.setProperty('--tt-label', v.label);
  root.style.setProperty('--tt-heading-weight', String(v.headingWeight));
  root.style.setProperty('--tt-heading-style', v.italic ? 'italic' : 'normal');
}

export function ensureTypeTestFonts() {
  for (const href of typeTestFontLinks) {
    if (document.querySelector(`link[href="${href}"]`)) continue;
    const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; document.head.appendChild(link);
  }
}
