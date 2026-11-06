<script setup lang="ts">
import { watchEffect } from "vue"
import { RouterView } from "vue-router"

import { useUserConfigStore } from "./stores/user-config"

const userConfig = useUserConfigStore()
watchEffect(() => {
  const { colors } = userConfig.theme
  const root = document.documentElement
  root.style.setProperty("--theme-bg", colors.bg)
  root.style.setProperty("--theme-fg", colors.fg)
  root.style.setProperty("--theme-accent1", colors.accent1)
  root.style.setProperty("--theme-accent2", colors.accent2)
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
