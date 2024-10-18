<template>
  <div>
    <div :class="$style.page">
      <RouterLink :to="URL_EXERCISE_CREATE">Add exercise</RouterLink>

      <ExerciseList :exercises="exercises" />

      <UiPagination
        v-show="exercises?.length"
        :page="page"
        :total="total"
        @update="(value: number) => setPage(setPaginationPage(value, page))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { UiPagination } from 'mhz-ui';

import { usePagination } from '@/common/composables/usePagination';
import { usePage } from '@/common/composables/usePage';

import ExerciseList from '@/exercise/components/ExerciseList.vue';

import { getExercises } from '@/exercise/services';
import { URL_EXERCISE_CREATE } from '@/exercise/constants';

const { page, setPage } = usePage();

const { data } = getExercises(page);

const { data: exercises, total, setPaginationPage } = usePagination(data);
</script>

<style module lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
