<template>
  <div>
    <h1>Фитнес трекер</h1>

    <p>Кликните по дате с занятием для просмота подробной информации.</p>

    <ActivityCalendar :events="events" @ready="updateDates" @update="updateDates" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { IActivity, IExerciseDone } from 'fitness-tracker-contracts';

import ActivityCalendar from '@/activity/components/ActivityCalendar.vue';

import { getActivitiesCalendar } from '@/activity/services';
import { IActivityCalendarEvent, ICalendarEvent } from '@/activity/interface';

const dateFrom = ref('');
const dateTo = ref('');

const isRequestEnabled = ref(false);

const { data } = getActivitiesCalendar({ enabled: isRequestEnabled }, dateFrom, dateTo);

const events = computed<IActivityCalendarEvent<IExerciseDone>[] | undefined>(() =>
  data.value?.map((activity: IActivity) => {
    return {
      _id: activity._id,
      start: new Date(`${activity.dateCreated}`),
      end: new Date(`${activity.dateUpdated}`),
      title: '+',
      content: activity.exercises,
    };
  })
);

function updateDates(dates: ICalendarEvent) {
  isRequestEnabled.value = true;

  dateFrom.value = dates.firstCellDate;
  dateTo.value = dates.lastCellDate;
}
</script>
