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
  const isVideo = image.endsWith('.mov') || image.endsWith('.mp4') || image.endsWith('.webm');

  return (
    <Link href={href} className="block">
      <div className="rounded-[4px] overflow-hidden cursor-pointer">
        <div
          className="aspect-[3/2] relative"
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
              className="object-cover object-center scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="pt-4 pb-2">
          <p className="text-[14px] text-left">
            <span className="font-normal text-black">{title}</span>
            <span className="text-gray-400 mx-2">·</span>
            <span className="text-gray-500 font-normal">{subtitle}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
