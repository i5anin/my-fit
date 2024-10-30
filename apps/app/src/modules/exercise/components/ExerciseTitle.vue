<template>
  <div>
    <div :class="$style.title">{{ props.exercise.exercise.title }}</div>

    <div v-if="!props.isOnlyTitle" :class="$style.description">
      <div v-if="!props.exercise.isDone" :class="[$style.tag, $style.error]">
        <IconFail width="16" height="16" /> Не выполнено
      </div>

      <div v-if="props.exercise.duration" :class="$style.tag">
        <IconDuration width="16" height="16" /> {{ formatDuration(props.exercise.duration) }}
      </div>

      <div :class="$style.tag"><IconRepeat width="16" height="16" />{{ props.exercise.repeats }}</div>

      <div v-if="props.exercise.weight" :class="$style.tag">
        <IconWeight width="16" height="16" />{{ props.exercise.weight }} кг.
      </div>

      <div v-if="props.exercise.isToFailure" :class="[$style.tag, $style.success]">
        <IconToFailure width="16" height="16" /> До отказа
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IExerciseDone } from 'fitness-tracker-contracts';

import IconDuration from '@/layout/icons/duration.svg';
import IconRepeat from '@/layout/icons/repeat.svg';
import IconToFailure from '@/layout/icons/to-failure.svg';
import IconFail from '@/layout/icons/fail.svg';
import IconWeight from '@/layout/icons/weight.svg';

import { formatDuration } from '@/common/helpers/date';

interface IProps {
  exercise: IExerciseDone;
  isOnlyTitle?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.title {
  font-weight: 700;
}

.description {
  display: flex;
  gap: 8px;
}

.tag {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 2px 8px;
  font-size: 0.875rem;
  background-color: var(--color-gray-light);
  border-radius: 8px;
}

.success {
  color: var(--color-success-dark);
}

.error {
  color: var(--color-error);
}
</style>
