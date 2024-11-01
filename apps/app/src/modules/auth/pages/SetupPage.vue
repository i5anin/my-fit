<template>
  <div>
    <AuthForm />
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/auth/components/AuthForm.vue';

import { useAuth } from '@/auth/composables/useAuth';
import { URL_ACTIVITY_CREATE } from '@/activity/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_ACTIVITY_CREATE);
</script>
