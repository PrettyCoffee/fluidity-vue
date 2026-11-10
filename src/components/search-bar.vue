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
import { computed, ref } from "vue"

import { useUserConfigStore } from "@/stores/user-config"

import IconButton from "./icon-button.vue"
import SvgIcon, { type SvgIconProps } from "./icons/svg-icon.vue"
import VisuallyHidden from "./visually-hidden.vue"

const userConfig = useUserConfigStore()

const inputRef = ref<HTMLInputElement>()
const query = ref("")

const handleSubmit = () => {
  if (!query.value) return

  const { engine, forwards } = userConfig.search
  const queryUrl =
    getForwardingUrl(query.value, forwards) ?? getEngineUrl(query.value, engine)
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
  <div class="input-search">
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

    <form @submit.prevent="handleSubmit" autocomplete="off">
      <input
        v-model="query"
        ref="inputRef"
        type="search"
        name="query"
        autofocus
        :placeholder="userConfig.search.placeholder"
      />

      <IconButton
        v-if="query.length"
        type="reset"
        icon="circle-x"
        label="Clear search"
        @click="(query = '') || inputRef?.focus()"
      />

      <IconButton
        v-if="query.length"
        type="submit"
        icon="search"
        label="Submit search"
      />
    </form>
  </div>
</template>

<style scoped>
.input-search {
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

form {
  width: 100%;
  position: relative;
}

form button {
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 3rem;
    inset: -0.5rem 0;
  }

  position: absolute;
  &[type="reset"] {
    right: 2rem;
    top: 0.5rem;
  }
  &[type="submit"] {
    right: 0rem;
    top: 0.5rem;
  }
}

input {
  width: 100%;
  border-bottom: 2px solid var(--color-stroke);
  height: 3rem;
  font-size: 2rem;
  padding-right: 4rem;

  color: var(--color-text);
  background: transparent;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:not(:hover, :focus-visible) {
    border-color: var(--color-stroke-muted);
  }

  &:focus-visible {
    border-color: var(--color-accent1);
    outline: none;
  }
}
</style>
