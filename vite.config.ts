import { fileURLToPath, URL } from "node:url"

import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import { defineConfig, configDefaults } from "vitest/config"

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "happy-dom",
    exclude: configDefaults.exclude,
    root: fileURLToPath(new URL("./", import.meta.url)),
  },
})
