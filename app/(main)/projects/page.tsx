import Image from "next/image";
import Link from "next/link";
import { fetchSanityProjects } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore our portfolio of creative work.",
};

export default async function ProjectsPage() {
  const projects = await fetchSanityProjects();
  const safeProjects = projects ?? [];

  const leftProjects = safeProjects.filter((_: unknown, i: number) => i % 2 === 0);
  const rightProjects = safeProjects.filter((_: unknown, i: number) => i % 2 !== 0);

  return (
    <main className="min-h-screen bg-background">
      {/* Page header */}
      <div className="max-w-350 mx-auto px-6 md:px-10 pt-20 pb-10">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Our Work
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Projects
        </h1>
      </div>

      {/* Project grid */}
      {safeProjects.length > 0 ? (
        <div className="max-w-350 mx-auto px-6 md:px-10 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Left column */}
            <div className="flex flex-col gap-8">
              {leftProjects.map((project: typeof safeProjects[0]) => (
                <ProjectCard key={project.slug?.current} project={project} />
              ))}
            </div>
            {/* Right column — offset for asymmetric feel */}
            <div className="flex flex-col gap-8 md:mt-24">
              {rightProjects.map((project: typeof safeProjects[0]) => (
                <ProjectCard key={project.slug?.current} project={project} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-350 mx-auto px-6 md:px-10 py-24 text-center">
          <p className="text-muted-foreground">No projects yet.</p>
        </div>
      )}
    </main>
  );
}

function ProjectCard({ project }: { project: {
  title: string | null;
  subtitle: string | null;
  slug: { current: string } | null;
  mainImage: {
    alt?: string;
    asset?: {
      _id: string;
      url: string;
      mimeType?: string;
      metadata?: { lqip?: string; dimensions?: { width: number; height: number } };
    };
  } | null;
  category?: string | null;
}}) {
  const imageUrl = project.mainImage ? urlFor(project.mainImage).width(900).url() : null;
  const lqip = project.mainImage?.asset?.metadata?.lqip;
  const slug = project.slug?.current ?? "#";

  return (
    <Link href={`/projects/${slug}`} className="group block overflow-hidden">
      <div className="relative w-full aspect-4/3 overflow-hidden bg-neutral-900">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={project.mainImage?.alt ?? project.title ?? ""}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip ?? undefined}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-linear-to-t from-black/70 to-transparent">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white">
            {project.title}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground">
          {project.title}
        </p>
        {project.subtitle && (
          <p className="text-[11px] tracking-widest uppercase text-muted-foreground mt-0.5">
            {project.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
