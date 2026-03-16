import { groq } from "next-sanity";
import { imageQuery } from "./shared/image";

// Full single project query
export const PROJECT_QUERY = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  subtitle,
  slug,
  mainImage{
    ${imageQuery}
  },
  client,
  projectName,
  year,
  category,
  projectOverview,
  whatsIncluded,
  clientLogo{
    ${imageQuery}
  },
  brief,
  solution,
  content[]{
    _key,
    _type,
    // largeImage
    _type == "largeImage" => {
      ...,
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions { width, height }
        }
      }
    },
    // referHero2
    _type == "referHero2" => {
      text,
      imageLeft{
        ${imageQuery}
      },
      imageRight{
        ${imageQuery}
      }
    },
    // flyers
    _type == "flyers" => {
      caption,
      images[]{
        ${imageQuery}
      }
    }
  },
  _createdAt,
  _updatedAt,
  meta_title,
  meta_description,
  noindex,
  ogImage{
    asset->{
      _id,
      url,
      metadata {
        dimensions { width, height }
      }
    }
  }
}`;

// List of all projects (for /projects page)
export const PROJECTS_QUERY = groq`*[_type == "project" && defined(slug)] | order(orderRank){
  title,
  subtitle,
  slug,
  mainImage{
    ${imageQuery}
  },
  category
}`;

// Static params for generateStaticParams
export const PROJECTS_SLUGS_QUERY = groq`*[_type == "project" && defined(slug)]{slug}`;
