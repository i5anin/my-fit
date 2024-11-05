<template>
  <div :class="$style.info">
    <UiFlex gap="4" align="center">
      <IconDate width="20" height="20" />
      {{ formatDate(props.start) }}
      <IconDuration width="20" height="20" />
      {{ subtractDates(props.end, props.start) }}
    </UiFlex>

    <div>Сеты: {{ props.exercises.length }}, отказы: {{ toFailurePercent }}, отдых: {{ restPercent }}.</div>

    <UiButton v-if="isAuth" @click="copyActivity">Сформировать такое же занятие</UiButton>

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
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { IExerciseDone } from 'fitness-tracker-contracts';
import { UiButton, UiFlex } from 'mhz-ui';

import ExerciseTitle from '@/exercise/components/ExerciseTitle.vue';
import IconDate from '@/layout/icons/date.svg';
import IconDuration from '@/layout/icons/duration.svg';

import { formatDate, subtractDates } from '@/common/helpers/date';
import { URL_ACTIVITY_CREATE } from '@/activity/constants';
import { isAuth } from '@/auth/composables/useAuth';

interface IProps {
  id?: string;
  start?: Date | string;
  end?: Date | string;
  exercises: IExerciseDone[];
}

const props = defineProps<IProps>();

const router = useRouter();

const toFailurePercent = computed(() => {
  const allExercises = props.exercises.length;
  const toFailureExercises = props.exercises.filter((exercise) => exercise.isToFailure).length;

  return `${Math.floor((toFailureExercises / allExercises) * 100)}%`;
});

const restPercent = computed(() => {
  const activityDuration = Number(subtractDates(props.end, props.start, true));

  const exercisesDuration = props.exercises.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.duration || 0),
    0
  );

  return `${Math.floor((exercisesDuration / activityDuration) * 100)}%`;
});

function isPrevExerciseSame(index: number, id?: string) {
  return id && props.exercises[index - 1] ? id === props.exercises[index - 1].exercise?._id : false;
}

function copyActivity() {
  router.push(`${URL_ACTIVITY_CREATE}?copy=${props.id}`);
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
