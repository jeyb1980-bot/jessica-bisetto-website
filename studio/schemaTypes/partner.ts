import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner / Referenz",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kategorie",
      title: "Kategorie",
      type: "string",
      description:
        "z. B. Städte & Kommunen, Volkshochschulen, Schulen, Soziale Einrichtungen, Unternehmen",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reihenfolge",
      title: "Reihenfolge",
      type: "number",
      description: "Kleinere Zahl erscheint zuerst innerhalb der Kategorie.",
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
    select: { title: "name", subtitle: "kategorie" },
  },
});
