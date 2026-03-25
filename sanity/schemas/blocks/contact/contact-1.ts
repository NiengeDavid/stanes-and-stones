import { defineField, defineType } from "sanity";
import { MapPin } from "lucide-react";

export default defineType({
  name: "contact-1",
  type: "object",
  title: "Contact 1",
  icon: MapPin,
  description: "Office contact block with address, hours, phone, email, image and map",
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
      name: "title",
      type: "string",
      title: "Title",
      description: 'Office title, e.g. "Office"',
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Address",
    }),
    defineField({
      name: "openingHours",
      type: "array",
      title: "Opening Hours",
      of: [
        defineField({
          name: "openingHoursRow",
          type: "object",
          title: "Hours Row",
          fields: [
            defineField({
              name: "day",
              type: "string",
              title: "Day / Day Range",
              description: "e.g. Mon - Fri",
            }),
            defineField({
              name: "hours",
              type: "string",
              title: "Hours",
              description: "e.g. 8:00 - 17:00 or Closed",
            }),
          ],
          preview: {
            select: {
              title: "day",
              subtitle: "hours",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Office / Location Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mapSrc",
      type: "string",
      title: "Google Maps Embed URL",
      description:
        "Paste only the src value from the Google Maps embed iframe (URL starting with https://www.google.com/maps/embed?...)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "address",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Contact 1",
        subtitle,
      };
    },
  },
});
