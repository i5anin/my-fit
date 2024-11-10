<template>
  <div>
    <UiFlex column gap="16">
      <UiFlex justify="space-between">
        <UiField v-if="props.exercise?.weights?.length" label="Вес гантелей, кг.">
          <UiSelect v-model="choosenExercise.weight" :options="props.exercise?.weights" lang="ru" />
        </UiField>

        <UiField label="Повторы">
          <UiSelect v-model="choosenExercise.repeats" :options="EXERCISE_REPEATS_OPTIONS" lang="ru" />
        </UiField>
      </UiFlex>

      <UiFlex justify="space-between">
        <UiButton @click="addExercise(1)">Добавить</UiButton>
        <UiButton @click="addExercise(2)" layout="secondary">Добавить два</UiButton>
      </UiFlex>
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IExercise } from 'fitness-tracker-contracts';
import { UiButton, UiField, UiFlex, UiSelect } from 'mhz-ui';
import { createTempId } from 'mhz-helpers';

import { EXERCISE_REPEATS_OPTIONS } from '@/exercise/constants';

interface IProps {
  exercise: IExercise;
}

const props = defineProps<IProps>();
const emit = defineEmits(['add']);

const choosenExercise = ref({
  repeats: 12,
  weight: 0,
});

function addExercise(count: number) {
  for (let i = 0; i < count; i++) {
    emit('add', {
      _id: createTempId(),
      exercise: { _id: props.exercise?._id, title: props.exercise?.title },
      ...choosenExercise.value,
    });
  }
}

onMounted(() => {
  if (props.exercise.defaultWeight) choosenExercise.value.weight = props.exercise.defaultWeight;
});
</script>
