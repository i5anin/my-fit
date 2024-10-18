<template>
  <div>
    <LoginForm v-if="!isAuth" />

    <UiButton v-else @click="logout(URL_LOGIN, deleteAuthHeader, TOKEN_NAME)">Logout</UiButton>
  </div>
</template>

<script setup lang="ts">
import { UiButton } from 'mhz-ui';

import { TOKEN_NAME, URL_LOGIN } from '@/auth/constants';
import { logout, isAuth } from '@/auth/composables/useAuth';
import { deleteAuthHeader } from '@/common/plugins/api';

import LoginForm from '@/auth/components/LoginForm.vue';
</script>
