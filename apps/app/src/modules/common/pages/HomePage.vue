<template>
  <div>
    <LoginForm v-if="!isAuth" />

    <div :class="$style.buttons" v-else>
      <UiButton @click="goToActivities">Занятия</UiButton>
      <UiButton @click="goToAdminPanel">Админка</UiButton>
      <UiButton @click="logout(URL_HOME, deleteAuthHeader, TOKEN_NAME)">Выйти</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { UiButton } from 'mhz-ui';

import { TOKEN_NAME } from '@/auth/constants';
import { logout, isAuth } from '@/auth/composables/useAuth';
import { deleteAuthHeader } from '@/common/plugins/api';

import LoginForm from '@/auth/components/LoginForm.vue';
import { URL_EXERCISE } from '@/exercise/constants';
import { URL_HOME } from '@/common/constants';
import { URL_ACTIVITY } from '@/activity/constants';

const router = useRouter();

function goToAdminPanel() {
  router.push(URL_EXERCISE);
}

function goToActivities() {
  router.push(URL_ACTIVITY);
}
</script>

<style module lang="scss">
.buttons {
  display: flex;
  gap: 16px;
}
</style>
