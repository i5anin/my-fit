<template>
  <Sortable :list="props.choosenExercises" itemKey="_id" tag="div" @end="updateIndex" :class="$style.list">
    <template #item="{ element }">
      <div :key="element">
        <ExerciseChoosenElement :choosenExercise="element" @delete="deleteChoosenExercise" />
      </div>
    </template>
  </Sortable>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { Sortable } from 'sortablejs-vue3';
import { IExerciseChoosen } from 'fitness-tracker-contracts';

import ExerciseChoosenElement from '@/exercise/components/ExerciseChoosenElement.vue';

interface IProps {
  choosenExercises: IExerciseChoosen[];
}

const props = defineProps<IProps>();
const emit = defineEmits(['update']);

const exercisesSortable = ref<IExerciseChoosen[]>([]);

watch(
  () => props.choosenExercises,
  () => {
    exercisesSortable.value = [...props.choosenExercises];
  },
  { deep: true }
);

function updateIndex(event: { oldIndex: number; newIndex: number }) {
  exercisesSortable.value.splice(event.newIndex, 0, exercisesSortable.value.splice(event.oldIndex, 1)[0]);
  emit('update', exercisesSortable.value);
}

function deleteChoosenExercise(idToDelete: string) {
  exercisesSortable.value = exercisesSortable.value.filter((exercise) => exercise._id !== idToDelete);
  emit('update', exercisesSortable.value);
}
</script>

<style module lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
