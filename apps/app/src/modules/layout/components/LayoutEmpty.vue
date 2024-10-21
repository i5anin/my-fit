<template>
  <div :class="$style.layout">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'LayoutEmpty' });
</script>

<style module lang="scss">
.layout {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
  padding-top: 32px;
}
</style>
