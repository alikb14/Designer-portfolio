import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  fields: [
    defineField({
      name: "portrait",
      title: "Portrait or still",
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
      name: "biography",
      title: "Biography",
      of: [{ type: "block" }],
      type: "array",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  name: "aboutPage",
  preview: {
    prepare: () => ({ title: "About page" }),
  },
  title: "About page",
  type: "document",
});
