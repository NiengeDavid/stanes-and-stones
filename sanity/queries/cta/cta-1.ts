import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";
import { bodyQuery } from "../shared/body";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const cta1Query = groq`
  _type == "cta-1" => {
    _type,
    _key,
    padding,
    colorVariant,
    sectionWidth,
    stackAlign,
    image {
      ${imageQuery}
    },
    tagLine,
    title,
    body[]{
      ${bodyQuery}
    },
    links[]{
      ${linkQuery}
    },
  }
`;
