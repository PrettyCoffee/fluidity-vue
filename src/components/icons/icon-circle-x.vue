<script lang="ts">
import { type IconProps } from "./icon-props"

export const defaultProps: IconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
}

export const size = 24
</script>

<script setup lang="ts"></script>

<template>
  <circle cx="12" cy="12" r="10" />
  <path d="m15 9-6 6" />
  <path d="m9 9 6 6" />
</template>
