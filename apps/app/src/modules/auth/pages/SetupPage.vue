<template>
  <div>
    <SetupForm />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/common/composables/useAuth';

import SetupForm from '@/auth/components/SetupForm.vue';

import { URL_USER } from '@/user/constants';

const { redirectIfAuth } = useAuth();

redirectIfAuth(URL_USER);
</script>
