import CaseStudyControls from '@/components/CaseStudyControls';
import TypeSwitcher from '@/components/TypeSwitcher';
export default function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  return <div className="case-design"><CaseStudyControls /><TypeSwitcher />{children}</div>;
}
