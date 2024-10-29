<template>
  <div :class="$style.exercise">
    <ExerciseTitle :exercise="props.exercise" />

    <UiButton @click="handleClick" :isDisabled="isButtonDisabled" isTall>
      {{ buttonTitle }}
    </UiButton>

    <UiCheckbox v-model="isToFailure" label="Упражнение выполнено до отказа" :isDisabled="!isCurrentExerciseActive" />

    <div>
      <div :class="$style.title">Количество повторений</div>

      <div :class="$style.repeats">
        <UiButton
          v-for="repeat in repeatButtons"
          :key="repeat"
          @click="repeats = repeat"
          :layout="repeat === repeats ? 'accent' : 'primary'"
          isNarrow
          isTall
          :isDisabled="!isCurrentExerciseActive"
        >
          {{ repeat }}
        </UiButton>
      </div>
    </div>

    <ActivityDuration :duration="exercise.duration" :start="start" :stop="stop" isBig @stop="sendDurationData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { UiButton, UiCheckbox } from 'mhz-ui';
import { IExerciseDone } from 'fitness-tracker-contracts';

import ExerciseTitle from '@/exercise/components/ExerciseTitle.vue';
import ActivityDuration from '@/activity/components/ActivityDuration.vue';

interface IProps {
  exercise: IExerciseDone;
  activeExerciseId?: string;
  isActivityDone: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['start', 'stop']);

const start = ref(false);
const stop = ref(false);

const isToFailure = ref(false);
const repeats = ref(props.exercise.repeats);

const isCurrentExerciseActive = computed(() => props.exercise._id === props.activeExerciseId);

const isButtonDisabled = computed(
  () => props.isActivityDone || props.exercise.isDone || (!isCurrentExerciseActive.value && !!props.activeExerciseId)
);

const repeatButtons = [
  props.exercise.repeats - 2,
  props.exercise.repeats - 1,
  props.exercise.repeats,
  props.exercise.repeats + 1,
  props.exercise.repeats + 2,
];

const buttonTitle = computed(() => (isCurrentExerciseActive.value ? 'Завершить' : 'Начать'));

function handleClick() {
  emit('start', props.exercise._id);
  start.value = !isCurrentExerciseActive.value;
  stop.value = isCurrentExerciseActive.value;
}

function sendDurationData(duration: number) {
  if (isCurrentExerciseActive.value) {
    emit('stop', { _id: props.exercise._id, duration, isToFailure: isToFailure.value, repeats: repeats.value });
  }
}
</script>

<style module lang="scss">
.exercise {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  text-align: center;
}

.repeats {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}
</style>
