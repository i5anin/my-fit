<template>
  <div>
    <UiFlex column gap="32">
      <RouterLink :to="URL_EXERCISE_CREATE">Добавить упражнение</RouterLink>

      <ExerciseList :exercises="exercises" />

      <UiPagination
        v-show="exercises?.length"
        :page="page"
        :total="total"
        @update="(value: number) => setPage(setPaginationPage(value, page))"
        lang="ru"
      />
    </UiFlex>
  </div>
</template>

<script setup lang="ts">
import { UiFlex, UiPagination } from 'mhz-ui';

import ExerciseList from '@/exercise/components/ExerciseList.vue';

import { usePagination } from '@/common/composables/usePagination';
import { usePage } from '@/common/composables/usePage';
import { getExercises } from '@/exercise/services';
import { URL_EXERCISE_CREATE } from '@/exercise/constants';

const { page, setPage } = usePage();

const { data } = getExercises(page);

const { data: exercises, total, setPaginationPage } = usePagination(data);
</script>
