<template>
  <div>
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import SetupForm from '@/auth/components/SetupForm.vue';

import { useAuth } from '@/auth/composables/useAuth';
import { URL_ACTIVITY } from '@/activity/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_ACTIVITY);
</script>
