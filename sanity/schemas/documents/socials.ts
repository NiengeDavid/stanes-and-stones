import { defineField, defineType } from "sanity";
import { Share2 } from "lucide-react";

export default defineType({
  name: "socials",
  title: "Socials",
  type: "document",
  icon: Share2,
  fields: [
    defineField({
      name: "items",
      title: "Social Media Handles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description: 'e.g. FACEBOOK, TWITTER, INSTAGRAM',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Socials" };
    },
  },
});
