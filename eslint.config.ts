import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript"
import skipFormatting from "eslint-config-prettier/flat"
import pluginOxlint from "eslint-plugin-oxlint"
import pluginVue from "eslint-plugin-vue"
import { globalIgnores } from "eslint/config"

import oxlintConfig from "./oxlint.config"

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  {
    name: "app/files-to-lint",
    files: ["**/*.{vue,ts,mts,tsx}"],
    extends: [
      ...pluginVue.configs["flat/essential"],
      vueTsConfigs.recommended,
      ...pluginOxlint.buildFromOxlintConfig(oxlintConfig),
      skipFormatting,
    ],
  },
)
