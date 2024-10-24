<template>
  <div :class="$style.layout">
    <div :class="$style.content">
      <HeaderEmpty @showLogin="isShowLogin = true" />
      <RouterView />

      <UiModal v-model="isShowLogin">
        <LoginForm @login="isShowLogin = false" />
      </UiModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiModal } from 'mhz-ui';

import HeaderEmpty from '@/layout/components/HeaderEmpty.vue';
import LoginForm from '@/auth/components/LoginForm.vue';

defineOptions({ name: 'LayoutEmpty' });

const isShowLogin = ref(false);
</script>

<style module lang="scss">
.layout {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-gray-light);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-height: calc(100vh - 48px);
  padding: 24px;
  margin: 24px;
  background-color: var(--color-white);
  border-radius: 16px;
}
</style>
