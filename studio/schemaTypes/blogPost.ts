import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog-Beitrag",
  type: "document",
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (Slug)",
      type: "slug",
      options: { source: "titel", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "untertitel",
      title: "Untertitel / Anrisstext",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "datum",
      title: "Datum",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverBild",
      title: "Coverbild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "inhalt",
      title: "Inhalt",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zielgruppe",
      title: "Zielgruppe",
      type: "string",
      options: {
        list: [
          { title: "Kinder & Eltern", value: "kinder" },
          { title: "Erwachsene", value: "erwachsene" },
          { title: "Unternehmen", value: "unternehmen" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lesedauer",
      title: "Lesedauer",
      type: "string",
      description: "z. B. „6 Min Lesezeit“",
    }),
  ],
  preview: {
    select: { title: "titel", subtitle: "datum", media: "coverBild" },
  },
});
