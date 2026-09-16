"use client";
import Image from "next/image";
import AgentSurface from "./AgentSurface";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
interface ProjectCardProps {
  title: string;
  subtitle: string;
  tag?: string;
  image: string;
  bgColor: string;
  href: string;
  featured?: boolean;
  number?: string;
}
export default function ProjectCard({
  title,
  subtitle,
  tag,
  image,
  bgColor,
  href,
  featured,
  number,
}: ProjectCardProps) {
  const isVideo = /\.(mov|mp4|webm)$/.test(image),
    external = href.startsWith("http");
  return (
    <article className={`project-item ${featured ? "featured" : ""}`}>
      <Link
        href={href}
        className="project-link surface"
        aria-label={`${title} · ${subtitle}`}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        <div className="project-media" style={{ backgroundColor: bgColor }}>
          {image === "agent-study" ? <div className="agent-thumbnail" aria-hidden="true"><AgentSurface compact /></div> : isVideo ? (
            <video
              src={image}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label={`${title} demonstration`}
            />
          ) : (
            <Image
              src={image}
              alt={`${title} project preview`}
              fill
              unoptimized
              sizes={
                featured ? "(max-width: 831px) 100vw, 752px" : "(max-width: 831px) 100vw, 352px"
              }
            />
          )}
          <span className="project-open" aria-hidden="true">
            <FiArrowUpRight />
          </span>
        </div>
        <div className="project-caption">
          <div className="project-category">
            <span>{tag}</span>
            <span>{number}</span>
          </div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </Link>
    </article>
  );
}
