import { PAGE_QUERY_RESULT } from "@/sanity.types";
import Hero1 from "@/components/blocks/hero/hero-1";
import Hero2 from "@/components/blocks/hero/hero-2";
import Hero3 from "@/components/blocks/hero/hero-3";
import SectionHeader from "@/components/blocks/section-header";
import SplitRow from "@/components/blocks/split/split-row";
import GridRow from "@/components/blocks/grid/grid-row";
import Carousel1 from "@/components/blocks/carousel/carousel-1";
import Carousel2 from "@/components/blocks/carousel/carousel-2";
import TimelineRow from "@/components/blocks/timeline/timeline-row";
import Cta1 from "@/components/blocks/cta/cta-1";
import LogoCloud1 from "@/components/blocks/logo-cloud/logo-cloud-1";
import FAQs from "@/components/blocks/faqs";
import FormNewsletter from "@/components/blocks/forms/newsletter";
import AllPosts from "@/components/blocks/all-posts";
import Quote from "@/components/blocks/quote/index";
import AllProjects from "@/components/blocks/all-projects";
import ProjectHighlight from "@/components/blocks/project-highlight";

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number];

// Known block types from sanity.types.ts
type KnownBlock = Block;

// Extended map that allows new block types not yet in generated types
// (these will appear after running `pnpm sanity typegen generate`)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {
  "hero-1": Hero1,
  "hero-2": Hero2,
  "hero-3": Hero3,
  "section-header": SectionHeader,
  "split-row": SplitRow,
  "grid-row": GridRow,
  "carousel-1": Carousel1,
  "carousel-2": Carousel2,
  "timeline-row": TimelineRow,
  "cta-1": Cta1,
  "logo-cloud-1": LogoCloud1,
  faqs: FAQs,
  "quote-block": Quote,
  "form-newsletter": FormNewsletter,
  "all-posts": AllPosts,
  "all-projects": AllProjects,
  "project-highlight": ProjectHighlight,
};

export default function Blocks({ blocks }: { blocks: KnownBlock[] }) {
  return (
    <>
      {blocks?.map((block) => {
        const Component = componentMap[block._type];
        if (!Component) {
          console.warn(
            `No component implemented for block type: ${block._type}`
          );
          return <div data-type={block._type} key={block._key} />;
        }
        return <Component {...(block as any)} key={block._key} />;
      })}
    </>
  );
}
