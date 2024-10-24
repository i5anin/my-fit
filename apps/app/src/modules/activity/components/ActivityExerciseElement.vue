<template>
  <div :class="$style.exercise">
    <ExerciseTitle :exercise="props.exercise" />

    <UiButton
      @click="handleClick"
      :isDisabled="props.exercise.isDone || (!isCurrentExerciseActive && !!props.activeExerciseId)"
    >
      {{ buttonTitle }}
    </UiButton>

    <ActivityDuration :duration="exercise.duration" :start="start" :stop="stop" isBig @stop="sendDurationData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { UiButton } from 'mhz-ui';
import { IExerciseDone } from 'fitness-tracker-contracts';

import ExerciseTitle from '@/exercise/components/ExerciseTitle.vue';
import ActivityDuration from '@/activity/components/ActivityDuration.vue';

interface IProps {
  exercise: IExerciseDone;
  activeExerciseId?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(['start', 'stop']);

const start = ref(false);
const stop = ref(false);

const isCurrentExerciseActive = computed(() => props.exercise._id === props.activeExerciseId);

const buttonTitle = computed(() => {
  if (props.exercise.isDone) {
    return 'Завершено';
  } else {
    return isCurrentExerciseActive.value ? 'Завершить' : 'Начать';
  }
});

function handleClick() {
  emit('start', props.exercise._id);
  start.value = !isCurrentExerciseActive.value;
  stop.value = isCurrentExerciseActive.value;
}

function sendDurationData(duration: number) {
  if (isCurrentExerciseActive.value) emit('stop', { id: props.exercise._id, duration });
}
</script>

<style module lang="scss">
.exercise {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
