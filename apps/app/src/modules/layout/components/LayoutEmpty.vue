<template>
  <div :class="$style.layout">
    <TheHeader @showLogin="isShowLogin = true" />

    <div :class="$style.container">
      <main :class="$style.main">
        <RouterView :class="$style.content" />
      </main>

      <UiModal v-model="isShowLogin">
        <AuthForm @login="isShowLogin = false" />
      </UiModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiModal } from 'mhz-ui';

import TheHeader from '@/layout/components/TheHeader.vue';
import AuthForm from '@/auth/components/AuthForm.vue';

defineOptions({ name: 'LayoutEmpty' });

const isShowLogin = ref(false);
</script>

<style module lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  display: flex;
  height: calc(100vh - 64px);
  margin-top: 64px;
  overflow-y: auto;
}

.main {
  flex: 1;
  height: calc(100vh - 64px);
  overflow-y: auto;
  background-color: var(--color-gray-light);
}

.content {
  min-height: calc(100vh - 128px);
  padding: 24px;
  margin: 24px;
  overflow: hidden;
  background-color: var(--color-white);
  border-radius: 16px;
}
</style>
