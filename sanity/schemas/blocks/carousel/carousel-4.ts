import { defineField, defineType } from "sanity";
import { Users } from "lucide-react";

export default defineType({
  name: "carousel-4",
  type: "object",
  title: "Carousel 4",
  icon: Users,
  description: "A grid of team members with hover overlays",
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Color Variant",
      description: "Select a background color variant",
    }),
    defineField({
      name: "members",
      type: "array",
      title: "Team Members",
      of: [
        defineField({
          name: "member",
          type: "object",
          title: "Member",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Photo",
              options: { hotspot: true },
            }),
            defineField({
              name: "name",
              type: "string",
              title: "Name",
            }),
            defineField({
              name: "role",
              type: "string",
              title: "Role / Title",
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "role",
              media: "image",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "members.0.name",
    },
    prepare({ title }) {
      return {
        title: "Team Grid",
        subtitle: title,
      };
    },
  },
});
