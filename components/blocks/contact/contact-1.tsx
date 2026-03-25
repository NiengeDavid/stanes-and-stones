import SectionContainer from "@/components/ui/section-container";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { type ColorVariant, type SectionPadding } from "@/sanity.types";

type OpeningHoursRow = {
  _key: string;
  day?: string;
  hours?: string;
};

type Contact1Props = {
  _type: "contact-1";
  _key: string;
  padding?: SectionPadding | null;
  colorVariant?: ColorVariant | null;
  title?: string;
  address?: string;
  openingHours?: OpeningHoursRow[];
  phone?: string;
  email?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
  mapSrc?: string;
};

export default function Contact1({
  padding,
  colorVariant,
  title,
  address,
  openingHours,
  phone,
  email,
  image,
  mapSrc,
}: Contact1Props) {
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left — office info */}
        <div className="flex flex-col justify-start py-8 pr-8">
          {title && (
            <p className="text-xl font-bold mb-1">{title}</p>
          )}
          {address && (
            <p className="text-lg text-muted-foreground mb-6">{address}</p>
          )}

          <div className="flex flex-col gap-5">
            {/* Address */}
            {address && (
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 shrink-0 text-foreground" />
                <span className="text-lg">{address}</span>
              </div>
            )}

            {/* Opening hours */}
            {openingHours && openingHours.length > 0 && (
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 shrink-0 text-foreground" />
                <table className="text-lg ml-0">
                  <tbody>
                    {openingHours.map((row) => (
                      <tr key={row._key}>
                        <td className="pr-6 text-muted-foreground whitespace-nowrap py-0.5 min-w-22.5">
                          {row.day}
                        </td>
                        <td className="whitespace-nowrap py-0.5">{row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Phone */}
            {phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-foreground" />
                <a href={`tel:${phone}`} className="text-lg hover:underline">
                  {phone}
                </a>
              </div>
            )}

            {/* Email */}
            {email && (
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-foreground" />
                <a
                  href={`mailto:${email}`}
                  className="text-lg text-blue-600 hover:underline"
                >
                  {email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Center — image */}
        {image?.asset && (
          <div className="relative w-full min-h-88">
            <Image
              src={urlFor(image).url()}
              alt={title ?? "Office image"}
              fill
              className="object-cover"
              placeholder={image?.asset?.metadata?.lqip ? "blur" : undefined}
              blurDataURL={image?.asset?.metadata?.lqip ?? ""}
              sizes="(min-width: 768px) 33vw, 100vw"
              quality={90}
            />
          </div>
        )}

        {/* Right — Google Maps iframe */}
        {mapSrc && (
          <div className="w-full min-h-88">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office location map"
            />
          </div>
        )}
      </div>
    </SectionContainer>
  );
}
