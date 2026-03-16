import { groq } from "next-sanity";
import { bodyQuery } from "../shared/body";
import { linkQuery } from "../shared/link";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const splitContentQuery = groq`
  _type == "split-content" => {
    _type,
    _key,
    sticky,
    padding,
    colorVariant,
    image{
      ${imageQuery}
    },
    tagLine,
    title,
    body[]{
      ${bodyQuery}
    },
    link{
      ${linkQuery}
    },
  }
`;
