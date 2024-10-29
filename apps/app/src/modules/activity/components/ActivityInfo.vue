<template>
  <div :class="$style.info">
    <div>
      <div>Занятие началось: {{ formatDateTime(props.start) }}</div>
      <div>Занятие закончилось: {{ formatDateTime(props.end) }}</div>
      <div>Длительность: {{ subtractDates(props.end, props.start) }}</div>
    </div>

    <div>
      <div v-for="exercise in props.exercises" :key="exercise._id">
        <ExerciseTitle :exercise="exercise" />

        <span v-if="!exercise.isDone">Не выполнено</span>
        <span v-if="exercise.isToFailure">До отказа</span>
        <div v-if="exercise.duration">Длительность: {{ formatDuration(exercise.duration) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IExerciseDone } from 'fitness-tracker-contracts';

import ExerciseTitle from '@/exercise/components/ExerciseTitle.vue';

import { formatDateTime, formatDuration, subtractDates } from '@/common/helpers/date';

interface IProps {
  start?: Date | string;
  end?: Date | string;
  exercises: IExerciseDone[];
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
