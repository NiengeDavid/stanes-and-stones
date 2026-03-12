import { groq } from "next-sanity";
import { linkQuery } from "../shared/link";
import { bodyQuery } from "../shared/body";
import { videoQuery } from "../shared/video";

// @sanity-typegen-ignore
export const hero3Query = groq`
  _type == "hero-3" => {
    _type,
    _key,
    tagLine,
    title,
    body[]{
      ${bodyQuery}
    },
   video{
      ${videoQuery}
    },
    links[]{
      ${linkQuery}
    },
  }
`;
