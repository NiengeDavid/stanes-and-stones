"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { useRef, useEffect } from "react";
import Container from "../container";

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

type ProjectHighlightProps = {
  _type: "project-highlight";
  _key: string;
  tagLine?: string | null;
  title?: string | null;
  description?: string | null;
  viewAllLabel?: string | null;
  projects?: Project[] | null;
  padding?: { top?: string; bottom?: string } | null;
  colorVariant?: string | null;
};

function ProjectCard({
  project,
  large,
}: {
  project: Project;
  large?: boolean;
}) {
  const imageUrl = project.mainImage
    ? urlFor(project.mainImage).width(800).url()
    : null;
  const lqip = project.mainImage?.asset?.metadata?.lqip;
  const slug = project.slug?.current ?? "#";

  return (
    <Link href={`/projects/${slug}`} className="group block overflow-hidden">
      <div
        className={`relative w-full overflow-hidden bg-neutral-900 ${large ? "aspect-4/5" : "aspect-4/3"}`}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={project.mainImage?.alt ?? project.title ?? ""}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        {/* Dark overlay on hover */}
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

export default function ProjectHighlight({
  tagLine,
  title,
  description,
  viewAllLabel,
  projects,
}: ProjectHighlightProps) {
  const safeProjects = projects ?? [];

  // Split into left (odd indexes) and right (even indexes) — creates the asymmetric two-col look
  const leftProjects = safeProjects.filter((_, i) => i % 2 === 0);
  const rightProjects = safeProjects.filter((_, i) => i % 2 !== 0);

  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fade-up");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <Container className="max-w-350 mx-auto px-6 md:px-10">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left – header + left project column */}
          <div className="flex flex-col gap-10">
            {/* Section header */}
            <div ref={headingRef} className="opacity-0">
              {tagLine && (
                <p className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4">
                  {tagLine}
                </p>
              )}
              {title && (
                <h2 className="text-4xl md:text-7xl font-bold text-foreground leading-tight mb-6">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-base leading-relaxed mb-8 md:text-2xl">
                  {description}
                </p>
              )}
              <Link
                href="/projects"
                className="text-xs tracking-[0.2em] uppercase font-semibold text-foreground border-b border-foreground pb-0.5 hover:opacity-60 transition-opacity"
              >
                {viewAllLabel ?? "VIEW ALL PROJECTS →"}
              </Link>
            </div>

            {/* Left column projects */}
            <div className="flex flex-col gap-8">
              {leftProjects.map((project) => (
                <ProjectCard
                  key={project.slug?.current}
                  project={project}
                  large
                />
              ))}
            </div>
          </div>

          {/* Right column projects */}
          <div className="flex flex-col gap-8 md:mt-32">
            {rightProjects.map((project) => (
              <ProjectCard key={project.slug?.current} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
