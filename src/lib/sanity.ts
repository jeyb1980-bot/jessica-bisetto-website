import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "t3yg1e5g",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: unknown) {
  return builder.image(source as any);
}

export interface Kurs {
  _id: string;
  titel: string;
  untertitel?: string;
  zielgruppe: string[];
  datum: string;
  dauer?: number;
  ort?: string;
  format?: string;
  preis?: number;
  plaetze?: number;
  beschreibung?: any[];
  anmeldeLink?: string;
  status: "Offen" | "Ausgebucht" | "Vorbei" | "Auf Anfrage";
  coverBild?: any;
}

export interface BlogPost {
  _id: string;
  titel: string;
  slug: { current: string };
  untertitel?: string;
  datum: string;
  coverBild?: any;
  inhalt: any[];
  zielgruppe: "kinder" | "erwachsene" | "unternehmen";
  lesedauer?: string;
}

export interface Testimonial {
  _id: string;
  zitat: string;
  name: string;
  kontext?: string;
  reihenfolge?: number;
}

export interface Partner {
  _id: string;
  name: string;
  kategorie: string;
  reihenfolge?: number;
}

export async function getKurse(): Promise<Kurs[]> {
  return sanityClient.fetch(
    `*[_type == "kurs" && status != "Vorbei" && datum >= now()] | order(datum asc)`
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(`*[_type == "blogPost"] | order(datum desc)`);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch(
    `*[_type == "testimonial"] | order(reihenfolge asc)`
  );
}

export async function getPartners(): Promise<Partner[]> {
  return sanityClient.fetch(`*[_type == "partner"] | order(reihenfolge asc)`);
}
