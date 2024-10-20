<template>
  <div>
    <ActivityForm v-if="activity" :activity="activity" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import ActivityForm from '@/activity/components/ActivityForm.vue';

import { getActivity } from '@/activity/services';

const route = useRoute();

const activityId = computed(() => route.params.activity);

const { data: activity } = getActivity(activityId);
</script>
