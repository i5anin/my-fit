<template>
  <div>
    <UiTable :headers="EXERCISE_STATISTICS_HEADERS" lang="ru">
      <tr v-for="exercise in props.exerciseStatistics" :key="exercise._id">
        <td>{{ exercise.title }}</td>
        <td>{{ exercise.sets }}</td>
        <td>{{ exercise.repeats }}</td>
      </tr>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import { IExerciseStatistics } from 'fitness-tracker-contracts';
import { UiTable } from 'mhz-ui';

import { EXERCISE_STATISTICS_HEADERS } from '@/exercise/constants';

interface IProps {
  exerciseStatistics?: IExerciseStatistics[];
}

const props = defineProps<IProps>();
</script>
