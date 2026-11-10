<script setup lang="ts">
import { ref } from "vue"

import IconButton from "./icon-button.vue"

export interface InputSearchProps {
  placeholder?: string
  autofocus?: boolean
}
defineProps<InputSearchProps>()
const emit = defineEmits<{ submit: [query: string] }>()
const query = defineModel<string>({ default: "" })

const inputRef = ref<HTMLInputElement>()

const handleSubmit = () => {
  if (query.value) emit("submit", query.value)
}

const handleReset = () => {
  query.value = ""
  inputRef.value?.focus()
}

defineExpose({ focus: () => inputRef.value?.focus() })
</script>

<template>
  <form @submit.prevent="handleSubmit" autocomplete="off">
    <input
      v-model="query"
      ref="inputRef"
      type="search"
      name="query"
      :autofocus="autofocus"
      :placeholder="placeholder"
    />

    <IconButton
      v-if="query.length"
      type="reset"
      icon="circle-x"
      label="Clear search"
      @click="handleReset"
    />

    <IconButton
      v-if="query.length"
      type="submit"
      icon="search"
      label="Submit search"
    />
  </form>
</template>

<style scoped>
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
