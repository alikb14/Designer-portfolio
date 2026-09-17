import { defineField, defineType } from "sanity";
import { hasAllowedVimeoUrl } from "./shared";

export const homePage = defineType({
  fields: [
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: "reelVimeoUrl",
      title: "Reel Vimeo URL",
      description:
        "Use a Vimeo URL only. Do not paste iframe or script markup.",
      type: "url",
      validation: (Rule) =>
        Rule.custom((value) =>
          value === undefined || hasAllowedVimeoUrl(value)
            ? true
            : "Use a valid https Vimeo URL.",
        ),
    }),
    defineField({
      name: "reelLabel",
      title: "Reel accessible label",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
  ],
  name: "homePage",
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
  title: "Home page",
  type: "document",
});
