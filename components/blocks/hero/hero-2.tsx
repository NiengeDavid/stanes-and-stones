"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";
import Image from "next/image";

type Hero2Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-2" }
>;

export default function Hero2({ tagLine, title, body, links }: Hero2Props) {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  const allImages = [
    // local client images (place portraits of young Black people in public/clients)
    "/clients/autoconsult.png",
    "/clients/winis.png",
    "/clients/renosmart.png",
    "/clients/fgnpc.png",
    "/clients/skillgrid.png",
    "/clients/wellspring.png",
    "/clients/FA25.png",
    "/clients/cfm.png",
    "/clients/msm.png",
    "/clients/relevantWomen.png",
    "/clients/cfckids.png",
    "/clients/letvana.png",
  ];

  const leftImages = allImages;
  const rightImages = allImages.slice(0, 8);

  useEffect(() => {
    let animationId: number;

    const speed = 0.3; // adjust speed
    const cardHeight = 224; // h-56 = 224px
    const gap = 16; // gap-4 = 16px
    const totalItemHeight = cardHeight + gap;

    const leftMaxOffset = totalItemHeight * leftImages.length;

    let leftOffset = 0;

    const animate = () => {
      leftOffset = (leftOffset + speed) % leftMaxOffset;

      if (leftColumnRef.current) {
        leftColumnRef.current.style.transform = `translateY(-${leftOffset}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const ImageCard: React.FC<{ imageUrl: string; className?: string }> = ({
    imageUrl,
    className = "",
  }) => (
    <div className={`w-60 h-56 shadow-lg overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt="Service showcase"
        width={160}
        height={224}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );

  return (
    <div className="bg-white flex items-center justify-center px-4 md:px-8 lg:px-16 dark:bg-background">
      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 py-12 lg:py-20">
        {/* Left Text Content */}
        <div className="flex-1 max-w-2xl text-left">
          {tagLine && (
            <h1 className="leading-[0] font-sans animate-fade-up [animation-delay:100ms] opacity-0">
              <span className="text-base font-semibold">{tagLine}</span>
            </h1>
          )}
          {title && (
            <h2 className="mt-6 font-bold leading-[1.1] text-4xl md:text-5xl animate-fade-up [animation-delay:200ms] opacity-0">
              {title}
            </h2>
          )}
          {body && (
            <div className="text-lg mt-6 max-w-2xl animate-fade-up [animation-delay:300ms] opacity-0">
              <PortableTextRenderer value={body} />
            </div>
          )}
          {links && links.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up [animation-delay:400ms] opacity-0">
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

        {/* Right Carousel Section */}
        <div className="flex-1 flex justify-center w-full">
          <div className="flex gap-4 h-[600px] overflow-hidden relative">
            {/* Left Column - Upwards */}
            <div className="flex flex-col gap-4 h-fit" ref={leftColumnRef}>
              {[...leftImages, ...leftImages].map((imageUrl, index) => (
                <ImageCard key={`left-${index}`} imageUrl={imageUrl} />
              ))}
            </div>

            {/* Right Column - Downwards */}
            <div className="flex flex-col gap-4 h-fit" ref={rightColumnRef}>
              {[...rightImages, ...rightImages].map((imageUrl, index) => (
                <ImageCard key={`right-${index}`} imageUrl={imageUrl} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
