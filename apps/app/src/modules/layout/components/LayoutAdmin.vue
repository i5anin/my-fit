<template>
  <div :class="$style.layout">
    <TheHeader />

    <div :class="$style.container">
      <NavList />

      <main :class="$style.main">
        <RouterView :class="$style.content" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/layout/components/TheHeader.vue';
import NavList from '@/layout/components/NavList.vue';

defineOptions({ name: 'LayoutAdmin' });
</script>

<style module lang="scss">
@use '../styles/layout';
</style>
