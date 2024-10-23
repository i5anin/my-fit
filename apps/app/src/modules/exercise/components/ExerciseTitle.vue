<template>
  <div>
    <b>{{ props.exercise.exercise.title }}</b>
    <span> - {{ props.exercise.repeats }} раз</span>
    <span v-if="props.exercise.weight"> x {{ props.exercise.weight }} кг.</span>
  </div>
</template>

<script setup lang="ts">
import { IExerciseDone } from 'fitness-tracker-contracts';

interface IProps {
  exercise: IExerciseDone;
}

const props = defineProps<IProps>();
</script>
