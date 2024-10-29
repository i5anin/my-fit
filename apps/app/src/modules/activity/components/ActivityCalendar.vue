<template>
  <div :class="$style.container">
    <VueCal
      hideViewSelector
      eventsOnMonthView="short"
      :time="false"
      activeView="month"
      :disableViews="['years', 'year', 'day', 'week']"
      locale="ru"
      :transitions="false"
      :events="props.events"
      :onEventClick="showEvent"
    />

    <UiModal v-model="isShowModal">
      <ActivityInfo :start="start" :end="end" :exercises="exercises" />
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import VueCal from 'vue-cal';
import { IExerciseDone } from 'fitness-tracker-contracts';
import { UiModal } from 'mhz-ui';

import ActivityInfo from './ActivityInfo.vue';

import { IActivityCalendarEvent } from '@/activity/interface';

import 'vue-cal/dist/vuecal.css';

interface IProps {
  events?: IActivityCalendarEvent[];
}

const props = defineProps<IProps>();

const isShowModal = ref(false);

const start = ref<Date>();
const end = ref<Date>();
const exercises = ref<IExerciseDone[]>([]);

function showEvent(event: IActivityCalendarEvent) {
  start.value = event.start;
  end.value = event.end;
  exercises.value = event.content;

  isShowModal.value = true;
}
</script>

<style module lang="scss">
.container {
  height: 400px;
}

:global(.vuecal__cell-events) {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  justify-content: center;
}

:global(.vuecal__event) {
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: var(--color-accent);
  border-radius: 50%;
}

:global(.vuecal--short-events .vuecal__event-title) {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-white);
  text-align: center;
}
</style>
