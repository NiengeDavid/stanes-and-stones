import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import Image from "next/image";

type Cta1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "cta-1" }
>;

export default function Cta1({
  padding,
  colorVariant,
  sectionWidth = "default",
  stackAlign = "left",
  image,
  tagLine,
  title,
  body,
  links,
}: Cta1Props) {
  const isNarrow = stegaClean(sectionWidth) === "narrow";
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding} id="contact">
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-12 items-center",
          align === "center" ? "text-center" : undefined,
          isNarrow ? "max-w-3xl mx-auto" : undefined,
        )}
        id="contact"
      >
        {image && (
          <div className="order-2 md:order-1">
            <Image
              src={image.asset?.url || ""}
              alt={image.alt || ""}
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        )}
        <div
          className={cn(
            "order-1 md:order-2 text-left",
            color === "primary" ? "text-background" : undefined,
          )}
        >
          {tagLine && (
            <h1 className="leading-0 mb-4">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          <h2 className="mb-4">{title}</h2>
          {body && <PortableTextRenderer value={body} />}
          {links && links.length > 0 && (
            <div
              className={cn(
                "mt-10 flex flex-wrap gap-4",
                align === "center" ? "justify-center" : undefined,
              )}
            >
              {links.map((link) => (
                <Button
                  key={link.title}
                  variant={stegaClean(link?.buttonVariant)}
                  asChild
                >
                  <Link
                    href={link.href || "#"}
                    target={link.target ? "_blank" : undefined}
                    rel={link.target ? "noopener" : undefined}
                  >
                    {link.title}
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
