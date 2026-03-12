import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from "@/sanity/queries/page";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";
import { QUOTE_SETTINGS_QUERY } from "@/sanity/queries/quote-settings";
import { CONTACT_QUERY } from "@/sanity/queries/contact";

import {
  POST_QUERY,
  POSTS_QUERY,
  POSTS_SLUGS_QUERY,
} from "@/sanity/queries/post";

import {
  WORK_QUERY,
  WORKS_QUERY,
  WORKS_SLUGS_QUERY,
} from "@/sanity/queries/work";

import {
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
  POST_QUERY_RESULT,
  POSTS_QUERY_RESULT,
  POSTS_SLUGS_QUERY_RESULT,
  NAVIGATION_QUERY_RESULT,
  SETTINGS_QUERY_RESULT,
  WORK_QUERY_RESULT,
  WORKS_QUERY_RESULT,
  WORKS_SLUGS_QUERY_RESULT,
  CONTACT_QUERY_RESULT,
  QUOTE_SETTINGS_QUERY_RESULT,
} from "@/sanity.types";

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

export const fetchSanityWorks = async (): Promise<WORKS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: WORKS_QUERY,
  });

  return data;
};

export const fetchSanityWorkBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<WORK_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: WORK_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityWorksStaticParams =
  async (): Promise<WORKS_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: WORKS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });

    return data;
  };

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
