"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/container";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { cn } from "@/lib/utils";
import { NAVIGATION_QUERYResult, SETTINGS_QUERYResult } from "@/sanity.types";

export default function HeaderClient({
  settings,
  navigation,
}: {
  settings: SETTINGS_QUERYResult;
  navigation: NAVIGATION_QUERYResult;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 w-full border-b shadow z-50 transition-colors duration-300",
        scrolled ? "bg-black border-white/10" : "bg-white border-black/10",
      )}
    >
      <Container>
        <div className="container flex items-center justify-between h-24 mx-auto">
          <Link href="/" aria-label="Home page">
            <Logo
              settings={settings}
              themeOverride={scrolled ? "dark" : "light"}
            />
          </Link>

          <div className="hidden xl:flex gap-7 items-center justify-between">
            <DesktopNav navigation={navigation} scrolled={scrolled} />
          </div>

          <div className="flex gap-1 items-center xl:hidden">
            <MobileNav
              navigation={navigation}
              settings={settings}
              scrolled={scrolled}
            />
          </div>
        </div>
      </Container>
    </header>
  );
}
