import { defineField, defineType } from "sanity";

export default defineType({
  name: "kurs",
  title: "Kurs",
  type: "document",
  fields: [
    defineField({
      name: "titel",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "untertitel",
      title: "Untertitel",
      type: "string",
    }),
    defineField({
      name: "zielgruppe",
      title: "Zielgruppe",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Kinder", value: "Kinder" },
          { title: "Erwachsene", value: "Erwachsene" },
          { title: "Unternehmen", value: "Unternehmen" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "datum",
      title: "Termin",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dauer",
      title: "Dauer (Minuten)",
      type: "number",
    }),
    defineField({
      name: "ort",
      title: "Ort",
      type: "string",
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Vor Ort", value: "Vor Ort" },
          { title: "Online", value: "Online" },
          { title: "Hybrid", value: "Hybrid" },
        ],
      },
    }),
    defineField({
      name: "preis",
      title: "Preis (€)",
      type: "number",
      description: "0 für kostenfrei / Honorar nach Aufwand",
    }),
    defineField({
      name: "plaetze",
      title: "Plätze gesamt",
      type: "number",
    }),
    defineField({
      name: "beschreibung",
      title: "Beschreibung",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "anmeldeLink",
      title: "Anmelde-Link",
      type: "url",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Offen", value: "Offen" },
          { title: "Ausgebucht", value: "Ausgebucht" },
          { title: "Vorbei", value: "Vorbei" },
          { title: "Auf Anfrage", value: "Auf Anfrage" },
        ],
      },
      initialValue: "Offen",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverBild",
      title: "Cover-Bild",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "titel", subtitle: "datum", media: "coverBild" },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString("de-DE") : "Kein Termin",
        media,
      };
    },
  },
});
