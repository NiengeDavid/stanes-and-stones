import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const carousel4Query = groq`
  _type == "carousel-4" => {
    _type,
    _key,
    padding,
    colorVariant,
    members[]{
      _key,
      name,
      role,
      image{
        ${imageQuery}
      },
    },
  }
`;
