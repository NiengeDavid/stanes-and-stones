// components/blocks/hero-1.tsx
"use client";

import { useEffect, useState } from "react";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Container from "@/components/container";

type Hero1Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-1" }
>;

const services = ["Brands", "Websites", "Content" /* add more as needed */];

export default function Hero1({ tagLine, title, body, images }: Hero1Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images?.length || images.length < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(id);
  }, [images]);

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <Container>
        {/* bottom band to match screenshot */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-zinc-100" />

        <div className="relative z-10 mx-auto px-6 py-16 md:py-24">
          <div className="grid items-start gap-10 md:grid-cols-12">
            {/* Image block (contained, not absolute) */}
            <div className="md:col-span-7">
              <div className="relative overflow-hidden bg-zinc-900 shadow-2xl">
                <div className="relative aspect-4/3 w-full">
                  {images?.map((image, index) => (
                    <div
                      key={image.asset?._id ?? index}
                      className={`absolute inset-0 transition-opacity duration-1800 ease-in-outout ${
                        index === active ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={index !== active}
                    >
                      <Image
                        src={urlFor(image).url()}
                        alt={image.alt || ""}
                        fill
                        className="object-cover w-full"
                        priority={index === 0}
                        placeholder={
                          image?.asset?.metadata?.lqip &&
                          image?.asset?.mimeType !== "image/svg+xml"
                            ? "blur"
                            : undefined
                        }
                        blurDataURL={image?.asset?.metadata?.lqip || undefined}
                        sizes="(max-width: 1080px) 100vw, 58vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Text block */}
            <div className="md:col-span-5 md:pt-2">
              {tagLine && (
                <p className="mb-4 text-muted-foreground">{tagLine}</p>
              )}
              {title && (
                <h1 className="text-black md:text-white text-shadow-2xs text-5xl font-semibold tracking-tight md:text-7xl">
                  {title} 
                <br />
                <span className="text-highlight ease-in-out transition-colors duration-1800">
                  {services[active % services.length]}
                </span>
                </h1>
              )}
              {/* ...existing body + links rendering... */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
