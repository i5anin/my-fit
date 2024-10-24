<template>
  <RouterLink :to="props.navItem.url" :class="$style.navItem">
    <span data-test="nav-item-title">{{ props.navItem.title }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { INavItem } from '@/layout/interface';

interface IProps {
  navItem: INavItem;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.navItem {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  color: var(--color-black);
  text-decoration: none;
  border-radius: 16px;

  &:hover,
  &:global(.router-link-active) {
    color: var(--color-white);
    background-color: var(--color-primary);
  }
}

.icon {
  flex-shrink: 0;
}
</style>
