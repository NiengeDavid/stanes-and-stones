import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Standalone work type – decoupled from featuredWorks after migration to project
interface WorkItem {
  title?: string | null;
  brief?: string | null;
  slug?: { current?: string | null } | null;
  coverImage?: {
    alt?: string | null;
    asset?: {
      metadata?: {
        lqip?: string | null;
        dimensions?: { width?: number | null; height?: number | null } | null;
      } | null;
    } | null;
  } | null;
}

interface WorkCardProps {
  works: WorkItem[];
}

export default function WorkCard({ works }: WorkCardProps) {
  if (!works || works.length === 0) return null;

  const [first, ...rest] = works;

  const pairs: WorkItem[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    const pair = rest.slice(i, i + 2).filter((w): w is WorkItem => w !== null);
    if (pair.length > 0) pairs.push(pair);
  }

  const getHref = (w: WorkItem) =>
    w?.slug?.current ? `/projects/${w.slug.current}` : "#";

  const getImgSrc = (w: WorkItem) =>
    w?.coverImage ? urlFor(w.coverImage).url() : "";

  const getImgAlt = (w: WorkItem) =>
    (w?.coverImage as { alt?: string | null } | null | undefined)?.alt ?? w?.title ?? "";

  return (
    <div className="py-12">
      {first && (
        <div className="mb-8">
          <Link href={getHref(first)} className="group block relative">
            <div className="relative w-full overflow-hidden shadow-lg rounded-lg bg-neutral-100 dark:bg-neutral-800">
              {first.coverImage && (
                <Image
                  src={getImgSrc(first)}
                  alt={getImgAlt(first)}
                  className="object-cover transition-transform group-hover:scale-105"
                  width={first.coverImage?.asset?.metadata?.dimensions?.width ?? 800}
                  height={first.coverImage?.asset?.metadata?.dimensions?.height ?? 960}
                  placeholder={first.coverImage?.asset?.metadata?.lqip ? "blur" : undefined}
                  blurDataURL={first.coverImage?.asset?.metadata?.lqip ?? ""}
                  quality={100}
                />
              )}
            </div>
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-50 text-left group-hover:underline transition-all">
              {first.title}
            </h2>
            <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-left">
              {first.brief}
            </p>
            <span className="absolute inset-0" aria-label={`View ${first.title}`} />
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-8">
        {pairs.map((pair, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8">
            {pair.map((work, index) => (
              <Link
                href={getHref(work)}
                key={index}
                className="group flex-1 block relative"
              >
                <div className="relative w-full overflow-hidden shadow-md rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  {work.coverImage && (
                    <Image
                      src={getImgSrc(work)}
                      alt={getImgAlt(work)}
                      className="object-cover transition-transform group-hover:scale-105"
                      width={work.coverImage?.asset?.metadata?.dimensions?.width ?? 800}
                      height={work.coverImage?.asset?.metadata?.dimensions?.height ?? 800}
                      placeholder={work.coverImage?.asset?.metadata?.lqip ? "blur" : undefined}
                      blurDataURL={work.coverImage?.asset?.metadata?.lqip ?? ""}
                      quality={100}
                    />
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-50 text-left group-hover:underline transition-all">
                  {work?.title}
                </h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-left">
                  {work?.brief}
                </p>
                <span className="absolute inset-0" aria-label={`View ${work.title}`} />
              </Link>
            ))}
            {pair.length === 1 && <div className="hidden md:block flex-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
