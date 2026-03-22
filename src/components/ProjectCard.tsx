"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  tag?: string;
  rightLabel?: string;
  image: string;
  bgColor: string;
  href: string;
}

export default function ProjectCard({ title, subtitle, tag, rightLabel, image, bgColor, href }: ProjectCardProps) {
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
              poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
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
        <div className="pt-3 pb-1.5 flex items-start justify-between gap-3">
          <p className="min-w-0 text-left text-[14px] break-words">
            <span className="font-semibold text-[var(--portfolio-heading)]">{title}</span>
            <span className="mx-2 text-[var(--portfolio-muted)]">·</span>
            <span className="font-normal text-[var(--portfolio-muted)]">{subtitle}</span>
          </p>
          {tag ? (
            <span className="shrink-0 rounded-full border border-[var(--portfolio-border)] px-2.5 py-1 text-[11px] font-medium leading-none text-[var(--portfolio-muted)]">
              {tag}
            </span>
          ) : rightLabel ? (
            <span className="shrink-0 pt-0.5 text-[13px] font-medium text-[var(--portfolio-muted)]">
              {rightLabel}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
