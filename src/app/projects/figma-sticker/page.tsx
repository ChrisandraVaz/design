import type { Metadata } from 'next';
import MinimalWorkPage from '@/components/MinimalWorkPage';

export const metadata: Metadata = {
  title: 'Figma Shortcut Sticker · FigBuild 2026 · Chrisandra Vaz',
  description: 'A keyboard shortcut reference sticker for Figma for Edu, shipped as FigBuild 2026 merch.',
};

export default function FigmaStickerPage() {
  return (
    <MinimalWorkPage
      eyebrow="Figma shortcut sticker, FigBuild 2026, shipped"
      title="Figma shortcut sticker"
      description="A laptop sticker that puts Figma’s keyboard shortcuts within reach: tools, edit, view, text, selection, components, arrange, and transform, in dark and light versions."
      meta={[
        { label: 'Role', value: 'Visual design' },
        { label: 'Timeline', value: '2026' },
        { label: 'Team', value: 'Figma for Edu' },
        { label: 'Status', value: 'Shipped, FigBuild 2026 merch' },
      ]}
      images={[
        { src: '/assets/figma-edu/sticker-dark.png', alt: 'Dark version of the Figma for Edu shortcut sticker on a white background', width: 900, height: 900, frame: 'light', caption: 'Dark version' },
        { src: '/assets/figma-edu/sticker-light.png', alt: 'Light version of the Figma for Edu shortcut sticker on a dark background', width: 900, height: 900, frame: 'dark', caption: 'Light version' },
      ]}
    />
  );
}
