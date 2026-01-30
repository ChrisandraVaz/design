"use client";

interface Experience {
  company: string;
  role: string;
}

interface WorkExperienceProps {
  title: string;
  experiences: Experience[];
}

export default function WorkExperience({ title, experiences }: WorkExperienceProps) {
  return (
    <div className="mb-4">
      {/* IBM Plex Mono - 11px */}
      <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500 mb-2">
        {title}
      </p>
      <div className="space-y-1">
        {experiences.map((exp, index) => (
          <div key={index} className="flex items-baseline gap-8">
            {/* Company name - 14px */}
            <span className="text-[14px] font-normal min-w-[70px]">{exp.company}</span>
            {/* Role - 14px */}
            <span className="text-[14px] text-gray-500">{exp.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
