<template>
  <div>
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/auth/composables/useAuth';

import SetupForm from '@/auth/components/SetupForm.vue';

import { URL_EXERCISE } from '@/exercise/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_EXERCISE);
</script>
