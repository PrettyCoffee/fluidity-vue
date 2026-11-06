<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <p>WIP: {{ name }}</p>
</template>

<style scoped>
p {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
