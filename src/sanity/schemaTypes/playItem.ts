import { defineField, defineType } from "sanity";

export const playItem = defineType({
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "artwork",
      title: "Artwork",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (Rule) => Rule.required().max(160),
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "download",
      title: "Download package",
      description:
        "Upload an approved package; arbitrary external download URLs are not supported.",
      type: "file",
    }),
    defineField({
      name: "licenseNote",
      title: "License or version note",
      type: "string",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  name: "playItem",
  orderings: [
    {
      by: [{ field: "order", direction: "asc" }],
      name: "displayOrderAscending",
      title: "Display order",
    },
  ],
  preview: {
    select: { media: "artwork", subtitle: "description", title: "title" },
  },
  title: "Play item",
  type: "document",
});
