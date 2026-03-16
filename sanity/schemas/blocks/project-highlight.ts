import { defineField, defineType } from "sanity";
import { Star } from "lucide-react";

export default defineType({
  name: "project-highlight",
  type: "object",
  title: "Project Highlight",
  description: "Featured projects spotlight with manually curated picks",
  icon: Star,
  fields: [
    defineField({
      name: "tagLine",
      title: "Tag Line",
      type: "string",
      description: "Small label above the heading (e.g. 'We love what we do')",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading (e.g. 'Featured Projects')",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "viewAllLabel",
      title: "View All Link Label",
      type: "string",
      initialValue: "VIEW ALL PROJECTS →",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      description: "Manually select projects to highlight (recommended: 4–6)",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    }),
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagLine",
    },
    prepare({ title, subtitle }) {
      return {
        title: "Project Highlight",
        subtitle: title ?? subtitle,
      };
    },
  },
});
