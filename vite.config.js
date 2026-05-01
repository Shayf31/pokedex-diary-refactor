import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        pokedex: resolve(__dirname, "pokedex.html"),
      },
    },
  },
});