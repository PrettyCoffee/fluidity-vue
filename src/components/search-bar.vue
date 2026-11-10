<script lang="ts">
import { searchQueryToken, searchEngines } from "@/data/search"

const getForwardingUrl = (query: string, forwards: Record<string, string>) => {
  if (forwards[query]) return forwards[query]

  return Object.entries(forwards).reduce<string | null>(
    (result, [pattern, url]) => {
      if (result || !pattern.includes(searchQueryToken)) return result
      const [start = "", end = ""] = pattern.split(searchQueryToken)
      if (!query.startsWith(start) || !query.endsWith(end)) return result
      return url.replace(
        searchQueryToken,
        query.slice(start.length, query.length - end.length),
      )
    },
    null,
  )
}

const getEngineUrl = (query: string, engine: string) => {
  const engineLink =
    searchEngines[engine as keyof typeof searchEngines] ?? engine
  return engineLink.replace(searchQueryToken, query)
}

const getNextEngine = (current: string, direction = 1) => {
  const engines = Object.keys(searchEngines)
  const currentIndex = engines.indexOf(current)
  if (currentIndex === -1) return undefined
  const newIndex = (currentIndex + engines.length + direction) % engines.length
  return engines[newIndex]
}
</script>

<script setup lang="ts">
import { computed } from "vue"

import { useUserConfigStore } from "@/stores/user-config"

import SvgIcon, { type SvgIconProps } from "./icons/svg-icon.vue"
import InputSearch from "./input-search.vue"
import VisuallyHidden from "./visually-hidden.vue"

const userConfig = useUserConfigStore()

const handleSubmit = (value: string) => {
  const { engine, forwards } = userConfig.search
  const queryUrl =
    getForwardingUrl(value, forwards) ?? getEngineUrl(value, engine)
  window.location.href = encodeURI(queryUrl)
}

const cycleEngine = (direction = 1) => {
  const next = getNextEngine(userConfig.search.engine, direction)
  if (next) userConfig.setSearch({ engine: next })
}

const icons: Record<string, SvgIconProps["name"]> = {
  Brave: "brave",
  DuckDuckGo: "duckduckgo",
  Ecosia: "ecosia",
  Google: "google",
}
const iconName = computed(() => icons[userConfig.search.engine] ?? "search")
</script>

<template>
  <div class="search-bar">
    <button
      v-if="iconName !== 'search'"
      class="cycle-engine"
      @click="cycleEngine(1)"
      @keydown.arrow-up.prevent="cycleEngine(1)"
      @keydown.arrow-down.prevent="cycleEngine(-1)"
    >
      <VisuallyHidden> Cycle search engine. Current: </VisuallyHidden>
      <div class="tooltip">
        {{ userConfig.search.engine }}
      </div>
      <SvgIcon :name="iconName" size="2.5rem" />
    </button>

    <InputSearch
      autofocus
      :placeholder="userConfig.search.placeholder"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

button.cycle-engine {
  position: relative;
  height: 3rem;
  width: 3rem;
  flex-shrink: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;
  outline-offset: 0.25rem;

  &:hover {
    background: var(--color-background-hover);
  }

  &:active {
    background: var(--color-background-press);
  }

  &:not(:hover) .tooltip {
    opacity: 0;
  }
  .tooltip {
    position: absolute;
    pointer-events: none;
    top: 3rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
