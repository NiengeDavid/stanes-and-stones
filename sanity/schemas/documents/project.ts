import { defineType, defineField, defineArrayMember } from "sanity";
import { Briefcase } from "lucide-react";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  icon: Briefcase,
  groups: [
    { name: "content", title: "Content" },
    { name: "details", title: "Project Details" },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Sub-title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),

    defineField({
      name: "projectOverview",
      title: "Project Overview",
      type: "text",
      rows: 4,
      group: "content",
      description: "A concise overview of the project (displayed prominently on the detail page)",
    }),

    defineField({
      name: "clientLogo",
      title: "Client Logo",
      type: "image",
      group: "details",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),

    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "projectName",
      title: "Project",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "details",
    }),

    // What's included
    defineField({
      name: "whatsIncluded",
      title: "What's Included",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description: "List of deliverables or inclusions",
    }),

    // Brief & Solution
    defineField({
      name: "brief",
      title: "The Brief",
      type: "text",
      rows: 4,
      group: "content",
    }),
    defineField({
      name: "solution",
      title: "The Solution",
      type: "text",
      rows: 4,
      group: "content",
    }),

    // Draggable content array
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      group: "content",
      description: "Drag to reorder content sections",
      of: [
        defineArrayMember({
          name: "largeImage",
          title: "Large Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
          preview: {
            select: { media: "asset", title: "alt" },
            prepare({ media, title }) {
              return {
                title: "Large Image",
                subtitle: title,
                media,
              };
            },
          },
        }),
        defineArrayMember({
          name: "referHero2",
          title: "Refer Hero 2",
          type: "object",
          fields: [
            defineField({
              name: "imageLeft",
              title: "Image (Left)",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt Text" }],
            }),
            defineField({
              name: "imageRight",
              title: "Image (Right)",
              type: "image",
              options: { hotspot: true },
              fields: [{ name: "alt", type: "string", title: "Alt Text" }],
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            prepare() {
              return { title: "Refer Hero 2 (Side-by-side)" };
            },
          },
        }),
        defineArrayMember({
          name: "flyers",
          title: "Flyers",
          type: "object",
          fields: [
            defineField({
              name: "images",
              title: "Flyer Images",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [{ name: "alt", type: "string", title: "Alt Text" }],
                },
              ],
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
          preview: {
            prepare() {
              return { title: "Flyers (Gallery)" };
            },
          },
        }),
      ],
    }),

    // SEO
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image - [1200x630]",
      type: "image",
      group: "seo",
    }),

    orderRankField({ type: "project" }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ?? "No subtitle",
        media,
      };
    },
  },
});
