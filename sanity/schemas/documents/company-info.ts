import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";

export default defineType({
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Office Address",
      type: "text",
      rows: 3,
      description: "Full office address displayed in the footer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Company Info" };
    },
  },
});
