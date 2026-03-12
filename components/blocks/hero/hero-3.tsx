// components/blocks/hero-3.tsx
import PortableTextRenderer from "@/components/portable-text-renderer";
import { PAGE_QUERY_RESULT } from "@/sanity.types";

type Hero3Props = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
  { _type: "hero-3" }
>;

export default function Hero3({ tagLine, title, body, video }: Hero3Props) {
  const videoDimensions = (
    video?.asset as
      | { metadata?: { dimensions?: { width?: number; height?: number } } }
      | undefined
  )?.metadata?.dimensions;

  return (
    <div className="container dark:bg-background py-20 lg:pt-40">
      {/* ---------- HEAD ---------- */}
      <div className="grid grid-cols-1 gap-2">
        <div className="flex flex-col justify-center mb-6">
          {tagLine && (
            <h1 className="leading-0 font-sans animate-fade-up [animation-delay:100ms] opacity-0">
              <span className="text-base text-muted-foreground font-semibold">{tagLine}</span>
            </h1>
          )}
          {title && (
            <h2 className="max-w-xl mt-6 font-bold leading-[1.1] text-4xl md:text-5xl lg:text-6xl animate-fade-up [animation-delay:200ms] opacity-0">
              {title}
            </h2>
          )}
          {body && (
            <div className="text-lg mt-6 animate-fade-up [animation-delay:300ms] opacity-0">
              <PortableTextRenderer value={body} />
            </div>
          )}
        </div>
        {/* Video */}
        <div className="flex flex-col justify-center">
          {video && (
            <div className="animate-fade-up [animation-delay:400ms] opacity-0">
              <video
                src={video?.asset?.url || ""}
                className="w-full h-auto"
                width={videoDimensions?.width ?? 800}
                height={videoDimensions?.height ?? 600}
                controls
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
