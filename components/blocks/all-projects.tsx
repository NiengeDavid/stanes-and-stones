"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type Project = {
  title: string | null;
  subtitle: string | null;
  slug: { current: string } | null;
  mainImage: {
    alt?: string;
    asset?: {
      _id: string;
      url: string;
      mimeType?: string;
      metadata?: {
        lqip?: string;
        dimensions?: { width: number; height: number };
      };
    };
  } | null;
  category?: string | null;
};

type AllProjectsProps = {
  _type: "all-projects";
  _key: string;
  padding?: { top?: string; bottom?: string } | null;
  colorVariant?: string | null;
  // Projects injected from server component
  projects?: Project[];
};

function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.mainImage ? urlFor(project.mainImage).width(900).url() : null;
  const lqip = project.mainImage?.asset?.metadata?.lqip;
  const slug = project.slug?.current ?? "#";

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block overflow-hidden"
    >
      <div className="relative w-full aspect-4/3 overflow-hidden bg-neutral-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={project.mainImage?.alt ?? project.title ?? ""}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      </div>
      <div className="mt-3">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground">
          {project.title}
        </p>
        {project.subtitle && (
          <p className="text-xs tracking-widest uppercase text-muted-foreground mt-0.5">
            {project.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function AllProjects({ projects = [] }: AllProjectsProps) {
  if (!projects.length) return null;

  // Split into two columns — left col gets odd indexes (1st, 3rd, 5th…), right gets even
  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 !== 0);

  return (
    <section className="w-full bg-background py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            {leftProjects.map((project) => (
              <ProjectCard key={project.slug?.current} project={project} />
            ))}
          </div>

          {/* Right column — offset slightly to create asymmetry */}
          <div className="flex flex-col gap-8 md:mt-20">
            {rightProjects.map((project) => (
              <ProjectCard key={project.slug?.current} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
