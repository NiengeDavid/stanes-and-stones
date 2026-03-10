import Image from "next/image";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import {
  fetchSanityWorkBySlug,
  fetchSanityWorksStaticParams,
} from "@/sanity/lib/fetch";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate static params for all work slugs
export async function generateStaticParams() {
  const slugs = await fetchSanityWorksStaticParams();
  return slugs.map((item) => ({
    slug: item.slug?.current || "",
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await fetchSanityWorkBySlug({ slug });

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  return {
    title: work.meta_title || work.title || "",
    description: work.meta_description || work.excerpt,
    robots: work.noindex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title: work.meta_title ?? work.title ?? "",
      description: work.meta_description ?? work.excerpt ?? "",
      images: work.ogImage?.asset?.url
        ? [
            {
              url: work.ogImage.asset.url,
              width:
                work.ogImage.asset.metadata?.dimensions?.width ?? undefined,
              height:
                work.ogImage.asset.metadata?.dimensions?.height ?? undefined,
            },
          ]
        : [],
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await fetchSanityWorkBySlug({ slug });

  if (!work) {
    notFound();
  }

  const { title, brief, excerpt, categories, images } = work;

  // First image
  const [firstImage, ...restImages] = images || [];

  // Group the rest into pairs
  const pairs: (typeof images)[][] = [];
  if (restImages) {
    for (let i = 0; i < restImages.length; i += 2) {
      pairs.push(
        (restImages.slice(i, i + 2) ?? []) as unknown as (typeof images)[],
      );
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20">
      {/* Header Section */}
      <div className="w-full grid grid-cols-1 mx-auto mb-16 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <div className="w-full">
          {/* Tagline (Brief) */}
          {brief && (
            <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-4">
              {brief}
            </p>
          )}

          {/* Title */}
          {title && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-6">
              {title}
            </h1>
          )}
        </div>

        {/* Categories as Badges */}
        {categories && categories.length > 0 && (
          <div className="w-96 flex flex-wrap gap-2 mb-6 lg:w-fit lg:flex-col lg:mx-auto">
            {categories.map((category, idx) => (
              <Badge variant="secondary" key={idx} className="h-8">
                {category.title}
              </Badge>
            ))}
          </div>
        )}

        <div className="w-full">
          {/* Excerpt */}
          {excerpt && (
            <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Website Link */}
          {work.website && (
            <Badge variant="secondary" className="mt-4">
              <a
                href={work.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-black/50 dark:hover:text-white/50 transition-colors"
              >
                visit website &#8599;{" "}
                {/* {work.website.replace(/^https?:\/\/(www\.)?/, "")} */}
              </a>
            </Badge>
          )}
        </div>
      </div>

      {/* T-Layout Image Gallery */}
      {images && images.length > 0 && (
        <div className="w-full max-w-7xl mx-auto">
          {/* Images rendered at their full dimensions */}
          <div className="flex flex-col gap-8">
            {images.map((image, idx) => {
              if (!image) return null;

              const imageUrl = urlFor(image).url();
              const width = image.asset?.metadata?.dimensions?.width;
              const height = image.asset?.metadata?.dimensions?.height;

              return (
                <div
                  key={"_key" in image ? String(image._key) : idx}
                  className="relative w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800"
                  style={{
                    aspectRatio:
                      width && height ? `${width} / ${height}` : undefined,
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={
                      ("alt" in image && typeof image.alt === "string"
                        ? image.alt
                        : "") ||
                      title ||
                      "Work image"
                    }
                    width={width ?? undefined}
                    height={height ?? undefined}
                    className="object-contain w-full h-full"
                    sizes="(max-width: 1400px) 100vw, 1400px"
                    priority={idx === 0}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
