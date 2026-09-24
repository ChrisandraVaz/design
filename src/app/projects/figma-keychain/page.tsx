import type { Metadata } from 'next';
import MinimalWorkPage from '@/components/MinimalWorkPage';

export const metadata: Metadata = {
  title: 'Keychain Exploration · Figma for Edu · Chrisandra Vaz',
  description: 'Merch concepts for Figma for Edu: knotted charms, braided lanyards, and an embroidered tag.',
};

export default function FigmaKeychainPage() {
  return (
    <MinimalWorkPage
      eyebrow="Keychain exploration, Figma for Edu, 2025"
      title="Figma for Edu keychain exploration"
      description="Three merch directions for Figma for Edu: knotted cord charms in six colours, braided lanyards with clover enamel tags, and an embroidered black tag with a flower charm."
      hero={{ src: '/assets/figma-edu/keychain-braids.jpg', alt: 'Three braided cord keychains with purple clover Figma for Edu enamel tags', width: 1020, height: 602 }}
      meta={[
        { label: 'Role', value: 'Merch and visual design' },
        { label: 'Timeline', value: '2025' },
        { label: 'Team', value: 'Figma Campus Leader, self-initiated' },
        { label: 'Status', value: 'Exploration concept' },
      ]}
      images={[
        { src: '/assets/figma-edu/keychain-knots.jpg', alt: 'Six knotted cord charms in pink, blue, green, orange, lime, and lilac with a Figma flower charm', width: 527, height: 713, caption: 'Knotted cord charms' },
        { src: '/assets/figma-edu/keychain-tag.jpg', alt: 'Black embroidered Figma for Edu tag with a pink flower enamel charm', width: 493, height: 723, caption: 'Embroidered tag' },
      ]}
    />
  );
}
