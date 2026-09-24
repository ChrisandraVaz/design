import type { Metadata } from 'next';
import MinimalWorkPage from '@/components/MinimalWorkPage';

export const metadata: Metadata = {
  title: 'FigBuild 2025 · Figma for Edu · Chrisandra Vaz',
  description: 'Campaign and content assets for FigBuild 2025, Figma for Edu’s inaugural multi-campus designathon.',
};

const flyers = [
  ['announcement', 'FigBuild 2025 official event announcement, a multi-campus designathon by Figma for Edu'],
  ['join-us', 'Join us in person or online: stream the session via Zoom or attend a campus watch party'],
  ['campuses', 'Participating campuses, from California College of the Arts to UCLA'],
  ['workshop-miggi', 'Miggi Cardona’s hands-on workshop: concept to clickable prototype'],
  ['workshop-steph', 'Steph Zhou’s workshop on telling a compelling story with Figma Slides'],
  ['register', 'Register your team by Saturday April 19, 3pm ET'],
  ['countdown-1', 'Countdown flyer, one'],
  ['countdown-2', 'Countdown flyer, two'],
] as const;

export default function FigBuildPage() {
  return (
    <MinimalWorkPage
      eyebrow="FigBuild 2025, Figma for Edu, shipped"
      title="FigBuild 2025 campaign assets"
      description="Campaign and content assets for Figma’s inaugural designathon, run across eight universities."
      hero={{ src: '/assets/figbuild-overview.jpg', alt: 'FigBuild 2025 campaign assets overview', width: 1800, height: 1100 }}
      meta={[
        { label: 'Role', value: 'Content designer' },
        { label: 'Timeline', value: '2025 designathon season' },
        { label: 'Team', value: 'Figma Campus + student organizers' },
        { label: 'Scope', value: 'Cross-campus campaign assets' },
      ]}
      images={flyers.map(([name, alt]) => ({ src: `/assets/figbuild/${name}.jpg`, alt, width: 1080, height: 1080 }))}
    />
  );
}
