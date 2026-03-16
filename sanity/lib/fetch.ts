import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import { QUOTE_SETTINGS_QUERY } from "@/sanity/queries/quote-settings";
import { CONTACT_QUERY } from "@/sanity/queries/contact";
import { SOCIALS_QUERY } from "@/sanity/queries/socials";
import { COMPANY_INFO_QUERY } from "@/sanity/queries/company-info";

import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from "@/sanity/queries/post";

import {
  PROJECT_QUERY,
  PROJECTS_QUERY,
  PROJECTS_SLUGS_QUERY,
} from "@/sanity/queries/project";

import {
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POSTS_SLUGS_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
  CONTACT_QUERY_RESULT,
  QUOTE_SETTINGS_QUERY_RESULT,
} from "@/sanity.types";

// ─── Page ────────────────────────────────────────────────────────────────────

export const fetchSanityPageBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<PAGE_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPagesStaticParams =
  async (): Promise<PAGES_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: PAGES_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

// ─── Posts ───────────────────────────────────────────────────────────────────

export const fetchSanityPosts = async (): Promise<POSTS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return data;
};

export const fetchSanityPostBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<POST_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityPostsStaticParams =
  async (): Promise<POSTS_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: POSTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

// ─── Projects ────────────────────────────────────────────────────────────────

export const fetchSanityProjects = async () => {
  const { data } = await sanityFetch({
    query: PROJECTS_QUERY,
  });

  return data;
};

export const fetchSanityProjectBySlug = async ({
  slug,
}: {
  slug: string;
}) => {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityProjectsStaticParams = async () => {
  const { data } = await sanityFetch({
    query: PROJECTS_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return data;
};

// ─── Navigation / Settings / Contact / Quote ─────────────────────────────────

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: NAVIGATION_QUERY,
    });

    return data;
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data;
};

export const fetchSanityContact = async (): Promise<CONTACT_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: CONTACT_QUERY,
  });

  return data;
};

export const fetchSanityQuoteSettings =
  async (): Promise<QUOTE_SETTINGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: QUOTE_SETTINGS_QUERY,
    });

    return data;
  };

export const fetchSanitySocials = async () => {
  const { data } = await sanityFetch({
    query: SOCIALS_QUERY,
  });

  return data;
};

export const fetchSanityCompanyInfo = async () => {
  const { data } = await sanityFetch({
    query: COMPANY_INFO_QUERY,
  });

  return data;
};
