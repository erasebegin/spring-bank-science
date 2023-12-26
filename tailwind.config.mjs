/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      white: "#ffffff",
      green: {
        DEFAULT: "#32B39B",
        100: "#52D2A4",
        200: "#1A6E5E",
        300: "#17BB8E",
        400: "#56DC8C",
      },
      blue: {
        DEFAULT: "#124985",
      },
      purple: {
        DEFAULT: "#7534E1",
      },
      gray: {
        100: "#EBF5F3",
        200: "#555555",
        300: "#343434",
        transparent: "#403B4733",
        DEFAULT: "#403B47",
      },
    },
  },
};
