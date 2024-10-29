<template>
  <div>
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import SetupForm from '@/auth/components/SetupForm.vue';

import { useAuth } from '@/auth/composables/useAuth';
import { URL_ACTIVITY_CREATE } from '@/activity/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_ACTIVITY_CREATE);
</script>
