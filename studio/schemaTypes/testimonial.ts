import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Kundenstimme",
  type: "document",
  fields: [
    defineField({
      name: "zitat",
      title: "Zitat",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Nur mit schriftlicher Freigabe der Person veröffentlichen.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kontext",
      title: "Kontext",
      type: "string",
      description: "z. B. „Erwachsenen-Coaching“ oder „Kinder- & Jugendcoaching · 2021“",
    }),
    defineField({
      name: "reihenfolge",
      title: "Reihenfolge",
      type: "number",
      description: "Kleinere Zahl erscheint zuerst.",
    }),
  ],
  orderings: [
    {
      title: "Reihenfolge",
      name: "reihenfolgeAsc",
      by: [{ field: "reihenfolge", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "kontext" },
  },
});
