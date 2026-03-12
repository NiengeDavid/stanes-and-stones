import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAVIGATION_QUERYResult } from "@/sanity.types";

type SanityLink = NonNullable<NAVIGATION_QUERYResult[0]["links"]>[number];

export default function DesktopNav({
  navigation,
  scrolled,
}: {
  navigation: NAVIGATION_QUERYResult;
  scrolled: boolean;
}) {
  return (
    <div className="hidden xl:flex items-center gap-8">
      {navigation[0]?.links?.map((navItem: SanityLink) => (
        <Link
          key={navItem._key}
          href={navItem.href || "#"}
          target={navItem.target ? "_blank" : undefined}
          rel={navItem.target ? "noopener noreferrer" : undefined}
          className={cn(
            "text-2xl font-extralight leading-3 tracking-wide transition-colors",
            scrolled
              ? "text-white hover:text-white/80"
              : "text-black hover:text-black/70",
          )}
        >
          {navItem.title}
        </Link>
      ))}
    </div>
  );
}
