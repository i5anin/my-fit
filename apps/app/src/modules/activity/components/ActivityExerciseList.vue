<template>
  <div :class="$style.list">
    <ActivityExerciseElement
      v-for="exercise in props.exercises"
      :key="exercise._id"
      :exercise="exercise"
      :activeExerciseId="props.activeExerciseId"
      @start="(id) => emit('start', id)"
      @stop="(durationData) => emit('stop', durationData)"
    />
  </div>
</template>

<script setup lang="ts">
import { IExerciseDone } from 'fitness-tracker-contracts';

import ActivityExerciseElement from '@/activity/components/ActivityExerciseElement.vue';

interface IProps {
  exercises: IExerciseDone[];
  activeExerciseId?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(['start', 'stop']);
</script>

<style module lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
