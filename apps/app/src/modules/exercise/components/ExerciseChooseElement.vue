<template>
  <div :class="$style.element">
    <div :class="$style.options">
      <UiField v-if="props.exercise?.weights?.length" label="Вес гантелей, кг.">
        <UiSelect v-model="choosenExercise.weight" :options="props.exercise?.weights" lang="ru" />
      </UiField>

      <UiField label="Повторения">
        <UiSelect v-model="choosenExercise.repeats" :options="EXERCISE_REPEATS_OPTIONS" lang="ru" />
      </UiField>
    </div>

    <UiButton @click="addExercise">Добавить в занятие</UiButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { IExercise } from 'fitness-tracker-contracts';
import { UiButton, UiField, UiSelect } from 'mhz-ui';

import { EXERCISE_REPEATS_OPTIONS } from '@/exercise/constants';
import { createTempId } from '@/common/helpers/id';

interface IProps {
  exercise: IExercise;
}

const props = defineProps<IProps>();
const emit = defineEmits(['add']);

const choosenExercise = ref({
  repeats: 12,
  weight: 0,
});

function addExercise() {
  emit('add', {
    _id: createTempId(),
    exercise: { _id: props.exercise?._id, title: props.exercise?.title },
    ...choosenExercise.value,
  });
}

onMounted(() => {
  if (props.exercise.defaultWeight) choosenExercise.value.weight = props.exercise.defaultWeight;
});
</script>

<style module lang="scss">
.element {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.options {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}
</style>
