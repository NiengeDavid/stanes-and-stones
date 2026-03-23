import { cn } from "@/lib/utils";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import TagLine from "@/components/ui/tag-line";
import { createElement } from "react";
import { stegaClean } from "next-sanity";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];
type SplitRow = Extract<Block, { _type: "split-row" }>;
type SplitContent = Extract<
  NonNullable<SplitRow["splitColumns"]>[number],
  { _type: "split-content" }
>;

interface SplitContentProps extends SplitContent {
  noGap?: boolean;
}

export default function SplitContent({
  sticky,
  padding,
  colorVariant,
  noGap,
  image,
  tagLine,
  title,
  body,
  link,
}: SplitContentProps) {
  const color = stegaClean(colorVariant);

  return (
    <div
      className={cn(
        !sticky ? "flex flex-col justify-center" : undefined,
        padding?.top ? "pt-16 xl:pt-20" : undefined,
        padding?.bottom ? "pb-16 xl:pb-20" : undefined,
      )}
    >
      <div
        className={cn(
          "flex flex-col items-start",
          sticky ? "lg:sticky lg:top-56" : undefined,
          noGap ? "px-10" : undefined,
        )}
      >
        {image && image.asset?._id && (
          <div className="w-16 h-16 mb-2">
            <Image
              src={stegaClean(image)?.asset?.url || ""}
              alt={image.alt || ""}
              width={64}
              height={64}
            />
          </div>
        )}
        {tagLine && (
          <TagLine title={tagLine} element="h2" className="text-sm text-muted-foreground" />
        )}
        {title &&
          createElement(
            tagLine ? "h3" : "h2",
            {
              className: cn(
                "w-32 md:w-80 my-4 mb-4 md:mb-6 font-semibold leading-[1.2] ",
                color === "primary" ? "text-black" : undefined
              ),
            },
            title,
          )}
        {body && <PortableTextRenderer value={body} className={cn(color === "primary" ? "text-black" : undefined)} />}
        {link?.href && (
          <div className="flex flex-col">
            <Button
              className="mt-2"
              variant={stegaClean(link?.buttonVariant)}
              size="lg"
              asChild
            >
              <Link
                href={link.href}
                target={link.target ? "_blank" : undefined}
              >
                {link.title}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
