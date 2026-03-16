import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

// @sanity-typegen-ignore
export const allProjectsQuery = groq`
  _type == "all-projects" => {
    _type,
    _key,
    padding,
    colorVariant,
  }
`;

// Standalone query used in /projects page server component
export const ALL_PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)] | order(orderRank){
  title,
  subtitle,
  slug,
  mainImage{
    ${imageQuery}
  },
  category
}`;
