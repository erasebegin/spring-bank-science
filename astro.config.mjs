import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  buildOptions: {
    site: 'http://localhost:4321'
  },
  integrations: [tailwind(), react()],
  output: "server",
  adapter: netlify(),
});