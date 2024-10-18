<template>
  <div>
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/common/composables/useAuth';

import LoginForm from '@/auth/components/LoginForm.vue';

import { URL_USER } from '@/user/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_USER);
</script>
