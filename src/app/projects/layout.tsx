import CaseStudyControls from '@/components/CaseStudyControls';
export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <div className="case-design"><CaseStudyControls />{children}</div>;
}
