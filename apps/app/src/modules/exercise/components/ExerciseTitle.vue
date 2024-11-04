<template>
  <div>
    <UiFlex column>
      <UiFlex v-if="!props.isHideTitle" grow wrap align="center">
        <div :class="$style.title">
          {{ props.exercise.exercise?.title || 'Упражнение удалено' }}
        </div>

        <UiFlex v-if="!props.isOnlyTitle && props.exercise.exercise" shrink>
          <img
            v-for="group in props.exercise.exercise?.muscleGroups"
            :key="group._id"
            :src="group.icon"
            width="32"
            height="32"
            :alt="group.title"
            :title="group.title"
            :class="$style.muscleGroup"
            loading="lazy"
          />
        </UiFlex>
      </UiFlex>

      <UiFlex column v-if="!props.isOnlyTitle">
        <UiFlex wrap>
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
      </UiFlex>
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
  font-weight: 700;
  line-height: 1.3;
}

.muscleGroup {
  padding: 4px;
  background-color: var(--color-primary-light-extra);
  border-radius: 50%;
}
</style>
