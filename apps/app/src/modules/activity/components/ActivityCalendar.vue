<template>
  <div>
    <UiCalendar v-if="props.events" :events="props.events" :onEventClick="showEvent" />

    <UiModal v-model="isShowModal">
      <ActivityInfo :start="start" :end="end" :exercises="exercises" />
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IExerciseDone } from 'fitness-tracker-contracts';
import { UiCalendar, UiModal } from 'mhz-ui';

import ActivityInfo from './ActivityInfo.vue';

import { IActivityCalendarEvent } from '@/activity/interface';

interface IProps {
  events?: IActivityCalendarEvent<IExerciseDone>[];
}

const props = defineProps<IProps>();

const isShowModal = ref(false);

const start = ref<Date>();
const end = ref<Date>();
const exercises = ref<IExerciseDone[]>([]);

function showEvent(event: IActivityCalendarEvent<IExerciseDone>) {
  start.value = event.start;
  end.value = event.end;
  exercises.value = event.content;

  isShowModal.value = true;
}
</script>
