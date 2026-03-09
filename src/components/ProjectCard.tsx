"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  href: string;
}

export default function ProjectCard({ title, subtitle, image, bgColor, href }: ProjectCardProps) {
  const isVideo = image.endsWith(".mov") || image.endsWith(".mp4") || image.endsWith(".webm");
  const isExternal = href.startsWith("http");

  return (
    <Link href={href} className="block group" {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      <div className="overflow-hidden cursor-pointer rounded-[10px]">
        <div
          className="relative aspect-[16/10]"
          style={{ backgroundColor: bgColor }}
        >
          {isVideo ? (
            <video
              src={image}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
            />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              unoptimized
              className="object-cover object-center scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="pt-3 pb-1.5">
          <p className="text-left text-[14px]">
            <span className="font-semibold text-[var(--portfolio-heading)]">{title}</span>
            <span className="mx-2 text-[var(--portfolio-muted)]">·</span>
            <span className="font-normal text-[var(--portfolio-muted)]">{subtitle}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
