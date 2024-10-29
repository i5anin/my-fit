<template>
  <div>
    <h1>Фитнес трекер</h1>

    <p>Кликните по дате с занятием для просмота подробной информации.</p>

    <ActivityCalendar :events="events" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { IActivity } from 'fitness-tracker-contracts';

import ActivityCalendar from '@/activity/components/ActivityCalendar.vue';

import { getActivitiesCalendar } from '@/activity/services';
import { IActivityCalendarEvent } from '@/activity/interface';

const { data } = getActivitiesCalendar();

const events = computed<IActivityCalendarEvent[] | undefined>(() =>
  data.value?.map((activity: IActivity) => {
    return {
      start: new Date(`${activity.dateCreated}`),
      end: new Date(`${activity.dateUpdated}`),
      title: '+',
      content: activity.exercises,
    };
  })
);
</script>
