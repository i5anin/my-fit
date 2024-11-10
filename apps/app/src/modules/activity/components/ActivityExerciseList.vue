<template>
  <div>
    <UiFlex column gap="16">
      <ActivityExerciseElement
        v-for="(exercise, index) in props.exercises"
        :key="exercise._id"
        :exercise="exercise"
        :activeExerciseId="props.activeExerciseId"
        :isActivityDone="props.isActivityDone"
        :isCurrentExercise="index === currentExerciseIndex"
        @start="(id) => emit('start', id)"
        @stop="(exerciseDone) => emit('stop', exerciseDone)"
      />
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IExerciseDone } from 'fitness-tracker-contracts';
import { UiFlex } from 'mhz-ui';

import ActivityExerciseElement from '@/activity/components/ActivityExerciseElement.vue';

interface IProps {
  exercises: IExerciseDone[];
  activeExerciseId?: string;
  isActivityDone: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['start', 'stop']);

const currentExerciseIndex = computed(() => props.exercises.filter((exercise) => exercise.isDone).length);
</script>
