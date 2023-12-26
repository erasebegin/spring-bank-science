import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  buildOptions: {
    site: 'http://localhost:4321',
  },
  integrations: [tailwind()]
});