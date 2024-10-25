<template>
  <div>
    <h3>Выполненные занятия</h3>

    <div v-for="activity in props.activities" :key="activity._id" :activity="activity">
      {{ formatDate(activity.dateCreated) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { IActivity } from 'fitness-tracker-contracts';

import { formatDate } from '@/common/helpers/date';

interface IProps {
  activities: IActivity[];
}

const props = defineProps<IProps>();
</script>
