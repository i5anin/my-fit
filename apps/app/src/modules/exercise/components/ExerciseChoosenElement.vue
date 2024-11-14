<template>
  <div :class="$style.exercise">
    <span>{{ props.index }}. {{ props.exercise.exercise?.title }}</span>

    <button @click="emit('delete', props.exercise._id)" :class="$style.delete" type="button">×</button>
  </div>
</template>

<script setup lang="ts">
import { IExerciseChoosen } from 'fitness-tracker-contracts';

interface IProps {
  exercise: IExerciseChoosen;
  index: number;
}

const props = defineProps<IProps>();
const emit = defineEmits(['delete']);
</script>

<style module lang="scss">
.exercise {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: var(--color-gray-light);
  border-radius: 16px;
}

.delete {
  width: 32px;
  padding: 0;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  background: none;
  border: none;
}
</style>
