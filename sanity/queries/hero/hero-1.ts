import { groq } from "next-sanity";
import { videoQuery } from "../shared/video";

export const hero1Query = groq`
  _type == "hero-1" => {
    _type,
    _key,
    tagLine,
    title,
    video{
      ${videoQuery}
    },
  }
`;
