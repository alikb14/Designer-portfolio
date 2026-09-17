import { defineField, defineType } from "sanity";
import { hasAllowedVimeoUrl } from "./shared";

export const workProject = defineType({
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "poster",
      title: "Card poster",
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
      name: "previewVideo",
      title: "Hover-preview MP4",
      description:
        "Short, silent and optimized preview only; never upload the full project video.",
      type: "file",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "previewPoster",
      title: "Selected preview poster frame",
      description:
        "Upload the approved still generated from the preview video.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "previewPosterTimecode",
      title: "Preview poster timecode (seconds)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "detailVimeoUrl",
      title: "Full project Vimeo URL",
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
  ],
  name: "workProject",
  orderings: [
    {
      by: [{ field: "order", direction: "asc" }],
      name: "displayOrderAscending",
      title: "Display order",
    },
  ],
  preview: {
    select: { media: "poster", subtitle: "summary", title: "title" },
  },
  title: "Work project",
  type: "document",
});
