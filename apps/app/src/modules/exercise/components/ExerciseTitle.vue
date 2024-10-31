<template>
  <div>
    <div v-if="!props.isHideTitle" :class="$style.title">{{ props.exercise.exercise.title }}</div>

    <UiFlex v-if="!props.isOnlyTitle" wrap>
      <UiChip v-if="!props.exercise.isDone" type="error"> <IconFail width="16" height="16" /> Не выполнено</UiChip>

      <UiChip v-if="props.exercise.duration">
        <IconDuration width="16" height="16" /> {{ formatDuration(props.exercise.duration) }}
      </UiChip>

      <UiChip>x{{ props.exercise.repeats }}</UiChip>

      <UiChip v-if="props.exercise.weight">
        <IconWeight width="16" height="16" />{{ props.exercise.weight }} кг.
      </UiChip>

      <UiChip v-if="props.exercise.isToFailure" type="success">
        <IconToFailure width="16" height="16" /> До отказа
      </UiChip>
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { IExerciseDone } from 'fitness-tracker-contracts';
import { UiChip, UiFlex } from 'mhz-ui';

import IconDuration from '@/layout/icons/duration.svg';
import IconToFailure from '@/layout/icons/to-failure.svg';
import IconFail from '@/layout/icons/fail.svg';
import IconWeight from '@/layout/icons/weight.svg';

import { formatDuration } from '@/common/helpers/date';

interface IProps {
  exercise: IExerciseDone;
  isOnlyTitle?: boolean;
  isHideTitle?: boolean;
}

const props = defineProps<IProps>();
</script>

<style module lang="scss">
.title {
  margin-bottom: 2px;
  font-weight: 700;
}
</style>
