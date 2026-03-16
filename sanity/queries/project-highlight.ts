import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

// @sanity-typegen-ignore
export const projectHighlightQuery = groq`
  _type == "project-highlight" => {
    _type,
    _key,
    tagLine,
    title,
    description,
    viewAllLabel,
    padding,
    colorVariant,
    projects[]->{
      title,
      subtitle,
      slug,
      mainImage{
        ${imageQuery}
      },
      category
    }
  }
`;
