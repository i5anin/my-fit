<template>
  <div :class="$style.info">
    <UiFlex gap="4" align="center">
      <IconDate width="20" height="20" />
      {{ formatDate(props.start) }}
      <IconDuration width="20" height="20" />
      {{ subtractDates(props.end, props.start) }}
    </UiFlex>

    <div>
      Сетов: {{ props.exercises.length }}, до отказа:
      {{ props.exercises.filter((exercise) => exercise.isToFailure).length }}.
    </div>

    <UiFlex column>
      <ExerciseTitle
        v-for="(exercise, index) in props.exercises"
        :key="exercise._id"
        :exercise="exercise"
        :isHideTitle="isPrevExerciseSame(index, exercise.exercise?._id)"
      />
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { IExerciseDone } from 'fitness-tracker-contracts';
import { UiFlex } from 'mhz-ui';

import ExerciseTitle from '@/exercise/components/ExerciseTitle.vue';
import IconDate from '@/layout/icons/date.svg';
import IconDuration from '@/layout/icons/duration.svg';

import { formatDate, subtractDates } from '@/common/helpers/date';

interface IProps {
  start?: Date | string;
  end?: Date | string;
  exercises: IExerciseDone[];
}

const props = defineProps<IProps>();

function isPrevExerciseSame(index: number, id?: string) {
  return id && props.exercises[index - 1] ? id === props.exercises[index - 1].exercise?._id : false;
}
</script>

<style module lang="scss">
.info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 480px;
  overflow-y: auto;
}
</style>
