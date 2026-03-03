"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SETTINGS_QUERYResult } from "@/sanity.types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo({
  settings,
  themeOverride,
}: {
  settings: SETTINGS_QUERYResult;
  themeOverride?: "light" | "dark";
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeToUse =
    themeOverride ?? (mounted && resolvedTheme === "dark" ? "dark" : "light");

  const selectedLogo =
    settings?.logo?.[themeToUse === "dark" ? "dark" : "light"];

  const fallbackLogo =
    settings?.logo?.[themeToUse === "dark" ? "light" : "dark"];

  const logoToUse = selectedLogo || fallbackLogo;

  return logoToUse ? (
    <Image
      src={urlFor(logoToUse).url()}
      alt={settings?.siteName || ""}
      width={
        (settings?.logo?.width as number) ??
        logoToUse?.asset?.metadata?.dimensions?.width ??
        100
      }
      height={
        (settings?.logo?.height as number) ??
        logoToUse?.asset?.metadata?.dimensions?.height ??
        40
      }
      title={settings?.siteName || ""}
      placeholder={
        logoToUse?.asset?.metadata?.lqip &&
        logoToUse?.asset?.mimeType !== "image/svg+xml"
          ? "blur"
          : undefined
      }
      blurDataURL={logoToUse?.asset?.metadata?.lqip || undefined}
      quality={100}
      priority
    />
  ) : (
    <span className="text-lg font-semibold tracking-tighter">
      {settings?.siteName || "Logo"}
    </span>
  );
}