<template>
  <UiTable :headers="tableHeaders" :isLoading="!props.exercises?.length">
    <template v-if="props.exercises?.length">
      <tr v-for="exercise in props.exercises" :key="exercise._id">
        <td data-grow>
          <RouterLink :to="`${URL_EXERCISE_EDIT}/${exercise._id}`">
            {{ exercise.title }}
          </RouterLink>
        </td>
        <td data-no-wrap>
          {{ formatDate(exercise.dateCreated) }}
        </td>
        <td data-no-wrap>
          {{ formatDate(exercise.dateUpdated) }}
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup lang="ts">
import { UiTable } from 'mhz-ui';
import { IExercise } from 'fitness-tracker-contracts';

import { formatDate } from '@/common/plugins/date';

import { URL_EXERCISE_EDIT } from '@/exercise/constants';

interface IProps {
  exercises?: IExercise[];
}

const props = defineProps<IProps>();

const tableHeaders = [{ title: 'Title' }, { title: 'Created' }, { title: 'Updated' }];
</script>
