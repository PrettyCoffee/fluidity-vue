<script setup lang="ts">
import SvgIcon, { type SvgIconProps } from "./icons/svg-icon.vue"
import VisuallyHidden from "./visually-hidden.vue"

export interface IconButtonProps {
  icon: SvgIconProps["name"]
  type?: "reset" | "submit" | "button"
  label: string
}
defineProps<IconButtonProps>()
</script>

<template>
  <button :type="type">
    <VisuallyHidden>{{ label }}</VisuallyHidden>
    <SvgIcon :name="icon" size="1.25rem" />
  </button>
</template>

<style scoped>
button {
  height: 2rem;
  width: 2rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;
  color: var(--color-stroke-muted);

  &:hover {
    color: var(--color-stroke);
    background: var(--color-background-hover);
  }

  &:active {
    color: var(--color-stroke);
    background: var(--color-background-press);
  }

  &:focus-visible {
    color: var(--color-stroke);
    outline: 2px solid var(--color-accent1);
  }
}
</style>
