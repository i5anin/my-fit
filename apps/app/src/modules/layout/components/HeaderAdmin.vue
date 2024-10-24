<template>
  <header :class="$style.header">
    <div :class="$style.logoAndSearch">
      <RouterLink :to="URL_ACTIVITY" :class="$style.logo" aria-label="Logo">
        <IconLogo width="32" height="32" /> FiT
      </RouterLink>
    </div>

    <div :class="$style.buttons">
      <UiButton @click="goToActivities" layout="plain">Занятия</UiButton>
      <UiButton @click="logout(URL_HOME, deleteAuthHeader, TOKEN_NAME)" layout="plain">Выйти</UiButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { UiButton } from 'mhz-ui';

import IconLogo from '@/common/images/logo.svg';

import { TOKEN_NAME } from '@/auth/constants';
import { logout } from '@/auth/composables/useAuth';
import { deleteAuthHeader } from '@/common/plugins/api';
import { URL_HOME } from '@/common/constants';
import { URL_ACTIVITY } from '@/activity/constants';

const router = useRouter();

function goToActivities() {
  router.push(URL_ACTIVITY);
}
</script>

<style module lang="scss">
.header {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  padding: 16px 32px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-gray);
}

.logoAndSearch {
  display: flex;
  gap: 64px;
  align-items: center;
}

.logo {
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary-dark);
  text-decoration: none;
}

.buttons {
  display: flex;
  gap: 16px;
}
</style>
