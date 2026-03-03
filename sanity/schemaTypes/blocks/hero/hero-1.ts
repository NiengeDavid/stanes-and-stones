import { defineField, defineType } from "sanity";
import { LayoutTemplate } from "lucide-react";

export default defineType({
    name: "hero-1",
    title: "Hero 1",
    type: "object",
    icon: LayoutTemplate,
    fields: [
        defineField({
            name: "tagLine",
            type: "string",
        }),
        defineField({
            name: "title",
            type: "text",
        }),
        defineField({
            name: "video",
            title: "Video",
            type: "file",
            options: {
                accept: "video/*",
            },
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                title: "Hero 1",
                subtitle: title,
            };
        },
    },
});
