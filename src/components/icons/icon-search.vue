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
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</template>
