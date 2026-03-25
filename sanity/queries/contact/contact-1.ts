import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

// @sanity-typegen-ignore
export const contact1Query = groq`
  _type == "contact-1" => {
    _type,
    _key,
    padding,
    colorVariant,
    title,
    address,
    openingHours[]{
      _key,
      day,
      hours,
    },
    phone,
    email,
    image{
      ${imageQuery}
    },
    mapSrc,
  }
`;
