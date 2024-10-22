<template>
  <div>
    <h2>Сформировать занятие</h2>

    <div :class="$style.form">
      <UiButton @click="isShowModal = true">Добавить упражнение</UiButton>

      <UiModal v-model="isShowModal">
        <ExerciseChooseList :exercises="exercises" @choose="addExercise" />
      </UiModal>

      <div v-if="choosenExercises.length">
        <h3>Упражнения</h3>

        <ExerciseChoosenList :choosenExercises="choosenExercises" @update="updateExercises" />
      </div>

      <UiButton layout="accent">Начать</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { UiButton, UiModal } from 'mhz-ui';
import { IExerciseChoosen } from 'fitness-tracker-contracts';

import ExerciseChooseList from '@/exercise/components/ExerciseChooseList.vue';
import ExerciseChoosenList from '@/exercise/components/ExerciseChoosenList.vue';

import { usePage } from '@/common/composables/usePage';
import { usePagination } from '@/common/composables/usePagination';
import { getExercises } from '@/exercise/services';

const isShowModal = ref(false);

const choosenExercises = ref<IExerciseChoosen[]>([]);

const { page } = usePage();

const { data } = getExercises(page);

const { data: exercises } = usePagination(data);

function addExercise(exercise: IExerciseChoosen) {
  choosenExercises.value = [...choosenExercises.value, exercise];

  isShowModal.value = false;
}

function updateExercises(updatedExercises: IExerciseChoosen[]) {
  choosenExercises.value = [...updatedExercises];
}
</script>

<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
