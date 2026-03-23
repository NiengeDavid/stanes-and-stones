"use client";

import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import {
  PAGE_QUERY_RESULT,
  type ColorVariant,
  type SectionPadding,
} from "@/sanity.types";

type Carousel4Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "carousel-4" }
>;

export default function Carousel4({
  padding,
  colorVariant,
  members,
}: Carousel4Props) {
  const color = stegaClean(colorVariant);

  if (!members || members.length === 0) return null;

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
        {members.map((member, index) => (
          <div
            key={member._key ?? index}
            className="group relative aspect-3/4 overflow-hidden"
          >
            {/* Portrait image */}
            {member.image && (
              <Image
                src={urlFor(member.image).url()}
                alt={member.name ?? "Team member"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder={
                  member.image?.asset?.metadata?.lqip ? "blur" : undefined
                }
                blurDataURL={member.image?.asset?.metadata?.lqip ?? ""}
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                quality={90}
              />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Name & role — visible on hover */}
            <div className="absolute bottom-0 left-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              {member.name && (
                <p className="text-white font-semibold text-sm leading-tight">
                  {member.name}
                </p>
              )}
              {member.role && (
                <p className="text-white/75 text-xs mt-0.5">{member.role}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
