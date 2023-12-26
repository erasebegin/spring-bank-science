import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  buildOptions: {
    site: 'http://localhost:4321'
  },
  integrations: [tailwind()],
  output: "server",
  adapter: netlify()
});