<template>
  <div>
    <UiTable :headers="EXERCISE_STATISTICS_HEADERS" lang="ru">
      <tr v-for="exercise in props.exerciseStatistics" :key="exercise._id">
        <td>
          <span>{{ exercise.title }}</span>
        </td>
        <td>
          <div :class="$style.cell">
            <span>{{ exercise.sets }}</span>
            <span :class="$style.time">
              {{ (exercise.averageDuration * exercise.repeats) / exercise.sets || 0 }}с
            </span>
          </div>
        </td>
        <td>
          <div :class="$style.cell">
            <span>{{ exercise.repeats }}</span>
            <span :class="$style.time">{{ exercise.averageDuration.toFixed(2) }}с</span>
          </div>
        </td>
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

<style module lang="scss">
.cell {
  display: flex;
  gap: 4px;
  align-items: flex-end;
}

.time {
  font-size: 0.875rem;
  color: var(--color-gray-dark-extra);
}

@media (max-width: 960px) {
  .cell {
    flex-direction: column;
  }
}
</style>
