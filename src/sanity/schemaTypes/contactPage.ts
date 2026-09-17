import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  fields: [
    defineField({
      name: "invitation",
      title: "Invitation",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      of: [
        {
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["https"] }),
            }),
          ],
          name: "socialLink",
          title: "Social link",
          type: "object",
        },
      ],
      type: "array",
    }),
  ],
  name: "contactPage",
  preview: {
    prepare: () => ({ title: "Contact page" }),
  },
  title: "Contact page",
  type: "document",
});
