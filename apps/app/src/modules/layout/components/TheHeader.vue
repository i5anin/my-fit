<template>
  <header :class="$style.header">
    <div :class="$style.logoAndSearch">
      <RouterLink :to="URL_USER" aria-label="Logo">
        <img src="/logo.png" width="48" />
      </RouterLink>
    </div>

    <UiButton @click="logout(URL_LOGIN, deleteAuthHeader, TOKEN_NAME)" layout="plain">Logout</UiButton>
  </header>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';

import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';

import { logout } from '@/common/composables/useAuth';
import { deleteAuthHeader } from '@/common/plugins/api';
import { URL_USER } from '@/user/constants';
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
  display: block;
  width: 150px;
}
</style>
