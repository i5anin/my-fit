<template>
  <div :class="$style.list">
    <div v-for="(exercise, index) in props.exercises" :key="exercise._id">
      <UiSpoiler v-model="exerciseSpoilers[index]" :title="exercise.title">
        <ExerciseChooseElement :exercise="exercise" @add="(choosenExercise) => emit('choose', choosenExercise)" />
      </UiSpoiler>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { IExercise } from 'fitness-tracker-contracts';
import { UiSpoiler } from 'mhz-ui';

import ExerciseChooseElement from './ExerciseChooseElement.vue';

interface IProps {
  exercises: IExercise[];
}

const props = defineProps<IProps>();
const emit = defineEmits(['choose']);

const exerciseSpoilers = ref([]);
</script>

<style module lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
