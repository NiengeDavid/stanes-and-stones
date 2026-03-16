import Image from "next/image";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import {
  fetchSanityProjectBySlug,
  fetchSanityProjectsStaticParams,
} from "@/sanity/lib/fetch";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await fetchSanityProjectsStaticParams();
  return (slugs ?? []).map((item: { slug?: { current?: string } | null }) => ({
    slug: item.slug?.current ?? "",
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchSanityProjectBySlug({ slug });

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.meta_title ?? project.title ?? "",
    description: project.meta_description ?? project.subtitle ?? "",
    robots: project.noindex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title: project.meta_title ?? project.title ?? "",
      description: project.meta_description ?? project.subtitle ?? "",
      images: project.ogImage?.asset?.url
        ? [{ url: project.ogImage.asset.url }]
        : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await fetchSanityProjectBySlug({ slug });

  if (!project) notFound();

  const {
    title,
    subtitle,
    mainImage,
    clientLogo,
    client,
    projectName,
    year,
    category,
    projectOverview,
    whatsIncluded,
    brief,
    solution,
    content,
  } = project;

  const mainImageUrl = mainImage ? urlFor(mainImage).width(1400).url() : null;
  const mainLqip = mainImage?.asset?.metadata?.lqip;

  const clientLogoUrl = clientLogo ? urlFor(clientLogo).height(80).url() : null;
  const clientLogoLqip = clientLogo?.asset?.metadata?.lqip;

  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero header ─────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: Title + subtitle */}
          <div>
            {subtitle && (
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4">
                {subtitle}
              </p>
            )}
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              {title}
            </h1>
          </div>

          {/* Right: Main image */}
          {mainImageUrl && (
            <div className="relative w-full aspect-16/10 overflow-hidden rounded-sm">
              <Image
                src={mainImageUrl}
                alt={mainImage?.alt ?? title ?? ""}
                fill
                className="object-cover"
                placeholder={mainLqip ? "blur" : "empty"}
                blurDataURL={mainLqip}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Client logo + details (left) | Project Overview (right) ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Client logo header + project details */}
          {(clientLogoUrl || client || projectName || year || category) && (
            <div>
              {/* Client logo replaces "Project Details" text heading */}
              {clientLogoUrl ? (
                <div className="mb-8">
                  <Image
                    src={clientLogoUrl}
                    alt={clientLogo?.alt ?? client ?? "Client logo"}
                    width={160}
                    height={80}
                    className="object-contain max-h-[80px] w-auto"
                    placeholder={clientLogoLqip ? "blur" : "empty"}
                    blurDataURL={clientLogoLqip}
                  />
                </div>
              ) : (
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8">
                  Project Details
                </h2>
              )}

              <dl className="space-y-4">
                {client && (
                  <div className="flex flex-col gap-0.5 border-b border-border pb-4">
                    <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      Client
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {client}
                    </dd>
                  </div>
                )}
                {projectName && (
                  <div className="flex flex-col gap-0.5 border-b border-border pb-4">
                    <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      Project
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {projectName}
                    </dd>
                  </div>
                )}
                {year && (
                  <div className="flex flex-col gap-0.5 border-b border-border pb-4">
                    <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      Year
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {year}
                    </dd>
                  </div>
                )}
                {category && (
                  <div className="flex flex-col gap-0.5 border-b border-border pb-4">
                    <dt className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      Category
                    </dt>
                    <dd className="text-sm font-medium text-foreground">
                      {category}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Right: Project Overview (replaces What's Included in this position) */}
          {projectOverview && (
            <div>
              <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8">
                Project Overview
              </h2>
              <p className="text-base text-foreground leading-relaxed">
                {projectOverview}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Brief | Solution | What's Included (3-col) ──────────── */}
      {(brief || solution || (whatsIncluded && whatsIncluded.length > 0)) && (
        <section className="max-w-350 mx-auto px-6 md:px-10 pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {whatsIncluded && whatsIncluded.length > 0 && (
              <div>
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
                  What&apos;s Included
                </h2>
                <ul className="space-y-3">
                  {whatsIncluded.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <span className="w-4 h-px bg-foreground inline-block shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {brief && (
              <div>
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
                  The Brief
                </h2>
                <p className="text-base text-foreground leading-relaxed">
                  {brief}
                </p>
              </div>
            )}
            {solution && (
              <div>
                <h2 className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">
                  The Solution
                </h2>
                <p className="text-base text-foreground leading-relaxed">
                  {solution}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Draggable Content ───────────────────────────────────── */}
      {content && content.length > 0 && (
        <section className="pb-24 space-y-16">
          {content.map(
            (block: {
              _key: string;
              _type: string;
              // largeImage fields
              alt?: string;
              caption?: string;
              asset?: {
                _id: string;
                url: string;
                metadata?: {
                  lqip?: string;
                  dimensions?: { width: number; height: number };
                };
              };
              // referHero2 fields
              text?: string;
              imageLeft?: {
                alt?: string;
                asset?: {
                  _id: string;
                  url: string;
                  metadata?: {
                    lqip?: string;
                    dimensions?: { width: number; height: number };
                  };
                };
              };
              imageRight?: {
                alt?: string;
                asset?: {
                  _id: string;
                  url: string;
                  metadata?: {
                    lqip?: string;
                    dimensions?: { width: number; height: number };
                  };
                };
              };
              // flyers fields
              images?: Array<{
                _key?: string;
                alt?: string;
                asset?: {
                  _id: string;
                  url: string;
                  metadata?: {
                    lqip?: string;
                    dimensions?: { width: number; height: number };
                  };
                };
              }>;
            }) => {
              // ── Large Image ──────────────────────────────────────
              if (block._type === "largeImage") {
                if (!block.asset?.url) return null;
                const imgUrl = urlFor(block).width(1400).url();
                const lqip = block.asset.metadata?.lqip;
                const w = block.asset.metadata?.dimensions?.width;
                const h = block.asset.metadata?.dimensions?.height;

                return (
                  <div
                    key={block._key}
                    className="max-w-[1400px] mx-auto px-6 md:px-10"
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-sm bg-neutral-900"
                      style={{ aspectRatio: w && h ? `${w}/${h}` : "16/9" }}
                    >
                      <Image
                        src={imgUrl}
                        alt={block.alt ?? title ?? ""}
                        fill
                        className="object-cover"
                        placeholder={lqip ? "blur" : "empty"}
                        blurDataURL={lqip}
                        sizes="(max-width: 1400px) 100vw, 1400px"
                      />
                    </div>
                    {block.caption && (
                      <p className="mt-3 text-xs text-muted-foreground tracking-wide">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              }

              // ── Refer Hero 2 (side-by-side pair) ────────────────
              if (block._type === "referHero2") {
                const leftUrl = block.imageLeft
                  ? urlFor(block.imageLeft).width(700).url()
                  : null;
                const rightUrl = block.imageRight
                  ? urlFor(block.imageRight).width(700).url()
                  : null;

                return (
                  <div
                    key={block._key}
                    className="max-w-[1400px] mx-auto px-6 md:px-10"
                  >
                    {block.text && (
                      <p className="text-lg md:text-2xl font-light text-foreground mb-8 max-w-xl">
                        {block.text}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {leftUrl && (
                        <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm bg-neutral-900">
                          <Image
                            src={leftUrl}
                            alt={block.imageLeft?.alt ?? ""}
                            fill
                            className="object-cover"
                            placeholder={
                              block.imageLeft?.asset?.metadata?.lqip
                                ? "blur"
                                : "empty"
                            }
                            blurDataURL={block.imageLeft?.asset?.metadata?.lqip}
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      {rightUrl && (
                        <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm bg-neutral-900">
                          <Image
                            src={rightUrl}
                            alt={block.imageRight?.alt ?? ""}
                            fill
                            className="object-cover"
                            placeholder={
                              block.imageRight?.asset?.metadata?.lqip
                                ? "blur"
                                : "empty"
                            }
                            blurDataURL={
                              block.imageRight?.asset?.metadata?.lqip
                            }
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // ── Flyers gallery ──────────────────────────────────
              if (
                block._type === "flyers" &&
                block.images &&
                block.images.length > 0
              ) {
                return (
                  <div
                    key={block._key}
                    className="max-w-[1400px] mx-auto px-6 md:px-10"
                  >
                    {block.caption && (
                      <p className="text-lg md:text-2xl font-light text-foreground mb-8 max-w-xl">
                        {block.caption}
                      </p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {block.images.map((img, idx) => {
                        if (!img.asset?.url) return null;
                        const imgUrl = urlFor(img).width(500).url();
                        const lqip = img.asset.metadata?.lqip;
                        return (
                          <div
                            key={img._key ?? idx}
                            className="relative w-full aspect-square overflow-hidden rounded-sm bg-neutral-900"
                          >
                            <Image
                              src={imgUrl}
                              alt={img.alt ?? ""}
                              fill
                              className="object-cover"
                              placeholder={lqip ? "blur" : "empty"}
                              blurDataURL={lqip}
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return null;
            },
          )}
        </section>
      )}
    </main>
  );
}
