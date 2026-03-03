"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/logo";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import { SETTINGS_QUERYResult, NAVIGATION_QUERYResult } from "@/sanity.types";
import { cn } from "@/lib/utils";

type SanityLink = NonNullable<NAVIGATION_QUERYResult[0]["links"]>[number];

export default function MobileNav({
  navigation,
  settings,
  scrolled,
}: {
  navigation: NAVIGATION_QUERYResult;
  settings: SETTINGS_QUERYResult;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className={cn(
            "w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1",
            scrolled ? "text-white" : "text-black",
          )}
        >
          <AlignRight />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={cn(
          "bg-white",
          scrolled ? "bg-black text-white" : "text-black",
        )}
      >
        <SheetHeader>
          <div className="mx-auto">
            <Logo
              settings={settings}
              themeOverride={scrolled ? "dark" : "light"}
            />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none text-left pl-24 space-y-7">
              {navigation[0]?.links?.map((navItem: SanityLink) => (
                <li key={navItem._key}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={navItem.href || "#"}
                    target={navItem.target ? "_blank" : undefined}
                    rel={navItem.target ? "noopener noreferrer" : undefined}
                    className={cn(
                      "text-xl font-medium transition-colors hover:text-primary/80",
                      scrolled
                        ? "text-white hover:text-white/80"
                        : "text-black hover:text-black/70",
                    )}
                  >
                    {navItem.title}
                  </Link>
                  <Separator />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
