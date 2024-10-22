<template>
  <div>
    <h3>Выполненные занятия</h3>

    <ActivityElement v-for="activity in props.activities" :key="activity._id" :activity="activity" />
  </div>
</template>

<script setup lang="ts">
import { IActivity } from 'fitness-tracker-contracts';

import ActivityElement from '@/activity/components/ActivityElement.vue';

interface IProps {
  activities: IActivity[];
}

const props = defineProps<IProps>();
</script>
