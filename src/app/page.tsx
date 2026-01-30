import GradientBlob from "@/components/GradientBlob";
import SocialLinks from "@/components/SocialLinks";
import WorkExperience from "@/components/WorkExperience";
import ProjectGallery from "@/components/ProjectGallery";
import Link from "next/link";

const currentExperience = [
  { company: "Figma", role: "Campus Leader" },
];

const previousExperience = [
  { company: "TD Bank", role: "UX Developer" },
  { company: "IBM", role: "Design Fellow" },
  { company: "TD Bank", role: "Product Design Intern" },
  { company: "TD Bank", role: "Product Design Intern" },
];

export default function Home() {
  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row overflow-auto md:overflow-hidden">
      {/* Left Side - Info Section */}
      <div className="w-full md:w-[45%] md:h-full flex flex-col p-6 md:p-[56px]">
        {/* Logo/Blob */}
        <div className="mb-8 md:mb-[40px]">
          <GradientBlob />
        </div>

        {/* Hero Text */}
        <h1 className="text-[24px] md:text-[34px] font-normal tracking-tight mb-6 md:mb-[32px]" style={{ lineHeight: '1.2' }}>
          Chrisandra <span className="inline-block">✐</span> is a designer at
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>waterloo who ships products that
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>click <span className="inline-block">✦</span> and cultivates thriving
          <br className="hidden md:block" />
          <span className="md:hidden"> </span>design communities <span className="inline-block">✧</span>.
        </h1>

        {/* Social Links and Status Badge row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <SocialLinks />
          <span className="status-badge text-[12px] md:text-[14px]">
            Seeking W26 & S26 Internships
          </span>
        </div>

        {/* First Divider */}
        <div className="border-t border-gray-200 my-6 md:my-[24px]"></div>

        {/* CTA Section with About Me button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div>
            <p className="text-[14px] md:text-[15px] text-black mb-1">Interested in working together?</p>
            <p className="text-[14px] md:text-[15px] text-[#646464]">
              Book a time{" "}
              <Link href="https://calendly.com/chrisandravaz12/30min" className="link-pink">
                here
              </Link>{" "}
              if you&apos;d like to chat.
            </p>
          </div>
          <Link href="https://vazzy.framer.website/about">
            <button className="about-btn">About Me</button>
          </Link>
        </div>

        {/* Second Divider */}
        <div className="border-t border-gray-200 my-6 md:my-[24px]"></div>

        {/* Work Experience */}
        <div>
          <WorkExperience title="CURRENT" experiences={currentExperience} />
          <WorkExperience title="PREVIOUS" experiences={previousExperience} />
        </div>

        {/* Footer signature - hidden on mobile */}
        <div className="hidden md:block mt-auto text-right">
          <span className="text-[14px] text-black">क्रिसेंद्रा.</span>
        </div>
      </div>

      {/* Right Side - Project Gallery */}
      <div className="w-full md:w-[55%] md:h-full px-6 md:px-0 md:pr-[56px] pb-6 md:pb-0">
        <ProjectGallery />
      </div>
    </div>
  );
}
