import Link from 'next/link';
import '../../public/case-study-related.css';
const studies = [
  { id: 'fontcontext', href: '/fontcontext.html', title: 'FontContext', description: 'A self-initiated Figma plugin, designed, built, and shipped.' },
  { id: 'send-to-agent', href: '/projects/sentry-send-to-agent', title: 'Send to Agent', description: 'Payload scope and interaction design for an agent handoff.' },
  { id: 'relative-time', href: '/projects/sentry-relative-time', title: 'Relative Time', description: 'A shipped component built from shared tooltip primitives.' },
];
export default function RelatedCaseStudies({ current }: { current: string }) {
  return <nav className="related-studies" aria-label="More selected case studies">
    <h2>More selected work</h2>
    <div className="related-studies-grid">{studies.filter(s => s.id !== current).map(s => <Link href={s.href} key={s.id}><span>{s.title}<span aria-hidden="true">↗</span></span><p>{s.description}</p></Link>)}</div>
  </nav>;
}
