<template>
  <div :class="$style.info">
    <UiFlex gap="4" align="center">
      <IconDate width="20" height="20" />
      {{ formatDate(props.start) }}
      <IconDuration width="20" height="20" />
      {{ subtractDates(props.end, props.start) }}
    </UiFlex>

    <div>Сеты: {{ props.exercises.length }}, отказы: {{ toFailurePercent }}, отдых: {{ restPercent }}.</div>

    <div :class="$style.table">
      <UiTable :headers="STATISTICS_HEADERS" lang="ru">
        <tr v-for="muscleGroup in activityStatistics" :key="muscleGroup.title">
          <td>{{ muscleGroup.title }}</td>
          <td>{{ muscleGroup.sets }}</td>
          <td>{{ muscleGroup.repeats }}</td>
        </tr>
      </UiTable>
    </div>

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
import { UiButton, UiFlex, UiTable } from 'mhz-ui';

import ExerciseTitle from '@/exercise/components/ExerciseTitle.vue';
import IconDate from '@/layout/icons/date.svg';
import IconDuration from '@/layout/icons/duration.svg';

import { formatDate, subtractDates } from '@/common/helpers/date';
import { URL_ACTIVITY_CREATE, STATISTICS_HEADERS } from '@/activity/constants';
import { isAuth } from '@/auth/composables/useAuth';
import { EXERCISE_MUSCLE_GROUPS } from '@/exercise/constants';

interface IProps {
  id?: string;
  start?: Date | string;
  end?: Date | string;
  exercises: IExerciseDone[];
}

interface IMuscleGroupStatistics {
  title: string;
  sets: number;
  repeats: number;
}

const props = defineProps<IProps>();

const router = useRouter();

const activityStatistics = computed(() => {
  const groups: IMuscleGroupStatistics[] = [];

  EXERCISE_MUSCLE_GROUPS.forEach((group) => {
    const title = group.title;
    let sets = 0;
    let repeats = 0;

    props.exercises.forEach((exercise) => {
      const setsCount =
        exercise.exercise?.muscleGroups.filter((muscleGroup) => muscleGroup._id === group._id).length || 0;

      sets += setsCount;

      if (exercise.exercise?.muscleGroups.some((groupToFilter) => groupToFilter._id === group._id)) {
        repeats += exercise.repeats;
      }
    });

    if (sets) groups.push({ title, sets, repeats });
  });

  return groups;
});

const toFailurePercent = computed(() => {
  const allExercises = props.exercises.length;
  const toFailureExercises = props.exercises.filter((exercise) => exercise.isToFailure).length;

  return `${Math.floor((toFailureExercises / allExercises) * 100)}%`;
});

const restPercent = computed(() => {
  const activityDuration = Number(subtractDates(props.end, props.start, true));
  const exercisesDuration = props.exercises.reduce((acc, current) => acc + (current.duration || 0), 0);

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

.table {
  display: table;
}
</style>
