import cozy from "@pretty-cozy/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [cozy.base, cozy.vitest],
  plugins: ["vue"],
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error",
  },
  options: {
    /**
     * Type aware checks currently don't work with vue templates.
     *
     * @see https://github.com/oxc-project/oxc/issues/15761
     *
     * typeAware: true,
     * typeCheck: true,
     */
    reportUnusedDisableDirectives: "error",
    denyWarnings: true,
  },
})
