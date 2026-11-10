<script setup lang="ts">
import { SearchBar, WorkInProgress } from "@/components"
</script>

<template>
  <div class="startpage-layout">
    <WorkInProgress name="Startpage" />
    <div class="search-layout">
      <SearchBar />
    </div>
  </div>
</template>

<style scoped>
.startpage-layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  & > *:first-child {
    flex: 1;
  }
}

.search-layout {
  margin: 0 6rem 3rem calc(6rem - 3rem - 0.5rem); /* subtract width of engine icon on the left, to align input */
}
</style>
