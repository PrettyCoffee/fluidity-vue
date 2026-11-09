<script lang="ts">
import * as Brave from "./icon-brave.vue"
import * as CircleX from "./icon-circle-x.vue"
import * as DuckDuckGo from "./icon-duckduckgo.vue"
import * as Ecosia from "./icon-ecosia.vue"
import * as Google from "./icon-google.vue"
import { type IconProps } from "./icon-props"
import * as Search from "./icon-search.vue"

const icons = {
  brave: Brave,
  duckduckgo: DuckDuckGo,
  ecosia: Ecosia,
  google: Google,
  search: Search,
  "circle-x": CircleX,
}
</script>

<script setup lang="ts">
import { computed } from "vue"

export interface SvgIconProps extends IconProps {
  name: keyof typeof icons
  size?: number | string
  class?: string
}

const props = defineProps<SvgIconProps>()
const IconPath = computed(() => icons[props.name].default)

const resolved = computed(() => {
  const defaults = icons[props.name].defaultProps
  const size = icons[props.name].size
  return {
    viewBox: `0 0 ${size} ${size}`,
    strokeWidth: props.strokeWidth ?? defaults.strokeWidth ?? 2,
    fill: props.fill ?? defaults.fill ?? "none",
    stroke: props.stroke ?? defaults.stroke ?? "currentColor",
  }
})
</script>

<template>
  <svg
    :viewBox="resolved.viewBox"
    aria-hidden="true"
    focusable="false"
    stroke-linecap="round"
    stroke-linejoin="round"
    :width="props.size ?? '1rem'"
    :height="props.size ?? '1rem'"
    :class="props.class"
    :fill="resolved.fill"
    :stroke="resolved.stroke"
    :stroke-width="resolved.strokeWidth"
  >
    <IconPath />
  </svg>
</template>

<style scoped>
svg {
  overflow: visible;
}
</style>
