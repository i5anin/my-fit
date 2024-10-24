<template>
  <header>
    <div :class="$style.buttons">
      <template v-if="isAuth">
        <UiButton @click="goToAdminPanel" layout="plain">Админка</UiButton>
        <UiButton @click="logout(URL_HOME, deleteAuthHeader, TOKEN_NAME)" layout="plain">Выйти</UiButton>
      </template>

      <UiButton v-else @click="emit('showLogin')" layout="plain">Войти</UiButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { UiButton } from 'mhz-ui';

import { TOKEN_NAME } from '@/auth/constants';
import { logout, isAuth } from '@/auth/composables/useAuth';
import { deleteAuthHeader } from '@/common/plugins/api';
import { URL_HOME } from '@/common/constants';
import { URL_EXERCISE } from '@/exercise/constants';

const emit = defineEmits(['showLogin']);

const router = useRouter();

function goToAdminPanel() {
  router.push(URL_EXERCISE);
}
</script>

<style module lang="scss">
.buttons {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}
</style>
