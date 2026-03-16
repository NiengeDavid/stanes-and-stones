import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import PortableTextRenderer from "@/components/portable-text-renderer";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import { cn } from "@/lib/utils";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-2" }
>;

export default function Hero2({
  tagLine,
  title,
  body,
  links,
  sectionWidth = "default",
  stackAlign = "left",
}: Hero2Props) {
  const isNarrow = stegaClean(sectionWidth) === "narrow";
  const align = stegaClean(stackAlign);
  const safeLinks = links ?? [];

  return (
    <section className="w-full bg-primary py-16">
      <div
        className={cn(
          align === "center" ? "max-w-3xl text-center mx-auto" : undefined,
          isNarrow ? "max-w-3xl mx-auto" : undefined,
          "bg-primary flex items-center justify-center pb-28 py-8 w-full",
        )}
      >
        <Container>
          <div className="">
            {tagLine && (
              <h1 className="leading-0 text-4xl text-muted font-sans animate-fade-up [animation-delay:100ms] opacity-0">
                <span className="text-base font-semibold">{tagLine}</span>
              </h1>
            )}
            {title && (
              <h2 className="mt-4 text-black text-shadow-2xs font-extralight text-4xl md:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
                {title}
              </h2>
            )}
            {body && (
              <div className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0">
                <PortableTextRenderer value={body} />
              </div>
            )}
            {safeLinks.length > 0 && (
              <div
                className={cn(
                  "mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:400ms] opacity-0",
                  align === "center" ? "justify-center mt-4" : undefined,
                )}
              >
                {safeLinks.map((link) => (
                  <Button
                    key={link._key ?? link.title}
                    variant={stegaClean(link?.buttonVariant)}
                    asChild
                    className="border-0 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <Link
                      href={link.href || "#"}
                      target={link.target ? "_blank" : undefined}
                      rel={link.target ? "noopener noreferrer" : undefined}
                    >
                      {link.title}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
