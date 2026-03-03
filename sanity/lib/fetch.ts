import { NAVIGATION_QUERYResult, SETTINGS_QUERYResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/queries/navigation";
import { SETTINGS_QUERY } from "@/sanity/queries/settings";

export const fetchSanityNavigation =
  async (): Promise<NAVIGATION_QUERYResult> => {
    const { data } = await sanityFetch({
      query: NAVIGATION_QUERY,
    });

    return data;
  };

export const fetchSanitySettings = async (): Promise<SETTINGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: SETTINGS_QUERY,
  });

  return data;
};
