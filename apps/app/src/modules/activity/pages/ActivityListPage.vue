<template>
  <div :class="$style.page">
    <div :class="$style.buttons">
      <UiButton @click="goToAdminPanel">Админка</UiButton>
      <UiButton @click="logout(URL_HOME, deleteAuthHeader, TOKEN_NAME)">Выйти</UiButton>
    </div>

    <UiButton @click="startActivity">Начать занятие</UiButton>

    <ActivityList v-if="activities" :activities="activities.data" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { UiButton } from 'mhz-ui';

import ActivityList from '@/activity/components/ActivityList.vue';

import { TOKEN_NAME } from '@/auth/constants';
import { logout } from '@/auth/composables/useAuth';
import { deleteAuthHeader } from '@/common/plugins/api';
import { URL_EXERCISE } from '@/exercise/constants';
import { URL_HOME } from '@/common/constants';
import { getActivities } from '@/activity/services';
import { URL_ACTIVITY_CREATE } from '@/activity/constants';

const router = useRouter();

const page = ref(1);

const { data: activities } = getActivities(page);

function startActivity() {
  router.push(URL_ACTIVITY_CREATE);
}

function goToAdminPanel() {
  router.push(URL_EXERCISE);
}
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.buttons {
  display: flex;
  gap: 16px;
}
</style>
