<template>
  <div>
    <ActivityForm :copy="route.query.copy?.toString()" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import ActivityForm from '@/activity/components/ActivityForm.vue';

const route = useRoute();
</script>
