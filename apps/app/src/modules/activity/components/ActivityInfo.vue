<template>
  <div :class="$style.info">
    <div>
      <div :class="$style.block">
        <IconDate width="20" height="20" />
        {{ formatDateTime(props.start) }},
        <IconDuration width="20" height="20" />
        {{ subtractDates(props.end, props.start) }}
      </div>
    </div>

    <div :class="$style.exercises">
      <div v-for="exercise in props.exercises" :key="exercise._id">
        <ExerciseTitle :exercise="exercise" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IExerciseDone } from 'fitness-tracker-contracts';

import ExerciseTitle from '@/exercise/components/ExerciseTitle.vue';
import IconDate from '@/layout/icons/date.svg';
import IconDuration from '@/layout/icons/duration.svg';

import { formatDateTime, subtractDates } from '@/common/helpers/date';

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

.block {
  display: flex;
  gap: 4px;
  align-items: center;
}

.exercises {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
