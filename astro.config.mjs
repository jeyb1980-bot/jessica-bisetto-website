// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://jessica-bisetto.de',
  integrations: [react()],
  // Astros Entwickler-Leiste liegt unten mittig über der Seite und fängt dort
  // Klicks ab (z. B. auf die Cookie-Buttons). Sie bringt uns nichts, also aus.
  devToolbar: { enabled: false }
});