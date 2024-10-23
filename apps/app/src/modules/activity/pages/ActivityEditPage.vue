<template>
  <div>
    {{ activity }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { getActivity } from '@/activity/services';

const route = useRoute();

const activityId = computed(() => route.params.activity);

const { data: activity } = getActivity(activityId);
</script>
