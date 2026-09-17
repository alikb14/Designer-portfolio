import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  fields: [
    defineField({
      name: "siteName",
      title: "Site name",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default SEO description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
  ],
  name: "siteSettings",
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
  title: "Site settings",
  type: "document",
});
