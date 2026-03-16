import Logo from "@/components/logo";
import Link from "next/link";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  fetchSanitySettings,
  fetchSanityNavigation,
  fetchSanitySocials,
  fetchSanityCompanyInfo,
} from "@/sanity/lib/fetch";
import { NAVIGATION_QUERY_RESULT } from "@/sanity.types";
import Container from "./container";

type SanityLink = NonNullable<NAVIGATION_QUERY_RESULT[0]["links"]>[number];

export default async function Footer() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();
  const socials = await fetchSanitySocials();
  const companyInfo = await fetchSanityCompanyInfo();

  return (
    <footer className="bg-primary/96 text-secondary">
      {/* Three-column grid */}
      <Container>
        <div className="py-24 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 — Follow Us */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Follow Us
            </p>
            <ul className="flex flex-col gap-2">
              {socials?.items?.length ? (
                socials.items.map(
                  (item: { platform: string; url: string }, idx: number) => (
                    <li key={idx}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold tracking-wider uppercase hover:opacity-60 transition-opacity"
                      >
                        {item.platform}
                      </a>
                    </li>
                  ),
                )
              ) : (
                <li className="text-sm text-muted-foreground">—</li>
              )}
            </ul>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {navigation[0]?.links?.map((navItem: SanityLink) => (
                <li key={navItem._key}>
                  <Link
                    href={navItem.href || "#"}
                    target={navItem.target ? "_blank" : undefined}
                    rel={navItem.target ? "noopener noreferrer" : undefined}
                    className="text-sm font-light tracking-wider uppercase hover:opacity-60 transition-opacity"
                  >
                    {navItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company Info */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              Contact
            </p>
            <div className="flex flex-col gap-1 text-lg">
              {companyInfo?.email && (
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:opacity-60 transition-opacity"
                >
                  {companyInfo.email}
                </a>
              )}
              {companyInfo?.phone && (
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="hover:opacity-60 transition-opacity"
                >
                  {companyInfo.phone}
                </a>
              )}
            </div>
            {companyInfo?.address && (
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mt-2">
                  Office
                </p>
                <p className="text-lg whitespace-pre-line">
                  {companyInfo.address}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
       {/* Copyright bar */}
        <div className="bg-secondary text-primary border-t border-black/10">
          <div className="container md:px-5 w-full max-w-420 mx-auto py-5 flex flex-row items-center justify-start gap-4 text-xs text-black/60">
            <Link href="/" aria-label="Home page" className="inline-block">
              <Logo settings={settings} />
            </Link>
            <div className="flex items-left gap-2">
              <span>&copy; {new Date().getFullYear()}</span>
              {settings?.copyright && (
                <span className="[&>p]:m-0! text-primary">
                  <PortableTextRenderer value={settings.copyright} />
                </span>
              )}
            </div>
          </div>
        </div>
    </footer>
  );
}
