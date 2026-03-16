import { groq } from "next-sanity";

export const SOCIALS_QUERY = groq`*[_type == "socials"][0]{
  _id,
  items[]{
    platform,
    url
  }
}`;
