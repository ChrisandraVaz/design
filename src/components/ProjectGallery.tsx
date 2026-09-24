"use client";
import ProjectCard from "./ProjectCard";
const projects = [
  { title: "Interfaces for agency", subtitle: "Intent, execution, and the moment a human steps in.", tag: "Independent study · Design engineering", image: "agent-study", bgColor: "#edece8", href: "/projects/agent-interface", featured: true },
  {
    title: "Font Context Plugin",
    subtitle: "A context-aware font editor for Figma.",
    tag: "Figma plugin",
    image: "/assets/figma.mp4",
    bgColor: "#171717",
    href: "/fontcontext.html",
    featured: true,
  },
  {
    title: "Interest Claims Manager",
    subtitle: "Making financial workflows feel simple.",
    tag: "TD Securities",
    image: "/assets/tdinterestclaims.png",
    bgColor: "#e8f5e8",
    href: "/projects/td-bank-interest-claims",
  },
  {
    title: "A system built to scale",
    subtitle: "Tokenized foundations for TD Securities.",
    tag: "Design systems",
    image: "/assets/tds.png",
    bgColor: "#073b31",
    href: "/projects/td-design-system",
  },
  {
    title: "IBM Accelerate",
    subtitle: "Rethinking the ManageIQ experience.",
    tag: "Product design",
    image: "/assets/ibm.gif",
    bgColor: "#eaf0ff",
    href: "/projects/ibm-accelerate",
  },
  {
    title: "Liquid Metallic Button",
    subtitle: "An exploration of light and interaction.",
    tag: "Experiment",
    image: "/assets/metallic-button.mp4",
    bgColor: "#2b2b2b",
    href: "https://chrisandravaz.github.io/Liquid-Metallic-Button-/liquid-metal-button",
  },
  {
    title: "Microsoft Paint Recreation",
    subtitle: "A browser study in familiar tools and playful constraints.",
    tag: "Design engineering",
    image: "/assets/microsoftpaint.mp4",
    bgColor: "#d9e6f5",
    href: "https://chrisandravaz.github.io/Microsoft-Paint/",
  },

];
export default function ProjectGallery() {
  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <ProjectCard key={project.title} {...project} number={String(i + 1).padStart(2, "0")} />
      ))}
    </div>
  );
}
